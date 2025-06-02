import { forwardRef, useState, useRef, useEffect, ReactNode } from 'react';
import { cn } from '@/utils/utilsClassName';

export interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  openOnHover?: boolean;
  defaultOpen?: boolean;
  showBg?: boolean;
  style?: React.CSSProperties;
}

const Popover = forwardRef<HTMLDivElement, PopoverProps>(({
  trigger,
  content,
  placement = 'top',
  openOnHover = false,
  defaultOpen = false,
  style,
  showBg,
}, ref) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const handleTriggerClick = () => {
    if (!openOnHover) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleMouseEnter = () => {
    if (openOnHover) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (openOnHover) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={triggerRef}
      style={style}
    >
      <div onClick={handleTriggerClick}>{trigger}</div>

      {isOpen && (
        <div
          ref={(el) => {
            popoverRef.current = el;
            if (ref && typeof ref === 'function') {
              ref(el);
            } else if (ref && typeof ref === 'object') {
              (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
            }
          }}
          className={cn(
            `absolute z-50 transition-all ${showBg ? " border rounded-md  shadow-custom p-4 border-gray-200 bg-white-light" : ""}`,
            {
              'top-full left-1/2 transform -translate-x-1/2':
                placement === 'top',
              'bottom-full left-1/2 transform -translate-x-1/2':
                placement === 'bottom',
              'left-full top-1/2 transform -translate-y-1/2':
                placement === 'left',
              'right-full top-1/2 transform -translate-y-1/2':
                placement === 'right',
            }
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
});

Popover.displayName = 'Popover';

export default Popover;
