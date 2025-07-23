'use client';

import { useState } from "react";
import { FiShare2, FiCopy, FiUserPlus, FiUserCheck, FiMessageCircle, FiPhone, FiVideo,  FiTruck,
  FiUsers } from "react-icons/fi";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/common/Card";
import { Button } from "@/utils/ui/Button"; // Importando seu componente Button

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
      {/* Card 1: Informações básicas e galeria */}
     <Card className="border shadow-sm mb-1">
  <CardHeader className="p-3 border-b">
    <div className="flex items-center">
      <Image
        src={mainImage}
        alt="Foto principal"
        width={60}
        height={60}
        className="rounded-md object-cover"
      />
      <div className="flex-1 ml-3">
        <CardTitle className="text-sm font-semibold text-gray-800">
          Sitio Canaã - Alimentos Organicos
        </CardTitle>
        <div className="text-xs text-gray-600">
          Produtos: Alimentos + Bebidas
        </div>
        <div className="text-xs text-green-600 font-medium">
          Alimentação escolar
        </div>
      </div>
      <FiShare2 className="text-gray-500 hover:text-gray-800 cursor-pointer" />
    </div>
  </CardHeader>

  <CardContent className="p-0">
    {/* Layout flexível: vertical no mobile, horizontal no desktop */}
    <div className="px-3 pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

      {/* Ações de comunicação */}
      <div className="flex gap-4 justify-start">
        <button className="flex flex-col items-center text-gray-700 hover:text-orange-500">
          <FiMessageCircle size={24} />
          <span className="text-xs">Mensagem</span>
        </button>
        <button className="flex flex-col items-center text-gray-700 hover:text-blue-500">
          <FiPhone size={24} />
          <span className="text-xs">Ligar</span>
        </button>
        <button className="flex flex-col items-center text-gray-700 hover:text-green-500">
          <FiVideo size={24} />
          <span className="text-xs">Vídeo</span>
        </button>
      </div>

      {/* Botões de relacionamento */}
      <div className="flex flex-col items-end gap-2 sm:items-end">
        {/* Ícones extras: Delivery e Grupos */}
        <div className="flex gap-3 text-gray-600">
          <div className="flex items-center gap-1 text-xs">
            <FiTruck size={16} className="text-orange-500" />
            {/* <span>Faz Delivery</span> */}
          </div>
          <div className="flex items-center gap-1 text-xs">
            <FiUsers size={16} className="text-blue-600" />
            {/* <span>Participa de Grupos</span> */}
          </div>
        </div>

        {/* Botão Ser Amigo */}
        <Button
          onClick={toggleFriendship}
          variant={isFriend ? "secondary" : "primary"}
          size="sm"
          className={`flex items-center gap-1 ${
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
    </div>
  </CardContent>
</Card>


      {/* Card 2: Descrição */}
      <Card className="border shadow-sm">
        <CardContent className="p-0.5">
          <div className="px-3 py-2 text-sm bg-gray-50 text-gray-800 relative ">
            <div>
              {expanded ? (
                <>
                  Bem vindo ao Sitio Canaã Agricultura Orgânica!
                  <br />
                  Uma empresa de agricultura familiar em Imbituba - SC
                  <br />
                  Temos foco a produção orgânica agroecológica
                  <br />
                  Oferecemos Café da Manhã - Excursão, avise antes.
                  <br />
                  Temos Banana, Mandioca, Farinha...
                  <br />
                  De Setembro à Dezembro (Primavera) temos colheita...
                </>
              ) : (
                <>
                  Bem vindo ao Sitio Canaã Agricultura Orgânica!
                  <br />
                  Uma empresa de agricultura familiar em Imbituba - SC
                  <br />
                  Temos foco a produção orgânica agroecologica
                  <br />
                  Oferecemos Café da Manhã - Excursão, avise antes.
                  <br />
                  Temos Banana, Mandioca, Farinha...
                  <span
                    className="text-green-600 cursor-pointer ml-1"
                    onClick={() => setExpanded(true)}
                  >
                    Ver mais
                  </span>
                </>
              )}
            </div>
            <FiCopy className="absolute top-2 right-2 text-gray-500 cursor-pointer" />
          </div>
        </CardContent>
      </Card>
    </>
  );
};