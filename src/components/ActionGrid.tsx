import React from 'react';
import {
  FiLayers,
  FiUsers,
  FiSearch,
  FiMessageSquare,
  FiCamera,
  FiUserPlus,
} from 'react-icons/fi';

import { useRouter } from 'next/navigation';

type Button = {
  label: string;
  icon: React.ReactNode;
  color: string; 
  onClick: () => void; // adicionando função de clique ao tipo
};

export const ActionGrid: React.FC = () => {
  const navigate = useRouter();

  const handleEditarFeed = () => {
    console.log('Editar Feed clicado');
    // Coloque aqui sua lógica de navegação ou abrir modal
  };

  const handleEditarPerfil = () => {
    console.log('Editar Perfil clicado');
  };

  const handleEditarAlbum = () => {
    console.log('Editar Álbum clicado');
  };

  const handleCriarGrupo = () => {
    console.log('Criar Grupo clicado');
  };

  const handleProcurar = () => {
    console.log('Procurar clicado');
  };

  const handleMensagem = () => {
    navigate.push('/chat');
  };

  // Lista dos botões com a função de clique vinculada
  const actionButtons: Button[] = [
    { label: 'Editar Feed', icon: <FiLayers />, color: 'bg-[#8F7E76] hover:bg-[#dfcdb5]', onClick: handleEditarFeed },
    { label: 'Editar Perfil', icon: <FiUserPlus />, color: 'bg-[#BEB780] hover:bg-[#dfcdb5]', onClick: handleEditarPerfil },
    { label: 'Editar Álbum', icon: <FiCamera />, color: 'bg-[#DFCDB5] hover:bg-[#dfcdb5]', onClick: handleEditarAlbum },
    { label: 'Criar Grupo', icon: <FiUsers />, color: 'bg-[#A1A864] hover:bg-[#dfcdb5]', onClick: handleCriarGrupo },
    { label: 'Buscador', icon: <FiSearch />, color: 'bg-[#BCC5A8] hover:bg-[#dfcdb5]', onClick: handleProcurar },
    { label: 'Mensageiro', icon: <FiMessageSquare />, color: 'bg-[#BACE77] hover:bg-[#dfcdb5]', onClick: handleMensagem },
  ];

  return (
    <div className="grid grid-cols-3 mt-1 sm:grid-cols-3 gap-2 p-4 w-full rounded-sm">
      {actionButtons.map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.onClick} // associando a função de clique aqui
          className={`flex flex-col items-center justify-center p-4 rounded-lg transition ${btn.color}`}
          type="button"
        >
          <div className="text-2xl mb-2 text-gray-700">{btn.icon}</div>
          <span className="text-sm font-medium text-gray-800">{btn.label}</span>
        </button>
      ))}
    </div>
  );
};
