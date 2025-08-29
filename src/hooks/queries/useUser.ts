import { getUserInfo, getUserByUserName } from '@/services/api/user';
import { useQuery, UseQueryOptions } from 'react-query';
import { Usuario, Amizade } from "@/types/User"; 

type UsuarioComFriendship = Usuario & { friendship: Amizade[] };

export const userKeys = {
  all: ["user"] as const,
  list: () => [...userKeys.all, "list"] as const,
  detail: (id: string) => [...userKeys.all, "detail", id] as const
}

export function useUser(options?: UseQueryOptions<Usuario>) {
  return useQuery<Usuario>({
    queryKey: userKeys.list(),
    queryFn: getUserInfo,
    ...options,
    // select: (data: any) =>
    //   data?.map((p: any) => ({
    //     // Caso precise tratar os dados antes de listar
    //   }))
  })
}

export function useUserByUserName(id: string, options?: UseQueryOptions<UsuarioComFriendship>) {
  return useQuery<UsuarioComFriendship>({
    queryKey: userKeys.detail(id),
    queryFn: () => getUserByUserName(id),
    enabled: !!id,
    ...options,
  });
}
