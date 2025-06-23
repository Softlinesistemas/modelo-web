'use client';

import React, { useState } from 'react';
import {
  FiLayers,
  FiUsers,
  FiSearch,
  FiMessageSquare,
  FiCamera,
  FiUserPlus,
} from 'react-icons/fi';

import { useRouter } from 'next/navigation';
import { CreateGroupModal } from './modals/CreateGroupModal';
type Button = {
  label: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
};

export const ActionGrid: React.FC = () => {
  const navigate = useRouter();
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);  // Estado de controle

  const handleEditarFeed = () => {
    console.log('Editar Feed clicado');
  };

  const handleEditarPerfil = () => {
    console.log('Editar Perfil clicado');
  };

  const handleEditarAlbum = () => {
    console.log('Editar Álbum clicado');
  };

  const handleCriarGrupo = () => {
    console.log('Criar Grupo clicado');
    setIsCreateGroupModalOpen(true);  // Abre o modal
  };

  const handleProcurar = () => {
    console.log('Procurar clicado');
  };

  const handleMensagem = () => {
    navigate.push('/chat');
  };

  const handleCloseModal = () => {
    setIsCreateGroupModalOpen(false);  // Fecha o modal
  };

  const actionButtons: Button[] = [
    { label: 'Editar Feed', icon: <FiLayers />, color: 'bg-[#8F7E76] hover:bg-[#dfcdb5]', onClick: handleEditarFeed },
    { label: 'Editar Perfil', icon: <FiUserPlus />, color: 'bg-[#BEB780] hover:bg-[#dfcdb5]', onClick: handleEditarPerfil },
    { label: 'Editar Álbum', icon: <FiCamera />, color: 'bg-[#DFCDB5] hover:bg-[#dfcdb5]', onClick: handleEditarAlbum },
    { label: 'Criar Grupo', icon: <FiUsers />, color: 'bg-[#A1A864] hover:bg-[#dfcdb5]', onClick: handleCriarGrupo },
    { label: 'Buscador', icon: <FiSearch />, color: 'bg-[#BCC5A8] hover:bg-[#dfcdb5]', onClick: handleProcurar },
    { label: 'Mensageiro', icon: <FiMessageSquare />, color: 'bg-[#BACE77] hover:bg-[#dfcdb5]', onClick: handleMensagem },
  ];

  return (
    <>
      <div className="grid grid-cols-3 mt-1 sm:grid-cols-3 gap-2 p-2 w-full rounded-sm">
        {actionButtons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.onClick}
            className={`flex flex-col items-center justify-center p-1 rounded-lg transition ${btn.color}`}
            type="button"
          >
            <div className="text-2xl mb-2 text-gray-700">{btn.icon}</div>
            <span className="text-md font-medium text-gray-800">{btn.label}</span>
          </button>
        ))}
      </div>

      {/* Modal Criar Grupo */}
      <CreateGroupModal isOpen={isCreateGroupModalOpen} onClose={handleCloseModal} />
    </>
  );
};
