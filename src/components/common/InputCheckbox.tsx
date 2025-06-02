import React from 'react';

interface InputCheckbox {
  option: string;
  value?: any;
  selectedValue?: any;
  onChange?: (value: any) => void;
  key?: string;
}

const InputCheckbox = ({
  option,
  value,
  selectedValue,
  onChange,
}: InputCheckbox) => {
  return (
    <div className="flex gap-2">
      <input
        name="checkbox"
        type="checkbox"
        onChange={onChange}
        checked={value === selectedValue}
        value={value}
        className="w-6 h-6 "
      />
      <label htmlFor="checkbox">{option}</label>
    </div>
  );
};

export default InputCheckbox;
