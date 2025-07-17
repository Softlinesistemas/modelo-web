'use client'
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export const GeopoliticalDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-green-200 px-4 py-2 text-sm font-medium rounded flex justify-between items-center"
      >
        Vínculos Sociais e Geopolíticos
        <FaChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="bg-white mt-1 p-3 rounded shadow text-gray-700 text-sm">
          <p>Exemplo de vínculo: Participação em cooperativas regionais, redes de agricultores, etc.</p>
        </div>
      )}
    </div>
  );
};
