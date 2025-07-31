import FormCriarGrupo from '@/components/groups/criar/FormCriarGrupo'
import { MainBanner } from '@/components/MainBanner'
import { UserSelect } from '@/components/UserSelect'
import { Card } from '@/utils/ui/Card'

export default function CriarGrupoPage() {
  return (
    <div className="w-full p-6 gap-2">
    <MainBanner />
    <UserSelect />
    <Card>
     <h1 className="text-2xl font-bold mb-2 mt-2 text-center">CRIAR GRUPO-GG</h1>
    </Card>
      <FormCriarGrupo />
    </div>
  )
}
