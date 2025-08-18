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
import { Checkbox } from "@/utils/ui/checkbox";

type Props = {
  control: any;
  register: any;
  errors: any;
  setValue: any;
  watch: any;
};

export default function GrupoOrganizacaoAgenda({
  control,
  register,
  errors,
  setValue,
  watch,
}: Props) {
  const diasSemana = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];

  const selecionados = new Set(watch("diasSemana") || []);

  const alternarDia = (dia: string, marcado: boolean) => {
    if (marcado) {
      selecionados.add(dia);
    } else {
      selecionados.delete(dia);
    }
    setValue("diasSemana", Array.from(selecionados));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Organização e Agenda</h2>

      {/* Data de fundação */}
      <div>
        <Label>Data de Fundação</Label>
        <Controller
          name="dataFundacao"
          control={control}
          render={({ field }) => (
            <Input
              type="date"
              {...field}
              error={errors.dataFundacao?.message}
            />
          )}
        />
      </div>

      {/* Turno */}
      <div>
        <Label>Turno</Label>
        <Controller
          name="turno"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o turno" />
              </SelectTrigger>
              <SelectContent>
                {["Manhã", "Tarde", "Noite"].map((turno) => (
                  <SelectItem key={turno} value={turno}>
                    {turno}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Frequência */}
      <div>
        <Label>Frequência</Label>
        <Controller
          name="frequencia"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a frequência" />
              </SelectTrigger>
              <SelectContent>
                {["Evento Único", "Semanal", "Mensal"].map((freq) => (
                  <SelectItem key={freq} value={freq}>
                    {freq}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Horário */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>HORÁRIO DE INICIO</Label>
          <Controller
            name="horarioInicio"
            control={control}
            render={({ field }) => (
              <Input
                type="time"
                {...field}
                error={errors.horarioInicio?.message}
              />
            )}
          />
        </div>
        <div>
          <Label>Horário de Término</Label>
          <Controller
            name="horarioFim"
            control={control}
            render={({ field }) => (
              <Input
                type="time"
                {...field}
                error={errors.horarioFim?.message}
              />
            )}
          />
        </div>
      </div>

      {/* Dias da Semana */}
      <div>
        <Label>Dias da Semana</Label>
        <div className="grid grid-cols-3 gap-2">
          {diasSemana.map((dia) => {
            const checked = selecionados.has(dia);
            return (
              <label key={dia} className="flex items-center gap-2">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(marcado: boolean) =>
                    alternarDia(dia, marcado)
                  }
                />
                <span>{dia}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
