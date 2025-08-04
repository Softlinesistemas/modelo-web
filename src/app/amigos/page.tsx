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

const tabs = ["Meus AMIGOS", "Sugestões"];

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
    nome: "Juliana Mendes",
    descricao: "Cozinheira Vegana",
    atuacao: "Receitas e Culinária",
    foto: "/img/juliana.jpg",
  },
  {
    id: "u5",
    nome: "Ricardo Lima",
    descricao: "Empreendedor Rural",
    atuacao: "Comércio Local",
    foto: "/img/ricardo.jpg",
  },
  {
    id: "u6",
    nome: "Fernanda Silva",
    descricao: "Educadora Ambiental",
    atuacao: "Sustentabilidade",
    foto: "/img/fernanda.jpg",
  },
];

const dados = [
  {
    id: "1",
    nome: "Cicrano Santos Santos",
    descricao: "31. Servidor Público",
    atuacao: "CADASTRADOR - CAF",
    foto: "/img/cicrano.jpg",
  },
  {
    id: "2",
    nome: "Professor Agrônomo Beltrano Oli",
    descricao: "12. PROFESSOR ENG. AGRÔNOMO",
    atuacao: "17. GEO-REFERENCIAL COM DRONE",
    foto: "/img/professor.jpg",
  },
  {
    id: "3",
    nome: "Maria dos Santos",
    descricao: "Engenheira Ambiental",
    atuacao: "Sustentabilidade Rural",
    foto: "/img/maria.jpg",
  },
  {
    id: "4",
    nome: "José Oliveira",
    descricao: "Técnico em Agropecuária",
    atuacao: "Consultoria Técnica",
    foto: "/img/jose.jpg",
  },
];

export default function Amigos() {
  const { amigosTab, setTab } = useTabStore();
  const router = useRouter();

  const [busca, setBusca] = useState("");
  const [amigosFiltrados, setAmigosFiltrados] = useState(dados);
  const [sugestoesFiltradas, setSugestoesFiltradas] = useState(mockSugestoes);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPessoa, setSelectedPessoa] = useState<{
    name: string;
    avatarUrl: string;
  } | null>(null);

  const [isSugestaoModalOpen, setIsSugestaoModalOpen] = useState(false);
  const [sugestaoSelecionada, setSugestaoSelecionada] = useState<
    (typeof mockSugestoes)[0] | null
  >(null);

  useEffect(() => {
    if (amigosTab === 0) {
      setAmigosFiltrados(
        dados.filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()))
      );
    }

    if (amigosTab === 1) {
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
    router.push("/buscador?selecao=amigos");
  };

  const abrirModalAmigo = (nome: string, foto: string) => {
    setSelectedPessoa({ name: nome, avatarUrl: foto });
    setIsModalOpen(true);
  };

  const abrirModalSugestao = (pessoa: (typeof mockSugestoes)[0]) => {
    setSugestaoSelecionada(pessoa);
    setIsSugestaoModalOpen(true);
  };

  return (
    <div className="w-full p-1">
      {/* <h1 className="text-2xl font-bold mb-4 text-center">Área de Amigos</h1> */}
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

      <div className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-2 mx-4 my-2">
      <FiSearch className="text-gray-400" />
      <input
        type="text"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Procurar por AMIGOS"
        className="bg-transparent outline-none text-sm w-full"
      />
    </div>
      <div className="flex justify-center items-center pb-3">
        <Button
          onClick={irParaBuscador}
          variant="buscarFiltros"
          className="ml-4 flex items-center gap-2 border bg-blue-600 text-black border-blue-200 rounded px-4 py-2 hover:bg-gray-100 transition"
        >
          Procurar por Filtros
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>
        </Button>
      </div>

      <motion.div
        key={amigosTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {amigosTab === 0 && (
          <div className="space-y-4">
            {amigosFiltrados.length > 0 ? (
              amigosFiltrados.map((p) => (
                <PessoaCard
                  key={p.id}
                  pessoa={p}
                  onMensagem={() => entrarNoChat(p.id)}
                  onFotoClick={() => abrirModalAmigo(p.nome, p.foto)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">
                Nenhum amigo encontrado.
              </p>
            )}
          </div>
        )}

        {amigosTab === 1 && (
          <div className="space-y-4">
            {sugestoesFiltradas.length > 0 ? (
              sugestoesFiltradas.map((p) => (
                <PessoaCard
                  key={p.id}
                  pessoa={p}
                  onMensagem={() => entrarNoChat(p.id)}
                  onFotoClick={() => abrirModalSugestao(p)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">
                Nenhuma sugestão encontrada.
              </p>
            )}
          </div>
        )}
      </motion.div>

      {/* Modal de amigo */}
      {selectedPessoa && (
        <AvatarMenu
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          name={selectedPessoa.name}
          avatarUrl={selectedPessoa.avatarUrl}
        />
      )}

      {/* Modal de sugestão */}
      {sugestaoSelecionada && (
        <AppModal
          isOpen={isSugestaoModalOpen}
          onClose={() => setIsSugestaoModalOpen(false)}
          title={`Sobre ${sugestaoSelecionada.nome}`}
        >
          <div className="flex gap-4 items-center">
            <img
              src={sugestaoSelecionada.foto}
              alt={sugestaoSelecionada.nome}
              className="w-24 h-24 rounded-full object-cover border"
            />
            <div>
              <p className="text-lg font-semibold">
                {sugestaoSelecionada.nome}
              </p>
              <p className="text-sm text-gray-600">
                {sugestaoSelecionada.descricao}
              </p>
              <p className="text-sm text-gray-700 font-semibold">
                {sugestaoSelecionada.atuacao}
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
              onClick={() => {
                alert("Solicitação enviada!");
                setIsSugestaoModalOpen(false);
              }}
            >
              Adicionar amigo
            </button>

            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition w-full"
              onClick={() =>
                router.push(`/perfil?id=${sugestaoSelecionada.id}`)
              }
            >
              Ver perfil
            </button>
          </div>
        </AppModal>
      )}
    </div>
  );
}
