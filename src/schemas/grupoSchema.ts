import { z } from 'zod'

export const schema = z.object({
  // Informações Básicas
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  descricao: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  categoria: z.string().min(1, "Selecione uma categoria"),
  visibilidade: z.enum(['publico', 'privado']),
  tipoGrupo: z.array(z.string()).min(1, "Selecione pelo menos um tipo de grupo"),
  
  // Organização e Agenda
  dataFundacao: z.string().optional(),
  turno: z.string().optional(),
  frequencia: z.string().optional(),
  horarioInicio: z.string().optional(),
  horarioFim: z.string().optional(),
  diasSemana: z.array(z.string()).optional(),
  
  // Endereço e Local
  cep: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  bairro: z.string().optional(),
  rua: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  pontoReferencia: z.string().optional(),
  
  // Valores
  valorContribuicao: z.preprocess(
    val => parseFloat(val as string) || 0,
    z.number().nonnegative("Valor não pode ser negativo").optional()
  ),
  frequenciaPagamento: z.string().optional(),
  descricaoContribuicao: z.string().optional(),
  
  // Preferências
  vinculos: z.array(z.string()).optional(),
  outrasPreferencias: z.string().optional(),
  
  // Aceite e Termos
  aceiteTermos: z.boolean().refine(val => val, {
    message: "Você deve aceitar os termos",
  }),
  confirmacaoDados: z.boolean().optional(),
})

export type FormData = z.infer<typeof schema>