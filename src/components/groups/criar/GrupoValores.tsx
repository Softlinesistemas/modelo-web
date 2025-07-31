'use client'

import { Controller } from 'react-hook-form'
import { Input } from '@/utils/ui/Input'
import { Label } from '@/utils/ui/Label'
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from '@/utils/ui/Select'
import { FormData } from '@/schemas/grupoSchema'

type Props = {
  register: any
  control: any
  errors: any
}

export default function GrupoValores({ register, control, errors }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Valores</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Valor da Contribuição (R$)</Label>
          <Controller
            name="valorContribuicao"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                {...field}
                error={errors.valorContribuicao?.message}
                placeholder="0,00"
                step="0.01"
              />
            )}
          />
        </div>
        <div>
          <Label>Frequência de Pagamento</Label>
          <Controller
            name="frequenciaPagamento"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {['Único', 'Mensal', 'Trimestral', 'Semestral', 'Anual'].map((freq) => (
                    <SelectItem key={freq} value={freq.toLowerCase()}>
                      {freq}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div>
        <Label>Descrição da Contribuição</Label>
        <textarea
          {...register('descricaoContribuicao')}
          className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="Explique para que será usado o valor da contribuição"
          rows={3}
        />
      </div>
    </div>
  )
}