'use client'

import React, { useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  FiUsers,
  FiLayers,
  FiGlobe,
  FiDollarSign,
} from 'react-icons/fi'
import Image from 'next/image'

// Simulando mensagens não lidas (depois você integra com backend ou contexto)
const unreadMessages: any = {
  '/AMIGOS': false,
  '/grupos': true,
  '/fornecedores': false,
  '/empresa': true,
}

export const ActionContext = React.createContext<{
  setActiveAction: (action: string | null) => void
}>({
  setActiveAction: () => {},
})

export const BottomNav: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { setActiveAction } = useContext(ActionContext)
  const [activeLabel, setActiveLabel] = useState<string | null>(null)

  const navItems = [
    {
      icon: <FiUsers />,
      label: 'AMIGOS',
      color: 'text-[#8F7E76]',
      route: '/AMIGOS',
    },
    {
      icon: <FiLayers />,
      label: 'GRUPOS',
      color: 'text-[#8F7E76]',
      route: '/grupos',
    },
    {
      icon: <FiGlobe />,
      label: 'FORNECEDORES',
      color: 'text-[#8F7E76]',
      route: '/fornecedores',
    },
    {
      icon: <FiDollarSign />,
      label: 'EMPRESAS',
      color: 'text-[#8F7E76]',
      route: '/empresas',
    },
  ]

  useEffect(() => {
    const activeItem = navItems.find(item => item.route === pathname)
    if (activeItem) {
      setActiveLabel(activeItem.label)
      setActiveAction(activeItem.label)
    } else {
      setActiveLabel(null)
      setActiveAction(null)
    }
  }, [pathname])

  function handleClick(route: string, label: string) {
    setActiveLabel(label)
    setActiveAction(label)
    router.push(route)
  }

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-inner p-2 flex justify-around border-t border-gray-200 rounded-md z-50">
      
      {/* Avatar do usuário no canto esquerdo */}
      <button
        onClick={() => router.push('/')}
        className="flex flex-col items-center text-xs"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-300">
          <Image
            src="/avatar3.jpeg"
            alt="Avatar"
            fill
            className="object-cover"
          />
        </div>
        <span className="mt-0.5 text-[11px] font-medium text-gray-600">CENTRAL</span>
      </button>

      {/* Botões da nav com notificação se tiver mensagem */}
      {navItems.map((nav, i) => {
        const isActive = activeLabel === nav.label
        const hasNotification = unreadMessages[nav.route]

        return (
          <button
            key={i}
            onClick={() => handleClick(nav.route, nav.label)}
            className={`relative flex flex-col items-center text-xs transition ${
              isActive ? 'text-black font-bold' : 'text-gray-600 hover:text-black'
            }`}
          >
            {/* Ícone com badge se tiver mensagem nova */}
            <div className={`${nav.color} text-xl ${isActive ? 'text-black' : ''} relative`}>
              {nav.icon}

              {hasNotification && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </div>

            <span className="mt-0.5 text-[11px] font-medium">{nav.label}</span>
          </button>
        )
      })}
    </nav>
  )
}