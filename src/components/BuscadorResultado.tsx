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
}

export const BuscadorResultado: React.FC<Props> = ({ results }) => {
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
          <h3 className="text-lg font-bold mb-2 text-green-800">Resultados encontrados:</h3>
          <ul className="space-y-3">
            {results.map((item, index) => (
              <li
                key={index}
                className="bg-gray-100 border border-gray-300 p-3 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <p className="font-semibold">{item.nome}</p>
                <p className="text-sm text-gray-600">{item.descricao}</p>
                <p className="text-xs text-gray-500">Local: {item.localizacao}</p>
                {item.categoria && (
                  <p className="text-xs text-gray-400 italic">Categoria: {item.categoria}</p>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
