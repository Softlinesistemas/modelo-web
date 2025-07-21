import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useNotifications } from '../../app/context/NotificationContext'
type Props = {
  icon: ReactNode
  label: string
  route: string
  isActive: boolean
  onClick: () => void
  color?: string
}

export const NavButton = ({ icon, label, route, isActive, onClick, color = 'text-gray-600' }: Props) => {
  const { unread, setUnread } = useNotifications()
  const hasNotification = unread[route]

  const handleClick = () => {
    if (hasNotification) {
      setUnread(route, false) // 🔥 Zera o badge ao clicar
    }
    onClick()
  }

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className={`relative flex flex-col items-center text-xs transition ${
        isActive ? 'text-black font-bold' : 'hover:text-black'
      }`}
    >
      <div className={`${color} text-xl ${isActive ? 'text-black' : ''} relative`}>
        {icon}
        {hasNotification && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        )}
      </div>
      <span className="mt-0.5 text-[11px] font-medium">{label}</span>
    </motion.button>
  )
}
