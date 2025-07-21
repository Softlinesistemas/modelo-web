'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type ActionContextType = {
  activeAction: string | null
  setActiveAction: (action: string | null) => void
}

const ActionContext = createContext<ActionContextType>({
  activeAction: null,
  setActiveAction: () => {},
})

export const useAction = () => useContext(ActionContext)

export const ActionProvider = ({ children }: { children: ReactNode }) => {
  const [activeAction, setActiveAction] = useState<string | null>(null)

  return (
    <ActionContext.Provider value={{ activeAction, setActiveAction }}>
      {children}
    </ActionContext.Provider>
  )
}
