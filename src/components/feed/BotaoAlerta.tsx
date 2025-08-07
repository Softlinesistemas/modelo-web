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
        className="flex items-center justify-center gap-2 min-w-[140px] h-[40px] px-3 py-1.5 bg-red-600 text-white text-sm font-medium whitespace-nowrap shadow-md hover:bg-red-700 transition"
      >
        {/* <MdErrorOutline size={18} /> */}
        Apoio de Comunicação
      </button>

      <ContatoModal aberto={aberto} aoFechar={() => setAberto(false)} />
    </>
  )
}
