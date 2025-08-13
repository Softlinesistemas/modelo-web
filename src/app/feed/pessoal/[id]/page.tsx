// app/feed/pessoal/[id]/page.tsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const FeedPage = dynamic(() => import("@/components/feed/FeedPage").then((m) => m.default || m.FeedPage), {
  ssr: false,
});

/**
 * Página responsável por /feed/pessoal/[id]
 * Pega o id e renderiza o FeedPage com tipo 'pessoal'.
 */
export default function pessoalPage() {
  const params = useParams();
  let pessoalId: string | undefined;
  if (typeof params.id === "string") pessoalId = params.id;
  else if (Array.isArray(params.id)) pessoalId = params.id[0];

  return <FeedPage tipo="pessoal" id={pessoalId} />;
}
