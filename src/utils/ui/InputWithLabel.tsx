'use client'

import React from 'react';
import { Label } from './Label';
import { Input } from './Input';

interface InputWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
}

export const InputWithLabel: React.FC<InputWithLabelProps> = ({ label, required, error, ...props }) => {
  return (
    <div className="mb-4">
      <Label required={required}>{label}</Label>
      <Input {...props} error={error} />
    </div>
  );
};
