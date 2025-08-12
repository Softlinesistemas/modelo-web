"use client"

import { useState } from "react"
import { FaUserFriends } from "react-icons/fa"
import { RiStackLine } from "react-icons/ri"
import { useRouter } from "next/navigation"
import { BotaoAlerta } from "./BotaoAlerta"

export const BotaoAgrupado = () => {
  const router = useRouter()
  const [ativo, setAtivo] = useState<"amigos" | "grupos">("amigos")

  const handleamigosClick = () => {
    setAtivo("amigos")
    router.push("/amigos")
  }

  const handleGruposClick = () => {
    setAtivo("grupos")
    router.push("/grupos")
  }

  const botaoClasseBase = "flex items-center justify-center gap-1 min-w-[115px] h-[42px] px-3 py-2 text-xs font-semibold transition"

  return (
    <div className="flex flex-nowrap gap-2 w-full justify-center">
      <button
        onClick={handleamigosClick}
        className={`${botaoClasseBase} ${
          ativo === "amigos"
            ? "bg-green-700 text-white"
            : "bg-green-100 text-green-800 hover:bg-green-200"
        }`}
      >
        {/* <FaUserFriends size={10} /> */}
        <span>Meus AMIGOS</span>
      </button>

      <button
        onClick={handleGruposClick}
        className={`${botaoClasseBase} ${
          ativo === "grupos"
            ? "bg-green-700 text-white"
            : "bg-green-100 text-green-800 hover:bg-green-200"
        }`}
      >
        {/* <RiStackLine size={10} /> */}
        <span>Meus GRUPOS</span>
      </button>

      <BotaoAlerta />
    </div>
  )
}
