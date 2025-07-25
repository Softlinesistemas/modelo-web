type Pessoa = {
  id: string
  nome: string
  descricao: string
  atuacao: string
  foto: string
}

type Props = {
  pessoa: Pessoa
  onMensagem: () => void
  onFotoClick: () => void
}

export function PessoaCard({ pessoa, onMensagem, onFotoClick }: Props) {
  return (
    <div className="flex border-2 border-green-600 rounded p-2 gap-3 items-center bg-white shadow-sm">
      <img
        src={pessoa.foto}
        alt={pessoa.nome}
        onClick={onFotoClick}
        className="w-16 h-16 rounded object-cover border border-gray-300 cursor-pointer hover:scale-105 transition"
      />
      <div className="flex flex-col text-sm flex-1">
        <strong className="text-black leading-tight">{pessoa.nome}</strong>
        <span className="text-green-800 font-medium">{pessoa.descricao}</span>
        <span className="text-green-800 font-semibold">{pessoa.atuacao}</span>
      </div>

      <button
        onClick={onMensagem}
        className="ml-auto text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
      >
        Mensagem
      </button>
    </div>
  )
}