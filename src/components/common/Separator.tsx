'use client';

import clsx from 'clsx';

interface SeparatorProps {
  className?: string;
}

export function Separator({ className }: SeparatorProps) {
  return <hr className={clsx('border-t-4 border-primary my-2', className)} />;
}