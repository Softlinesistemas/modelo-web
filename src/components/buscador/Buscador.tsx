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

export const Buscador: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("amigos");
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

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="mb-4">
        <MainBanner />
      </div>
      <h1 className="text-2xl font-bold text-center mb-6">
        <span className="text-gray-800">BUSCADOR</span>{" "}
        <span className="text-green-700">GooAgro</span>
      </h1>

      {/* Grid de filtros principais - responsivo */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
        {/* Bloco Amigos */}
        <div
          onClick={() => setSelectedFilter("amigos")}
          className={`p-4 md:p-6 rounded-lg cursor-pointer transition-all ${
            selectedFilter === "amigos"
              ? "bg-white border-2 border-green-700 shadow-md text-green-700"
              : "bg-amber-300 hover:bg-amber-200"
          }`}
        >
          <h3 className="font-semibold text-base md:text-lg">Amigos</h3>
        </div>

        {/* Bloco Grupos */}
        <div
          onClick={() => setSelectedFilter("grupos")}
          className={`p-4 md:p-6 rounded-lg cursor-pointer transition-all ${
            selectedFilter === "grupos"
              ? "bg-white border-2 border-green-700 shadow-md text-green-700"
              : "bg-green-500 hover:bg-green-400"
          }`}
        >
          <h3 className="font-semibold text-base md:text-lg">Grupos</h3>
        </div>

        {/* Bloco Fornecedor */}
        <div
          onClick={() => setSelectedFilter("fornecedor")}
          className={`p-4 md:p-6 rounded-lg cursor-pointer transition-all ${
            selectedFilter === "fornecedor"
              ? "bg-white border-2 border-green-700 shadow-md text-green-700"
              : "bg-lime-400 hover:bg-lime-300"
          }`}
        >
          <h3 className="font-semibold text-base md:text-lg">Fornecedores</h3>
          <p className="text-xs md:text-sm mt-1">Produtos & Serviços</p>
        </div>

        {/* Bloco Clientes */}
        <div
          onClick={() => setSelectedFilter("clientes")}
          className={`p-4 md:p-6 rounded-lg cursor-pointer transition-all ${
            selectedFilter === "clientes"
              ? "bg-white border-2 border-green-700 shadow-md text-green-700"
              : "bg-amber-700 hover:bg-amber-600 text-white"
          }`}
        >
          <h3 className="font-semibold text-base md:text-lg">Empresas</h3>
          <p className="text-xs md:text-sm mt-1">Produtos & Serviços</p>
        </div>
      </div>

      {/* Campo de busca */}
      <div className="text-center mb-4">
        <Label className="font-semibold text-gray-800">
          Pesquise pelo Nome ou Usuário{" "}
          <span className="text-green-600 font-bold">GooAgro</span>
        </Label>
      </div>
      <div className="flex items-center mb-6">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
          <Input
            type="text"
            placeholder="Digite sua busca..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filtros básicos */}
      <div className="mb-6">
        <Label className="block text-center font-medium mb-3">
          Quer usar Filtros Básicos?
        </Label>
        <div className="space-y-3">
          <select className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500">
            <option>Tipo de Interesse</option>
          </select>
          <select className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500">
            <option>Selecione uma Categoria</option>
          </select>
          <select className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500">
            <option>Selecione uma Modalidade</option>
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
                variant={distancia === dist.toString() ? "primary" : "outline"}
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
          className="flex items-center justify-between bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors"
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

  {/* Faixa Etária */}
  <div>
    <Label className="font-bold block mb-2">FAIXA ETÁRIA</Label>
    <div className="flex items-center gap-2">
      <Input
        type="number"
        placeholder="≥"
        value={faixaEtariaMin}
        onChange={(e) => setFaixaEtariaMin(e.target.value)}
        className="w-full border-gray-300 focus:ring-green-500"
      />
      <span className="text-gray-500">a</span>
      <Input
        type="number"
        placeholder="≤"
        value={faixaEtariaMax}
        onChange={(e) => setFaixaEtariaMax(e.target.value)}
        className="w-full border-gray-300 focus:ring-green-500"
      />
    </div>
  </div>

  {/* Tipo de Pessoa */}
  <div>
    <Label className="font-bold block mb-2">TIPO</Label>
    <div className="flex flex-wrap gap-2">
      {["Pessoa Física", "Pessoa Jurídica / Empresa"].map((item) => (
        <Button
          key={item}
          variant={tipoPessoa.includes(item) ? "primary" : "outline"}
          size="sm"
          onClick={() => toggleTipoPessoa(item)}
        >
          {item}
        </Button>
      ))}
    </div>
    <p className="text-xs text-gray-500 mt-2">
      Pode marcar até 2 opções.
    </p>
  </div>

  {/* Entrega ao Cliente */}
  <div>
    <Label className="font-bold block mb-2">ENTREGA AO CLIENTE</Label>
    <div className="flex flex-wrap gap-2">
      {["Em nossa sede", "No cliente / DELIVERY"].map((item) => (
        <Button
          key={item}
          variant={entrega === item ? "primary" : "outline"}
          size="sm"
          onClick={() => setEntrega(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  </div>

  {/* Modalidade */}
  <div>
    <Label className="font-bold block mb-2">MODALIDADE</Label>
    <div className="flex flex-wrap gap-2">
      {["Nacional", "Internacional"].map((item) => (
        <Button
          key={item}
          variant={modalidade === item ? "primary" : "outline"}
          size="sm"
          onClick={() => setModalidade(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  </div>

  {/* Escolaridade */}
  <div>
    <Label className="font-bold block mb-2">
      NÍVEL, SÉRIE OU GRAU DE ESCOLARIDADE
    </Label>
    <select
      className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500"
      value={nivelEscolaridade}
      onChange={(e) => setNivelEscolaridade(e.target.value)}
    >
      <option value="">Selecione</option>
      <option value="1º Ano - Ensino Médio">1º Ano - Ensino Médio</option>
      <option value="2º Ano - Ensino Médio">2º Ano - Ensino Médio</option>
      <option value="3º Ano - Ensino Médio">3º Ano - Ensino Médio</option>
      <option value="Graduação">Graduação</option>
      <option value="Pós-graduação">Pós-graduação</option>
    </select>
  </div>

  {/* Checkboxes */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      { id: "pcd", label: "CUIDADO ESPECIAL OU DOENÇA CRÔNICA / PCD", state: pcd, setState: setPcd },
      { id: "voluntariado", label: "VOLUNTARIADO", state: voluntariado, setState: setVoluntariado },
      { id: "economia-solidaria", label: "ECONOMIA SOLIDÁRIA", state: economiaSolidaria, setState: setEconomiaSolidaria },
      { id: "cultura-popular", label: "CULTURA POPULAR", state: culturaPopular, setState: setCulturaPopular },
      { id: "acao-ambiental", label: "AÇÃO AMBIENTAL / ECOLOGIA", state: acaoAmbiental, setState: setAcaoAmbiental },
      { id: "religiao", label: "RELIGIÃO", state: false, setState: () => {} },
    ].map((item) => (
      <div key={item.id} className="flex items-start">
        <input
          type="checkbox"
          id={item.id}
          className="h-5 w-5 mt-1 text-green-600 rounded focus:ring-green-500"
          checked={item.state}
          onChange={(e) => item.setState(e.target.checked)}
        />
        <label htmlFor={item.id} className="ml-2 text-gray-700">
          {item.label}
        </label>
      </div>
    ))}
  </div>

  {/* Grupo Caatingueiros */}
  <div className="flex items-start">
    <input
      type="checkbox"
      id="caatingueiros"
      className="h-5 w-5 mt-1 text-green-600 rounded focus:ring-green-500"
    />
    <label htmlFor="caatingueiros" className="ml-2 text-gray-700">
      CAATINGUEIROS
    </label>
  </div>

  {/* Sessões adicionais */}
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
  );
};
