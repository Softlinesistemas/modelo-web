// src/app/layout.tsx
import './globals.css';           // importa Tailwind
import { ReactNode } from 'react';

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
      <body className="bg-green-50 min-h-screen flex flex-col p-3 rounded w-full max-w-md mx-auto">
        {children}
      </body>
    </html>
  );
}
