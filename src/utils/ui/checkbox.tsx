
import * as React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        {...props}
      />
    );
  }
);
Checkbox.displayName = "Checkbox";
