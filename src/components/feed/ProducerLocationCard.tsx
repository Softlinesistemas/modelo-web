'use client'
import { FaMapMarkerAlt } from 'react-icons/fa';

export const ProducerLocationCard = () => {
  return (
    <div className="bg-white rounded shadow p-3 mb-2 text-sm">
      <div className="flex justify-between">
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
