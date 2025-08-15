'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface UseZoomOptions {
  maxZoom?: number;
  minZoom?: number;
  initialZoom?: number;
  zoomStep?: number;
  enablePinchZoom?: boolean;
  enableWheelZoom?: boolean;
  enableDoubleClickZoom?: boolean;
}

interface ZoomState {
  zoom: number;
  position: { x: number; y: number };
  rotation: number;
  isDragging: boolean;
}

export function useZoom({
  maxZoom = 5,
  minZoom = 0.5,
  initialZoom = 1,
  zoomStep = 0.5,
  enablePinchZoom = true,
  enableWheelZoom = true,
  enableDoubleClickZoom = true
}: UseZoomOptions = {}) {
  const [state, setState] = useState<ZoomState>({
    zoom: initialZoom,
    position: { x: 0, y: 0 },
    rotation: 0,
    isDragging: false
  });

  const dragStartRef = useRef({ x: 0, y: 0 });
  const lastTouchDistanceRef = useRef(0);
  const containerRef = useRef<HTMLElement>(null);

  // Reset position when zoom changes to 1 or below
  useEffect(() => {
    if (state.zoom <= 1) {
      setState(prev => ({ ...prev, position: { x: 0, y: 0 } }));
    }
  }, [state.zoom]);

  const setZoom = useCallback((newZoom: number) => {
    const clampedZoom = Math.max(minZoom, Math.min(maxZoom, newZoom));
    setState(prev => ({ ...prev, zoom: clampedZoom }));
  }, [maxZoom, minZoom]);

  const setPosition = useCallback((newPosition: { x: number; y: number }) => {
    setState(prev => ({ ...prev, position: newPosition }));
  }, []);

  const setRotation = useCallback((newRotation: number) => {
    setState(prev => ({ ...prev, rotation: newRotation }));
  }, []);

  const zoomIn = useCallback(() => {
    setZoom(state.zoom + zoomStep);
  }, [state.zoom, zoomStep, setZoom]);

  const zoomOut = useCallback(() => {
    setZoom(state.zoom - zoomStep);
  }, [state.zoom, zoomStep, setZoom]);

  const resetZoom = useCallback(() => {
    setState({
      zoom: initialZoom,
      position: { x: 0, y: 0 },
      rotation: 0,
      isDragging: false
    });
  }, [initialZoom]);

  const rotate = useCallback((degrees: number = 90) => {
    setRotation((state.rotation + degrees) % 360);
  }, [state.rotation, setRotation]);

  // Touch distance calculation
  const getTouchDistance = useCallback((touches: TouchList) => {
    if (touches.length < 2) return 0;
    
    const touch1 = touches[0];
    const touch2 = touches[1];
    
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  }, []);

  // Event handlers
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!enableWheelZoom) return;
    
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(state.zoom + delta);
  }, [enableWheelZoom, state.zoom, setZoom]);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (state.zoom <= 1) return;
    
    setState(prev => ({ ...prev, isDragging: true }));
    dragStartRef.current = {
      x: e.clientX - state.position.x,
      y: e.clientY - state.position.y
    };
  }, [state.zoom, state.position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!state.isDragging) return;
    
    setPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  }, [state.isDragging, setPosition]);

  const handleMouseUp = useCallback(() => {
    setState(prev => ({ ...prev, isDragging: false }));
  }, []);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!enablePinchZoom) return;
    
    if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches);
      lastTouchDistanceRef.current = distance;
    } else if (e.touches.length === 1 && state.zoom > 1) {
      setState(prev => ({ ...prev, isDragging: true }));
      dragStartRef.current = {
        x: e.touches[0].clientX - state.position.x,
        y: e.touches[0].clientY - state.position.y
      };
    }
  }, [enablePinchZoom, getTouchDistance, state.zoom, state.position]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!enablePinchZoom) return;
    
    e.preventDefault();
    
    if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches);
      if (lastTouchDistanceRef.current > 0) {
        const scale = distance / lastTouchDistanceRef.current;
        setZoom(state.zoom * scale);
      }
      lastTouchDistanceRef.current = distance;
    } else if (e.touches.length === 1 && state.isDragging) {
      setPosition({
        x: e.touches[0].clientX - dragStartRef.current.x,
        y: e.touches[0].clientY - dragStartRef.current.y
      });
    }
  }, [enablePinchZoom, getTouchDistance, state.zoom, state.isDragging, setZoom, setPosition]);

  const handleTouchEnd = useCallback(() => {
    setState(prev => ({ ...prev, isDragging: false }));
    lastTouchDistanceRef.current = 0;
  }, []);

  const handleDoubleClick = useCallback(() => {
    if (!enableDoubleClickZoom) return;
    
    if (state.zoom > 1) {
      resetZoom();
    } else {
      setZoom(2);
    }
  }, [enableDoubleClickZoom, state.zoom, resetZoom, setZoom]);

  // Bind events to container
  const bindEvents = useCallback((element: HTMLElement | null) => {
    if (!element) return;
    
    containerRef.current = element;
    
    // Mouse events
    element.addEventListener('wheel', handleWheel, { passive: false });
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mouseleave', handleMouseUp);
    
    // Touch events
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);
    
    // Double click
    element.addEventListener('dblclick', handleDoubleClick);
    
    return () => {
      element.removeEventListener('wheel', handleWheel);
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('mouseleave', handleMouseUp);
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('dblclick', handleDoubleClick);
    };
  }, [
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleDoubleClick
  ]);

  // Transform style
  const getTransformStyle = useCallback(() => {
    return {
      transform: `scale(${state.zoom}) translate(${state.position.x / state.zoom}px, ${state.position.y / state.zoom}px) rotate(${state.rotation}deg)`,
      transformOrigin: 'center center',
      cursor: state.zoom > 1 ? (state.isDragging ? 'grabbing' : 'grab') : 'default'
    };
  }, [state]);

  return {
    // State
    zoom: state.zoom,
    position: state.position,
    rotation: state.rotation,
    isDragging: state.isDragging,
    
    // Actions
    zoomIn,
    zoomOut,
    resetZoom,
    rotate,
    setZoom,
    setPosition,
    setRotation,
    
    // Utilities
    bindEvents,
    getTransformStyle,
    
    // Limits
    canZoomIn: state.zoom < maxZoom,
    canZoomOut: state.zoom > minZoom,
    isZoomed: state.zoom > 1
  };
}

