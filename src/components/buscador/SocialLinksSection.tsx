import React, { useState } from "react";
import { CollapsibleSection } from "@/utils/ui/CollapsibleSection";
import { Label } from "@/utils/ui/Label";
import { MultiSelectButtonGroup, Option } from "@/utils/ui/MultiSelectButtonGroup";
import { title } from "process";

export const SocialLinksSection = () => {
  // Estados para seleção, todos como arrays pois o componente trabalha com array mesmo singleSelect (vazio ou 1 item)
  const [economiaSolidaria, setEconomiaSolidaria] = useState<(string | number)[]>([]);
  const [projetoSocial, setProjetoSocial] = useState<(string | number)[]>([]);
  const [culturaPopular, setCulturaPopular] = useState<(string | number)[]>([]);
  const [ecologia, setEcologia] = useState<(string | number)[]>([]);
  const [genero, setGenero] = useState<(string | number)[]>([]);
  const [raca, setRaca] = useState<(string | number)[]>([]);
  const [religiao, setReligiao] = useState<(string | number)[]>([]);
  const [povosTradicionais, setPovosTradicionais] = useState<(string | number)[]>([]);

  // Opções sim/não para single select
  const simNaoOptions: Option[] = [
    { value: "nao", label: "Não" },
    { value: "sim", label: "Sim" },
  ];

  // Gênero
  const generoOptions: Option[] = [
    { value: "todos", label: "Todos" },
    { value: "masculino", label: "Masculino" },
    { value: "feminino", label: "Feminino" },
    { value: "lgbtqia+", label: "LGBTQIA+" },
  ];

  // Raça / Cor
  const racaOptions: Option[] = [
    { value: "todos", label: "Todos" },
    { value: "preta", label: "Preta" },
    { value: "parda", label: "Parda" },
    { value: "branca", label: "Branca" },
    { value: "indigena", label: "Indígena" },
  ];

  const religiaoOptinons :Option[] =[
    { value: "Todos", label: "Todos" },
    { value: "Bahaismo", label: "Bahaísmo"}, 
    { value: "Budismo", label:"Budismo"},
    { value: "Catolicismo", label: "Catolicismo"},
    { value: "Cristianismo", label:"Cristianismo"},
    { value: "Espiritismo", label:"Espiritimo"},
    { value: "Evangelico", label:"Evangelico"}, 
    { value: "Hinduismo", label:"Hinduísmo"},
    { value: "Islamismo", label: "Islamismo"},
    { value: "Judaismo", label: "Judaísmo"},
    { value: "Candomblé", label:"Candomblé"},
    { value: "Umbanda", label: "Umbanda"},
    { value: "Sikhismo", label:"Sikhismo"},
    { value: "Xintoísmo", label: "Xintoísmo"}
  ]

  const povosTradicionaisOptions : Option [] =[
     { value: "TODOS ", label:"TODOS"},
     { value: "Andirobeiras  ", label:"Andirobeiras "},
     { value: "Apanhadores de Sempre-vivas ", label:"Apanhadores de Sempre-vivas"},
     { value: "Caatingueiros  ", label:"Caatingueiros "},
     { value: "Caiçaras ", label:"Caiçaras"},
     { value: "Castanheiras ", label:"Castanheiras"},
     { value: "Catadores de Mangaba ", label:"Catadores de Mangaba"},
     { value: "Ciganos ", label:"Ciganos"},
     { value: "Cipozeiros  ", label:"Cipozeiros "},
     { value: "Extrativistas ", label:"Extrativistas"},
     { value: "Faxinalenses ", label:"Faxinalenses"},
     { value: "Fundo e Fecho de Pasto ", label:"Fundo e Fecho de Pasto"},
     { value: "Geraizeiros  ", label:"Geraizeiros "},
     { value: "Ilhéus ", label:"Ilhéus"},
     { value: "Indíginas ", label:"Indíginas"},
     { value: "Isqueiros ", label:"Isqueiros"},
     { value: "Morroquianos  ", label:"Morroquianos "},
     { value: "Pantaneiros ", label:"Pantaneiros"},
     { value: "Pescadores Artesanais ", label:"Pescadores Artesanais"},
     { value: "Piaçaveiros  ", label:"Piaçaveiros "},
     { value: "Pomeranos  ", label:"Pomeranos "},
     { value: "Povos de Terreiro ", label:"Povos de Terreiro"},
     { value: "Quebradeiras de Coco Babaçu ", label:"Quebradeiras de Coco Babaçu"},
     { value: "Quilombolas ", label:"Quilombolas"},
     { value: "Retireiros  ", label:"Retireiros "},
     { value: "Ribeirinhos ", label:"Ribeirinhos"},
     { value: "Seringueiros ", label:"Seringueiros"},
     { value: "Vazanteiros  ", label:"Vazanteiros "},
     { value: "Veredeiros  ", label:"Veredeiros "}

  ]


  return (
    <CollapsibleSection title="VÍNCULOS SOCIAIS" subTitle="PCD.GÊNERO.CULTURA.SOCIAL. SSE .MEIO AMBIENTE">
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        {/* ECONOMIA SOLIDÁRIA - SINGLE SELECT */}
        <div>
          <Label className="font-semibold text-gray-700">
            Economia Solidária
            <a
              href="https://unsse.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-600 underline"
            >
              ONU - Social and Solidarity Economy (SSE)
            </a>
          </Label>
          <MultiSelectButtonGroup
            options={simNaoOptions}
            selectedValues={economiaSolidaria}
            onChange={setEconomiaSolidaria}
            title={null}
            singleSelect={true} // FORÇA single select
            columns={2}
          />
        </div>

        {/* PROJETO SOCIAL */}
        <div>
          <Label className="font-semibold text-gray-700">
            Projeto Social / Voluntariado (sem fins lucrativos)
          </Label>
          <MultiSelectButtonGroup
            options={simNaoOptions}
            selectedValues={projetoSocial}
            onChange={setProjetoSocial}
            singleSelect={true}
            columns={2}
          />
        </div>
        <div className="md:col-span-2">
          <div className="text-red-700 font-bold text-center py-2 border rounded bg-red-100">
            CUIDADO ESPECIAL OU DOENÇA CRÔNICA
          </div>
        </div>
        {/* Tipo de Interesse */}
        <div>
          <Label htmlFor="tipoInteresse">Tipo</Label>
          <input
            id="tipoInteresse"
            className="border w-full p-3 rounded"
            defaultValue="Câncer"
          />
        </div>

        {/* Categoria */}
        <div>
          <Label htmlFor="categoria">Categoria</Label>
          <input
            id="categoria"
            className="border w-full p-3 rounded"
            defaultValue="Pele / Melanoma – CID C43 / D03."
          />
        </div>

        {/* CULTURA POPULAR */}
        <div>
          <Label className="font-semibold text-gray-700">Cultura Popular</Label>
          <MultiSelectButtonGroup
            options={simNaoOptions}
            selectedValues={culturaPopular}
            onChange={setCulturaPopular}
            singleSelect={true}
            columns={2}
          />
        </div>

        {/* ECOLOGIA */}
        <div>
          <Label className="font-semibold text-gray-700">
            Ação Ambiental / Ecologia
          </Label>
          <MultiSelectButtonGroup
            options={simNaoOptions}
            selectedValues={ecologia}
            onChange={setEcologia}
            singleSelect={true}
            columns={2}
          />
        </div>

        {/* POVOS TRADICIONAIS */}
        <div className="md:col-span-2">
          {/* <div className="text-red-700 font-bold text-center py-2 border rounded bg-red-100">
            Povos e comunidades Tradicionais
          </div> */}
          </div>
          <div className="md:col-span-2">          
          <CollapsibleSection title="POVOS E COMUNIDADES TRADICIONAIS">
          <MultiSelectButtonGroup
            options={povosTradicionaisOptions}
            selectedValues={povosTradicionais}
            onChange={setPovosTradicionais}
            columns={3}
          />
          </CollapsibleSection> 
        </div>

        {/* GÊNERO - MULTI SELECT */}
        <div className="md:col-span-2">
          <Label className="block font-semibold text-gray-700">Gênero</Label>
          <MultiSelectButtonGroup
            options={generoOptions}
            selectedValues={genero}
            onChange={setGenero}
            columns={2}
          />
        </div>

        {/* RAÇA/COR - MULTI SELECT */}
        <div className="md:col-span-2">
          <Label className="block font-semibold text-gray-700">
            Raça / Cor
          </Label>
          <MultiSelectButtonGroup
            options={racaOptions}
            selectedValues={raca}
            onChange={setRaca}
            columns={3}
          />
        </div>

        {/* RELIGIÃO */}
        <div className="md:col-span-2">
          <Label htmlFor="religiao">Religião</Label>
          <MultiSelectButtonGroup
            options={religiaoOptinons}
            selectedValues={religiao}
            onChange={setReligiao}
            columns={3}
          />
        </div>
      </div>
    </CollapsibleSection>
  );
};
