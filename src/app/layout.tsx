import './globals.css';
import { ReactNode, Suspense } from 'react';
import { AppProvider } from './context/UserContext';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { AjudaLinks } from '@/components/AjudaLinks';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="overflow-x-hidden"> {/* Evita rolagem horizontal global */}
      <body className="bg-green-50 min-h-screen w-full max-w-screen overflow-x-hidden flex flex-col pb-16 relative">
        <AppProvider>
          <Header />
          <Suspense fallback={<div className="absolute inset-0 w-full h-full">Carregando...</div>}>
            <main className="flex-grow">{children}</main>
          </Suspense>
          <AjudaLinks />
          <BottomNav />
        </AppProvider>
      </body>
    </html>
  );
}
