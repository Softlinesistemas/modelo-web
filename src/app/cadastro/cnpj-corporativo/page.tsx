// app/cadastro/cnpj-corporativo/page.tsx
'use client'
import CadastroTipoForm, { FieldDef } from '@/components/CadastroTipoForm'
import { InfoModal } from '@/components/cadastro/InfoModal'
import { cadastroInfo } from '@/components/cadastro/cadastroInfo'

const fields: FieldDef[] = [
  // Dados da instituição
  { name: 'cnpj', label: 'CNPJ', required: true },
  { name: 'dataAbertura', label: 'Data de abertura', type: 'date', required: true },
  { name: 'razaoSocial', label: 'Nome automático (Razão Social)', required: true },
  { name: 'nomePublico', label: 'Nome público no GooAgro', required: true },
  { name: 'classe', label: 'Classe da instituição' },
  { name: 'categoria', label: 'Categoria' },
  { name: 'modalidade', label: 'Modalidade' },
  { name: 'instituicao', label: 'Instituição participante de grupos' },

  // Responsável principal
  { name: 'responsavel_nome', label: 'Responsável - Nome', required: true },
  { name: 'responsavel_usuario', label: 'Responsável - Usuário/Login', required: true },
  { name: 'responsavel_cpf', label: 'Responsável - CPF' },
  { name: 'responsavel_email', label: 'Responsável - Email', type: 'email' },

  // Responsáveis adicionais
  { name: 'responsavel2_nome', label: 'Responsável 2 - Nome' },
  { name: 'responsavel2_usuario', label: 'Responsável 2 - Usuário/Login' },
  { name: 'responsavel2_cpf', label: 'Responsável 2 - CPF' },
  { name: 'responsavel2_email', label: 'Responsável 2 - Email', type: 'email' },

  { name: 'responsavel3_nome', label: 'Responsável 3 - Nome' },
  { name: 'responsavel3_usuario', label: 'Responsável 3 - Usuário/Login' },
  { name: 'responsavel3_cpf', label: 'Responsável 3 - CPF' },
  { name: 'responsavel3_email', label: 'Responsável 3 - Email', type: 'email' },

  // Contato
  { name: 'telefone1', label: 'Telefone principal', required: true },
  { name: 'telefone2', label: 'Telefone secundário' },
  { name: 'emailContato', label: 'Email de contato', type: 'email' },

  // Senha
  { name: 'senha', label: 'Senha', type: 'password', required: true },
  { name: 'confirmarSenha', label: 'Confirmar senha', type: 'password', required: true },

  // Endereço
  { name: 'endereco', label: 'Endereço (Rua e Nº)' },
  { name: 'bairro', label: 'Bairro' },
  { name: 'cidade', label: 'Cidade' },
  { name: 'estado', label: 'Estado' },
  { name: 'pais', label: 'País' },
  { name: 'cep', label: 'CEP' },
  { name: 'gps', label: 'Localização GPS (opcional)' },

  // Atuação
  { name: 'areaAtuacao', label: 'Área de atuação' },
  { name: 'segmento', label: 'Segmento' },
  { name: 'porte', label: 'Porte da instituição' },

  // Perfil
  { name: 'fotoPerfil', label: 'Foto de perfil (Logo/Imagem da instituição)' },
  { name: 'apresentacao', label: 'Apresentação e informações', type: 'textarea' },

  // Eventos
  {
    name: 'participaEventos',
    label: 'Deseja participar de encontros/eventos/feiras?',
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

  // Assuntos de interesse
  { name: 'assuntosInteresse', label: 'Assuntos de interesse' },
]

export default function Page() {
    const info = cadastroInfo.corporativo
  
    return (
      <>
        <InfoModal title={info.title} content={info.content} />
        <CadastroTipoForm tipo="CNPJ Corporativo / Institucional" fields={fields} />
      </>
    )
  }