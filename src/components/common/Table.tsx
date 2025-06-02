'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface TableProps {
  children: ReactNode;
  className?: string;
}

export function Table({ children, className }: TableProps) {
  return <table className={clsx('w-full border-collapse', className)}>{children}</table>;
}

interface TableHeadProps {
  children: ReactNode;
  className?: string;
}

export function TableHead({ children, className }: TableHeadProps) {
  return <thead className={clsx('bg-gray-100', className)}>{children}</thead>;
}

export function TableBody({ children, className }: TableProps) {
  return <tbody className={className}>{children}</tbody>;
}

export function TableRow({ children, className }: TableProps) {
  return <tr className={clsx('border-b', className)}>{children}</tr>;
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
  header?: boolean;
}

export function TableCell({ children, className, header }: TableCellProps) {
  const Component = header ? 'th' : 'td';
  return (
    <Component
      className={clsx(
        'px-4 py-2 text-left',
        header ? 'font-bold' : '',
        className
      )}
    >
      {children}
    </Component>
  );
}

export function TableHeader({ children, className }: TableProps) {
  return <TableCell className={clsx('font-semibold', className)} header>{children}</TableCell>;
}