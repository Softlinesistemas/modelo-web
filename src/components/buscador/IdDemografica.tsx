
import { Label } from '@/utils/ui/Label';
import {
  FaUser,
  FaTransgenderAlt,
  FaGraduationCap,
  FaChild,
  FaUserFriends,
  FaUserClock,
  FaCalendarCheck,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa';
import Input from '../common/Input';

export const IdDemografica = () => {
  return (
    <div className="border-2 border-white bg-white p-6 rounded-lg space-y-6 shadow-md text-sm text-gray-800">

      {/* GÊNERO */}
      <div>
        <Label className="flex items-center gap-2 font-bold text-green-700 mb-2">
          <FaUser className="text-green-800" />
          Gênero
        </Label>
        <div className="flex gap-4 flex-wrap">
          <Label className="flex items-center gap-1">
            <Input type="checkbox" /> Masculino
          </Label>
          <Label className="flex items-center gap-1">
            <Input type="checkbox" /> Feminino
          </Label>
          <Label className="flex items-center gap-1">
            <Input type="checkbox" /> LGBTQI+ <FaTransgenderAlt className="text-pink-600" />
          </Label>
        </div>
      </div>

      {/* RAÇA / COR */}
      <div>
        <Label className="flex items-center gap-2 font-bold text-green-700 mb-2">
          <FaUserFriends className="text-green-800" />
          Raça / Cor
        </Label>
        <div className="flex gap-4 flex-wrap">
          <Label className="flex items-center gap-1">
            <Input type="checkbox" /> Negra
          </Label>
          <Label className="flex items-center gap-1">
            <Input type="checkbox" /> Parda
          </Label>
          <Label className="flex items-center gap-1">
            <Input type="checkbox" /> Branca
          </Label>
          <Label className="flex items-center gap-1">
            <Input type="checkbox" /> Indígena
          </Label>
        </div>
      </div>

      {/* ESCOLARIDADE */}
      <div>
        <Label className="flex items-center gap-2 font-bold text-green-700 mb-2">
          <FaGraduationCap className="text-green-800" />
          Escolaridade
        </Label>
        <select className="w-full border borde-absolute border-green-300 text-green-700 font-bold py-2 px-3 rounded">
          <option value="">Selecione...</option>
          <option value="infantil">Educação Infantil</option>
          <option value="fundamental1">Ensino Fundamental (1º ao 5º ano)</option>
          <option value="fundamental2">Ensino Fundamental (6º ao 9º ano)</option>
          <option value="medio">Ensino Médio</option>
          <option value="tecnico">Curso Técnico</option>
          <option value="superior">Ensino Superior</option>
          <option value="especializacao">Especialização</option>
          <option value="mestrado">Mestrado</option>
          <option value="doutorado">Doutorado</option>
          <option value="nao_estuda">Não está estudando</option>
        </select>
      </div>

      {/* FAIXA ETÁRIA */}
      <div>
        <Label className="flex items-center gap-2 font-bold text-green-700 mb-2">
          <FaChild className="text-green-800" />
          Faixa Etária
        </Label>
        <div className="flex gap-4 flex-wrap">
          <Label className="flex items-center gap-1">
            <Input type="checkbox" /> 👶 Infantil
          </Label>
          <Label className="flex items-center gap-1">
            <Input type="checkbox" /> 🧒 Juvenil
          </Label>
          <Label className="flex items-center gap-1">
            <Input type="checkbox" /> 🧑 Adulto
          </Label>
          <Label className="flex items-center gap-1">
            <Input type="checkbox" /> 👴 Idoso
          </Label>
        </div>
      </div>

      {/* IDADE */}
      <div>
        <Label className="flex items-center gap-2 font-bold text-green-700 mb-2">
          <FaUserClock className="text-green-800" />
          Faixa de Idade
        </Label>
        <div className="flex items-center gap-2 bg-gray-100 border rounded p-2 shadow-sm w-fit">
          <FaArrowLeft className="text-gray-500" />
          <Input
            type="number"
            className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
            placeholder="mín"
          />
          <span className="text-sm text-gray-700">até</span>
          <Input
            type="number"
            className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
            placeholder="máx"
          />
          <FaArrowRight className="text-gray-500" />
        </div>
      </div>

      {/* PARTICIPAÇÃO */}
      <div>
        <Label className="flex items-center gap-2 font-bold text-green-700">
          <Input type="checkbox" />
          <FaCalendarCheck className="text-green-700" />
          Participante de Eventos, Encontros, Desafios etc.
        </Label>
      </div>
    </div>
  );
};
