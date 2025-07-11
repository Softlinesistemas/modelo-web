'use client';

import React, { useState, useEffect } from 'react';
import { FiEye, FiEyeOff, FiChevronDown, FiChevronUp, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { FaWhatsapp, FaTelegramPlane, FaHome, FaPhoneAlt } from "react-icons/fa";
import { Input } from '@/utils/ui/Input';
import { Label } from '@/utils/ui/Label';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { userBasicSchema, UserBasicSchema } from '@/schemas/userSchema';
import { toast } from 'react-hot-toast';


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


  const [showWelcomeToast, setShowWelcomeToast] = useState(false);
  const onSubmit = (data: UserBasicSchema) => {
    console.log('Dados válidos:', data);
    setShowWelcomeToast(true);
    setTimeout(() => setShowWelcomeToast(false), 7000);
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
      <div className="h-48 w-full bg-cover bg-center rounded-b-[50px] opacity-30"
        style={{ backgroundImage: `url('/images/bg-auth.jpg')` }} />
      <div className="flex-1 bg-green-100 w-full flex items-start justify-center px-4 sm:px-6 md:px-10 shadow-md relative shadow-black">
        <div className="relative z-10 w-full max-w-3xl bg-white rounded-3xl shadow-2xl shadow-green-300 p-6 sm:p-8 -mt-16">

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
            <div className="space-y-3 gap-2">
              <Label>Usuário</Label>
              <div className="relative -top-1">
                <Input type="text" />
              </div>

              <Label>Senha</Label>
              <div className="relative -top-1">
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
              className="space-y-3 w-full px-8 mx-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Descrição PESSOA-FÍSICA */}
              <div className="text-sm text-gray-700 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-md">
                <strong>1- PESSOA-FÍSICA:</strong> Participante de Grupos Diversos; Clientes de Serviços & Produtos; Pesquisadores; Empreendedores; Estudantes e Funcionários/RH de Instituições.
              </div>
              {/* Nome público */}
              <Label>O seu nome público no GooAgro*</Label>
              <Input type="text" {...register('Nome')} error={errors.Nome?.message} />

              {/* Usuário */}
              <Label>Usuário*</Label>
              <Input type="text" {...register('Usuario')} error={errors.Usuario?.message} />


              {/* Telefone e repetir telefone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Campo: Telefone */}
                <div className="flex flex-col space-y-1">
                  <Label className="flex items-center gap-2">
                    <FaWhatsapp className="text-green-500" />
                    <FaTelegramPlane className="text-blue-700" />
                    <FaHome className="text-gray-600" />
                    Telefone *
                  </Label>
                  <Input type="tel" {...register('Telefone')} error={errors.Telefone?.message}
                    className="mt-1"
                  />
                </div>

                {/* Campo: Repetir Telefone */}
                <div className="flex flex-col space-y-1">
                  <Label className="flex items-center gap-2">
                    Repetir telefone
                  </Label>
                  <Input type="tel" {...register('Telefone')} error={errors.Telefone?.message}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* E-mail e repetir e-mail */}
              <Label>E-mail *</Label>
              <Input type="email" {...register('Email')} error={errors.Email?.message} />
              <p className="text-[10px] text-gray-600 mt-1">
                * Atendendo à Lei Geral de Proteção de Dados Pessoais Nº 13.709/18
              </p>
              <Label>Repetir e-mail</Label>
              <Input type="email" {...register('Email')} />

              {/* Usuário */}
              <Label>CPF</Label>
              <Input type="text" {...register('CPF')} error={errors.CPF?.message} />

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
              <div className="flex items-center justify-between">
                <Label>Data de nascimento *</Label>
                <p className="text-xs text-green-700">Sua idade ficará sempre oculta.</p>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Dia" type="number" {...register('DiaNascimento')} />
                <Input placeholder="Mês" type="number" {...register('MesNascimento')} />
                <Input placeholder="Ano" type="number" {...register('AnoNascimento')} />
              </div>



              {/* Contatos Apoio */}
              <div className="space-y-3 mt-4">
                <Label>Adicione mais contatos de comunicação (Até 3 - OPCIONAL)</Label>
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
                    const nomeAtual = watch(nomeField);

                    setContatosApoio((prev) =>
                      prev.map((c, i) =>
                        i === index ? { ...c, open: false, editando: false, nome: nomeAtual } : c
                      )
                    );
                  };

                  const handleEditar = () => {
                    setContatosApoio((prev) =>
                      prev.map((c, i) => (i === index ? { ...c, open: true, editando: true } : c))
                    );
                  };

                  const toggleOpen = () => {
                    setContatosApoio((prev) =>
                      prev.map((c, i) => (i === index ? { ...c, open: !c.open } : c))
                    );
                  };

                  return (
                    <div key={index} className="bg-gray-100 rounded-lg p-3 space-y-3">
                      <div className="flex justify-between items-center bg-green-100 p-2 rounded-full">
                        <span className="text-sm font-medium text-gray-800 px-3">
                          {nome || `Contato ${index + 1}`}
                        </span>
                        <div className="flex gap-3 pr-2">
                          {/* Botão de colapsar/expandir */}
                          <button
                            type="button"
                            onClick={toggleOpen}
                            className="text-gray-600 hover:text-gray-800"
                            title={contato.open ? 'Recolher' : 'Expandir'}
                          >
                            {contato.open ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                          </button>

                          {/* Ações padrão */}
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
                          <Input placeholder="Usuário *" {...register(usuarioField)} className="w-full rounded-xl text-md" />
                          <Input placeholder="Nome *" {...register(nomeField)} className="w-full rounded-xl text-md" />
                          <Input placeholder="Telefone *" {...register(telefoneField)} className="w-full rounded-xl text-md" />
                          <Input placeholder="Relação *" {...register(relacaoField)} className="w-full rounded-xl text-md" />
                          <Input placeholder="E-mail" {...register(emailField)} className="w-full rounded-xl text-md" />

                          <div className="flex justify-center gap-3 pt-2">
                            <button
                              type="button"
                              onClick={handleCancelar}
                              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded-md shadow"
                            >
                              ❌ Cancelar
                            </button>
                            <button
                              type="button"
                              onClick={handleSalvar}
                              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-md shadow h-12"
                            >
                              ✅ Salvar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {contatosApoio.length < 3 && (
                  <button
                    type="button"
                    onClick={adicionarContato}
                    className="flex items-center gap-2 text-green-700 mt-2 text-sm"
                  >
                    <FiPlus /> Adicionar outro contato
                  </button>
                )}
              </div>


              {/* Visibilidade */}
              <Label className="mt-4">A minha tela pública poderá ser vista por:</Label>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...register('Privacidade')} value="PUBLICO" />
                  Qualquer usuário do <span className="text-green-500 font-semibold">GooAgro</span>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...register('Privacidade')} value="AMIGOS" />
                  Somente meus amigos do <span className="text-green-500 font-semibold">GooAgro</span>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...register('Privacidade')} value="PRIVADO" />
                  Oculto - Ninguém poderá ver.
                </label>

                <div className="space-y-2 px-5 py-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" {...register('Privacidade')} value="true" /><a>
                      Autorizo receber mensagens vinculadas aos Meus Interesses e à minhas Atividades Profissionais.
                    </a>
                  </label>
                </div>
              </div>


              {/* Senha e repetr senha */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <Label>Senha *</Label>
                  <Input type="senha" {...register('Senha')} error={errors.Senha?.message} />
                </div>
                <div className="flex flex-col space-y-1">
                  <Label>Repetir Senha</Label>
                  <Input type="senha" {...register('Senha')} />
                </div>
              </div>
              <div className="space-y-2 px-5">
                {/* check box senha */}
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...register('Privacidade')} value="true" /><a>
                    Eu li e concordo com a Política de Privacidade do aplicativo GooAgro e
                    desejo me cadastrar gratuitamente.
                  </a>
                </label>
              </div>

              <div className="pt-4 pb-24">
                <button type="submit" className="w-full bg-green-700 text-white py-2 rounded-full font-semibold hover:bg-green-800 transition">
                  Criar conta
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};