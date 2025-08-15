"use client";

import { useTabStore } from "@/store/useTabStore";
import { TabSelector } from "@/components/TabSelector";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { PessoaCard } from "@/components/PessoaCard";
import { useEffect, useState } from "react";
import { AvatarMenu } from "@/components/AvatarMenu";
import { AppModal } from "@/utils/ui/AppModal";
import { MainBanner } from "@/components/MainBanner";
import { Button } from "@/utils/ui/Button";
import { FiSearch } from "react-icons/fi";
import { Label } from "@/utils/ui/Label";

const tabs = ["Meus AMIGOS", "Sugestões"];

// MOCK DATA - substituir por API
const mockSugestoes = [
  {
    id: "u3",
    nome: "Lucas Ribeiro",
    descricao: "Fotógrafo Profissional",
    atuacao: "Viagens e Cultura",
    foto: "/img/lucas.jpg",
  },
  {
    id: "u4",
    nome: "Mariana Costa",
    descricao: "Designer Gráfico",
    atuacao: "Arte Digital",
    foto: "/img/mariana.jpg",
  }
];

const mockAmigos = [
  {
    id: "1",
    nome: "Cacilda Santos Santos",
    descricao: "31. Servidor Público",
    atuacao: "CADASTRADOR - CAF",
    foto: "/pessoa1.jpg",
  },
  {
    id: "2",
    nome: "João Silva",
    descricao: "28. Engenheiro Agrônomo",
    atuacao: "Técnico Agrícola",
    foto: "/pessoa2.jpg",
  }
];

export default function AMIGOS() {
  const { amigosTab, setTab } = useTabStore();
  const router = useRouter();
  const [busca, setBusca] = useState("");
  const [amigosFiltrados, setAmigosFiltrados] = useState(mockAmigos);
  const [sugestoesFiltradas, setSugestoesFiltradas] = useState(mockSugestoes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPessoa, setSelectedPessoa] = useState<{
    name: string;
    avatarUrl: string;
  } | null>(null);
  const [isSugestaoModalOpen, setIsSugestaoModalOpen] = useState(false);
  const [sugestaoSelecionada, setSugestaoSelecionada] = useState<any>(null);

  // TODO: Implementar quando a API estiver pronta
  useEffect(() => {
    /* 
    // Buscar amigos reais
    async function fetchAmigos() {
      try {
        const res = await fetch('/api/amigos');
        const data = await res.json();
        setAmigosFiltrados(data.amigos);
        setSugestoesFiltradas(data.sugestoes);
      } catch (error) {
        console.error('Erro ao buscar amigos:', error);
      }
    }
    fetchAmigos();
    */
  }, []);

  useEffect(() => {
    if (amigosTab === 0) {
      setAmigosFiltrados(
        mockAmigos.filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()))
      );
    } else {
      setSugestoesFiltradas(
        mockSugestoes.filter((p) =>
          p.nome.toLowerCase().includes(busca.toLowerCase())
        )
      );
    }
  }, [busca, amigosTab]);

  const entrarNoChat = (id: string) => {
    router.push(`/chat?id=${id}`);
  };

  const irParaBuscador = () => {
    router.push("/buscador?selecao=AMIGOS");
  };

  const abrirModalAmigo = (nome: string, foto: string) => {
    setSelectedPessoa({ name: nome, avatarUrl: foto });
    setIsModalOpen(true);
  };

  const abrirModalSugestao = (pessoa: any) => {
    setSugestaoSelecionada(pessoa);
    setIsSugestaoModalOpen(true);
  };

  const navegarParaPerfil = (id: string) => {
    router.push(`/feed/pessoal/${id}`);
  };

  return (
    <div className="w-full mb-8">
      <MainBanner />
      <div className="flex items-center justify-between mt-2 mb-4">
        <div className="flex w-full gap-2 items-center">
          <TabSelector
            tabs={tabs}
            activeIndex={amigosTab}
            onChange={(i) => setTab("amigosTab", i)}
          />
        </div>
      </div>
      
      {/* Campo de busca */}
      <div className="flex items-center justify-center">
        <Label variant="secondary">Buscar Amigo por Nome ou Usuário</Label>
      </div>
      <div className="flex items-center gap-2 border-2 border-green-700 bg-gray-100 rounded-md px-3 py-2 mx-4 my-2">
        <FiSearch className="text-gray-400" />
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Escreva aqui..."
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>
      
      {/* Lista de amigos/sugestões */}
      <motion.div
        key={amigosTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {amigosTab === 0 ? (
          <div className="space-y-2">
            {amigosFiltrados.map((p) => (
              <PessoaCard
                key={p.id}
                pessoa={p}
                onMensagem={() => entrarNoChat(p.id)}
                onClick={() => navegarParaPerfil(p.id)}
                onFotoClick={() => abrirModalAmigo(p.nome, p.foto)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {sugestoesFiltradas.map((p) => (
              <PessoaCard
                key={p.id}
                pessoa={p}
                onMensagem={() => entrarNoChat(p.id)}
                onClick={() => navegarParaPerfil(p.id)}
                onFotoClick={() => abrirModalSugestao(p)}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Modais */}
      {selectedPessoa && (
        <AvatarMenu
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          name={selectedPessoa.name}
          avatarUrl={selectedPessoa.avatarUrl}
        />
      )}

      {sugestaoSelecionada && (
        <AppModal
          isOpen={isSugestaoModalOpen}
          onClose={() => setIsSugestaoModalOpen(false)}
          title={`Sobre ${sugestaoSelecionada.nome}`}
        >
          <div className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={sugestaoSelecionada.foto} 
                alt={sugestaoSelecionada.nome}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold">{sugestaoSelecionada.nome}</h3>
                <p className="text-sm text-gray-600">{sugestaoSelecionada.descricao}</p>
                <p className="text-sm text-gray-500">{sugestaoSelecionada.atuacao}</p>
              </div>
            </div>
            <Button 
              onClick={() => setIsSugestaoModalOpen(false)}
              className="w-full"
            >
              Fechar
            </Button>
          </div>
        </AppModal>
      )}
    </div>
  );
}