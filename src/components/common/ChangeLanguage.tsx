"use client";
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/utilsClassName';
import { FiChevronDown } from 'react-icons/fi';

interface Option {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

interface ChangeLaguageProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const ChangeLaguage = ({
  options,
  value,
  onChange,
  className,
  placeholder = 'Select an option',
  disabled = false,
}: ChangeLaguageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const selectRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onChange?.(value);
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === selectedValue);

  return (
    <div 
      ref={selectRef}
      className={cn(
        'relative w-full cursor-pointer',
        className,
        { 'opacity-50 cursor-not-allowed': disabled }
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between w-full p-2 border border-gray-300 rounded-md bg-white-light',
          { 'ring-2 ring-primary': isOpen }
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="flex-1 truncate">
          {selectedOption ? (
            <div className="flex items-center gap-2 text-black">
              {selectedOption.label}
            </div>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        <FiChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 overflow-auto bg-white-light border border-gray-300 rounded-md shadow-lg max-h-60">
          {options?.map((option) => (
            <div
              key={option.value}
              className={cn(
                'p-2 hover:bg-gray-100',
                { 
                  'bg-gray-100': option.value === selectedValue,
                  'opacity-50 cursor-not-allowed': option.disabled 
                }
              )}
              onClick={() => !option.disabled && handleSelect(option.value)}
            >
              <div className="flex items-center gap-2 text-black">
                {option.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChangeLaguage;
