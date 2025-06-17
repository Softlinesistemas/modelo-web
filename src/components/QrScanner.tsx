// QrScanner.tsx
import React, { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface QrScannerProps {
  onScanSuccess: (result: string) => void;
  onClose: () => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onScanSuccess, onClose }) => {
  const [loading, setLoading] = useState(true); // Estado de loading

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");

    // Iniciar câmera
    html5QrCode.start(
      { facingMode: "environment" }, // câmera traseira
      { fps: 10, qrbox: 250 },       // fps + tamanho da caixa de leitura
      (decodedText) => {
        onScanSuccess(decodedText);
        html5QrCode.stop().catch(() => {});
      },
      (errorMessage) => {
        console.warn("Falha ao ler QR:", errorMessage);
      }
    ).then(() => {
      setLoading(false); // Câmera aberta com sucesso
    }).catch(err => {
      console.error("Erro ao abrir câmera:", err);
      setLoading(false);
    });

    // Limpar câmera ao desmontar
    return () => {
      html5QrCode.stop().catch(() => {});
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
      
      {/* Mensagem de Loading */}
      {loading && (
        <p className="text-white mb-4 animate-pulse">📷 Abrindo câmera...</p>
      )}

      {/* Área do Scanner */}
      <div id="reader" className="relative w-80 h-80 bg-black rounded-lg overflow-hidden">
        {/* Mira visual (borda) */}
        {!loading && (
          <div className="absolute inset-0 border-4 border-green-400 rounded-lg pointer-events-none"></div>
        )}
      </div>

      {/* Botão de Fechar */}
      <button
        onClick={onClose}
        className="mt-6 bg-red-500 text-white px-6 py-2 rounded-full font-bold hover:bg-red-600"
      >
        ✖ Fechar Scanner
      </button>
    </div>
  );
};

export default QrScanner;
