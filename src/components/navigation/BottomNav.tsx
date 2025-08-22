'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FiUsers, FiLayers, FiGlobe, FiDollarSign } from 'react-icons/fi';
import Image from 'next/image';
import { useAuth } from '@/app/context/AuthContext';
import { useAction } from '@/app/context/ActionContext';
import { NavButton } from './NavButton';
import { motion } from 'framer-motion';
import { avatar2 } from '../../../public'; // ou ajuste conforme o caminho

export const BottomNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user }: any = useAuth();
  const { setActiveAction } = useAction();
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  const navItems = [
    { icon: <FiUsers />, label: 'AMIGOS', route: '/amigos' },
    { icon: <FiLayers />, label: 'GRUPOS', route: '/grupos' },
    { icon: <FiGlobe />, label: 'FORNECEDORES', route: '/fornecedores' },
    { icon: <FiDollarSign />, label: 'EMPRESAS', route: '/empresas' },
  ];

  // Detecta a rota ativa e define o botão atual
  useEffect(() => {
    const activeItem = navItems.find(item => item.route === pathname);
    if (activeItem) {
      setActiveLabel(activeItem.label);
      setActiveAction(activeItem.label);
    } else {
      setActiveLabel(null);
      setActiveAction(null);
    }
  }, [pathname]);

  const handleClick = (route: string, label: string) => {
    setActiveLabel(label);
    setActiveAction(label);
    router.push(route);
  };

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-inner p-2 flex justify-around border-t border-gray-200 rounded-md z-50">
      {/* Botão central com avatar */}
      <motion.button onClick={() => router.push('/')} className="flex flex-col items-center text-xs">
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-300">
          <Image
            src={avatar2}
            // src={user?.avatarUrl} // Se quiser usar avatar dinâmico
            alt={user?.name || 'Perfil'}
            fill
            className="object-cover"
          />
        </div>
        <span className="mt-0.5 text-[11px] font-medium text-green-700">CENTRAL</span>
      </motion.button>

      {/* Navegação dinâmica */}
      {navItems.map((nav, i) => (
        <NavButton
          key={i}
          icon={nav.icon}
          label={nav.label}
          route={nav.route}
          isActive={activeLabel === nav.label}
          onClick={() => handleClick(nav.route, nav.label)}
        />
      ))}
    </nav>
  );
};
