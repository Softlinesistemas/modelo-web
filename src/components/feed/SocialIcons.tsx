
"use client"

import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaMapMarkedAlt, FaPhoneAlt } from "react-icons/fa"
import { FiPlus } from "react-icons/fi"
import { AiOutlineMail, AiOutlineGlobal } from "react-icons/ai"
import { PiButterflyFill } from "react-icons/pi"
import { BsThreads } from "react-icons/bs"
import { MdAlternateEmail } from "react-icons/md"
import { SiThreads } from "react-icons/si"

const icons = [
  { icon: <AiOutlineGlobal size={24} />, label: "Site" },
  { icon: <MdAlternateEmail size={24} />, label: "Email" },
  { icon: <FaInstagram size={24} />, label: "Instagram" },
  { icon: <FaFacebook size={24} />, label: "Facebook" },
  { icon: <FaYoutube size={24} />, label: "YouTube" },
  { icon: <SiThreads size={24} />, label: "Threads" },
  { icon: <FaTiktok size={24} />, label: "TikTok" },
  { icon: <PiButterflyFill size={24} />, label: "Borboleta" }, // Custom icon
  { icon: <FiPlus size={24} />, label: "Adicionar" },
  { icon: <FaMapMarkedAlt size={24} />, label: "Mapa" },
  { icon: <FaPhoneAlt size={24} />, label: "Telefone" },
]

export const SocialIcons = () => {
  return (
    <div className="grid grid-cols-5 gap-4 p-4 bg-green-100 rounded-xl max-w-md mx-auto">
      {icons.map((item, index) => (
        <button
          key={index}
          title={item.label}
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow hover:scale-105 transition"
        >
          {item.icon}
        </button>
      ))}
    </div>
  )
}
