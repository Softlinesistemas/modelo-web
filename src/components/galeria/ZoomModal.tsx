"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2, X } from "react-feather";

export default function ZoomModal({
  src,
  photo,
  onClose,
  onLike
}: {
  src: string;
  photo: any;
  onClose: () => void;
  onLike: (id: string) => void;
}) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          className="fixed inset-0 bg-white z-50 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-white border-b">
            <button 
              onClick={onClose}
              className="text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          {/* Imagem */}
          <motion.div 
            className="flex-1 flex items-center justify-center p-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <img
              src={src}
              alt="Zoom"
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>

          {/* Footer com interações */}
          {photo && (
            <motion.div 
              className="p-4 bg-white border-t"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => onLike(photo.id)}
                    className="text-gray-700"
                  >
                    <Heart 
                      size={24} 
                      fill={photo.liked ? "currentColor" : "none"} 
                    />
                  </button>
                  <span className="font-medium">
                    {photo.likes || 0} curtidas
                  </span>
                </div>
              </div>
              
              {photo.description && (
                <p className="text-gray-700 mt-2">
                  {photo.description}
                </p>
              )}
              
              <div className="mt-3 text-sm text-gray-500">
                {photo.date && (
                  <p>Publicado em {new Date(photo.date).toLocaleDateString()}</p>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}