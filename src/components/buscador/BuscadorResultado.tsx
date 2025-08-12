'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaMapMarkerAlt, FaUserAlt, FaUsers } from 'react-icons/fa';
import Image from 'next/image';

export type BuscadorResultado = {
  id: string;
  nome: string;
  descricao: string;
  localizacao: string;
  tipo: 'AMIGOS' | 'grupos' | 'fornecedores' | 'clientes'; // tipos esperados
  categoria?: string;
  fotoUrl?: string; // opcional
};

interface Props {
  results: BuscadorResultado[];
  filterType: string;
}

export const BuscadorResultado: React.FC<Props> = ({ results, filterType }) => {
  const router = useRouter();

  const handleClick = (item: BuscadorResultado) => {
    const basePath = item.tipo === 'AMIGOS' ? '/perfil'
                   : item.tipo === 'grupos' ? '/grupo'
                   : '/entidade'; // genérico para fornecedores, clientes etc.
    router.push(`${basePath}/${item.id}`);
  };

  const filterName = filterType === 'AMIGOS' ? 'AMIGOS' :
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
          <h3 className="text-lg font-bold mb-4 text-green-800">
            Resultados encontrados em {filterName}:
          </h3>

          <div className="grid gap-3">
            {results.map((item, index) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleClick(item)}
                className="flex items-center gap-4 p-3 bg-white rounded-xl shadow border cursor-pointer hover:shadow-lg transition"
              >
                {/* FOTO */}
                <div className="w-14 h-14 relative rounded-sm overflow-hidden border-2 border-green-600">
                  {item.fotoUrl ? (
                    <Image
                      src={item.fotoUrl}
                      alt={item.nome}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-green-100 flex items-center justify-center text-green-600 text-xl">
                      {item.tipo === 'grupos' ? <FaUsers /> : <FaUserAlt />}
                    </div>
                  )}
                </div>

                {/* INFO */}
                <div className="flex flex-col">
                  <p className="font-semibold text-green-800">{item.nome}</p>
                  <p className="text-sm text-gray-700">{item.descricao}</p>
                  {item.localizacao && (
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <FaMapMarkerAlt className="text-green-600" />
                      {item.localizacao}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
