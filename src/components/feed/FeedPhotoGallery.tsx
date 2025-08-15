"use client";

import React from "react";
import ZoomableImage from "@/utils/ui/ZoomableImage";
import { BsFillPinAngleFill } from "react-icons/bs"; // Alfinete moderno

interface FeedPhoto {
  url: string;
  date: string;
}

interface FeedPhotoGalleryProps {
  photos: FeedPhoto[];
}

export const FeedPhotoGallery: React.FC<FeedPhotoGalleryProps> = ({ photos }) => {
  return (
    <div className="flex gap-2 overflow-x-auto p-2 bg-green-900 rounded-md scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-orange-200">
      {photos.slice(0, 6).map((photo, index) => (
        <div
          key={index}
          className="relative min-w-[190px] h-[140px] rounded-md overflow-hidden border border-black shadow-sm cursor-pointer"
        >
          {/* ZoomableImage */}
          <ZoomableImage
            src={photo.url}
            alt={`Foto ${index + 1}`}
            className="relative w-full h-full"
            sizes="(max-width: 768px) 100vw, 190px"
          />

          {/* Data no canto inferior */}
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded-sm select-none pointer-events-none">
            {photo.date}
          </div>

          {/* Pin de fixação elegante no canto superior direito */}
          <div className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center pointer-events-none">
            <BsFillPinAngleFill className="text-red-600 opacity-80 w-5 h-5" />
          </div>
        </div>
      ))}
    </div>
  );
};
