'use client';

import { useState } from 'react';
import {
  FaHeart,
  FaRegHeart,
  FaRegStar,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

interface FeedPostCardProps {
  images: string[];
  date: string;
  text: string;
}

export const FeedPostCard = ({ images, date, text }: FeedPostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleLike = () => setLiked(!liked);
  const toggleFavorite = () => setFavorited(!favorited);

  const goToNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR');
  };

  return (
    <div className="w-full lg:max-w-[98%] mx-auto mb-2 cursor-pointer gap-2">
      {/* Área verde (imagem + ações) */}
      <div className="bg-green-100 border-2 shadow overflow-hidden">
        {/* Carrossel de Imagens */}
        <div className="relative">
          <img
            src={images[currentImageIndex]}
            alt={`Imagem ${currentImageIndex + 1} do post`}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/placeholder1.jpg';
            }}
            className="w-full h-80 object-cover"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white rounded-full p-1 hover:bg-black/50"
                aria-label="Imagem anterior"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={goToNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white rounded-full p-1 hover:bg-black/50"
                aria-label="Próxima imagem"
              >
                <FaChevronRight />
              </button>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {images.map((_, index) => (
                  <span
                    key={index}
                    className={`block w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Ações + Data + Indicador */}
        <div className="flex justify-between items-center mt-2 px-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike();
                }}
                className="flex items-center gap-1 text-green-800 hover:text-green-600 transition"
              >
                {liked ? (
                  <FaHeart className="text-green-500" />
                ) : (
                  <FaRegHeart />
                )}
                <span className="text-xs">Curtir</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite();
                }}
                className="flex items-center gap-1 text-green-800 hover:text-yellow-500 transition"
              >
                {favorited ? (
                  <FaStar className="text-yellow-500" />
                ) : (
                  <FaRegStar />
                )}
                <span className="text-xs">Favoritar</span>
              </button>
            </div>
          </div>

          {/* Indicador de imagem */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">
              {currentImageIndex + 1}/{images.length}
            </span>
          </div>
        </div>
                    {/* Data */}
            <p className="text-center text-sm font-semibold text-gray-800 mt-1">
              {formatDate(date)}
            </p>
      </div>

      {/* Área branca (descrição) */}
      <div className="bg-white rounded-b-xl shadow px-4 py-2">
        <p className="text-sm text-gray-700">{text}</p>
      </div>
    </div>
  );
};