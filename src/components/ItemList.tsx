'use client';

import React, { useState } from 'react';
import { AvatarMenu } from './AvatarMenu';
import { FiStar } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

type Item = {
  name: string;
  lastMessage: string;
  avatarUrl: string;
  time: string;
};

type Props = {
  items: Item[];
  favorites: number[];
  unreadItems: number[];
  toggleFavorite: (index: number) => void;
  toggleReadStatus: (index: number) => void;
};

export const ItemList: React.FC<Props> = ({
  items,
  favorites,
  unreadItems,
  toggleFavorite,
  toggleReadStatus,
}) => {
  const [selected, setSelected] = useState<Item | null>(null);

  const handleAvatarClick = (item: Item) => {
    setSelected(item);
  };

const router = useRouter();

const handleChatClick = (index: number) => {
  const contact = items[index];
  toggleReadStatus(index); // Marca como lido
  router.push(`/message?name=${encodeURIComponent(contact.name)}&avatar=${contact.avatarUrl}`);
};

  return (
    <>
      <ul className="flex-1 overflow-auto p-2 space-y-2">
        {items.map((item, i) => {
          const isFavorite = favorites.includes(i);
          const isUnread = unreadItems.includes(i);

          return (
            <li
              key={i}
              className={`rounded-xl px-3 py-2 flex items-center shadow-sm transition ${
                isUnread ? 'bg-green-200' : 'bg-white hover:bg-gray-100'
              }`}
            >
              {/* Avatar - Só o avatar abre o modal */}
              <img
                src={item.avatarUrl}
                alt={`Avatar de ${item.name}`}
                className="w-12 h-12 rounded-sm object-cover mr-3 border cursor-pointer"
                onClick={() => handleAvatarClick(item)}
              />

              {/* Área da conversa - Abre o chat */}
              <div
                className="flex-1 min-w-0 cursor-pointer"
                onClick={() => handleChatClick(i)}
              >
                <div className="flex justify-between items-center">
                  <h3
                    className={`font-semibold text-sm truncate ${
                      isUnread ? 'text-black font-bold' : 'text-gray-800'
                    }`}
                  >
                    {item.name}
                  </h3>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
                <p
                  className={`text-xs truncate ${
                    isUnread ? 'text-black font-semibold' : 'text-gray-500'
                  }`}
                >
                  {item.lastMessage}
                </p>
              </div>

              {/* Estrela - Não deixa propagar o clique */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Isso é ESSENCIAL para evitar abrir chat/modal
                  toggleFavorite(i);
                }}
                className="ml-2"
              >
                {isFavorite ? (
                  <FaStar className="text-yellow-400" />
                ) : (
                  <FiStar className="text-gray-400 hover:text-yellow-400" />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Modal de opções (só abre se clicou no avatar) */}
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