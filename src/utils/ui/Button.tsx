'use client'

import React from 'react';
import cn from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'userSelect';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className, 
  ...props 
}) => {
  const baseStyles = 'rounded-lg font-medium transition focus:outline-none focus:ring-2';
  
  const sizeStyles = {
    sm: 'text-sm px-3 py-1',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  const variantStyles = {
    primary: 'bg-green-800 text-white hover:bg-green-400 focus:ring-green-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    userSelect: 'text-black hover:text-gree-700 focus:ring-green-300',
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