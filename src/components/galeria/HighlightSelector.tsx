"use client";

import type { Photo } from "@/utils/models";

interface HighlightSelectorProps {
  photos: Photo[];
  setPhotos: (photos: Photo[]) => void;
}

export default function HighlightSelector({ photos, setPhotos }: HighlightSelectorProps) {
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
  };

  return (
    <div>
      <h3 className="font-bold text-lg mb-4">Destaques</h3>
      <div className="flex overflow-x-auto pb-2 gap-2">
        {photos.filter(p => p.isHighlighted).map((photo) => (
          <div key={photo.id} className="flex-shrink-0">
            <div className="relative">
              <img
                src={photo.src}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <button 
                onClick={() => toggleHighlight(photo.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                <span className="text-xs">×</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <h4 className="font-medium mt-6 mb-3">Todas as fotos</h4>
      <div className="grid grid-cols-4 gap-2">
        {photos.map((photo) => (
          <div key={photo.id} className="relative">
            <img
              src={photo.src}
              className={`w-full aspect-square object-cover rounded-lg ${photo.isHighlighted ? "ring-2 ring-green-500" : ""}`}
              onClick={() => toggleHighlight(photo.id)}
            />
            {photo.isHighlighted && (
              <div className="absolute top-1 right-1 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}