'use client';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { BuscadorResultado } from './BuscadorResultado';
import { fetchMockResults } from './api';
import { MainBanner } from '../MainBanner';
import { FiltroExpandido } from './FiltroExpandido';
import { Button } from '@/utils/ui/Button';
import { Input } from '@/utils/ui/Input';
import { Label } from '@/utils/ui/Label';
import VinculosSociais from '../VinculosSociais';

export const Buscador: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('amigos');
  const [results, setResults] = useState<any[]>([]);
  const [faixaEtariaMin, setFaixaEtariaMin] = useState('');
  const [faixaEtariaMax, setFaixaEtariaMax] = useState('');
  const [distancia, setDistancia] = useState<string>('');
  const [tipoPessoa, setTipoPessoa] = useState<string[]>([]);
  const [entrega, setEntrega] = useState('');
  const [modalidade, setModalidade] = useState('');
  const [nivelEscolaridade, setNivelEscolaridade] = useState('');
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
      setTipoPessoa(tipoPessoa.filter(item => item !== tipo));
    } else if (tipoPessoa.length < 2) {
      setTipoPessoa([...tipoPessoa, tipo]);
    }
  };

  const handleDistancia = (dist: string) => {
    setDistancia(dist === distancia ? '' : dist);
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">
      <div className='mb-2 p-1'>
        <MainBanner />
      </div>
      <h1 className="text-2xl font-bold text-center mb-4 text-green-700"><span className='text-black'>BUSCADOR</span> GooAgro</h1>

      <div className="grid grid-cols-2 gap-4 mb-6 text-center ">
        {/* Bloco Amigos */}
        <div
          onClick={() => setSelectedFilter('amigos')}
          className={`p-8 rounded-lg cursor-pointer ${selectedFilter === 'amigos'
            ? 'bg-white border border-green-800 shadow-md text-green-800'
            : 'bg-[#BEB77F]'
            }`}
        >
          <h3 className="font-semibold text-lg">Amigos</h3>
        </div>

        {/* Bloco Grupos */}
        <div
          onClick={() => setSelectedFilter('grupos')}
          className={`p-8 rounded-lg cursor-pointer ${selectedFilter === 'grupos'
            ? 'bg-white border border-green-800 shadow-md text-green-800'
            : 'bg-[#A1A863]'
            }`}
        >
          <h3 className="font-semibold text-lg">Grupos</h3>
        </div>

        {/* Bloco Fornecedor */}
        <div
          onClick={() => setSelectedFilter('fornecedor')}
          className={`p-8 rounded-lg cursor-pointer ${selectedFilter === 'fornecedor'
            ? 'bg-white border border-green-800 shadow-md text-green-800'
            : 'bg-[#c5d34d]'
            }`}
        >
          <h3 className="font-semibold text-lg">Fornecedores</h3>
          <p className="text-sm mt-1">Produtos & Serviços</p>
        </div>

        {/* Bloco Clientes */}
        <div
          onClick={() => setSelectedFilter('clientes')}
          className={`p-8 rounded-lg cursor-pointer ${selectedFilter === 'clientes'
            ? 'bg-white border border-green-800 shadow-md text-green-800'
            : 'bg-[#8F7E76]'
            }`}
        >
          <h3 className="font-semibold text-lg">Empresas</h3>
          <p className="text-sm mt-1">Produtos & Serviços</p>
        </div>
      </div>

      {/* Campo de busca */}
      <div className='flex w-full justify-center p-2 font-bold'>
        <label className='font-semibold text-black'>Pesquise pelo Nome ou Usuário <span className="text-green-600 font-bold text-xl">GooAgro</span></label>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <FaSearch className="text-green-600" />
        <input
          type="text"
          placeholder="Digite sua busca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border-2 rounded-md border-gray-300 px-3 py-2"
        />
      </div>
      <Label className='flex justify-center font-mediumS'>Quer usar Filtros Básicos?</Label>
      {/* Botão para mostrar filtros avançados */}

      <div className="space-y-3 mb-3">
        <select className="w-full p-2 border border-gray-300 rounded">
          <option>Tipo de Interesse</option>
        </select>
        <select className="w-full p-2 border border-gray-300 rounded">
          <option>Selecione uma Categoria</option>
        </select>
        <select className="w-full p-2 border border-gray-300 rounded">
          <option>Selecione uma Modalidade</option>
        </select>
      </div>

      <div className="flex justify-center mb-5">
        <Label className="font-bold mb-4 bg-yellow-100">ATIVAR GPS-LOCALIZADOR REGIONAL / km</Label>
        <div className="flex flex-wrap gap-2 mt-1 justify-center">
          {[10, 30, 50, 100, 999].map((dist) => (
            <Button
              key={dist}
              variant={distancia === dist.toString() ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => handleDistancia(dist.toString())}
            >
              {dist} km
            </Button>
          ))}
        </div>
      </div>

      {/* Botão Opções de Filtro */}
      <button
        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        className="flex items-center justify-between bg-green-600 text-white py-4 px-3 rounded-lg shadow-md font-bold w-64 h-24"
      >
        <span className='text-xl'> + Opções de Filtros</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${showAdvancedFilters ? 'rotate-180' : ''
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {/* Seção de filtros avançados */}
      <FiltroExpandido isOpen={showAdvancedFilters}>
        <div className="space-y-4">
          {/* Faixa Etária e Localizador Regional */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label className="font-bold">FAIXA ETÁRIA</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="≥"
                  value={faixaEtariaMin}
                  onChange={(e) => setFaixaEtariaMin(e.target.value)}
                  className="w-20"
                />
                <span>–</span>
                <Input
                  type="number"
                  placeholder="≤"
                  value={faixaEtariaMax}
                  onChange={(e) => setFaixaEtariaMax(e.target.value)}
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tipo de Pessoa */}
        <div className="mb-6">
          <Label className="font-bold mb-2">TIPO</Label>
          <div className="flex flex-wrap gap-2">
            {['Pessoa Física', 'Pessoa Jurídica / Empresa'].map((item) => (
              <Button
                key={item}
                variant={tipoPessoa.includes(item) ? 'primary' : 'secondary'}
                size="sm"
                className="text-sm"
                onClick={() => toggleTipoPessoa(item)}
              >
                {item}
              </Button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">Pode marcar 2 opções.</p>
        </div>

        {/* Entrega */}
        <div className="mb-6">
          <Label className="font-bold mb-2">ENTREGA AO CLIENTE</Label>
          <div className="flex flex-wrap gap-2">
            {['Em nossa sede', 'No cliente / DELIVERY'].map((item) => (
              <Button
                key={item}
                variant={entrega === item ? 'primary' : 'secondary'}
                size="sm"
                className="text-sm"
                onClick={() => setEntrega(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        {/* Modalidade */}
        <div className="mb-6">
          <Label className="font-bold mb-2">MODALIDADE</Label>
          <div className="flex flex-wrap gap-2">
            {['Nacional', 'Internacional'].map((item) => (
              <Button
                key={item}
                variant={modalidade === item ? 'primary' : 'secondary'}
                size="sm"
                className="text-sm"
                onClick={() => setModalidade(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        {/* Componente VinculosSociais */}
        <VinculosSociais />

        {/* Escolaridade */}
        <div className="mb-6">
          <Label className="font-bold mb-2">NÍVEL, SÉRIE OU GRAU DE ESCOLARIDADE</Label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
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

        {/* Filtros de checkbox */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="pcd"
              className="mr-2 h-5 w-5"
              checked={pcd}
              onChange={(e) => setPcd(e.target.checked)}
            />
            <label htmlFor="pcd">CUIDADO ESPECIAL OU DOENÇA CRÔNICA / PCD</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="voluntariado"
              className="mr-2 h-5 w-5"
              checked={voluntariado}
              onChange={(e) => setVoluntariado(e.target.checked)}
            />
            <label htmlFor="voluntariado">VOLUNTARIADO</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="economia-solidaria"
              className="mr-2 h-5 w-5"
              checked={economiaSolidaria}
              onChange={(e) => setEconomiaSolidaria(e.target.checked)}
            />
            <label htmlFor="economia-solidaria">ECONOMIA SOLIDÁRIA</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="cultura-popular"
              className="mr-2 h-5 w-5"
              checked={culturaPopular}
              onChange={(e) => setCulturaPopular(e.target.checked)}
            />
            <label htmlFor="cultura-popular">CULTURA POPULAR</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="acao-ambiental"
              className="mr-2 h-5 w-5"
              checked={acaoAmbiental}
              onChange={(e) => setAcaoAmbiental(e.target.checked)}
            />
            <label htmlFor="acao-ambiental">AÇÃO AMBIENTAL / ECOLOGIA</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="religiao"
              className="mr-2 h-5 w-5"
            />
            <label htmlFor="religiao">RELIGIÃO</label>
          </div>
        </div>

        {/* Grupo Caatingueiros */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="caatingueiros"
            className="mr-2 h-5 w-5"
          />
          <label htmlFor="caatingueiros">CAATINGUEIROS</label>
        </div>
      </FiltroExpandido>

      {/* Botão de busca */}
      <div className="flex text-center justify-center mt-6">
        <button
          onClick={handleSearch}
          className="text-center text-[30px] bg-green-900 text-white rounded-lg shadow-md font-bold w-80 h-12"
        >
          BUSCAR
        </button>
      </div>
      {/* Resultados */}
      <BuscadorResultado results={results} filterType={selectedFilter} />
    </div >
  );
};