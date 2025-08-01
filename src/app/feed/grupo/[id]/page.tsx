"use client";

import React from "react";
import { useParams } from "next/navigation";
import FeedPage from "../page";

export default function GrupoPage() {
  const params = useParams();
  
  // params.id pode ser string | string[] | undefined
  // vamos garantir que é string ou undefined
  let grupoId: string | undefined;

  if (typeof params.id === "string") {
    grupoId = params.id;
  } else if (Array.isArray(params.id)) {
    // pega o primeiro se for array
    grupoId = params.id[0];
  } else {
    grupoId = undefined;
  }

  return <FeedPage grupoId={grupoId} />;
}
