"use client";

import React from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const FeedPage = dynamic(() => import("@/components/feed/FeedPage"), {
  ssr: false,
});

export default function GrupoPage() {
  const params = useParams();
  const { id } = params;

  return <FeedPage tipo="grupo" id={Number(id)} />;
}
