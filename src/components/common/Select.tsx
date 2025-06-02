import { cn } from '@/utils/utilsClassName';
import React, { forwardRef, SelectHTMLAttributes, ChangeEvent } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  onFocusRemoveError?: () => void;
  options: { value: string | number; label: string; disabled?: boolean }[];
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  showPlaceholderOption?: boolean;
  title?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, onFocusRemoveError, options, onChange, title, showPlaceholderOption = false, ...props }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <select
        ref={ref}
        {...props}
        className={cn(
          "select border-0 border-transparent outline-none bg-white-medium rounded-[15px] text-black font-normal text-base input-placeholder w-full shadow-custom py-1 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          {
            "border border-red-500 placeholder:text-red-400": error,
            "border-0": !error,
          },
          className
        )}
        onFocus={onFocusRemoveError}
        onChange={handleChange}
      >
        {showPlaceholderOption && (
          <option value="" disabled={!showPlaceholderOption} selected>
           {title || ""}
          </option>
        )}
        {options?.map((option) => (
          <option disabled={option.disabled} key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = 'Select';

export default Select;
