import { cn } from '@/utils/utilsClassName';
import React, { forwardRef, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  onFocusRemoveError?: () => void;
  autoComplete?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, onFocusRemoveError, autoComplete, onFocus, ...props }, ref) => {
    return (
      <div className='relative flex flex-col'>    
        <input  
          ref={ref}
          {...props}
          autoComplete={autoComplete || "off"}
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          className={cn(
            "px-2 rounded-lg text-black !border !border-gray-300 font-normal text-base input-placeholder w-full shadow-custom py-2 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            {
              "border border-red-500 placeholder:text-red-400": error,
              "border-0": !error,
            },
            className
          )}
          onFocus={(e) => {
            onFocus?.(e);
            onFocusRemoveError?.();
          }}      
          />
        <span className="text-red-600 text-xs absolute -bottom-4">{error}</span>
    </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
