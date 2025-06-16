'use client'

import React from 'react';
import {
  FiPhone,
  FiVideo,
  FiInfo,
  FiMessageCircle,
  FiTrash2,
  FiStar,
  FiSlash,
} from 'react-icons/fi';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  avatarUrl: string;
};

export const AvatarMenu: React.FC<Props> = ({
  isOpen,
  onClose,
  name,
  avatarUrl,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50"
      onClick={onClose} // fechar ao clicar fora
    >
      <div
        className="bg-white w-full sm:w-80 p-4 rounded-t-2xl sm:rounded-xl shadow-lg flex flex-col items-center"
        onClick={(e) => e.stopPropagation()} // não fecha ao clicar dentro
      >
        {/* Avatar */}
        <img
          src={avatarUrl}
          alt={name}
          className="w-24 h-24 rounded-full border object-cover mb-3"
        />
        <h2 className="font-bold text-lg mb-4">{name}</h2>

        {/* Linha 1: Grid 2x2 com 4 botões */}
        <div className="grid grid-cols-3 gap-4 w-full mb-4">
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
        </div>

        {/* Linha 2: Grid 3 colunas com Bloquear, Favoritar e Excluir */}
        <div className="grid grid-cols-3 gap-4 w-full justify-center">

          <button className="flex flex-col items-center text-gray-700 hover:text-purple-500">
            <FiInfo size={20} />
            <span className="text-xs">Ver perfil</span>
          </button>
          
          <button className="flex flex-col items-center text-gray-700 hover:text-yellow-500">
            <FiStar size={20} />
            <span className="text-xs">Favoritar</span>
          </button>

          <button className="flex flex-col items-center text-gray-700 hover:text-red-600">
            <FiSlash size={20} />
            <span className="text-xs">Bloquear</span>
          </button>


          </div>
        <div className="grid grid-cols-1 gap-4 p-2 w-full justify-center"></div>
          <button className="flex flex-col items-center text-red-700 hover:text-red-600">
            <FiTrash2 size={20} />
            <span className="text-xs">Excluir</span>
          </button>

        </div>
      </div>
  );
};
