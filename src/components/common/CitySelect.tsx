import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { cn } from '@/utils/utilsClassName';

export interface OptionType {
  label: string;
  value: string;
}

interface CitySelectProps {
  value: OptionType | null;
  options: OptionType[];
  onChange: (option: OptionType | null) => void;
  isDisabled?: boolean;
  placeholder?: string;
  error?: string;
  styles?: any;
}

const CitySelect: React.FC<CitySelectProps> = ({
  value,
  options,
  onChange,
  isDisabled,
  placeholder,
  error,
  styles,
}) => {
  return (
    <CreatableSelect
      isDisabled={isDisabled}
      isClearable
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      classNamePrefix="react-select"
      className={cn(
        'w-full',
        error ? 'border border-red-500' : '',
      )}
      styles={styles}
    />
  );
};

export default CitySelect;
