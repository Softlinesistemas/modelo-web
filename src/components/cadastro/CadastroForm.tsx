"use client";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userBasicSchema, UserBasicSchema } from "@/schemas/userSchema";
import { Input } from "@/utils/ui/Input";
import { Label } from "@/utils/ui/Label";
import { toast } from "react-hot-toast";
import { info } from "console";
import { watch } from "fs";
import { MapPinPlus } from "lucide-react";
import { FaWhatsapp, FaTelegramPlane, FaHome } from "react-icons/fa";
import {
  FiChevronUp,
  FiChevronDown,
  FiEdit2,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";
import { SuggestionModal } from "../SuggestionModal";
import { InfoModal } from "./InfoModal";
import { cadastroInfo } from "./cadastroInfo";
import axios from "axios";
import z from "zod";
import { server } from "@/utils/server";
import { useRegister } from "@/hooks/mutations/useRegister";

interface Estado {
  id: number;
  sigla: string;
  nome: string;
}

interface Pais {
  name: { common: string };
  cca2: string;
}

type FormValues = z.infer<typeof userBasicSchema> & {
  RepetirSenha?: string; // só existe no front
};

export const CadastroForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    watch,
  } = useForm<UserBasicSchema>({
    resolver: zodResolver(userBasicSchema),
    mode: "onBlur",
    // reValidateMode: "onBlur",
    defaultValues: {
      Pais: "Brasil",
      TermosPrivacidade: false,
      //   Role: "USER",
      //   // ParticiparEvento: false,
      //   Privacidade: "PUBLICO",
    },
  });

  const { mutate: newUserRegister, isLoading: loadingRegister} = useRegister();
  console.log(errors);

  const [listaEstados, setListaEstados] = useState<Estado[]>([]);
  const [listaPaises, setListaPaises] = useState<Pais[]>([]);
  const [usarGps, setUsarGps] = useState(false);
  const [contatosApoio, setContatosApoio] = useState([{ open: false }]);
  const info = cadastroInfo.cadastroPrincipal;
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);

  const adicionarContato = () => {
    if (contatosApoio.length >= 3) return;
    setContatosApoio([...contatosApoio, { open: true }]);
  };

  const toggleContato = (index: number) => {
    setContatosApoio((prev) =>
      prev.map((c, i) => (i === index ? { ...c, open: !c.open } : c))
    );
  };

  const handleBuscarCep = async () => {
    const cep = watch("Cep");
    if (!cep || cep.length !== 7) {
      alert("Digite um CEP válido com 8 dígitos.");
      return;
    }

    try {
      const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await resp.json();

      if (data.erro) {
        alert("CEP não encontrado. Preencha manualmente.");
        setValue("Endereco", "");
        setValue("Bairro", "");
        setValue("Cidade", "");
        setValue("Estado", "");
        setValue("Pais", "Brasil");
      } else {
        setValue("Endereco", data.logradouro || "");
        setValue("Bairro", data.bairro || "");
        setValue("Cidade", data.localidade || "");
        setValue("Estado", data.uf || "");
        setValue("Pais", "Brasil");
      }
    } catch (err) {
      console.error("Erro ao buscar CEP:", err);
      alert("Erro ao buscar CEP.");
    }
  };

  const onSubmit = (data: UserBasicSchema) => {
    newUserRegister(data);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#B6D2B7] overflow-hidden">
      <div className="flex items-center justify-center min-h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Descrição PESSOA-FÍSICA */}
          <div className="text-sm text-black bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-md">
            <strong>1- PESSOA-FÍSICA:</strong> Participante de Grupos Diversos;
            Clientes de Serviços & Produtos; Pesquisadores; Empreendedores;
            Estudantes e Funcionários/RH de Instituições.
          </div>
          {/* Nome público */}
          <Label>O seu nome público no GooAgro*</Label>
          <Input
            type="text"
            placeholder="Digite seu usuário"
            {...register("Nome")} // agora registra o campo Usuario
            error={errors.Nome?.message} // exibe mensagem do Zod
          />

          {/* Usuário */}
          <Label>Usuário*</Label>
          <Input
            type="text"
            {...register("Usuario")}
            onBlur={() => trigger("Usuario")}
            error={errors.Usuario?.message}
          />
          {/* <input {...register("Usuario")} />
          {errors.Usuario && (
            <span className="text-red-500">{errors.Usuario.message}</span>
          )} */}

          {/* E-mail e repetir e-mail */}
          <div className="flex flex-col gap-2">
            <Label className="flex items-center gap-2">
              <span className="whitespace-nowrap text-black">E-MAIL *</span>
              <span className="text-[9px] !text-gray-700  bg-yellow-50 border-l-4 border-red-700 mb-1 p-3 rounded-md px-2 py-0.5 leading-tight text-justify">
                I - Para Confirmações e Recuperação de Senha – caso você perca o
                número do telefone cadastrado – temos versão WEB para Desktop /
                CPU.
                <br />
                II - Para Usuários que queiram – além do seu perfil pessoal –
                criar mais perfis: de Fornecedor; de Empresa; Instituição
                Pública ou Organização Social.
              </span>
            </Label>

            <Input
              type="email"
              {...register("Email")}
              error={errors.Email?.message}
            />

            <Label>Repetir e-mail</Label>
            <Input type="email" {...register("Email")} />
          </div>

          {/* Telefone e repetir telefone */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {/* Campo: Telefone */}
            <div className="flex flex-col space-y-1">
              <Label className="flex items-center gap-2">
                <FaWhatsapp className="text-green-500" />
                <FaTelegramPlane className="text-blue-700" />
                <FaHome className="text-black" />

                {/* Mantém Telefone + * juntos */}
                <span className="whitespace-nowrap">Telefone *</span>

                {/* Texto explicativo */}
                <span className="text-[8px] !text-gray-700 bg-yellow-50 border-l-4 border-red-700 rounded-md mb-1 px-1 py-1 leading-tight text-justify">
                  I - Para os Usuários que queiram telefonar de forma digital
                  dentro do GooAgro.
                </span>
              </Label>

              <Input
                type="tel"
                {...register("Telefone")}
                error={errors.Telefone?.message}
                className="mt-1"
              />
            </div>

            {/* Campo: Repetir Telefone */}
            <div className="flex flex-col space-y-1">
              <Label className="flex items-center gap-2">
                Repetir telefone
              </Label>
              <Input
                type="tel"
                {...register("Telefone")}
                error={errors.Telefone?.message}
                className="mt-1"
              />
            </div>
          </div>
          {/* CPF */}
          <Label className="flex items-center gap-2">
            <span className="whitespace-nowrap">CPF</span>
            {/* Texto explicativo */}
            <span className="text-[8px] !text-gray-700 bg-yellow-50 border-l-4 border-red-700 rounded-md mb-1 px-1 py-1 leading-tight text-justify">
              Para Usuários que queiram – além do seu perfil pessoal – criar
              mais perfis de: Grupos; Fornecedor; Empresa; Instituição Pública
              ou Organização Social.
            </span>
          </Label>
          <Input type="text" {...register("CPF")} error={errors.CPF?.message} />
          {/* Data de nascimento */}
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <span>Data de nascimento * </span>
              <span className="text-[10px] !text-green-900 bg-yellow-50 border-l-4 border-green-700 rounded-md mb-1 px-1 py-1 leading-tight text-justify">
                Sua idade ficará sempre oculta.
              </span>
            </Label>
          </div>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Dia"
              type="number"
              {...register("DiaNascimento", { valueAsNumber: true })}
            />
            <Input
              placeholder="Mês"
              type="number"
              {...register("MesNascimento", { valueAsNumber: true })}
            />
            <Input
              placeholder="Ano"
              type="number"
              {...register("AnoNascimento", { valueAsNumber: true })}
            />
          </div>
          <div className="flex justify-center items-center mb-1">
            <span className="text-xs !text-green-900 bg-yellow-50 border-l-4 border-r-4 border-orange-700 rounded-md mb-1 px-1 py-1 leading-tight justify-center">
              * Atendendo à Lei Geral de Proteção de Dados Pessoais Nº 13.709/18
            </span>
          </div>

          {/* País, Estado, Cidade e Bairro */}
          <div className="flex flex-wrap gap-4">
            {/* País */}
            <div className="flex-1 min-w-[200px] space-y-2">
              <Label>País</Label>
              <Input
                type="text"
                {...register("Pais")}
                className="w-full border rounded-lg p-2"
              >
                {/* <option value="">Selecione o país</option>
                {listaPaises.map((p) => (
                  <option key={p.cca2} value={p.name.common}>
                    {p.name.common}
                  </option> 
                {/* ))} */}
              </Input>
            </div>

            {/* Estado */}
            <div className="flex-1 min-w-[200px] space-y-2">
              <Label>Estado (UF)</Label>
              <Input
                {...register("Estado")}
                className="w-full border rounded-lg p-2"
              >
                {/* <option value="">Selecione o estado</option>
                {listaEstados.map((uf) => (
                  <option key={uf.id} value={uf.sigla}>
                    {uf.nome} ({uf.sigla})
                  </option>
                ))} */}
              </Input>
            </div>

            {/* Cidade */}
            <div className="flex-1 min-w-[200px] space-y-2">
              <Label>Cidade</Label>
              <Input type="text" {...register("Cidade")} />
            </div>
          </div>
          {/* Bairro */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Label className="flex items-center gap-2 bg-green-300 rounded-md shadow-md p-1 justify-center">
              <span className="ml-2">ENDEREÇO (OPCIONAL)</span>
            </Label>
            <span className="text-[8px] !text-red-900 bg-yellow-50 border-l-4 font-semibold  border-red-700 rounded-md mb-1 px-2 py-1 leading-tight text-justify">
              Para Usuários que queiram – além do seu perfil pessoal – criar
              perfil de: Grupos / Fornecedor Pessoa Física / Profissional
              Autônomo / Diarista.
            </span>
            {/* Campos do endereço */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 w-full">
              {/* CEP */}
              <div className="flex flex-col">
                <Label className="mb-1">CEP</Label>
                <Input type="text" {...register("Cep")} />
              </div>

              {/* Bairro */}
              <div className="flex flex-col">
                <Label className="mb-1">Bairro</Label>
                <Input type="text" {...register("Bairro")} />
              </div>

              {/* Endereço */}
              <div className="flex flex-col">
                <Label className="mb-1">Endereço</Label>
                <Input type="text" {...register("Endereco")} />
              </div>
            </div>
            {/* GPS */}
            <div className="mt-2 flex flex-col w-full gap-2 mb-2">
              <Label className="flex items-center gap-2 bg-green-300 rounded-md shadow-md p-1 justify-center">
                <MapPinPlus size={20} /> <span>Localização GPS</span>
              </Label>

              <label className="flex items-center gap-2 text-sm justify-center">
                <input
                  type="checkbox"
                  checked={usarGps}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setUsarGps(checked);

                    if (!checked) {
                      const cepValue = watch("Cep");
                      if (!cepValue || cepValue.trim() === "") {
                        alert("Preencha o CEP antes de ativar o GPS.");
                        setUsarGps(false);
                        return;
                      }

                      navigator.geolocation.getCurrentPosition(
                        (pos) => {
                          // setValue("Latitude", pos.coords.latitude);
                          // setValue("Longitude", pos.coords.longitude);
                        },
                        () => {
                          alert("Não foi possível obter a localização.");
                          setUsarGps(false);
                        }
                      );
                    } else {
                      // setValue("Latitude", undefined);
                      // setValue("Longitude", undefined);
                    }
                  }}
                />
                <span> Quer marcar a sua localização com GPS? </span>
              </label>

              {/* Campos ocultos de latitude e longitude */}
              <input
                type="hidden"
                // {...register("Latitude")}
              />
              <input
                type="hidden"
                // {...register("Longitude")}
              />
            </div>
          </div>

          {/* Contatos Apoio */}
          <div className="w-full mt-4">
            <Label className="border mb-1 text-sm text-black flex flex-col gap-0 bg-green-300 rounded-md shadow-md justify-center p-1 text-center">
              <span>Quer adicionar Apoio de Comunicação? (Até 3)</span>
              <span className="text-xs">
                (Pais/Responsáveis, Cônjuge, Familiar, Parceria, etc.)
              </span>
            </Label>

            {contatosApoio.map((contato, index) => {
              const usuarioField = `ContatosApoio.${index}.ContatoId` as const;
              const nomeField = `ContatosApoio.${index}.NomeContato` as const;
              const telefoneField =
                `ContatosApoio.${index}.TelefoneContato` as const;
              const emailField = `ContatosApoio.${index}.EmailContato` as const;
              const relacaoField = `ContatosApoio.${index}.Relacao` as const;

              const nome = watch(nomeField);

              const handleCancelar = () => {
                setValue(usuarioField, 0);
                setValue(nomeField, "");
                setValue(telefoneField, "");
                setValue(emailField, "");
                setValue(relacaoField, "");
              };

              const handleExcluir = () => {
                setContatosApoio((prev) => prev.filter((_, i) => i !== index));
              };

              const handleSalvar = () => {
                const nomeAtual = watch(nomeField);

                setContatosApoio((prev) =>
                  prev.map((c, i) =>
                    i === index
                      ? {
                          ...c,
                          open: false,
                          editando: false,
                          nome: nomeAtual,
                        }
                      : c
                  )
                );
              };

              const handleEditar = () => {
                setContatosApoio((prev) =>
                  prev.map((c, i) =>
                    i === index ? { ...c, open: true, editando: true } : c
                  )
                );
              };

              const toggleOpen = () => {
                setContatosApoio((prev) =>
                  prev.map((c, i) =>
                    i === index ? { ...c, open: !c.open } : c
                  )
                );
              };

              return (
                <div key={index} className="rounded-lg p-3 space-y-3">
                  <div className="flex justify-between items-center bg-green-100 p-2 rounded-full">
                    <span className="text-sm font-medium text-gray-800 px-3">
                      {nome || `Contato ${index + 1}`}
                    </span>
                    <div className="flex gap-3 pr-2">
                      {/* Botão de colapsar/expandir */}
                      <button
                        type="button"
                        onClick={toggleOpen}
                        className="text-black hover:text-gray-800"
                        title={contato.open ? "Recolher" : "Expandir"}
                      >
                        {contato.open ? (
                          <FiChevronUp size={16} />
                        ) : (
                          <FiChevronDown size={16} />
                        )}
                      </button>

                      {/* Ações padrão */}
                      <button
                        type="button"
                        onClick={handleEditar}
                        className="text-green-700 hover:text-green-900"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={handleExcluir}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {contato.open && (
                    <div className="space-y-3">
                      <Input
                        placeholder="Usuário *"
                        {...register(usuarioField)}
                        className="w-full rounded-xl text-md border-green-700"
                      />
                      <Input
                        placeholder="Nome *"
                        {...register(nomeField)}
                        className="w-full rounded-xl text-md border-green-700"
                      />
                      <Input
                        placeholder="Telefone *"
                        {...register(telefoneField)}
                        className="w-full rounded-xl text-md border-green-700"
                      />
                      <Input
                        placeholder="Relação *"
                        {...register(relacaoField)}
                        className="w-full rounded-xl text-md border-green-700"
                      />
                      <Input
                        placeholder="E-mail"
                        {...register(emailField)}
                        className="w-full rounded-xl text-md border-green-700"
                      />

                      <div className="flex justify-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={handleCancelar}
                          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded-md shadow"
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          onClick={handleSalvar}
                          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-md shadow h-12"
                        >
                          Salvar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {contatosApoio.length < 3 && (
              <div className="flex justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={adicionarContato}
                  className="flex items-center gap-2 text-white mt-2 text-sm p-2 uppercase rounded-md justify-center bg-green-700"
                >
                  <FiPlus /> Adicionar mais Contato Apoio de Comunicação
                </button>
              </div>
            )}
          </div>
          {/* Visibilidade */}

          <div className="space-y-2 pt-2">
            <Label className="border p-2 mb-1 justify-center text-sm text-black flex items-center gap-2 bg-green-300 rounded-md shadow-md">
              A MINHA TELA-PÚBLICA PODERÁ SER VISTA POR:
            </Label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                {...register("Privacidade")}
                value="PUBLICO"
              />
              Qualquer usuário do{" "}
              <span className="text-green-500 font-semibold">GooAgro</span>
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input type="radio" {...register("Privacidade")} value="AMIGOS" />
              Somente meus AMIGOS do{" "}
              <span className="text-green-500 font-semibold">GooAgro</span>
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                {...register("Privacidade")}
                value="PRIVADO"
              />
              Oculto - Ninguém poderá ver.
            </label>
          </div>

          <div className="space-y-2 px-5 p-4">
            <Label className="flex items-center gap-2 text-sm border p-2 mb-1 bg-green-300 rounded-md shadow-md">
              <input type="checkbox" {...register("ReceberAnuncios")} />
              Autorizo receber mensagens vinculadas aos Meus Interesses e às
              minhas Atividades Profissionais.
            </Label>
          </div>

          {/* Senha e repetir senha */}
          <div className="grid grid-cols-1 gap-4">
            {/* Senha */}
            <div className="flex flex-col gap-2">
              <Label>
                Senha *{" "}
                <span className="text-xs !text-red-600">
                  (6 - 8 Carac./ 1 Letra)
                </span>
              </Label>
              <Input
                type="password"
                {...register("Senha", {
                  required: "Senha é obrigatória",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                  maxLength: { value: 8, message: "Máximo 8 caracteres" },
                  pattern: {
                    value: /[A-Za-z]/,
                    message: "A senha deve conter pelo menos 1 letra",
                  },
                })}
                error={errors.Senha?.message}
              />
            </div>

            {/* Repetir Senha */}
            <div className="flex flex-col gap-2">
              <Label>Repetir Senha</Label>
              <Input
                type="password"
                {...register("Senha", {
                  validate: (value) =>
                    value === watch("Senha") || "As senhas não conferem",
                })}
              />
            </div>
          </div>

          <div className="space-y-2 px-5">
            {/* check box senha */}
            <Label className="border p-3 mb-1 text-sm text-black flex items-center gap-2 bg-green-300 rounded-md shadow-md">
              <input type="checkbox" {...register("TermosPrivacidade")} />
              <a>
                Eu li e concordo com a Política de Privacidade do aplicativo
                GooAgro e desejo me cadastrar gratuitamente.
              </a>
            </Label>
          </div>
          <div className="pt-4 pb-24">
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded-full font-semibold hover:bg-green-800 transition"
            >
              Criar conta
            </button>
          </div>
        </form>

        {showInfoModal && (
          <InfoModal title={info.title} content={info.content} />
        )}
        {showSuggestionModal && (
          <SuggestionModal onClose={() => setShowSuggestionModal(false)} />
        )}
      </div>
    </div>
  );
};
