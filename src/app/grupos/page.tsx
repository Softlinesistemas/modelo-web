'use client';

import { useTabStore } from '@/store/useTabStore';
import { TabSelector } from '@/components/TabSelector';
import { SearchBar } from '@/components/SearchBar';
import { SortSelector } from '@/components/SortSelector';
import { motion } from 'framer-motion';

const tabs = ['Meus', 'Sugestões', 'Procurar'];

export default function Grupos() {
  const { gruposTab, setTab } = useTabStore();

  return (
    <div className="pb-20">
      <TabSelector tabs={tabs} activeIndex={gruposTab} onChange={(i) => setTab('gruposTab', i)} />
      <SearchBar />
      <SortSelector />

      <motion.div
        key={gruposTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-4 mt-6"
      >
        <div className="text-gray-500 text-center py-10">Conteúdo da aba "{tabs[gruposTab]}"</div>
      </motion.div>
    </div>
  );
}
