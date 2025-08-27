import { getGroupInfo } from '@/services/api/group';
import { useQuery, UseQueryOptions } from 'react-query';
import { Grupo } from '@/types/Group';

export const profileKeys = {
  all: ["group"] as const,
  list: () => [...profileKeys.all, "list"] as const,
  detail: (id: string) => [...profileKeys.all, "detail", id] as const
}

export function useGroup(options?: UseQueryOptions<Grupo>) {
  return useQuery<Grupo>({
    queryKey: profileKeys.list(),
    queryFn: getGroupInfo,
    ...options,
    // select: (data: any) =>
    //   data?.map((p: any) => ({
    //     // Caso precise tratar os dados antes de listar
    //   }))
  })
}
