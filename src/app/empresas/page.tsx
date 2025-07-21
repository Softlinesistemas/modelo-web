'use client';

import { useTabStore } from '@/store/useTabStore';
import { TabSelector } from '@/components/TabSelector';
import { SearchBar } from '@/components/SearchBar';
import { SortSelector } from '@/components/SortSelector';
import { motion } from 'framer-motion';

const tabs = ['Meus', 'Sugestões', 'Procurar Por Filtros'];

export default function Empresas() {
  const { empresasTab, setTab } = useTabStore();

  return (
    <div className="pb-20">
      <TabSelector tabs={tabs} activeIndex={empresasTab} onChange={(i) => setTab('empresasTab', i)} />
      <SearchBar />
      <SortSelector />

      <motion.div
        key={empresasTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-4 mt-6"
      >
        <div className="text-gray-500 text-center py-10">Conteúdo da aba "{tabs[empresasTab]}"</div>
      </motion.div>
    </div>
  );
}
