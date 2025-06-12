'use client';

import { routeModule } from 'next/dist/build/templates/app-page';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você faz o login real
    console.log(`Entrando com ${usuario}`);
  };

  const router = useRouter();
  const handleCadastro = () => {
    router.push('/cadastro'); // Corrigido aqui também
  };

  const handleEsqueciSenha = () => {
    alert('Oxente! Vamos te ajudar a recuperar sua senha rapidinho.');
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col justify-between">
      {/* Topo */}
      <header className="bg-green-700 text-green-100 py-5 flex justify-center items-center shadow-md">
        <h1 className="text-xl sm:text-3xl font-bold font-serif select-none px-4 text-center">
          GooAgro
        </h1>
      </header>

      {/* Formulário */}
      <main className="flex-grow flex items-center justify-center px-5 sm:px-0">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm"
        >
          <h2 className="text-green-800 font-serif font-bold text-xl mb-6 text-center">
            Entre e Confira
          </h2>

          {/* Usuário */}
          <label
            htmlFor="usuario"
            className="block text-green-700 font-semibold mb-1"
          >
            Usuário
          </label>
          <input
            id="usuario"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Seu nome cabra da peste"
            required
            className="w-full border border-green-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            autoComplete="username"
          />

          {/* Senha */}
          <label
            htmlFor="senha"
            className="block text-green-700 font-semibold mb-1"
          >
            Senha
          </label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Esconda bem a senha, viu?"
            required
            className="w-full border border-green-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            autoComplete="current-password"
          />

          <button
            type="button"
            onClick={handleEsqueciSenha}
            className=" mb-6  w-full border border-green-600 text-green-600 hover:bg-green-600   
          hover:text-white font-semibold rounded py-2 transition focus:outline-none focus:ring-2 focus:ring-green-400    focus:ring-offset-1    ">
            Esqueci minha senha
          </button>


          {/* Botão entrar */}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded transition-colors"
          >
            Entrar
          </button>

           <button
            type="button"
            onClick={handleCadastro}
            className="mb-6  w-full border border-green-600 text-green-600 hover:bg-green-600   
          hover:text-white font-semibold rounded py-3 transition focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1">
          
            Cadastra-se
          </button>
        </form>
      </main>

      {/* Rodapé */}
      <footer className="bg-green-700 text-green-100 text-center py-4 select-none font-serif text-sm">
        © {new Date().getFullYear()} GooAgro - Semeando futuro com raiz nordestina
      </footer>
    </div>
  );
};

export default Login;
