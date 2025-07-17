'use client';

import { useState } from "react";
import { FiShare2, FiCopy, FiUserPlus, FiUserCheck } from "react-icons/fi";
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
      <Card className="border shadow-sm mb-4">
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
          {/* Gallery */}
          <div className="flex gap-1 px-3 pb-2">
            {galleryImages.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`foto-${i}`}
                width={60}
                height={40}
                className="rounded-sm object-cover"
              />
            ))}
          </div>

          {/* Botão Amigo - Usando seu componente Button */}
          <div className="px-3 pb-2 flex justify-end">
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
                  <span>Adicionar</span>
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Descrição */}
      <Card className="border shadow-sm">
        <CardContent className="p-0">
          <div className="px-3 py-2 text-sm bg-gray-50 text-gray-800 relative">
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
                  <span className="text-green-600 cursor-pointer ml-1" onClick={() => setExpanded(true)}>
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