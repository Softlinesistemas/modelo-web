import { z } from 'zod';
export const phoneSchema = z
  .string()
  .min(1, 'Telefone é obrigatório')
  .max(15, 'Telefone deve ter no máximo 15 caracteres')
  .transform((val) => val.replace(/\D/g, ''));
