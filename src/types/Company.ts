export type Empresa = {
  Perfil: any;
  PerfilId: number;

  Corporativo: boolean;
  Fornecedor: boolean;

  CodEmpresa: number;

  CNPJ: string;
  RazaoSocial: string;

  DiaAbertura: number;
  MesAbertura: number;
  AnoAbertura: number;

  Endereco?: string;
  NumeroEndereco?: string;
  Pais: string;
  Estado: string;
  Cidade: string;
  Bairro?: string;
  Cep?: string;
  UF?: string;

  CodUsuario: number;
  Usuario: any;
  ResponsaveisEmpresa: any[];

  NomePublico: string;
  NomeUsuario: string;
  NomeFantasia: string;
  Telefone?: string;
  Email?: string;

  AtividadePrincipalId: number;
  AtividadePrincipalTipoId: any;

  AtividadePrincipalCategoriaId?: number;
  AtividadePrincipalCategoria?: any;

  AtividadePrincipalModalidadeId?: number;
  AtividadePrincipalModalidade?: any;

  Privacidade: "PUBLICO" | "PRIVADO" | "AMIGOS";
  ReceberAnuncios: boolean;
  TermosPrivacidade: boolean;

  FotoPerfil?: string;
  Apresentacao?: string;

  OutrasAtividadesEmpresa: any[];
  Interesse: any[];

  ParticiparEvento?: boolean;

  VinculoSocial: any[];

  WhatsappTelegram?: string;
  EmailContato?: string;
  Site?: string;
  Facebook?: string;
  Instagram?: string;
  Linktree?: string;
  Youtube?: string;
  Tiktok?: string;

  CodBioma?: number;
  Bioma?: any;
  CodDivisaoGeopolitica?: number;
  DivisaoGeopolitica?: any;

  Latitude?: number;
  Longitude?: number;

  ExcluirChat: number;

  ParticipanteGrupo: any[];
  ListaPresenca: any[];
  SolicitacaoGrupo: any[];
  ConviteGrupo: any[];
  Produtos: any[];
};
