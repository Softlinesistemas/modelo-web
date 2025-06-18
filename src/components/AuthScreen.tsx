'use client'

import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export const AuthScreen = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'cadastro'>('login');
  const [showPassword, setShowPassword] = useState(false);

  // Estados para login
  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');

  // Estados para cadastro
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [pais, setPais] = useState('Brasil'); // Default para Brasil

  const handleBuscarCep = async () => {
    if (cep.length !== 8) {
      alert('Digite um CEP válido com 8 dígitos.');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert('CEP não encontrado.');
        return;
      }

      setLogradouro(data.logradouro || '');
      setBairro(data.bairro || '');
      setCidade(data.localidade || '');
      setEstado(data.uf || '');
    } catch (error) {
      console.error('Erro ao buscar o CEP:', error);
      alert('Erro ao buscar o CEP.');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative">

      {/* Imagem topo */}
      <div
        className="h-48 w-full bg-cover bg-center rounded-b-[40px] opacity-40 drop-shadow-lg shadow-gray-300"
        style={{
          backgroundImage: `url('/images/bg-auth.jpg')`,
        }}
      ></div>

      {/* Área verde com card branco */}
      <div className="flex-1 bg-green-100 flex items-start justify-center pt-[-3rem] relative">
        <div className="relative z-10 bg-white w-80 max-w-sm rounded-3xl shadow-lg p-6 -mt-16">

          {/* Tabs - Login / Criar Conta */}
          <div className="flex bg-gray-100 rounded-full p-1 mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 text-sm font-semibold py-2 rounded-full ${activeTab === 'login' ? 'bg-green-700 text-white' : 'text-gray-700'}`}
            >
              Acessar
            </button>
            <button
              onClick={() => setActiveTab('cadastro')}
              className={`flex-1 text-sm font-semibold py-2 rounded-full ${activeTab === 'cadastro' ? 'bg-green-700 text-white' : 'text-gray-700'}`}
            >
              Criar conta
            </button>
          </div>

          {/* Área de Login */}
          {activeTab === 'login' && (
            <div className="space-y-4">
              {/* Email Login */}
              <label className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                value={emailLogin}
                onChange={(e) => setEmailLogin(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {/* Senha Login */}
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={senhaLogin}
                  onChange={(e) => setSenhaLogin(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </div>
              </div>

              {/* Botão Login */}
              <button className="w-full bg-green-700 text-white py-2 rounded-full font-semibold hover:bg-green-800 transition">
                Acessar
              </button>

              {/* Esqueci a senha */}
              <div className="text-center">
                <button className="text-green-700 text-sm hover:underline">Esqueci a senha</button>
              </div>
            </div>
          )}

          {/* Área de Cadastro */}
          {activeTab === 'cadastro' && (
            <form className="space-y-3">
              {/* Nome Público */}
              <label className="block text-sm font-medium text-gray-700">Nome público *</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />

              {/* Usuário */}
              <label className="block text-sm font-medium text-gray-700">Usuário *</label>
              <input type="text" className="w-full px-4 py-2 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
              <span className="text-red-600 text-xs">Esse usuário já existe</span>

              {/* Telefone */}
              <label className="block text-sm font-medium text-gray-700">Telefone</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />

              {/* Repetir Telefone */}
              <label className="block text-sm font-medium text-gray-700">Repetir telefone</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />

              {/* Email */}
              <label className="block text-sm font-medium text-gray-700">E-mail</label>
              <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />

              {/* Repetir Email */}
              <label className="block text-sm font-medium text-gray-700">Repetir e-mail</label>
              <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />

              {/* Campo Estado */}
              <label className="block text-sm font-medium text-gray-700">Estado (UF)</label>
              <input
                type="text"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {/* Campo País */}
              <label className="block text-sm font-medium text-gray-700">País</label>
              <input
                type="text"
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {/* Campo CEP */}
              <label className="block text-sm font-medium text-gray-700">CEP</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))} // Apenas números
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={handleBuscarCep}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm"
                >
                  Buscar
                </button>
              </div>

              {/* Campo Rua (Logradouro) */}
              <label className="block text-sm font-medium text-gray-700">Rua / Logradouro</label>
              <input
                type="text"
                value={logradouro}
                onChange={(e) => setLogradouro(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {/* Campo Bairro */}
              <label className="block text-sm font-medium text-gray-700">Bairro</label>
              <input
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {/* Campo Cidade */}
              <label className="block text-sm font-medium text-gray-700">Cidade</label>
              <input
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {/* Data de nascimento */}
              <label className="block text-sm font-medium text-gray-700">
                Data de nascimento *
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-gray-500">Sua idade ficará sempre oculta.</p>

              {/* LGPD */}
              <p className="text-[10px] text-gray-600 mt-1">
                * Atendendo à Lei Geral de Proteção de Dados Pessoais Nº 13.709/18
              </p>

              {/* Botão Criar Conta */}
              <button className="w-full bg-green-700 text-white py-2 rounded-full font-semibold hover:bg-green-800 transition">
                Criar conta
              </button>
            </form>
          )}

          {/* Rodapé - Ajuda */}
          <div className="mt-6 text-center text-xs text-gray-600">
            Ajuda / FAQ / Tutoriais
          </div>
        </div>
      </div>
    </div>
  );
};
