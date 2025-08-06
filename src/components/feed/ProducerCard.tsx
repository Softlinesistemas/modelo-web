"use client";

import { useState } from "react";
import {
  FiUserPlus,
  FiUserCheck,
  FiMessageSquare,
  FiPhone,
  FiVideo,
  FiUsers,
} from "react-icons/fi";
import Image from "next/image";
import { MdDeliveryDining } from "react-icons/md";
import { Card, CardContent } from "@/components/common/Card";
import { Button } from "@/utils/ui/Button";
import DescricaoCard from "./DescricaoFeed";
import { IoShareSocialSharp } from "react-icons/io5";

interface ProducerCardProps {
  mainImage: string;
  galleryImages: string[];
  tipo?: "pessoa" | "grupo" | "fornecedor"; // Novo tipo
  dataFundacao?: string;
}

export const ProducerCard: React.FC<ProducerCardProps> = ({
  mainImage,
  galleryImages,
  tipo = "pessoa",
  dataFundacao,
}) => {
  const [isFriend, setIsFriend] = useState(false);

  const toggleFriendship = () => {
    setIsFriend(!isFriend);
  };

  const isfornecedor = tipo === "fornecedor";

  return (
    <>
      {/* Card 1: Cabeçalho */}
      <div className="shadow-sm mb-1 mt-1 rounded-b-md">
        <div className="flex items-start">
          <Image
            src={mainImage}
            alt="Foto principal"
            width={90}
            height={90}
            className="rounded-sm object-cover border-2 border-black"
          />
          <div className="flex-1 ml-3 items-start">
            {isfornecedor ? (
              <>
                <div className="text-md font-bold text-black">
                  Fornecedor Simples Ltda
                </div>
                <div className="text-md text-gray-900">
                  Apenas serviços essenciais
                </div>
                <div className="text-md font-bold text-black">
                  Contato direto
                </div>
              </>
            ) : (
              <>
                <div className="text-md font-bold text-black">
                  Sitio Canaã - Alimentos Orgânicos
                </div>
                <div className="text-md text-gray-900">
                  Produtos: Alimentos e Bebidas
                </div>
                <div className="text-md font-bold text-black">
                  Alimentação escolar
                </div>
              </>
            )}
          </div>

          {/* Ícones à direita */}
          <div className="flex flex-col justify-between items-center mr-2 h-[90px]">
                 <IoShareSocialSharp
                  size={24}
                  className="text-gray-900 hover:text-green-900 cursor-pointer"
                />
                <MdDeliveryDining size={22} className="text-orange-500" />
                <FiUsers size={20} className="text-blue-600" />
            
          </div>
        </div>
      </div>

      {/* Card 2: Ações */}
      <Card className="border shadow-sm mb-1">
        <CardContent className="p-1 flex flex-row sm:items-center sm:justify-between">
          {/* Ações à esquerda */}
          <div className="flex sm:justify-start w-full gap-8 sm:w-auto">
            {/* Mensagem sempre aparece */}
            <button className="flex flex-col items-center text-gray-700 hover:text-orange-500 text-xs">
              <FiMessageSquare size={20} />
              <span>Mensagem</span>
            </button>

            {/* Apenas para tipo pessoa */}
            {tipo === "pessoa" || isfornecedor && (
              <>
                <button className="flex flex-col items-center text-gray-700 hover:text-blue-500 text-xs">
                  <FiPhone size={20} />
                  <span>Ligar</span>
                </button>
                <button className="flex flex-col items-center text-gray-700 hover:text-green-500 text-xs">
                  <FiVideo size={20} />
                  <span>Vídeo</span>
                </button>
              </>
            )}
          </div>

          {/* Ações à direita */}
          <div className="flex justify-end sm:gap-4 w-full sm:w-auto mt-1 sm:mt-0">
            {(tipo === "pessoa" || isfornecedor) ? (
              <Button
                onClick={toggleFriendship}
                variant={isFriend ? "friend" : "primary"}
                size="sm"
                className={`ml-2 flex items-center gap-1 px-2 py-1 text-2xl ${
                  isFriend
                    ? "border border-green-600 text-green-900"
                    : "text-white"
                }`}
              >
                {isFriend ? (
                  <>
                    {/* <FiUserCheck size={14} /> */}
                    <span>Amigo</span>
                  </>
                ) : (
                  <>
                    {/* <FiUserPlus size={14} /> */}
                    <span>Ser Amigo</span>
                  </>
                )}
              </Button>
            ) : (
              <div className="text-sm text-gray-700 font-medium w-full text-center sm:text-right">
                Fundação:{" "}
                <span className="text-green-800 font-bold">
                  {dataFundacao || "01/01/2020"}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Descrição adicional */}
      <DescricaoCard />
    </>
  );
};
