export type VinculoSocial = {
  Id: number;

  CodUsuario?: number;
  Usuario?: any;

  CodEmpresa?: number;
  Empresa?: any;

  CodGrupo?: number;
  Grupo?: any;

  EconomiaSolidaria?: boolean;
  ONGs?: boolean;

  VinculoCuidadoEspecial: any[];

  CulturaPopular?: boolean;
  AcaoAmbientalEcologia?: boolean;

  VinculoSocialPovosTradicionais: any[];
  VinculoSocialGenero: any[];
  VinculoSocialRaca: any[];
  VinculoSocialReligiao: any[];
};
