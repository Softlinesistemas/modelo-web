'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCw, Download, X } from 'react-feather';

interface ZoomableImageProps {
  src: string;
  alt?: string;
  className?: string;
  enableFullscreen?: boolean;
  enableDownload?: boolean;
  enableRotate?: boolean;
  maxZoom?: number;
  minZoom?: number;
  sizes?: string;
}

export default function ZoomableImage({
  src,
  alt = 'Imagem',
  className = '',
  enableFullscreen = true,
  enableDownload = false,
  enableRotate = false,
  maxZoom = 5,
  minZoom = 0.5,
  sizes
}: ZoomableImageProps) {
  // Estados principais
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState(0);

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isFullscreen) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
      setRotation(0);
    }
  }, [isFullscreen]);

  // Função para calcular distância entre dois toques
  const getTouchDistance = (touches: React.TouchList) => {
    const [touch1, touch2] = Array.from(touches);
    if (!touch1 || !touch2) return 0;
    return Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
  };

  // Zoom com scroll
  const handleWheel = (e: React.WheelEvent) => {
    if (!isFullscreen) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(minZoom, Math.min(maxZoom, zoom + delta));
    setZoom(newZoom);
  };

  // Drag com mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isFullscreen || zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isFullscreen) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const handleMouseUp = () => setIsDragging(false);

  // Drag e pinch touch
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isFullscreen) return;
    if (e.touches.length === 2) setLastTouchDistance(getTouchDistance(e.touches));
    else if (e.touches.length === 1 && zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
    }
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isFullscreen) return;
    e.preventDefault();
    if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches);
      if (lastTouchDistance > 0) {
        const newZoom = Math.max(minZoom, Math.min(maxZoom, zoom * (distance / lastTouchDistance)));
        setZoom(newZoom);
      }
      setLastTouchDistance(distance);
    } else if (e.touches.length === 1 && isDragging) {
      setPosition({ x: e.touches[0].clientX - dragStart.x, y: e.touches[0].clientY - dragStart.y });
    }
  };
  const handleTouchEnd = () => {
    setIsDragging(false);
    setLastTouchDistance(0);
  };

  // Botões de controle
  const zoomIn = () => setZoom(prev => Math.min(maxZoom, prev + 0.5));
  const zoomOut = () => {
    const newZoom = Math.max(minZoom, zoom - 0.5);
    setZoom(newZoom);
    if (newZoom <= 1) setPosition({ x: 0, y: 0 });
  };
  const resetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };
  const rotate = () => setRotation(prev => (prev + 90) % 360);

  // Download
  const downloadImage = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = alt;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Erro ao baixar imagem:', err);
    }
  };

  return (
    <>
      {/* Thumbnail */}
      <div className={`relative group cursor-pointer ${className}`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
          onClick={() => enableFullscreen && setIsFullscreen(true)}
        />
      </div>

      {/* Modal fullscreen */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onWheel={handleWheel}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            {/* Close button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-5 right-5 text-white text-3xl font-bold focus:outline-none"
            >
              <X />
            </button>

            {/* Controls */}
            <div className="absolute bottom-5 flex gap-3 bg-black bg-opacity-50 p-2 rounded-lg">
              <button onClick={zoomIn} className="text-white"><ZoomIn /></button>
              <button onClick={zoomOut} className="text-white"><ZoomOut /></button>
              <button onClick={resetZoom} className="text-white">Reset</button>
              {enableRotate && <button onClick={rotate} className="text-white"><RotateCw /></button>}
              {enableDownload && <button onClick={downloadImage} className="text-white"><Download /></button>}
            </div>

            {/* Imagem */}
            <motion.img
              ref={imageRef}
              src={src}
              alt={alt}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                touchAction: 'none',
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              className="max-w-full max-h-full rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
