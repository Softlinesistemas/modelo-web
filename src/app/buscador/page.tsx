// app/search/page.tsx
'use client';
import React from 'react';
import { GooAgroFinder } from '@/components/Buscador';
import { MainBanner } from '@/components/MainBanner';

const Buscador = () => {
  return (
    <main className="min-h-screen bg-[#f1fdf1] p-4">
      <MainBanner />
      <GooAgroFinder />
    </main>
  );
};

export default Buscador;
