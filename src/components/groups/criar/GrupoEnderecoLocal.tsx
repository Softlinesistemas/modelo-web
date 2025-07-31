'use client'

import { Controller } from 'react-hook-form'
import { Input } from '@/utils/ui/Input'
import { Label } from '@/utils/ui/Label'
import { FormData } from '@/schemas/grupoSchema'

type Props = {
  register: any
  control: any
  errors: any
}

export default function GrupoEnderecoLocal({ register, control, errors }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Endereço e Local</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>CEP</Label>
          <Input
            {...register('cep')}
            error={errors.cep?.message}
            placeholder="00000-000"
          />
        </div>
        <div>
          <Label>Cidade</Label>
          <Controller
            name="cidade"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                error={errors.cidade?.message}
                placeholder="Cidade"
              />
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Estado</Label>
          <Controller
            name="estado"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                error={errors.estado?.message}
                placeholder="Estado"
              />
            )}
          />
        </div>
        <div>
          <Label>Bairro</Label>
          <Input
            {...register('bairro')}
            error={errors.bairro?.message}
            placeholder="Bairro"
          />
        </div>
        <div>
          <Label>Rua</Label>
          <Input
            {...register('rua')}
            error={errors.rua?.message}
            placeholder="Rua"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Número</Label>
          <Input
            {...register('numero')}
            error={errors.numero?.message}
            placeholder="Número"
          />
        </div>
        <div>
          <Label>Complemento</Label>
          <Input
            {...register('complemento')}
            error={errors.complemento?.message}
            placeholder="Complemento"
          />
        </div>
      </div>

      <div>
        <Label>Ponto de Referência</Label>
        <Input
          {...register('pontoReferencia')}
          error={errors.pontoReferencia?.message}
          placeholder="Ex: Próximo ao mercado X"
        />
      </div>
    </div>
  )
}