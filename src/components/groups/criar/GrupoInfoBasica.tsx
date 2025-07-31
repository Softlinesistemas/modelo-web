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
  watch: any
  setValue: any
}

export default function GrupoInfoBasica({ register, control, errors, watch, setValue }: Props) {
  const tiposGrupo = [
    'Social', 'Solidário', 'Ambiental', 'Cultural', 'Religioso', 
    'Esportivo', 'Educacional', 'Saúde', 'Profissional', 'Outro'
  ]

  const selecionados = new Set(watch('tipoGrupo') || [])

  const alternarTipo = (tipo: string, marcado: boolean) => {
    if (marcado) {
      selecionados.add(tipo)
    } else {
      selecionados.delete(tipo)
    }
    setValue('tipoGrupo', Array.from(selecionados))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Informações Básicas</h2>

      {/* Nome do Grupo */}
      <div>
        <Label>Nome do Grupo</Label>
        <Input
          {...register('nome')}
          error={errors.nome?.message}
          placeholder="Digite o nome do grupo"
        />
      </div>

      {/* Descrição */}
      <div>
        <Label>Descrição</Label>
        <Input
          {...register('descricao')}
          error={errors.descricao?.message}
          placeholder="Descreva o propósito do grupo"
        />
      </div>

      {/* Categoria */}
      <div>
        <Label>Categoria</Label>
        <Controller
          name="categoria"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {['Cultural', 'Esportivo', 'Educacional', 'Social', 'Religioso', 'Profissional'].map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Visibilidade */}
      <div>
        <Label>Visibilidade</Label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              {...register('visibilidade')}
              value="publico"
              className="form-radio"
            />
            <span>Público (Qualquer pessoa pode ver o grupo e suas atividades)</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              {...register('visibilidade')}
              value="privado"
              className="form-radio"
            />
            <span>Privado (Somente membros podem ver o grupo e suas atividades)</span>
          </label>
        </div>
      </div>

      {/* Tipo de Grupo */}
      <div>
        <Label>Tipo de Grupo</Label>
        <div className="grid grid-cols-2 gap-2">
          {tiposGrupo.map((tipo) => {
            const checked = selecionados.has(tipo)
            return (
              <label key={tipo} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => alternarTipo(tipo, e.target.checked)}
                  className="form-checkbox"
                />
                <span>{tipo}</span>
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )
}