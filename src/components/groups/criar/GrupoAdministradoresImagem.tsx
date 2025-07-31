'use client'

import { Controller } from 'react-hook-form'
import { Input } from '@/utils/ui/Input'
import { Label } from '@/utils/ui/Label'
import { Button } from '@/utils/ui/Button'
import { FormData } from '@/schemas/grupoSchema'

type Props = {
  register: any
  control: any
  errors: any
}

export default function GrupoAdministradoresImagem({ register, control, errors }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Administradores e Imagem</h2>

      {/* Upload de Imagem */}
      <div>
        <Label>Imagem do Grupo</Label>
        <div className="flex items-center gap-4">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
            <span className="text-gray-500 text-xs">Foto</span>
          </div>
          <Button variant="outline" size="sm">
            Selecionar Imagem
          </Button>
        </div>
      </div>

      {/* Administradores */}
      <div>
        <Label>Administradores</Label>
        <p className="text-sm text-gray-600 mb-2">
          Adicione administradores para ajudar a gerenciar o grupo
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-xs">JD</span>
            </div>
            <span>João da Silva (você)</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Controller
              name="novoAdministrador"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Digite o nome ou e-mail"
                  className="flex-1"
                />
              )}
            />
            <Button variant="outline" size="sm">
              Adicionar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}