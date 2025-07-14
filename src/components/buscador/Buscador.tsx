
'use client';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FiltroExpandido } from './FiltroExpandido';
import { BuscadorResultado } from './BuscadorResultado';
import { fetchMockResults } from './api';
import { MainBanner } from '../MainBanner';
import { Label } from '@/utils/ui/Label';

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
          <h3 className="font-semibold text-lg">Fornecedores</h3>
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
          <h3 className="font-semibold text-lg">Empresas</h3>
          <div className="mt-1">
            <p className="text-sm mt-1">Produtos & Serviços</p>
          </div>
        </div>
      </div>

      {/* Campo de busca */}
      <div className='flex w-full justify-center p-2 font-bold'>
        <label className='font-semibold te-black' >Pesquise pelo Nome ou Usuário <span className="text-green-600 font-bold font-2xl">GooAgro</span></label>
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
      <div className='text-center py-3'>
        <span className='text-xl text-green-700 p-2 font-semibold'> Quer usar Filtros Básicos?</span>
      </div>
      <div className="border-t border-gray-300 pt-3">
                <div className="mb-4">

          {/* Selects sempre visíveis */}
          <div className="space-y-3 mb-3">
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>Tipo de Interesse</option>
            </select>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>Selecione uma Categoria</option>
            </select>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>Selecione uma Classe</option>
            </select>
          </div>
        </div>

      <div className="flex justify-center mb-5">
        {/* Botão Opções de Filtro */}
        <button
          onClick={() => setShowExtraFilters(!showExtraFilters)}
          className="flex items-center justify-between bg-green-600 text-white py-4 px-3 rounded-lg shadow-md font-bold w-64 h-24"
        >
          <span className='text-xl'> + Opções de Filtros</span>
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
      <div className="flex text-center justify-center mb-5">
        <button
          onClick={handleSearch}
          className="text-center text-[30px] bg-green-900 text-white rounded-lg shadow-md font-bold w-80 h-12"
        >
          BUSCAR
        </button>
      </div>
      {/* Resultados */}
      <BuscadorResultado results={results} filterType={selectedFilter} />
    </div>
  );
};