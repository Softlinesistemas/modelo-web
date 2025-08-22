'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { StaticImageData } from 'next/image'
import { avatar2 } from '../../../public' // ajuste o caminho conforme seu projeto

// Tipo do usuário
type User = {
  name: string
  avatarUrl: StaticImageData
} | null

// Tipo do contexto
type AuthContextType = {
  user: User
  loading: boolean
  login: (name: string) => void
  logout: () => void
}

// Cria o contexto
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
})

// Hook pra usar o contexto
export const useAuth = () => useContext(AuthContext)

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)

  // Simulação de carregamento inicial (poderia ser verificação em localStorage ou API)
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Login simples (você pode substituir por requisição real)
  const login = (name: string) => {
    const newUser = { name, avatarUrl: avatar2 }
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  // Logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}



// 'use client'

// import React, { createContext, useContext } from 'react'
// import { StaticImageData } from 'next/image';
// import { avatar2, avatar, avatar3 } from '../../../public';

// type User = {
//   name: string
//   avatarUrl: StaticImageData
// }

// const AuthContext = createContext<User>({
//   name: 'Ramon',
//   avatarUrl: avatar2,
// })

// export const useUser = () => useContext(AuthContext)

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const user = {
//     name: 'Ramon',
//     avatarUrl: avatar2,
//   }

//   return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
// }
