// Hook para Infinite Scroll
import { useEffect } from 'react';
export const useInfiniteScroll = (callback: () => void, ref: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current && ref.current.scrollTop < 100) {
        callback();
      }
    };
    const container = ref.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [callback, ref]);
};
