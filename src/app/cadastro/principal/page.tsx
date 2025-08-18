// app/cadastro/pessoa-fisica/page.tsx
'use client'
import { cadastroInfo } from '@/components/cadastro/cadastroInfo'
import { InfoModal } from '@/components/cadastro/InfoModal'
import CadastroTipoForm, { FieldDef } from '@/components/CadastroTipoForm'

const fields: FieldDef[] = [
  // Dados básicos
  { name: 'nome', label: 'Nome completo', required: true },
  { name: 'usuario', label: 'Usuário/Login (@)', required: true },
  { name: 'nomePublico', label: 'Nome público no GooAgro', required: true },
  { name: 'telefone1', label: 'Telefone principal', required: true },
  { name: 'telefone2', label: 'Telefone secundário' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'cpf', label: 'CPF (opcional)' },
  { name: 'dataNascimento', label: 'Data de nascimento', type: 'date', required: true },

  // Informações pessoais
  {
    name: 'genero',
    label: 'Gênero',
    type: 'select',
    options: [
      { value: 'masculino', label: 'Masculino' },
      { value: 'feminino', label: 'Feminino' },
      { value: 'lgbtqi+', label: 'LGBTQI+' },
      { value: 'nao-declarar', label: 'Prefiro não declarar' },
    ],
  },
  {
    name: 'raca',
    label: 'Raça/Cor',
    type: 'select',
    options: [
      { value: 'branco', label: 'Branco' },
      { value: 'pardo', label: 'Pardo' },
      { value: 'negro', label: 'Negro' },
      { value: 'indigena', label: 'Indígena' },
      { value: 'amarelo', label: 'Amarelo' },
    ],
  },

  // Endereço
  { name: 'endereco', label: 'Endereço (Rua e Nº)' },
  { name: 'bairro', label: 'Bairro' },
  { name: 'cidade', label: 'Cidade' },
  { name: 'estado', label: 'Estado' },
  { name: 'pais', label: 'País' },
  { name: 'cep', label: 'CEP' },

  // Senha
  { name: 'senha', label: 'Senha', type: 'password', required: true },
  { name: 'confirmarSenha', label: 'Confirmar Senha', type: 'password', required: true },

  // Apoios de comunicação
  { name: 'apoio1_nome', label: 'Apoio 1 - Nome' },
  { name: 'apoio1_usuario', label: 'Apoio 1 - Usuário' },
  { name: 'apoio1_relacao', label: 'Apoio 1 - Relação (ex: cônjuge, filho)' },
  { name: 'apoio1_telefone', label: 'Apoio 1 - Telefone' },
  { name: 'apoio1_email', label: 'Apoio 1 - Email', type: 'email' },

  { name: 'apoio2_nome', label: 'Apoio 2 - Nome' },
  { name: 'apoio2_usuario', label: 'Apoio 2 - Usuário' },
  { name: 'apoio2_relacao', label: 'Apoio 2 - Relação' },
  { name: 'apoio2_telefone', label: 'Apoio 2 - Telefone' },
  { name: 'apoio2_email', label: 'Apoio 2 - Email', type: 'email' },

  { name: 'apoio3_nome', label: 'Apoio 3 - Nome' },
  { name: 'apoio3_usuario', label: 'Apoio 3 - Usuário' },
  { name: 'apoio3_relacao', label: 'Apoio 3 - Relação' },
  { name: 'apoio3_telefone', label: 'Apoio 3 - Telefone' },
  { name: 'apoio3_email', label: 'Apoio 3 - Email', type: 'email' },

  // Profissional
  { name: 'atividadePrincipal', label: 'Atividade principal (Tela pública)' },
  { name: 'outrasAtividades', label: 'Outras atividades profissionais' },

  // Interesses
  { name: 'assuntosInteresse', label: 'Assuntos de interesse' },

  // Participação
  {
    name: 'participaEventos',
    label: 'Deseja participar de eventos/feiras/treinos?',
    type: 'select',
    options: [
      { value: 'sim', label: 'Sim' },
      { value: 'nao', label: 'Não' },
    ],
  },

  // Prazo de armazenamento do chat
  {
    name: 'prazoChat',
    label: 'Prazo para manter mensagens no chat',
    type: 'select',
    options: [
      { value: '15', label: '15 dias' },
      { value: '30', label: '30 dias' },
      { value: '45', label: '45 dias' },
      { value: '60', label: '60 dias' },
      { value: '90', label: '90 dias' },
      { value: '120', label: '120 dias' },
      { value: '180', label: '180 dias' },
      { value: '360', label: '360 dias' },
      { value: 'nunca', label: 'Nunca' },
    ],
  },

  // Apresentação
  { name: 'apresentacao', label: 'Apresentação pessoal', type: 'textarea' },
]

export default function Page() {
  const info = cadastroInfo.corporativo
  
  return (
    <>
      <InfoModal title={info.title} content={info.content} />
       <CadastroTipoForm tipo="Pessoa Física" fields={fields} />
       </>
)
}
