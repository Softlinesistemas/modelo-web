'use client';

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { MainBanner } from '../components/MainBanner';
import { UserSelect } from '../components/UserSelect';
import { ActionGrid } from '../components/ActionGrid';
import { SecondaryBanner } from '../components/SecondaryBanner';
import { SearchFilter } from '../components/SearchFilter';
import { BottomNav, ActionContext } from '../components/BottomNav';

// Novos componentes
import { CloudSync } from '../components/CloudSync';
import QrCode from '@/components/QrCode';
import { ClockView } from '@/components/ClockView';
import { CalendarView } from '@/components/CalendarView';
import QrScanner from '@/components/QrScanner';

export default function HomePage() {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleScanClick = () => {
    setShowScanner(true);
  };

  const handleScanSuccess = (result: string) => {
    setScanResult(result);
    setShowScanner(false);
    console.log("QR Lido:", result);

    // Aqui você pode fazer o que quiser com o resultado, tipo:
    // Redirecionar, buscar um item, etc.
  };

  const renderActionComponent = () => {
    switch (activeAction) {
      case 'qrcode':
        return (
          <>
            <QrCode qrValue={'https://exemplo.com'} onScanClick={handleScanClick} />

            {showScanner && (
              <QrScanner
                onScanSuccess={handleScanSuccess}
                onClose={() => setShowScanner(false)}
              />
            )}

            {scanResult && (
              <div className="p-4 bg-green-100 text-green-800">
                Resultado do QR: {scanResult}
              </div>
            )}
          </>
        );
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