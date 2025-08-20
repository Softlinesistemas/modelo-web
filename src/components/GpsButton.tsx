'use client'

import React, { useState } from 'react';
import { Button } from '@/utils/ui/Button';
import { HiLocationMarker } from 'react-icons/hi';

interface GpsButtonProps {
    className?: string;
  }

export default function GpsButton({ className }: GpsButtonProps){
  const [gpsAtivo, setGpsAtivo] = useState(false);
  const [coordenadas, setCoordenadas] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleGps = () => {
    if (!gpsAtivo) {
      localizarGps();
    } else {
      setGpsAtivo(false);
      setCoordenadas(null);
    }
  };

  const localizarGps = () => {
    if (!navigator.geolocation) {
      alert('Geolocalização não é suportada pelo seu navegador');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordenadas({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setGpsAtivo(true);
        setLoading(false);
      },
      (error) => {
        alert('Erro ao obter localização: ' + error.message);
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="p-2 w-full flex flex-col md:flex-row items-center gap-4 justify-center">
      <div className="flex gap-2 items-center">
        <Button
          variant={gpsAtivo ? 'gpsAtivo' : 'gpsInativo'}
          onClick={toggleGps}
          loading={loading}
        >
          {gpsAtivo ? 'Desativar GPS' : 'Ativar GPS'}
        </Button>

        {gpsAtivo && (
          <Button variant="buscarFiltros" onClick={localizarGps} loading={loading}>
            Localizar Novamente
          </Button>
        )}
      </div>

      {gpsAtivo && coordenadas && (
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg shadow-sm w-full md:w-auto">
          <HiLocationMarker className="text-green-600 w-6 h-6 flex-shrink-0" />
          <span className="text-gray-700 text-sm md:text-base">
            {coordenadas.lat.toFixed(6)}, {coordenadas.lng.toFixed(6)}
          </span>
        </div>
      )}
    </div>
  );
};
