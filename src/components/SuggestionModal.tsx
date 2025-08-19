'use client'
import { Card, CardHeader, CardTitle, CardContent } from '@/utils/ui/Card'
import { Button } from '@/utils/ui/Button'
import { useState } from 'react'

interface SuggestionModalProps {
  onClose: () => void
}

export function SuggestionModal({ onClose }: SuggestionModalProps) {
  const [open, setOpen] = useState(true)

  if (!open) return null

  const handleClick = (action: string) => {
    console.log("Usuário escolheu:", action)
    setOpen(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <Card className="max-w-lg w-full p-6">
        <CardHeader>
          <CardTitle>O que você gostaria de fazer agora?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" onClick={() => handleClick("conhecer_grupos")}>
            Conhecer grupos
          </Button>
          <Button className="w-full" onClick={() => handleClick("editar_perfil")}>
            Completar meu perfil
          </Button>
          <Button className="w-full" onClick={() => handleClick("explorar_feed")}>
            Explorar o feed
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
