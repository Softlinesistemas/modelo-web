"use client";

import { useEffect, useState } from "react";
import { getItem, setItem } from "@/utils/storage";
import type { Photo } from "@/utils/models";

export default function HighlightSelector() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    setPhotos(getItem<Photo[]>("photos") || []);
  }, []);

  const toggleHighlight = (id: string) => {
    const updated = photos.map((photo) => {
      if (photo.id === id) {
        return { ...photo, isHighlighted: !photo.isHighlighted };
      }
      return photo;
    });

    // Limita para no máximo 6
    const highlighted = updated.filter((p) => p.isHighlighted);
    if (highlighted.length > 6) return;

    setPhotos(updated);
    setItem("photos", updated); // agora persiste dentro das fotos
  };

  return (
    <div className="mt-6">
      <h3 className="font-bold text-lg mb-4">Selecionar fotos para perfil (até 6)</h3>
      <div className="grid grid-cols-3 gap-1">
        {photos.map((photo) => (
          <div key={photo.id} className="relative">
            <img
              src={photo.src}
              className={`w-full h-[100px] object-cover cursor-pointer transition-all duration-150 ${
                photo.isHighlighted ? "ring-4 ring-green-500 scale-105" : ""
              }`}
              onClick={() => toggleHighlight(photo.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
