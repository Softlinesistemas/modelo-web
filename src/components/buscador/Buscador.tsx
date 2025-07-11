
'use client';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FiltroExpandido } from './FiltroExpandido';
import { BuscadorResultado } from './BuscadorResultado';
import { fetchMockResults } from './api';
import { MainBanner } from '../MainBanner';

export const Buscador: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('amigos');
  const [categoria, setCategoria] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [showExtraFilters, setShowExtraFilters] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    const filters = {
      tipo: selectedFilter,
      categoria,
      localizacao,
    };
    const res = await fetchMockResults(filters);
    setResults(res);
    setShowExtraFilters(false);
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <div className='mb-2 p-1'>
      <MainBanner />
      </div>
      <h1 className="text-2xl font-bold text-center mb-4 text-green-700">BUSCADOR GooAgro</h1>

      {/* Campo de busca */}
      <div className="flex items-center space-x-2 mb-4">
        <FaSearch className="text-gray-600" />
        <input
          type="text"
          placeholder="Digite sua busca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border-b-2 border-gray-300 px-3 py-2 outline-none"
        />
      </div>


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
          <div className="mt-1">

          </div>
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
          <div className="mt-1">

          </div>
        </div>

        {/* Bloco Fornecedor */}
        <div
          onClick={() => setSelectedFilter('fornecedor')}
          className={`p-8 rounded-lg cursor-pointer ${selectedFilter === 'fornecedor'
            ? 'bg-white border border-green-800 shadow-md text-green-800'
            : 'bg-[#c5d34d]'
            }`}
        >
          <h3 className="font-semibold text-lg">Fornecedor</h3>
          <div className="mt-1">

            <p className="text-sm mt-1">Produtos & Serviços</p>
          </div>
        </div>

        {/* Bloco Clientes */}
        <div
          onClick={() => setSelectedFilter('clientes')}
          className={`p-8 rounded-lg cursor-pointer ${selectedFilter === 'clientes'
            ? 'bg-white border border-green-800 shadow-md text-green-800'
            : 'bg-[#8F7E76]'
            }`}
        >
          <h3 className="font-semibold text-lg">Clientes</h3>
          <div className="mt-1">
            <p className="text-sm mt-1">Produtos & Serviços</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-5">
        {/* Botão Opções de Filtro */}
        <button
          onClick={() => setShowExtraFilters(!showExtraFilters)}
          className="flex items-center justify-between bg-green-900 text-white py-4 px-3 rounded-lg shadow-md font-bold w-64 h-24"
        >
          <span>Opções de Filtros</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${showExtraFilters ? 'rotate-180' : ''
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
        </div>

        <div className="border-t border-gray-300 pt-3">
          <div className="mb-4">

            {/* Selects sempre visíveis */}
            <div className="space-y-3 mb-3">
              <select className="w-full p-2 border border-gray-300 rounded">
                <option>Tipo de Interesse</option>
              </select>
              <select className="w-full p-2 border border-gray-300 rounded">
                <option>Selecione uma categoria</option>
              </select>
              <select className="w-full p-2 border border-gray-300 rounded">
                <option>Selecione uma classe</option>
              </select>
            </div>
          </div>
          
          {/* Filtros adicionais (apenas quando expandido) */}
          <FiltroExpandido isOpen={showExtraFilters}>
            <div className="space-y-3">
              {['Categoria', 'Mobilidade', 'Variedade', 'Nacionalidade', 'Bioma', 'Divisão geopolítica', 'Cidade/Estado', 'Bairro'].map((item) => (
                <select key={item} className="w-full p-2 border border-gray-300 rounded">
                  <option>{item}</option>
                </select>
              ))}
            </div>
          </FiltroExpandido>
        </div>
      
      {/* Botão de busca */}
      <button
        onClick={handleSearch}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded shadow font-semibold"
      >
        Buscar
      </button>

      {/* Resultados */}
      <BuscadorResultado results={results} filterType={selectedFilter} />
    </div>
  );
};