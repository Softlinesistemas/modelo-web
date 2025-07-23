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
// import { BsThreads } from "react-icons/bs"
import { JSX } from "react"

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
  borboleta?: boolean
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
  links: SocialLinks
}

export const SocialIcons = ({ links }: SocialIconsProps) => {
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
    // links.altEmail && {
    //   icon: <MdAlternateEmail size={24} />,
    //   label: "Contato",
    //   action: () => (window.location.href = `mailto:${links.altEmail}`),
    // },
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
    // links.threadsAlt && {
    //   icon: <BsThreads size={24} />,
    //   label: "Threads 2",
    //   action: () => window.open(links.threadsAlt!, "_blank"),
    // },
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
    // links.telefone && {
    //   icon: <FaPhoneAlt size={24} />,
    //   label: "Telefone",
    //   action: () => (window.location.href = `tel:${links.telefone}`),
    // },
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
    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 p-2 bg-green-100 rounded-xl max-w-md mx-auto shadow-gray-300">
      {allIcons.map((item, index) => (
        <button
          key={index}
          title={item.label}
          onClick={item.action}
          className={`flex flex-col items-center justify-center p-3 rounded-2xl transition shadow-md shadow-gray-400 text-sm font-medium 
            ${item.highlight ? "bg-green-500 text-white hover:bg-green-600" : "bg-white text-gray-800 hover:scale-105"}
            ${item.colSpan ? "col-span-3 sm:col-span-2" : ""}
          `}
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
      ))}
    </div>
  )
}
