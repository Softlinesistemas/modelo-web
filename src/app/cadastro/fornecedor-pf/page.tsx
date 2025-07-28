'use client';
import CadastroTipoForm, { FieldDef } from '@/components/CadastroTipoForm';

const fields: FieldDef[] = [
  { name: 'CPF', label: 'CPF', required: true },
  { name: 'usuarioGG', label: 'Usuário GooAgro', required: true },
  { name: 'tipoAtividade', label: 'Tipo de Atividade', required: true },
  { name: 'localEntrega', label: 'Local da Entrega', required: true },
  { name: 'senha', label: 'Senha (6–8 caracteres, 1 letra)', type: 'password', required: true },
];

export default function FornecedorPfPage() {
  return <CadastroTipoForm tipo="fornecedor-pf" fields={fields} />;
}
