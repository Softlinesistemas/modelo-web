'use client'

import { useTabStore } from '@/store/useTabStore' // Store para controle da tab ativa
import { TabSelector } from '@/components/TabSelector' // Componente para seleção de abas
import { motion } from 'framer-motion' // Animações suaves
import { useRouter } from 'next/navigation' // Navegação programática Next.js
import { PessoaCard } from '@/components/PessoaCard' // Card genérico para mostrar grupo ou pessoa
import { useEffect, useState } from 'react'
import { AvatarMenu } from '@/components/AvatarMenu' // Modal para mostrar avatar e nome
import { AppModal } from '@/utils/ui/AppModal' // Modal genérico
import { MainBanner } from '@/components/MainBanner'

// Define as abas disponíveis na tela de grupos
const tabs = ['Meus', 'Sugestões']

// Mock de sugestões de grupos para a tab 'Sugestões'
const mockSugestoes = [
  { id: 'g3', nome: 'Grupo de Fotografia', descricao: 'Amantes da Imagem', atuacao: 'Arte e Cultura', foto: '/img/grupo-foto.jpg' },
  { id: 'g4', nome: 'Gastronomia Vegana', descricao: 'Receitas Sustentáveis', atuacao: 'Culinária', foto: '/img/grupo-veg.jpg' },
]

// Dados mock para a tab 'Meus Grupos'
const dados = [
  {
    id: '1',
    nome: 'Grupo Agroecologia',
    descricao: 'Técnicos e Engenheiros',
    atuacao: 'Consultoria Rural',
    foto: '/img/grupo-agro.jpg',
  },
  {
    id: '2',
    nome: 'Drone e Georreferência',
    descricao: 'Tecnologia no Campo',
    atuacao: 'Inovação Agrícola',
    foto: '/img/grupo-drone.jpg',
  },
]

export default function Grupos() {
  // Estado global para aba ativa usando Zustand
  const { gruposTab, setTab } = useTabStore()

  // Hook de navegação do Next.js
  const router = useRouter()

  // Estado para o filtro de busca
  const [busca, setBusca] = useState('')

  // Estado para os grupos filtrados conforme busca
  const [gruposFiltrados, setGruposFiltrados] = useState(dados)

  // Estado para sugestões filtradas conforme busca
  const [sugestoesFiltradas, setSugestoesFiltradas] = useState(mockSugestoes)

  // Controle do modal do grupo selecionado (avatar menu)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [grupoSelecionado, setGrupoSelecionado] = useState<{ name: string; avatarUrl: string } | null>(null)

  // Controle do modal para sugestão selecionada
  const [isSugestaoModalOpen, setIsSugestaoModalOpen] = useState(false)
  const [sugestaoSelecionada, setSugestaoSelecionada] = useState<typeof mockSugestoes[0] | null>(null)

  // Atualiza a lista filtrada sempre que busca ou aba muda
  useEffect(() => {
    if (gruposTab === 0) {
      setGruposFiltrados(
        dados.filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()))
      )
    } else if (gruposTab === 1) {
      setSugestoesFiltradas(
        mockSugestoes.filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()))
      )
    }
  }, [busca, gruposTab])

  // Função para navegar para a página do grupo
  const entrarNoGrupo = (id: string) => {
    router.push(`/grupo?id=${id}`)
  }

  // Abre modal com detalhes do grupo clicado (avatar)
  const abrirModalGrupo = (nome: string, foto: string) => {
    setGrupoSelecionado({ name: nome, avatarUrl: foto })
    setIsModalOpen(true)
  }

  // Abre modal com detalhes da sugestão clicada
  const abrirModalSugestao = (grupo: typeof mockSugestoes[0]) => {
    setSugestaoSelecionada(grupo)
    setIsSugestaoModalOpen(true)
  }

  // Navega para tela de criação de grupo
  const criarGrupo = () => {
    router.push('/grupos/criar')
  }

    const irParaBuscador = () => {
    router.push('/buscador?selecao=grupos')
  }

  return (
    <div className="min-h-screen px-2 bg-gray-50">
      {/* Título da página */}
      <MainBanner />
      {/* <h1 className="text-2xl font-bold mb-4 text-center">Área de Grupos</h1> */}

      {/* Barra superior: seleção de aba e botão de criar grupo */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <TabSelector
            tabs={tabs}
            activeIndex={gruposTab}
            onChange={(i) => setTab("gruposTab", i)}
          />
        </div>
      <button
          onClick={criarGrupo}
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Criar Grupo
        </button>
        </div>
        <div className="flex justify-center items-center pb-3">
        {/* Campo de busca */}
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>
        <div className="flex justify-center items-center pb-3">
          <button
            onClick={irParaBuscador}
            className="ml-4 flex items-center gap-2 border border-gray-400 rounded px-4 py-2 hover:bg-gray-100 transition"
          >
            Procurar por Filtros
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>
          </button>
        </div>

      {/* Conteúdo dos grupos ou sugestões com animação de transição */}
      <motion.div
        key={gruposTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {gruposTab === 0 && (
          <div className="space-y-4">
            {gruposFiltrados.length > 0 ? (
              gruposFiltrados.map((p) => (
                <PessoaCard
                  key={p.id}
                  pessoa={p}
                  onMensagem={() => entrarNoGrupo(p.id)}
                  onFotoClick={() => abrirModalGrupo(p.nome, p.foto)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">
                Nenhum grupo encontrado.
              </p>
            )}
          </div>
        )}

        {gruposTab === 1 && (
          <div className="space-y-4">
            {sugestoesFiltradas.length > 0 ? (
              sugestoesFiltradas.map((p) => (
                <PessoaCard
                  key={p.id}
                  pessoa={p}
                  onMensagem={() => entrarNoGrupo(p.id)}
                  onFotoClick={() => abrirModalSugestao(p)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">
                Nenhuma sugestão encontrada.
              </p>
            )}
          </div>
        )}
      </motion.div>

      {/* Modal AvatarMenu para grupo selecionado */}
      {grupoSelecionado && (
        <AvatarMenu
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          name={grupoSelecionado.name}
          avatarUrl={grupoSelecionado.avatarUrl}
        />
      )}

      {/* Modal com detalhes da sugestão selecionada */}
      {sugestaoSelecionada && (
        <AppModal
          isOpen={isSugestaoModalOpen}
          onClose={() => setIsSugestaoModalOpen(false)}
          title={`Sobre ${sugestaoSelecionada.nome}`}
        >
          <div className="flex gap-4 items-center">
            <img
              src={sugestaoSelecionada.foto}
              alt={sugestaoSelecionada.nome}
              className="w-24 h-24 rounded-full object-cover border"
            />
            <div>
              <p className="text-lg font-semibold">
                {sugestaoSelecionada.nome}
              </p>
              <p className="text-sm text-gray-600">
                {sugestaoSelecionada.descricao}
              </p>
              <p className="text-sm text-gray-700 font-semibold">
                {sugestaoSelecionada.atuacao}
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
              onClick={() => {
                alert("Solicitação enviada!");
                setIsSugestaoModalOpen(false);
              }}
            >
              Entrar no grupo
            </button>

            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition w-full"
              onClick={() => router.push(`/grupo?id=${sugestaoSelecionada.id}`)}
            >
              Ver detalhes
            </button>
          </div>
        </AppModal>
      )}
    </div>
  );
}
