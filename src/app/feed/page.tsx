"use client";

import dynamic from "next/dynamic";
import { useUser } from "@/hooks/queries/useUser";
import { useGroup } from "@/hooks/queries/useGroup";
import { useCompany } from "@/hooks/queries/useCompany";
import { useFeedType } from "@/hooks/dynamic/useFeedType";
import { useAuthUser } from "@/hooks/dynamic/useAuthUser";

const FeedPage = dynamic(() => import("@/components/feed/FeedPage"), {
  ssr: false,
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

  const { tipo, id } = useFeedType(
    dataUser,
    dataGroup,
    dataCompany
  );

  return <FeedPage dataUser={dataUser} tipo={tipo} id={id} />;
}
