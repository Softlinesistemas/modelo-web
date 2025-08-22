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
  const [userData, setUserData] = useState<any>(null);
  const [photos, setPhotos] = useState<{ url: string; date: string }[]>([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await server.get("/user");
        setUserData(res.data);

        // Se o backend retornar fotos do perfil
        setPhotos(
          res.data.galleryImages?.map((url: string, idx: number) => ({
            url,
            date: new Date().toLocaleDateString(),
          })) || []
        );
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
      }
    }
    fetchUser();
  }, []);

  if (!userData) return <div>Carregando perfil...</div>;

  // const photosGallery = userData.galleryImages?.map((url) => ({ url, date: "" })) || [];

  return (
    <div className="w-full mb-4">
      <MainBanner />

      <ProducerCard
        mainImage={userData.mainImage || "/default-profile.png"}
        galleryImages={userData.galleryImages || []}
        tipo={userData.tipo || "pessoal"}
        nome={userData.Usuario}
        descricao={userData.Email}
        extraInfo={userData.Privacidade}
        initialIsFriend={userData.isFriend || false}
        dataFundacao={userData.dataFundacao}
      />

      <div className="mt-1">
        <ProducerLocationCard endereco={userData.endereco} gps={userData.gps} />
      </div>

      <FeedPhotoGallery photos={userData.galleryImages} />

      <div className="mt-2">
        <SocialIcons links={userData.socialLinks} />

        {/* <SocialIcons
          links={{
            gps: { lat: -23.55052, lng: -46.633308 },
            site: "https://meusite.com",
            email: userData.Email,
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
          }}
        /> */}
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
          images={photos.slice(0, 3).map((p) => p.url)}
          date="2025-07-25"
          text="Novas técnicas de cultivo sustentável estão revolucionando a agricultura familiar em nossa região."
        />

        <FeedPostCard
          images={photos.slice(3, 5).map((p) => p.url)}
          date="2025-07-20"
          text="Implementamos drones para monitoramento de plantações, aumentando a produtividade em 30%."
        />
      </div>
    </div>
  );
}
