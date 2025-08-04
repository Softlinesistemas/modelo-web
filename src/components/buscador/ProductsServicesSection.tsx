"use client";

import { useState } from "react";
import { CollapsibleSection } from "@/utils/ui/CollapsibleSection";
import { Label } from "@/utils/ui/Label";
import cn from "@/utils/cn";

export const ProductsServicesSection = () => {
  const [entregaSelecionada, setEntregaSelecionada] = useState<string[]>([]);

  const toggleEntrega = (value: string) => {
    setEntregaSelecionada((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const opcoesEntrega = [
    { label: "Todos", value: "todos" },
    { label: "Na Sede", value: "sede" },
    { label: "No Cliente", value: "cliente" },
    { label: "Delivery", value: "delivery" },
  ];

  return (
    <CollapsibleSection title="PRODUTOS & SERVIÇOS " subTitle="PARA BUSCAR FORNECEDORES">
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Filtros principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Label>
            Tipo de Categoria
            <select className="border w-full p-3 rounded">
              <option value="in_natura">2. Natural – In natura</option>
              <option value="industrial">1. Industrial – Processado</option>
              <option value="organico">3. Orgânico</option>
              <option value="artesanal">4. Artesanal</option>
            </select>
          </Label>

          <Label>
            Categoria
            <select className="border w-full p-3 rounded">
              <option value="frutas">Frutas</option>
              <option value="legumes">Legumes</option>
              <option value="verduras">Verduras</option>
              <option value="graos">Grãos</option>
              <option value="outros">Outros</option>
            </select>
          </Label>

          <Label>
            Produto
            <select className="border w-full p-3 rounded">
              <option value="banana">Banana</option>
              <option value="mamao">Mamão</option>
              <option value="manga">Manga</option>
              <option value="goiaba">Goiaba</option>
              <option value="outros">Outros</option>
            </select>
          </Label>

          <Label>
            Variedade
            <select className="border w-full p-3 rounded">
              <option value="nacional">Prata</option>
              <option value="importado">Importado</option>
              <option value="regional">Regional</option>
            </select>
          </Label>

        </div>

        {/* Tipo de entrega */}
        <div className="space-y-2">
          <div className="bg-red-600 text-white text-center py-2 rounded font-semibold">
            DELIVERY / TIPOS DE ENTREGA
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
            {opcoesEntrega.map((opcao) => {
              const isSelected = entregaSelecionada.includes(opcao.value);
              return (
                <button
                  key={opcao.value}
                  type="button"
                  onClick={() => toggleEntrega(opcao.value)}
                  className={cn(
                    "w-full border rounded-lg px-4 py-2 text-sm font-medium text-center transition-all",
                    isSelected
                      ? "bg-green-600 text-white border-green-600 shadow"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  )}
                >
                  {opcao.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Público Alvo */}
        <div className="space-y-2">
          <div className="bg-green-600 text-white text-center py-2 rounded font-semibold">
            CLASSE
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <label className="flex items-center gap-2">
              <input type="checkbox" id="pf" className="w-5 h-5" />
              <span className="text-sm font-medium">Pessoa Física</span>
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" id="pj" className="w-5 h-5" />
              <span className="text-sm font-medium">Pessoa Jurídica / Empresa</span>
            </label>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
};