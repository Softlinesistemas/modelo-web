'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTabStore } from '@/store/useTabStore'
import { TabSelector } from '@/components/TabSelector'
import { EmpresaCard } from '@/components/EmpresaCard'
import { AppModal } from '@/utils/ui/AppModal'
import { MainBanner } from '@/components/MainBanner'
import { Button } from '@/utils/ui/Button'
import { FiSearch } from 'react-icons/fi'
import { Label } from '@/utils/ui/Label'

const tabs = ['EMPRESAS', 'Sugestões']

interface Empresa {
  id: string
  nome: string
  descricao: string
  logo: string
}

export default function Empresas() {
  const router = useRouter()
  const { empresasTab, setTab } = useTabStore()
  const [busca, setBusca] = useState('')
  const [empresas, setEmpresas] = useState<Empresa[]>([]) // estado que receberá empresas do backend
  const [sugestoes, setSugestoes] = useState<Empresa[]>([]) // estado que receberá sugestões do backend
  const [empresasFiltradas, setEmpresasFiltradas] = useState<Empresa[]>([])
  const [sugestoesFiltradas, setSugestoesFiltradas] = useState<Empresa[]>([])
  const [empresaSelecionada, setEmpresaSelecionada] = useState<Empresa | null>(null)
  const [modalAberto, setModalAberto] = useState(false)

  // Função para buscar as empresas do usuário no backend
  async function fetchMinhasEmpresas() {
    try {
      // Aqui você faria a chamada real à API, ex:
      // const res = await fetch('/api/empresas/minhas')
      // const data = await res.json()
      // setEmpresas(data)

      // MOCK - REMOVER depois da API pronta:
      const dataMock: Empresa[] = [
        {
          id: '1',
          nome: 'AgroBrasil SA',
          descricao: 'Líder em soluções agrícolas no Brasil',
          logo: '/images/AgroBrasilSA.jpg',
        },
        {
          id: '2',
          nome: 'TechFarms Ltda',
          descricao: 'Tecnologia e inovação para o campo',
          logo: '/images/TechFarm.jpg',
        },
      ]
      setEmpresas(dataMock)
    } catch (error) {
      console.error('Erro ao buscar minhas empresas:', error)
    }
  }

  // Função para buscar as sugestões no backend
  async function fetchSugestoesEmpresas() {
    try {
      // Chamada real à API, ex:
      // const res = await fetch('/api/empresas/sugestoes')
      // const data = await res.json()
      // setSugestoes(data)

      // MOCK - REMOVER depois da API pronta:
      const sugestoesMock: Empresa[] = [
        {
          id: '3',
          nome: 'Verde Forte',
          descricao: 'Produtos orgânicos e sustentáveis',
          logo: '/img/empresa-verdeforte.png',
        },
        {
          id: '4',
          nome: 'Campo Digital',
          descricao: 'Plataformas digitais para gestão agrícola',
          logo: '/img/empresa-campodigital.png',
        },
      ]
      setSugestoes(sugestoesMock)
    } catch (error) {
      console.error('Erro ao buscar sugestões:', error)
    }
  }

  // Busca dados no carregamento e quando a aba muda (pra manter atualizado)
  useEffect(() => {
    if (empresasTab === 0) {
      fetchMinhasEmpresas()
    } else if (empresasTab === 1) {
      fetchSugestoesEmpresas()
    }
  }, [empresasTab])

  // Filtra as listas localmente conforme o campo de busca
  useEffect(() => {
    setEmpresasFiltradas(
      empresas.filter((e) =>
        e.nome.toLowerCase().includes(busca.toLowerCase())
      )
    )
    setSugestoesFiltradas(
      sugestoes.filter((e) =>
        e.nome.toLowerCase().includes(busca.toLowerCase())
      )
    )
  }, [busca, empresas, sugestoes])

  const abrirModalEmpresa = (empresa: Empresa) => {
    setEmpresaSelecionada(empresa)
    setModalAberto(true)
  }

  const navegarParaEmpresa = (id: string) => {
    router.push(`/empresa?id=${id}`)
  }

  const criarEmpresa = () => {
    router.push('/empresas/criar')
  }

  const irParaBuscador = () => {
    router.push('/buscador?selecao=empresa')
  }

  const abrirEmpresa = (id: string) => {
    if (id === 'f1') {
      router.push('/feed/empresa')
    } else {
      router.push(`/feed/empresa?id=${id}`)
    }
  }

  return (
    <div className="w-full p-1 mb-8">
      <MainBanner />
      <div className="flex items-center justify-between mt-2 mb-4">
        <div className="flex-1">
          <TabSelector
            tabs={tabs}
            activeIndex={empresasTab}
            onChange={(i) => setTab('empresasTab', i)}
          />
        </div>
        <Button
          onClick={criarEmpresa}
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          variant="buscarFiltros"
        >
          Ser EMPRESA
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <Label variant="secondary">Buscar EMPRESA por Nome ou Usuário</Label>
      </div>
      <div className="flex items-center gap-2 border-2 border-green-700 bg-gray-100 rounded-md px-3 py-2 mx-4 my-2">
        <FiSearch className="text-gray-400" />
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Escreva aqui..."
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>
      <div className="flex justify-center items-center pb-7 p-4">
        <Button
          onClick={irParaBuscador}
          className="ml-4 flex items-center gap-2 border bg-red-600 text-black border-red-200 rounded px-4 py-2 hover:bg-red-600 transition"
        >
          Procurar por filtros
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
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
        </Button>
      </div>

      <motion.div
        key={empresasTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {empresasTab === 0 && (
          <div className="space-y-2">
            {empresasFiltradas.length > 0 ? (
              empresasFiltradas.map((f) => (
                <EmpresaCard
                  key={f.id}
                  empresa={f}
                  onClick={() => abrirEmpresa(f.id)}
                  onFotoClick={() => abrirModalEmpresa(f)}
                  onMensagem={() => alert(`Mensagem para ${f.nome} ainda não implementada`)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">Nenhum fornecedor encontrado.</p>
            )}
          </div>
        )}

        {empresasTab === 1 && (
          <div className="space-y-2">
            {sugestoesFiltradas.length > 0 ? (
              sugestoesFiltradas.map((empresa) => (
                <EmpresaCard
                  key={empresa.id}
                  empresa={empresa}
                  onClick={() => abrirEmpresa(empresa.id)}
                  onFotoClick={() => abrirModalEmpresa(empresa)}
                  onMensagem={() => alert(`Mensagem para ${empresa.nome} ainda não implementada`)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">Nenhuma sugestão encontrada.</p>
            )}
          </div>
        )}
      </motion.div>

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
              className="w-48 h-48 object-contain rounded"
            />
            <p>{empresaSelecionada.descricao}</p>
            <Button
              onClick={() => {
                setModalAberto(false)
                navegarParaEmpresa(empresaSelecionada.id)
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Ver Perfil Completo
            </Button>
          </div>
        </AppModal>
      )}
    </div>
  )
}
