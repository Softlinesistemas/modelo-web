"use client";
import React from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useUserByUserName } from "@/hooks/queries/useUser";

const FeedPage = dynamic(() => import("@/components/feed/FeedPage"), {
  ssr: false,
});

export default function pessoalPage() {
  const params = useParams();
  const { username } = params;

  const { data: dataUser, isLoading: loadingUser } = useUserByUserName(username as string);

  return <FeedPage dataUser={dataUser} tipo="pessoal" id={username as string} />;
}
