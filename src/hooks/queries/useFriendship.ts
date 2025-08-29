import { useQuery, UseQueryOptions } from "react-query";
import { Amizade } from "@/types/User";
import { getFriendships, getFriendshipsByUserId } from "@/services/api/user";

export const friendshipKeys = {
  all: ["friendship"] as const,
  list: () => [...friendshipKeys.all, "list"] as const,
  detail: (id: string | number) => [...friendshipKeys.all, "detail", id] as const,
  between: (id1: string | number, id2: string | number) =>
    [...friendshipKeys.all, "between", id1, id2] as const,
};


export function useFriendships(options?: UseQueryOptions<Amizade[]>) {
  return useQuery<Amizade[]>({
    queryKey: friendshipKeys.list(),
    queryFn: getFriendships,
    ...options,
  });
}

export function useFriendshipsByUserId(
  id: string | number,
  options?: UseQueryOptions<Amizade[]>
) {
  return useQuery<Amizade[]>({
    queryKey: friendshipKeys.detail(id),
    queryFn: () => getFriendshipsByUserId(id),
    enabled: !!id,
    ...options,
  });
}
