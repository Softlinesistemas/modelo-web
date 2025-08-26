"use client";

import React, { useEffect, useState } from "react";
import { MainBanner } from "@/components/MainBanner";
import { ProducerCardForm } from "@/components/feed/ProducerCard";
import { ProducerLocationCard } from "@/components/feed/ProducerLocationCard";
import { FeedPhotoGallery } from "@/components/feed/FeedPhotoGallery";
import { SocialIcons } from "@/components/feed/SocialIcons";
import { BotaoAgrupado } from "@/components/feed/BotaoAgrupado";
import { SocialLinksSection } from "@/components/buscador/SocialLinksSection";
import { GeographicReference } from "@/components/groups/GeographicReference";
import { FeedPostCard } from "@/components/feed/FeedPostCard";
import { userFullSchema, userExtraSchema, userBasicSchema,  } from "@/schemas/userSchema"; 
import { schema }  from "@/schemas/grupoSchema";
import { z } from "zod";

type UserFull = z.infer<typeof userFullSchema>;
type UserExtra = z.infer<typeof userExtraSchema>;
type UserBasic = z.infer<typeof userBasicSchema>;
type Grupo = z.infer<typeof schema>;

interface Props {
  tipo: "grupo" | "pessoal" | "fornecedor" | "empresa";
  id?: string;
}

export const FeedPage: React.FC<Props> = ({ tipo, id }) => {
  const [entidade, setEntidade] = useState<UserFull | null>(null);
  const [data, setData] = useState<UserExtra | null>(null);
  const [basicData, setBasicData] = useState<UserBasic | null>(null);
  const [grupoData, setGrupoData] = useState<Grupo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      try {
        const res = await fetch(`/api/feed?tipo=${tipo}&id=${id}`);
        const data = await res.json();

        // valida via Zod
        const parsed = userFullSchema.parse(data);
        setEntidade(parsed);
      } catch (err) {
        console.error("Erro ao carregar feed:", err);
        setEntidade(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [tipo, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-700">Carregando feed...</p>
        </div>
      </div>
    );
  }

  if (!entidade) {
    return (
      <div className="p-6 text-center text-red-500">
        Não foi possível carregar os dados do feed.
      </div>
    );
  }

  // Fotos para galeria do primeiro post
  const photos = (entidade.posts?.[0]?.images || []).map((url) => ({
    url,
    date: entidade.posts?.[0]?.date || "",
  }));

  return (
    <div className="rounded w-full mx-auto">
      <MainBanner />

      <div className="mt-2">
        <ProducerCardForm
          mainImage={grupoData.mainImage}
          galleryImages={photos.map((p) => p.url)}
          tipo={tipo}
          dataFundacao={grupoData.dataFundacao}
        />
      </div>

      <div className="mt-1">
        <ProducerLocationCard />
      </div>

      {tipo === "grupo" && (
        <div className="">
          <GeographicReference
            bioma={grupoData.bioma || "—"}
            divisao={grupoData.divisao || "—"}
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
      )}

      <div className="mt-1">
        <FeedPhotoGallery photos={photos} />
      </div>

      <div className="mt-1">
        <SocialIcons links={entidade.socialLinks || {}} />
      </div>

      <div className="flex gap-2 my-1 items-center justify-center w-full">
        <BotaoAgrupado />
      </div>

      <div className="mt-0">
        <SocialLinksSection />
      </div>

      <div className="w-full rounded-md bg-green-900 mb-4 p-1">
        <div className="mt-1 mb-6">
          <h2 className="text-white rounded-md py-1 px-3 text-center text-md font-bold">
            FEED DE REGISTROS - {entidade.nome}
          </h2>
        </div>

        {entidade.posts?.map((post, idx) => (
          <FeedPostCard key={idx} images={post.images} date={post.date} text={post.text} />
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
