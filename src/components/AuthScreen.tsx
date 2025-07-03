'use client';

import React, { useState, useEffect } from 'react';
import { FiEye, FiEyeOff, FiChevronDown, FiChevronUp, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
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

  const [contatosApoio, setContatosApoio] = useState([{ open: true }]);

  const adicionarContato = () => {
    if (contatosApoio.length >= 3) return;
    setContatosApoio([...contatosApoio, { open: true }]);
  };

  const toggleContato = (index: number) => {
    setContatosApoio((prev) =>
      prev.map((c, i) => (i === index ? { ...c, open: !c.open } : c))
    );
  };



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
    <div className="min-h-screen w-full flex flex-col">
      <div className="h-72 w-full bg-cover bg-center rounded-b-[40px] opacity-40 drop-shadow-lg shadow-gray-300"
        style={{ backgroundImage: `url('/images/bg-auth.jpg')` }} />


      <div className="flex-1 bg-green-100 max-w-full flex items-start justify-center relative">
        <div className="relative z-10 w-max bg-white max-w-full rounded-3xl shadow-lg p-6 -mt-16">

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
            <div className="space-y-3">
              <Label>Usuário</Label>
              <div className="relative -top-2">
                <Input type="text" />
              </div>

              <Label>Senha</Label>
              <div className="relative -top-2">
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

            <form
              className="space-y-4 w-full max-w-[700px] px-4 mx-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Descrição PESSOA-FÍSICA */}
              <div className="text-sm text-gray-700 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-md">
                <strong>1- PESSOA-FÍSICA:</strong> Participante de Grupos Diversos; Clientes de Serviços & Produtos; Pesquisadores; Empreendedores; Estudantes e Funcionários/RH de Instituições.
              </div>
              {/* Nome público */}
              <Label>Nome público *</Label>
              <Input type="text" {...register('Nome')} error={errors.Nome?.message} />

              {/* Usuário */}
              <Label>Usuário *</Label>
              <Input type="text" {...register('Usuario')} error={errors.Usuario?.message} />

              {/* Telefone e repetir telefone */}
              <Label>Telefone *</Label>
              <Input type="tel" {...register('Telefone')} error={errors.Telefone?.message} />
              <Label>Repetir telefone</Label>
              <Input type="tel" {...register('Telefone')} />

              {/* E-mail e repetir e-mail */}
              <Label>E-mail *</Label>
              <Input type="email" {...register('Email')} error={errors.Email?.message} />
              <Label>Repetir e-mail</Label>
              <Input type="email" {...register('Email')} />

              {/* Senha e repetr senha */}
              <Label>Senha *</Label>
              <Input type="senha" {...register('Senha')} error={errors.Senha?.message} />
              <Label>Repetir Senha</Label>
              <Input type="senha" {...register('Senha')} />


              {/* País, Estado, Cidade e Bairro */}
              <div className="flex flex-wrap gap-4">
                {/* País */}
                <div className="flex-1 min-w-[200px] space-y-2">
                  <Label>País</Label>
                  <select
                    {...register('Pais')}
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="">Selecione o país</option>
                    {listaPaises.map(p => (
                      <option key={p.cca2} value={p.name.common}>{p.name.common}</option>
                    ))}
                  </select>
                </div>

                {/* Estado */}
                <div className="flex-1 min-w-[200px] space-y-2">
                  <Label>Estado (UF)</Label>
                  <select
                    {...register('Estado')}
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="">Selecione o estado</option>
                    {listaEstados.map(uf => (
                      <option key={uf.id} value={uf.sigla}>{uf.nome} ({uf.sigla})</option>
                    ))}
                  </select>
                </div>

                {/* Cidade */}
                <div className="flex-1 min-w-[200px] space-y-2">
                  <Label>Cidade</Label>
                  <Input type="text" {...register('Cidade')} />
                </div>

                {/* Bairro */}
                <div className="flex-1 min-w-[200px] space-y-2">
                  <Label>Bairro / Local / Região</Label>
                  <Input type="text" {...register('Bairro')} />
                </div>
              </div>



              {/* Data de nascimento */}
              <Label>Data de nascimento *</Label>
              <div className="flex gap-2">
                <Input placeholder="Dia" type="number" {...register('DiaNascimento')} />
                <Input placeholder="Mês" type="number" {...register('MesNascimento')} />
                <Input placeholder="Ano" type="number" {...register('AnoNascimento')} />
              </div>
              <p className="text-xs text-gray-500 -mt-2">Sua idade ficará sempre oculta.</p>

              <div className="space-y-3 mt-4">
                <Label>Por adicionar contato de comunicação (Até 3)</Label>
                <div className="border rounded-lg p-3 bg-gray-50 text-sm text-gray-600">
                  (Pais/Responsáveis, Cônjuge, Familiar, Parceria, etc.)
                </div>

                {contatosApoio.map((contato, index) => {
                  const usuarioField = `ContatosApoio.${index}.ContatoId` as const;
                  const nomeField = `ContatosApoio.${index}.NomeContato` as const;
                  const telefoneField = `ContatosApoio.${index}.TelefoneContato` as const;
                  const emailField = `ContatosApoio.${index}.EmailContato` as const;
                  const relacaoField = `ContatosApoio.${index}.Relacao` as const;

                  const nome = watch(nomeField);

                  const handleCancelar = () => {
                    setValue(usuarioField, 0);
                    setValue(nomeField, '');
                    setValue(telefoneField, '');
                    setValue(emailField, '');
                    setValue(relacaoField, '');
                  };

                  const handleExcluir = () => {
                    setContatosApoio((prev) => prev.filter((_, i) => i !== index));
                  };

                  const handleSalvar = () => {
                    setContatosApoio((prev) =>
                      prev.map((c, i) => (i === index ? { ...c, open: false, editando: false } : c))
                    );
                  };

                  const handleEditar = () => {
                    setContatosApoio((prev) =>
                      prev.map((c, i) => (i === index ? { ...c, open: true, editando: true } : c))
                    );
                  };

                  return (
                    <div key={index} className="bg-gray-100 rounded-lg p-3 space-y-3">
                      <div className="flex justify-between items-center bg-green-100 p-2 rounded-full">
                        <span className="text-sm font-medium text-gray-800 px-3">
                          {nome || `Contato ${index + 1}`}
                        </span>
                        <div className="flex gap-3 pr-2">
                          <button type="button" onClick={handleEditar} className="text-green-700 hover:text-green-900">
                            <FiEdit2 size={16} />
                          </button>
                          <button type="button" onClick={handleExcluir} className="text-red-600 hover:text-red-800">
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {contato.open && (
                        <div className="space-y-3">
                          <Input placeholder="Usuário *" {...register(usuarioField)} className="w-full rounded-xl text-sm" />
                          <Input placeholder="Nome *" {...register(nomeField)} className="w-full rounded-xl text-sm" />
                          <Input placeholder="Telefone *" {...register(telefoneField)} className="w-full rounded-xl text-sm" />
                          <Input placeholder="Relação *" {...register(relacaoField)} className="w-full rounded-xl text-sm" />
                          <Input placeholder="E-mail" {...register(emailField)} className="w-full rounded-xl text-sm" />

                          <div className="flex justify-end gap-3 pt-2">
                            <button
                              type="button"
                              onClick={handleCancelar}
                              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded-full"
                            >
                              ❌ Cancelar
                            </button>
                            <button
                              type="button"
                              onClick={handleSalvar}
                              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-full"
                            >
                              ✅ Salvar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {contatosApoio.length < 3 && (
                <button type="button" onClick={adicionarContato} className="flex items-center gap-2 text-green-700 mt-2 text-sm">
                  <FiPlus /> Adicionar outro contato
                </button>
              )}

              {/* Visibilidade */}
              <Label className="mt-4">A minha tela pública poderá ser vista por:</Label>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...register('Privacidade')} value="PUBLICO" />
                  Qualquer usuário do <span className="text-orange-500 font-semibold">GooAgro</span>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...register('Privacidade')} value="AMIGOS" />
                  Somente meus amigos do <span className="text-orange-500 font-semibold">GooAgro</span>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...register('Privacidade')} value="PRIVADO" />
                  Oculto - Ninguém poderá ver.
                </label>
              </div>

              <div className="pt-4 pb-24">
                <button type="submit" className="w-full bg-green-700 text-white py-2 rounded-full font-semibold hover:bg-green-800 transition">
                  Criar conta
                </button>
                <p className="text-[10px] text-gray-600 mt-5">
                  * Atendendo à Lei Geral de Proteção de Dados Pessoais Nº 13.709/18
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};