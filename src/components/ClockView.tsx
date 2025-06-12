'use client'

import React, { useState, useEffect, useRef } from 'react';

export const ClockView = () => {
  // Estado do relógio atual
  const [time, setTime] = useState(new Date());

  // Estado do cronômetro (segundos)
  const [timer, setTimer] = useState(0);
  // Flag para saber se o cronômetro está rodando ou parado
  const [isRunning, setIsRunning] = useState(false);
  // Ref para guardar o intervalo do cronômetro e limpar corretamente
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  // Atualiza o relógio a cada segundo
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Controla o funcionamento do cronômetro
  useEffect(() => {
    if (isRunning) {
      timerInterval.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }

    // Limpa o intervalo se o componente desmontar ou isRunning mudar
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
        timerInterval.current = null;
      }
    };
  }, [isRunning]);

  // Função para formatar número com 2 dígitos
  const formatNumber = (n: number) => String(n).padStart(2, '0');

  // Converte segundos do cronômetro em hh:mm:ss
  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-[350px] text-center gap-6 p-6">
      {/* Relógio */}
      {/* <h2 className="text-2xl font-bold">Relógio Atual</h2>
      <div className="text-5xl font-mono text-purple-700">
        {formatNumber(time.getHours())}:{formatNumber(time.getMinutes())}:{formatNumber(time.getSeconds())}
      </div>
      <div className="text-gray-600 mb-8">
        {time.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
      </div> */}

      {/* Cronômetro */}
      <h2 className="text-2xl font-bold">Cronômetro</h2>
      <div className="text-4xl font-mono text-green-700 mb-4">{formatTimer(timer)}</div>
      <div className="flex gap-4">
        <button
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
          className={`px-4 py-2 rounded bg-green-500 text-white font-semibold disabled:bg-green-300`}
        >
          Iniciar
        </button>
        <button
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
          className={`px-4 py-2 rounded bg-red-500 text-white font-semibold disabled:bg-red-300`}
        >
          Parar
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTimer(0);
          }}
          className="px-4 py-2 rounded bg-gray-500 text-white font-semibold"
        >
          Resetar
        </button>
      </div>
    </div>
  );
};
