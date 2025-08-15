'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MobileOptimizedProps {
  children: React.ReactNode;
  enablePullToRefresh?: boolean;
  enableSwipeGestures?: boolean;
  onRefresh?: () => Promise<void>;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export default function MobileOptimized({
  children,
  enablePullToRefresh = false,
  enableSwipeGestures = false,
  onRefresh,
  onSwipeLeft,
  onSwipeRight
}: MobileOptimizedProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [isAtTop, setIsAtTop] = useState(true);

  const refreshThreshold = 80;
  const swipeThreshold = 50;

  // Check if user is at top of page
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle pull to refresh
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });

    // Pull to refresh logic
    if (enablePullToRefresh && isAtTop && !isRefreshing) {
      const deltaY = touch.clientY - touchStart.y;
      if (deltaY > 0) {
        setPullDistance(Math.min(deltaY, refreshThreshold * 1.5));
        
        // Prevent default scroll when pulling down
        if (deltaY > 10) {
          e.preventDefault();
        }
      }
    }
  };

  const handleTouchEnd = async () => {
    // Pull to refresh
    if (enablePullToRefresh && pullDistance >= refreshThreshold && onRefresh && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    
    // Swipe gestures
    if (enableSwipeGestures) {
      const deltaX = touchEnd.x - touchStart.x;
      const deltaY = Math.abs(touchEnd.y - touchStart.y);
      
      // Only trigger swipe if horizontal movement is greater than vertical
      if (Math.abs(deltaX) > swipeThreshold && Math.abs(deltaX) > deltaY) {
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      }
    }

    setPullDistance(0);
  };

  // Haptic feedback for supported devices
  const triggerHapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30]
      };
      navigator.vibrate(patterns[type]);
    }
  };

  // Trigger haptic feedback when refresh threshold is reached
  useEffect(() => {
    if (pullDistance >= refreshThreshold && !isRefreshing) {
      triggerHapticFeedback('medium');
    }
  }, [pullDistance >= refreshThreshold]);

  return (
    <div 
      className="relative min-h-screen"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull to refresh indicator */}
      {enablePullToRefresh && (pullDistance > 0 || isRefreshing) && (
        <motion.div
          className="absolute top-0 left-0 right-0 z-50 flex items-center justify-center bg-green-50 border-b border-green-200"
          style={{ height: Math.max(pullDistance, isRefreshing ? 60 : 0) }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center space-x-2 text-green-600">
            {isRefreshing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
                <span className="text-sm font-medium">Atualizando...</span>
              </>
            ) : pullDistance >= refreshThreshold ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-green-600 rounded-full flex items-center justify-center"
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </motion.div>
                <span className="text-sm font-medium">Solte para atualizar</span>
              </>
            ) : (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-green-600 rounded-full flex items-center justify-center"
                  style={{ rotate: (pullDistance / refreshThreshold) * 180 }}
                >
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </motion.div>
                <span className="text-sm font-medium">Puxe para atualizar</span>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Main content */}
      <motion.div
        style={{
          transform: `translateY(${isRefreshing ? 60 : Math.min(pullDistance * 0.5, 30)}px)`
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>

      {/* Swipe indicators */}
      {enableSwipeGestures && (
        <>
          <div className="fixed left-2 top-1/2 transform -translate-y-1/2 z-40 opacity-20 pointer-events-none">
            <motion.div
              className="w-1 h-16 bg-gray-400 rounded-full"
              animate={{
                scaleY: Math.abs(touchEnd.x - touchStart.x) > swipeThreshold ? 1.5 : 1,
                backgroundColor: touchEnd.x - touchStart.x > swipeThreshold ? '#10b981' : '#9ca3af'
              }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <div className="fixed right-2 top-1/2 transform -translate-y-1/2 z-40 opacity-20 pointer-events-none">
            <motion.div
              className="w-1 h-16 bg-gray-400 rounded-full"
              animate={{
                scaleY: Math.abs(touchEnd.x - touchStart.x) > swipeThreshold ? 1.5 : 1,
                backgroundColor: touchStart.x - touchEnd.x > swipeThreshold ? '#10b981' : '#9ca3af'
              }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </>
      )}
    </div>
  );
}

