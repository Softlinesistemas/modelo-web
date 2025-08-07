'use client';

import React, { useState } from 'react';
import { FiCalendar, FiClock, FiCloud, FiChevronDown } from 'react-icons/fi';
import { MdOutlineQrCodeScanner } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import QrCode from './QrCode';
import { Button } from '@/utils/ui/Button';

export const UserSelect: React.FC<{ onActionSelect?: (action: string) => void }> = ({ onActionSelect }) => {
  const router = useRouter(); // Hook para redirecionar

  // Estados
  const [showDropdown, setShowDropdown] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  // Lista de usuários com tipo de perfil
  const users = [
    {
      name: 'Sítio Canaã - Alimentos Orgânicos',
      avatar: '/avatar3.jpeg',
      type: 'fornecedor',
    },
    {
      name: 'Maria da Silva',
      avatar: '/avatar2.jpeg',
      type: 'pessoal',
    },
    {
      name: 'Grupo Raízes Sustentáveis',
      avatar: '/avatar1.jpeg',
      type: 'grupo',
    },
    {
      name: 'AgroTech Ltda.',
      avatar: '/avatar4.jpeg',
      type: 'empresa',
    },
  ];

  // Usuário selecionado (Maria por padrão)
  const [selectedUser, setSelectedUser] = useState(users[1]);

  // Alterna visibilidade do dropdown
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  // Seleciona o usuário
  const selectUser = (user: typeof users[0]) => {
    setSelectedUser(user);
    setShowDropdown(false);
  };

  // Fecha QR Code
  const handleCloseQrCode = () => setShowQrCode(false);

  // Funções de ações dos ícones
  const handleSearchClick = () => onActionSelect?.('qrcode');
  const handleCalendarClick = () => onActionSelect?.('calendar');
  const handleClockClick = () => onActionSelect?.('clock');
  const handleCloudClick = () => onActionSelect?.('cloud');

  // Redireciona com base no tipo do usuário
  const goToFeed = () => {
    if (!selectedUser?.type) return;
    router.push(`/feed/${selectedUser.type}`);
  };

  return (
    <div className="w-full bg-[#B6D2B7] gap-2 pb-3 mt-2">
      {showQrCode ? (
        <QrCode
          qrValue="https://seusite.com/usuario/123"
          onScanClick={handleCloseQrCode}
        />
      ) : (
        <div className="flex h-28 w-full gap-1 pr-2">
          {/* 👉 Caixa do Avatar */}
          <div
            onClick={goToFeed}
            className="h-full w-24 rounded overflow-hidden flex-shrink-0 border-2 border-black cursor-pointer"
            title={`Ir para o feed de ${selectedUser.type}`}
          >
            <img
              src={selectedUser.avatar}
              alt={selectedUser.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 👉 Caixa de conteúdo ao lado */}
          <div className="flex-1 flex flex-col">
            {/* Dropdown de seleção de perfil */}
            <div className="w-full">
              <div className="relative w-full ml-2">
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

            {/* Ícones de ação (mesmos de antes) */}
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
