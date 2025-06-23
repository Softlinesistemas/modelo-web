'use client';

import React, { useState, useEffect } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Input } from '@/utils/ui/Input';
import { Label } from '@/utils/ui/Label';

// === Tipagens das APIs ===
interface Estado {
  id: number;
  sigla: string;
  nome: string;
}

interface Pais {
  name: { common: string };
  cca2: string;
}

export const AuthScreen = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'cadastro'>('login');
  const [showPassword, setShowPassword] = useState(false);

  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');

  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [pais, setPais] = useState('Brasil');

  const [listaEstados, setListaEstados] = useState<Estado[]>([]);
  const [listaPaises, setListaPaises] = useState<Pais[]>([]);

  useEffect(() => {
    async function fetchEstados() {
      const resp = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
      const data: Estado[] = await resp.json();
      setListaEstados(data.sort((a, b) => a.nome.localeCompare(b.nome)));
    }
    fetchEstados();
  }, []);

  useEffect(() => {
    async function fetchPaises() {
      const resp = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2');
      const data: Pais[] = await resp.json();
      setListaPaises(data.sort((a, b) => a.name.common.localeCompare(b.name.common)));
    }
    fetchPaises();
  }, []);

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
        setLogradouro('');
        setBairro('');
        setCidade('');
        setEstado('');
        setPais('Brasil');
      } else {
        setLogradouro(data.logradouro || '');
        setBairro(data.bairro || '');
        setCidade(data.localidade || '');
        setEstado(data.uf || '');
        setPais('Brasil');
      }
    } catch (err) {
      console.error('Erro ao buscar CEP:', err);
      alert('Erro ao buscar CEP.');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative">
      <div
        className="h-48 w-full bg-cover bg-center rounded-b-[40px] opacity-40 drop-shadow-lg shadow-gray-300"
        style={{ backgroundImage: `url('/images/bg-auth.jpg')` }}
      />

      <div className="flex-1 bg-green-100 flex items-start justify-center pt-[-3rem] relative">
        <div className="relative z-10 bg-white w-80 max-w-sm rounded-3xl shadow-lg p-6 -mt-16">

          {/* Abas */}
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

          {/* Login */}
          {activeTab === 'login' && (
            <div className="space-y-5">
              <Label>E-mail</Label>
              <Input
                type="email"
                value={emailLogin}
                onChange={e => setEmailLogin(e.target.value)}
              />

              <Label>Senha</Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={senhaLogin}
                  onChange={e => setSenhaLogin(e.target.value)}
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </div>
              </div>

              <button className="w-full bg-green-700 text-white py-2 rounded-full font-semibold hover:bg-green-800 transition">
                Acessar
              </button>

              <div className="text-center">
                <button className="text-green-700 text-sm hover:underline">Esqueci a senha</button>
              </div>
            </div>
          )}

          {/* Cadastro */}
          {activeTab === 'cadastro' && (
            <form className="space-y-1">
              <Label>Nome público *</Label>
              <Input type="text" />

              <Label>Usuário *</Label>
              <Input type="text" error="Esse usuário já existe" />

              <Label>Telefone</Label>
              <Input type="text" />

              <Label>Repetir telefone</Label>
              <Input type="text" />

              <Label>E-mail</Label>
              <Input type="email" />

              <Label>Repetir e-mail</Label>
              <Input type="email" />

              <Label>País</Label>
              <select
                value={pais}
                onChange={e => setPais(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Selecione o país</option>
                {listaPaises.map(p => (
                  <option key={p.cca2} value={p.name.common}>{p.name.common}</option>
                ))}
              </select>

              <Label>Estado (UF)</Label>
              <select
                value={estado}
                onChange={e => setEstado(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Selecione o estado</option>
                {listaEstados.map(uf => (
                  <option key={uf.id} value={uf.sigla}>{uf.nome} ({uf.sigla})</option>
                ))}
              </select>

              <Label>CEP</Label>
              <div className="flex space-x-2 border border-gray-300 rounded-lg">
                <Input
                  type="text"
                  value={cep}
                  onChange={e => setCep(e.target.value.replace(/\D/g, ''))}
                />
                <button
                  type="button"
                  onClick={handleBuscarCep}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm"
                >
                  Buscar
                </button>
              </div>

              <Label>Rua / Logradouro</Label>
              <Input
                type="text"
                value={logradouro}
                onChange={e => setLogradouro(e.target.value)}
              />

              <Label>Bairro</Label>
              <Input
                type="text"
                value={bairro}
                onChange={e => setBairro(e.target.value)}
              />

              <Label>Cidade</Label>
              <Input
                type="text"
                value={cidade}
                onChange={e => setCidade(e.target.value)}
              />

              <Label>Data de nascimento *</Label>
              <Input type="date" />
              <p className="text-xs text-gray-500">Sua idade ficará sempre oculta.</p>

              <button className="w-full bg-green-700 text-white py-2 rounded-full font-semibold hover:bg-green-800 transition">
                Criar conta
              </button>

              <p className="text-[10px] text-gray-600 mt-5">
                * Atendendo à Lei Geral de Proteção de Dados Pessoais Nº 13.709/18
              </p>
            </form>
          )}

          <div className="mt-6 text-center text-xs text-gray-600 pt-9">
            Ajuda / FAQ / Tutoriais
          </div>
        </div>
      </div>
    </div>
  );
};