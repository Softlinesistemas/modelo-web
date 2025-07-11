'use client';

import React from 'react';

export type FilterType = 'todos' | 'favoritos' | 'nao_lidas';

type Props = {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

const MessageFilter: React.FC<Props> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex justify-around bg-white p-2 box-border shadow-gray-300 shadow-md rounded-md sticky top-0 z-10">
      <button
        className={`px-4 py-1 rounded-full text-sm font-semibold ${
          activeFilter === 'todos' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'
        }`}
        onClick={() => onFilterChange('todos')}
      >
        Todos
      </button>

      <button
        className={`px-4 py-1 rounded-full text-sm font-semibold ${
          activeFilter === 'favoritos' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'
        }`}
        onClick={() => onFilterChange('favoritos')}
      >
        Favoritos
      </button>

      <button
        className={`px-4 py-1 rounded-full text-sm font-semibold ${
          activeFilter === 'nao_lidas' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'
        }`}
        onClick={() => onFilterChange('nao_lidas')}
      >
        Não lidas
      </button>
    </div>
  );
};

export default MessageFilter;
