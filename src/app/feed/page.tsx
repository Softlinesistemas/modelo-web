// app/feed/page.tsx
"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import FeedPage from "@/components/feed/FeedPage";
import { server } from "@/utils/server";

// Carrego FeedPage client component dinamicamente (ou importe direto se preferir)
// const FeedPage = dynamic(() => import("@/components/feed/FeedPage").then((m) => m.default || m.FeedPage), {
//   ssr: false,
// });

/**
 * Página do feed principal (pessoal).
 * Aqui escolhemos exibir a Maria por padrão.
 * Se no futuro quiser passar outro id, basta alterar a rota ou usar query params.
 */
export default function PersonalFeedPage() {
  useEffect(() => {
    // Lógica para buscar dados do usuário
    async function getProfileInfo(){
      const { data } = await server.get("/user");
      console.log(data)
      return data
    }
    getProfileInfo()
  }, []);

  // ID 'maria' bate com o mock dentro do FeedPage.tsx
  return <FeedPage tipo="pessoal" id="Maria" />;
}
