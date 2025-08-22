import { z } from "zod";
import { phoneSchema } from "./phoneSchema";
import { vinculoSocialSchema } from "./socialLinkSchema";
import { server } from "@/utils/server";

export const createContactsSupportSchema = z.object({
  NomeContato: z
    .string()
    .min(1, "Nome do contato é obrigatório")
    .max(100, "Nome do contato deve ter no máximo 100 caracteres"),
  TelefoneContato: phoneSchema,
  EmailContato: z
    .string()
    .email("Email do contato inválido")
    .max(100, "Email do contato deve ter no máximo 100 caracteres")
    .optional(),
  Relacao: z
    .string()
    .min(1, "Relação é obrigatória")
    .max(100, "Relação deve ter no máximo 100 caracteres"),
});
export const connectsSupportSchema = z.object({
  ContatoId: z.number().int().positive(),
  Relacao: z
    .string()
    .min(1, "Relação é obrigatória")
    .max(100, "Relação deve ter no máximo 100 caracteres"),
});

export const otherActivitiesSchema = z.array(
  z.strictObject({
    CodAtividadeTipo: z
      .number()
      .int()
      .positive()
      .min(1, "Código do tipo de atividade é obrigatório"),
    CodAtividadeCategoria: z.number().int().positive().min(1).optional(),
    CodAtividadeModalidade: z.number().int().positive().min(1).optional(),
  })
);

export const InterestSchema = z.strictObject({
  CodTipo: z
    .number()
    .int()
    .positive()
    .min(1, "Código do tipo de interesse é obrigatório"),
  CodCategoria: z
    .number()
    .int()
    .positive()
    .min(1, "Código da categoria de interesse é obrigatório")
    .optional(),
  CodModalidade: z
    .number()
    .int()
    .positive()
    .min(1, "Código da modalidade de interesse é obrigatório")
    .optional(),
});

export const userBasicSchema = z.object({
  Nome: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  Usuario: z
    .string()
    .min(1, "Usuário é obrigatório")
    .max(100, "Usuário deve ter no máximo 100 caracteres")
    .superRefine(async (value, ctx) => {
      if (!value) return; 

      try {
        const res = await server.get(`/user/exists/${value}`);
        if (res.data.exists) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Esse usuário já existe",
          });
        }
      } catch (err) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Erro ao validar usuário",
        });
      }
    }),

  Role: z.enum(["USER", "ADMIN", "MOD"]).default("USER").optional(),

  Telefone: phoneSchema,

  Email: z
    .string()
    .email("Email inválido")
    .max(100, "Email deve ter no máximo 100 caracteres")
    .optional(),
  CPF: z
    .string()
    .min(11, "CPF deve ter 11 caracteres")
    .max(11, "CPF deve ter 11 caracteres")
    .optional(),

  Pais: z
    .string()
    .min(1, "País é obrigatório")
    .max(100, "País deve ter no máximo 100 caracteres"),
  Estado: z
    .string()
    .min(1, "Estado é obrigatório")
    .max(100, "Estado deve ter no máximo 100 caracteres"),
  Cidade: z
    .string()
    .min(1, "Cidade é obrigatória")
    .max(100, "Cidade deve ter no máximo 100 caracteres"),
  Bairro: z
    .string()
    .min(1, "Bairro é obrigatório")
    .max(100, "Bairro deve ter no máximo 100 caracteres")
    .optional(),
  Cep: z
    .string()
    .min(1, "CEP é obrigatório")
    .max(9, "CEP deve ter no máximo 10 caracteres")
    .optional(),
  UF: z
    .string()
    .min(1, "UF é obrigatório")
    .max(2, "UF deve ter no máximo 2 caracteres")
    .optional(),
  NumeroEndereco: z
    .string()
    .min(1, "Número do endereço é obrigatório")
    .max(10, "Número do endereço deve ter no máximo 10 caracteres")
    .optional(),
  Endereco: z
    .string()
    .min(1, "Endereço é obrigatório")
    .max(150, "Endereço deve ter no máximo 200 caracteres")
    .optional(),
  Complemento: z
    .string()
    .max(100, "Complemento deve ter no máximo 100 caracteres")
    .optional(),

  DiaNascimento: z
    .number()
    .min(1, "Dia de nascimento é obrigatório")
    .max(31, "Dia de nascimento deve ser entre 1 e 31"),
  MesNascimento: z
    .number()
    .min(1, "Mês de nascimento é obrigatório")
    .max(12, "Mês de nascimento deve ser entre 1 e 12"),
  AnoNascimento: z
    .number()
    .min(1900, "Ano de nascimento é obrigatório")
    .max(2100, "Ano de nascimento deve ser entre 1900 e 2100"),

  ContatosApoio: z
    .array(createContactsSupportSchema.or(connectsSupportSchema))
    .max(3, "Você pode adicionar no máximo 3 contatos de apoio")
    .optional(),

  Privacidade: z
    .enum(["PUBLICO", "PRIVADO", "AMIGOS"])
    .default("PUBLICO")
    .describe(
      "Privacidade do perfil da empresa. Pode ser PUBLICO, PRIVADO ou AMIGOS."
    )
    .optional(),

  ReceberAnuncios: z.boolean({
    message: "Você deve informar se deseja receber anúncios ou não.",
  }),

  Senha: z
    .string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .max(8, "Senha deve ter no máximo 100 caracteres"),

  TermosPrivacidade: z.boolean().refine((value) => value === true, {
    message: "Termos de privacidade devem ser aceitos.",
  }),
});

export const userExtraSchema = z.strictObject({
  CodGenero: z.number().int().optional().nullable(),
  CodRaca: z.number().int().optional().nullable(),

  // Aqui viria a foto de perfil, mas é uma rota diferente.

  Apresentacao: z
    .string()
    .max(3000, "Apresentação deve ter no máximo 3000 caracteres")
    .optional()
    .nullable(),

  AtividadePrincipalId: z.number().int().optional().nullable(),
  AtividadePrincipalCategoriaId: z.number().int().optional().nullable(),
  AtividadePrincipalModalidadeId: z.number().int().optional().nullable(),

  OutrasAtividades: otherActivitiesSchema.optional().nullable(),

  Interesse: z.array(InterestSchema).optional().nullable(),

  Estudante: z.boolean().optional().nullable(),
  Funcionario: z.boolean().optional().nullable(),
  CodEscolaridade: z.number().int().optional().nullable(),

  ParticiparEvento: z.boolean().optional().nullable(),
  VinculoSocial: z.array(vinculoSocialSchema).optional().nullable(),

  WhatsappTelegram: z
    .string()
    .max(15, "WhatsApp/Telegram deve ter no máximo 15 caracteres")
    .optional()
    .nullable(),
  EmailContato: z
    .string()
    .email("Email inválido")
    .max(100, "Email deve ter no máximo 100 caracteres")
    .optional()
    .nullable(),
  Site: z
    .string()
    .max(100, "Site deve ter no máximo 100 caracteres")
    .optional()
    .nullable(),
  Instagram: z
    .string()
    .max(100, "Instagram deve ter no máximo 100 caracteres")
    .optional()
    .nullable(),
  Facebook: z
    .string()
    .max(100, "Facebook deve ter no máximo 100 caracteres")
    .optional()
    .nullable(),
  Youtube: z
    .string()
    .max(100, "Youtube deve ter no máximo 100 caracteres")
    .optional()
    .nullable(),
  Tiktok: z
    .string()
    .max(100, "Tiktok deve ter no máximo 100 caracteres")
    .optional()
    .nullable(),
  Linktree: z
    .string()
    .max(100, "Linktree deve ter no máximo 100 caracteres")
    .optional()
    .nullable(),

  Bioma: z
    .number()
    .int()
    .min(1, "Código do bioma é obrigatório")
    .optional()
    .nullable(),
  DivisaoGeopolitica: z
    .number()
    .int()
    .min(1, "Código da divisão geopolítica é obrigatório")
    .optional()
    .nullable(),

  Latitude: z.number().optional().nullable(),
  Longitude: z.number().optional().nullable(),

  ExcluirChat: z.number().int().min(0).max(360).default(0).optional(),
});

export const userFullSchema = userBasicSchema.merge(userExtraSchema);

export const userUpdateSchema = userFullSchema.partial();

export type UserBasicSchema = z.infer<typeof userBasicSchema>;
export type CreateContactsSupportSchema = z.infer<
  typeof createContactsSupportSchema
>;
export type ConnectsContactsSupportSchema = z.infer<
  typeof connectsSupportSchema
>;
export type InterestSchema = z.infer<typeof InterestSchema>;

export type UserExtraSchema = z.infer<typeof userExtraSchema>;
export type UserFullSchema = z.infer<typeof userFullSchema>;
export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;

export type VinculoSocialSchema = z.infer<typeof vinculoSocialSchema>;
