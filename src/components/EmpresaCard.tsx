import React from 'react'

interface Empresa {
  id: string
  nome: string
  descricao: string
  logo: string
}

interface EmpresaCardProps {
  empresa: Empresa
  onClick: () => void
  onFotoClick?: () => void
  onMensagem?: () => void
}

export function EmpresaCard({
  empresa,
  onClick,
  onFotoClick,
  onMensagem,
}: EmpresaCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex border-2 border-green-600 rounded p-2 gap-3 items-center bg-white shadow-sm cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      aria-label={`Detalhes da empresa ${empresa.nome}`}
    >
      {/* Logo da empresa com clique independente */}
      <img
        src={empresa.logo}
        alt={`${empresa.nome} logo`}
        className="w-16 h-16 object-contain rounded-md border"
        onClick={(e) => {
          e.stopPropagation() // impede que acione o onClick do card
          if (onFotoClick) onFotoClick()
        }}
      />

      {/* Nome e descrição */}
      <div className="flex flex-col flex-1">
        <h2 className="text-lg font-semibold text-gray-900">{empresa.nome}</h2>
        <p className="text-gray-600 text-sm">{empresa.descricao}</p>
      </div>

      {/* Botão de mensagem opcional */}
      {onMensagem && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onMensagem()
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
        >
          Mensagem
        </button>
      )}
    </div>
  )
}
