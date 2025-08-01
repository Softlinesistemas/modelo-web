'use client'

import { useTabStore } from '@/store/useTabStore'
import { TabSelector } from '@/components/TabSelector'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { PessoaCard } from '@/components/PessoaCard'
import { useEffect, useState } from 'react'
import { AvatarMenu } from '@/components/AvatarMenu'
import { AppModal } from '@/utils/ui/AppModal'
import { MainBanner } from '@/components/MainBanner'

const tabs = ['Meus', 'Sugestões']

const mockSugestoes = [
  { id: 'g3', nome: 'Grupo de Fotografia', descricao: 'Amantes da Imagem', atuacao: 'Arte e Cultura', foto: '/img/grupo-foto.jpg' },
  { id: 'g4', nome: 'Gastronomia Vegana', descricao: 'Receitas Sustentáveis', atuacao: 'Culinária', foto: '/img/grupo-veg.jpg' },
]

const dados = [
  {
    id: '1',
    nome: 'Sitio Canaã - Alimentos Orgânicos',
    descricao: 'Alimentos e Bebidas',
    atuacao: 'Alimentos',
    foto: './avatarSitio.jpg',
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
  const { gruposTab, setTab } = useTabStore()
  const router = useRouter()
  const [busca, setBusca] = useState('')
  const [gruposFiltrados, setGruposFiltrados] = useState(dados)
  const [sugestoesFiltradas, setSugestoesFiltradas] = useState(mockSugestoes)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [grupoSelecionado, setGrupoSelecionado] = useState<{ name: string; avatarUrl: string } | null>(null)

  const [isSugestaoModalOpen, setIsSugestaoModalOpen] = useState(false)
  const [sugestaoSelecionada, setSugestaoSelecionada] = useState<typeof mockSugestoes[0] | null>(null)

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

  const entrarNoGrupo = (id: string) => {
    router.push(`/feed/grupo?id=${id}`)
  }

  const abrirModalGrupo = (nome: string, foto: string) => {
    setGrupoSelecionado({ name: nome, avatarUrl: foto })
    setIsModalOpen(true)
  }

  const abrirModalSugestao = (grupo: typeof mockSugestoes[0]) => {
    setSugestaoSelecionada(grupo)
    setIsSugestaoModalOpen(true)
  }

  const criarGrupo = () => {
    router.push('/grupos/criar')
  }

  const irParaBuscador = () => {
    router.push('/buscador?selecao=grupos')
  }

  return (
    <div className="min-h-screen px-2 bg-gray-50">
      <MainBanner />

      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <TabSelector
            tabs={tabs}
            activeIndex={gruposTab}
            onChange={(i) => setTab('gruposTab', i)}
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
                  onClick={() => entrarNoGrupo(p.id)}
                  onMensagem={(e) => {
                    e.stopPropagation();
                    entrarNoGrupo(p.id);
                  }}
                  onFotoClick={(e) => {
                    e.stopPropagation();
                    abrirModalGrupo(p.nome, p.foto);
                  }}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">Nenhum grupo encontrado.</p>
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
                  onClick={() => entrarNoGrupo(p.id)}
                  onMensagem={(e) => {
                    e.stopPropagation();
                    entrarNoGrupo(p.id);
                  }}
                  onFotoClick={(e) => {
                    e.stopPropagation();
                    abrirModalSugestao(p);
                  }}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">Nenhuma sugestão encontrada.</p>
            )}
          </div>
        )}
      </motion.div>

      {grupoSelecionado && (
        <AvatarMenu
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          name={grupoSelecionado.name}
          avatarUrl={grupoSelecionado.avatarUrl}
        />
      )}

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
              <p className="text-lg font-semibold">{sugestaoSelecionada.nome}</p>
              <p className="text-sm text-gray-600">{sugestaoSelecionada.descricao}</p>
              <p className="text-sm text-gray-700 font-semibold">{sugestaoSelecionada.atuacao}</p>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
              onClick={() => {
                alert('Solicitação enviada!');
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
