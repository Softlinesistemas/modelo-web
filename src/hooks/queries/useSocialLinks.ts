import { getSocialLinksInfo } from '@/services/api/SocialLinks';
import { useQuery, UseQueryOptions } from 'react-query';
import { VinculoSocial } from '@/types/SocialLinks';

export const socialKeys = {
  all: ["social-links"] as const,
  list: () => [...socialKeys.all, "list"] as const,
  detail: (id: string) => [...socialKeys.all, "detail", id] as const
}

export function useSocialLinks(options?: UseQueryOptions<VinculoSocial>) {
  return useQuery<VinculoSocial>({
    queryKey: socialKeys.list(),
    queryFn: getSocialLinksInfo,
    ...options,
    // select: (data: any) =>
    //   data?.map((p: any) => ({
    //     // Caso precise tratar os dados antes de listar
    //   }))
  })
}
