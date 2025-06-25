'use client';

import React from 'react';
import Image from 'next/image';

interface GroupHeaderProps {
  name: string;
  description: string;
  image: string;
}

const GroupHeader: React.FC<GroupHeaderProps> = ({ name, description, image }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
      {/* Imagem de capa do grupo */}
      <Image
        src={image}
        alt={`Banner do grupo ${name}`}
        width={80}
        height={80}
        className="rounded-lg object-cover"
      />
      <div>
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default GroupHeader;
