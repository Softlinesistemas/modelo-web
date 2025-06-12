'use client'
import React, { useState } from 'react';
import { AvatarMenu } from './AvatarMenu';

type Item = {
  name: string;
  lastMessage: string;
  avatarUrl: string;
  time: string;
};

export const ItemList: React.FC = () => {
  const [selected, setSelected] = useState<Item | null>(null);

  const items: Item[] = Array.from({ length: 8 }).map((_, i) => ({
    name: `Contato ${i + 1}`,
    lastMessage: 'Última mensagem do contato exibida aqui...',
    avatarUrl: `https://i.pravatar.cc/150?img=${i + 10}`,
    time: '12:3' + i,
  }));

  return (
    <>
      <ul className="flex-1 overflow-auto p-2 space-y-2 bg-gray-50">
        {items.map((item, i) => (
          <li
            key={i}
            className="bg-white rounded-xl px-3 py-2 flex items-center shadow-sm hover:bg-gray-100 transition cursor-pointer"
          >
            
            <img
              src={item.avatarUrl}
              alt={`Avatar de ${item.name}`}
              className="w-12 h-12 rounded-full object-cover mr-3 border"
              onClick={() => setSelected(item)}
            />

            {/* Conteúdo do chat */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
              <p className="text-xs text-gray-500 truncate">
                {item.lastMessage}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de opções */}
      {selected && (
        <AvatarMenu
          isOpen={!!selected}
          name={selected.name}
          avatarUrl={selected.avatarUrl}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
};
