'use client'

import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

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
    router.push(path);
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
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={handleClose}>
            <FiX size={24} />
          </button>
        </div>

        {/* Navegação */}
        <nav className="flex flex-col gap-3 p-4">
          {isLoggedIn && (
            <>
              {/* Meu Perfil */}
              <button
                className="text-left"
                onClick={() => handleNavigate('/meu-perfil')}
              >
                Meu Perfil
              </button>

              {/* Criar Perfil com Submenu */}
              <div>
                <button
                  className="text-left font-semibold"
                  onClick={() => setShowCriarPerfilSubmenu(!showCriarPerfilSubmenu)}
                >
                  Criar Perfil {showCriarPerfilSubmenu ? '▲' : '▼'}
                </button>

                {showCriarPerfilSubmenu && (
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    <button onClick={() => handleNavigate('/criar-perfil/cnpj-instituicoes')}>
                      CNPJ Instituições
                    </button>
                    <button onClick={() => handleNavigate('/criar-perfil/fornecedor-pf')}>
                      Fornecedor (Pessoa Física)
                    </button>
                    <button onClick={() => handleNavigate('/criar-perfil/fornecedor-cnpj-caf')}>
                      Fornecedor (CNPJ ou CAF)
                    </button>
                    <button onClick={() => handleNavigate('/criar-perfil/cnpj-corporativo')}>
                      CNPJ Corporativo
                    </button>
                  </div>
                )}
              </div>

              {/* Pagamento */}
              <button
                className="text-left"
                onClick={() => handleNavigate('/pagamento')}
              >
                Pagamento
              </button>
            </>
          )}

          {/* Seções públicas (Visível sempre) */}
          <button
            className="text-left"
            onClick={() => handleNavigate('/login')}
          >
            Entrar
          </button>

          <button
            className="text-left"
            onClick={() => handleNavigate('/sobre')}
          >
            Criar Perfil
          </button>

          <button
            className="text-left"
            onClick={() => handleNavigate('/sobre')}
          >
            Sobre o GooAgro
          </button>

          <button
            className="text-left"
            onClick={() => handleNavigate('/videos-tutoriais')}
          >
            Vídeos Tutoriais
          </button>

          <button
            className="text-left"
            onClick={() => handleNavigate('/ajuda')}
          >
            Ajuda / FAQ
          </button>

          {isLoggedIn && (
            <>
              {/* Sair */}
              <button
                className="text-left text-red-600"
                onClick={() => {
                  // Exemplo: Aqui você pode limpar token, session, etc
                  handleNavigate('/logout');  // Ou qualquer rota que faça o logout real
                }}
              >
                Sair
              </button>
            </>
          )}
        </nav>
      </div>
    </>
  );
};
