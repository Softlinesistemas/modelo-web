"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ZoomableImageProps {
  src: string;
  alt?: string;
  className?: string;
  sizes?: string;  // <- adiciona aqui
}

export const ZoomableImage: React.FC<ZoomableImageProps> = ({
  src,
  alt = "Imagem",
  className,
  sizes,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div onClick={openModal} className={`cursor-zoom-in ${className ?? ""}`}>
        <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} sizes={sizes} />
      </div>

      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 cursor-zoom-out"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 text-white text-3xl font-bold focus:outline-none"
            aria-label="Fechar zoom"
          >
            &times;
          </button>
          <div onClick={(e) => e.stopPropagation()} className="relative w-auto max-w-full max-h-full">
            <Image
              src={src}
              alt={alt}
              width={800}
              height={600}
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
};
