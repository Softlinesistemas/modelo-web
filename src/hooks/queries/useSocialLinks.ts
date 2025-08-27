import { getSocialLinksInfo } from '@/services/api/SocialLinks';
import { useQuery, UseQueryOptions } from 'react-query';
import { VinculoSocial } from '@/types/SocialLinks';

export const profileKeys = {
  all: ["social-links"] as const,
  list: () => [...profileKeys.all, "list"] as const,
  detail: (id: string) => [...profileKeys.all, "detail", id] as const
}

export function useSocialLinks(options?: UseQueryOptions<VinculoSocial>) {
  return useQuery<VinculoSocial>({
    queryKey: profileKeys.list(),
    queryFn: getSocialLinksInfo,
    ...options,
    // select: (data: any) =>
    //   data?.map((p: any) => ({
    //     // Caso precise tratar os dados antes de listar
    //   }))
  })
}
