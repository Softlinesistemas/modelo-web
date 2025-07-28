import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface CollapsibleSectionProps {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  bgColor?: string;
}

// Função que substitui só PCD e SSE por links clicáveis, mantendo o resto normal
const parseSubTitle = (text: string) => {
  const linkMap: Record<string, string> = {
    PCD: 'https://exemplo.com/pcd',
    SSE: 'https://exemplo.com/sse',
  };

  // Regex para encontrar só as palavras exatas PCD ou SSE
  const regex = new RegExp(`\\b(${Object.keys(linkMap).join('|')})\\b`, 'g');

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Texto antes do termo encontrado
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const term = match[0];
    // Termo vira link clicável
    parts.push(
      <a
        key={match.index}
        href={linkMap[term]}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-blue-800 hover:text-green-300"
        onClick={e => e.stopPropagation()} // para não fechar a seção ao clicar no link
      >
        {term}
      </a>
    );
    lastIndex = regex.lastIndex;
  }

  // Restante do texto após o último termo encontrado
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
};

export const CollapsibleSection = ({
  title,
  subTitle,
  children,
  bgColor = 'bg-green-500',
}: CollapsibleSectionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded border mb-4 ${bgColor} text-white`}>
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex justify-between items-center px-4 py-2 font-bold select-none"
      >
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-2"
        >
          <FaChevronDown />
        </motion.div>
          
        <div className="flex-1 flex flex-col text-center">
          <h3 className="font-semibold text-base md:text-lg">{title}</h3>
          {subTitle && (
            <p className="text-xs md:text-sm mt-1">
              {parseSubTitle(subTitle)}
            </p>
          )}
        </div>
                <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-2"
        >
          <FaChevronDown />
        </motion.div>
      </div>

      {open && <div className=" text-black p-4">{children}</div>}
    </div>
  );
};
