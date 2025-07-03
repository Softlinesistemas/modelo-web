'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { FaUserFriends, FaUsers, FaHandshake, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import debounce from 'lodash.debounce';
import { BuscadorResultado } from '@/components/BuscadorResultado';


type FilterType = 'amigos' | 'grupos' | 'fornecedor' | 'clientes' | null;

const mockSuggestions = [
  'João da Feira',
  'Grupo Agroecológico',
  'Máquinas Verdes',
  'Sementes BoaColheita',
  'Carlos Silva',
  'Clientes Sustentáveis',
];

const mockResults: BuscadorResultado[] = [
  {
    nome: 'João da Feira',
    descricao: 'Agricultor familiar que vende produtos orgânicos',
    localizacao: 'São Paulo',
    tipo: 'amigos',
  },
  {
    nome: 'Grupo Agroecológico de Minas',
    descricao: 'Comunidade focada em agroflorestas',
    localizacao: 'Belo Horizonte',
    tipo: 'grupos',
  },
  {
    nome: 'Máquinas Verdes',
    descricao: 'Venda e manutenção de tratores e colheitadeiras',
    localizacao: 'São Paulo',
    tipo: 'fornecedor',
    categoria: 'Máquinas',
  },
  {
    nome: 'AgroSoluções',
    descricao: 'Serviços técnicos para irrigação e automação',
    localizacao: 'Goiás',
    tipo: 'fornecedor',
    categoria: 'Serviços Técnicos',
  },
  {
    nome: 'Mercado do Campo',
    descricao: 'Cliente atacadista de produtos naturais',
    localizacao: 'Bahia',
    tipo: 'clientes',
  },
];

export const GooAgroFinder: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(null);
  const [search, setSearch] = useState('');
  const [categoria, setCategoria] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [tipoCliente, setTipoCliente] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Autocomplete com debounce
  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        const filtered = mockSuggestions.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered);
      }, 300),
    []
  );

  useEffect(() => {
    if (search.trim() === '') {
      setSuggestions([]);
      return;
    }
    handleSearch(search);
  }, [search, handleSearch]);

  // Lógica dos filtros
  const filteredResults = useMemo(() => {
    return mockResults.filter((item) => {
      if (selectedFilter && item.tipo !== selectedFilter) return false;

      if (selectedFilter === 'fornecedor') {
        if (categoria && item.categoria !== categoria) return false;
        if (
          localizacao &&
          !item.localizacao.toLowerCase().includes(localizacao.toLowerCase())
        )
          return false;
      }

      if (selectedFilter === 'clientes') {
        if (
          tipoCliente &&
          !item.descricao.toLowerCase().includes(tipoCliente.toLowerCase())
        )
          return false;
      }

      if (selectedFilter === 'amigos' || selectedFilter === 'grupos') {
        if (search && !item.nome.toLowerCase().includes(search.toLowerCase())) return false;
      }

      return true;
    });
  }, [selectedFilter, categoria, localizacao, tipoCliente, search]);

  return (
    <div className="bg-[#e9f8d4] p-4 max-w-xl mx-auto rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-green-700">
          BUSCADOR <span className="text-black">GooAgro</span>
        </h1>
      </div>

      {/* Campo de busca */}
      <div className="relative mb-6">
        <div className="flex items-center gap-2 bg-white border border-black px-3 py-2 rounded-md shadow">
          <FaSearch className="text-gray-600" />
          <input
            type="text"
            placeholder="Digite sua busca..."
            className="flex-1 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 mt-1 w-full max-h-40 overflow-y-auto rounded-md shadow">
            {suggestions.map((s, index) => (
              <li
                key={index}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  setSearch(s);
                  setSuggestions([]);
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Botões */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button onClick={() => setSelectedFilter('amigos')} className="bg-yellow-300 border border-black py-2 px-3 flex items-center justify-between font-bold shadow text-sm">
          <span>AMIGOS</span>
          <FaUserFriends />
        </button>

        <button onClick={() => setSelectedFilter('grupos')} className="bg-yellow-200 border border-black py-2 px-3 flex items-center justify-between font-bold shadow text-sm">
          <span>GRUPOS</span>
          <FaUsers />
        </button>

        <button onClick={() => setSelectedFilter('fornecedor')} className="bg-green-300 border border-black py-2 px-3 flex flex-col items-center font-bold shadow text-sm">
          <FaHandshake className="mb-1" />
          <span>FORNECEDOR</span>
          <span className="text-xs">Produtos & Serviços</span>
        </button>

        <button onClick={() => setSelectedFilter('clientes')} className="bg-yellow-400 border border-black py-2 px-3 flex flex-col items-center font-bold shadow text-sm">
          <FaHandshake className="mb-1" />
          <span>CLIENTES</span>
          <span className="text-xs">Produtos & Serviços</span>
        </button>
      </div>

      {/* Filtros condicionais */}
      <div className="bg-white p-4 rounded-md border border-gray-300 shadow-md min-h-[150px]">
        <AnimatePresence mode="wait">
          {selectedFilter === 'amigos' && (
            <motion.div key="amigos" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <h2 className="font-bold mb-2">Filtrar Amigos</h2>
              <input type="text" placeholder="Buscar por nome..." className="w-full border px-3 py-1 rounded" />
            </motion.div>
          )}

          {selectedFilter === 'grupos' && (
            <motion.div key="grupos" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <h2 className="font-bold mb-2">Filtrar Grupos</h2>
              <select className="w-full border px-3 py-1 rounded">
                <option value="">Selecione uma categoria</option>
                <option>Agroecologia</option>
                <option>Comercialização</option>
                <option>Comunidades</option>
              </select>
            </motion.div>
          )}

          {selectedFilter === 'fornecedor' && (
            <motion.div key="fornecedor" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <h2 className="font-bold mb-2">Fornecedores</h2>
              <label className="block mb-1">Categoria</label>
              <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="w-full border px-3 py-1 rounded mb-2">
                <option value="">Todas</option>
                <option value="Máquinas">Máquinas</option>
                <option value="Insumos">Insumos</option>
                <option value="Serviços Técnicos">Serviços Técnicos</option>
              </select>
              <label className="block mb-1">Localização</label>
              <input value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} type="text" placeholder="Cidade ou estado..." className="w-full border px-3 py-1 rounded" />
            </motion.div>
          )}

          {selectedFilter === 'clientes' && (
            <motion.div key="clientes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <h2 className="font-bold mb-2">Clientes</h2>
              <label className="block mb-1">Tipo de cliente</label>
              <select value={tipoCliente} onChange={(e) => setTipoCliente(e.target.value)} className="w-full border px-3 py-1 rounded">
                <option value="">Todos</option>
                <option value="Revenda">Revenda</option>
                <option value="Consumidor final">Consumidor final</option>
                <option value="Atacadista">Atacadista</option>
              </select>
            </motion.div>
          )}

          {!selectedFilter && (
            <motion.p key="empty" className="text-gray-500 italic text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              Selecione um filtro acima para refinar sua busca.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Resultados */}
        <BuscadorResultado results={filteredResults} />
      </div>
    </div>
  );
};