import React, { useState } from "react";
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

export interface CollapsibleSectionProps {
  title: string;
  subTitle?: React.ReactNode;  // agora aceita JSX
  children: React.ReactNode;
  headerBgColor?: string; // cor de fundo do cabeçalho
}

export const CollapsibleSection = ({
  title,
  subTitle,
  children,
  headerBgColor = 'bg-green-500',
}: CollapsibleSectionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded border mb-4">
      {/* Cabeçalho com fundo colorido */}
      <div
        onClick={() => setOpen(!open)}
        className={`cursor-pointer flex justify-between items-center px-4 py-2 select-none text-white ${headerBgColor} rounded-t`}
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
            <div className="text-xs md:text-sm mt-1 text-white/80">
              {subTitle}
            </div>
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

      {/* Conteúdo interno, fundo branco */}
      {open && <div className="text-black p-4 bg-white rounded-b">{children}</div>}
    </div>
  );
};
