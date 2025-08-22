'use client';

import React, { forwardRef } from 'react';
import cn from '@/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  requiredLabel?: boolean;
  leftIcon?: React.ReactNode; // Ícone opcional à esquerda
}

// Agora usamos forwardRef para que RHF consiga injetar ref
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, requiredLabel, leftIcon, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative w-full -top-2">
          {/* Ícone à esquerda */}
          {leftIcon && (
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              {leftIcon}
            </div>
          )}

          {/* Campo de input */}
          <input
            ref={ref} 
            {...props}
            className={cn(
              'w-full px-4 py-3 pr-10 rounded-md text-md transition border duration-200 ease-in-out shadow-md',
              leftIcon ? 'pl-9' : undefined,
              error
                ? 'border-red-500 focus:ring-red-500 animate-shake'
                : 'border-black focus:ring-green-500',
              className
            )}
          />

          {/* Ícone de erro à direita */}
          {error && (
            <AiOutlineExclamationCircle
              className="h-5 w-5 text-red-500 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          )}
        </div>

        {/* Mensagem de erro animada */}
        <AnimatePresence>
          {error && (
            <motion.p
              key="input-error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-red-600 text-xs mt-1 pl-1"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = 'Input';
