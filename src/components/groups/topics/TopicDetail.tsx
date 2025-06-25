import React, { useState } from 'react';
import { Topic } from '../ForumTopic';
import { format } from 'date-fns';

type Props = {
  topic: Topic;
  onClose: () => void;
};

export const TopicDetail: React.FC<Props> = ({ topic, onClose }) => {
  // Aqui garantimos que replies sempre será um array (mesmo que topic.replies venha undefined)
  const [localTopic, setLocalTopic] = useState<Topic>({
    ...topic,
    replies: Array.isArray(topic.replies) ? topic.replies : [],
  });

  const [replyText, setReplyText] = useState('');
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(localTopic.title);
  const [editDescription, setEditDescription] = useState(localTopic.description);

  // Função para salvar o tópico atualizado no localStorage
  const saveToStorage = (updatedTopic: Topic) => {
    const data = JSON.parse(localStorage.getItem('forumTopics') || '[]');
    const updatedList = data.map((t: Topic) => (t.id === updatedTopic.id ? updatedTopic : t));
    localStorage.setItem('forumTopics', JSON.stringify(updatedList));
  };

  // Incrementa likes no tópico
  const handleLike = () => {
    const updated = { ...localTopic, likes: localTopic.likes + 1 };
    setLocalTopic(updated);
    saveToStorage(updated);
  };

  // Adiciona uma nova resposta
  const handleReply = () => {
    if (!replyText.trim()) return; // evita respostas vazias

    const newReply = {
      id: Date.now(),
      content: replyText,
      author: 'Ramon',
      date: format(new Date(), 'dd/MM/yyyy'),
      likes: 0,
    };

    // Atualiza replies garantindo que localTopic.replies é um array
    const updated = { ...localTopic, replies: [...(localTopic.replies || []), newReply] };
    setLocalTopic(updated);
    setReplyText('');
    saveToStorage(updated);
  };

  // Exclui o tópico após confirmação
  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir este tópico?')) {
      const data = JSON.parse(localStorage.getItem('forumTopics') || '[]');
      const filtered = data.filter((t: Topic) => t.id !== localTopic.id);
      localStorage.setItem('forumTopics', JSON.stringify(filtered));
      onClose();
    }
  };

  // Salva as edições feitas no título e descrição
  const handleEdit = () => {
    if (confirm('Salvar alterações?')) {
      const updated = { ...localTopic, title: editTitle, description: editDescription };
      setLocalTopic(updated);
      saveToStorage(updated);
      setEditing(false);
    }
  };

  // Marca ou desmarca o tópico como resolvido
  const toggleResolved = () => {
    const updated = { ...localTopic, resolved: !localTopic.resolved };
    setLocalTopic(updated);
    saveToStorage(updated);
  };

  return (
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 w-full max-w-lg bg-white border shadow p-4 rounded">
      {editing ? (
        <>
          {/* Inputs para edição de título e descrição */}
          <input
            className="w-full border p-1 mb-1"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            className="w-full border p-1 mb-2"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <button onClick={handleEdit} className="px-2 py-1 bg-green-500 text-white rounded mr-2">
            Salvar
          </button>
          <button onClick={() => setEditing(false)} className="px-2 py-1 border rounded">
            Cancelar
          </button>
        </>
      ) : (
        <>
          {/* Exibição do tópico */}
          <h3 className="font-bold text-xl mb-1">{localTopic.title}</h3>
          <p className="mb-1">{localTopic.description}</p>
          <p className="text-xs text-gray-500 mb-2">
            Criado por: {localTopic.author} em {localTopic.date}
          </p>

          {/* Botões de ação */}
          <div className="flex space-x-2 mb-2">
            <button onClick={handleLike} className="text-sm">
              👍 {localTopic.likes}
            </button>
            <button onClick={toggleResolved} className="text-sm">
              {localTopic.resolved ? '✔ Desmarcar Resolvido' : '✔ Marcar como Resolvido'}
            </button>
            <button onClick={() => setEditing(true)} className="text-sm">
              ✏️ Editar
            </button>
            <button onClick={handleDelete} className="text-sm text-red-600">
              🗑 Excluir
            </button>
          </div>

          {/* Lista de respostas */}
          <div className="mt-3">
            <h4 className="font-semibold">Respostas:</h4>
            {/* Proteção caso replies seja undefined */}
            {(localTopic.replies || []).map((reply) => (
              <div key={reply.id} className="border p-2 mb-1 rounded">
                <p>{reply.content}</p>
                <p className="text-xs text-gray-500">
                  Por {reply.author} em {reply.date}
                </p>
              </div>
            ))}

            {/* Input para nova resposta */}
            <textarea
              placeholder="Responder..."
              className="w-full border p-1 mt-2"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button onClick={handleReply} className="mt-1 px-2 py-1 bg-blue-500 text-white rounded">
              Enviar Resposta
            </button>
          </div>
        </>
      )}

      {/* Botão fechar modal */}
      <button onClick={onClose} className="mt-3 px-3 py-1 border rounded block mx-auto">
        Fechar
      </button>
    </div>
  );
};
