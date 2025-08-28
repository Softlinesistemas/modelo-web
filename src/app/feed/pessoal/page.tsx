"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { BotaoAgrupado } from "@/components/feed/BotaoAgrupado";
import { SocialIcons } from "@/components/feed/SocialIcons";
import { ProducerLocationCard } from "@/components/feed/ProducerLocationCard";
import { ProducerTableInfo } from "@/components/feed/ProducerTableInfo";
import { FeedPostCard } from "@/components/feed/FeedPostCard";
import { MainBanner } from "@/components/MainBanner";
import { SocialLinksSection } from "@/components/buscador/SocialLinksSection";
import { server } from "@/utils/server";
import { useUser } from "@/hooks/queries/useUser";
import { useAuthUser } from "@/hooks/dynamic/useAuthUser";

const FeedPhotoGallery = dynamic(
  () =>
    import("@/components/feed/FeedPhotoGallery").then(
      (mod) => mod.FeedPhotoGallery
    ),
  { ssr: false }
);

const ProducerCard = dynamic(
  () =>
    import("@/components/feed/ProducerCard").then(
      (mod) => mod.ProducerCardForm
    ),
  { ssr: false }
);

interface UserData {
  Usuario: string;
  Email: string;
  Privacidade: "PUBLICO" | "AMIGOS" | "PRIVADO";
  ReceberAnuncios: boolean;
  TermosPrivacidade: boolean;
  mainImage?: string;
  galleryImages?: string[];
  tipo?: "pessoal" | "grupo" | "fornecedor" | "empresa";
  isFriend?: boolean;
  dataFundacao?: string;
}

export default function PessoalPage() {
  const { id } = useParams();
  const [photos, setPhotos] = useState<{ url: string; date: string }[]>([]);
  const authUser = useAuthUser();

  const { data: dataUser, isLoading: loadingUser } = useUser({
    enabled: !!authUser && authUser.Role === "USER",
  });
  
  if (!authUser) return <div>Carregando...</div>;

  // const photosGallery = dataUser?.galleryImages?.map((url) => ({ url, date: "" })) || [];

  return (
    <div className="w-full mb-4">
      <MainBanner />

      <ProducerCard
        mainImage={dataUser?.FotoPerfil || "/default-profile.png"}
        galleryImages={false || []}
        tipo={dataUser?.Fornecedor ? "fornecedor" : "pessoal"}
        nome={dataUser?.Nome}
        descricao={dataUser?.Email}
        extraInfo={dataUser?.Privacidade}
        initialIsFriend={false}
        dataFundacao={undefined}
      />

      <div className="mt-1">
        <ProducerLocationCard endereco={{bairro: dataUser?.Bairro, rua: dataUser?.Endereco, cidade: dataUser?.Cidade, estado: dataUser?.Estado, pais: dataUser?.Pais, cep: dataUser?.Cep}} gps={{lng: dataUser?.Latitude, lat: dataUser?.Longitude}} />
      </div>

      <FeedPhotoGallery photos={[]} />

      <div className="mt-2">
        {/* <SocialIcons links={dataUser?.socialLinks} /> */}

        <SocialIcons
          links={{
            gps: { lat: -23.55052, lng: -46.633308 },
            site: "https://meusite.com",
            email: dataUser?.Email,
            altEmail: "suporte@meusite.com",
            instagram: "https://instagram.com/user",
            facebook: "https://facebook.com/page",
            youtube: "https://youtube.com/channel",
            threads: "https://threads.net/@usuario",
            threadsAlt: "https://bs.threads.com/user",
            tiktok: "https://tiktok.com/@user",
            telefone: "+5511999999999",
            linktree: "https://linktr.ee/seuperfil",
            borboleta: "A",
            adicionar: true,
          } as any}
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
          images={photos?.slice(0, 3).map((p) => p.url)}
          date="2025-07-25"
          text="Novas técnicas de cultivo sustentável estão revolucionando a agricultura familiar em nossa região."
        />

        <FeedPostCard
          images={photos?.slice(3, 5).map((p) => p.url)}
          date="2025-07-20"
          text="Implementamos drones para monitoramento de plantações, aumentando a produtividade em 30%."
        />
      </div>
    </div>
  );
}
