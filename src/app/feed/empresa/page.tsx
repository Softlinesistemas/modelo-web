"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import React from "react";

import { BotaoAgrupado } from "@/components/feed/BotaoAgrupado";
import { SocialIcons } from "@/components/feed/SocialIcons";
import { ProducerLocationCard } from "@/components/feed/ProducerLocationCard";
import { ProducerTableInfo } from "@/components/feed/ProducerTableInfo";
import { FeedPostCard } from "@/components/feed/FeedPostCard";
import { MainBanner } from "@/components/MainBanner";
import { SocialLinksSection } from "@/components/buscador/SocialLinksSection";

const FeedPhotoGallery = dynamic(
  () => import("@/components/feed/FeedPhotoGallery").then((mod) => mod.FeedPhotoGallery),
  { ssr: false }
);

const ProducerCard = dynamic(
  () => import("@/components/feed/ProducerCard").then((mod) => mod.ProducerCard),
  { ssr: false }
);

export default function EmpresaPage() {
  const { id } = useParams(); // Pega o ID da URL

  // Aqui você buscaria os dados reais da empresa pelo id
  console.log("Empresa ID:", id);

  // Exemplo de fotos para o feed da empresa
  const photos = [
    { url: "/placeholder1.jpg", date: "15/03/24" },
    { url: "/placeholder2.jpg", date: "16/03/24" },
    { url: "/placeholder3.jpg", date: "17/03/24" },
    { url: "/placeholder4.jpg", date: "18/03/24" },
    { url: "/placeholder5.jpg", date: "17/04/24" },
    { url: "/placeholder6.jpg", date: "18/08/24" },
  ];

  return (
    <div className="w-full mb-4">
      <MainBanner />

      {/* Passa o tipo 'empresa' para o ProducerCard */}
      <ProducerCard mainImage="/agro-tech.png" galleryImages={[]} tipo="empresa" />

      <div className="mt-1">
        <ProducerLocationCard />
      </div>

      <FeedPhotoGallery photos={photos} />

      <div className="mt-2">
        <SocialIcons
          links={{
            gps: { lat: -23.55052, lng: -46.633308 },
            site: "https://empresa.com",
            email: "contato@empresa.com",
            altEmail: "suporte@empresa.com",
            instagram: "https://instagram.com/empresa",
            facebook: "https://facebook.com/empresa",
            youtube: "https://youtube.com/empresa",
            threads: "https://threads.net/@empresa",
            threadsAlt: "https://bs.threads.com/empresa",
            tiktok: "https://tiktok.com/@empresa",
            telefone: "+5511999999999",
            linktree: "https://linktr.ee/empresa",
            borboleta: "A",
            adicionar: true,
          }}
        />
      </div>

      <div className="flex justify-center w-full my-2">
        <BotaoAgrupado />
      </div>

      <div className="mt-2">
        <ProducerTableInfo />
      </div>

      <div className="mt-3">
        <SocialLinksSection />
      </div>

      <div className="w-full rounded-md bg-green-900 mb-4 p-1">
        <div className="mt-1 mb-6">
          <h2 className="text-white rounded-md py-1 px-3 text-center text-md font-bold">
            FEED DE REGISTROS
          </h2>
        </div>

        <FeedPostCard
          images={["/images/feed/empresa1.jpg", "/images/feed/empresa2.jpg", "/images/feed/empresa3.jpg"]}
          date="2025-07-25"
          text="Lançamos uma nova linha de produtos ecológicos, reforçando nosso compromisso com o meio ambiente."
        />

        <FeedPostCard
          images={["/images/feed/empresa4.jpg", "/images/feed/empresa5.jpg"]}
          date="2025-07-20"
          text="Nossa equipe participou do maior evento do setor, firmando parcerias estratégicas para 2026."
        />

        <FeedPostCard
          images={["/images/feed/empresa3.jpg", "/images/feed/empresa4.jpg", "/images/feed/empresa3.jpg"]}
          date="2025-07-15"
          text="Investimos em tecnologia para garantir a qualidade e sustentabilidade dos nossos processos."
        />
      </div>
    </div>
  );
}
