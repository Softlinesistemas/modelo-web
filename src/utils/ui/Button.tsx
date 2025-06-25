'use client'

import React from 'react';
import  cn  from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition focus:outline-none focus:ring-2 w-full';

  const variantStyles = {
    primary: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
  };

  return (
    <button
      {...props}
      className={cn(baseStyles, variantStyles[variant], className)}
    >
      {children}
    </button>
  );
};
