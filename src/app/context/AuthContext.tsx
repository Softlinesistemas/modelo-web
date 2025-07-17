'use client'

import React, { createContext, useContext } from 'react'

type User = {
  name: string
  avatarUrl: string
}

const AuthContext = createContext<User>({
  name: 'Ramon',
  avatarUrl: '/avatar.png',
})

export const useUser = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const user = {
    name: 'Ramon',
    avatarUrl: '/avatar.png', // futura integração com backend
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
