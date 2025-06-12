'use client'

import React, { useState, useEffect } from 'react';

export const ClockView = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex flex-col items-center justify-center h-[300px] text-center gap-4 p-6">
      <h2 className="text-2xl font-bold">Relógio Atual</h2>
      <div className="text-5xl font-mono text-purple-700">
        {formatNumber(time.getHours())}:{formatNumber(time.getMinutes())}:{formatNumber(time.getSeconds())}
      </div>
      <div className="text-gray-600">
        {time.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
      </div>
    </div>
  );
};
