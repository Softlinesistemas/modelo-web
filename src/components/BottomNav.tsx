'use client'
import { color } from 'framer-motion';
import React from 'react';
import {  FiHome,  FiUsers,  FiLayers,  FiGlobe,  FiDollarSign,} from 'react-icons/fi';

export const BottomNav: React.FC = () => {
  const navItems = [
         
    { icon: <FiHome />, label: 'Central', color: 'text-[#8F7E76]', onClick: () => alert('Central clicado'), },
    { icon: <FiUsers />, label: 'Amigos',  color: 'text-[#8F7E76]', onClick: () => alert('Amigos clicado'), },
    { icon: <FiLayers />, label: 'Grupos',  color: 'text-[#8F7E76]', onClick: () => alert('Grupos clicado'), },
    { icon: <FiGlobe />, label: 'Fornecedores',  color: 'text-[#8F7E76]', onClick: () => alert('Fornecedores clicado'), },
    { icon: <FiDollarSign />, label: 'Empresas', color: 'text-[#8F7E76]', onClick: () => alert('Empresas clicado'), },
  ];

  return (
    <nav className="bg-white shadow-inner p-2 flex justify-around">
      {navItems.map((nav, i) => (
        <button
          key={i}
          onClick={nav.onClick}
          className="flex flex-col items-center text-gray-600 text-xs"
        >
            <div className={`${nav.color}`}>{nav.icon}</div>
          <span className="text-gray-700 mt-0.5 text-[11px] font-medium">
            {nav.label}
          </span>
        </button>
      ))}
    </nav>
  );
};
