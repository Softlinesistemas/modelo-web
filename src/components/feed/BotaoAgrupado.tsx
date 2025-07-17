// components/BotaoAgrupado.tsx
"use client"

import { useState } from "react"
import { FaUserFriends } from "react-icons/fa"
import { RiStackLine } from "react-icons/ri"
import { useRouter } from "next/navigation" // Adicionando navegação

export const BotaoAgrupado = () => {
  const router = useRouter();
  const [ativo, setAtivo] = useState<"amigos" | "grupos">("amigos")

  const handleAmigosClick = () => {
    setAtivo("amigos");
    router.push("/amigos"); // Navega para a página de amigos
  }

  const handleGruposClick = () => {
    setAtivo("grupos");
    router.push("/grupos"); // Navega para a página de grupos
  }

  return (
    <div className="flex rounded-full overflow-hidden shadow-md">
      <button
        onClick={handleAmigosClick}
        className={`flex items-center gap-2 px-3 py-1.5 transition text-xs ${
          ativo === "amigos"
            ? "bg-green-700 text-white"
            : "bg-green-100 text-green-800 hover:bg-green-200"
        }`}
      >
        <FaUserFriends />
        Amigos
      </button>

      <button
        onClick={handleGruposClick}
        className={`flex items-center gap-2 px-3 py-1.5 transition text-xs ${
          ativo === "grupos"
            ? "bg-green-700 text-white"
            : "bg-green-100 text-green-800 hover:bg-green-200"
        }`}
      >
        <RiStackLine />
        Grupos
      </button>
    </div>
  )
}