'use client'

import React from 'react';
import cn from '@/utils/cn';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  variant?: 'default' | 'primary' | 'secondary' | 'error' |  'perfil'; // variações que quiser
}

export const Label: React.FC<LabelProps> = ({
  children,
  required,
  variant = 'default',
  className,
  ...props
}) => {
  // Classes para cada variação
  const variantClasses = {
    default: 'text-gray-700 font-medium rounded-md',
    primary: 'text-blue-600 font-semibol rounded-md',
    secondary: 'text-green-700 font-medium text-center text-md rounded-md',
    perfil:  'bg-green-300 rounded-md shadow-md p-1 justify-center text-black font-medium rounded-md flex items-center gap-2 mb-1',
    error: 'text-red-600 font-semibol rounded-md',
  };

  return (
    <label
      {...props}
      className={cn('block text-md mb-0 w-full', variantClasses[variant], className)}
    >
      {children} {required && <span className="text-red-200">*</span>}
    </label>
  );
};
