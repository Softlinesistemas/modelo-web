'use client'

import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export const AuthScreen = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'cadastro'>('login');
  const [showPassword, setShowPassword] = useState(false);

  // Login states
  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');

  return (
    <div className="min-h-screen w-full flex flex-col relative ">

      {/* Área com imagem no topo */}
      <div
        className="h-48 w-full bg-cover bg-center rounded-b-[40px] opacity-40 drop-shadow-lg shadow-gray-300"
        style={{
          backgroundImage: `url('/images/bg-auth.jpg')`,
        }}
      ></div>

      {/* Área verde restante */}
      <div className="flex-1 bg-green-100 flex items-start justify-center pt-[-3rem] relative">
        {/* Card branco flutuando */}
        <div className="relative z-10 bg-white w-80 max-w-sm rounded-3xl shadow-lg p-6 -mt-16">

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-full p-1 mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 text-sm font-semibold py-2 rounded-full ${activeTab === 'login' ? 'bg-green-700 text-white' : 'text-gray-700'
                }`}
            >
              Acessar
            </button>
            <button
              onClick={() => setActiveTab('cadastro')}
              className={`flex-1 text-sm font-semibold py-2 rounded-full ${activeTab === 'cadastro' ? 'bg-green-700 text-white' : 'text-gray-700'
                }`}
            >
              Criar conta
            </button>
          </div>

          {/* Login */}
          {activeTab === 'login' && (
            <div className="space-y-4">
              {/* Email */}
              <input
                type="email"
                placeholder="E-mail"
                value={emailLogin}
                onChange={(e) => setEmailLogin(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {/* Senha com ícone */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Senha"
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

              {/* Esqueci senha */}
              <div className="text-center">
                <button className="text-green-700 text-sm hover:underline">
                  Esqueci a senha
                </button>
              </div>
            </div>
          )}

          {/* Cadastro */}
          {activeTab === 'cadastro' && (
            <div className="space-y-3">
              <input type="text" placeholder="Nome" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input type="text" placeholder="Usuário" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input type="text" placeholder="Telefone" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input type="text" placeholder="Repetir telefone" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input type="email" placeholder="Email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input type="email" placeholder="Repetir email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />

              <button className="w-full bg-green-700 text-white py-2 rounded-full font-semibold hover:bg-green-800 transition">
                Criar conta
              </button>
            </div>
          )}

          {/* Ajuda / FAQ / Tutoriais */}
          <div className="mt-6 text-center text-xs text-gray-600">
            Ajuda / FAQ / Tutoriais
          </div>
        </div>
      </div>
    </div>
  );
};