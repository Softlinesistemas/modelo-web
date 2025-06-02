import React, { forwardRef, ButtonHTMLAttributes } from 'react'; 
import LoadingIcon from './LoadingIcon';
import { cn } from '@/utils/utilsClassName';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg' | "";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, loading, disabled, children, size, onClick, ...rest } = props;

  return (
    <button
      onClick={onClick}
      ref={ref}
      {...rest}
      className={cn(
        `flex items-center gap-2 justify-center bg-custom-gradient hover:bg-custom-gradient-hover transition-all duration-300 ease-in-out cursor-pointer text-white py-2 shadow-custom rounded-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
        ${size === 'sm' && 'h-9 px-6 text-sm text-semibold'}
        ${(size === 'md' || size === '') && 'h-10 px-6'}
        ${size === 'lg' && 'h-11 px-8'}
       `,
        className
      )}
      disabled={loading || disabled}>
      {loading && <LoadingIcon />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
