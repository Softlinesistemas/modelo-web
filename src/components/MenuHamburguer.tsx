'use client'

import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

type HamburgerMenuProps = {
  onClose: () => void;
  isLoggedIn: boolean; 
};

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onClose, isLoggedIn }) => {
  const [visible, setVisible] = useState(false);

  // Ativa a transição de entrada
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300  ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Drawer */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg
          rounded-r-2xl
          transform transition-transform duration-300
          ${visible ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header do Menu */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={handleClose}>
            <FiX size={24} />
          </button>
        </div>

        {/* Itens Condicionais */}
        <nav className="flex flex-col gap-3 p-4">
          {isLoggedIn ? (
            <>
              <button className="text-left">Meu Perfil</button>
              <button className="text-left">Minhas Empresas</button>
              <button className="text-left">Amigos</button>
              <button className="text-left">Grupos</button>
              <button className="text-left text-red-600">Sair</button>
            </>
          ) : (
            <>
              <button className="text-left">Criar Conta</button>
              <button className="text-left">Entrar</button>
              <button className="text-left">Sobre o GooAgro</button>
              <button className="text-left">Ajuda</button>
            </>
          )}
        </nav>
      </div>
    </>
  );
};
