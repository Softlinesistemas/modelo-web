'use client'

import { Button } from '@/utils/ui/Button'
import { Checkbox } from '@/utils/ui/checkbox'
import { FormData } from '@/schemas/grupoSchema'

type Props = {
  register: any
  control: any
  errors: any
  loading: boolean
}

export default function GrupoAceiteETermos({ register, errors, loading }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Aceite e Termos</h2>

      <div>
        <label className="flex items-start gap-2">
          <Checkbox
            {...register('aceiteTermos')}
          />
          <span className="text-sm">
            Li e concordo com os Termos de Uso e Política de Privacidade. 
            Estou ciente de que sou responsável pelas informações fornecidas e pelo grupo criado.
          </span>
        </label>
        {errors.aceiteTermos && (
          <p className="text-red-600 text-xs mt-1 pl-6">{errors.aceiteTermos.message}</p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-2">
          <Checkbox
            {...register('confirmacaoDados')}
          />
          <span className="text-sm">
            Confirmo que todas as informações fornecidas são verdadeiras e atualizadas.
          </span>
        </label>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Criando grupo...' : 'Criar Grupo'}
        </Button>
      </div>
    </div>
  )
}