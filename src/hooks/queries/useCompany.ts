import { getCompanyInfo } from '@/services/api/company';
import { useQuery, UseQueryOptions } from 'react-query';
import { Empresa } from '@/types/Company';

export const companyKeys = {
  all: ["company"] as const,
  list: () => [...companyKeys.all, "list"] as const,
  detail: (id: string) => [...companyKeys.all, "detail", id] as const
}

export function useCompany(options?: UseQueryOptions<Empresa>) {
  return useQuery<Empresa>({
    queryKey: companyKeys.list(),
    queryFn: getCompanyInfo,
    ...options,
    // select: (data: any) =>
    //   data?.map((p: any) => ({
    //     // Caso precise tratar os dados antes de listar
    //   }))
  })
}
