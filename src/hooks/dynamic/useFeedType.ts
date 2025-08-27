import { Usuario } from "@/types/User";
import { Grupo } from "@/types/Group";
import { Empresa } from "@/types/Company";

type FeedType = "pessoal" | "fornecedor" | "grupo" | "empresa";

export function useFeedType(
  user: Usuario | null | undefined,
  group?: Grupo | null | undefined,
  company?: Empresa | null | undefined,
) {
  let tipo: FeedType = "pessoal";
  let id: number | undefined = user?.CodUsuario;

  if (user?.Fornecedor) {
    tipo = "fornecedor";
    id = user.CodUsuario;
  } else if (group) {
    tipo = "grupo";
    id = group.CodGrupo;
  } else if (company) {
    tipo = "empresa";
    id = company.CodEmpresa;
  }

  return { tipo, id };
}
