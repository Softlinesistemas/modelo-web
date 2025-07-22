"use client";

import { useRef } from "react";
import { FaCamera, FaPaperclip } from "react-icons/fa";

export const UploadArquivo = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Arquivo selecionado:", file.name);
      // Aqui você pode fazer upload ou armazenar o arquivo
    }
  };

  return (
    <div className="border-2 border-green-600 p-4 rounded-sm text-center max-w-md mx-auto">
      <div>
        <h2 className="font-bold text-lg text-gray-800">ANEXAR ARQUIVO</h2>
        <p className="text-sm text-gray-600">
          (PDF, WORD, EXCEL, LINUX etc.)
        </p>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={handleClick}
          className="flex items-center gap-2 border border-red-600 text-red-600 px-3 py-1 rounded-md hover:bg-red-100 transition"
        >
          <FaPaperclip />
          <span>Procurar Arquivo</span>
        </button>

        <FaCamera className="text-blue-600 text-3xl" />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
