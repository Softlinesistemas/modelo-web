'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { FiUsers, FiLayers, FiGlobe, FiDollarSign } from 'react-icons/fi'
import Image from 'next/image'
import { useUser } from '@/app/context/AuthContext'
import { useAction } from '@/app/context/ActionContext'
import { NavButton } from './NavButton'
import { motion } from 'framer-motion'

export const BottomNav: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { user }: any = useUser()
  const { setActiveAction } = useAction()
  const [activeLabel, setActiveLabel] = useState<string | null>(null)

  const navItems = [
    { icon: <FiUsers />, label: 'Amigos', color: 'text-[#8F7E76]', route: '/amigos' },
    { icon: <FiLayers />, label: 'Grupos', color: 'text-[#8F7E76]', route: '/grupos' },
    { icon: <FiGlobe />, label: 'Fornecedores', color: 'text-[#8F7E76]', route: '/fornecedores' },
    { icon: <FiDollarSign />, label: 'Empresas', color: 'text-[#8F7E76]', route: '/empresas' },
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

  const handleClick = (route: string, label: string) => {
    setActiveLabel(label)
    setActiveAction(label)
    router.push(route)
  }

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-inner p-2 flex justify-around border-t border-gray-200 rounded-md z-50">
      {/* Avatar do usuário */}
      <motion.button onClick={() => router.push('/')} className="flex flex-col items-center text-xs">
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-300">
          <Image
            src={user?.avatarUrl}
            alt={user?.name}
            fill
            className="object-cover"
          />
        </div>
        <span className="mt-0.5 text-[11px] font-medium text-gray-600">Central</span>
      </motion.button>

      {/* Botões com badge e animação */}
      {navItems.map((nav, i) => (
        <NavButton
          key={i}
          icon={nav.icon}
          label={nav.label}
          route={nav.route}
          isActive={activeLabel === nav.label}
          onClick={() => handleClick(nav.route, nav.label)}
          color={nav.color}
        />
      ))}
    </nav>
  )
}
