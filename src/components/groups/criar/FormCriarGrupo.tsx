'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { schema, FormData } from '@/schemas/grupoSchema'
import GrupoAceiteETermos from './GrupoAceiteETermos'
import GrupoOrganizacaoAgenda from './GrupoOrganizacaoAgenda'
import GrupoInfoBasica from './GrupoInfoBasica'
import GrupoEnderecoLocal from './GrupoEnderecoLocal'
import GrupoAdministradoresImagem from './GrupoAdministradoresImagem'
import GrupoValores from './GrupoValores'
import GrupoPreferenciasVinculos from './GrupoPreferenciasVinculos'

// Subcomponentes (imports mantidos)

export default function FormCriarGrupo() {
 const {
  register,
  handleSubmit,
  control,
  setValue,
  watch,
  formState: { errors }
} = useForm({
  resolver: zodResolver(schema),
  defaultValues: {
    visibilidade: 'publico',
    tipoGrupo: [],
    aceiteTermos: false,
  }
})

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = (data: FormData) => {
    console.log(data)
    setLoading(true)

    const novoGrupo = {
      id: String(Date.now()),
      // nome: data.nome,
      // descricao: data.descricao,
      // categoria: data.categoria,
      atuacao: data.tipoGrupo.join(', '),
      foto: '/img/TechFarm.jpg',
      ...data
    }

    const gruposExistentes = JSON.parse(localStorage.getItem('meusGrupos') || '[]')
    gruposExistentes.push(novoGrupo)
    localStorage.setItem('meusGrupos', JSON.stringify(gruposExistentes))

    setTimeout(() => {
      router.push('/grupos')
    }, 1000)
  }

  return (
  <form onSubmit={handleSubmit(onSubmit)} className="w-full gap-2">
      <GrupoInfoBasica 
        register={register} 
        control={control} 
        errors={errors} 
        watch={watch} 
        setValue={setValue} 
      />
      
      <GrupoOrganizacaoAgenda 
        register={register} 
        control={control} 
        errors={errors} 
        setValue={setValue} 
        watch={watch} 
      />
      
      <GrupoEnderecoLocal 
        register={register} 
        control={control} 
        errors={errors} 
      />
      
      <GrupoAdministradoresImagem 
        register={register} 
        control={control} 
        errors={errors} 
      />
      
      <GrupoValores 
        register={register} 
        control={control} 
        errors={errors} 
      />
      
      <GrupoPreferenciasVinculos 
        register={register} 
        control={control} 
        errors={errors} 
        watch={watch} 
        setValue={setValue} 
      />
      
      <GrupoAceiteETermos 
        register={register} 
        control={control} 
        errors={errors} 
        loading={loading} 
      />
    </form>
  )
}