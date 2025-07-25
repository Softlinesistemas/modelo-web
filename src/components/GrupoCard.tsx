// components/GrupoCard.tsx

type Grupo = {
  id: string
  nome: string
  descricao: string
  atuacao: string
  foto: string
  membros?: number
  privado?: boolean
}

type Props = {
  grupo: Grupo
  onEntrar: () => void
  onFotoClick: () => void
  isSugestao?: boolean
}

export function GrupoCard({ grupo, onEntrar, onFotoClick, isSugestao = false }: Props) {
  return (
    <div className="flex border-2 border-blue-600 rounded p-2 gap-3 items-center bg-white shadow-sm">
      <img
        src={grupo.foto}
        alt={grupo.nome}
        onClick={onFotoClick}
        className="w-16 h-16 rounded object-cover border border-gray-300 cursor-pointer hover:scale-105 transition"
      />
      <div className="flex flex-col text-sm flex-1">
        <strong className="text-black leading-tight">{grupo.nome}</strong>
        <span className="text-blue-800 font-medium">{grupo.descricao}</span>
        <span className="text-blue-800 font-semibold">{grupo.atuacao}</span>
        {grupo.membros !== undefined && (
          <span className="text-sm text-gray-600">{grupo.membros} membros</span>
        )}
        {grupo.privado && isSugestao && (
          <span className="text-xs text-red-600 font-semibold">Grupo Privado</span>
        )}
      </div>

      <button
        onClick={onEntrar}
        className={`ml-auto text-sm ${
          isSugestao ? 'bg-green-600' : 'bg-blue-600'
        } text-white px-3 py-1 rounded hover:opacity-90 transition`}
      >
        {isSugestao ? (grupo.privado ? 'Pedir para entrar' : 'Entrar') : 'Acessar'}
      </button>
    </div>
  )
}
