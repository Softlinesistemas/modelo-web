'use client';

import React, { useState, useEffect } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Input } from '@/utils/ui/Input';
import { Label } from '@/utils/ui/Label';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { userBasicSchema, UserBasicSchema } from '@/schemas/userSchema';

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
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<UserBasicSchema>({
    resolver: zodResolver(userBasicSchema),
    defaultValues: {
      Role: 'USER',
      TermosPrivacidade: false,
      ParticiparEvento: false,
      Pais: 'Brasil',
      Privacidade: 'PUBLICO'
    }
  });

  const [activeTab, setActiveTab] = useState<'login' | 'cadastro'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [listaEstados, setListaEstados] = useState<Estado[]>([]);
  const [listaPaises, setListaPaises] = useState<Pais[]>([]);

  const onSubmit = (data: UserBasicSchema) => {
    console.log('Dados válidos:', data);
  };

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(res => res.json())
      .then((data: Estado[]) => setListaEstados(data.sort((a, b) => a.nome.localeCompare(b.nome))));
  }, []);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,cca2')
      .then(res => res.json())
      .then((data: Pais[]) => setListaPaises(data.sort((a, b) => a.name.common.localeCompare(b.name.common))));
  }, []);

  const handleBuscarCep = async () => {
    const cep = watch('Cep');
    if (!cep || cep.length !== 7) {
      alert('Digite um CEP válido com 8 dígitos.');
      return;
    }

    try {
      const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await resp.json();

      if (data.erro) {
        alert('CEP não encontrado. Preencha manualmente.');
        setValue('Endereco', '');
        setValue('Bairro', '');
        setValue('Cidade', '');
        setValue('Estado', '');
        setValue('Pais', 'Brasil');
      } else {
        setValue('Endereco', data.logradouro || '');
        setValue('Bairro', data.bairro || '');
        setValue('Cidade', data.localidade || '');
        setValue('Estado', data.uf || '');
        setValue('Pais', 'Brasil');
      }
    } catch (err) {
      console.error('Erro ao buscar CEP:', err);
      alert('Erro ao buscar CEP.');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative">
      <div className="h-48 w-full bg-cover bg-center rounded-b-[40px] opacity-40 drop-shadow-lg shadow-gray-300"
        style={{ backgroundImage: `url('/images/bg-auth.jpg')` }} />

      <div className="flex-1 bg-green-100 flex items-start justify-center relative">
        <div className="relative z-10 bg-white w-80 max-w-sm rounded-3xl shadow-lg p-6 -mt-16">

          {/* Tabs */}
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
              <Label>Email</Label>
              <Input type="email" />

              <Label>Senha</Label>
              <div className="relative">
                <Input type={showPassword ? 'text' : 'password'} />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(prev => !prev)}>
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </div>
              </div>

              <button className="w-full bg-green-700 text-white py-2 rounded-full font-semibold hover:bg-green-800 transition">
                Acessar
              </button>
            </div>
          )}

          {/* Cadastro */}
          {activeTab === 'cadastro' && (
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <Label>Nome público *</Label>
              <Input type="text" {...register('Usuario')} error={errors.Usuario?.message} />

              <Label>Usuário *</Label>
              <Input type="text" {...register('Nome')} error={errors.Nome?.message} />

              <Label>Telefone *</Label>
              <Input type="text" {...register('Telefone')} error={errors.Telefone?.message} />

              <Label>Email *</Label>
              <Input type="email" {...register('Email')} error={errors.Email?.message} />

              <Label>CPF</Label>
              <Input type="text" {...register('CPF')} error={errors.CPF?.message} />

              <Label>Data de nascimento *</Label>
              <div className="flex gap-2">
                <Input placeholder="Dia" type="number" {...register('DiaNascimento')} error={errors.DiaNascimento?.message} />
                <Input placeholder="Mês" type="number" {...register('MesNascimento')} error={errors.MesNascimento?.message} />
                <Input placeholder="Ano" type="number" {...register('AnoNascimento')} error={errors.AnoNascimento?.message} />
              </div>

              <Label>Privacidade</Label>
              <select {...register('Privacidade')} className="w-full border rounded-lg p-2">
                <option value="PUBLICO">Público</option>
                <option value="PRIVADO">Privado</option>
                <option value="AMIGOS">Amigos</option>
              </select>

              <Label>País</Label>
              <select {...register('Pais')} className="w-full border rounded-lg p-2">
                <option value="">Selecione o país</option>
                {listaPaises.map(p => (
                  <option key={p.cca2} value={p.name.common}>{p.name.common}</option>
                ))}
              </select>

              <Label>Estado (UF)</Label>
              <select {...register('Estado')} className="w-full border rounded-lg p-2">
                <option value="">Selecione o estado</option>
                {listaEstados.map(uf => (
                  <option key={uf.id} value={uf.sigla}>{uf.nome} ({uf.sigla})</option>
                ))}
              </select>

              <Label>Cidade</Label>
              <Input type="text" {...register('Cidade')} error={errors.Cidade?.message} />

              <Label>CEP</Label>
              <div className="flex space-x-2">
                <Input type="text" {...register('Cep')} />
                <button type="button" onClick={handleBuscarCep} className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm">
                  Buscar
                </button>
              </div>

              <Label>Endereço</Label>
              <Input type="text" {...register('Endereco')} />

              <Label>Número</Label>
              <Input type="text" {...register('NumeroEndereco')} />

              <Label>Complemento</Label>
              <Input type="text" {...register('Complemento')} />

              <Label>Bairro</Label>
              <Input type="text" {...register('Bairro')} />

              <Label>Senha *</Label>
              <Input type="password" {...register('Senha')} error={errors.Senha?.message} />

              <div className="flex gap-2 items-center">
                <input type="checkbox" {...register('TermosPrivacidade')} />
                <span className="text-sm">Li e aceito os Termos de Privacidade</span>
              </div>

              <div className="flex gap-2 items-center">
                <input type="checkbox" {...register('ParticiparEvento')} />
                <span className="text-sm">Aceito receber notificações de eventos</span>
              </div>

              <button type="submit" className="w-full bg-green-700 text-white py-2 rounded-full font-semibold hover:bg-green-800 transition">
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