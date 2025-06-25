// AuthScreen.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Input from './common/Input';

// === Tipagens para resposta das APIs ===
interface Estado {
  id: number;           // ID do estado no IBGE
  sigla: string;        // Sigla (UF)
  nome: string;         // Nome completo
}

interface Pais {
  name: { common: string };
  cca2: string;
}

export const AuthScreen = () => {
  // === Controle de abas ===
  const [activeTab, setActiveTab] = useState<'login' | 'cadastro'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("Esse usuário já existe")

  const [nome, setNome] = useState("");

  // === Estados para login ===
  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');

  // === Estados para cadastro ===
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [pais, setPais] = useState('Brasil'); // valor inicial Brasil

  // === Listas carregadas das APIs ===
  const [listaEstados, setListaEstados] = useState<Estado[]>([]);
  const [listaPaises, setListaPaises] = useState<Pais[]>([]);

  // Carrega lista de estados (IBGE)
  useEffect(() => {
    async function fetchEstados() {
      try {
        const resp = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const data: Estado[] = await resp.json();
        // Ordena alfabeticamente
        const ordenados = data.sort((a, b) => a.nome.localeCompare(b.nome));
        setListaEstados(ordenados);
      } catch (err) {
        console.error('Erro ao carregar estados IBGE:', err);
      }
    }
    fetchEstados();
  }, []);

  // Carrega lista de países (RestCountries)
  useEffect(() => {
    async function fetchPaises() {
      try {
        const resp = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2');
        const data: Pais[] = await resp.json();

        // Ordena alfabeticamente
        const ordenados = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setListaPaises(ordenados);
      } catch (err) {
        console.error('Erro ao carregar países:', err);
      }
    }
    fetchPaises();
  }, []);


  // Busca CEP e preenche endereço
  const handleBuscarCep = async () => {
    if (cep.length !== 8) {
      alert('Digite um CEP válido com 8 dígitos.');
      return;
    }

    try {
      const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await resp.json();

      if (data.erro) {
        alert('CEP não encontrado. Preencha manualmente.');
        // Limpa campos para entrada manual
        setLogradouro('');
        setBairro('');
        setCidade('');
        setEstado('');
        setPais('Brasil');
      } else {
        // Preenche com dados retornados
        setLogradouro(data.logradouro || '');
        setBairro(data.bairro || '');
        setCidade(data.localidade || '');
        setEstado(data.uf || '');
        setPais('Brasil'); // ViaCEP é Brasil
      }
    } catch (err) {
      console.error('Erro na busca de CEP:', err);
      alert('Erro ao buscar CEP. Preencha manualmente.');
      setLogradouro('');
      setBairro('');
      setCidade('');
      setEstado('');
      setPais('Brasil');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative">
      {/* Imagem de topo */}
      <div
        className="h-48 w-full bg-cover bg-center rounded-b-[40px] opacity-40 drop-shadow-lg shadow-gray-300"
        style={{ backgroundImage: `url('/images/bg-auth.jpg')` }}
      />

      {/* Container do card */}
      <div className="flex-1 bg-green-100 flex items-start justify-center pt-[-3rem] relative">
        <div className="relative z-10 bg-white w-80 max-w-sm rounded-3xl shadow-lg p-6 -mt-16">

          {/* Abas Login / Cadastro */}
          <div className="flex bg-gray-100 rounded-full p-1 mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 text-sm font-semibold py-2 rounded-full ${activeTab === 'login' ? 'bg-green-700 text-white' : 'text-gray-700'}`}
            >Acessar</button>
            <button
              onClick={() => setActiveTab('cadastro')}
              className={`flex-1 text-sm font-semibold py-2 rounded-full ${activeTab === 'cadastro' ? 'bg-green-700 text-white' : 'text-gray-700'}`}
            >Criar conta</button>
          </div>

          {/* === Área de Login === */}
          {activeTab === 'login' && (
            <div className="space-y-4">
              {/* E-mail */}
              <label className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                value={emailLogin}
                onChange={e => setEmailLogin(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {/* Senha */}
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={senhaLogin}
                  onChange={e => setSenhaLogin(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </div>
              </div>

              {/* Botão Acessar */}
              <button className="w-full bg-green-700 text-white py-2 rounded-full font-semibold hover:bg-green-800 transition">
                Acessar
              </button>

              {/* Esqueci senha */}
              <div className="text-center">
                <button className="text-green-700 text-sm hover:underline">Esqueci a senha</button>
              </div>
            </div>
          )}

          {/* === Área de Cadastro === */}
          {activeTab === 'cadastro' && (
            <form className="space-y-3">
              {/* Nome público */}
              <label className="block text-sm font-medium text-gray-700">Nome público *</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {/* Usuário */}
              <label className="block text-sm font-medium text-gray-700">Usuário *</label>
              <Input  type="text" error={error} onFocusRemoveError={() => setError("")} onChange={(e: any) => {
                setNome(e.target.value);
                if (!e.target.value) {
                  setError("");
                  return;
                }
                setError("Esse usuário já existe");
              }}/>

              {/* Telefone */}
              <label className="block text-sm font-medium text-gray-700">Telefone</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {/* Repetir Telefone */}
              <label className="block text-sm font-medium text-gray-700">Repetir telefone</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {/* E-mail e repetir e-mail */}
              <label className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <label className="block text-sm font-medium text-gray-700">Repetir e-mail</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {/* Select de País */}
              <label className="block text-sm font-medium text-gray-700">País</label>
              <select
                value={pais}
                onChange={e => setPais(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Selecione o país</option>
                {listaPaises.map(pItem => (
                  <option key={pItem.cca2} value={pItem.name.common}>
                    {pItem.name.common}
                  </option>
                ))}
              </select>

              {/* Select de Estado (UF) */}
              <label className="block text-sm font-medium text-gray-700">Estado (UF)</label>
              <select
                value={estado}
                onChange={e => setEstado(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Selecione o estado</option>
                {listaEstados.map(uf => (
                  <option key={uf.id} value={uf.sigla}>
                    {uf.nome} ({uf.sigla})
                  </option>
                ))}
              </select>



              {/* Campo CEP com botão Buscar */}
              <label className="block text-sm font-medium text-gray-700">CEP</label>
              <div className="flex space-x-2 border border-gray-300 rounded-lg">
                <input
                  type="text"
                  value={cep}
                  onChange={e => setCep(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-2 border.border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={handleBuscarCep}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm"
                >Buscar</button>
              </div>

              {/* Rua / Logradouro */}
              <label className="block text-sm font-medium text-gray-700">Rua / Logradouro</label>
              <input
                type="text"
                value={logradouro}
                onChange={e => setLogradouro(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {/* Bairro */}
              <label className="block text-sm font-medium text-gray-700">Bairro</label>
              <input
                type="text"
                value={bairro}
                onChange={e => setBairro(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {/* Cidade */}
              <label className="block text-sm font-medium text-gray-700">Cidade</label>
              <input
                type="text"
                value={cidade}
                onChange={e => setCidade(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {/* Data de nascimento */}
              <label className="block text-sm font-medium text-gray-700">Data de nascimento *</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-gray-500">Sua idade ficará sempre oculta.</p>


              {/* Botão Criar conta */}
              <button className="w-full bg-green-700 text-white py-2 rounded-full font-semibold hover:bg-green-800 transition">
                Criar conta
              </button>
              
               {/* LGPD */}
              <p className="text-[10px] text-gray-600 mt-5">
                * Atendendo à Lei Geral de Proteção de Dados Pessoais Nº 13.709/18
              </p>

            </form>
          )}

          {/* Rodapé Ajuda */}
          <div className="mt-6 text-center text-xs text-gray-600 pt-9">Ajuda / FAQ / Tutoriais</div>
        </div>
      </div>
    </div>
  );
};
