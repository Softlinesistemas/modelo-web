'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type BuscadorResultado = {
  nome: string;
  descricao: string;
  localizacao: string;
  tipo: string;
  categoria?: string;
};

interface Props {
  results: BuscadorResultado[];
  filterType: string;
}

export const BuscadorResultado: React.FC<Props> = ({ results, filterType }) => {
  const filterName = filterType === 'amigos' ? 'Amigos' : 
                    filterType === 'grupos' ? 'Grupos' : 
                    filterType.charAt(0).toUpperCase() + filterType.slice(1);
  
  return (
    <AnimatePresence>
      {results.length > 0 && (
        <motion.div
          key="results"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="mt-6"
        >
          <h3 className="text-lg font-bold mb-2 text-green-800">
            Filtrar {filterName} Resultados encontrados:
          </h3>
          
          <div className="space-y-3">
            {results.map((item, index) => (
              <div
                key={index}
                className="border-l-4 border-green-500 pl-3 py-1"
              >
                <p className="font-semibold">{item.nome}</p>
                <p className="text-sm">{item.descricao}</p>
                {item.localizacao && (
                  <p className="text-xs text-gray-500">Local: {item.localizacao}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};