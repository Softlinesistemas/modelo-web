'use client'

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { MainBanner } from '../components/MainBanner';
import { UserSelect } from '../components/UserSelect';
import { ActionGrid } from '../components/ActionGrid';
import { SecondaryBanner } from '../components/SecondaryBanner';
import { SearchFilter } from '../components/SearchFilter';
import { ItemList } from '../components/ItemList';
import { BottomNav, ActionContext } from '../components/BottomNav';

// Novos componentes
import { CloudSync } from '../components/CloudSync';
import QrCode from '@/components/QrCode';
import { ClockView } from '@/components/ClockView';
import { CalendarView } from '@/components/CalendarView';

export default function HomePage() {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const renderActionComponent = () => {
    switch (activeAction) {
      case 'qrcode':
        return <QrCode qrValue={''} onScanClick={() => {}} />;
      case 'calendar':
        return <CalendarView />;
      case 'clock':
        return <ClockView />;
      case 'cloud':
        return <CloudSync />;
      default:
        return (
          <>
            <ActionGrid />
            <SecondaryBanner />
            <SearchFilter />
            <ItemList />
          </>
        );
    }
  };

  return (
    <ActionContext.Provider value={{ setActiveAction }}>
      <div className="flex flex-col w-full">
        <Header />
        <MainBanner />
        <UserSelect onActionSelect={setActiveAction} />
        {renderActionComponent()}
        <BottomNav />
      </div>
    </ActionContext.Provider>
  );
}
