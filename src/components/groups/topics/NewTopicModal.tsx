import React, { useState } from 'react';
import { Topic } from '../ForumTopic';
import { format } from 'date-fns';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (topic: Topic) => void;
};

export const NewTopicModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      alert('Título e descrição são obrigatórios!');
      return;
    }

    const newTopic: Topic = {
      id: Date.now(),
      title,
      description,
      author: 'Ramon',
      date: format(new Date(), 'dd/MM/yyyy'),
      likes: 0,
      resolved: false,
      replies: [],
    };

    onSave(newTopic);
    setTitle('');
    setDescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-4 rounded w-full max-w-md">
        <h3 className="font-bold mb-2">Novo Tópico</h3>
        <input
          className="w-full p-2 border rounded mb-2"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded mb-2"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="px-3 py-1 bg-blue-500 text-white rounded">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};
