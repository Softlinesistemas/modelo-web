'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTabStore } from '@/store/useTabStore'
import { TabSelector } from '@/components/TabSelector'
import { EmpresaCard } from '@/components/EmpresaCard' 
import { AppModal } from '@/utils/ui/AppModal'

const tabs = ['Meus', 'Sugestões']

// Interfaces e mocks ficam fora do componente (boa prática)
interface Empresa {
  id: string
  nome: string
  descricao: string
  logo: string
}

const minhasEmpresasMock: Empresa[] = [
  {
    id: 'e1',
    nome: 'AgroBrasil SA',
    descricao: 'Líder em soluções agrícolas no Brasil',
    logo: '/img/empresa-agrobrasil.png',
  },
  {
    id: 'e2',
    nome: 'TechFarms Ltda',
    descricao: 'Tecnologia e inovação para o campo',
    logo: '/img/empresa-techfarms.png',
  },
]

const sugestoesEmpresasMock: Empresa[] = [
  {
    id: 'e3',
    nome: 'Verde Forte',
    descricao: 'Produtos orgânicos e sustentáveis',
    logo: '/img/empresa-verdeforte.png',
  },
  {
    id: 'e4',
    nome: 'Campo Digital',
    descricao: 'Plataformas digitais para gestão agrícola',
    logo: '/img/empresa-campodigital.png',
  },
]

export default function Empresas() {
  const router = useRouter()
  const { empresasTab, setTab } = useTabStore()

  // Estados e hooks dentro do componente (corrigido)
  const [busca, setBusca] = useState('')

  // Estados filtrados por aba
  const [empresasFiltradas, setEmpresasFiltradas] = useState<Empresa[]>(minhasEmpresasMock)
  const [sugestoesFiltradas, setSugestoesFiltradas] = useState<Empresa[]>(sugestoesEmpresasMock)
  // const [procurarFiltradas, setProcurarFiltradas] = useState<Empresa[]>([])

  // Modal de detalhes da empresa selecionada
  const [empresaSelecionada, setEmpresaSelecionada] = useState<Empresa | null>(null)
  const [modalAberto, setModalAberto] = useState(false)

  // Atualiza filtros conforme aba e busca
  useEffect(() => {
    if (empresasTab === 0) {
      setEmpresasFiltradas(
        minhasEmpresasMock.filter((e) =>
          e.nome.toLowerCase().includes(busca.toLowerCase())
        )
      )
    } else if (empresasTab === 1) {
      setSugestoesFiltradas(
        sugestoesEmpresasMock.filter((e) =>
          e.nome.toLowerCase().includes(busca.toLowerCase())
        )
      )
    // } else if (empresasTab === 2) {
    //   const todas = [...minhasEmpresasMock, ...sugestoesEmpresasMock]
    //   setProcurarFiltradas(
    //     todas.filter((e) => e.nome.toLowerCase().includes(busca.toLowerCase()))
    //   )
    }
  }, [busca, empresasTab])

  // Abre modal com detalhes da empresa
  const abrirModalEmpresa = (empresa: Empresa) => {
    setEmpresaSelecionada(empresa)
    setModalAberto(true)
  }

  // Navega para a página de detalhes da empresa
  const navegarParaEmpresa = (id: string) => {
    router.push(`/empresa?id=${id}`)
  }

  // Navega para criação de nova empresa
  const criarEmpresa = () => {
    router.push('/empresas/criar')
  }

      const irParaBuscador = () => {
    router.push('/buscador?selecao=empresa')
  }


  return (
    <div className="min-h-screen px-4 py-6 bg-gray-50">
      {/* Título da página */}
      <h1 className="text-2xl font-bold mb-4 text-center">Área de Empresas</h1>

      {/* Barra superior: seleção de aba e botão de criar grupo */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
        <TabSelector
          tabs={tabs}
          activeIndex={empresasTab}
          onChange={(i) => setTab('empresasTab', i)}
        />
        </div>


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
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
        </button>
        <button
          onClick={criarEmpresa}
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Ser Empresa
        </button>
      </div>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar empresa..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Lista com animação ao trocar de aba */}
      <motion.div
        key={empresasTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Aba Meus */}
        {empresasTab === 0 && (
          <div className="space-y-4">
            {empresasFiltradas.length > 0 ? (
              empresasFiltradas.map((empresa) => (
                <EmpresaCard
                  key={empresa.id}
                  empresa={empresa}
                  onClick={() => abrirModalEmpresa(empresa)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">Nenhuma empresa encontrada.</p>
            )}
          </div>
        )}

        {/* Aba Sugestões */}
        {empresasTab === 1 && (
          <div className="space-y-4">
            {sugestoesFiltradas.length > 0 ? (
              sugestoesFiltradas.map((empresa) => (
                <EmpresaCard
                  key={empresa.id}
                  empresa={empresa}
                  onClick={() => abrirModalEmpresa(empresa)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">Nenhuma sugestão encontrada.</p>
            )}
          </div>
        )}

        {/* Aba Procurar */}
        {/* {empresasTab === 2 && (
          <div className="space-y-4">
            {procurarFiltradas.length > 0 ? (
              procurarFiltradas.map((empresa) => (
                <EmpresaCard
                  key={empresa.id}
                  empresa={empresa}
                  onClick={() => abrirModalEmpresa(empresa)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">Nenhuma empresa encontrada.</p>
            )} 
          </div>
        )}*/}
      </motion.div>

      {/* Modal detalhes empresa */}
      {empresaSelecionada && (
        <AppModal
          isOpen={modalAberto}
          onClose={() => setModalAberto(false)}
          title={empresaSelecionada.nome}
        >
          <div className="flex flex-col items-center gap-4">
            <img
              src={empresaSelecionada.logo}
              alt={empresaSelecionada.nome}
              className="w-32 h-32 object-contain rounded-lg border"
            />
            <p className="text-gray-700">{empresaSelecionada.descricao}</p>

            <div className="flex gap-4 mt-6 w-full">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex-1"
                onClick={() => {
                  alert('Contato enviado!')
                  setModalAberto(false)
                }}
              >
                Entrar em contato
              </button>

              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition flex-1"
                onClick={() => {
                  navegarParaEmpresa(empresaSelecionada.id)
                  setModalAberto(false)
                }}
              >
                Ver detalhes
              </button>
            </div>
          </div>
        </AppModal>
      )}
    </div>
  )
}
