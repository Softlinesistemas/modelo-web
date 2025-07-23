'use client';

import React from 'react';
import { BotaoAgrupado } from '@/components/feed/BotaoAgrupado';
import { BotaoAlerta } from '@/components/feed/BotaoAlerta';
import { FeedPhotoGallery } from '@/components/feed/FeedPhotoGallery';
import { ProducerCard } from '@/components/feed/ProducerCard';
import { SocialIcons } from '@/components/feed/SocialIcons';
import { ProducerLocationCard } from '@/components/feed/ProducerLocationCard';
import { ProducerTableInfo } from '@/components/feed/ProducerTableInfo';
import { GeopoliticalDropdown } from '@/components/feed/GeopoliticalDropdown';
import { FeedPostCard } from '@/components/feed/FeedPostCard';
import { MainBanner } from '@/components/MainBanner';

export default function FeedPage() {
  // Dados simulados para as fotos
  const photos = [
    { url: "/placeholder1.jpg", date: "15/03/24" },
    { url: "/placeholder2.jpg", date: "16/03/24" },
    { url: "/placeholder3.jpg", date: "17/03/24" },
    { url: "/placeholder4.jpg", date: "18/03/24" },
  ];

  return (
    <div className="bg-green-100 p-2 rounded shadow max-w-md mx-auto">
      <div className='pb-0.5'>
        <MainBanner />
      </div>
       <div className="mt-1">
      <ProducerCard 
        mainImage={'/avatar2.jpeg'} 
        galleryImages={[
          '/avatar3.jpeg',
          '/avatar.jpg',
          '/avatar2.jpeg',
          '/avatar1.jpg'
        ]} 
      />
      </div>

      <div className="mt-1">
        <ProducerLocationCard />
      </div>

      <div className="mt-2">
        <FeedPhotoGallery photos={photos} />
      </div>

      <div className="mt-2">
        <SocialIcons />
      </div>

<div className="flex gap-2 my-4 items-center justify-center">
  <BotaoAgrupado />
  <BotaoAlerta />
</div>

      <ProducerTableInfo />
      
      <div className="mt-4">
        <GeopoliticalDropdown />
      </div>

      <h2 className="bg-green-800 text-white rounded py-1 px-3 mt-4 text-center text-sm">FEED</h2>
      
      {/* Adicione 3 posts idênticos */}
      {[1, 2, 3].map((_, index) => (
        <FeedPostCard
          key={index}
          imageUrl="/images/feed.jpg"
          date="2025-07-11"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin auctor suscipit urna, eu iaculis risus iaculis vitae. Fusce molestie id arcu a pellentesque."
        />
      ))}
    </div>
  );
}