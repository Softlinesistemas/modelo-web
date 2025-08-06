"use client";

import { MensagemDireta } from "@/components/buscador/MensagemDireta";
import React, { useState } from "react";
import { FaSearch, FaRegEnvelope } from "react-icons/fa";
import { Button } from "@/utils/ui/Button";
import { Input } from "@/utils/ui/Input";
import { Label } from "@/utils/ui/Label";
import { MainBanner } from "@/components/MainBanner";
import { FiltroExpandido } from "@/components/buscador/FiltroExpandido";
import { IdDemografica } from "@/components/buscador/IdDemografica";
import { GeoReferenceSection } from "@/components/buscador/GeoReferenceSection";
import { ProductsServicesSection } from "@/components/buscador/ProductsServicesSection";
import { SocialLinksSection } from "@/components/buscador/SocialLinksSection";
import { BuscadorResultado } from "@/components/buscador/BuscadorResultado";
import { fetchMockResults } from "@/components/buscador/api";
import { FiSearch } from "react-icons/fi";
import { MinhasMensagens } from "@/components/mensageiro/MinhasMensagens";

export default function MensageiroPage() {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [faixaEtariaMin, setFaixaEtariaMin] = useState("");
  const [faixaEtariaMax, setFaixaEtariaMax] = useState("");
  const [distancia, setDistancia] = useState<string>("");
  const [tipoPessoa, setTipoPessoa] = useState<string[]>([]);
  const [entrega, setEntrega] = useState("");
  const [modalidade, setModalidade] = useState("");
  const [nivelEscolaridade, setNivelEscolaridade] = useState("");
  const [pcd, setPcd] = useState(false);
  const [voluntariado, setVoluntariado] = useState(false);
  const [economiaSolidaria, setEconomiaSolidaria] = useState(false);
  const [culturaPopular, setCulturaPopular] = useState(false);
  const [acaoAmbiental, setAcaoAmbiental] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleSearch = async () => {
    const filters = {
      tipo: selectedFilter,
      faixaEtariaMin,
      faixaEtariaMax,
      distancia,
      tipoPessoa,
      entrega,
      modalidade,
      nivelEscolaridade,
      pcd,
      voluntariado,
      economiaSolidaria,
      culturaPopular,
      acaoAmbiental,
    };
    const res = await fetchMockResults(filters);
    setResults(res);
  };

  const toggleTipoPessoa = (tipo: string) => {
    if (tipoPessoa.includes(tipo)) {
      setTipoPessoa(tipoPessoa.filter((item) => item !== tipo));
    } else if (tipoPessoa.length < 2) {
      setTipoPessoa([...tipoPessoa, tipo]);
    }
  };

  const handleDistancia = (dist: string) => {
    setDistancia(dist === distancia ? "" : dist);
  };

  const handleFilterClick = (filter: string) => {
    setSelectedFilter((prev) => (prev === filter ? "" : filter));
  };

  const [abaAtiva, setAbaAtiva] = useState<"buscador" | "minhas-mensagens">(
    "buscador"
  );

  const quantidadeMensagens = 9;
  const texto = quantidadeMensagens.toString().padStart(2, '0');

  return (
    <div className="w-full">
      <MainBanner />
      <div className="p-2 w-full">
        <div className="flex items-center justify-between mb-6 px-4">
          {/* Espaço vazio à esquerda para centralizar o título */}
          <div className="w-6"></div>

          {/* Título centralizado */}
          <h1 className="text-2xl font-bold text-center flex-1 mt-4">
            <span className="text-gray-800">MENSAGEIRO</span>{" "}
            <span className="text-green-700">GooAgro</span>
          </h1>

          <div
            onClick={() => setAbaAtiva("minhas-mensagens")}
            className="relative cursor-pointer p-2 mt-2 bg-green-100 hover:bg-green-200 shadow-md flex flex-col items-center justify-center w-20 h-20 rounded"
          >
            {/* Ícone */}
            <FaRegEnvelope className="text-green-700 w-6 h-6 mb-1" />

            {/* Badge com quantidade dinâmica */}
            {quantidadeMensagens > 0 && (
              <span className="absolute top-1 right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
               {quantidadeMensagens.toString().padStart(2, '0')}
              </span>
            )}

            {/* Texto abaixo do ícone */}
            <div className="text-center text-[10px] leading-tight">
              <p>Mensagens</p>
              <p>Recebidas</p>
            </div>
          </div>
        </div>
        {abaAtiva === "buscador" ? (
          <>
            {/* Grid de filtros principais - responsivo */}
            <div className="grid grid-cols-2 gap-3 text-center md:gap-4 mb-6 ">
              {/* Bloco Amigos */}
              <div
                onClick={() => handleFilterClick("amigos")}
                className={`p-4 md:p-6 rounded-lg cursor-pointer transition-all border-2 border-black ${
                  selectedFilter === "amigos"
                    ? "bg-white border-green-700 shadow-md text-green-700"
                    : "bg-amber-300 hover:bg-amber-200"
                }`}
              >
                <h3 className="font-semibold text-base md:text-lg">AMIGOS</h3>
              </div>

              {/* Bloco Grupos */}
              <div
                onClick={() => handleFilterClick("grupos")}
                className={`p-4 md:p-6 rounded-lg cursor-pointer transition-all border-2 border-black ${
                  selectedFilter === "grupos"
                    ? "bg-white border-green-700 shadow-md text-green-700"
                    : "bg-green-500 hover:bg-green-400"
                }`}
              >
                <h3 className="font-semibold text-base md:text-lg">GRUPOS</h3>
              </div>

              {/* Bloco Fornecedor */}
              <div
                onClick={() => handleFilterClick("fornecedor")}
                className={`p-4 md:p-6 rounded-lg cursor-pointer transition-all border-2 border-black ${
                  selectedFilter === "fornecedor"
                    ? "bg-white border-green-700 shadow-md text-green-700"
                    : "bg-lime-400 hover:bg-lime-300"
                }`}
              >
                <h3 className="font-semibold text-base md:text-lg">
                  FORNECEDORES
                </h3>
                <p className="text-xs font-medium md:text-sm mt-1">
                  Produtos & Serviços
                </p>
              </div>

              {/* Bloco Clientes */}
              <div
                onClick={() => handleFilterClick("clientes")}
                className={`p-4 md:p-6 rounded-lg cursor-pointer transition-all border-2 border-black ${
                  selectedFilter === "clientes"
                    ? "bg-white border-green-700 shadow-md text-green-700"
                    : "bg-amber-700 hover:bg-amber-600 text-white"
                }`}
              >
                <h3 className="font-semibold text-black text-base md:text-lg">
                  EMPRESAS
                </h3>
                <p className="text-xs font-medium text-black md:text-sm mt-1">
                  Produtos & Serviços
                </p>
              </div>
            </div>

            {/* Campo de busca */}
            <div className="text-center mb-1">
              <Label className="font-semibold text-gray-800">
                Pesquise pelo Nome ou Usuário{" "}
                <span className="text-green-600 font-bold">GooAgro</span>
              </Label>
            </div>
            <div className="w-full mt-2 m-1 mb-2 ml-1 rounded-xl  ">
              {/* Campo de busca */}
              <div className="flex items-center bg-white rounded-lg shadow-sm px-4 py-3 border-2 border-green-700">
                <FiSearch className="text-balck shadow-md mr-2" />
                <input
                  type="text"
                  placeholder="Buscar Amigos, Grupos, Fornecedores ou Empresas."
                  className="w-full text-sm font-medium  bg-white  placeholder-gray-500 outline-none"
                />
              </div>
            </div>

            {/* Filtros básicos */}
            <div className="mb-6 mt-8">
              <Label className="block text-center font-medium mb-3">
                Quer usar Filtros Básicos?
              </Label>
              <div className="space-y-3">
                <select className="w-full p-2 border-2 border-green-700 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500">
                  <option>Interesse</option>
                </select>
                <select className="w-full p-2 border-2 border-green-700 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500">
                  <option>Categoria</option>
                </select>
                <select className="w-full p-2 border-2 border-green-700 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500">
                  <option>Modalidade</option>
                </select>
              </div>
            </div>

            {/* Localizador regional */}
            <div className="mb-6">
              <div className="text-center mb-3">
                <Label className="font-bold bg-yellow-100 px-4 py-2 rounded-md inline-block">
                  ATIVAR GPS-LOCALIZADOR REGIONAL / km
                </Label>
              </div>
              <div className="flex justify-center">
                <div className="flex flex-wrap gap-2">
                  {[10, 30, 50, 100, 999].map((dist) => (
                    <Button
                      key={dist}
                      variant={
                        distancia === dist.toString() ? "primary" : "outline"
                      }
                      size="sm"
                      onClick={() => handleDistancia(dist.toString())}
                      className="px-3 py-1 text-md"
                    >
                      {dist}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Botão Opções de Filtro */}
            <div className="flex justify-center mb-6">
              <Button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center justify-between bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors"
              >
                <span className="text-lg mr-2">+ Opções de Filtros</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    showAdvancedFilters ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>
            </div>

            {/* Filtros avançados */}
            <FiltroExpandido isOpen={showAdvancedFilters}>
              <div className="max-w-2xl mx-auto p-4 space-y-6">
                {/* Sessões adicionais */}
                <IdDemografica />
                <GeoReferenceSection />
                {/* <ScheduleSection /> */}
                <ProductsServicesSection />
                <SocialLinksSection />
              </div>
            </FiltroExpandido>
            <div className="max-w-2xl mx-auto p-4 ">
              <MensagemDireta />
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setAbaAtiva("buscador")}
              className="text-sm text-green-700 font-semibold hover:underline mb-4 flex items-center gap-1"
            >
              ← Voltar para o MENSAGEIRO
            </button>
            <MinhasMensagens />
          </div>
        )}
      </div>
    </div>
  );
}
