'use client'

import React, { useContext } from 'react';
import {
  FiHome,
  FiUsers,
  FiLayers,
  FiGlobe,
  FiDollarSign,
} from 'react-icons/fi';

export const ActionContext = React.createContext<{
  setActiveAction: (action: string | null) => void;
}>({
  setActiveAction: () => {},
});

export const BottomNav: React.FC = () => {
  const { setActiveAction } = useContext(ActionContext);

  const navItems = [
    {
      icon: <FiHome />,
      label: 'Central',
      color: 'text-[#8F7E76]',
      onClick: () => setActiveAction(null), 
    },
    {
      icon: <FiUsers />,
      label: 'Amigos',
      color: 'text-[#8F7E76]',
    },
    {
      icon: <FiLayers />,
      label: 'Grupos',
      color: 'text-[#8F7E76]',
    },
    {
      icon: <FiGlobe />,
      label: 'Fornecedores',
      color: 'text-[#8F7E76]',
    },
    {
      icon: <FiDollarSign />,
      label: 'Empresas',
      color: 'text-[#8F7E76]',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-inner p-2 flex justify-around border-t border-gray-200 rounded-md z-50">
      {navItems.map((nav, i) => (
        <button
          key={i}
          onClick={nav.onClick}
          disabled={!nav.onClick}
          className="flex flex-col items-center text-xs text-gray-600 hover:text-black transition"
        >
          <div className={`${nav.color} text-xl`}>{nav.icon}</div>
          <span className="mt-0.5 text-[11px] font-medium">
            {nav.label}
          </span>
        </button>
      ))}
    </nav>
  );
};
