'use client'

import React from 'react'

// Tipagem
type TableSection = {
  title: string
  columns: string[]
  rows: string[][]
}

type ProducerTableInfoProps = {
  data?: TableSection[]
  isLoading?: boolean
}

// ✅ MOCK para quando não tiver dados vindos da API ou banco
const mockData: TableSection[] = [
  {
    title: 'Produtos & Serviços',
    columns: ['TIPO', 'CATEGORIA', 'MODALIDADE'],
    rows: [
      ['Fruta', 'Banana', 'Prata'],
      ['Café da manhã', 'Cuscuz', ''],
      ['Café da manhã', 'Ovos', 'Cozidos'],
    ],
  },
  {
    title: 'Assuntos que temos interesse',
    columns: ['TIPO', 'CATEGORIA', 'MODALIDADE'],
    rows: [
      ['Mecânica', '8 Peças', ''],
      ['Veículo', 'Trator', 'Carga'],
    ],
  },
]

// ✅ COMPONENTE PRINCIPAL
export default function TabelasDoProdutor() {
  // 👉 futuramente: verificar autenticação
  // const { user } = useAuthContext()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Tabela sempre aparece, mesmo sem login */}
      <ProducerTableInfo data={mockData} />

      {/* Lógica comentada para quando quiser mostrar campos extras só logado */}
      {/*
      {user?.isLoggedIn && (
        <div className="mt-4">
          <BotaoEditarTabelas />
        </div>
      )}
      */}
    </div>
  )
}

// ✅ COMPONENTE DE TABELAS REUTILIZÁVEL
export const ProducerTableInfo = ({
  data = [],
  isLoading = false,
}: ProducerTableInfoProps) => {
  return (
    <div className="space-y-6 text-sm mt-4">
      {isLoading ? (
        <div className="animate-pulse text-center text-gray-500">Carregando dados...</div>
      ) : data.length === 0 ? (
        <div className="text-center text-gray-500">Nenhum dado disponível no momento.</div>
      ) : (
        data.map((section, idx) => (
          <div key={idx}>
            <h3 className="bg-green-200 px-3 py-1 rounded-t text-gray-700 font-semibold">
              {section.title}
            </h3>
            <table className="w-full text-left border border-gray-300 bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  {section.columns.map((col, i) => (
                    <th key={i} className="p-2 border border-gray-300 font-medium">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="p-2 border border-gray-300">
                        {cell || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  )
}
