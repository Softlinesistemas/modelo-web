"use client";

import { useState } from "react";
import { format } from "date-fns";
import { AppModal } from "@/components/modals/CreateGroupModal";
import { Button } from "@/utils/ui/Button";

interface Mensagem {
  id: string;
  remetente: string;
  titulo: string;
  conteudo: string;
  horario: string;
}

const mensagensMock: Mensagem[] = [
  {
    id: "msg1",
    remetente: "João da Feira",
    titulo: "Interesse na sua publicação",
    conteudo: "Olá! Vi sua publicação e gostaria de conversar melhor sobre sua produção.",
    horario: "2025-08-05 14:22",
  },
  {
    id: "msg2",
    remetente: "Maria Orgânica",
    titulo: "Pedido de informações",
    conteudo: "Você poderia me enviar mais detalhes sobre os produtos disponíveis?",
    horario: "2025-08-05 13:15",
  },
];

export const MinhasMensagens = () => {
  const [mensagemSelecionada, setMensagemSelecionada] = useState<Mensagem | null>(null);

  const abrirModal = (mensagem: Mensagem) => setMensagemSelecionada(mensagem);
  const fecharModal = () => setMensagemSelecionada(null);

  return (
    <div className="bg-gray-50 border shadow-md p-4 mb-8">
      <h2 className="text-xl font-bold text-green-700 mb-4">📬 Mensagens Recebidas</h2>

      {mensagensMock.length === 0 ? (
        <p className="text-gray-500 italic">Nenhuma mensagem recebida ainda.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {mensagensMock.map((msg) => (
            <li
              key={msg.id}
              className="py-3 px-2 hover:bg-green-50 cursor-pointer rounded transition"
              onClick={() => abrirModal(msg)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">{msg.titulo}</h3>
                  <p className="text-sm text-gray-600">
                    De: <span className="font-medium">{msg.remetente}</span>
                  </p>
                </div>
                <span className="text-xs text-gray-500">{format(new Date(msg.horario), "HH:mm")}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal da mensagem */}
      {mensagemSelecionada && (
        <AppModal isOpen={true} onClose={fecharModal} title={mensagemSelecionada.titulo}>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              <strong>Remetente:</strong> {mensagemSelecionada.remetente}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Horário:</strong>{" "}
              {format(new Date(mensagemSelecionada.horario), "dd/MM/yyyy HH:mm")}
            </p>
            <p className="text-gray-800 whitespace-pre-wrap">{mensagemSelecionada.conteudo}</p>
            <div className="text-right">
              <Button variant="outline" onClick={fecharModal}>
                Fechar
              </Button>
            </div>
          </div>
        </AppModal>
      )}
    </div>
  );
};
