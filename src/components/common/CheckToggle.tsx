'use client';
import React from 'react';

interface CheckToggleProps {
  label: string;
  setIsChecked: (value: boolean) => void;
  isChecked: boolean;
}

export default function CheckToggle({ label, isChecked, setIsChecked }: CheckToggleProps) {
  return (
    <>
      <p className="whitespace-nowrap">{label}:</p>
      <div className="flex items-center">
        <label className="inline-flex items-center cursor-pointer bg-transparent">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <div
            className="relative w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer 
                       peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                       peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                       after:start-[2px] after:bg-white-medium after:border-gray-300 after:border 
                       after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
          />
        </label>
      </div>
    </>
  );
}
