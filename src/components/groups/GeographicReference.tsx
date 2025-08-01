import React from "react";

type GeographicReferenceProps = {
  bioma: string;
  divisao: string;
  dia: string;
  inicio: string;
  fim: string;
  nivel: string;
  idadeMin: number;
  idadeMax: number;
  genero: string;
  mensalidade: string;
  avulso: string;
};

export const GeographicReference: React.FC<GeographicReferenceProps> = ({
  bioma,
  divisao,
  dia,
  inicio,
  fim,
  nivel,
  idadeMin,
  idadeMax,
  genero,
  mensalidade,
  avulso,
}) => {
  return (
    <div className="border rounded-md overflow-hidden w-full shadow text-sm">
      {/* Cabeçalho */}
      <div className="bg-white p-2 border-b text-center font-bold uppercase">
        Referências Geográficas
      </div>

      {/* Bioma e Divisão Geopolítica */}
      <div className="bg-white p-2 gap-2">
        <div className="flex justify-between">
          <span className="font-semibold">Bioma</span>
          <span className="text-red-600 font-bold">{bioma}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Divisão Geopolítica</span>
          <span className="text-red-600 font-bold">{divisao}</span>
        </div>
      </div>

      {/* Detalhes da Atividade */}
      <div className="bg-lime-300 p-2 grid grid-cols-3 gap-2 text-xs">
        <div>
          <span className="font-bold block">Dia:</span>
          <span className="block">{dia}</span>
        </div>
        <div>
          <span className="font-bold block">Horário/Início:</span>
          <span className="block">{inicio}</span>
        </div>
        <div>
          <span className="font-bold block">Fim:</span>
          <span className="block">{fim}</span>
        </div>

        <div>
          <span className="font-bold block">Nível:</span>
          <span className="block">{nivel}</span>
        </div>
        <div>
          <span className="font-bold block">Idade:</span>
          <span className="block">≥ {idadeMin} - ≤ {idadeMax}</span>
        </div>
        <div>
          <span className="font-bold block">Gênero:</span>
          <span className="block">{genero}</span>
        </div>

        <div>
          <span className="font-bold block">$ Mensalidade:</span>
          <span className="block bg-white rounded text-center font-bold">
            {mensalidade}
          </span>
        </div>
        <div>
          <span className="font-bold block">$ Avulso:</span>
          <span className="block bg-white rounded text-center font-bold">
            {avulso}
          </span>
        </div>
      </div>
    </div>
  );
};
