'use client';

import { useState } from 'react';
import { FaHeart, FaRegHeart, FaRegStar, FaStar } from 'react-icons/fa';

interface FeedPostCardProps {
  imageUrl: string;
  date: string; // formato ISO ou DD/MM/YYYY
  text: string;
}

export const FeedPostCard = ({ imageUrl, date, text }: FeedPostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const toggleLike = () => setLiked(!liked);
  const toggleFavorite = () => setFavorited(!favorited);

  // Formata a data para DD/MM/YYYY
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR');
  };

  return (
    <div className="bg-green-100 rounded-xl shadow p-2 w-full max-w-md mx-auto mb-4 cursor-pointer">
      {/* Imagem */}
      <div className="rounded overflow-hidden mb-2">
        <img src={imageUrl} alt="Imagem do post" className="w-full object-cover rounded-t" />
      </div>

      {/* Data */}
      <p className="text-center text-sm font-semibold text-gray-800 mb-1">
        {formatDate(date)}
      </p>

      {/* Texto */}
      <p className="text-sm text-gray-700 px-2">{text}</p>

      {/* Ações */}
      <div className="flex justify-end items-center gap-4 mt-2 px-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike();
          }}
          className="text-xl text-green-800 hover:scale-110 transition"
        >
          {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite();
          }}
          className="text-xl text-green-800 hover:scale-110 transition"
        >
          {favorited ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
        </button>
      </div>
    </div>
  );
};