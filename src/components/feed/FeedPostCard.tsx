'use client';

import { useState } from 'react';
import { FaHeart, FaRegHeart, FaRegStar, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface FeedPostCardProps {
  images: string[]; // Alterado para array de imagens
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
    <div className="bg-green-100 rounded-xl shadow p-2 w-full max-w-md mx-auto mb-4 cursor-pointer">
      
      {/* Carrossel de Imagens */}
      <div className="relative rounded overflow-hidden mb-2">
        <img
          src={images[currentImageIndex]}
          alt={`Imagem ${currentImageIndex + 1} do post`}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/placeholder.jpg';
          }}
          className="w-full h-48 object-cover rounded-t"
        />

        {/* Controles de navegação do carrossel */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white rounded-full p-1 hover:bg-black/50 transition"
              aria-label="Imagem anterior"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={goToNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white rounded-full p-1 hover:bg-black/50 transition"
              aria-label="Próxima imagem"
            >
              <FaChevronRight />
            </button>
            
            {/* Indicador de posição */}
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

      {/* Ações */}
      <div className="flex justify-between items-center mt-2 px-2">
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLike();
            }}
            className="flex items-center gap-1 text-green-800 hover:text-green-600 transition"
          >
            {liked ? <FaHeart className="text-green-500" /> : <FaRegHeart />}
            <span className="text-xs">Curtir</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
            className="flex items-center gap-1 text-green-800 hover:text-yellow-500 transition"
          >
            {favorited ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
            <span className="text-xs">Favoritar</span>
          </button>
        </div>
        
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500">
            {currentImageIndex + 1}/{images.length}
          </span>
        </div>
      </div>

      {/* Data */}
      <p className="text-center text-sm font-semibold text-gray-800 mt-2">
        {formatDate(date)}
      </p>

      {/* Texto */}
      <p className="text-sm text-gray-700 px-2 mt-1">{text}</p>
    </div>
  );
};