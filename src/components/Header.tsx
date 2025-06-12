'use client'
import React from 'react';
import { FiMenu, FiShare2 } from 'react-icons/fi';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#3F523F] p-4 flex items-center justify-between text-white">
      {/* Botão do menu hamburguer */}
      <button>
        <FiMenu size={24} />
      </button>
      {/* Título da aplicação */}
      <h1 className="font-bold text-sm">
        GooAgro - Conectando Produtores & Clientes
      </h1>
      {/* Botão de compartilhar */}
      <button>
        <FiShare2 size={24} />
      </button>
    </header>
  );
};
