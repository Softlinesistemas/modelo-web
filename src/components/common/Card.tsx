'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx('rounded-md shadow-md shadow-gray-500 bg-white p-2', className)}>{children}</div>;
}

export function CardAlter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx('rounded-md shadow-md shadow-gray-500 p-2', className)}>{children}</div>;
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx('border-b pb-2 mb-2', className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={clsx('text-lg font-semibold', className)}>{children}</h2>;
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}