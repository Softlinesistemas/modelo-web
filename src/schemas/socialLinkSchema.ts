import { z } from 'zod';

export const cuidadoEspecialSchema = z.strictObject({
  CodTipo: z.number().int().min(1, 'Código do tipo de cuidado é obrigatório'),
  CodCategoria: z.number().int().min(1, 'Código da categoria de cuidado é obrigatório').optional().nullable().default(null),
  CodModalidade: z.number().int().min(1, 'Código da modalidade de cuidado é obrigatório').optional().nullable().default(null),
});

export const vinculoSocialSchema = z.strictObject({
  EconomiaSolidaria: z.boolean().optional(),
  ONGS: z.boolean().optional(),

  CuidadoEspecial: z.array(cuidadoEspecialSchema).optional(),

  CulturaPopular: z.boolean().optional(),
  AcaoAmbientalEcologia: z.boolean().optional(),

  PovosTradicionais: z.array(z.number().int().min(1, 'Código dos povos tradicionais é obrigatório')).optional(),
  Genero: z.array(z.number().int().min(1, 'Código do gênero é obrigatório')).optional(),
  Raca: z.array(z.number().int().min(1, 'Código da raça é obrigatório')).optional(),
  Religiao: z.array(z.number().int().min(1, 'Código da religião é obrigatório')).optional(),
});

export const updateVinculoSocialSchema = z.strictObject({
  EconomiaSolidaria: z.boolean().optional(),
  ONGS: z.boolean().optional(),

  CuidadoEspecial: z.array(cuidadoEspecialSchema).optional(),

  CulturaPopular: z.boolean().optional(),
  AcaoAmbientalEcologia: z.boolean().optional(),

  PovosTradicionais: z.array(z.number().int().min(1, 'Código dos povos tradicionais é obrigatório')).optional(),
  Genero: z.array(z.number().int().min(1, 'Código do gênero é obrigatório')).optional(),
  Raca: z.array(z.number().int().min(1, 'Código da raça é obrigatório')).optional(),
  Religiao: z.array(z.number().int().min(1, 'Código da religião é obrigatório')).optional(),
});

export const deleteSocialLinkRelationsSchema = z.object({
  Raca: z.array(z.number().int().min(1, 'Código da raça é obrigatório')).optional().nullable(),
  Genero: z.array(z.number().int().min(1, 'Código do gênero é obrigatório')).optional().nullable(),
  Religiao: z.array(z.number().int().min(1, 'Código da religião é obrigatório')).optional().nullable(),
  PovosTradicionais: z.array(z.number().int().min(1, 'Código dos povos tradicionais é obrigatório')).optional().nullable(),
  CuidadoEspecial: z.array(z.number().int().min(1, 'Código do cuidado especial é obrigatório')).optional().nullable(),
});

export type UpdateVinculosSocialSchema = z.infer<typeof updateVinculoSocialSchema>;
export type CuidadoEspecialSchema = z.infer<typeof cuidadoEspecialSchema>;
