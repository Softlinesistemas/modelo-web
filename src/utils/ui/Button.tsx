'use client'

import React from 'react';
import cn from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 
    | 'primary' 
    | 'secondary' 
    | 'danger' 
    | 'ghost' 
    | 'outline' 
    | 'filter' 
    | 'distance' 
    | 'buscarFiltros' 
    | 'friend'
    | 'friend-add'
    | 'friend-remove'
    | 'icon'
    | 'gpsAtivo'   
    | 'gpsInativo'; 
  size?: 'xs' | 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className,
  loading = false,
  disabled,
  ...props 
}) => {
  const baseStyles = 'rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2';
  
  const sizeStyles = {
    xs: 'text-xs px-2 py-1',
    sm: 'text-sm px-3 py-1.5',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const variantStyles = {
    primary: 'bg-green-800 text-white hover:bg-green-700 focus:ring-green-500 shadow',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow',
    friend: 'bg-orange-700 text-white hover:bg-orange-600 focus:ring-orange-400 shadow',
    'friend-add': 'bg-green-600 text-white hover:bg-green-500 focus:ring-green-400 shadow',
    'friend-remove': 'bg-red-500 text-white hover:bg-red-400 focus:ring-red-300 shadow',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
    outline: 'border border-green-800 text-green-800 bg-transparent hover:bg-green-50 focus:ring-green-300',
    filter: 'bg-amber-300 text-gray-800 hover:bg-amber-200 focus:ring-amber-400',
    distance: 'bg-yellow-100 text-gray-800 border border-yellow-300 hover:bg-yellow-200 focus:ring-yellow-400',
    buscarFiltros: 'bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-400 shadow',
    icon: 'p-2 rounded-full bg-transparent hover:bg-gray-100 focus:ring-gray-300 text-gray-700',
    gpsAtivo: 'bg-green-600 text-white hover:bg-green-500 focus:ring-green-400 shadow',
    gpsInativo: 'bg-orange-400 text-white hover:bg-gray-500 focus:ring-gray-300 shadow'
  };

  const buttonSize = variant === 'icon' ? 'p-2' : sizeStyles[size];
  
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        baseStyles, 
        variantStyles[variant], 
        buttonSize,
        loading && 'cursor-wait opacity-80', // Corrigido aqui
        className
      )}
    >
      {loading ? (
        <>
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};