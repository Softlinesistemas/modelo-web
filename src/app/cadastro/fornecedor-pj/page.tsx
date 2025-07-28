'use client';
import CadastroTipoForm, { FieldDef } from '@/components/CadastroTipoForm';

const fields: FieldDef[] = [
  { name: 'CNPJ', label: 'CNPJ', required: true },
  { name: 'nomePublico', label: 'Nome Público no GooAgro', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'telefone', label: 'Telefone', required: true },
  { name: 'dataAbertura', label: 'Data de Abertura', type: 'date', required: true },
  { name: 'classe', label: 'Classe', required: true },
  { name: 'categoria', label: 'Categoria', required: true },
  { name: 'modalidade', label: 'Modalidade', required: true },
  { name: 'responsavelNome', label: 'Responsável (Nome)', required: true },
  { name: 'responsavelCPF', label: 'Responsável (CPF)', required: true },
];

export default function FornecedorPjPage() {
  return <CadastroTipoForm tipo="fornecedor-pj" fields={fields} />;
}
