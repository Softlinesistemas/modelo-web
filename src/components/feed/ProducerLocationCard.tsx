'use client'
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FiCopy } from 'react-icons/fi';

export const ProducerLocationCard = () => {
  return (
    <div className="bg-white rounded-md shadow-sm shadow-gray-500 pb-2 mb-1 text-sm">
      <div className="flex justify-around">
        <div>
          <strong>Queimadas, Bahia, Brasil</strong>
          <p className="text-gray-600">Centro</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">Rua Rui Barbosa, 135</p>
          <p className="text-gray-600">43.730-001</p>
        </div>

      </div>
    </div>
  );
};
