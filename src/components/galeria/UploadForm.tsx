"use client";

import { useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import type { Photo } from "@/utils/models";
import { Image, Camera } from "react-feather";

interface UploadFormProps {
  onUpload?: () => void;
  setPhotos: (photos: Photo[] | ((prev: Photo[]) => Photo[])) => void;
}

export default function UploadForm({ onUpload, setPhotos }: UploadFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputCameraRef = useRef<HTMLInputElement>(null);

  const onFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  const openFileSelector = () => {
    inputFileRef.current?.click();
  };

  const openCamera = () => {
    if (inputCameraRef.current) {
      inputCameraRef.current.setAttribute("capture", "environment");
      inputCameraRef.current.click();
    }
  };

  const handleUpload = () => {
    if (files.length === 0) return;

    const newPhotos: Photo[] = files.map((file) => ({
      id: uuid(),
      date: new Date().toISOString(),
      src: URL.createObjectURL(file),
      description,
      likes: 0,
      liked: false,
      isHighlighted: false
    }));

    // Correção aqui: função de atualização correta
    setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    
    setFiles([]);
    setDescription("");
    onUpload?.();
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={openFileSelector}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-800 font-medium py-3 rounded-md"
        >
          <Image size={18} /> Galeria
        </button>
        
        <button
          type="button"
          onClick={openCamera}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-800 font-medium py-3 rounded-md"
        >
          <Camera size={18} /> Câmera
        </button>
      </div>

      <input
        ref={inputFileRef}
        type="file"
        accept="image/*"
        multiple
        onChange={onFilesSelected}
        className="hidden"
      />
      
      <input
        ref={inputCameraRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFilesSelected}
      />

      {files.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {files.map((file, idx) => (
              <div key={idx} className="aspect-square">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}
          </div>
          
          <textarea
            placeholder="Adicionar descrição..."
            className="w-full border rounded-lg p-3 text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={files.length === 0}
        className={`w-full py-3 rounded-md font-semibold transition-colors ${
          files.length === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
      >
        Publicar
      </button>
    </div>
  );
}