'use client'

import React from 'react';
import cn from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input: React.FC<InputProps> = ({ error, className, ...props }) => {
  return (
    <>
      <input
        {...props}
        className={cn(
          'w-full px-2 py-1.5 border rounded-md focus:outline-none focus:ring-2 transition text-md',
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500',
          className
        )}
      />
      {error && <span className="text-red-600 text-xs mt-1">{error}</span>}
    </>
  );
};
