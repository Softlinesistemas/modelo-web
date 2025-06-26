// components/PhotoGallery.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, ZoomIn } from "react-feather";
import ZoomModal from "./ZoomModal";
// import { getItem, setItem } from "@/utils/storage";
import type { Photo, Album } from "@/utils/models";

export default function PhotoGallery({fotos, setFotos, albums, setAlbums}: any) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [zoomSrc, setZoomSrc] = useState<string>("");

  // Carrega fotos e álbuns do localStorage ao montar o componente
  // useEffect(() => {
  //   setPhotos(getItem<Photo[]>("photos") || []);
  //   setAlbums(getItem<Album[]>("albums") || []);
  // }, []);

  // Remove uma foto específica
  const removePhoto = (id: string) => {
    const updated = photos.filter((p) => p.id !== id);
    setPhotos(updated);
    // setItem("photos", updated);
  };

  // Retorna o nome do álbum dado um ID
  const getAlbumName = (id?: string) =>
    albums.find((a: any) => a.id === id)?.name || null;

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Sua Galeria
      </h2>

      {/* Grade fixa de 3 colunas */}
      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            className="relative group overflow-hidden rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-all"
            whileHover={{ scale: 1.03 }}
          >
            {/* Imagem com zoom ao clicar */}
            <img
              src={photo.src}
              onClick={() => setZoomSrc(photo.src)}
              alt="Foto"
              className="w-full h-[180px] object-cover cursor-pointer"
            />

            {/* Indicador de destaque */}
            {photo.isHighlighted && (
              <div className="absolute top-1 left-1 bg-yellow-400 text-white text-xs px-2 py-0.5 rounded shadow">
                Destaque
              </div>
            )}

            {/* Nome do álbum */}
            {photo.albumId && (
              <span className="absolute bottom-1 left-1 bg-white/80 text-xs px-2 py-0.5 rounded font-medium text-gray-700 backdrop-blur-sm">
                {getAlbumName(photo.albumId)}
              </span>
            )}

            {/* Botões visíveis apenas no hover */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Botão de Zoom */}
              <button
                onClick={() => setZoomSrc(photo.src)}
                className="bg-white/90 backdrop-blur-md text-gray-800 p-2 rounded-full shadow-lg hover:scale-105 hover:bg-white transition"
              >
                <ZoomIn size={18} />
              </button>

              {/* Botão de Remoção */}
              <button
                onClick={() => removePhoto(photo.id)}
                className="bg-red-600 text-white p-2 rounded-full shadow-lg hover:scale-105 hover:bg-red-700 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal de zoom */}
      <ZoomModal src={zoomSrc} onClose={() => setZoomSrc("")} />
    </div>
  );
}