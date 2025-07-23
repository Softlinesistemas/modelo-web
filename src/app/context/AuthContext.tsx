'use client'

import React, { createContext, useContext } from 'react'
import { StaticImageData } from 'next/image';
import { avatar2, avatar, avatar3 } from '../../../public';

type User = {
  name: string
  avatarUrl: StaticImageData
}

const AuthContext = createContext<User>({
  name: 'Ramon',
  avatarUrl: avatar2,
})

export const useUser = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const user = {
    name: 'Ramon',
    avatarUrl: avatar2,
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
