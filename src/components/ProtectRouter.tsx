'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext' // ajusta o caminho se necessário

interface ProtectRouterProps {
  children: React.ReactNode
}

export function ProtectRouter({ children }: ProtectRouterProps) {
  const { user, loading } = useAuth() 
  const router = useRouter()

  // Se ainda está carregando o estado do usuário
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="animate-pulse">Verificando sessão...</span>
      </div>
    )
  }

  // Se não tem usuário autenticado, manda pro login
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  // Só renderiza as páginas se estiver logado
  if (!user) return null

  return <>{children}</>
}
