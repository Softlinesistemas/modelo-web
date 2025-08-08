// app/feed/grupo/[id]/page.tsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const FeedPage = dynamic(() => import("@/components/feed/FeedPage").then((m) => m.default || m.FeedPage), {
  ssr: false,
});

/**
 * Página responsável por /feed/grupo/[id]
 * Apenas pega o id da rota e repassa para o componente FeedPage.
 * Não sobrescreve nada.
 */
export default function GrupoPage() {
  const params = useParams();
  // params.id pode ser string | string[] | undefined
  let grupoId: string | undefined;
  if (typeof params.id === "string") grupoId = params.id;
  else if (Array.isArray(params.id)) grupoId = params.id[0];

  return <FeedPage tipo="grupo" id={grupoId} />;
}
