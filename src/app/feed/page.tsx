"use client";

import dynamic from "next/dynamic";
import { useUser } from "@/hooks/queries/useUser";
import { useGroup } from "@/hooks/queries/useGroup";
import { useCompany } from "@/hooks/queries/useCompany";
import { useFeedType } from "@/hooks/dynamic/useFeedType";
import { useAuthUser } from "@/hooks/dynamic/useAuthUser";
import { usePostsByUserName } from "@/hooks/queries/usePosts";

const FeedPage = dynamic(() => import("@/components/feed/FeedPage"), {
  ssr: false,
  loading: () => <p>Carregando...</p>
});

export default function PersonalFeedPage() {
  const authUser = useAuthUser();

  const { data: dataUser, isLoading: loadingUser } = useUser({
    enabled: !!authUser && authUser.Role === "USER",
  });

  const { data: dataGroup, isLoading: loadingGroup } = useGroup({
    enabled: !!authUser && authUser.Role === "GROUP",
  });

  const { data: dataCompany, isLoading: loadingCompany } = useCompany({
    enabled: !!authUser && authUser.Role === "COMPANY",
  });

  const { data: dataPosts, isLoading: loadingPosts } = usePostsByUserName(authUser?.Usuario, { 
    enabled: !!authUser
  });

  if (!authUser) return <div>Carregando...</div>;

  const { tipo, id } = useFeedType(
    dataUser,
    dataGroup,
    dataCompany
  );

  return <FeedPage dataUser={dataUser} dataPosts={dataPosts} tipo={tipo} id={id} />;
}
