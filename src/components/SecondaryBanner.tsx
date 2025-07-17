'use client'
import { bannerGov3 } from '../../public';
import Image from 'next/image';

import React from 'react';

export const SecondaryBanner: React.FC = () => {
  return (
    <div className="bg-[#ffffff] text-center text-sm w-full h-32 rounded-md shadow-md">
      {/* Imagem de fundo opcional — descomente e ajuste o path quando for utilizar */}
      <a
        href="https://www.gov.br/mda/pt-br/acesso-a-informacao/acoes-e-programas/programas-projetos-acoes-obras-e-atividades/plano-safra-da-agricultura-familiar"
        target="_blank"
        rel="boopener noreferrer"
        >
        <Image 
          src={bannerGov3}
          alt="Banner ilustrativo"
          className="w-full max-h-full object-contain z-0"
        />
        </a>
      <div className="relative z-10 ">  
        {/* <strong>Indução de defesa:</strong> uma nova abordagem no manejo de doenças
        <button className="ml-2 underline">QUERO ME INSCREVER AGORA!</button> */}
      </div>
    </div>
  );
};