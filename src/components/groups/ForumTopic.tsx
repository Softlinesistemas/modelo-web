'use client';

import React, { useEffect, useState } from 'react';
import { NewTopicModal } from '../groups/topics/NewTopicModal';
import { TopicDetail } from '../groups/topics/TopicDetail';

export type Topic = {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  likes: number;
  resolved: boolean;
  replies: Reply[];
};

export type Reply = {
  id: number;
  content: string;
  author: string;
  date: string;
  likes: number;
};

const getStoredTopics = (): Topic[] => {
  const data = localStorage.getItem('forumTopics');
  return data ? JSON.parse(data) : [];
};

const ForumTopic: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'mostLiked'>('all');
  const [page, setPage] = useState(1);
  const topicsPerPage = 5;

  useEffect(() => {
    setTopics(getStoredTopics());
  }, []);

  const handleNewTopic = (newTopic: Topic) => {
    const updated = [...topics, newTopic];
    localStorage.setItem('forumTopics', JSON.stringify(updated));
    setTopics(updated);
  };

  const filteredTopics = filter === 'mostLiked'
    ? [...topics].sort((a, b) => b.likes - a.likes)
    : topics;

  const paginatedTopics = filteredTopics.slice((page - 1) * topicsPerPage, page * topicsPerPage);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-3">Tópicos do Fórum</h3>

      <div className="flex justify-between mb-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Criar Novo Tópico
        </button>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="border p-1 rounded"
        >
          <option value="all">Todos</option>
          <option value="mostLiked">Mais Curtidos</option>
        </select>
      </div>

      <ul>
        {paginatedTopics.map((topic) => (
          <li
            key={topic.id}
            onClick={() => setSelectedTopic(topic)}
            className={`border-b py-2 cursor-pointer hover:bg-gray-100 flex justify-between ${topic.resolved ? 'bg-green-50' : ''}`}
          >
            <div>
              <h4 className="font-bold">{topic.title}</h4>
              <p className="text-xs text-gray-500">
                Autor: {topic.author} - {topic.date} - {topic.replies.length} respostas
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span>👍 {topic.likes}</span>
              {topic.resolved && <span className="text-green-600 font-semibold">✔ Resolvido</span>}
            </div>
          </li>
        ))}
      </ul>

      {/* Paginação */}
      <div className="flex justify-between mt-3">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="text-sm"
        >
          Anterior
        </button>
        <button
          onClick={() => setPage((p) => (p * topicsPerPage < filteredTopics.length ? p + 1 : p))}
          disabled={page * topicsPerPage >= filteredTopics.length}
          className="text-sm"
        >
          Próxima
        </button>
      </div>

      <NewTopicModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleNewTopic}
      />

      {selectedTopic && (
        <TopicDetail
          topic={selectedTopic}
          onClose={() => {
            setSelectedTopic(null);
            setTopics(getStoredTopics());
          }}
        />
      )}
    </div>
  );
};

export default ForumTopic;
