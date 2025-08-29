export type Publicacoes = {
  CodPublicacao: number;
  Legenda?: string;

  CodUsuario?: number;
  Usuario?: any;

  CodEmpresa?: number;
  Empresa?: any;

  CodGrupo?: number;
  Grupo?: any;

  DataEncontro?: Date;

  CriadaEm: Date;
  AtualizadaEm: Date;

  FotosPublicacoes: any[];
  CurtidasPublicacoes: any[];
  ComentariosPublicacoes: any[];
};

export interface CreatePostInput {
  Legenda?: string;
  DataEncontro?: string;
  files?: File[];
}
