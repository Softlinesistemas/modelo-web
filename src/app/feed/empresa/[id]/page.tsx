"use client";

import React from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

// Importa o FeedPage dinamicamente, desabilitando SSR (Server Side Rendering)
const FeedPage = dynamic(
  () => import("@/components/feed/FeedPage").then((m) => m.default || m.FeedPage),
  { ssr: false }
);

/**
 * Página genérica que serve para qualquer tipo de feed.
 * URL padrão: /feed/[tipo]/[id]
 * Exemplos:
 *  - /feed/empresa/e1
 *  - /feed/fornecedor/f2
 *  
 * Lê os parâmetros da URL e passa para o componente FeedPage.
 */
export default function FeedTipoPage() {
  // Pega os parâmetros da rota dinâmica
  const params = useParams();

  // Variáveis para tipo e id
  let tipo: string | undefined;
  let id: string | undefined;

  // Como params.tipo e params.id podem ser string ou array de strings,
  // fazemos essa checagem para garantir que são strings simples.
  if (typeof params.tipo === "string") tipo = params.tipo;
  else if (Array.isArray(params.tipo)) tipo = params.tipo[0];

  if (typeof params.id === "string") id = params.id;
  else if (Array.isArray(params.id)) id = params.id[0];

  // Aqui estava errado: passou 'empresa' literal, corrigi para a variável tipo.
  return <FeedPage tipo={tipo as "grupo" | "pessoal" | "fornecedor" | "empresa"} id={id} />;
}
