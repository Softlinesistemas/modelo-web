'use client'

import React, { useState } from 'react';
import { FiCalendar, FiClock, FiCloud, FiChevronDown } from 'react-icons/fi';
import { MdOutlineQrCodeScanner } from "react-icons/md";
import QrCode from './QrCode';
import { Button } from '@/utils/ui/Button';

export const UserSelect: React.FC<{ onActionSelect?: (action: string) => void }> = ({ onActionSelect }) => {
  const handleSearchClick = () => onActionSelect?.('qrcode');
  const handleCalendarClick = () => onActionSelect?.('calendar');
  const handleClockClick = () => onActionSelect?.('clock');
  const handleCloudClick = () => onActionSelect?.('cloud');

  const [showDropdown, setShowDropdown] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  const [selectedUser, setSelectedUser] = useState({
    name: 'Maria da Silva',
    
  });

  const users = [
    { name: 'Sítio Canaã - Alimentos Orgânicos' },
    { name: 'Maria da Silva'},
    // { name: 'Maria Souza', role: 'Operadora' },
    // { name: 'Carlos Lima', role: 'Supervisor' },
  ];

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const selectUser = (user: { name: string;}) => {
    setSelectedUser(user);
    setShowDropdown(false);
  };

  const handleCloseQrCode = () => setShowQrCode(false); // Fechar QR Code se quiser

  return (
    <div className="bg-[#B6D2B7] py-2">
      {/* Renderiza o QR Code ou a seleção de usuário */}
      {showQrCode ? (
        <QrCode 
          qrValue="https://seusite.com/usuario/123" 
          onScanClick={handleCloseQrCode}
        />
      ) : (
        <div className="flex h-28 w-full gap-1">
          {/* Avatar */}
          <div className="h-full rounded overflow-hidden flex-shrink-0 border-2 border-black ">
            <img
              src="/avatar2.jpeg"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Conteúdo do lado direito */}
          <div className="flex-1 flex flex-col">
            {/* Select de usuário */} 
            <div className='w-full'>
              <div className="relative w-[98.5%] ml-4">
                <button
                  onClick={toggleDropdown}
                  className="w-full text-left px-1 py-1 bg-white rounded flex items-center justify-between border-2 border-black"
                >
                  <span className="ml-2 text-md font-medium">
                    {selectedUser.name}  
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
                        {user.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Ícones de ação */}
            <div className="mt-2 flex justify-around text-gray-700 text-xl gap-1 pb-3">
              <Button
                onClick={handleSearchClick}
                className="hover:text-green-600 transition"
                title="Buscar"
                variant="userSelect"
              >
                <MdOutlineQrCodeScanner size={40} />
              </Button>

              <Button
                onClick={handleCalendarClick}
                className="hover:text-green-600 transition"
                title="Calendário"
                variant="userSelect"
              >
                <FiCalendar size={40} />
              </Button>

              <Button
                onClick={handleClockClick}
                className="hover:text-green-600 transition"
                title="Relógio"
                variant="userSelect"
              >
                <FiClock size={40} />
              </Button>

              <Button
                onClick={handleCloudClick}
                className="hover:text-green-600 transition"
                title="Nuvem"
                variant="userSelect"
              >
                <FiCloud size={40} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
