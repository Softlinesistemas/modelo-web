'use client'

import React, { ReactNode } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

type AppModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export const AppModal: React.FC<AppModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen bg-black/50 px-4">
        <DialogPanel className="bg-white rounded-xl p-6 w-full max-w-xl space-y-4 shadow-xl">
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>

          {/* Conteúdo injetável */}
          {children}

          {/* Botão de Fechar Opcional (Você pode tirar se não quiser) */}
          <button
            onClick={onClose}
            className="w-full py-2 mt-4 text-center text-sm text-gray-500 hover:text-black"
          >
            Fechar
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
