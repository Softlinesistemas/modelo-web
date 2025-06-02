import { cn } from '@/utils/utilsClassName';
import React, { forwardRef, TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  onFocusRemoveError?: () => void;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, onFocusRemoveError, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        {...props}
        className={cn(
          "bg-white-medium rounded-[15px] text-black font-normal text-base input-placeholder w-full shadow-custom py-2 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none", // inclui resize controlável
          {
            "border border-red-500 placeholder:text-red-400": error,
            "border-0": !error,
          },
          className
        )}
        onFocus={onFocusRemoveError}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
