"use client";
import React from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useUserByUserName } from "@/hooks/queries/useUser";
import { useAuthUser } from "@/hooks/dynamic/useAuthUser";
import { usePostsByUserName } from "@/hooks/queries/usePosts";

const FeedPage = dynamic(() => import("@/components/feed/FeedPage"), {
  ssr: false,
});

export default function FeedGrupoPage() {
  const params = useParams();
  const { username } = params;
  const authUser = useAuthUser();

  const { data: dataUser, isLoading: loadingUser } = useUserByUserName(username as string, { 
    enabled: !!authUser
  });

  const { data: dataPosts, isLoading: loadingPosts } = usePostsByUserName(username as string, { 
    enabled: !!authUser
  });

  return <FeedPage dataUser={dataUser} dataPosts={dataPosts} tipo="pessoal" id={username as string} />;
}
