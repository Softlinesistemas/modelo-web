'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FiX, FiUser, FiEdit, FiGlobe, FiPlusSquare, FiCreditCard,
  FiDownload, FiVideo, FiInfo, FiHelpCircle, FiLogIn, FiLogOut
} from 'react-icons/fi';
import { MdOutlinePerson, MdStore, MdOutlineCorporateFare } from 'react-icons/md';

type HamburgerMenuProps = {
  onClose: () => void;
  isLoggedIn: boolean; 
};

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onClose, isLoggedIn }) => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const [showCriarPerfilSubmenu, setShowCriarPerfilSubmenu] = useState(false); // Controla exibição do submenu

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

  // Exemplos de navegação para cada item
  const handleNavigate = (path: string) => {
    handleClose();
    router.replace(`${path}`);
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Drawer */}
      <div
        className={`
          fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg
          rounded-r-2xl
          transform transition-transform duration-300
          ${visible ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={handleClose}>
            <FiX size={24} />
          </button>
        </div>

        {/* Navegação */}
        <nav className="flex flex-col gap-3 p-4 text-left text-sm text-gray-800 font-medium">
          <>
            <button className="flex items-center gap-2 text-left" onClick={() => handleNavigate('/login')}>
              <FiUser /> Meu Perfil / Cadastro Básico
            </button>

            <button className="flex items-center gap-2 text-left" onClick={() => handleNavigate('/editarPerfil')}>
              <FiEdit /> Editar Perfil / Informações Adicionais
            </button>

            <button className="flex items-center gap-2 text-left" onClick={() => handleNavigate('/feed')}>
              <FiGlobe /> Minha Tela-Pública
            </button>

            {/* Criar Perfil com Submenu */}
            <div>
              <button
                className="flex items-center gap-2 font-semibold text-left"
                onClick={() => setShowCriarPerfilSubmenu(!showCriarPerfilSubmenu)}
              >
                <FiPlusSquare />
                Criar Perfil {showCriarPerfilSubmenu ? '▲' : '▼'}
              </button>

              {showCriarPerfilSubmenu && (
                <div className="px-6 mt-2 flex flex-col gap-2 items-start text-green-800 text-sm font-normal">
                  <button className="flex items-center gap-2" onClick={() => handleNavigate('/cadastro/fornecedor-pf')}>
                    <MdOutlinePerson /> Fornecedor (Pessoa Física)
                  </button>
                  <button className="flex items-center gap-2" onClick={() => handleNavigate('/cadastro/fornecedor-pj')}>
                    <MdStore /> Fornecedor (CNPJ ou CAF)
                  </button>
                  <button className="flex items-center gap-2" onClick={() => handleNavigate('/cadastro/autonomo')}>
                    <MdOutlineCorporateFare /> CNPJ Instituições
                  </button>
                  <button className="flex items-center gap-2" onClick={() => handleNavigate('/cadastro/corporativo')}>
                    <MdOutlineCorporateFare /> CNPJ Corporativo
                  </button>
                </div>
              )}
            </div>

            <button className="flex items-center gap-2 text-left" onClick={() => handleNavigate('/pagamento')}>
              <FiCreditCard /> Pagamento / Assinatura
            </button>

            <button className="flex items-center gap-2 text-left" onClick={() => handleNavigate('/download')}>
              <FiDownload /> Arquivos Baixar / Download
            </button>
          </>

          <button className="flex items-center gap-2 text-left" onClick={() => handleNavigate('/videos-tutoriais')}>
            <FiVideo /> Vídeos Tutoriais
          </button>

          <button className="flex items-center gap-2 text-left" onClick={() => handleNavigate('/sobre')}>
            <FiInfo /> Sobre o GooAgro
          </button>

          <button className="flex items-center gap-2 text-left" onClick={() => handleNavigate('/ajuda')}>
            <FiHelpCircle /> Ajuda / FAQ
          </button>

          {isLoggedIn && (
            <>
              <button className="flex items-center gap-2 text-left" onClick={() => handleNavigate('/login')}>
                <FiLogIn /> Entrar
              </button>

              <button className="flex items-center gap-2 text-left" onClick={() => handleNavigate('/sobre')}>
                <FiPlusSquare /> Criar Perfil
              </button>
            </>
          )}

          {/* Seções públicas (Visível sempre) */}
          <button
            className="flex items-center gap-2 text-left text-red-600"
            onClick={() => {
              handleNavigate('/logout'); // Aqui você pode limpar token, session, etc
            }}
          >
            <FiLogOut /> Sair
          </button>
        </nav>
      </div>
    </>
  );
};
