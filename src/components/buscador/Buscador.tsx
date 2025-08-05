"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BuscadorResultado } from "./BuscadorResultado";
import { fetchMockResults } from "./api";
import { MainBanner } from "../MainBanner";
import { FiltroExpandido } from "./FiltroExpandido";
import { Button } from "@/utils/ui/Button";
import { Input } from "@/utils/ui/Input";
import { Label } from "@/utils/ui/Label";
// import VinculosSociais from '../VinculosSociais';
import { GeoReferenceSection } from "./GeoReferenceSection";
import { ProductsServicesSection } from "./ProductsServicesSection";
import { SocialLinksSection } from "./SocialLinksSection";
import { ScheduleSection } from "./ScheduleSection";
import { IdDemografica } from "./IdDemografica";
import { FiSearch } from "react-icons/fi";

export const Buscador: React.FC = () => {
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

  return (
    <div className="w-full">
      <MainBanner />
      <div className="p-2 w-full">
        <h1 className="text-2xl font-bold text-center mb-6 mt-4">
          <span className="text-gray-800">BUSCADOR</span>{" "}
          <span className="text-green-700">GooAgro</span>
        </h1>

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
        <div className="text-center mb-2">
          <Label className="font-semibold text-gray-800">
            Pesquise pelo Nome ou Usuário{" "}
            <span className="text-green-600 font-bold">GooAgro</span>
          </Label>
        </div>
        <div className="w-full m-1 mb-2 ml-1 rounded-xl  ">
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
              <option>Tipo de Interesse</option>
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
          <div className="w-full p-2">
            {/* Sessões adicionais */}
            <IdDemografica />
            <GeoReferenceSection />
            <ScheduleSection />
            <ProductsServicesSection />
            <SocialLinksSection />
          </div>
        </FiltroExpandido>

        {/* Botão de busca */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleSearch}
            className="bg-green-800 hover:bg-green-900 text-white font-bold py-3 px-8 rounded-lg shadow text-xl transition-colors w-full max-w-xs"
          >
            BUSCAR
          </Button>
        </div>

        {/* Resultados */}
        <div className="mt-8">
          <BuscadorResultado results={results} filterType={selectedFilter} />
        </div>
      </div>
    </div>
  );
};
