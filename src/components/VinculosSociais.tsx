'use client'
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "react-feather";

export default function VinculosSociais() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  
  const [economiaSolidaria, setEconomiaSolidaria] = useState<string | null>(null);
  const [projetoSocial, setProjetoSocial] = useState<string | null>(null);
  const [cuidadoEspecial, setCuidadoEspecial] = useState<string[]>([]);
  const [culturaPopular, setCulturaPopular] = useState(false);
  const [acaoAmbiental, setAcaoAmbiental] = useState(false);
  const [povosTradicionais, setPovosTradicionais] = useState(false);
  const [genero, setGenero] = useState("Todos");
  const [racaCor, setRacaCor] = useState("Todos");
  const [religiao, setReligiao] = useState(false);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCuidadoEspecial = (value: string) => {
    if (cuidadoEspecial.includes(value)) {
      setCuidadoEspecial(cuidadoEspecial.filter(v => v !== value));
    } else {
      setCuidadoEspecial([...cuidadoEspecial, value]);
    }
  };

  const resetSelections = () => {
    setEconomiaSolidaria(null);
    setProjetoSocial(null);
    setCuidadoEspecial([]);
    setCulturaPopular(false);
    setAcaoAmbiental(false);
    setPovosTradicionais(false);
    setGenero("Todos");
    setRacaCor("Todos");
    setReligiao(false);
  };

  return (
    <div className="relative w-full max-w-3xl justify-center" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors"
      >
        <span className="font-bold">VÍNCULOS SOCIAIS</span>
        <ChevronDown size={20} className={`transform ${isOpen ? 'rotate-180' : ''} transition-transform`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-bold text-gray-800">VÍNCULOS SOCIAIS</h2>
            <p className="text-xs text-gray-600">PCD.GÉNERO.CULTURA.SOCIAL.SSE.MEIO AMBIENTE</p>
          </div>
          
          <div className="max-h-[70vh] overflow-y-auto p-4 space-y-6">
            {/* ECONOMIA SOLIDÁRIA */}
            <div>
              <h3 className="font-semibold mb-2">ECONOMIA SOLIDÁRIA</h3>
              <p className="text-xs text-gray-500 mb-2">SOCIAL AND SOLIDARITY ECONOMY (SSE) - ONU</p>
              <div className="flex space-x-4">
                {["Não", "Sim"].map(opcao => (
                  <button
                    key={opcao}
                    onClick={() => setEconomiaSolidaria(opcao)}
                    className={`px-4 py-2 rounded-lg border ${
                      economiaSolidaria === opcao 
                        ? 'bg-green-100 border-green-500 text-green-700' 
                        : 'bg-gray-100 border-gray-300 text-gray-700'
                    }`}
                  >
                    {opcao}
                  </button>
                ))}
              </div>
            </div>
            
            {/* PROJETO SOCIAL SEM FINS LUCRATIVOS */}
            <div>
              <h3 className="font-semibold mb-2">PROJETO SOCIAL SEM FINS LUCRATIVOS</h3>
              <p className="text-xs text-gray-500 mb-2">VOLUNTARIADO</p>
              <div className="flex space-x-4">
                {["Não", "Sim"].map(opcao => (
                  <button
                    key={opcao}
                    onClick={() => setProjetoSocial(opcao)}
                    className={`px-4 py-2 rounded-lg border ${
                      projetoSocial === opcao 
                        ? 'bg-green-100 border-green-500 text-green-700' 
                        : 'bg-gray-100 border-gray-300 text-gray-700'
                    }`}
                  >
                    {opcao}
                  </button>
                ))}
              </div>
            </div>
            
            {/* CUIDADO ESPECIAL OU DOENÇA CRÔNICA / PCD */}
            <div>
              <h3 className="font-semibold mb-2">CUIDADO ESPECIAL OU DOENÇA CRÔNICA / PCD</h3>
              <div className="flex flex-wrap gap-2">
                {["Não", "Sim", "CHECKBOX"].map(opcao => (
                  <button
                    key={opcao}
                    onClick={() => toggleCuidadoEspecial(opcao)}
                    className={`px-4 py-2 rounded-lg border flex items-center ${
                      cuidadoEspecial.includes(opcao)
                        ? 'bg-green-100 border-green-500 text-green-700' 
                        : 'bg-gray-100 border-gray-300 text-gray-700'
                    }`}
                  >
                    {cuidadoEspecial.includes(opcao) && <Check size={16} className="mr-1" />}
                    {opcao}
                  </button>
                ))}
              </div>
            </div>
            
            {/* CULTURA POPULAR */}
            <div>
              <h3 className="font-semibold mb-2">CULTURA POPULAR</h3>
              <button
                onClick={() => setCulturaPopular(!culturaPopular)}
                className={`px-4 py-2 rounded-lg border flex items-center ${
                  culturaPopular
                    ? 'bg-green-100 border-green-500 text-green-700' 
                    : 'bg-gray-100 border-gray-300 text-gray-700'
                }`}
              >
                {culturaPopular && <Check size={16} className="mr-1" />}
                {culturaPopular ? "Sim" : "Não"}
              </button>
            </div>
            
            {/* AÇÃO AMBIENTAL / ECOLOGIA */}
            <div>
              <h3 className="font-semibold mb-2">AÇÃO AMBIENTAL / ECOLOGIA</h3>
              <button
                onClick={() => setAcaoAmbiental(!acaoAmbiental)}
                className={`px-4 py-2 rounded-lg border flex items-center ${
                  acaoAmbiental
                    ? 'bg-green-100 border-green-500 text-green-700' 
                    : 'bg-gray-100 border-gray-300 text-gray-700'
                }`}
              >
                {acaoAmbiental && <Check size={16} className="mr-1" />}
                {acaoAmbiental ? "Sim" : "Não"}
              </button>
            </div>
            
            {/* POVOS TRADICIONAIS */}
            <div>
              <h3 className="font-semibold mb-2">POVOS TRADICIONAIS</h3>
              <button
                onClick={() => setPovosTradicionais(!povosTradicionais)}
                className={`px-4 py-2 rounded-lg border flex items-center ${
                  povosTradicionais
                    ? 'bg-green-100 border-green-500 text-green-700' 
                    : 'bg-gray-100 border-gray-300 text-gray-700'
                }`}
              >
                {povosTradicionais && <Check size={16} className="mr-1" />}
                CAATINGUEIROS
              </button>
            </div>
            
            {/* GÊNERO */}
            <div>
              <h3 className="font-semibold mb-2">De GÉNERO</h3>
              <div className="grid grid-cols-2 gap-2">
                {["Todos", "Masculino", "Feminino", "LGBTQI+"].map(opcao => (
                  <button
                    key={opcao}
                    onClick={() => setGenero(opcao)}
                    className={`px-3 py-2 rounded-lg border flex items-center justify-center ${
                      genero === opcao
                        ? 'bg-green-100 border-green-500 text-green-700' 
                        : 'bg-gray-100 border-gray-300 text-gray-700'
                    }`}
                  >
                    {genero === opcao && <Check size={16} className="mr-1" />}
                    {opcao}
                  </button>
                ))}
              </div>
            </div>
            
            {/* RAÇA/COR */}
            <div>
              <h3 className="font-semibold mb-2">De RAÇA/COR</h3>
              <div className="grid grid-cols-2 gap-2">
                {["Todos", "Preta", "Parda", "Branca", "Indígena"].map(opcao => (
                  <button
                    key={opcao}
                    onClick={() => setRacaCor(opcao)}
                    className={`px-3 py-2 rounded-lg border flex items-center justify-center ${
                      racaCor === opcao
                        ? 'bg-green-100 border-green-500 text-green-700' 
                        : 'bg-gray-100 border-gray-300 text-gray-700'
                    }`}
                  >
                    {racaCor === opcao && <Check size={16} className="mr-1" />}
                    {opcao}
                  </button>
                ))}
              </div>
            </div>
            
            {/* RELIGIÃO */}
            <div>
              <h3 className="font-semibold mb-2">RELIGIÃO</h3>
              <button
                onClick={() => setReligiao(!religiao)}
                className={`px-4 py-2 rounded-lg border flex items-center ${
                  religiao
                    ? 'bg-green-100 border-green-500 text-green-700' 
                    : 'bg-gray-100 border-gray-300 text-gray-700'
                }`}
              >
                {religiao && <Check size={16} className="mr-1" />}
                CHECKBOX
              </button>
            </div>
          </div>
          
          {/* Rodapé com botões */}
          <div className="flex justify-between p-4 bg-gray-50 border-t border-gray-200">
            <button
              onClick={resetSelections}
              className="px-4 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg"
            >
              Limpar Seleções
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
