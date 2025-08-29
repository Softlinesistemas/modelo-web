"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FiUserPlus, FiUserCheck, FiMessageSquare, FiPhone, FiVideo, FiUsers } from "react-icons/fi";
import { MdDeliveryDining } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { CardAlter, CardContent } from "@/components/common/Card";
import { Button } from "@/utils/ui/Button";
import DescricaoCard from "./DescricaoFeed";
import { server } from "@/utils/server"; // Axios configurado com token
import { Usuario, Amizade } from "@/types/User";

type UsuarioComFriendship = Usuario & { friendship: Amizade[] };

export interface ProducerCardProps {
  mainImage?: string;
  galleryImages?: string[];
  tipo?: "pessoal" | "grupo" | "fornecedor" | "empresa";
  nome?: string;
  descricao?: string;
  extraInfo?: string;
  initialIsFriend?: boolean;
  dataFundacao?: string;
  fetchUser?: boolean;
  dataUser?: UsuarioComFriendship;
}

export const ProducerCardForm: React.FC<ProducerCardProps> = ({
  mainImage,
  galleryImages,
  tipo,
  nome,
  descricao,
  extraInfo,
  initialIsFriend = false,
  dataFundacao,
  fetchUser = true,
  dataUser,
}) => {

  const isFornecedor = dataUser?.Fornecedor;
  const isGrupo = false;

  const isFriend = dataUser?.friendship?.some(f => f.Aceita) ?? false;
  const isPending = dataUser?.friendship?.some(f => !f.Aceita) ?? false;

  const toggleFriendship = () => {
    // Chamar API para adicionar/remover amizade
  };

  return (
    <>
      {/* Card 1 */}
      <div className="shadow-sm mb-1 mt-1 rounded-b-md">
        <div className="flex items-start">
          <Image
            src={mainImage || "/default-profile.png"}
            alt={`Foto de ${dataUser?.Nome}`}
            width={96}
            height={96}
            className="h-24 w-24 rounded overflow-hidden flex-fit border-2 border-black cursor-pointer"
          />
          <div className="flex-1 ml-3 items-start">
            <div className="text-md font-bold text-black">{dataUser?.Nome}</div>
            <div className="text-md text-gray-900">{dataUser?.Apresentacao}</div>
            {/* {dataUser.extraInfo && <div className="text-md font-bold text-black">{userData.extraInfo}</div>} */}
          </div>
          {(tipo === "pessoal" || isFornecedor) && (
            <div className="flex flex-col justify-between items-center mr-2 h-[90px]">
              <IoShareSocialSharp size={24} className="text-gray-900 hover:text-green-900 cursor-pointer" />
              <FiUsers size={20} className="text-blue-600" />
              <MdDeliveryDining size={22} className="text-[#B6D2B7]" />
              {(isFornecedor || isGrupo) && <MdDeliveryDining size={22} className="text-red-500" />}
            </div>
          )}
        </div>
      </div>

      {/* Card 2: Ações */}
      <CardAlter className="shadow-sm mb-1">
        <CardContent className="p-1 flex flex-row sm:items-center sm:justify-between">
          <div className="flex sm:justify-start w-full gap-8 sm:w-auto">
            <button className="flex flex-col items-center text-green-700 hover:text-orange-500 text-xs">
              <FiMessageSquare size={20} />
              <span>Mensagem</span>
            </button>

            {(tipo === "pessoal" || isFornecedor) && (
              <>
                <button className="flex flex-col items-center text-green-700 hover:text-orange-500 text-xs">
                  <FiPhone size={20} />
                  <span>Ligar</span>
                </button>
                <button className="flex flex-col items-center text-green-700 hover:text-orange-500 text-xs">
                  <FiVideo size={20} />
                  <span>Vídeo</span>
                </button>
              </>
            )}

            {/* {isGrupo && userData.dataFundacao && (
              <div className="ml-4 text-sm text-gray-700 font-medium whitespace-nowrap">
                Fundação: <span className="text-green-800 font-bold">{userData.dataFundacao}</span>
              </div>
            )} */}
          </div>

          <div className="flex justify-end sm:gap-4 w-full sm:w-auto mt-1 sm:mt-0 items-center">
            {(tipo === "pessoal" || isFornecedor) && (
              <Button
                onClick={toggleFriendship}
                variant={isFriend ? "friend" : "primary"}
                size="sm"
                className={`ml-2 flex items-center gap-1 px-2 py-1 text-2xl ${
                  isFriend
                    ? "border border-green-600 text-green-900"
                    : isPending
                    ? "border border-yellow-500 text-yellow-800"
                    : "text-white"
                }`}
              >
                <span>
                  {isFriend
                    ? "AMIGO"
                    : isPending
                    ? "Solicitação enviada"
                    : "Ser AMIGO"}
                </span>
              </Button>
            )}

            {isGrupo && (
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
                <span>{isFriend ? "Participando" : "Participar"}</span>
              </Button>
            )}
          </div>
        </CardContent>
      </CardAlter>

      {/* Card 3: Descrição adicional */}
      <DescricaoCard tipo={tipo ?? "pessoal"} />
    </>
  );
};




// "use client";

// import { useState } from "react";
// import {
//   FiUserPlus,
//   FiUserCheck,
//   FiMessageSquare,
//   FiPhone,
//   FiVideo,
//   FiUsers,
// } from "react-icons/fi";
// import Image from "next/image";
// import { MdDeliveryDining } from "react-icons/md";
// import { Card, CardAlter, CardContent } from "@/components/common/Card";
// import { Button } from "@/utils/ui/Button";
// import DescricaoCard from "./DescricaoFeed";
// import { IoShareSocialSharp } from "react-icons/io5";

// interface ProducerCardProps {
//   mainImage: string;
//   galleryImages: string[];
//   tipo?: "pessoal" | "grupo" | "fornecedor" | "empresa";
//   dataFundacao?: string;
// }

// const tipoConfig: Record<
//   string,
//   { nome: string; descricao: string; extraInfo?: string }
// > = {
//   pessoal: {
//     nome: "Maria Da Silva",
//     descricao: "Agricultora",
//     extraInfo: "Familia Canaa",
//   },
//   fornecedor: {
//     nome: "Sitio Canaã - Alimentos Orgânicos",
//     descricao: "Produtos: Alimentos e Bebidas",
//     extraInfo: "Alimentação escolar",
//   },
//   empresa: {
//     nome: "AgroTech Brasil LTDA",
//     descricao: "Tecnologia para o campo",
//     extraInfo: "Inovação agrícola",
//   },
//   grupo: {
//     nome: "TRATOR-BA_T-4_SISAL_CAR-0113",
//     descricao: "3. Veículo Coletivo - CONVÊNIO",
//     extraInfo: "Porte Leve",
//   },
// };

// export const ProducerCard: React.FC<ProducerCardProps> = ({
//   mainImage,
//   galleryImages,
//   tipo = "pessoal",
//   dataFundacao,
// }) => {
//   const [isFriend, setIsFriend] = useState(false);

//   const toggleFriendship = () => {
//     setIsFriend(!isFriend);
//   };

//   const isFornecedor = tipo === "fornecedor" || tipo === "empresa";
//   const isGrupo = tipo === "grupo";

//   const { nome, descricao, extraInfo } =
//     tipoConfig[tipo] || tipoConfig["pessoal"];

//   return (
//     <>
//       {/* Card 1: Cabeçalho com foto e dados */}
//       <div className="shadow-sm mb-1 mt-1 rounded-b-md">
//         <div className="flex items-start">
//           {/* Foto principal */}
//           <Image
//             src={mainImage}
//             alt={`Foto de ${nome}`}
//             width={96}
//             height={96}
//             className="h-24 w-24 rounded overflow-hidden flex-fit border-2 border-black cursor-pointer"
//           />

//           {/* Dados principais */}
//           <div className="flex-1 ml-3 items-start">
//             <div className="text-md font-bold text-black">{nome}</div>
//             <div className="text-md text-gray-900">{descricao}</div>
//             {extraInfo && (
//               <div className="text-md font-bold text-black">{extraInfo}</div>
//             )}
//           </div>

//           {/* Ícones à direita */}
//           {(tipo === "pessoal" || isFornecedor) && (
//             <>
//               <div className="flex flex-col justify-between items-center mr-2 h-[90px]">
//                 <IoShareSocialSharp
//                   size={24}
//                   className="text-gray-900 hover:text-green-900 cursor-pointer"
//                 />
//                 <FiUsers size={20} className="text-blue-600" />
//                 <MdDeliveryDining size={22} className="text-[#B6D2B7]" />
//                 {(isFornecedor || isGrupo) && (
//                 <MdDeliveryDining size={22} className="text-red-500" />
//               )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Card 2: Ações */}
//       <CardAlter className=" shadow-sm mb-1">
//         <CardContent className="p-1 flex flex-row sm:items-center sm:justify-between">
//           {/* Ações à esquerda */}
//           <div className="flex sm:justify-start w-full gap-8 sm:w-auto">
//             {/* Mensagem sempre aparece */}
//             <button className="flex flex-col items-center text-green-700 hover:text-orange-500 text-xs">
//               <FiMessageSquare size={20} />
//               <span>Mensagem</span>
//             </button>

//             {/* Mostrar ligar e vídeo só para pessoa, fornecedor e empresa */}
//             {(tipo === "pessoal" || isFornecedor) && (
//               <>
//                 <button className="flex flex-col items-center text-green-700 hover:text-orange-500 text-xs">
//                   <FiPhone size={20} />
//                   <span>Ligar</span>
//                 </button>
//                 <button className="flex flex-col items-center text-green-700 hover:text-orange-500 text-xs">
//                   <FiVideo size={20} />
//                   <span>Vídeo</span>
//                 </button>
//               </>
//             )}

//             {/* Mostrar fundação apenas para grupos */}
//             {tipo === "grupo" && dataFundacao && (
//               <div className="ml-4 text-sm text-gray-700 font-medium whitespace-nowrap">
//                 Fundação:{" "}
//                 <span className="text-green-800 font-bold">{dataFundacao}</span>
//               </div>
//             )}
//           </div>

//           {/* Ações à direita */}
//           <div className="flex justify-end sm:gap-4 w-full sm:w-auto mt-1 sm:mt-0 items-center">
//             {/* Se for pessoa, fornecedor ou empresa, botão Amigo */}
//             {(tipo === "pessoal" || isFornecedor) && (
//               <Button
//                 onClick={toggleFriendship}
//                 variant={isFriend ? "friend" : "primary"}
//                 size="sm"
//                 className={`ml-2 flex items-center gap-1 px-2 py-1 text-2xl ${
//                   isFriend
//                     ? "border border-green-600 text-green-900"
//                     : "text-white"
//                 }`}
//               >
//                 {isFriend ? (
//                   <>
//                     {/* <FiUserCheck size={14} /> */}
//                     <span>AMIGO</span>
//                   </>
//                 ) : (
//                   <>
//                     {/* <FiUserPlus size={14} /> */}
//                     <span>Ser AMIGO</span>
//                   </>
//                 )}
//               </Button>
//             )}

//             {/* Se for grupo, botão Participar do Grupo */}
//             {isGrupo && (
//               <Button
//                 onClick={toggleFriendship}
//                 variant={isFriend ? "friend" : "primary"}
//                 size="sm"
//                 className={`ml-2 flex items-center gap-1 px-2 py-1 text-2xl ${
//                   isFriend
//                     ? "border border-green-600 text-green-900"
//                     : "text-white"
//                 }`}
//               >
//                 {isFriend ? (
//                   <>
//                     {/* <FiUserCheck size={14} /> */}
//                     <span>Participando</span>
//                   </>
//                 ) : (
//                   <>
//                     {/* <FiUserPlus size={14} /> */}
//                     <span>Participar</span>
//                   </>
//                 )}
//               </Button>
//             )}
//           </div>
//         </CardContent>
//       </CardAlter>

//       {/* Card 3: Descrição adicional */}
//       <DescricaoCard tipo={tipo} />
//     </>
//   );
// };
