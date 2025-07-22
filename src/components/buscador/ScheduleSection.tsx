// components/ScheduleSection.tsx
import React, { useState } from 'react';
import { CollapsibleSection } from '@/utils/ui/CollapsibleSection';
import { MultiSelectButtonGroup, Option } from '@/utils/ui/MultiSelectButtonGroup';
import { Label } from '@/utils/ui/Label';

export const ScheduleSection = () => {
  const [diasSelecionados, setDiasSelecionados] = useState<(string | number)[]>([]);
  const [qualquerDia, setQualquerDia] = useState(false);
  const [turno, setTurno] = useState('');
  const [inicio, setInicio] = useState('');
  const [termino, setTermino] = useState('');

  const diasDaSemana: Option[] = [
    { label: 'Dom', value: 'domingo' },
    { label: 'Seg', value: 'segunda' },
    { label: 'Ter', value: 'terca' },
    { label: 'Qua', value: 'quarta' },
    { label: 'Qui', value: 'quinta' },
    { label: 'Sex', value: 'sexta' },
    { label: 'Sáb', value: 'sabado' },
  ];

  const turnos = [
    { label: 'Manhã', value: 'manha' },
    { label: 'Tarde', value: 'tarde' },
    { label: 'Noite', value: 'noite' },
  ];

  return (
    <CollapsibleSection title="AGENDA / DIAS " subTitle=" HORÁRIOS PARA BUSCAR GRUPOS">
      <div className="max-w-2xl mx-auto space-y-6 text-sm p-4">
        {/* Dias da semana */}
        <MultiSelectButtonGroup
          options={diasDaSemana}
          selectedValues={diasSelecionados}
          onChange={setDiasSelecionados}
          title="DIAS DISPONÍVEIS"
          columns={3}
        />

        {/* Qualquer dia */}
        <div className="flex items-center gap-2 justify-center">
          <input
            type="checkbox"
            id="qualquer_dia"
            checked={qualquerDia}
            onChange={() => setQualquerDia((prev) => !prev)}
            className="w-4 h-4"
          />
          <Label
            htmlFor="qualquer_dia"
            className="text-red-700 font-semibold select-none"
          >
            QUALQUER DIA – A CONFIRMAR
          </Label>
        </div>

        {/* Turno preferencial */}
        <div className='flex items-center gap-2 justify-center'>
          <label className="block font-semibold">Turno preferencial:</label>
          <div className="flex flex-wrap gap-4">
            {turnos.map((t) => (
              <Label key={t.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="turno"
                  value={t.value}
                  checked={turno === t.value}
                  onChange={() => setTurno(t.value)}
                  className="w-4 h-4"
                />
                {t.label}
              </Label>
            ))}
          </div>
        </div>

        {/* Horários personalizados */}
        <div className="flex flex-col sm:flex-row gap-6">
          <label className="flex flex-col flex-1">
            <span className="font-semibold mb-1">Início:</span>
            <input
              type="time"
              value={inicio}
              onChange={(e) => setInicio(e.target.value)}
              className="border rounded px-3 py-1"
            />
          </label>
          <label className="flex flex-col flex-1">
            <span className="font-semibold mb-1">Término:</span>
            <input
              type="time"
              value={termino}
              onChange={(e) => setTermino(e.target.value)}
              className="border rounded px-3 py-1"
            />
          </label>
        </div>
      </div>
    </CollapsibleSection>
  );
};
