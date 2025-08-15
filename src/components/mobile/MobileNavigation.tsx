'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Search, 
  MessageCircle, 
  User, 
  Menu,
  X,
  Bell,
  Settings,
  LogOut,
  ChevronRight
} from 'react-feather';
import { useRouter } from 'next/navigation';

interface MobileNavigationProps {
  currentPath?: string;
  unreadMessages?: number;
  unreadNotifications?: number;
}

export default function MobileNavigation({
  currentPath = '/',
  unreadMessages = 0,
  unreadNotifications = 0
}: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();

  const mainNavItems = [
    { 
      id: 'home', 
      label: 'Início', 
      icon: Home, 
      path: '/',
      badge: 0
    },
    { 
      id: 'search', 
      label: 'Buscar', 
      icon: Search, 
      path: '/buscador',
      badge: 0
    },
    { 
      id: 'messages', 
      label: 'Mensagens', 
      icon: MessageCircle, 
      path: '/mensageiro',
      badge: unreadMessages
    },
    { 
      id: 'profile', 
      label: 'Perfil', 
      icon: User, 
      path: '/editarPerfil',
      badge: 0
    }
  ];

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: Home },
    { label: 'Feed', path: '/feed', icon: Home },
    { label: 'Grupos', path: '/grupos', icon: MessageCircle },
    { label: 'Galeria', path: '/galeria', icon: Search },
    { label: 'Empresas', path: '/empresas', icon: User },
    { label: 'Fornecedores', path: '/fornecedores', icon: User },
    { label: 'Notificações', path: '/notificacoes', icon: Bell },
    { label: 'Configurações', path: '/configuracoes', icon: Settings },
    { label: 'Sobre', path: '/sobre', icon: User },
    { label: 'Contato', path: '/contato', icon: MessageCircle },
    { label: 'FAQ', path: '/faq', icon: Search }
  ];

  // Auto-hide navigation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  const isActivePath = (path: string) => {
    return currentPath === path;
  };

  // Haptic feedback
  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([10]);
    }
  };

  return (
    <>
      {/* Bottom Navigation */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 safe-area-inset"
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : 100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="flex items-center justify-around py-2 px-4">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);
            
            return (
              <motion.button
                key={item.id}
                onClick={() => {
                  triggerHaptic();
                  handleNavigation(item.path);
                }}
                className={`relative flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-[60px] ${
                  isActive 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <Icon className="w-6 h-6" />
                  {item.badge > 0 && (
                    <motion.div
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                      {item.badge > 99 ? '99+' : item.badge}
                    </motion.div>
                  )}
                </div>
                <span className={`text-xs mt-1 font-medium ${isActive ? 'text-green-600' : 'text-gray-600'}`}>
                  {item.label}
                </span>
              </motion.button>
            );
          })}
          
          {/* Menu Button */}
          <motion.button
            onClick={() => {
              triggerHaptic();
              setIsMenuOpen(true);
            }}
            className="flex flex-col items-center justify-center p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors min-w-[60px]"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <Menu className="w-6 h-6" />
              {unreadNotifications > 0 && (
                <motion.div
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  {unreadNotifications > 99 ? '99+' : unreadNotifications}
                </motion.div>
              )}
            </div>
            <span className="text-xs mt-1 font-medium text-gray-600">Menu</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Side Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 shadow-xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* User Info */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">João Silva</h3>
                    <p className="text-sm text-gray-600">joao@exemplo.com</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto py-4">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = isActivePath(item.path);
                  
                  return (
                    <motion.button
                      key={item.path}
                      onClick={() => {
                        triggerHaptic();
                        handleNavigation(item.path);
                      }}
                      className={`w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors ${
                        isActive ? 'bg-green-50 border-r-2 border-green-600' : ''
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-green-600' : 'text-gray-600'}`} />
                        <span className={`font-medium ${isActive ? 'text-green-600' : 'text-gray-800'}`}>
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-6">
                <motion.button
                  onClick={() => {
                    triggerHaptic();
                    // Handle logout
                    console.log('Logout');
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sair</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

