'use client';

import { useState } from "react";
import { FiShare2, FiCopy, FiUserPlus, FiUserCheck, FiMessageCircle, FiPhone, FiVideo,  FiTruck,
  FiUsers } from "react-icons/fi";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/common/Card";
import { Button } from "@/utils/ui/Button"; // Importando seu componente Button
import { MdDeliveryDining } from "react-icons/md";
import DescricaoCard from "./DescricaoFeed";

interface ProducerCardProps {
  mainImage: string;
  galleryImages: string[];
}

export const ProducerCard: React.FC<ProducerCardProps> = ({
  mainImage,
  galleryImages,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isFriend, setIsFriend] = useState(false); // Estado para controlar amizade

  const toggleFriendship = () => {
    setIsFriend(!isFriend);
    // Aqui você pode adicionar a lógica para chamar sua API
  };

  return (
    <>
  {/* Card 1: Identidade do produtor */}
  <div className="shadow-sm mb-1 mt-1 rounded-b-md ">
   
       <div className="flex items-start "> {/*bg-[#9AB99B] */}
        <Image
          src={mainImage}
          alt="Foto principal"
          width={60}
          height={60}
          className="rounded-md object-cover"
        />
        <div className="flex-1 ml-3 items-start">
          <div className="text-sm font-bold text-black">
            Sitio Canaã - Alimentos Orgânicos
          </div>
          <div className="text-xs text-gray-900">
            Produtos: Alimentos + Bebidas
          </div>
          <div className="text-xs text-green-600 font-bold">
            Alimentação escolar
          </div>
        </div>
        <FiShare2
          size={24}
          className="text-gray-900 hover:text-green-900 cursor-pointer mr-2 mt-1"
        />
      </div>
    </div>


  {/* Card 2: Ações e relacionamento (compacto e responsivo) */}
<Card className="border shadow-sm mb-1">
  <CardContent className="p-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
    
    {/* Ações de comunicação */}
    <div className="flex justify-between sm:justify-start gap-6 sm:gap-10 w-full sm:w-auto">
      <button className="flex flex-col items-center text-gray-700 hover:text-orange-500 text-xs">
        <FiMessageCircle size={20} />
        <span>Mensagem</span>
      </button>
      <button className="flex flex-col items-center text-gray-700 hover:text-blue-500 text-xs">
        <FiPhone size={20} />
        <span>Ligar</span>
      </button>
      <button className="flex flex-col items-center text-gray-700 hover:text-green-500 text-xs">
        <FiVideo size={20} />
        <span>Vídeo</span>
      </button>
    </div>

    {/* Relacionamento e status */}
    <div className="flex items-center justify-between sm:justify-end sm:gap-4 w-full sm:w-auto mt-1 sm:mt-0">
      
      {/* Ícones extras */}
      <div className="flex gap-3 text-gray-600 items-center">
        <MdDeliveryDining size={22} className="text-orange-500" />
        <FiUsers size={20} className="text-blue-600" />
      </div>

      {/* Botão Ser Amigo */}
      <Button
        onClick={toggleFriendship}
        variant={isFriend ? "secondary" : "primary"}
        size="sm"
        className={`ml-2 flex items-center gap-1 px-2 py-1 text-2xl ${
          isFriend
            ? "border border-green-600 text-green-900"
            : "text-white"
        }`}
      >
        {isFriend ? (
          <>
            <FiUserCheck size={14} />
            <span>Amigo</span>
          </>
        ) : (
          <>
            <FiUserPlus size={14} />
            <span>Ser Amigo</span>
          </>
        )}
      </Button>
    </div>
  </CardContent>
</Card>


<DescricaoCard />
    </>
  );
};