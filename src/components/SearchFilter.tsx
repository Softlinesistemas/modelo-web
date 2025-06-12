// src/components/SearchFilter.tsx
import React from 'react';
import { FiSearch } from 'react-icons/fi';

export const SearchFilter: React.FC = () => {
  const filters = ['Todas', 'Não lidas', 'Favoritas'];

  return (
    <div className="px-4">
      {/* Campo de busca */}
      <div className="flex items-center bg-white rounded-lg shadow p-2">
        <FiSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Busque por grupo ou nome de usuário"
          className="w-full outline-none"
        />
      </div>
      {/* Botões de filtro */}
      <div className="flex space-x-2 mt-2">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`flex-1 text-center py-1 rounded ${
              filter === 'Todas'
                ? 'bg-green-300 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};
