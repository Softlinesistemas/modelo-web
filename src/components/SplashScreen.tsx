'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    const hasShown = sessionStorage.getItem('splashShown')

    if (!hasShown) {
      setShowSplash(true)
      sessionStorage.setItem('splashShown', 'true')

      const timeout = setTimeout(() => {
        setShowSplash(false)
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [])

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          className="fixed inset-0 bg-[#B6D2B7] z-[9999] flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo central */}
          <motion.img
            src="/gooagroLogo.png"
            alt="Logo GooAgro"
            className="w-48 h-48 object-contain"
          />

          {/* Bandeiras no rodapé */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
            <img
              src="/bandeira-bahia.png"
              alt="Bahia"
              className="w-10 h-8 object-cover rounded shadow"
            />
            <img
              src="/bandeira-brasil.png"
              alt="Brasil"
              className="w-10 h-8 object-cover rounded shadow"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
