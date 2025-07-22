"use client";
import { useState } from "react";
import { FiCopy, FiGlobe } from "react-icons/fi";
import { Button } from "@/utils/ui/Button";
import { Textarea } from "@/utils/ui/Textarea";
import { UploadArquivo } from "../UploadArquivo";

export const MensagemDireta = () => {
  const [mensagem, setMensagem] = useState("");

  const enviarMensagem = () => {
    if (!mensagem.trim()) {
      alert("Digite uma mensagem.");
      return;
    }

    // Aqui você pode integrar com API ou WebSocket futuramente
    console.log("Mensagem enviada:", mensagem);
    alert("Mensagem enviada com sucesso!");
    setMensagem("");
  };

  const copiarMensagem = () => {
    if (!mensagem) return;
    navigator.clipboard.writeText(mensagem);
    alert("Texto copiado para a área de transferência!");
  };

  const traduzirMensagem = () => {
    if (!mensagem) return;
    // Aqui pode integrar com API de tradução ou abrir modal futuramente
    alert("Função de tradução em desenvolvimento...");
  };

  return (
    <div className="space-y-4 relative">
      <label className="block text-sm font-medium text-gray-700">
        TEXTO DA MENSAGEM
      </label>

      {/* Container com ícones sobrepostos */}
      <div className="relative">
        <Textarea
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          rows={8}
          placeholder={`1. Escreva um texto ou Copie e Cole aqui.\n2. Até 3.000 caracteres.\n3. Pode colocar Links de PDF, do Youtube, do\nseu site, da sua Tela-Pública GooAgro e\nGooGroups etc.`}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 pr-12"
        />

        {/* Ícones sobrepostos no canto superior direito */}
        <div className="absolute top-3 right-3 flex gap-2 text-green-500">
          <button
            onClick={copiarMensagem}
            title="Copiar"
            className="hover:text-[#D2691E] transition"
          >
            <FiCopy size={18} />
          </button>
          </div>
           <div className="absolute top-10 right-3 flex gap-2 text-green-500">
          <button
            onClick={traduzirMensagem}
            title="Traduzir"
            className="hover:text-[#D2691E] transition"
          >
            <FiGlobe size={18} />
          </button>
        </div>
      </div>

      <UploadArquivo />

      <div className="flex justify-center">
        <Button
          onClick={enviarMensagem}
          className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-lg"
        >
          Enviar Mensagem
        </Button>
      </div>
    </div>
  );
};
