'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import {
  FiPhone,
  FiVideo,
  FiInfo,
  FiMessageSquare,
  FiTrash2,
  FiStar,
  FiSlash,
} from 'react-icons/fi'

type Props = {
  isOpen: boolean
  onClose: () => void
  name: string
  avatarUrl: string
}

export const AvatarMenu: React.FC<Props> = ({
  isOpen,
  onClose,
  name,
  avatarUrl,
}) => {
  const router = useRouter()

  if (!isOpen) return null

  // Handlers de navegação e ações
  const handleGoToMessages = () => {
    router.push('/chat') // ajustar rota real
  }

  const handleCall = () => {
    console.log('Ligação iniciada') // implementar lógica de chamada
  }

  const handleVideoCall = () => {
    console.log('Chamada de vídeo iniciada') // implementar lógica de vídeo
  }

  const handleGoToPublicProfile = () => {
    router.push('/feed') // ajustar rota real
  }

  const handleFavorite = () => {
    console.log('Favorito adicionado/removido') // integrar com API
  }

  const handleBlock = () => {
    console.log('Usuário bloqueado') // confirmar bloqueio com modal?
  }

  const handleDelete = () => {
    console.log('Usuário excluído') // confirmar exclusão com modal?
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center sm:items-center justify-center bg-black/50"
      onClick={onClose} // fechar ao clicar fora
    >
      <div
        className="bg-white w-full sm:w-80 p-4 rounded-t-2xl sm:rounded-xl shadow-lg flex flex-col items-center"
        onClick={(e) => e.stopPropagation()} // não fecha ao clicar dentro
      >
        {/* Avatar */}
        <img
          src={avatarUrl}
          alt={name}
          className="w-24 h-24 rounded-full border object-cover mb-3"
        />
        <h2 className="font-bold text-lg mb-4">{name}</h2>

        {/* Linha 1: Mensagem, Ligar, Vídeo */}
        <div className="grid grid-cols-3 gap-4 w-full mb-4">
          <button
            className="flex flex-col items-center text-gray-700 hover:text-orange-500"
            onClick={handleGoToMessages}
          >
            <FiMessageSquare size={20} />
            <span className="text-xs">Mensagem</span>
          </button>

          <button
            className="flex flex-col items-center text-gray-700 hover:text-blue-500"
            onClick={handleCall}
          >
            <FiPhone size={20} />
            <span className="text-xs">Ligar</span>
          </button>

          <button
            className="flex flex-col items-center text-gray-700 hover:text-green-500"
            onClick={handleVideoCall}
          >
            <FiVideo size={20} />
            <span className="text-xs">Vídeo</span>
          </button>
        </div>

        {/* Linha 2: Tela Pública, Favoritar, Bloquear */}
        <div className="grid grid-cols-3 gap-4 w-full">
          <button
            className="flex flex-col items-center text-gray-700 hover:text-purple-500"
            onClick={handleGoToPublicProfile}
          >
            <span className="text-xs">Tela-Publica</span>
            <span className="text-xs">Site-Social</span>
            
          </button>

          <button
            className="flex flex-col items-center text-gray-700 hover:text-yellow-500"
            onClick={handleFavorite}
          >
            <FiStar size={20} />
            <span className="text-xs">Favoritar</span>
          </button>

          <button
            className="flex flex-col items-center text-gray-700 hover:text-red-600"
            onClick={handleBlock}
          >
            <FiSlash size={20} />
            <span className="text-xs">Bloquear</span>
          </button>
        </div>

        {/* Linha 3: Excluir */}
        <div className="grid grid-cols-1 gap-4 p-2 w-full justify-center mt-2">
          <button
            className="flex flex-col items-center text-red-700 hover:text-red-600"
            onClick={handleDelete}
          >
            <FiTrash2 size={20} />
            <span className="text-xs">Excluir</span>
          </button>
        </div>
      </div>
    </div>
  )
}