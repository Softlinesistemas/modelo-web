
import React from 'react'
import { motion } from 'framer-motion'

interface TabSelectorProps {
  tabs: string[]
  activeIndex: number
  onChange: (index: number) => void
}

export const TabSelector: React.FC<TabSelectorProps> = ({ tabs, activeIndex, onChange }) => {
  return (
    <div className="flex gap-2 px-4 py-2">
      {tabs.map((tab, i) => (
        <button
          key={i}
          className={`relative px-2 py-1 rounded-sm text-md font-medium transition ${
            activeIndex === i ? 'bg-[#1A924D] text-white' : 'bg-gray-100 text-gray-600'
          }`}
          onClick={() => onChange(i)}
        >
          {tab}
          {activeIndex === i && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 rounded-sm bg-[#1A924D] z-[-1]"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
