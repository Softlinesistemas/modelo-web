'use client'
import { Card, CardHeader, CardTitle, CardContent } from '@/utils/ui/Card'
import { Button } from '@/utils/ui/Button'
import { useState } from 'react'

interface InfoModalProps {
  title: string
  content: string
}

export function InfoModal({ title, content }: InfoModalProps) {
  const [open, setOpen] = useState(true)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <Card className="max-w-lg w-full p-6">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm whitespace-pre-line">{content}</p>
          <Button variant="primary" size="md" onClick={() => setOpen(false)}>
            Continuar
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
