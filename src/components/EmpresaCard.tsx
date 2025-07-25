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
}

// Componente que mostra o card com logo, nome e descrição da empresa
export function EmpresaCard({ empresa, onClick }: EmpresaCardProps) {
  return (
    // Container clicável com sombra e efeito hover
    <div
      onClick={onClick}
      className="cursor-pointer flex items-center gap-4 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        // Permite ativar o clique com Enter ou Espaço no teclado (acessibilidade)
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      aria-label={`Detalhes da empresa ${empresa.nome}`}
    >
      {/* Logo da empresa */}
      <img
        src={empresa.logo}
        alt={`${empresa.nome} logo`}
        className="w-16 h-16 object-contain rounded-md border"
      />

      {/* Texto nome e descrição */}
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold text-gray-900">{empresa.nome}</h2>
        <p className="text-gray-600 text-sm">{empresa.descricao}</p>
      </div>
    </div>
  )
}
