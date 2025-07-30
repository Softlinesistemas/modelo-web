'use client';

import { Button } from '@/utils/ui/Button';
import React from 'react';

export type FilterType = 'todos' | 'favoritos' | 'nao_lidas';

type Props = {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

const MessageFilter: React.FC<Props> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex justify-around mt-6 sticky top-0 z-10">
      <Button
        className={`px-4 py-1 rounded-full text-xl w-28 font-semibold ${
          activeFilter === 'todos' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'
        }`}
        onClick={() => onFilterChange('todos')}
      >
        Todos
      </Button>

      <Button
        className={`px-4 py-1 rounded-full text-xl w-36 font-semibold ${
          activeFilter === 'favoritos' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'
        }`}
        onClick={() => onFilterChange('favoritos')}
      >
        Favoritos
      </Button>

      <Button
        className={`px-4 py-1 rounded-full text-xl w-36 font-semibold ${
          activeFilter === 'nao_lidas' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'
        }`}
        onClick={() => onFilterChange('nao_lidas')}
      >
        Não lidas
      </Button>
    </div>
  );
};

export default MessageFilter;
