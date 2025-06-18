'use client'

import React, { useState } from 'react';
import { FiMenu, FiShare2 } from 'react-icons/fi';
import { HamburgerMenu } from './MenuHamburguer';
import { ShareModal } from './ShareModal'; 

export const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showShare, setShowShare] = useState(false);

  return (
    <>
      <header className="bg-white mb-1 border-b-2 p-1 flex items-center justify-between text-black">
        {/* Botão do menu hamburguer */}
        <button onClick={() => setShowMenu(true)}>
          <FiMenu size={24} />
        </button>

        {/* Título da aplicação */}
        <h1 className="font-bold text-sm text-center flex-1  text-green-700">GooAgro - Conectando Agricultores & Clientes.</h1>

        {/* Botão de compartilhar */}
        <button onClick={() => setShowShare(true)}>
          <FiShare2 size={24} />
        </button>
      </header>

      {/* Modal do Menu */}
      {showMenu && <HamburgerMenu onClose={() => setShowMenu(false)} isLoggedIn={false} />}

      {/* Modal de Compartilhar */}
      {showShare && <ShareModal onClose={() => setShowShare(false)} />}
    </>
  );
};