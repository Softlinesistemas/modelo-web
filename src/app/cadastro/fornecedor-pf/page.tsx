'use client';
import { useState } from 'react';
import CadastroTipoForm, { FieldDef } from '@/components/CadastroTipoForm';

const fields: FieldDef[] = [
  // ======== IDENTIFICAÇÃO ========
  { name: 'nome', label: 'Nome completo', required: true },
  { name: 'nomePublico', label: 'Nome público no GooAgro', required: true },
  { name: 'usuarioGG', label: 'Usuário GooAgro (@usuario)', required: true },
  { name: 'cpf', label: 'CPF', required: true },
  { name: 'telefone1', label: 'Telefone principal', required: true },
  { name: 'telefone2', label: 'Telefone secundário' },
  { name: 'email', label: 'Email', required: true },
  { name: 'senha', label: 'Senha (6–8 caracteres, 1 letra)', type: 'password', required: true },
  { name: 'confirmarSenha', label: 'Confirmar senha', type: 'password', required: true },

  // ======== ENDEREÇO ========
  { name: 'cidadeUF', label: 'Cidade / UF', required: true },
  { name: 'bairro', label: 'Bairro', required: true },
  { name: 'cep', label: 'CEP', required: true },
  { name: 'endereco', label: 'Endereço', required: true },

  // ======== VISIBILIDADE ========
  {
    name: 'visibilidade',
    label: 'A minha pública poderá ser vista por:',
    type: 'radio',
    required: true,
    options: [
      { value: '1', label: 'Qualquer usuário do GooAgro' },
      { value: '2', label: 'Somente meus amigos do GooAgro' },
      { value: '3', label: 'Oculta – ninguém poderá ver' },
    ],
  },

  // ======== DELIVERY ========
  {
    name: 'delivery',
    label: 'É delivery (entrega ao cliente)?',
    type: 'radio',
    required: true,
    options: [
      { value: 'sim', label: 'Sim' },
      { value: 'nao', label: 'Não' },
    ],
  },

  // ======== CATEGORIA / TIPO / MODALIDADE ========
  { name: 'categoria', label: 'Categoria', required: true },
  { name: 'tipo', label: 'Tipo', required: true },
  { name: 'modalidade', label: 'Modalidade', required: true },
  { name: 'localEntrega', label: 'Local da entrega', required: true },

  // ======== CONTATOS ADICIONAIS ========
  {
    name: 'contatosAdicionais',
    label: 'Contatos adicionais (até 3)',
    type: 'group',
    max: 3,
    fields: [
      { name: 'nome', label: 'Nome', required: true },
      { name: 'relacao', label: 'Relação', required: true },
      { name: 'usuario', label: 'Usuário GooAgro', required: true },
      { name: 'telefone', label: 'Telefone', required: true },
      { name: 'email', label: 'Email', required: true },
    ],
  },

  // ======== OUTRAS INFORMAÇÕES ========
  { name: 'outrasAtividades', label: 'Outras atividades profissionais', type: 'textarea' },
  { name: 'apresentacao', label: 'Apresentação e informações', type: 'textarea' },
  {
    name: 'participaEventos',
    label: 'Deseja participar de eventos, feiras, campeonatos?',
    type: 'radio',
    options: [
      { value: 'sim', label: 'Sim' },
      { value: 'nao', label: 'Não' },
    ],
  },
  { name: 'educacao', label: 'Nível/Série/Grau de educação' },
  { name: 'link1', label: 'Link 1' },
  { name: 'link2', label: 'Link 2' },
  { name: 'link3', label: 'Link 3' },

  // ======== AUTORIZAÇÕES ========
  {
    name: 'autorizoMensagens',
    label: 'Autorizo receber mensagens vinculadas aos meus interesses e atividades profissionais neste perfil.',
    type: 'checkbox',
    options: [{ value: 'autorizo', label: 'Autorizo' }],
  },

  // ======== FOTO PERFIL ========
  { name: 'fotoPerfil', label: 'Foto de perfil (selfie)', type: 'file' },

  // ======== GPS ========
  { name: 'gps', label: 'Coordenadas GPS (opcional)' },

  // ======== PRAZO DE CHAT ========
  {
    name: 'prazoChat',
    label: 'Prazo para manter arquivos do chat',
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

  // ======== REFERÊNCIAS GEOGRÁFICAS ========
  {
    name: 'referenciasGeo',
    label: 'Referências geográficas',
    type: 'checkbox',
    options: [
      { value: 'sisal', label: 'TI_04 - SISAL' },
      { value: 'bioma', label: 'Bioma' },
      { value: 'povos', label: 'Povos tradicionais' },
    ],
  },

  // ======== CONDIÇÕES ESPECIAIS ========
  {
    name: 'condicoesEspeciais',
    label: 'Condições especiais',
    type: 'checkbox',
    options: [
      { value: 'pcd', label: 'PCD / Doença crônica' },
      { value: 'voluntariado', label: 'Projeto social sem fins lucrativos / Voluntariado' },
      { value: 'economiaSolidaria', label: 'Economia solidária' },
      { value: 'racaCor', label: 'De raça/cor' },
      { value: 'genero', label: 'De gênero' },
      { value: 'culturaPopular', label: 'Cultura popular' },
      { value: 'acaoAmbiental', label: 'Ação ambiental / Ecologia' },
      { value: 'religiao', label: 'Religião' },
      { value: 'vinculosSociais', label: 'Vínculos sociais' },
    ],
  },

  // ======== ASSUNTOS DE INTERESSE ========
  { name: 'assuntoTipo', label: 'Assunto - Tipo' },
  { name: 'assuntoModalidade', label: 'Assunto - Modalidade' },
  { name: 'assuntoCategoria', label: 'Assunto - Categoria' },
];

export default function FornecedorPfMotoristaPage() {
  const [showModal, setShowModal] = useState(true);

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Bem-vindo ao GooAgro!</h2>
            <p className="mb-4 text-sm whitespace-pre-line">
              {`Olá Usuário-GG! Parabéns pela escolha do GooAgro para participar de grupos com os mesmos propósitos que você tem!
              
Para grupos:
• Criar grupos;
• Facilitar, organizar e controlar.

Para pessoas:
• Procurar e ser procurado;
• Convidar e ser convidado para grupos que têm interesse.

Quando puder, coloque mais informações e interesses para participar de eventos, feiras, aulas e muito mais.`}
            </p>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setShowModal(false)}
            >
              Continuar
            </button>
          </div>
        </div>
      )}

{!showModal && <CadastroTipoForm fields={fields} tipo={''} />}

    </div>
  );
}
