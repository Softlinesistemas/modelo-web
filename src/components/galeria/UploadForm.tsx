"use client";

import { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { getItem, setItem } from "@/utils/storage";
import type { Photo } from "@/utils/models";

export default function UploadForm({ onUpload }: { onUpload?: () => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);

  // Recebe arquivos do input file e salva no estado
  const onFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  // Função para abrir o seletor de arquivos (galeria/câmera)
  const openFileSelector = () => {
    inputFileRef.current?.click();
  };

  // Upload: cria URLs, salva fotos no localStorage e limpa estado
  const handleUpload = () => {
    if (files.length === 0) return;

    const existing = getItem<Photo[]>("photos") || [];

    const newPhotos: Photo[] = files.map((file) => ({
      id: uuid(),
      albumId: undefined, // Removido albumId para upload livre
      date: new Date().toISOString(),
      src: URL.createObjectURL(file),
    }));

    const updated = [...existing, ...newPhotos];
    setItem("photos", updated);
    setFiles([]);
    onUpload?.();
  };

  return (
    <div className="mb-6 max-w-md mx-auto">
      <h3 className="font-bold text-lg mb-4 text-center">Adicionar Fotos</h3>

      {/* Botão que abre o seletor de arquivos */}
      <button
        type="button"
        onClick={openFileSelector}
        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-md mb-4 shadow-md"
      >
        + Carregar da galeria / Tirar foto
      </button>

      {/* Input file escondido */}
      <input
        ref={inputFileRef}
        type="file"
        accept="image/*"
        multiple
        onChange={onFilesSelected}
        className="hidden"
        capture="environment" // abre câmera em dispositivos móveis se disponível
      />

      {/* Preview das fotos selecionadas */}
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {files.map((file, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(file)}
              alt={`Preview ${idx + 1}`}
              className="w-full h-24 object-cover rounded-md shadow-sm"
            />
          ))}
        </div>
      )}

      {/* Botão para enviar as fotos selecionadas */}
      <button
        onClick={handleUpload}
        disabled={files.length === 0}
        className={`w-full py-3 rounded-md font-semibold text-white transition-colors ${
          files.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        Enviar Fotos
      </button>
    </div>
  );
}