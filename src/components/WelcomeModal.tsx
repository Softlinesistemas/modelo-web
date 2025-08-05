'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { FaTimes } from 'react-icons/fa'

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Abre automaticamente ao montar
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleRedirect = () => {
    window.location.href = "https://consultaweb.conab.gov.br/consultas/consultaPgpaf.do?method=acaoCarregarConsulta";
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen bg-black/50 px-4 py-10">
        <DialogPanel
          onClick={handleRedirect} // Redirecionar quando clicar no painel do modal
          className="bg-red-600 text-white rounded-xl p-6 w-full max-w-2xl min-h-[300px] relative cursor-pointer shadow-2xl"
        >
          <button
            onClick={(e) => {
              e.stopPropagation(); // Impede o clique no botão de fechar de redirecionar
              handleClose();
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
          >
            <FaTimes className="w-5 h-5" />
          </button>

          <div className="flex flex-col justify-center items-center text-center text-md font-semibold gap-1 px-4 pt-6">
            <p>Prezada(o)</p>
            <p>Agricultora(o) Familiar</p>
            <p className="text-yellow-300 uppercase">REGISTRE OS PREÇOS </p>
            <p className="text-yellow-300 uppercase">DOS SEUS PRODUTOS.</p>
            <p>É fácil e ajuda a</p>
            <p>Agricultura Familiar a</p>
            <p>Crescer ainda mais.</p>
            <p className="mt-2 underline text-blue-300">CLICK AQUI!</p>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default WelcomeModal;
