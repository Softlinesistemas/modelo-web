"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "react-feather";
import ZoomModal from "./ZoomModal";
import type { Photo, Album } from "@/utils/models";

interface PhotoGridProps {
  fotos: Photo[];
  setFotos: (fotos: Photo[]) => void;
  albums: Album[];
  setAlbums: (albums: Album[]) => void;
}

export default function PhotoGallery({
  fotos, 
  setFotos, 
  albums, 
  setAlbums
}: PhotoGridProps) {
  const [zoomSrc, setZoomSrc] = useState<string>("");
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);

  // Alternar like
  const toggleLike = (id: string) => {
    const updated = fotos.map(photo => 
      photo.id === id ? { ...photo, likes: (photo.likes || 0) + (photo.liked ? -1 : 1), liked: !photo.liked } : photo
    );
    setFotos(updated);
  };

  return (
    <div className="pb-4">
      <div className="grid grid-cols-3 gap-0.5">
        {fotos.map((photo) => (
          <motion.div
            key={photo.id}
            className="relative aspect-square overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={photo.src}
              onClick={() => {
                setZoomSrc(photo.src);
                setActivePhoto(photo);
              }}
              alt="Foto"
              className="w-full h-full object-cover cursor-pointer"
            />
            
            {/* Overlay de interação */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-300 to-transparent p-2">
              <div className="flex justify-between items-center">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(photo.id);
                  }}
                  className="text-black"
                >
                  <Heart 
                    size={18} 
                    fill={photo.liked ? "currentColor" : "none"} 
                  />
                </button>
                <span className="text-xs text-blcak font-medium">
                  {photo.likes || 0}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal de zoom com detalhes */}
      {activePhoto && (
        <ZoomModal 
          src={zoomSrc} 
          photo={activePhoto}
          onClose={() => setZoomSrc("")}
          onLike={toggleLike}
        />
      )}
    </div>
  );
}