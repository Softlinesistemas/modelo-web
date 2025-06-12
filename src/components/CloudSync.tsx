'use client'

import React, { useEffect, useState } from 'react';
import { CloudSun } from 'lucide-react';

export const CloudSync = () => {
  const [weather, setWeather] = useState<any>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocalização não suportada pelo navegador.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // 🔽 Use a sua API aqui, por exemplo, OpenWeather
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
          );
          const data = await res.json();
          setWeather(data.current_weather);
        } catch (err) {
          setLocationError('Erro ao buscar dados climáticos.');
        }
      },
      () => setLocationError('Permissão de localização negada.')
    );
  }, []);

  return (
    <div className="flex flex-col items-center text-center p-6 gap-4">
      <CloudSun size={64} className="text-cyan-600" />
      <h2 className="text-2xl font-bold">Clima Atual</h2>

      {locationError ? (
        <p className="text-red-600">{locationError}</p>
      ) : weather ? (
        <>
          <div className="text-4xl font-semibold text-cyan-800">
            {weather.temperature}°C
          </div>
          <p className="text-gray-600">Vento: {weather.windspeed} km/h</p>
        </>
      ) : (
        <p className="text-gray-500">Buscando clima...</p>
      )}
    </div>
  );
};
