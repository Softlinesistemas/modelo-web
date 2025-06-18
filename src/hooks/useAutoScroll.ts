// Hook para scroll automático
import { useEffect, useRef } from 'react';
export const useAutoScroll = (dependencyList: any[]) => {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, dependencyList);
  return endRef;
};
