import './globals.css';
import { ReactNode, Suspense } from 'react';
import { AppProvider } from './context/UserContext';

export const metadata = {
  title: 'GooAgro',
  description: 'Conectando Produtores & Clientes',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-green-50 min-h-screen flex flex-col pb-16 relative mx-auto w-full">
        <Suspense fallback={<div className='absolute inset-0 w-full h-full'>Carregando...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
