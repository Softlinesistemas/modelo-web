import React from 'react';
import {
  FiLayers,
  FiUsers,
  FiSearch,
  FiMessageSquare,
  FiCamera,
  FiUserPlus,
} from 'react-icons/fi';


type Button = {
  label: string;
  icon: React.ReactNode;
  color: string; 
};

export const ActionGrid: React.FC = () => {
  // Lista de botões com cores únicas
  const actionButtons: Button[] = [
    { label: 'Editar Feed', icon: <FiLayers />, color: 'bg-[#8F7E76] hover:bg-[#dfcdb5]' },
    { label: 'Editar Perfil', icon: <FiUsers />, color: 'bg-[#BEB780] hover:bg-[#dfcdb5]' },
    { label: 'Editar Álbum', icon: <FiCamera />, color: 'bg-[#DFCDB5] hover:bg-[#dfcdb5]' },
    { label: 'Criar Grupo', icon: <FiUserPlus />, color: 'bg-[#A1A864] hover:bg-[#dfcdb5]' },
    { label: 'Procurar', icon: <FiSearch />, color: 'bg-[#BCC5A8] hover:bg-[#dfcdb5]' },
    { label: 'Mensagem', icon: <FiMessageSquare />, color: 'bg-[#BACE77] hover:bg-[#dfcdb5]' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-4">
      {actionButtons.map((btn, idx) => (
        <button
          key={idx}
          className={`flex flex-col items-center justify-center p-4 rounded-lg transition ${btn.color}`}
        >
          <div className="text-2xl mb-2 text-gray-700">{btn.icon}</div>
          <span className="text-sm font-medium text-gray-800">{btn.label}</span>
        </button>
      ))}
    </div>
  );
};