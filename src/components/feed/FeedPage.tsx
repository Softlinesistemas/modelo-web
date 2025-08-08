// components/feed/FeedPage.tsx
"use client";

import React from "react";
import { MainBanner } from "@/components/MainBanner";
import { ProducerCard } from "@/components/feed/ProducerCard";
import { ProducerLocationCard } from "@/components/feed/ProducerLocationCard";
import { FeedPhotoGallery } from "@/components/feed/FeedPhotoGallery";
import { SocialIcons } from "@/components/feed/SocialIcons";
import { BotaoAgrupado } from "@/components/feed/BotaoAgrupado";
import { SocialLinksSection } from "@/components/buscador/SocialLinksSection";
import { GeographicReference } from "@/components/groups/GeographicReference";
import { FeedPostCard } from "@/components/feed/FeedPostCard";

/**
 * Componente único de Feed que pode renderizar:
 *  - tipo='grupo'      -> dados do grupo por grupoId
 *  - tipo='pessoal'    -> dados pessoais por pessoaId
 *  - tipo='fornecedor' -> dados de fornecedor por fornecedorId
 *
 * Recebe:
 *  - tipo: 'grupo' | 'pessoal' | 'fornecedor'
 *  - id: string | undefined  (id vindo da rota)
 *
 * Comentado e pronto para trocar o mock por fetch/API depois.
 */

interface Props {
  tipo: "grupo" | "pessoal" | "fornecedor";
  id?: string | undefined;
}

export const FeedPage: React.FC<Props> = ({ tipo, id }) => {
  // --- MOCK CENTRALIZADO (substituir por fetch/API quando quiser) ---
  const grupos: Record<
    string,
    {
      nome: string;
      mainImage: string;
      dataFundacao: string;
      bioma: string;
      divisao: string;
      posts: { images: string[]; date: string; text: string }[];
    }
  > = {
    "1": {
      nome: "Grupo Trator",
      mainImage: "/images/trator.jpg",
      dataFundacao: "05/06/2022",
      bioma: "2 - CAATINGA",
      divisao: "TI_04 - SISAL",
      posts: [
        {
          images: ["/images/feed/ft1.jpg", "/images/feed/ft2.jpg", "/images/feed/ft3.jpg"],
          date: "2025-07-25",
          text: "Novas técnicas de cultivo sustentável estão revolucionando a agricultura familiar em nossa região.",
        },
        {
          images: ["/images/feed/ft4.jpg", "/images/feed/ft5.jpg"],
          date: "2025-07-20",
          text: "Implementamos drones para monitoramento de plantações, aumentando a produtividade em 30%.",
        },
      ],
    },
    "2": {
      nome: "Grupo Colheitadeira",
      mainImage: "/images/colheitadeira.jpg",
      dataFundacao: "10/08/2020",
      bioma: "Cerrado",
      divisao: "TI_05 - GRÃOS",
      posts: [
        {
          images: ["/images/feed/ft6.jpg"],
          date: "2025-06-15",
          text: "Novo maquinário aumentou a capacidade de colheita.",
        },
      ],
    },
  };

  const pessoas: Record<
    string,
    {
      nome: string;
      mainImage: string;
      dataFundacao?: string;
      bioma?: string;
      divisao?: string;
      posts: { images: string[]; date: string; text: string }[];
    }
  > = {
    maria: {
      nome: "Maria Silva",
      mainImage: "/avatar2.jpeg",
      dataFundacao: "15/01/2020",
      bioma: "Mata Atlântica",
      divisao: "Zona Sul",
      posts: [
        {
          images: ["/images/feed/ft6.jpg", "/images/feed/ft7.jpg"],
          date: "2025-07-10",
          text: "Compartilhei novas receitas e práticas agroecológicas.",
        },
      ],
    },
  };

  const fornecedores: Record<
    string,
    {
      nome: string;
      mainImage: string;
      dataFundacao?: string;
      bioma?: string;
      divisao?: string;
      posts: { images: string[]; date: string; text: string }[];
    }
  > = {
    f1: {
      nome: "Sitio Canaã - Alimentos Orgânicos",
      mainImage: "/avatar3.jpeg",
      dataFundacao: "01/03/2019",
      posts: [
        {
          images: ["/images/feed/ft1.jpg"],
          date: "2025-07-01",
          text: "Colheita orgânica disponível para entrega.",
        },
      ],
    },
  };

  // --- Seleção dinâmica do dataset baseado em tipo + id ---
  let entidade:
    | {
        nome: string;
        mainImage: string;
        dataFundacao?: string;
        bioma?: string;
        divisao?: string;
        posts: { images: string[]; date: string; text: string }[];
      }
    | undefined;

  if (tipo === "grupo") {
    // se id não existir, escolhe o grupo 1 por padrão (pode ajustar)
    entidade = id && grupos[id] ? grupos[id] : grupos["1"];
  } else if (tipo === "pessoal") {
    // se id não existir, usa 'maria' por padrão
    entidade = id && pessoas[id] ? pessoas[id] : pessoas["maria"];
  } else {
    // fornecedor
    entidade = id && fornecedores[id] ? fornecedores[id] : fornecedores["f1"];
  }

  // safety: se nada encontrado, exibir mensagem
  if (!entidade) {
    return (
      <div className="p-6 text-center text-red-500">
        Feed não encontrado para o id informado.
      </div>
    );
  }

  // fotos de galeria de exemplo (pode vir do entidade.posts ou outro campo)
  const photos = (entidade.posts[0]?.images || []).map((url) => ({ url, date: entidade?.posts[0]?.date || "" }));

  return (
    <div className="rounded w-full mx-auto">
      {/* Banner comum */}
      <MainBanner />

      {/* Card principal (pessoa / grupo / fornecedor) */}
      <div className="mt-2">
        <ProducerCard
          // ProducerCard espera props específicas; aqui passei mainImage, galleryImages e tipo
          mainImage={entidade.mainImage}
          galleryImages={[]} // se tiver galeria separada, passe aqui
          tipo={tipo === "pessoal" ? "pessoa" : tipo === "fornecedor" ? "fornecedor" : "grupo"}
          dataFundacao={entidade.dataFundacao}
        />
      </div>

      {/* Localização e referência geográfica */}
      <div className="mt-1">
        <ProducerLocationCard />
      </div>

      <div className="mt-1">
        <GeographicReference
          bioma={entidade.bioma || "—"}
          divisao={entidade.divisao || "—"}
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

      {/* Galeria de fotos */}
      <div className="mt-1">
        <FeedPhotoGallery photos={photos} />
      </div>

      {/* Redes / contatos */}
      <div className="mt-2">
        <SocialIcons
          links={{
            gps: { lat: -23.55052, lng: -46.633308 },
            site: "https://meusite.com",
            email: "contato@meusite.com",
            instagram: "https://instagram.com/user",
            facebook: "https://facebook.com/page",
            telefone: "+5511999999999",
            linktree: "https://linktr.ee/seuperfil",
            adicionar: true,
            borboleta: true,
          }}
        />
      </div>

      {/* Botões de ação agrupados */}
      <div className="flex gap-2 my-2 items-center justify-center w-full">
        <BotaoAgrupado />
      </div>

      <div className="mt-3">
        <SocialLinksSection />
      </div>

      {/* Feed de posts */}
      <div className="w-full rounded-md bg-green-900 mb-4 p-1">
        <div className="mt-1 mb-6">
          <h2 className="text-white rounded-md py-1 px-3 text-center text-md font-bold">
            FEED DE REGISTROS - {entidade.nome}
          </h2>
        </div>

        {entidade.posts.map((post, idx) => (
          <FeedPostCard key={idx} images={post.images} date={post.date} text={post.text} />
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
