'use client';

import React, { useRef, useCallback, useEffect } from 'react';

interface TouchGesturesProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinch?: (scale: number) => void;
  onRotate?: (angle: number) => void;
  onLongPress?: () => void;
  onDoubleTap?: () => void;
  swipeThreshold?: number;
  longPressDelay?: number;
  className?: string;
}

interface TouchPoint {
  x: number;
  y: number;
  timestamp: number;
}

export default function TouchGestures({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinch,
  onRotate,
  onLongPress,
  onDoubleTap,
  swipeThreshold = 50,
  longPressDelay = 500,
  className = ''
}: TouchGesturesProps) {
  const touchStartRef = useRef<TouchPoint[]>([]);
  const touchEndRef = useRef<TouchPoint[]>([]);
  const longPressTimerRef = useRef<NodeJS.Timeout>();
  const lastTapRef = useRef<number>(0);
  const initialDistanceRef = useRef<number>(0);
  const initialAngleRef = useRef<number>(0);

  // Calculate distance between two touch points
  const getDistance = useCallback((touch1: Touch, touch2: Touch) => {
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  }, []);

  // Calculate angle between two touch points
  const getAngle = useCallback((touch1: Touch, touch2: Touch) => {
    return Math.atan2(
      touch2.clientY - touch1.clientY,
      touch2.clientX - touch1.clientX
    ) * 180 / Math.PI;
  }, []);

  // Haptic feedback
  const triggerHaptic = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30]
      };
      navigator.vibrate(patterns[type]);
    }
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touches = Array.from(e.touches).map(touch => ({
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now()
    }));
    
    touchStartRef.current = touches;
    touchEndRef.current = touches;

    // Clear any existing long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }

    // Single touch - start long press timer
    if (e.touches.length === 1 && onLongPress) {
      longPressTimerRef.current = setTimeout(() => {
        triggerHaptic('heavy');
        onLongPress();
      }, longPressDelay);
    }

    // Two touches - initialize pinch/rotate
    if (e.touches.length === 2) {
      initialDistanceRef.current = getDistance(e.touches[0], e.touches[1]);
      initialAngleRef.current = getAngle(e.touches[0], e.touches[1]);
    }
  }, [onLongPress, longPressDelay, getDistance, getAngle, triggerHaptic]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    // Clear long press timer on move
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = undefined;
    }

    const touches = Array.from(e.touches).map(touch => ({
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now()
    }));
    
    touchEndRef.current = touches;

    // Handle pinch and rotate gestures
    if (e.touches.length === 2 && touchStartRef.current.length === 2) {
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      const currentAngle = getAngle(e.touches[0], e.touches[1]);

      // Pinch gesture
      if (onPinch && initialDistanceRef.current > 0) {
        const scale = currentDistance / initialDistanceRef.current;
        onPinch(scale);
      }

      // Rotate gesture
      if (onRotate) {
        const angleDiff = currentAngle - initialAngleRef.current;
        onRotate(angleDiff);
      }
    }
  }, [onPinch, onRotate, getDistance, getAngle]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    // Clear long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = undefined;
    }

    // Only process swipes for single touch
    if (touchStartRef.current.length === 1 && touchEndRef.current.length === 1) {
      const startTouch = touchStartRef.current[0];
      const endTouch = touchEndRef.current[0];
      
      const deltaX = endTouch.x - startTouch.x;
      const deltaY = endTouch.y - startTouch.y;
      const deltaTime = endTouch.timestamp - startTouch.timestamp;
      
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const velocity = distance / deltaTime;

      // Check for double tap
      const now = Date.now();
      if (onDoubleTap && distance < 20 && deltaTime < 300) {
        if (now - lastTapRef.current < 300) {
          triggerHaptic('light');
          onDoubleTap();
          lastTapRef.current = 0; // Reset to prevent triple tap
          return;
        }
        lastTapRef.current = now;
      }

      // Check for swipe gestures
      if (distance > swipeThreshold && velocity > 0.1) {
        const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        
        // Determine swipe direction based on angle
        if (angle >= -45 && angle <= 45) {
          // Right swipe
          if (onSwipeRight) {
            triggerHaptic('light');
            onSwipeRight();
          }
        } else if (angle >= 45 && angle <= 135) {
          // Down swipe
          if (onSwipeDown) {
            triggerHaptic('light');
            onSwipeDown();
          }
        } else if (angle >= 135 || angle <= -135) {
          // Left swipe
          if (onSwipeLeft) {
            triggerHaptic('light');
            onSwipeLeft();
          }
        } else if (angle >= -135 && angle <= -45) {
          // Up swipe
          if (onSwipeUp) {
            triggerHaptic('light');
            onSwipeUp();
          }
        }
      }
    }

    // Reset references
    touchStartRef.current = [];
    touchEndRef.current = [];
    initialDistanceRef.current = 0;
    initialAngleRef.current = 0;
  }, [
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onDoubleTap,
    swipeThreshold,
    triggerHaptic
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`touch-none select-none ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        touchAction: 'none', // Prevent default touch behaviors
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none'
      }}
    >
      {children}
    </div>
  );
}

