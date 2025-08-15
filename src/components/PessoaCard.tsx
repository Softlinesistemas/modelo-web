import { FiMessageSquare, FiUserPlus, FiUserX } from "react-icons/fi";
import { Button } from "@/utils/ui/Button";

type Pessoa = {
  id: string;
  nome: string;
  descricao: string;
  atuacao: string;
  foto: string;
  username?: string;
  cidade?: string;
};

type Props = {
  pessoa: Pessoa;
  onMensagem: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onFotoClick: (e: React.MouseEvent<HTMLImageElement>) => void;
  onClick?: () => void;
  onSeguir?: () => void;
  onRemover?: () => void;
  isAmigo?: boolean;
  className?: string;
};

export function PessoaCard({
  pessoa,
  onMensagem,
  onFotoClick,
  onClick,
  onSeguir,
  onRemover,
  isAmigo = false,
  className = "",
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`flex border-2 border-green-600 rounded p-2 gap-3 items-center bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition ${className}`}
    >
      {/* Foto com hover effect */}
      <div className="relative group">
        <img
          src={pessoa.foto || "/default-avatar.jpg"}
          alt={pessoa.nome}
          onClick={(e) => {
            e.stopPropagation();
            onFotoClick(e);
          }}
          className="w-16 h-16 rounded object-cover border border-gray-300 cursor-pointer group-hover:opacity-90 transition"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/default-avatar.jpg";
          }}
        />
        {isAmigo && (
          <span className="absolute bottom-0 right-0 bg-green-500 text-white text-xs px-1 rounded">
            Amigo
          </span>
        )}
      </div>

      {/* Informações do usuário */}
      <div className="flex flex-col text-sm flex-1 min-w-0">
        <strong 
          className="text-black leading-tight truncate"
          title={pessoa.nome}
        >
          {pessoa.nome}
        </strong>
        <span 
          className="text-green-800 font-medium truncate"
          title={pessoa.descricao}
        >
          {pessoa.descricao}
        </span>
        <span 
          className="text-black font-semibold truncate"
          title={pessoa.atuacao}
        >
          {pessoa.atuacao}
        </span>
        {pessoa.cidade && (
          <span className="text-gray-500 text-xs truncate">
            {pessoa.cidade}
          </span>
        )}
      </div>

      {/* Ações */}
      <div className="flex flex-col items-center gap-1 ml-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMensagem(e);
          }}
          className="text-xl text-green-900 hover:text-green-500 transition"
          title="Enviar mensagem"
        >
          <FiMessageSquare />
        </button>

        {/* Botão condicional para seguir/remover */}
        {onSeguir && !isAmigo && (
          <Button
            variant="ghost"
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
              onSeguir();
            }}
            className="text-green-600 hover:text-green-800"
            title="Seguir usuário"
          >
            <FiUserPlus size={16} />
          </Button>
        )}

        {onRemover && isAmigo && (
          <Button
            variant="ghost"
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
              onRemover();
            }}
            className="text-red-600 hover:text-red-800"
            title="Remover amigo"
          >
            <FiUserX size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}