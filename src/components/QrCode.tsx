import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QrCodeProps {
  qrValue: string;
  onScanClick: () => void;
}

const QrCode: React.FC<QrCodeProps> = ({ qrValue, onScanClick }) => {
  return (
    <div className="flex flex-col h-screen bg-lime-200">

      {/* Topo com QR */}
      <div className="flex flex-col items-center justify-center bg-lime-200 p-6">
{/* 
        <p className="text-gray-700 text-lg mb-4 font-medium">
          Aponte a câmera para este código
        </p> */}

        <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm">
          <QRCodeSVG value={qrValue} size={200} />
        </div>

      </div>

      {/* Rodapé fixo com ação */}
      <div className="py-6 px-4 flex flex-col items-center">
        <button
          onClick={onScanClick}
          className='mb-1 sm:grid-cols-3 text-xl gap-2 p-4 w-full rounded-md max-w-48 bg-[#BACE77] hover:bg-[#dfcdb5]'
          // className="bg-white text-amber-600 border border-amber-600 px-10 py-4 text-lg rounded-full font-bold hover:bg-amber-100 transition duration-200 shadow-lg"
        >
          <p>📷</p> 
          <h2>Ler QR-Code</h2>
        </button>
      </div>
    </div>
  );
};

export default QrCode;
