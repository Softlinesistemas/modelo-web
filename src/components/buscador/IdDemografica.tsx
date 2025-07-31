
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
import { FaixaEtaria } from './FaixaEtaria';

export const IdDemografica = () => {
  return (
    <div className="bg-white bg bg-opacity-20 p-6 rounded-lg mb-4 shadow-sm text-sm text-gray-800 ">
      {/* GÊNERO */}
      <div className='mb-2'>
        <Label className="flex items-center gap-2 font-bold text-green-700 mb-2">
          <FaUser className="text-green-800" />
          GÊNERO
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
      <div className='mb-2'>
        <Label className="flex items-center gap-2 font-bold text-green-700 mb-2">
          <FaUserFriends className="text-green-800" />
          RAÇA / COR
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
      <div className='mb-2'>
        <Label className="flex items-center gap-2 font-bold text-green-700 mb-2">
          <FaGraduationCap className="text-green-800" />
          ESCOLARIDADE
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
      <div className='mb-2'>
        <Label className="flex items-center gap-2 font-bold text-green-700 mb-2">
          <FaChild className="text-green-800" />
          FAIXA ETÁRIA
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
      <FaixaEtaria />
      {/* PARTICIPAÇÃO */}
      <div className='mb-2'>
        <Label className="flex items-center gap-2 font-bold text-green-700">
          <Input type="checkbox" />
          <FaCalendarCheck className="text-green-700" />
          {"Participante de Eventos, Encontros, Desafios etc.".toUpperCase()}
        </Label>
      </div>
    </div>
  );
};
