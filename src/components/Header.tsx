'use client'

import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { HamburgerMenu } from './MenuHamburguer';
import { ShareModal } from './ShareModal'; 
import { IoShareSocialSharp } from "react-icons/io5";

export const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showShare, setShowShare] = useState(false);

  return (
    <>
      <header className="bg-[#B6D2B7] p-1 flex items-center justify-between border-b-2 border-black  text-black fixed top-0 left-0 right-0 z-50">
        {/* Botão do menu hamburguer */}
        <button onClick={() => setShowMenu(true)}>
          <FiMenu size={24} />
        </button>

        {/* Título da aplicação */}
        <h1 className="font-bold text-[#2f5331] text-[clamp(8px, 5vw, 20px)] text-center text-xs w-full">
          GooAgro - Conectando Agricultores & Clientes.</h1>

        {/* Botão de compartilhar */}
        <button onClick={() => setShowShare(true)}>
          <IoShareSocialSharp size={24} />
        </button>
      </header>

      {/* Modal do Menu */}
      {showMenu && <HamburgerMenu onClose={() => setShowMenu(false)} isLoggedIn={false} />}

      {/* Modal de Compartilhar */}
      {showShare && <ShareModal onClose={() => setShowShare(false)} />}
    </>
  );
};