"use client";

import { Controller } from "react-hook-form";
import { Input } from "@/utils/ui/Input";
import { Label } from "@/utils/ui/Label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/utils/ui/Select";
import { FormData } from "@/schemas/grupoSchema";
import { useState } from "react";

type Props = {
  register: any;
  control: any;
  errors: any;
  watch: any;
  setValue: any;
};

export default function GrupoInfoBasica({
  register,
  control,
  errors,
  watch,
  setValue,
}: Props) {
  const tiposGrupo = [
    "Social",
    "Solidário",
    "Ambiental",
    "Cultural",
    "Religioso",
    "Esportivo",
    "Educacional",
    "Saúde",
    "Profissional",
    "Outro",
  ];

const categorias = [
  "Cultural",
  "Esportivo",
  "Educacional",
  "Social",
  "Religioso",
  "Profissional",
];
  // Controle interno dos checkboxes de tipo de grupo
  const [selecionados, setSelecionados] = useState<Set<string>>(new Set());

  const alternarTipo = (tipo: string, checked: boolean) => {
    const novaSelecao = new Set(selecionados);
    if (checked) {
      novaSelecao.add(tipo);
    } else {
      novaSelecao.delete(tipo);
    }
    setSelecionados(novaSelecao);
    setValue("tiposGrupo", Array.from(novaSelecao));
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-center mt-4">INFORMAÇÕES BÁSICAS</h2>

      {/* Data e Nº Registro */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="data" required>DATA</Label>
          <Input
            id="data"
            type="date"
            {...register("data")}
          />
          {errors.data && (
            <p className="text-red-500 text-sm">{errors.data.message as string}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="registro" required>Nº REGISTRO</Label>
          <Input
            id="registro"
            type="text"
            inputMode="numeric"
            placeholder="BR0001"
            {...register("registro")}
          />
          {errors.registro && (
            <p className="text-red-500 text-sm">{errors.registro.message as string}</p>
          )}
        </div>
      </div>

      {/* Nome do Grupo */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="nome">NOME DO GRUPO</Label>
        <Input
          id="nome"
          placeholder="Digite o nome do grupo"
          {...register("nome")}
        />
        {errors.nome && (
          <p className="text-red-500 text-sm">{errors.nome.message as string}</p>
        )}
      </div>

      {/* Descrição */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="descricao">DESCRIÇÃO</Label>
        <Input
          id="descricao"
          placeholder="Descreva o propósito do grupo"
          {...register("descricao")}
        />
        {errors.descricao && (
          <p className="text-red-500 text-sm">{errors.descricao.message as string}</p>
        )}
      </div>

      {/* Categoria */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="categoria">CATEGORIA</Label>
        <Controller
          name="categoria"
          control={control}
          render={({ field }) => (
           <Select value={field.value} onChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria} value={categoria}>
                    {categoria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.categoria && (
          <p className="text-red-500 text-sm">{errors.categoria.message as string}</p>
        )}
      </div>

      {/* Visibilidade */}
      <div className="flex flex-col gap-3">
        <Label required variant="secondary">VISIBILIDADE</Label>
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              label: "Público",
              value: "publico",
              description: "Qualquer pessoa pode ver o grupo e suas atividades.",
              icon: "🌐",
            },
            {
              label: "Privado",
              value: "privado",
              description: "Somente membros podem ver o grupo e suas atividades.",
              icon: "🔒",
            },
          ].map((opt) => (
            <label
              key={opt.value}
              className={`
                flex gap-3 items-start p-4 rounded-lg border cursor-pointer transition-all
                ${watch("visibilidade") === opt.value
                  ? "border-blue-600 bg-blue-50 shadow"
                  : "border-gray-300"}
              `}
            >
              <input
                type="radio"
                {...register("visibilidade")}
                value={opt.value}
                className="mt-1 accent-blue-600"
              />
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-base flex items-center gap-2">
                  <span className="text-xl">{opt.icon}</span>
                  {opt.label}
                </p>
                <p className="text-sm text-gray-600">{opt.description}</p>
              </div>
            </label>
          ))}
        </div>
        {errors.visibilidade && (
          <p className="text-red-500 text-sm">{errors.visibilidade.message as string}</p>
        )}
      </div>

      {/* Tipo de Grupo */}
      <div className="flex flex-col gap-2">
        <Label variant="secondary">TIPO DE GRUPO</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {tiposGrupo.map((tipo) => {
            const checked = selecionados.has(tipo);
            return (
              <label
                key={tipo}
                className={`
                  flex cursor-pointer items-center justify-center rounded-lg border
                  px-4 py-2 font-medium text-center transition-colors
                  ${checked
                    ? "bg-blue-600 border-blue-600 text-white shadow"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400"}
                `}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => alternarTipo(tipo, e.target.checked)}
                  className="sr-only"
                />
                <span>{tipo}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
