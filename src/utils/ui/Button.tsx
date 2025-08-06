'use client'

import React from 'react';
import cn from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'userSelect' | 'outline' | 'filter' | 'distance' | 'buscarFiltros' | 'friend';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className, 
  ...props 
}) => {
  const baseStyles = 'rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const sizeStyles = {
    sm: 'text-sm px-3 py-1',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  const variantStyles = {
    primary: 'bg-green-800 text-white hover:bg-green-700 focus:ring-green-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    userSelect: 'text-black hover:text-green-700 focus:ring-green-300',
    outline: 'border border-green-800 text-green-800 bg-transparent hover:bg-green-100 focus:ring-green-500',
    filter: 'bg-amber-300 text-gray-800 hover:bg-amber-200 focus:ring-amber-500',
    distance: 'bg-yellow-100 text-gray-800 border border-yellow-300 hover:bg-yellow-200 focus:ring-yellow-500',
    buscarFiltros: 'bg-blue-600 text-black border-blue-200 rounded px-4 py-2 hover:bg-red-100 transition',
    friend: 'bg-orange-200 text-orange-800 hover:bg-orange-300 focus:ring-orange-500'
  };

  return (
    <button
      {...props}
      className={cn(
        baseStyles, 
        variantStyles[variant], 
        sizeStyles[size],
        className
      )}
    >
      {children}
    </button>
  );
};