import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QrCodeProps {
  qrValue: string;
  onScanClick: () => void;
}

const QrCode: React.FC<QrCodeProps> = ({ qrValue, onScanClick }) => {
  return (
    <div className="flex flex-col h-screen bg-white">

      {/* Topo com QR */}
      <div className="flex-1 flex flex-col items-center justify-center bg-lime-200 p-6">
        <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm">
          <QRCodeSVG value={qrValue} size={200} />
        </div>
        <p className="text-gray-700 text-lg mt-4 font-medium">
          Aponte a câmera para este código
        </p>
      </div>

      {/* Rodapé fixo com ação */}
      <div className="bg-amber-400 py-6 px-4 flex flex-col items-center">
        <p className="text-gray-800 text-md font-semibold mb-2">
          Quer escanear um novo código?
        </p>
        <button
          onClick={onScanClick}
          className="bg-white text-amber-600 border border-amber-600 px-6 py-2 rounded-full font-bold hover:bg-amber-100 transition duration-200"
        >
          Ler QR-Code
        </button>
      </div>
    </div>
  );
};

export default QrCode;
