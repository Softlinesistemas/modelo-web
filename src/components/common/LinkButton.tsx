import React, { forwardRef, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import LoadingIcon from './LoadingIcon';
import { cn } from '@/utils/utilsClassName';

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg' | '';
}

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>((props, ref) => {
  const { href, className, loading, children, size, ...rest } = props;

  return (
    <Link
      href={href}
      ref={ref}
      {...rest}
      className={cn(
        `flex items-center gap-2 justify-center bg-custom-gradient hover:bg-custom-gradient-hover transition-all duration-300 ease-in-out cursor-pointer text-white px-4 py-2 font-bold shadow-custom rounded-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
        ${size === 'sm' && 'h-9 px-6 text-sm text-semibold'}
        ${(size === 'md' || size === '') && 'h-10 px-6'}
        ${size === 'lg' && 'h-11 px-8'}
        `,
        className
      )}
      aria-disabled={loading}>
      {loading && <LoadingIcon />}
      {children}
    </Link>
  );
});

LinkButton.displayName = 'LinkButton';

export default LinkButton;
