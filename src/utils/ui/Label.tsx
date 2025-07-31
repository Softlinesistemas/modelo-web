'use client'

import React from 'react';
import cn from '@/utils/cn';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  variant?: 'default' | 'primary' | 'secondary' | 'error'; // variações que quiser
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
    secondary: 'bg-green-700 text-white font-medium text-center text-md p-2 rounded-md',
    error: 'text-red-600 font-semibol rounded-md',
  };

  return (
    <label
      {...props}
      className={cn('block text-md mb-0', variantClasses[variant], className)}
    >
      {children} {required && <span className="text-red-200">*</span>}
    </label>
  );
};
