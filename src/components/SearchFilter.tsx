'use client';

import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import MessageFilter, { FilterType } from './MessageFilter';
import { ItemList } from './ItemList';

type Item = {
  name: string;
  lastMessage: string;
  avatarUrl: string;
  time: string;
};

export const SearchFilter: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('todos');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [unreadItems, setUnreadItems] = useState<number[]>([1, 3, 5]); // Exemplo: os itens 1,3,5 começam como não lidos

  const items: Item[] = Array.from({ length: 8 }).map((_, i) => ({
    name: `Contato ${i + 1}`,
    lastMessage: 'Última mensagem do contato exibida aqui...',
    avatarUrl: `https://i.pravatar.cc/150?img=${i + 10}`,
    time: '12:3' + i,
  }));

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  const toggleFavorite = (index: number) => {
    setFavorites((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const toggleReadStatus = (index: number) => {
    setUnreadItems((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  // Aplicando o filtro
  const filteredItems = items.filter((_, index) => {
    if (activeFilter === 'favoritos') {
      return favorites.includes(index);
    }
    if (activeFilter === 'nao_lidas') {
      return unreadItems.includes(index);
    }
    return true; // Caso "todos"
  });

  return (
    <div className="px-4 py-3 space-y-1 shadow-md shadow-gray-300 rounded-md">
      {/* Campo de busca */}
      <div className="flex items-center bg-green-100 rounded-lg shadow-sm px-3 py-2">
        <FiSearch className="text-green-900 mr-2" />
        <input
          type="text"
          placeholder="Procure por Pessoas, Empresas, Grupos ou Clientes"
          className="w-full text-sm placeholder-green-900 outline-none"
        />
      </div>

      {/* Filtros */}
      <MessageFilter activeFilter={activeFilter} onFilterChange={handleFilterChange} />

      {/* Lista */}
      <ItemList
        items={filteredItems}
        favorites={favorites}
        unreadItems={unreadItems}
        toggleFavorite={toggleFavorite}
        toggleReadStatus={toggleReadStatus}
      />
    </div>
  );
};