'use client'
import React, { useState } from 'react';
import { FiCalendar, FiClock, FiCloud, FiChevronDown } from 'react-icons/fi';
import { MdOutlineQrCodeScanner } from "react-icons/md";

export const UserSelect: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    name: 'João Silva',
    role: 'Motorista',
  });

  const users = [
    { name: 'João Silva', role: 'Motorista' },
    { name: 'Maria Souza', role: 'Operadora' },
    { name: 'Carlos Lima', role: 'Supervisor' },
  ];

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const selectUser = (user: { name: string; role: string }) => {
    setSelectedUser(user);
    setShowDropdown(false);
  };

  const handleSearchClick = () => alert('QrCODE');
  const handleCalendarClick = () => alert('Calendário...');
  const handleClockClick = () => alert('Horários...');
  const handleCloudClick = () => alert('Nuvem...');

  return (
    <div className="bg-green-100 p-3 rounded w-full max-w-md mx-auto">
      {/* Bloco com layout em linha: avatar à esquerda e conteúdo à direita */}
      <div className="flex h-[80px]">
        {/* Avatar - ocupa toda a altura */}
        <div className="w-[100px] h-full rounded overflow-hidden flex-shrink-0">
          <img
            src="/avatar.jpg"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Área à direita com select e ícones */}
        <div className="flex-1 flex flex-col justify-between ml-4">
          {/* Select de usuário */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-full text-left px-1 py-1 bg-green-200 rounded flex items-center justify-between"
            >
              <span className="text-sm font-medium">
                {selectedUser.name} - {selectedUser.role}
              </span>
              <FiChevronDown />
            </button>

            {showDropdown && (
              <div className="absolute top-full mt-1 w-full bg-white rounded shadow z-10">
                {users.map((user, index) => (
                  <div
                    key={index}
                    onClick={() => selectUser(user)}
                    className="px-3 py-2 hover:bg-green-100 cursor-pointer text-sm"
                  >
                    {user.name} - {user.role}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Ícones de ação abaixo */}
          <div className="mt-2 flex justify-around text-gray-700 text-xl">
            <button
              onClick={handleSearchClick}
              className="hover:text-green-600 transition"
              title="Buscar"
            >
              <MdOutlineQrCodeScanner size={40}/>
            </button>

            <button
              onClick={handleCalendarClick}
              className="hover:text-green-600 transition"
              title="Calendário"
            >
              <FiCalendar size={40}/>
            </button>

            <button
              onClick={handleClockClick}
              className="hover:text-green-600 transition"
              title="Relógio"
            >
              <FiClock size={40}/>
            </button>

            <button
              onClick={handleCloudClick}
              className="hover:text-green-600 transition"
              title="Nuvem"
            >
              <FiCloud size={40}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};