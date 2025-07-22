// utils/ui/Textarea.tsx

import React from "react";
import  cn  from "@/utils/cn"; // função utilitária para combinar classes

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

// Componente reutilizável e estilizado
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "min-h-[100px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm",
          "text-gray-800 placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-green-500 focus-visible:ring-offset-1 transition-shadow resize-none",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
