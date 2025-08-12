"use client";
import React, { useState } from "react";
import { CollapsibleSection } from "@/utils/ui/CollapsibleSection";
import { Label } from "@/utils/ui/Label";

// Componente de “tag” visual (sem ícone de excluir)
const TagVisual = ({ value }: { value: string | string[] }) => {
  const texto = Array.isArray(value)
    ? value.length > 0
      ? value.join(", ")
      : "Não informado"
    : value || "Não informado";

  return (
    <div className="inline-flex items-center bg-green-100 text-gray-900 font-medium px-4 rounded-full text-sm">
      {texto}
    </div>
  );
};

export const SocialLinksSection = () => {
  // Simula os valores já escolhidos (substitua por props ou fetch real)
  const [economiaSolidaria] = useState<string[]>(["Sim"]);
  const [projetoSocial] = useState<string[]>(["Não"]);
  const [culturaPopular] = useState<string[]>(["Sim"]);
  const [ecologia] = useState<string[]>(["Não"]);
  const [genero] = useState<string[]>(["Feminino", "LGBTQIA+"]);
  const [raca] = useState<string[]>(["Preta", "Parda"]);
  const [religiao] = useState<string[]>(["Candomblé", "Umbanda"]);
  const [povosTradicionais] = useState<string[]>([
    "Caiçaras",
    "Quilombolas",
    "Povos de Terreiro",
  ]);

  return (
    <CollapsibleSection
      title="VÍNCULOS SOCIAIS"
      subTitle={
        <span className="text-xs md:text-sm text-white/80">
          <a href="https://seulink.com/pcd" className="underline">
            PCD
          </a>{" "}
          · GÊNERO · CULTURA · SOCIAL ·{" "}
          <a href="https://unsse.org/" className="underline">
            SSE
          </a>{" "}
          · MEIO AMBIENTE
        </span>
      }
    >
      <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-2 gap-6 text-sm">
        {/* Economia Solidária */}
        <div>
          <Label className="font-semibold text-gray-700">
            Economia Solidária
            <a
              href="https://unsse.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-600 underline"
            >
              ONU – SSE
            </a>
          </Label>
          <TagVisual value={economiaSolidaria} />
        </div>

        {/* Projeto Social */}
        <div>
          <Label className="font-semibold text-gray-700">
            Projeto Social / Voluntariado
          </Label>
          <TagVisual value={projetoSocial} />
        </div>
</div>
        <div className="w-full mb-2 mt-2 md:col-span-2">
          <div className="text-red-700 font-bold text-center py-2 border rounded bg-red-100">
            CUIDADO ESPECIAL OU DOENÇA CRÔNICA
          </div>
        </div>
<div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-2 gap-6 text-sm">
        {/* Cuidado Especial */}

        {/* Tipo de Interesse */}
        <div>
          <Label htmlFor="tipoInteresse">Tipo de Interesse</Label>
          <TagVisual value="Câncer" />
        </div>

        {/* Categoria */}
        <div>
          <Label htmlFor="categoria">Categoria</Label>
          <TagVisual value="Pele / Melanoma – CID C43 / D03" />
        </div>

        {/* Cultura Popular */}
        <div>
          <Label className="font-semibold text-gray-700">Cultura Popular</Label>
          <TagVisual value={culturaPopular} />
        </div>

        {/* Ecologia */}
        <div>
          <Label className="font-semibold text-gray-700">
            Ação Ambiental / Ecologia
          </Label>
          <TagVisual value={ecologia} />
        </div>
</div>
        {/* Povos Tradicionais (colapsável interno) */}
        <div className="w-full mt-2 mb-2 md:col-span-2">
          <CollapsibleSection title="POVOS E COMUNIDADES TRADICIONAIS">
            <div className="flex flex-wrap">
              {povosTradicionais.map((povo) => (
                <TagVisual key={povo} value={povo} />
              ))}
            </div>
          </CollapsibleSection>
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-2 gap-6 text-sm">
        {/* Gênero */}
        <div >
          <Label className="font-semibold text-gray-700">Gênero</Label>
          {genero.map((genero) => (
            <TagVisual key={genero} value={genero} />
          ))}
        </div>

        {/* Raça / Cor */}
        <div >
          <Label className="font-semibold text-gray-700">Raça / Cor</Label>
          {raca.map((raca) => (
            <TagVisual key={raca} value={raca} />
          ))}
        </div>

        {/* Religião */}
        <div >
          <Label className="font-semibold text-gray-700 ">Religião</Label>
          {religiao.map((religiao) => (
            <TagVisual key={religiao} value={religiao} />
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
};
