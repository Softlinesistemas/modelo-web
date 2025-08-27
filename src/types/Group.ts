export type Grupo = {
  CodGrupo: number;
  DataCadastro: Date;
  NomePublico: string;
  NomeUsuario: string;

  GrupoTipoId: number;

  InteresseTipo: any;

  GrupoCategoriaId?: number;
  InteresseCategoria?: any;

  GrupoModalidadeId?: number;
  InteresseModalidade?: any;

  Endereco?: string;
  NumeroEndereco?: string;
  Pais?: string;
  Estado?: string;
  Cidade?: string;
  Bairro?: string;
  Cep?: string;
  UF?: string;

  Privacidade: "PUBLICO" | "PRIVADO" | "AMIGOS";

  TermosPrivacidade: boolean;

  FotoPerfil?: string;
  Apresentacao?: string;

  FaixaEtaria?: string; // Infantil, Juvenil, Adulto, Idoso
  IdadeMinima?: number;
  IdadeMaxima?: number;

  EventoGrupo?: any;

  GeneroGrupo: any[];
  RacaGrupo: any[];

  CodBioma?: number;
  Bioma?: any;
  CodDivisaoGeopolitica?: number;
  DivisaoGeopolitica?: any;

  Latitude?: number;
  Longitude?: number;

  VinculoSocial: any[];

  WhatsappTelegram?: string;
  EmailContato?: string;
  Site?: string;
  Facebook?: string;
  Instagram?: string;
  Linktree?: string;
  Youtube?: string;
  Tiktok?: string;

  ParticiparEventos?: boolean;

  ValorMensalidade?: number; // Decimal convertido para number
  ValorAvulso?: number;      // Decimal convertido para number

  ResponsaveisGrupo: any[];

  ExcluirChat: number;

  ReceberAnuncios?: boolean;
  ParticipanteGrupo: any[];
  ListaPresenca: any[];
  SolicitacaoGrupo: any[];
};
