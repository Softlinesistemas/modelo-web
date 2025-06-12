'use client'

import React from 'react';
import { FiPhone, FiVideo, FiInfo, FiMessageCircle } from 'react-icons/fi';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  avatarUrl: string;
};

export const AvatarMenu: React.FC<Props> = ({ isOpen, onClose, name, avatarUrl }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:w-80 p-4 rounded-t-2xl sm:rounded-xl shadow-lg flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={avatarUrl}
          alt={name}
          className="w-24 h-24 rounded-full border object-cover mb-3"
        />
        <h2 className="font-bold text-lg mb-4">{name}</h2>

        <div className="grid grid-cols-2 gap-4 w-full">
          <button className="flex flex-col items-center text-gray-700 hover:text-blue-500">
            <FiPhone size={20} />
            <span className="text-xs">Ligar</span>
          </button>
          <button className="flex flex-col items-center text-gray-700 hover:text-green-500">
            <FiVideo size={20} />
            <span className="text-xs">Vídeo</span>
          </button>
          <button className="flex flex-col items-center text-gray-700 hover:text-orange-500">
            <FiMessageCircle size={20} />
            <span className="text-xs">Mensagem</span>
          </button>
          <button className="flex flex-col items-center text-gray-700 hover:text-red-500">
            <FiInfo size={20} />
            <span className="text-xs">Ver perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
};
