"use client";

import React from "react";
import { BotaoAgrupado } from "@/components/feed/BotaoAgrupado";
import { BotaoAlerta } from "@/components/feed/BotaoAlerta";
import { FeedPhotoGallery } from "@/components/feed/FeedPhotoGallery";
import { ProducerCard } from "@/components/feed/ProducerCard";
import { SocialIcons } from "@/components/feed/SocialIcons";
import { ProducerLocationCard } from "@/components/feed/ProducerLocationCard";
// import { ProducerTableInfo } from "@/components/feed/ProducerTableInfo";
import { FeedPostCard } from "@/components/feed/FeedPostCard";
import { MainBanner } from "@/components/MainBanner";
import { SocialLinksSection } from "@/components/buscador/SocialLinksSection";
import { GeographicReference } from "@/components/groups/GeographicReference";

interface FeedPageProps {
  grupoId?: string;
}

export default function FeedPage({ grupoId }: FeedPageProps) {
  grupoId = "1";
  // Dados simulados para as fotos
  const photos = [
    { url: "/placeholder1.jpg", date: "15/03/24" },
    { url: "/placeholder2.jpg", date: "16/03/24" },
    { url: "/placeholder3.jpg", date: "17/03/24" },
    { url: "/placeholder4.jpg", date: "18/03/24" },
    { url: "/placeholder5.jpg", date: "17/04/24" },
    { url: "/placeholder6.jpg", date: "18/08/24" },
  ];

  return (
    <div className="rounded w-full mx-auto">
      <div>
        <MainBanner />
      </div>
      <div>
        <ProducerCard
          tipo="grupo"
          mainImage={"/avatarSitio.jpg"}
          galleryImages={[]}
          dataFundacao="05/06/2022"
        />
      </div>

      <div className="mt-1">
        <ProducerLocationCard />
      </div>
      <div className="mt-1">
        <GeographicReference
          bioma="2 - CAATINGA"
          divisao="TI_04 - SISAL"
          dia="Segunda"
          inicio="08:00"
          fim="10:00"
          nivel="Intermediário"
          idadeMin={10}
          idadeMax={17}
          genero="Misto"
          mensalidade="R$ 10,00"
          avulso="R$ 10,00"
        />
      </div>

      <div>
        <FeedPhotoGallery photos={photos} />
      </div>

      <div className="mt-2">
        <SocialIcons
          links={{
            gps: { lat: -23.55052, lng: -46.633308 },
            site: "https://meusite.com",
            email: "contato@meusite.com",
            altEmail: "suporte@meusite.com",
            instagram: "https://instagram.com/user",
            facebook: "https://facebook.com/page",
            youtube: "https://youtube.com/channel",
            threads: "https://threads.net/@usuario",
            threadsAlt: "https://bs.threads.com/user",
            tiktok: "https://tiktok.com/@user",
            telefone: "+5511999999999",
            linktree: "https://linktr.ee/seuperfil",
            borboleta: true,
            adicionar: true,
          }}
        />
      </div>

      <div className="flex gap-2 my-2 items-center justify-center w-full">
        <BotaoAgrupado />
        <BotaoAlerta />
      </div>

      {/* <div className="mt-2">
        <ProducerTableInfo />
      </div> */}

      <div className="mt-3">
        <SocialLinksSection />
      </div>

      <div className="w-full rounded-md bg-green-900 mb-4 p-1">
        <div className="mt-1 mb-6">
          <h2 className="bg-green-800 text-white rounded-md py-1 px-3 text-center text-md font-bold">
            FEED / REGISTROS / MOMENTOS
          </h2>
        </div>

        {/* Posts com múltiplas imagens */}
        <FeedPostCard
          images={[
            "/images/feed/ft1.jpg",
            "/images/feed/ft2.jpg",
            "/images/feed/ft3.jpg",
          ]}
          date="2025-07-25"
          text="Novas técnicas de cultivo sustentável estão revolucionando a agricultura familiar em nossa região."
        />

        <FeedPostCard
          images={["/images/feed/ft4.jpg", "/images/feed/ft5.jpg"]}
          date="2025-07-20"
          text="Implementamos drones para monitoramento de plantações, aumentando a produtividade em 30%."
        />

        <FeedPostCard
          images={[
            "/images/feed/ft3.jpg",
            "/images/feed/ft4.jpg",
            "/images/feed/ft3.jpg",
          ]}
          date="2025-07-15"
          text="Projeto de energia solar em propriedades rurais reduz custos e impacto ambiental simultaneamente."
        />
      </div>
    </div>
  );
}
