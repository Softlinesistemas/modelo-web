"use client"

import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaMapMarkedAlt,
  FaPhoneAlt,
} from "react-icons/fa"
import { FiPlus } from "react-icons/fi"
import { AiOutlineMail, AiOutlineGlobal, AiOutlineLink } from "react-icons/ai"
import { PiButterflyFill } from "react-icons/pi"
import { SiThreads } from "react-icons/si"
import { MdAlternateEmail } from "react-icons/md"
import { JSX, useEffect, useState } from "react"

type SocialLinks = {
  gps?: { lat: number; lng: number }
  site?: string
  email?: string
  altEmail?: string
  instagram?: string
  facebook?: string
  youtube?: string
  threads?: string
  threadsAlt?: string
  tiktok?: string
  telefone?: string
  linktree?: string
  borboleta?: string
  adicionar?: boolean
}

type IconItem = {
  icon: JSX.Element
  label: string
  action: () => void
  highlight?: boolean
  colSpan?: boolean
}

interface SocialIconsProps {
  links?: SocialLinks
}

export const SocialIcons = ({ links: initialLinks }: SocialIconsProps) => {
  const [links, setLinks] = useState<SocialLinks>(initialLinks || {})

  useEffect(() => {
    // Aqui você poderia buscar os dados do backend
    /*
    async function fetchSocialLinks() {
      try {
        const res = await fetch("/api/social-links") // endpoint que retorna os links do DB
        const data = await res.json()
        setLinks(data)
      } catch (err) {
        console.error("Erro ao buscar links:", err)
      }
    }

    fetchSocialLinks()
    */
  }, [])

  const mainIcons: IconItem[] = [
    links.gps && {
      icon: <FaMapMarkedAlt size={28} />,
      label: "ATIVAR GPS",
      highlight: true,
      colSpan: true,
      action: () => {
        const { lat, lng } = links.gps!
        window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank")
      },
    },
    links.site && {
      icon: <AiOutlineGlobal size={24} />,
      label: "Site",
      action: () => window.open(links.site!, "_blank"),
    },
    links.linktree && {
      icon: <AiOutlineLink size={24} />,
      label: "Linktree",
      action: () => window.open(links.linktree!, "_blank"),
    },
    links.email && {
      icon: <AiOutlineMail size={24} />,
      label: "Email",
      action: () => (window.location.href = `mailto:${links.email}`),
    },
    links.instagram && {
      icon: <FaInstagram size={24} />,
      label: "Instagram",
      action: () => window.open(links.instagram!, "_blank"),
    },
    links.facebook && {
      icon: <FaFacebook size={24} />,
      label: "Facebook",
      action: () => window.open(links.facebook!, "_blank"),
    },
    links.youtube && {
      icon: <FaYoutube size={24} />,
      label: "YouTube",
      action: () => window.open(links.youtube!, "_blank"),
    },
    links.threads && {
      icon: <SiThreads size={24} />,
      label: "Threads",
      action: () => window.open(links.threads!, "_blank"),
    },
    links.tiktok && {
      icon: <FaTiktok size={24} />,
      label: "TikTok",
      action: () => window.open(links.tiktok!, "_blank"),
    },
    links.borboleta && {
      icon: <PiButterflyFill size={24} />,
      label: "Borboleta",
      action: () => alert("Este é um botão simbólico"),
    },
  ].filter(Boolean) as IconItem[]

  const adicionarBtn: IconItem | null = links.adicionar
    ? {
        icon: <FiPlus size={24} />,
        label: "Adicionar",
        action: () => alert("Função de adicionar em construção"),
      }
    : null

  const allIcons: IconItem[] = [...mainIcons, ...(adicionarBtn ? [adicionarBtn] : [])]

  return (
    <div className="grid grid-cols-6 gap-2 p-2 rounded-xl w-full shadow-gray-300">
      {allIcons.map((item, index) => {
        const isGPS = item.colSpan
        return (
          <button
            key={index}
            title={item.label}
            onClick={item.action}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition shadow-md shadow-gray-400 text-sm font-medium border border-black
              ${item.highlight ? "bg-[#05c8f7] text-black hover:bg-green-300" : "bg-white text-black hover:scale-105"}
              ${isGPS ? "col-span-2" : ""}`}
          >
            {item.icon}
            <span
              className={`mt-1 text-[11px] leading-tight text-center ${
                item.highlight ? "font-bold uppercase" : ""
              }`}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
