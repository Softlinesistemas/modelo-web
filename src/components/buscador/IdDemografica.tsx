import {
  FaGenderless,
  FaUserFriends,
  FaGraduationCap,
  FaBirthdayCake,
  FaCalendarCheck,
} from "react-icons/fa";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/utils/ui/Select";
import { Input } from "@/utils/ui/Input";
import { Label } from "@/utils/ui/Label";

export function IdDemografica() {
  const [participante, setParticipante] = useState(false);
  const [nivelEscolar, setNivelEscolar] = useState("");

  return (
    <div className="p-1text-green-800 space-y-3 text-sm sm:text-base">
      {/* GÊNERO */}
      <Section title="GÊNERO" icon={<FaGenderless />}>
        <CheckboxGroup options={["Masculino", "Feminino", "LGBTQI+"]} />
      </Section>

      {/* RAÇA / COR */}
      <Section title="RAÇA / COR" icon={<FaUserFriends />}>
        <CheckboxGroup options={["Negra", "Parda", "Branca", "Indígena"]} />
      </Section>

      {/* ESCOLARIDADE */}
      <Select
        value={nivelEscolar}
        onChange={setNivelEscolar}
        placeholder="Escolha o nível"
      >
        <SelectTrigger className="bg-white text-green-800 border-green-700">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="nao-alfabetizado">Não alfabetizado</SelectItem>
          <SelectItem value="alfabetizacao-adulto">
            Alfabetização de Adultos
          </SelectItem>
          <SelectItem value="fundamental-incompleto">
            Ensino Fundamental Incompleto
          </SelectItem>
          <SelectItem value="fundamental-completo">
            Ensino Fundamental Completo
          </SelectItem>
          <SelectItem value="medio-incompleto">
            Ensino Médio Incompleto
          </SelectItem>
          <SelectItem value="medio-completo">Ensino Médio Completo</SelectItem>
          <SelectItem value="tecnico">Curso Técnico</SelectItem>
          <SelectItem value="superior-incompleto">
            Ensino Superior Incompleto
          </SelectItem>
          <SelectItem value="superior-completo">
            Ensino Superior Completo
          </SelectItem>
          <SelectItem value="especializacao">
            Pós-graduação / Especialização
          </SelectItem>
          <SelectItem value="mestrado">Mestrado</SelectItem>
          <SelectItem value="doutorado">Doutorado</SelectItem>
          <SelectItem value="pos-doutorado">Pós-doutorado</SelectItem>
        </SelectContent>
      </Select>

      {/* FAIXA ETÁRIA */}
      <Section title="FAIXA ETÁRIA" icon={<FaBirthdayCake />}>
        <CheckboxGroup options={["Infantil", "Juvenil", "Adulto", "Idoso"]} />
      </Section>

      {/* FAIXA DE IDADE */}
      <Section title="FAIXA DE IDADE" icon={<FaBirthdayCake />}>
        <div className="flex items-center gap-2">
          <Input
            placeholder="mín"
            className="w-full bg-white text-green-800 border-green-700"
          />
          <span className="text-green-800 font-semibold">até</span>
          <Input
            placeholder="máx"
            className="w-full bg-white text-green-800 border-green-700"
          />
        </div>
      </Section>

      {/* PARTICIPAÇÃO EM EVENTOS */}
      <div>
        <Label className="flex flex-wrap items-start gap-2 font-bold text-green-700 cursor-pointer leading-snug">
          <input
            type="checkbox"
            checked={participante}
            onChange={() => setParticipante(!participante)}
            className="accent-green-600 w-4 h-4 mt-1"
          />
          <FaCalendarCheck className="text-green-700 mt-[2px]" />
          <span className="block break-words max-w-[230px] sm:max-w-full uppercase">
            Participante de Eventos, Encontros, Desafios etc.
          </span>
        </Label>
      </div>
    </div>
  );
}

// COMPONENTE DE SEÇÃO COM TÍTULO E ÍCONE
const Section = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div>
    <h4 className="flex items-center gap-2 font-bold text-green-800 uppercase text-xs sm:text-sm mb-2">
      {icon} {title}
    </h4>
    {children}
  </div>
);

// COMPONENTE DE GRUPO DE CHECKBOXES PADRONIZADOS
const CheckboxGroup = ({ options }: { options: string[] }) => (
  <div className="flex">
    {options.map((opt) => (
      <label
        key={opt}
        className="flex items-center text-green-800 px-3 py-1 cursor-pointer text-sm sm:text-sm"
      >
        <input type="checkbox" className="mr-2 accent-green-600" />
        {opt}
      </label>
    ))}
  </div>
);
