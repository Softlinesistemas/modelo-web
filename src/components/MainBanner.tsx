'use client'
import { bannerGov } from '../../public';
import Image from 'next/image';

import React from 'react';

export const MainBanner: React.FC = () => {
  return (
    <div className="bg-[#ffffff] text-center text-sm h-16 ">
      {/* Imagem de fundo opcional — descomente e ajuste o path quando for utilizar */}
        <Image 
          src={bannerGov}
          alt="Banner ilustrativo"
          className="w-full h-full object-contain z-0"
        />
      <div className="relative z-10 ">  
        {/* <strong>Indução de defesa:</strong> uma nova abordagem no manejo de doenças
        <button className="ml-2 underline">QUERO ME INSCREVER AGORA!</button> */}
      </div>
    </div>
  );
};
