'use client'

import React from 'react';
import cn from '@/utils/cn';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({ children, required, className, ...props }) => {
  return (
    <label
      {...props}
      className={cn('block text-md font-medium text-gray-700 mb-0', className)}
    >
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
};
