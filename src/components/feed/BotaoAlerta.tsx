// components/BotaoAlerta.tsx
"use client"
import { useState } from "react"
import { MdErrorOutline } from "react-icons/md"
import { ContatoModal } from "./ContatoModal"

export const BotaoAlerta = () => {
  const [aberto, setAberto] = useState(false)

  return (
    <>
      <button
        onClick={() => setAberto(true)}
        className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition text-xs"
      >
        <MdErrorOutline size={16} />
        <span>Apoio de Comunicação</span>
      </button>

      <ContatoModal aberto={aberto} aoFechar={() => setAberto(false)} />
    </>
  )
}