'use client'

import React from 'react';
import { Header } from '../components/Header';
import { MainBanner } from '../components/MainBanner';
import { UserSelect } from '../components/UserSelect';
import { ActionGrid } from '../components/ActionGrid';
import { SecondaryBanner } from '../components/SecondaryBanner';
import { SearchFilter } from '../components/SearchFilter';
import { ItemList } from '../components/ItemList';
import { BottomNav } from '../components/BottomNav';

export default function HomePage() {
  return (
    <div className='flex flex-col w-full'>
      <Header />           {/* cabeçalho */}
      <MainBanner />       {/* banner principal */}
      <UserSelect />       {/* seleção de usuário */}
      <ActionGrid />       {/* grid de ações */}
      <SecondaryBanner />  {/* banner secundário */}
      <SearchFilter />     {/* busca + filtros */}
      <ItemList />         {/* lista de itens */}
      <BottomNav />        {/* nav inferior */}
    </div>
  );
}
