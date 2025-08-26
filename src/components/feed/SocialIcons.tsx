"use client";

import { useEffect, useState, JSX } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaMapMarkedAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { AiOutlineMail, AiOutlineGlobal, AiOutlineLink } from "react-icons/ai";
import { PiButterflyFill } from "react-icons/pi";
import { SiThreads } from "react-icons/si";
import { server } from "@/utils/server";
import { userFullSchema } from "@/schemas/userSchema";
import z from "zod";
// Certifique-se de que UserFullSchema é um valor Zod schema, não apenas um tipo
type SocialLinks = Partial<z.infer<typeof userFullSchema>>;

type IconItem = {
  icon: JSX.Element;
  label: string;
  action: () => void;
  highlight?: boolean;
  colSpan?: boolean;
};

interface SocialIconsProps {
  links?: SocialLinks;
  userId?: string;
}

export const SocialIcons = ({ userId }: SocialIconsProps) => {
  const [links, setLinks] = useState<SocialLinks>({});

  useEffect(() => {
    async function fetchSocialLinks() {
      try {
        const endpoint = userId ? `/user/${userId}/social-links` : "/user/me";
        const res = await server.get(endpoint);

        // Valida usando o Zod importado
        const parsed = userFullSchema.safeParse(res.data.socialLinks || {});
        if (!parsed.success) {
          console.error("Erro de validação dos links:", parsed.error.format());
          setLinks({}); // fallback caso venha inválido
          return;
        }

        setLinks(parsed.data);
      } catch (err) {
        console.error("Erro ao buscar links:", err);
      }
    }

    fetchSocialLinks();
  }, [userId]);

  const mainIcons: IconItem[] = [
    links.gps?.Latitude != null &&
      links.gps?.Longitude != null && {
        icon: <FaMapMarkedAlt size={28} />,
        label: "ATIVAR GPS",
        highlight: true,
        colSpan: true,
        action: () => {
          const { Latitude, Longitude } = links.gps!;
          window.open(
            `https://www.google.com/maps?q=${Latitude},${Longitude}`,
            "_blank"
          );
        },
      },
    links?.Site && {
      icon: <AiOutlineGlobal size={24} />,
      label: "Site",
      action: () => window.open(links.Site!, "_blank"),
    },
    links?.Linktree && {
      icon: <AiOutlineLink size={24} />,
      label: "Linktree",
      action: () => window.open(links.Linktree!, "_blank"),
    },
    links?.EmailContato && {
      icon: <AiOutlineMail size={24} />,
      label: "Email",
      action: () => (window.location.href = `mailto:${links.EmailContato}`),
    },
    links?.Instagram && {
      icon: <FaInstagram size={24} />,
      label: "Instagram",
      action: () => window.open(links.Instagram!, "_blank"),
    },
    links?.Facebook && {
      icon: <FaFacebook size={24} />,
      label: "Facebook",
      action: () => window.open(links.Facebook!, "_blank"),
    },
    links?.WhatsappTelegram && {
      icon: <FaWhatsapp size={24} />,
      label: "WhatsApp",
      action: () => window.open(links.WhatsappTelegram!, "_blank"),
    },
    // links?.Youtube && {
    //   icon: <FaYoutube size={24} />,
    //   label: "YouTube",
    //   action: () => window.open(links.Youtube!, "_blank"),
    // },
    // links?.Threads && {
    //   icon: <SiThreads size={24} />,
    //   label: "Threads",
    //   action: () => window.open(links.Threads!, "_blank"),
    // },
    // links?.TikTok && {
    //   icon: <FaTiktok size={24} />,
    //   label: "TikTok",
    //   action: () => window.open(links.TikTok!, "_blank"),
    // },
    // links?.Borboleta && {
    //   icon: <PiButterflyFill size={24} />,
    //   label: "Borboleta",
    //   action: () => alert("Este é um botão simbólico"),
    // },
  ].filter(Boolean) as IconItem[];

  const showAdicionar = false;
  const adicionarBtn: IconItem | null = showAdicionar //links.adicionar
    ? {
        icon: <FiPlus size={24} />,
        label: "Adicionar",
        action: () => alert("Função de adicionar em construção"),
      }
    : null;

  const allIcons: IconItem[] = [
    ...mainIcons,
    ...(adicionarBtn ? [adicionarBtn] : []),
  ];

  return (
    <div className="grid grid-cols-6 gap-2 p-2 rounded-xl w-full shadow-gray-300">
      {allIcons.map((item, index) => {
        const isGPS = item.colSpan;
        return (
          <button
            key={index}
            title={item.label}
            onClick={item.action}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition shadow-md shadow-gray-400 text-sm font-medium border border-black
              ${
                item.highlight
                  ? "bg-[#05c8f7] text-black hover:bg-green-300"
                  : "bg-white text-black hover:scale-105"
              }
              ${isGPS ? "col-span-2" : ""}`}
          >
            {item.icon}
            <span
              className={`mt-1 text-[11px] leading-tight text-center ${
                item.highlight ? "font-bold uppercase" : ""
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
