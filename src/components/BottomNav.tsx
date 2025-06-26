'use client'

import React, { useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation' // Next 13 app router hooks
import {
  FiHome,
  FiUsers,
  FiLayers,
  FiGlobe,
  FiDollarSign,
} from 'react-icons/fi'

export const ActionContext = React.createContext<{
  setActiveAction: (action: string | null) => void
}>({
  setActiveAction: () => {},
})

export const BottomNav: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname() // pega rota atual
  const { setActiveAction } = useContext(ActionContext)
  const [activeLabel, setActiveLabel] = useState<string | null>(null)

  // Define os botões com rota alvo e cor base
  const navItems = [
    {
      icon: <FiHome />,
      label: 'Central',
      color: 'text-[#8F7E76]',
      route: '/', 
    },
    {
      icon: <FiUsers />,
      label: 'Amigos',
      color: 'text-[#8F7E76]',
      route: '/amigos',
    },
    {
      icon: <FiLayers />,
      label: 'Grupos',
      color: 'text-[#8F7E76]',
      route: '/grupos',
    },
    {
      icon: <FiGlobe />,
      label: 'Fornecedores',
      color: 'text-[#8F7E76]',
      route: '/fornecedores',
    },
    {
      icon: <FiDollarSign />,
      label: 'Empresas',
      color: 'text-[#8F7E76]',
      route: '/empresas',
    },
  ]

  // Atualiza o botão ativo baseado na rota atual
  useEffect(() => {
    // verifica qual rota corresponde ao pathname atual
    const activeItem = navItems.find(item => item.route === pathname)
    if (activeItem) {
      setActiveLabel(activeItem.label)
      setActiveAction(activeItem.label) // atualiza contexto global se precisar
    } else {
      setActiveLabel(null)
      setActiveAction(null)
    }
  }, [pathname])

  // Função para navegar e atualizar estado ativo
  function handleClick(item: typeof navItems[0]) {
    setActiveLabel(item.label)
    setActiveAction(item.label)
    router.push(item.route)
  }

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-inner p-2 flex justify-around border-t border-gray-200 rounded-md z-50">
      {navItems.map((nav, i) => {
        const isActive = activeLabel === nav.label
        return (
          <button
            key={i}
            onClick={() => handleClick(nav)}
            className={`flex flex-col items-center text-xs transition ${
              isActive ? 'text-black font-bold' : 'text-gray-600 hover:text-black'
            }`}
          >
            <div
              className={`${nav.color} text-xl ${
                isActive ? 'text-black' : ''
              }`}
            >
              {nav.icon}
            </div>
            <span className="mt-0.5 text-[11px] font-medium">{nav.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
