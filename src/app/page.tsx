'use client';
import React, { useState } from 'react';
import { MainBanner } from '../components/MainBanner';
import { UserSelect } from '../components/UserSelect';
import { ActionGrid } from '../components/ActionGrid';
import { SecondaryBanner } from '../components/SecondaryBanner';
import { SearchFilter } from '../components/SearchFilter';
import { ActionContext } from '../components/BottomNav';
import { CloudSync } from '../components/CloudSync';
import QrCode from '@/components/QrCode';
import { ClockView } from '@/components/ClockView';
import { CalendarView } from '@/components/CalendarView';
import QrScanner from '@/components/QrScanner';

export default function HomePage() {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleScanClick = () => setShowScanner(true);

  const handleScanSuccess = (result: string) => {
    setScanResult(result);
    setShowScanner(false);
    console.log('QR Lido:', result);
  };

  const renderActionComponent = () => {
    switch (activeAction) {
      case 'qrcode':
        return (
          <>
            <QrCode qrValue={'https://exemplo.com'} onScanClick={handleScanClick} />
            {showScanner && <QrScanner onScanSuccess={handleScanSuccess} onClose={() => setShowScanner(false)} />}
            {scanResult && <div className="p-4 bg-green-100 text-green-800">Resultado do QR: {scanResult}</div>}
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
          <div className='px-1'>
            <ActionGrid />
            <SecondaryBanner />
            <SearchFilter />
            </div>
          </>
        );
    }
  };

  return (
    <ActionContext.Provider value={{ setActiveAction }}>
      <div className='px-1'>
        <MainBanner />
        <UserSelect onActionSelect={setActiveAction} />
        {renderActionComponent()}
      </div>
    </ActionContext.Provider>
  );
}
