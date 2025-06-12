'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';

type Privacidade = 'qualquer' | 'amigos' | 'oculta';
type Escolaridade =
  | 'sem_escolaridade'
  | 'fundamental'
  | 'medio'
  | 'tecnico'
  | 'superior'
  | 'pos_lato'
  | 'pos_stricto'
  | 'doutorado'
  | 'pos_doutorado';

type Genero = 'masculino' | 'feminino' | 'outro' | 'prefiro_nao_dizer';
type Raca = 'branco' | 'preto' | 'pardo' | 'indigena' | 'amarelo' | 'outro';

interface Atividade {
  id: number;
  nome: string;
}

interface CondicaoEspecial {
  id: number;
  descricao: string;
}

interface FotoAlbum {
  id: number;
  arquivo: File | null;
  legenda: string;
}

export default function Cadastro() {
  // Estados dos campos
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [nomePublico, setNomePublico] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [contato, setContato] = useState(''); // WhatsApp ou Telegram
  const [pais, setPais] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [privacidade, setPrivacidade] = useState<Privacidade>('qualquer');
  const [senha, setSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');
  const [infoAdicional, setInfoAdicional] = useState('');
  const [atividadePrincipal, setAtividadePrincipal] = useState('');
  const [outrasAtividades, setOutrasAtividades] = useState<Atividade[]>([]);
  const [souFuncionario, setSouFuncionario] = useState(false);
  const [souEstudante, setSouEstudante] = useState(false);
  const [escolaridade, setEscolaridade] = useState<Escolaridade>('sem_escolaridade');
  const [condEspecial, setCondEspecial] = useState(false);
  const [condicoesEspeciais, setCondicoesEspeciais] = useState<CondicaoEspecial[]>([]);
  const [genero, setGenero] = useState<Genero>('prefiro_nao_dizer');
  const [raca, setRaca] = useState<Raca>('outro');
  const [povosTradicionais, setPovosTradicionais] = useState('');
  const [bioma, setBioma] = useState('');
  const [divisaoGeopolitica, setDivisaoGeopolitica] = useState('');
  const [apresentacao, setApresentacao] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [fotoPerfilPreview, setFotoPerfilPreview] = useState<string | null>(null);
  const [albumFotos, setAlbumFotos] = useState<FotoAlbum[]>([]);
  const [temasInteresse, setTemasInteresse] = useState('');
  const [querReceberInfo, setQuerReceberInfo] = useState(false);

  // Contatos sociais
  const [site, setSite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [youtube, setYoutube] = useState('');
  const [linktree, setLinktree] = useState('');

  // Para dar id dinâmico
  const nextId = () => Date.now() + Math.random();

  const [divisaoGeo, setDivisaoGeo] = useState("");
  const [receberInformacoes, setReceberInformacoes] = useState(false);
  const [contatoSite, setContatoSite] = useState("");
  const [contatoWhatsapp, setContatoWhatsapp] = useState("");
  const [contatoFacebook, setContatoFacebook] = useState("");
  const [contatoInstagram, setContatoInstagram] = useState('');
  const [contatoYoutube, setContatoYoutube] = useState('');
  const [contatoLinktree, setContatoLinktree] = useState('');


  // Função para adicionar uma atividade dinâmica
  function addAtividade() {
    setOutrasAtividades([...outrasAtividades, { id: nextId(), nome: '' }]);
  }

  // Função para remover atividade
  function removeAtividade(id: number) {
    setOutrasAtividades(outrasAtividades.filter(a => a.id !== id));
  }

  // Atualizar nome da atividade
  function updateAtividade(id: number, nome: string) {
    setOutrasAtividades(
      outrasAtividades.map(a => (a.id === id ? { ...a, nome } : a))
    );
  }

  // Adicionar condição especial dinâmica
  function addCondicaoEspecial() {
    setCondicoesEspeciais([...condicoesEspeciais, { id: nextId(), descricao: '' }]);
  }

  // Remover condição especial
  function removeCondicaoEspecial(id: number) {
    setCondicoesEspeciais(condicoesEspeciais.filter(c => c.id !== id));
  }

  // Atualizar descrição condição especial
  function updateCondicaoEspecial(id: number, descricao: string) {
    setCondicoesEspeciais(
      condicoesEspeciais.map(c => (c.id === id ? { ...c, descricao } : c))
    );
  }

  // Upload e preview foto de perfil
  function handleFotoPerfilChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setFotoPerfil(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setFotoPerfilPreview(url);
    } else {
      setFotoPerfilPreview(null);
    }
  }

  // Adicionar foto no álbum (dinâmico)
  function addFotoAlbum() {
    setAlbumFotos([...albumFotos, { id: nextId(), arquivo: null, legenda: '' }]);
  }

  function removeFotoAlbum(id: number) {
    setAlbumFotos(albumFotos.filter(f => f.id !== id));
  }

  function updateFotoAlbumFile(id: number, file: File | null) {
    setAlbumFotos(
      albumFotos.map(f => (f.id === id ? { ...f, arquivo: file } : f))
    );
  }

  function updateFotoAlbumLegenda(id: number, legenda: string) {
    setAlbumFotos(
      albumFotos.map(f => (f.id === id ? { ...f, legenda } : f))
    );
  }

  // Submit geral
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Aqui você faria a validação final, envio pra API etc
    const formData = {
      nome,
      dataNascimento,
      nomePublico,
      usuario,
      email,
      contato,
      pais,
      estado,
      cidade,
      bairro,
      privacidade,
      senha,
      repetirSenha,
      infoAdicional,
      atividadePrincipal,
      outrasAtividades,
      souFuncionario,
      souEstudante,
      escolaridade,
      condEspecial,
      condicoesEspeciais,
      genero,
      raca,
      povosTradicionais,
      bioma,
      divisaoGeopolitica,
      apresentacao,
      fotoPerfil,
      albumFotos,
      temasInteresse,
      querReceberInfo,
      site,
      facebook,
      instagram,
      youtube,
      linktree,
    };
    console.log('Formulário enviado:', formData);
    alert('Cadastro realizado! Veja o console para os dados.');
  }

  function handleAlbumFotoChange(id: number, e: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.');
  }

  function updateLegenda(id: number, value: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="min-h-screen bg-green-50 px-4 py-6 sm:px-10 max-w-4xl mx-auto">
      <main>
        <h1 className="text-3xl font-serif font-bold text-green-800 mb-6 text-center">
          Cadastre-se na GooAgro!
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-6"
        >
          {/* País, Estado, Cidade, Bairro */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4">
            <div>
              <label htmlFor="pais" className="block font-semibold text-green-700 mb-1">
                País
              </label>
              <input
                id="pais"
                type="text"
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                placeholder="Brasil"
                className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="estado" className="block font-semibold text-green-700 mb-1">
                Estado
              </label>
              <input
                id="estado"
                type="text"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                placeholder="CE, SP, RJ..."
                className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="cidade" className="block font-semibold text-green-700 mb-1">
                Cidade
              </label>
              <input
                id="cidade"
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                placeholder="Fortaleza, São Paulo..."
                className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="bairro" className="block font-semibold text-green-700 mb-1">
                Bairro (Opcional)
              </label>
              <input
                id="bairro"
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                placeholder="Centro, Aldeota..."
                className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          {/* Nome */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <label htmlFor="nome" className="block font-semibold text-green-700 mb-1">
                Nome completo
              </label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                placeholder="Seu nome da roça"
                className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Data de nascimento */}
            <div>
              <label
                htmlFor="dataNascimento"
                className="block font-semibold text-green-700 mb-1"
              >
                Data de nascimento (LGPT 13.709/18)
              </label>
              <input
                id="dataNascimento"
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Nome público */}
            <div>
              <label htmlFor="nomePublico" className="block font-semibold text-green-700 mb-1">
                Nome público (como quer ser chamado)
              </label>
              <input
                id="nomePublico"
                type="text"
                value={nomePublico}
                onChange={(e) => setNomePublico(e.target.value)}
                placeholder="Nome pra galera reconhecer"
                className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Usuário */}
            <div>
              <label htmlFor="usuario" className="block font-semibold text-green-700 mb-1">
                Usuário
              </label>
              <input
                id="usuario"
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Nome de usuário"
                required
                className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* E-mail */}
            <div>
              <label htmlFor="email" className="block font-semibold text-green-700 mb-1">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemplo.com"
                required
                className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                autoComplete="email"
              />
            </div>

            {/* Número WhatsApp ou Telegram */}
            <div>
              <label htmlFor="contato" className="block font-semibold text-green-700 mb-1">
                Número do Whatsapp ou Telegram
              </label>
              <input
                id="contato"
                type="tel"
                value={contato}
                onChange={(e) => setContato(e.target.value)}
                placeholder="+55 12 34567-8910"
                className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* Privacidade (radio) */}
            <fieldset>
              <legend className="font-semibold text-green-700 mb-1">Privacidade do perfil</legend>
              <div className="flex gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="privacidade"
                    value="qualquer"
                    checked={privacidade === 'qualquer'}
                    onChange={() => setPrivacidade('qualquer')}
                  />
                  Qualquer usuário do GooAgro
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="privacidade"
                    value="amigos"
                    checked={privacidade === 'amigos'}
                    onChange={() => setPrivacidade('amigos')}
                  />
                  Somente amigos do GooAgro
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="privacidade"
                    value="oculta"
                    checked={privacidade === 'oculta'}
                    onChange={() => setPrivacidade('oculta')}
                  />
                  Oculta
                </label>
              </div>
            </fieldset>
          </div>

          {/* Senha e Repita Senha - lado a lado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Campo Senha */}
            <div>
              <label htmlFor="senha" className="block font-semibold text-green-700 mb-1">
                Senha
              </label>
              <input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite uma senha segura"
                required
                className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                autoComplete="new-password"
              />
            </div>

            {/* Campo Repita Senha */}
            <div>
              <label htmlFor="repetirSenha" className="block font-semibold text-green-700 mb-1">
                Repita a Senha
              </label>
              <input
                id="repetirSenha"
                type="password"
                value={repetirSenha}
                onChange={(e) => setRepetirSenha(e.target.value)}
                placeholder="Repetir senha"
                required
                className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                autoComplete="new-password"
              />
            </div>
          </div>
          {/* Botão enviar */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-green-700 text-white font-semibold py-3 rounded hover:bg-green-800 transition"
            >
              Cadastrar
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Informações adicionais */}
            <div>
              <label
                htmlFor="infoAdicional"
                className="block font-semibold text-green-700 mb-1"
              >
                Informações adicionais
              </label>
              <textarea
                id="infoAdicional"
                rows={3}
                value={infoAdicional}
                onChange={(e) => setInfoAdicional(e.target.value)}
                placeholder="Conte um pouco sobre você"
                className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Atividade principal (simples input text por ora) */}
            <div>
              <label
                htmlFor="atividadePrincipal"
                className="block font-semibold text-green-700 mb-1"
              >
                Atividade principal (CBO)
              </label>
              <input
                id="atividadePrincipal"
                type="text"
                value={atividadePrincipal}
                onChange={(e) => setAtividadePrincipal(e.target.value)}
                placeholder="Ex: Agricultor, Programador"
                className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div>
            {/* Outras atividades profissionais (dinâmico) */}
            <div>
              <label className="block font-semibold text-green-700 mb-2">
                Outras atividades profissionais
              </label>
              {outrasAtividades.map((atividade, idx) => (
                <div key={atividade.id} className="flex gap-2 mb-2 items-center">
                  <input
                    type="text"
                    value={atividade.nome}
                    onChange={(e) => updateAtividade(atividade.id, e.target.value)}
                    placeholder={`Atividade #${idx + 1}`}
                    className="flex-grow border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeAtividade(atividade.id)}
                    className="text-red-600 font-bold px-2 rounded hover:bg-red-100"
                    title="Remover atividade"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addAtividade}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                + Adicionar atividade
              </button>
            </div>

            {/* Sou funcionário (checkbox) */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="souFuncionario"
                checked={souFuncionario}
                onChange={() => setSouFuncionario(!souFuncionario)}
              />
              <label htmlFor="souFuncionario" className="font-semibold text-green-700">
                Sou funcionário
              </label>
            </div>

            {/* Sou estudante (checkbox) */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="souEstudante"
                checked={souEstudante}
                onChange={() => setSouEstudante(!souEstudante)}
              />
              <label htmlFor="souEstudante" className="font-semibold text-green-700">
                Sou estudante
              </label>
            </div>

            {/* Condição especial? (checkbox) */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="condEspecial"
                checked={condEspecial}
                onChange={() => setCondEspecial(!condEspecial)}
              />
              <label htmlFor="condEspecial" className="font-semibold text-green-700">
                Condição especial?
              </label>
            </div>

            {/* Condições especiais (dinâmico) - só aparece se condEspecial true */}
            {condEspecial && (
              <div>
                <label className="block font-semibold text-green-700 mb-2">
                  Condições especiais
                </label>
                {condicoesEspeciais.map((cond, idx) => (
                  <div key={cond.id} className="flex gap-2 mb-2 items-center">
                    <input
                      type="text"
                      value={cond.descricao}
                      onChange={(e) => updateCondicaoEspecial(cond.id, e.target.value)}
                      placeholder={`Condição #${idx + 1}`}
                      className="flex-grow border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeCondicaoEspecial(cond.id)}
                      className="text-red-600 font-bold px-2 rounded hover:bg-red-100"
                      title="Remover condição"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCondicaoEspecial}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  + Adicionar condição
                </button>
              </div>
            )}

            {/* Gênero (select) */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 py-6'>
               {/* Nível de escolaridade (select) */}
            <div>
              <label htmlFor="escolaridade" className="block font-semibold text-green-700 mb-1">
                Nível de escolaridade
              </label>
              <select
                id="escolaridade"
                value={escolaridade}
                onChange={(e) => setEscolaridade(e.target.value as Escolaridade)}
                className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="sem_escolaridade">Sem Escolaridade</option>
                <option value="fundamental">Ensino Fundamental</option>
                <option value="medio">Ensino Médio</option>
                <option value="tecnico">Ensino Técnico</option>
                <option value="superior">Ensino Superior</option>
                <option value="pos_lato">Pós-Graduação Lato Sensu (Especialização)</option>
                <option value="pos_stricto">Pós-Graduação Stricto Sensu (Mestrado)</option>
                <option value="doutorado">Doutorado</option>
                <option value="pos_doutorado">Pós-Doutorado</option>
              </select>
            </div>
              <div>
                <label htmlFor="genero" className="block font-semibold text-green-700 mb-1">
                  Gênero
                </label>
                <select
                  id="genero"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value as Genero)}
                  className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                  <option value="prefiro_nao_dizer">Prefiro não dizer</option>
                </select>
              </div>

              {/* Raça (select) */}
              <div>
                <label htmlFor="raca" className="block font-semibold text-green-700 mb-1">
                  Raça
                </label>
                <select
                  id="raca"
                  value={raca}
                  onChange={(e) => setRaca(e.target.value as Raca)}
                  className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="branco">Branco</option>
                  <option value="preto">Preto</option>
                  <option value="pardo">Pardo</option>
                  <option value="indigena">Indígena</option>
                  <option value="amarelo">Amarelo</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              {/* Povos tradicionais */}
              <div>
                <label htmlFor="povosTradicionais" className="block font-semibold text-green-700 mb-1">
                  Povos tradicionais
                </label>
                <input
                  id="povosTradicionais"
                  type="text"
                  value={povosTradicionais}
                  onChange={(e) => setPovosTradicionais(e.target.value)}
                  placeholder="Ex: Quilombolas, Indígenas"
                  className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Bioma - automatizado? Por ora input */}
              <div>
                <label htmlFor="bioma" className="block font-semibold text-green-700 mb-1">
                  Bioma (automatizar futuramente)
                </label>
                <input
                  id="bioma"
                  type="text"
                  value={bioma}
                  onChange={(e) => setBioma(e.target.value)}
                  placeholder="Caatinga, Amazônia..."
                  className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Divisão geopolítica - automatizar? Por ora input */}
              <div>
                <label htmlFor="divisaoGeo" className="block font-semibold text-green-700 mb-1">
                  Divisão geopolítica (automatizar futuramente)
                </label>
                <input
                  id="divisaoGeo"
                  type="text"
                  value={divisaoGeo}
                  onChange={(e) => setDivisaoGeo(e.target.value)}
                  placeholder="Ex: Região Nordeste, Microrregião..."
                  className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              </div>
              <div>

              {/* Apresentação (bio) */}
              <div>
                <label htmlFor="apresentacao" className="block font-semibold text-green-700 mb-1">
                  Apresentação (Bio)
                </label>
                <textarea
                  id="apresentacao"
                  rows={4}
                  value={apresentacao}
                  onChange={(e) => setApresentacao(e.target.value)}
                  placeholder="Fale sobre você"
                  className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            {/* Foto de perfil */}
            <div>
              <label htmlFor="fotoPerfil" className="block font-semibold text-green-700 mb-1">
                Foto de perfil
              </label>
              <input
                id="fotoPerfil"
                type="file"
                accept="image/*"
                onChange={handleFotoPerfilChange}
                className="w-full"
              />
              {fotoPerfilPreview && (
                <img
                  src={fotoPerfilPreview}
                  alt="Pré-visualização da foto de perfil"
                  className="mt-2 w-32 h-32 object-cover rounded-full border border-green-300"
                />
              )}
            </div>

            {/* Álbum de fotos (dinâmico) */}
            <div>
              <label className="block font-semibold text-green-700 mb-2 mt-4">Álbum de fotos</label>
              {albumFotos.map((foto, idx) => (
                <div key={foto.id} className="flex items-center gap-2 mb-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleAlbumFotoChange(foto.id, e)}
                    className="flex-grow"
                  />
                  <input
                    type="text"
                    placeholder="Legenda"
                    value={foto.legenda}
                    onChange={(e) => updateLegenda(foto.id, e.target.value)}
                    className="border border-green-300 rounded px-2 py-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeFotoAlbum(foto.id)}
                    className="text-red-600 font-bold px-2 rounded hover:bg-red-100"
                    title="Remover foto"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFotoAlbum}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                + Adicionar foto
              </button>
            </div>

            {/* Temas de interesse */}
            <div>
              <label htmlFor="temasInteresse" className="block font-semibold text-green-700 mb-1 mt-4">
                Temas de interesse (separados por vírgula)
              </label>
              <input
                id="temasInteresse"
                type="text"
                value={temasInteresse}
                onChange={(e) => setTemasInteresse(e.target.value)}
                placeholder="Meio ambiente, Tecnologia, Saúde"
                className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Receber informações e convites? (checkbox) */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="receberInformacoes"
                checked={receberInformacoes}
                onChange={() => setReceberInformacoes(!receberInformacoes)}
              />
              <label htmlFor="receberInformacoes" className="font-semibold text-green-700">
                Deseja receber informações e convites para participar de grupos com os seus temas de interesse?
              </label>
            </div>

            {/* Contatos (Whatsapp, Site, Facebook, Instagram, Youtube, Linktree) */}
            <fieldset className="mt-4">
              <legend className="font-semibold text-green-700 mb-2">Contatos</legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contatoWhatsapp" className="block font-semibold text-green-700 mb-1">
                    Whatsapp ou Telegram
                  </label>
                  <input
                    id="contatoWhatsapp"
                    type="text"
                    value={contatoWhatsapp}
                    onChange={(e) => setContatoWhatsapp(e.target.value)}
                    placeholder="+55 12 34567-8910"
                    className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="contatoSite" className="block font-semibold text-green-700 mb-1">
                    Site
                  </label>
                  <input
                    id="contatoSite"
                    type="url"
                    value={contatoSite}
                    onChange={(e) => setContatoSite(e.target.value)}
                    placeholder="https://"
                    className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="contatoFacebook" className="block font-semibold text-green-700 mb-1">
                    Facebook
                  </label>
                  <input
                    id="contatoFacebook"
                    type="url"
                    value={contatoFacebook}
                    onChange={(e) => setContatoFacebook(e.target.value)}
                    placeholder="https://facebook.com/usuario"
                    className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="contatoInstagram" className="block font-semibold text-green-700 mb-1">
                    Instagram
                  </label>
                  <input
                    id="contatoInstagram"
                    type="url"
                    value={contatoInstagram}
                    onChange={(e) => setContatoInstagram(e.target.value)}
                    placeholder="https://instagram.com/usuario"
                    className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="contatoYoutube" className="block font-semibold text-green-700 mb-1">
                    Youtube
                  </label>
                  <input
                    id="contatoYoutube"
                    type="url"
                    value={contatoYoutube}
                    onChange={(e) => setContatoYoutube(e.target.value)}
                    placeholder="https://youtube.com/usuario"
                    className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="contatoLinktree" className="block font-semibold text-green-700 mb-1">
                    Linktree
                  </label>
                  <input
                    id="contatoLinktree"
                    type="url"
                    value={contatoLinktree}
                    onChange={(e) => setContatoLinktree(e.target.value)}
                    placeholder="https://linktr.ee/usuario"
                    className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </fieldset>
          </div>
        </form>
      </main>
    </div >
  );
}