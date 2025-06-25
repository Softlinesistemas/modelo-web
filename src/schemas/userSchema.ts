import { z } from 'zod';
import { phoneSchema } from './phoneSchema';

export const createContactsSupportSchema = z.object({
  NomeContato: z.string().min(1, 'Nome do contato é obrigatório').max(100, 'Nome do contato deve ter no máximo 100 caracteres'),
  TelefoneContato: phoneSchema,
  EmailContato: z.string().email('Email do contato inválido').max(100, 'Email do contato deve ter no máximo 100 caracteres').optional(),
  Relacao: z.string().min(1, 'Relação é obrigatória').max(100, 'Relação deve ter no máximo 100 caracteres'),
});
export const connectsSupportSchema = z.object({
  ContatoId: z.number().int(),
  Relacao: z.string().min(1, 'Relação é obrigatória').max(100, 'Relação deve ter no máximo 100 caracteres'),
});

export const userBasicSchema = z.object({
  Nome: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
  Usuario: z.string().min(1, 'Usuário é obrigatório').max(5, 'Usuário deve ter no máximo 100 caracteres'),
  Role: z.enum(['USER', 'ADMIN', 'MOD']).default('USER').optional(),

  Telefone: phoneSchema,

  Email: z.string().email('Email inválido').max(100, 'Email deve ter no máximo 100 caracteres').optional(),
  CPF: z.string().min(11, 'CPF deve ter 11 caracteres').max(11, 'CPF deve ter 11 caracteres').optional(),

  DiaNascimento: z.number().min(1, 'Dia de nascimento é obrigatório').max(31, 'Dia de nascimento deve ser entre 1 e 31'),
  MesNascimento: z.number().min(1, 'Mês de nascimento é obrigatório').max(12, 'Mês de nascimento deve ser entre 1 e 12'),
  AnoNascimento: z.number().min(1900, 'Ano de nascimento é obrigatório').max(2100, 'Ano de nascimento deve ser entre 1900 e 2100'),

  Privacidade: z.enum(['PUBLICO', 'PRIVADO', 'AMIGOS']),

  Pais: z.string().min(1, 'País é obrigatório').max(100, 'País deve ter no máximo 100 caracteres'),
  Estado: z.string().min(1, 'Estado é obrigatório').max(100, 'Estado deve ter no máximo 100 caracteres'),
  Cidade: z.string().min(1, 'Cidade é obrigatória').max(100, 'Cidade deve ter no máximo 100 caracteres'),

  Cep: z.string().min(1, 'CEP é obrigatório').max(10, 'CEP deve ter no máximo 10 caracteres').optional(),
  UF: z.string().min(1, 'UF é obrigatório').max(2, 'UF deve ter no máximo 2 caracteres').optional(),
  NumeroEndereco: z.string().min(1, 'Número do endereço é obrigatório').max(10, 'Número do endereço deve ter no máximo 10 caracteres').optional(),
  Endereco: z.string().min(1, 'Endereço é obrigatório').max(150, 'Endereço deve ter no máximo 200 caracteres').optional(),
  Complemento: z.string().max(100, 'Complemento deve ter no máximo 100 caracteres').optional(),

  TermosPrivacidade: z.boolean(),
  ParticiparEvento: z.boolean(),

  Bairro: z.string().min(1, 'Bairro é obrigatório').max(100, 'Bairro deve ter no máximo 100 caracteres').optional(),

  Senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres').max(8, 'Senha deve ter no máximo 100 caracteres'),

  ContatosApoio: z.array(createContactsSupportSchema.or(connectsSupportSchema)).max(3, 'Você pode adicionar no máximo 3 contatos de apoio').optional(),
});

export const userExtraSchema = z.object({
  CodGenero: z.number().int().optional(),
  CodRaca: z.number().int().optional(),
  FotoPerfil: z.string().max(150, 'Foto de perfil deve ter no máximo 150 caracteres').optional(),
  Apresentacao: z.string().max(3000, 'Apresentação deve ter no máximo 3000 caracteres').optional(),
  AtividadePrincipalId: z.number().int().optional(),
  OutrasAtividadesProfissionais: z.array(z.number().int()).max(5, 'Você pode adicionar no máximo 5 outras atividades').optional(),
  Estudante: z.boolean().optional(),
  CodEscolaridade: z.number().int().optional(),
  Funcionario: z.boolean().optional(),
  ExcluirChat: z.number().int().min(0).max(360).optional(),
  Facebook: z.string().max(100, 'Facebook deve ter no máximo 100 caracteres').optional(),
  Instagram: z.string().max(100, 'Instagram deve ter no máximo 100 caracteres').optional(),
  Linktree: z.string().max(100, 'Linktree deve ter no máximo 100 caracteres').optional(),
  Youtube: z.string().max(100, 'Youtube deve ter no máximo 100 caracteres').optional(),
  Tiktok: z.string().max(100, 'Tiktok deve ter no máximo 100 caracteres').optional(),
  WhatsappTelegram: z.string().max(15, 'WhatsApp/Telegram deve ter no máximo 15 caracteres').optional(),
  Site: z.string().max(100, 'Site deve ter no máximo 100 caracteres').optional(),
  Latitude: z.number().optional(),
  Longitude: z.number().optional(),
});

export const userFullSchema = userBasicSchema.merge(userExtraSchema);

export const userUpdateSchema = userFullSchema.partial();

export type UserBasicSchema = z.infer<typeof userBasicSchema>;
export type CreateContactsSupportSchema = z.infer<typeof createContactsSupportSchema>;
export type ConnectsContactsSupportSchema = z.infer<typeof connectsSupportSchema>;

export type UserExtraSchema = z.infer<typeof userExtraSchema>;
export type UserFullSchema = z.infer<typeof userFullSchema>;
export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;
