'use client';

import React from 'react';

export type FilterType = 'todos' | 'favoritos' | 'nao_lidas';

type Props = {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

const MessageFilter: React.FC<Props> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex justify-around bg-white py-2 shadow">
      <button
        className={`px-4 py-1 rounded-full text-sm font-medium ${
          activeFilter === 'todos' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}
        onClick={() => onFilterChange('todos')}
      >
        Todos
      </button>
      <button
        className={`px-4 py-1 rounded-full text-sm font-medium ${
          activeFilter === 'favoritos' ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700'
        }`}
        onClick={() => onFilterChange('favoritos')}
      >
        Favoritos
      </button>
      <button
        className={`px-4 py-1 rounded-full text-sm font-medium ${
          activeFilter === 'nao_lidas' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}
        onClick={() => onFilterChange('nao_lidas')}
      >
        Não lidas
      </button>
    </div>
  );
};

export default MessageFilter;