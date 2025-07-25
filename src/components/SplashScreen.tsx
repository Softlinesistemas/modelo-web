// components/SplashScreen.tsx
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
      }, 2000) 
      return () => clearTimeout(timeout)
    }
  }, [])

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          className="fixed inset-0 bg-[#B6D2B7] z-[9999] flex items-start justify-start mt-4"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src="/gooagroLogo.png"
            alt="Logo GooAgro"
            className="w-40 h-40 object-contain"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
