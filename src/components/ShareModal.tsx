'use client'

import React from 'react';
import { FiInstagram, FiFacebook, FiMail, FiCopy, FiX } from 'react-icons/fi';
import { FaWhatsapp, FaBluetoothB } from 'react-icons/fa';

interface ShareModalProps {
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ onClose }) => {
  const handleShareClick = (platform: string) => {
    console.log(`Compartilhando via: ${platform}`);
    onClose();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copiado!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-[300px] p-4 shadow-lg relative">
        {/* Botão X no topo direito */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black transition"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-center font-bold mb-4">Compartilhar link de convite</h2>

        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <button onClick={() => handleShareClick('Instagram')} className="flex flex-col items-center">
            <FiInstagram size={24} />
            Instagram
          </button>
          <button onClick={() => handleShareClick('Facebook')} className="flex flex-col items-center">
            <FiFacebook size={24} />
            Facebook
          </button>
          <button onClick={() => handleShareClick('WhatsApp')} className="flex flex-col items-center">
            <FaWhatsapp size={24} />
            WhatsApp
          </button>
          <button onClick={() => handleShareClick('E-mail')} className="flex flex-col items-center">
            <FiMail size={24} />
            E-mail
          </button>
          <button onClick={() => handleShareClick('Bluetooth')} className="flex flex-col items-center">
            <FaBluetoothB size={24} />
            Bluetooth
          </button>
          <button onClick={handleCopyLink} className="flex flex-col items-center">
            <FiCopy size={24} />
            Copiar
          </button>
        </div>
      </div>
    </div>
  );
};
