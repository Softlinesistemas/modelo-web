'use client'
import { bannerGov } from '../../public';
import Image from 'next/image';

import React from 'react';

export const MainBanner: React.FC = () => {
  return (
    <div className="bg-[#ffffff] text-center text-sm h-16 border-2 border-gray-900">
      {/* Imagem de fundo opcional — descomente e ajuste o path quando for utilizar */}
              <a
        href="https://www.gov.br/mda/pt-br"
        target="_blank"
        rel="boopener noreferrer"
        >
        <Image 
          src={bannerGov}
          alt="Banner ilustrativo"
          className="w-full h-full object-contain z-0"
        />
        </a>

    </div>
  );
};
