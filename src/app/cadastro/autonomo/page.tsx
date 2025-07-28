'use client';

import CadastroTipoForm, { FieldDef } from '@/components/CadastroTipoForm';

const fields: FieldDef[] = [
  { name: 'CNPJ',          label: 'CNPJ',            required: true },
  { name: 'dataAbertura',  label: 'Data de Abertura', type: 'date', required: true },
  { name: 'endereco',      label: 'Endereço',        required: true },
  { name: 'CEP',           label: 'CEP',             required: true },
  { name: 'bairro',        label: 'Bairro',          required: true },
  { name: 'cargoFuncao',   label: 'Cargo / Função',  required: true },
  { name: 'responsaveis',  label: 'Responsáveis',    required: false },
];

export default function AutonomoPage() {
  return <CadastroTipoForm tipo="autonomo" fields={fields} />;
}
