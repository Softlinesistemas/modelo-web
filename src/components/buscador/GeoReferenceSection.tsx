"use client";

import { CollapsibleSection } from "@/utils/ui/CollapsibleSection";
import { Label } from "@/utils/ui/Label";

import React, { useEffect, useState } from "react";

const biomas = [
  { nome: "Amazônia", cor: "#1b5e20" },
  { nome: "Mata Atlântica", cor: "#2e7d32" },
  { nome: "Cerrado", cor: "#ffb300" },
  { nome: "Caatinga", cor: "#ef6c00" },
  { nome: "Pampa", cor: "#6d4c41" },
  { nome: "Pantanal", cor: "#0288d1" },
];

export const GeoReferenceSection = () => {
  const [estados, setEstados] = useState<
    { id: number; nome: string; sigla: string }[]
  >([]);
  const [cidades, setCidades] = useState<{ id: number; nome: string }[]>([]);
  const [regioes, setRegioes] = useState<{ id: number; nome: string }[]>([]);

  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [regiaoSelecionada, setRegiaoSelecionada] = useState("");
  const [biomaSelecionado, setBiomaSelecionado] = useState("");
  const [bairroSelecionado, setBairroSelecionado] = useState("CENTRO");

  useEffect(() => {
    fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
    )
      .then((res) => res.json())
      .then(setEstados)
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/regioes")
      .then((res) => res.json())
      .then(setRegioes)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (estadoSelecionado) {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`
      )
        .then((res) => res.json())
        .then(setCidades)
        .catch(console.error);
    } else {
      setCidades([]);
    }
  }, [estadoSelecionado]);

  return (
    <CollapsibleSection title="REFERÊNCIAS GEOGRÁFICAS">
      <div className="grid grid-cols-2 gap-4">
        {/* País - fixo */}
        <Label>
          País
          <select
            className="border w-full p-3 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
            disabled
            value="Brasil"
          >
            <option>Brasil</option>
          </select>
        </Label>

        {/* Estado */}
        <Label>
          Estado
          <select
            className="border w-full p-3 rounded"
            value={estadoSelecionado}
            onChange={(e) => setEstadoSelecionado(e.target.value)}
          >
            <option value="">Selecione o estado</option>
            {estados.map((estado) => (
              <option key={estado.id} value={estado.id}>
                {estado.nome}
              </option>
            ))}
          </select>
        </Label>

        {/* Cidade */}
        <Label>
          Cidade
          <select
            className="border w-full p-3 rounded"
            value={cidadeSelecionada}
            onChange={(e) => setCidadeSelecionada(e.target.value)}
            disabled={!cidades.length}
          >
            <option value="">Selecione a cidade</option>
            {cidades.map((cidade) => (
              <option key={cidade.id} value={cidade.nome}>
                {cidade.nome}
              </option>
            ))}
          </select>
        </Label>

       
        {/* Bairro - agora como input livre */}
        <Label>
          Bairro
          <input
            type="text"
            className="border w-full p-3 rounded"
            placeholder="Digite o bairro"
            value={bairroSelecionado}
            onChange={(e) => setBairroSelecionado(e.target.value.toUpperCase())}
          />
        </Label>

        {/* Bioma */}
        <Label>
          Bioma
          <select
            className="border w-full p-3 rounded"
            value={biomaSelecionado}
            onChange={(e) => setBiomaSelecionado(e.target.value)}
          >
            <option value="">Selecione o bioma</option>
            {biomas.map((b) => (
              <option key={b.nome} value={b.nome}>
                {b.nome}
              </option>
            ))}
          </select>
        </Label>

        {/* Divisão Geopolítica */}
        <Label>
          Divisão Geopolítica
          <select
            className="border w-full p-3 rounded"
            value={regiaoSelecionada}
            onChange={(e) => setRegiaoSelecionada(e.target.value)}
          >
            <option value="">Selecione a região</option>
            {regioes.map((regiao) => (
              <option key={regiao.id} value={regiao.nome}>
                {regiao.nome}
              </option>
            ))}
          </select>
        </Label>
      </div>
    </CollapsibleSection>
  );
};
