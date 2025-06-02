'use client';
import './globals.css';
import { Suspense, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { queryClient } from '@/queryCliente';
import { QueryClientProvider } from 'react-query';
import SessionWrapper from '@/components/SessionWrapper';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import Image from 'next/image';
import { ripplesLoading } from '../../public';

const LoadingImage = () => (
  <div className="fixed inset-0 z-50 flex justify-center items-center bg-white">
    <Image
      src={ripplesLoading}
      alt="Loading..."
      width={128}
      height={128}
    />
  </div>
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <QueryClientProvider client={queryClient}>
          <MainProvider>
            <InnerLayout>{children}</InnerLayout>
          </MainProvider>
      </QueryClientProvider>
    </SessionWrapper>
  );
}

function InnerLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#764545" />
        <link rel="tidelli-icon" href="/icon/icon.ico" />
      </head>
      <body>
        <Suspense fallback={LoadingImage()}>
          {children}
        </Suspense>
        <ToastContainer
          position="top-center"
          limit={1}
          hideProgressBar={true}
          style={{
            padding: '10px',
            margin: '0',
            right: '10px',
          }}
        />
      </body>
    </html>
  );
}
