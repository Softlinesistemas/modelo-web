import { getPostsByUserName, getPostsInfo } from '@/services/api/Post';
import { useQuery, UseQueryOptions } from 'react-query';
import { Publicacoes } from "@/types/Posts"; 

export const postKeys = {
  all: ["posts"] as const,
  list: () => [...postKeys.all, "list"] as const,
  detail: (id: string) => [...postKeys.all, "detail", id] as const
}

export function usePosts(options?: UseQueryOptions<Publicacoes[]>) {
  return useQuery<Publicacoes[]>({
    queryKey: postKeys.list(),
    queryFn: getPostsInfo,
    ...options,
    // select: (data: any) =>
    //   data?.map((p: any) => ({
    //     // Caso precise tratar os dados antes de listar
    //   }))
  })
}

export function usePostsByUserName(id: string, options?: UseQueryOptions<Publicacoes[]>) {
  return useQuery<Publicacoes[]>({
    queryKey: postKeys.detail(id),
    queryFn: () => getPostsByUserName(id),
    enabled: !!id,
    ...options,
  });
}
