"use client";

import { Label } from "@/utils/ui/Label";
import { Checkbox } from "@/utils/ui/checkbox";
import { FormData } from "@/schemas/grupoSchema";

type Props = {
  register: any;
  control: any;
  errors: any;
  watch: any;
  setValue: any;
};

export default function GrupoPreferenciasVinculos({
  register,
  watch,
  setValue,
}: Props) {
  const vinculos = [
    "Social",
    "Solidário",
    "Ambiental",
    "Cultural",
    "Religioso",
    "Esportivo",
    "Educacional",
    "Saúde",
    "Profissional",
  ];

  const selecionados = new Set(watch("vinculos") || []);

  const alternarVinculo = (vinculo: string, marcado: boolean) => {
    if (marcado) {
      selecionados.add(vinculo);
    } else {
      selecionados.delete(vinculo);
    }
    setValue("vinculos", Array.from(selecionados));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Preferências de Vínculos</h2>

      <div>
        <Label>Selecione os tipos de vínculos que o grupo aceita</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {vinculos.map((vinculo) => {
            const checked = selecionados.has(vinculo);
            return (
              <label key={vinculo} className="flex items-center gap-2">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(valor: boolean) =>
                    alternarVinculo(vinculo, valor)
                  }
                />
                <span>{vinculo}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <Label>Outras Preferências</Label>
        <textarea
          {...register("outrasPreferencias")}
          className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="Descreva outras preferências de vínculo ou requisitos para membros"
          rows={3}
        />
      </div>
    </div>
  );
}
