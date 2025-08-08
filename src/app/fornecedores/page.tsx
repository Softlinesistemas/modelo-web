'use client'

import { useTabStore } from '@/store/useTabStore' // Store para controlar abas
import { TabSelector } from '@/components/TabSelector' // Componente para seleção de abas
import { motion } from 'framer-motion' // Para animações suaves
import { useRouter } from 'next/navigation' // Navegação do Next.js
import { PessoaCard } from '@/components/PessoaCard' // Card genérico que pode ser usado para fornecedores
import { useEffect, useState } from 'react'
import { AvatarMenu } from '@/components/AvatarMenu' // Modal para avatar e nome
import { AppModal } from '@/utils/ui/AppModal' // Modal genérico
import { MainBanner } from '@/components/MainBanner'
import { Button } from '@/utils/ui/Button'
import { FiSearch } from 'react-icons/fi'
import { Label } from '@/utils/ui/Label'

// Define as abas para fornecedores
const tabs = ['Meus FORNECEDORES', 'Sugestões']

// Mock de fornecedores sugeridos
const mockSugestoes = [
  {
    id: 'f3',
    nome: 'AgroTech Ltda',
    descricao: 'Tecnologia para agricultura de precisão',
    atuacao: 'Tecnologia Agrícola',
    foto: '/images/agro-tech.png',
  },
  {
    id: 'f4',
    nome: 'Sementes Verdes',
    descricao: 'Sementes orgânicas certificadas',
    atuacao: 'Sementes',
    foto: '/images/sementes.jpg',
  },
]

// Mock dos meus fornecedores
const meusFornecedores = [

  {
    id: 'f1',
    nome: 'Sitio Canaã - Alimentos Orgânicos',
    descricao: 'Produtos: Alimentos e Bebidas',
    atuacao: 'Alimentação escolar',
    foto: '/avatar3.jpeg',
  },
  {
    id: 'f2',
    nome: 'Fertilizantes Alfa',
    descricao: 'Fertilizantes para alta produtividade',
    atuacao: 'Fertilizantes',
    foto: '/images/agro-tech.png',
  },
  {
    id: 'f3',
    nome: 'Irrigação Beta',
    descricao: 'Soluções em irrigação inteligente',
    atuacao: 'Irrigação',
    foto: '/images/sementes.jpg',
  },
]

export default function Fornecedores() {
  // Estado da aba usando Zustand (armazenamento global)
  const { fornecedoresTab, setTab } = useTabStore()

  // Router para navegação
  const router = useRouter()

  // Estado da busca
  const [busca, setBusca] = useState('')

  // Estado fornecedores filtrados conforme busca
  const [fornecedoresFiltrados, setFornecedoresFiltrados] = useState(meusFornecedores)

  // Estado sugestões filtradas conforme busca
  const [sugestoesFiltradas, setSugestoesFiltradas] = useState(mockSugestoes)

  // Modal para fornecedor selecionado
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState<{ name: string; avatarUrl: string } | null>(null)

  // Modal para sugestão selecionada
  const [isSugestaoModalOpen, setIsSugestaoModalOpen] = useState(false)
  const [sugestaoSelecionada, setSugestaoSelecionada] = useState<typeof mockSugestoes[0] | null>(null)

  // Atualiza listas filtradas ao mudar busca ou aba
  useEffect(() => {
    if (fornecedoresTab === 0) {
      setFornecedoresFiltrados(
        meusFornecedores.filter((f) => f.nome.toLowerCase().includes(busca.toLowerCase()))
      )
    } else {
      setSugestoesFiltradas(
        mockSugestoes.filter((f) => f.nome.toLowerCase().includes(busca.toLowerCase()))
      )
    }
  }, [busca, fornecedoresTab])

  // Navega para detalhes do fornecedor
  const abrirFornecedor = (id: string) => {
    if (id === 'f1') {
      router.push('/feed/fornecedor') // Abre página específica
    } else {
      router.push(`/feed/fornecedor?id=${id}`) // Ou outra rota se precisar
    }
  };

  // Abre modal com avatar do fornecedor clicado
  const abrirModalFornecedor = (nome: string, foto: string) => {
    setFornecedorSelecionado({ name: nome, avatarUrl: foto })
    setIsModalOpen(true)
  }

  // Abre modal com detalhes da sugestão clicada
  const abrirModalSugestao = (fornecedor: typeof mockSugestoes[0]) => {
    setSugestaoSelecionada(fornecedor)
    setIsSugestaoModalOpen(true)
  }

  // Navega para tela de criação de fornecedor
  const criarFornecedor = () => {
    router.push('/fornecedores/criar')
  }

      const irParaBuscador = () => {
    router.push('/buscador?selecao=forncedores')
  }

  return (
    <div className="w-full mb-8">
      {/* <h1 className="text-2xl font-bold mb-4 text-center">Área de Fornecedores</h1> */}
    <MainBanner />
      {/* Tabs e botão criar fornecedor */}
      <div className="flex items-center justify-between mt-2 mb-4">
        <div className="flex-1">
          <TabSelector
            tabs={tabs}
            activeIndex={fornecedoresTab}
            onChange={(i) => setTab('fornecedoresTab', i)}
          />
          </div>
        <Button
          onClick={criarFornecedor}
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          variant='buscarFiltros'
        >
          Ser FORNECEDOR
        </Button>
        </div>
        <div className="flex items-center justify-center">
        <Label variant="secondary">Buscar FORNECEDOR por Nome ou Usuário</Label>
      </div>
      <div className="flex items-center gap-2 border-2 border-green-700 bg-gray-100 rounded-md px-3 py-2 mx-4 my-2 pb-2">
      <FiSearch className="text-gray-400" />
      <input
        type="text"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Escreva aqui..."
        className="bg-transparent outline-none text-sm w-full"
      />
    </div>
     
      {/* Campo busca */}
      <div className="flex justify-center items-center pb-7 p-4">
        <Button
          onClick={irParaBuscador}
          variant='buscarFiltros'
          className="ml-4 flex items-center gap-2 bg-red-600 text-white border-red-200 border rounded px-4 py-2 hover:bg-gray-100 transition"
        >
          Procurar por Filtros
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
        </Button>
      </div>
      


      {/* Conteúdo com animação de entrada */}
      <motion.div
        key={fornecedoresTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {fornecedoresTab === 0 && (
  <div className="space-y-2">
    {fornecedoresFiltrados.length > 0 ? (
      fornecedoresFiltrados.map((f) => (
        <PessoaCard
          key={f.id}
          pessoa={f}
          // Clique no card inteiro vai para o fornecedor
          onClick={() => abrirFornecedor(f.id)}
          // Mantive o clique na foto para abrir o modal
          onFotoClick={() => abrirModalFornecedor(f.nome, f.foto)} onMensagem={function (e: React.MouseEvent<HTMLButtonElement>): void {
            throw new Error('Function not implemented.')
          } }        />
      ))
    ) : (
      <p className="text-center text-gray-500">Nenhum fornecedor encontrado.</p>
    )}
  </div>
)}

        {fornecedoresTab === 1 && (
          <div className="space-y-2">
            {sugestoesFiltradas.length > 0 ? (
              sugestoesFiltradas.map((f) => (
                <PessoaCard
                  key={f.id}
                  pessoa={f}
                  onMensagem={() => abrirFornecedor(f.id)}
                  onFotoClick={() => abrirModalSugestao(f)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">Nenhuma sugestão encontrada.</p>
            )}
          </div>
        )}
      </motion.div>

      {/* Modal avatar fornecedor */}
      {fornecedorSelecionado && (
        <AvatarMenu
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          name={fornecedorSelecionado.name}
          avatarUrl={fornecedorSelecionado.avatarUrl}
        />
      )}

      {/* Modal detalhes sugestão */}
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
                alert('Solicitação enviada!')
                setIsSugestaoModalOpen(false)
              }}
            >
              Entrar em contato
            </button>

            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition w-full"
              onClick={() => router.push(`/fornecedor?id=${sugestaoSelecionada.id}`)}
            >
              Ver detalhes
            </button>
          </div>
        </AppModal>
      )}
    </div>
  )
}
