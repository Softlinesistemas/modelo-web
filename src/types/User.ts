export type Usuario = {
  Perfil: any;
//   Perfil: Perfil;
  PerfilId: number;

  CodUsuario: number;
  Role: "USER" | "ADMIN" | "MOD";

  Fornecedor: boolean;

  Nome: string;
  Usuario: string;

  Telefone: string;
  Email?: string;
  CPF?: string;
  DiaNascimento: number;
  MesNascimento: number;
  AnoNascimento: number;

//   ContatoApoio: ContatoApoio[];
  ContatoApoio: any[];
  Privacidade: "PUBLICO" | "PRIVADO" | "AMIGOS";

  ReceberAnuncios: boolean;
  TermosPrivacidade: boolean;

  Endereco?: string;
  NumeroEndereco?: string;
  Pais: string;
  Estado: string;
  Cidade: string;
  Bairro?: string;
  Cep?: string;
  UF?: string;

  CodGenero?: number;
  Genero?: any;
//   Genero?: Genero;
  CodRaca?: number;
//   Raca?: Raca;
  Raca?: any;
  FotoPerfil?: string;
  Apresentacao?: string;

  AtividadePrincipalId?: number;
  AtividadePrincipalTipoId?: any;
//   AtividadePrincipalTipoId?: AtividadeTipo;

  AtividadePrincipalCategoriaId?: number;
  AtividadePrincipalCategoria?: any;
//   AtividadePrincipalCategoria?: AtividadeCategoria;

  AtividadePrincipalModalidadeId?: number;
  AtividadePrincipalModalidade?: any;
//   AtividadePrincipalModalidade?: AtividadeModalidade;

  OutrasAtividades: any[];
//   OutrasAtividades: OutrasAtividades[];
  Interesse: any[];
//   Interesse: Interesse[];

  Estudante?: boolean;
  Funcionario?: boolean;
  CodEscolaridade?: number;
  Escolaridade?: any;
//   Escolaridade?: Escolaridade;

  ParticiparEvento?: boolean;

  VinculoSocial: any[];
//   VinculoSocial: VinculoSocial[];

  WhatsappTelegram?: string;
  EmailContato?: string;
  Site?: string;
  Facebook?: string;
  Instagram?: string;
  Linktree?: string;
  Youtube?: string;
  Tiktok?: string;

  CodBioma?: number;
//   Bioma?: Bioma;
  Bioma?: any;
  CodDivisaoGeopolitica?: number;
  DivisaoGeopolitica?: any;
//   DivisaoGeopolitica?: DivisaoGeopolitica;

  Latitude?: number;
  Longitude?: number;

  ExcluirChat: number;

  UsuarioApoio: any[];
//   UsuarioApoio: ContatoApoio[];

  Empresa: any[];
//   Empresa: Empresa[];
//   ResponsaveisEmpresa: ResponsaveisEmpresa[];
  ResponsaveisEmpresa: any[];
  ResponsaveisGrupo: any[];
//   ResponsaveisGrupo: ResponsaveisGrupo[];

  ParticipanteGrupo: any[];
//   ParticipanteGrupo: ParticipanteGrupo[];
  ListaPresenca: any[];
//   ListaPresenca: ListaPresenca[];
  SolicitacaoGrupo: any[];
//   SolicitacaoGrupo: SolicitacaoGrupo[];
  ConviteGrupo: any[];
//   ConviteGrupo: ConviteGrupo[];
  Produtos: any[];
//   Produtos: Produtos[];
};

export type Amizade = {
  CodAmizade: number;
  PerfilAmizadeId1: number;
  PerfilAmizadeId2: number;
  SolicitanteId: number;
  Aceita: boolean;
  CriadoEm: string;     // DateTime no banco → string no JSON
  AtualizadoEm: string;
};

export interface RegisterResponse {
  token?: string;
  message?: string;
}

export interface LoginPayload {
  Usuario: string;
  Senha: string;
}

export interface LoginResponse {
  token?: string;
  message?: string;
}
