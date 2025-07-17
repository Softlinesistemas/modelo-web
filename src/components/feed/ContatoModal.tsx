"use client"

import { AppModal } from "@/utils/ui/AppModal"

type ContatoModalProps = {
  aberto: boolean
  aoFechar: () => void
}

export const ContatoModal: React.FC<ContatoModalProps> = ({ aberto, aoFechar }) => {
  return (
    <AppModal isOpen={aberto} onClose={aoFechar} title="Contatos de Apoio de Comunicação">
      <div className="space-y-4">
        {/* Aqui você pode substituir por dados vindos do backend futuramente */}
        <div className="border p-4 rounded bg-gray-50">
          <p className="text-sm font-semibold text-gray-700">📞 WhatsApp:</p>
          <p className="text-base text-gray-900">+55 11 91234-5678</p>
        </div>

        <div className="border p-4 rounded bg-gray-50">
          <p className="text-sm font-semibold text-gray-700">📧 E-mail:</p>
          <p className="text-base text-gray-900">apoio@ggapp.com.br</p>
        </div>

        <div className="border p-4 rounded bg-gray-50">
          <p className="text-sm font-semibold text-gray-700">💬 Telegram:</p>
          <p className="text-base text-gray-900">@gg_apoio</p>
        </div>
      </div>
    </AppModal>
  )
}
