// app/feed/fornecedor/[id]/page.tsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const FeedPage = dynamic(() => import("@/components/feed/FeedPage").then((m) => m.default || m.FeedPage), {
  ssr: false,
});

/**
 * Página responsável por /feed/fornecedor/[id]
 * Pega o id e renderiza o FeedPage com tipo 'fornecedor'.
 */
export default function FornecedorPage() {
  const params = useParams();
  let fornecedorId: string | undefined;
  if (typeof params.id === "string") fornecedorId = params.id;
  else if (Array.isArray(params.id)) fornecedorId = params.id[0];

  return <FeedPage tipo="fornecedor" id={fornecedorId} />;
}
