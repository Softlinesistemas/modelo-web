'use client';
import CadastroTipoForm, { FieldDef, OptionDef } from '@/components/CadastroTipoForm';

const visibilityOptions: OptionDef[] = [
  { value: '1', label: 'Qualquer Usuário do GooAgro' },
  { value: '2', label: 'Somente os meus AMIGOS do GooAgro' },
  { value: '3', label: 'Oculta – ninguém poderá ver' }
];

const retentionOptions: OptionDef[] = [
  { value: '15', label: '15 dias' },
  { value: '30', label: '30 dias' },
  { value: '45', label: '45 dias' },
  { value: '60', label: '60 dias' },
  { value: '90', label: '90 dias' },
  { value: '120', label: '120 dias' },
  { value: '180', label: '180 dias' },
  { value: '360', label: '360 dias' },
  { value: 'never', label: 'NUNCA' }
];

const sectorOptions: OptionDef[] = [
  { value: 'federal', label: 'GOVERNO FEDERAL' },
  { value: 'estadual', label: 'Governo Estadual' },
  { value: 'municipal', label: 'Governo Municipal' },
  { value: 'escola', label: 'Escola Privada' },
  { value: 'mercados', label: 'MERCADOS' },
  { value: 'foodservice', label: 'FoodService' },
  // ... (add all other sector options from PDF)
];

const fields: FieldDef[] = [
  // Basic Information
  { name: 'tipoCadastro', label: 'Tipo de Cadastro', required: true, type: 'radio', options: [
    { value: 'corporativo', label: 'PESSOA-JURÍDICA CNPJ-CORPORATIVO' },
    { value: 'mei', label: 'PESSOA-JURÍDICA MEI/PME' }
  ]},
  { name: 'cnpj', label: 'CNPJ', required: true, mask: '99.999.999/9999-99' },
  { name: 'nomeInstituicao', label: 'Nome da Instituição', required: true },
  { name: 'nomePublico', label: 'Nome Público no GooAgro', required: true },
  { name: 'usuarioGG', label: 'Usuário GooAgro', prefix: '@', required: true },
  
  // Contact Information
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'telefone', label: 'Telefone', mask: '(99) 99999-9999', required: true },
  { name: 'cep', label: 'CEP', mask: '99999-999', required: true },
  { name: 'endereco', label: 'Endereço', required: true },
  { name: 'bairro', label: 'Bairro', required: true },
  { name: 'cidadeEstado', label: 'Cidade/Estado', required: true },
  
  // Security
  { name: 'senha', label: 'Senha (6-8 caracteres, 1 letra)', type: 'password', required: true },
  { name: 'confirmarSenha', label: 'Confirmar Senha', type: 'password', required: true },
  
  // Classification
  { name: 'classe', label: 'Classe', required: true },
  { name: 'categoria', label: 'Categoria', required: true },
  { name: 'modalidade', label: 'Modalidade', required: true },
  { name: 'setor', label: 'Setor Principal', type: 'select', options: sectorOptions, required: true },
  
  // Additional Information
  { name: 'dataAbertura', label: 'Data de Abertura', type: 'date', required: true },
  { name: 'descricao', label: 'Apresentação e Informações', type: 'textarea' },
  { name: 'assuntosInteresse', label: 'Assuntos de Interesse', type: 'multiselect' },
  
  // Responsible Persons (up to 3)
  { 
    name: 'responsaveis', 
    label: 'Responsáveis (≤3)', 
    type: 'group',
    fields: [
      { name: 'nome', label: 'Nome Completo', required: true },
      { name: 'cpf', label: 'CPF', mask: '999.999.999-99', required: true },
      { name: 'loginGG', label: 'Login GooAgro', prefix: '@', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'cargo', label: 'Cargo/Função', required: true },
      { name: 'telefone', label: 'Telefone', mask: '(99) 99999-9999' },
    ],
    max: 3 
  },
  
  // Privacy Settings
  { name: 'visibilidadePerfil', label: 'Visibilidade do Perfil', type: 'radio', options: visibilityOptions, required: true },
  { name: 'retencaoMensagens', label: 'Retenção de Mensagens', type: 'select', options: retentionOptions },
  { name: 'politicaPrivacidade', label: 'Li e aceito a Política de Privacidade', type: 'checkbox', required: true },
  { name: 'autorizoMensagens', label: 'Autorizo receber mensagens relacionadas', type: 'checkbox' },
  
  // Additional Sections
  { name: 'links', label: 'Links Relacionados', type: 'multiple', fields: [
    { name: 'url', label: 'URL', type: 'url' }
  ]},
  { name: 'gpsLocation', label: 'Localização GPS', type: 'gps' },
  { name: 'fotoPerfil', label: 'Foto de Perfil', type: 'file' },
  
  // Special Categories
  { name: 'categoriasEspeciais', label: 'Categorias Especiais', type: 'checkbox-group', options: [
    { value: 'pcd', label: 'PCD' },
    { value: 'genero', label: 'Gênero' },
    { value: 'meioAmbiente', label: 'Meio Ambiente' },
    // ... (other special categories)
  ]}
];

export default function CorporativoPage() {
  return <CadastroTipoForm 
    tipo="corporativo" 
    fields={fields} 
    initialValues={{ tipoCadastro: 'corporativo' }}
  />;
}