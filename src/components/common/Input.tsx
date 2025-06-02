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
      <input  
        ref={ref}
        {...props}
        autoComplete={autoComplete || "off"}
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        className={cn(
          "bg-white-medium rounded-[15px] text-black font-normal text-base input-placeholder w-full shadow-custom py-2 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
    );
  }
);

Input.displayName = 'Input';

export default Input;
