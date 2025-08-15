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

const tabs = ["Meus GRUPOS", "Sugestões"];

const mockSugestoes = [
  {
    id: "g3",
    nome: "Grupo de Fotografia",
    descricao: "Amantes da Imagem",
    atuacao: "Arte e Cultura",
    foto: "/img/grupo-foto.jpg",
  },
  {
    id: "g4",
    nome: "Gastronomia Vegana",
    descricao: "Receitas Sustentáveis",
    atuacao: "Culinária",
    foto: "/img/grupo-veg.jpg",
  },
];

const dados = [
  {
    id: "1",
    nome: "TRATOR-BA_T-4_SISAL_CAR-0113",
    descricao: "Veículo Coletivo - CONVÊNIO",
    atuacao: "Veiculos",
    foto: "./images/trator.jpg",
  },
  {
    id: "2",
    nome: "Drone e Georreferência",
    descricao: "Tecnologia no Campo",
    atuacao: "Inovação Agrícola",
    foto: "./grupo-drone.jpg",
  },
  {
    id: "3",
    nome: "Sitio Canaã - Alimentos Orgânicos",
    descricao: "Alimentos e Bebidas",
    atuacao: "Alimentos",
    foto: "./avatar3.jpeg",
  },
];

export default function Grupos() {
  const { gruposTab, setTab } = useTabStore();
  const router = useRouter();
  const [busca, setBusca] = useState("");
  const [gruposFiltrados, setGruposFiltrados] = useState(dados);
  const [sugestoesFiltradas, setSugestoesFiltradas] = useState(mockSugestoes);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [grupoSelecionado, setGrupoSelecionado] = useState<{
    name: string;
    avatarUrl: string;
  } | null>(null);

  const [isSugestaoModalOpen, setIsSugestaoModalOpen] = useState(false);
  const [sugestaoSelecionada, setSugestaoSelecionada] = useState<
    (typeof mockSugestoes)[0] | null
  >(null);

  useEffect(() => {
    if (gruposTab === 0) {
      setGruposFiltrados(
        dados.filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()))
      );
    } else if (gruposTab === 1) {
      setSugestoesFiltradas(
        mockSugestoes.filter((p) =>
          p.nome.toLowerCase().includes(busca.toLowerCase())
        )
      );
    }
  }, [busca, gruposTab]);

  const entrarNoGrupo = (id: string) => {
    router.push(`/feed/grupo/${id}`);
  };

  const abrirModalGrupo = (nome: string, foto: string) => {
    setGrupoSelecionado({ name: nome, avatarUrl: foto });
    setIsModalOpen(true);
  };

  const abrirModalSugestao = (grupo: (typeof mockSugestoes)[0]) => {
    setSugestaoSelecionada(grupo);
    setIsSugestaoModalOpen(true);
  };

  const criarGrupo = () => {
    router.push("/grupos/criar");
  };

  const irParaBuscador = () => {
    router.push("/buscador?selecao=grupos");
  };

  return (
    <div className="w-full mb-8 --var:bgTotal">
      <MainBanner />

      <div className="flex items-center justify-between mt-2 mb-4">
        <div className="flex-1">
          <TabSelector
            tabs={tabs}
            activeIndex={gruposTab}
            onChange={(i) => setTab("gruposTab", i)}
          />
        </div>
        <Button
          onClick={criarGrupo}
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          variant="buscarFiltros"
        >
          Criar GRUPO
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <Label variant="secondary">Buscar GRUPO por Nome ou Usuário</Label>
      </div>
      <div className="flex items-center gap-2 border-2 border-green-700 bg-gray-100 rounded-md px-3 py-2 mx-4 my-2 pb-2">
      <FiSearch className="text-gray-400" />
      <input
        type="text"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Escreva aqui..."
        className="bg-transparent outline-none text-sm w-full"
      />
    </div>

      <div className="flex justify-center items-center pb-7 p-4">
        <Button
          onClick={irParaBuscador}
          variant="buscarFiltros"
          className="ml-4 flex items-center gap-2 border bg-red-600 text-white border-red-200 rounded px-4 py-2 hover:bg-gray-100 transition"
        >
          Procurar por Filtros
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
        key={gruposTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {gruposTab === 0 && (
          <div className="space-y-2">
            {gruposFiltrados.length > 0 ? (
              gruposFiltrados.map((p) => (
                <PessoaCard
                  key={p.id}
                  pessoa={p}
                  onClick={() => entrarNoGrupo(p.id)}
                  onMensagem={(e) => {
                    e.stopPropagation();
                    entrarNoGrupo(p.id);
                  }}
                  onFotoClick={(e) => {
                    e.stopPropagation();
                    abrirModalGrupo(p.nome, p.foto);
                  }}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">
                Nenhum grupo encontrado.
              </p>
            )}
          </div>
        )}

        {gruposTab === 1 && (
          <div className="space-y-2">
            {sugestoesFiltradas.length > 0 ? (
              sugestoesFiltradas.map((p) => (
                <PessoaCard
                  key={p.id}
                  pessoa={p}
                  onClick={() => entrarNoGrupo(p.id)}
                  onMensagem={(e) => {
                    e.stopPropagation();
                    entrarNoGrupo(p.id);
                  }}
                  onFotoClick={(e) => {
                    e.stopPropagation();
                    abrirModalSugestao(p);
                  }}
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

      {grupoSelecionado && (
        <AvatarMenu
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          name={grupoSelecionado.name}
          avatarUrl={grupoSelecionado.avatarUrl}
        />
      )}

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
              Entrar no grupo
            </button>

            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition w-full"
              onClick={() => router.push(`/grupo?id=${sugestaoSelecionada.id}`)}
            >
              Ver detalhes
            </button>
          </div>
        </AppModal>
      )}
    </div>
  );
}
