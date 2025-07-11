// app/editar-perfil/page.tsx
'use client';
import { useState, useRef } from "react";
import { Camera, Save, Trash2, MapPin, Link as LinkIcon } from "react-feather";
import VinculosSociais from "@/components/VinculosSociais";

export default function EditarPerfilPage() {
  // Estados para os campos do formulário
  const [nome, setNome] = useState("Professor Agrônomo Beltrano Oliveira");
  const [usuario, setUsuario] = useState("@profbeltranooliveira");
  const [cidade, setCidade] = useState("Queimadas, Bahia, Brasil");
  const [bairro, setBairro] = useState("Colina do Sol");
  const [telefone, setTelefone] = useState("(99) 99999-9999");
  const [email, setEmail] = useState("beltrano.oliveira@gmail.com");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [genero, setGenero] = useState("");
  const [racaCor, setRacaCor] = useState("");
  const [apresentacao, setApresentacao] = useState("Sou ENGENHEIRO AGRÔNOMO, 1996, 2023. Sua principal área de atuação é promover o desenvolvimento sustentável...");
  const [atividadePrincipal, setAtividadePrincipal] = useState("ENGENHARIA AGRÔNOMA");
  const [outrasAtividades, setOutrasAtividades] = useState(["GEOREFERÊNCIA"]);
  const [participaEventos, setParticipaEventos] = useState(true);
  const [armazenamentoMensagens, setArmazenamentoMensagens] = useState("90 dias");
  const [gpsMarcado, setGpsMarcado] = useState(false);
  const [links, setLinks] = useState(["https://www.gov.br/mda/pt-br", "https://linktr.ee/mda"]);
  const [contatosAdicionais, setContatosAdicionais] = useState([
    { nome: "Maria Oliveira", usuario: "@mariaoliveira", telefone: "(99) 9 9999-9999", relacao: "Cônjuge" }
  ]);
  const [novaAtividade, setNovaAtividade] = useState("");
  const [novoLink, setNovoLink] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Funções para manipulação dos dados
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    // Aqui você processaria a imagem selecionada
  };

  const openCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute("capture", "environment");
      fileInputRef.current.click();
    }
  };

  const openGallery = () => {
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute("capture");
      fileInputRef.current.click();
    }
  };

  const adicionarAtividade = () => {
    if (novaAtividade.trim()) {
      setOutrasAtividades([...outrasAtividades, novaAtividade]);
      setNovaAtividade("");
    }
  };

  const removerAtividade = (index: number) => {
    setOutrasAtividades(outrasAtividades.filter((_, i) => i !== index));
  };

  const adicionarLink = () => {
    if (novoLink.trim()) {
      setLinks([...links, novoLink]);
      setNovoLink("");
    }
  };

  const removerLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const adicionarContato = () => {
    if (contatosAdicionais.length < 3) {
      setContatosAdicionais([
        ...contatosAdicionais, 
        { nome: "", usuario: "", telefone: "", relacao: "Pais/Responsável" }
      ]);
    }
  };

  const removerContato = (index: number) => {
    setContatosAdicionais(contatosAdicionais.filter((_, i) => i !== index));
  };

  const atualizarContato = (index: number, campo: string, valor: string) => {
    const novosContatos = [...contatosAdicionais];
    novosContatos[index] = { ...novosContatos[index], [campo]: valor };
    setContatosAdicionais(novosContatos);
  };

  const salvarPerfil = () => {
    alert('Perfil salvo com sucesso!');
    // Aqui você implementaria a lógica para salvar no backend
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Cabeçalho */}
      <header className="sticky top-0 bg-white shadow-sm z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-green-700">Editar Perfil</h1>
          <button 
            onClick={salvarPerfil}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            <Save size={18} /> Salvar
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Seção Foto de Perfil */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">FOTO PERFIL</h2>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 border-2 border-dashed mb-4" />
            
            <div className="flex gap-3">
              <button
                onClick={openCamera}
                className="flex flex-col items-center justify-center gap-1 px-4 py-2 bg-gray-100 rounded-lg"
              >
                <Camera size={20} className="text-green-600" />
                <span className="text-xs">Selfie</span>
              </button>
              
              <button
                onClick={openGallery}
                className="flex flex-col items-center justify-center gap-1 px-4 py-2 bg-gray-100 rounded-lg"
              >
                <span className="text-green-600 font-bold text-lg">...</span>
                <span className="text-xs">Procurar</span>
              </button>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />
          </div>
        </section>

        {/* Seção Informações Básicas */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">INFORMAÇÕES PESSOAIS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome *</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Usuário *</label>
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Cidade / Estado / País *</label>
              <input
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Bairro / Local / Região *</label>
              <input
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Telefone *</label>
              <input
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email (Opcional)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">CPF (Opcional)</label>
              <input
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="XXX.XXX.XXX-XX"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Data de Nascimento</label>
              <input
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Seção Gênero e Raça/Cor */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">IDENTIDADE</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">GÊNERO</h3>
              <div className="flex flex-wrap gap-2">
                {["Masculino", "Feminino", "LGBTQI+", "Não declarar"].map(opcao => (
                  <button
                    key={opcao}
                    onClick={() => setGenero(opcao)}
                    className={`px-3 py-2 rounded-lg border ${
                      genero === opcao 
                        ? 'bg-green-100 border-green-500 text-green-700' 
                        : 'bg-gray-100 border-gray-300'
                    }`}
                  >
                    {opcao}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">RAÇA/COR</h3>
              <div className="flex flex-wrap gap-2">
                {["Negra", "Pardo", "Branco", "Indígena", "Amarelo"].map(opcao => (
                  <button
                    key={opcao}
                    onClick={() => setRacaCor(opcao)}
                    className={`px-3 py-2 rounded-lg border ${
                      racaCor === opcao 
                        ? 'bg-green-100 border-green-500 text-green-700' 
                        : 'bg-gray-100 border-gray-300'
                    }`}
                  >
                    {opcao}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Seção Apresentação */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">APRESENTAÇÃO E INFORMAÇÕES</h2>
          <textarea
            value={apresentacao}
            onChange={(e) => setApresentacao(e.target.value)}
            className="w-full h-40 p-4 border rounded-lg resize-none"
            placeholder="Fale sobre você, sua formação, experiência profissional e interesses..."
          />
        </section>

        {/* Seção Atividades Profissionais */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">ATIVIDADES PROFISSIONAIS</h2>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">SUA ATIVIDADE PRINCIPAL INFORMADA NA TELA-PÚBLICA</h3>
            <input
              type="text"
              value={atividadePrincipal}
              onChange={(e) => setAtividadePrincipal(e.target.value)}
              className="w-full p-2 border rounded-lg mb-3"
            />
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">OUTRAS ATIVIDADES PROFISSIONAIS</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {outrasAtividades.map((atividade, index) => (
                <div key={index} className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                  <span>{atividade}</span>
                  <button 
                    onClick={() => removerAtividade(index)}
                    className="ml-2 text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={novaAtividade}
                onChange={(e) => setNovaAtividade(e.target.value)}
                className="flex-1 p-2 border rounded-lg"
                placeholder="Adicionar nova atividade"
              />
              <button
                onClick={adicionarAtividade}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Adicionar
              </button>
            </div>
          </div>
        </section>

        {/* Seção Vínculos Sociais */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">VÍNCULOS SOCIAIS</h2>
          <p className="text-sm text-gray-600 mb-4">PCD.GÉNERO.CULTURA.SOCIAL. SSE .MEIO AMBIENTE</p>
          <VinculosSociais />
        </section>

        {/* Seção Contatos Adicionais */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">CONTATOS ADICIONAIS</h2>
          <p className="text-sm text-gray-600 mb-4">(Pais/Responsáveis, Cônjuge, Familiar, Parceria etc.)</p>
          
          <div className="space-y-4">
            {contatosAdicionais.map((contato, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium">Contato #{index + 1}</h3>
                  <button 
                    onClick={() => removerContato(index)}
                    className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Nome *</label>
                    <input
                      type="text"
                      value={contato.nome}
                      onChange={(e) => atualizarContato(index, "nome", e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-1">Usuário *</label>
                    <input
                      type="text"
                      value={contato.usuario}
                      onChange={(e) => atualizarContato(index, "usuario", e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-1">Telefone *</label>
                    <input
                      type="text"
                      value={contato.telefone}
                      onChange={(e) => atualizarContato(index, "telefone", e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-1">Relação *</label>
                    <select
                      value={contato.relacao}
                      onChange={(e) => atualizarContato(index, "relacao", e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    >
                      {["Pais/Responsável", "Cônjuge", "Familiar", "Parceria", "Funcionário"].map(opcao => (
                        <option key={opcao} value={opcao}>{opcao}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
            
            {contatosAdicionais.length < 3 && (
              <button
                onClick={adicionarContato}
                className="w-full py-3 bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                + Adicionar Contato
              </button>
            )}
          </div>
        </section>

        {/* Seção Preferências e Configurações */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">PREFERÊNCIAS E CONFIGURAÇÕES</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Deseja participar de Encontros de Grupos, Eventos, Feiras, etc.?</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setParticipaEventos(true)}
                  className={`px-4 py-2 rounded-lg border ${
                    participaEventos 
                      ? 'bg-green-100 border-green-500 text-green-700' 
                      : 'bg-gray-100 border-gray-300'
                  }`}
                >
                  Sim
                </button>
                <button
                  onClick={() => setParticipaEventos(false)}
                  className={`px-4 py-2 rounded-lg border ${
                    !participaEventos 
                      ? 'bg-green-100 border-green-500 text-green-700' 
                      : 'bg-gray-100 border-gray-300'
                  }`}
                >
                  Não
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">As mensagens e arquivos do CHAT ficarão salvas por:</h3>
              <div className="grid grid-cols-3 gap-2">
                {["15 dias", "30 dias", "45 dias", "60 dias", "90 dias", "120 dias", "180 dias", "360 dias", "NUNCA"].map(opcao => (
                  <button
                    key={opcao}
                    onClick={() => setArmazenamentoMensagens(opcao)}
                    className={`px-2 py-2 rounded-lg border text-sm ${
                      armazenamentoMensagens === opcao 
                        ? 'bg-green-100 border-green-500 text-green-700' 
                        : 'bg-gray-100 border-gray-300'
                    }`}
                  >
                    {opcao}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Seção Referências Geográficas */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">REFERÊNCIAS GEOGRÁFICAS</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">ENDEREÇO (OPCIONAL)</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  className="flex-1 p-2 border rounded-lg"
                />
                <button
                  onClick={() => setGpsMarcado(!gpsMarcado)}
                  className={`p-2 rounded-lg border ${
                    gpsMarcado 
                      ? 'bg-green-100 border-green-500 text-green-700' 
                      : 'bg-gray-100 border-gray-300'
                  }`}
                >
                  <MapPin size={20} />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Não ocupe espaço desnecessário na memória</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">LINKS</h3>
              <div className="space-y-2 mb-3">
                {links.map((link, index) => (
                  <div key={index} className="flex items-center">
                    <LinkIcon size={16} className="text-green-600 mr-2" />
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 truncate">
                      {link}
                    </a>
                    <button 
                      onClick={() => removerLink(index)}
                      className="ml-2 text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={novoLink}
                  onChange={(e) => setNovoLink(e.target.value)}
                  className="flex-1 p-2 border rounded-lg"
                  placeholder="Adicionar novo link"
                />
                <button
                  onClick={adicionarLink}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Adicionar
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Sugerimos que faça o seu Linktree, é Gratuito e Fácil: 
                <a href="https://linktr.ee/" target="_blank" rel="noopener noreferrer" className="text-blue-600 ml-1">
                  https://linktr.ee/
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Botão Salvar */}
        <div className="sticky bottom-4 z-10">
          <button
            onClick={salvarPerfil}
            className="w-full py-4 bg-green-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-green-700"
          >
            SALVAR PERFIL
          </button>
        </div>
      </main>
    </div>
  );
}