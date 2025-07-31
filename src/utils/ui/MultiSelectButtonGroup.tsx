import React from 'react';

export type Option = {
  value: string | number;
  label: React.ReactNode;
};

export type MultiSelectButtonGroupProps = {
  options: Option[];
  selectedValues: Array<string | number>;
  onChange: (selected: Array<string | number>) => void;
  title?: React.ReactNode;
  className?: string;
  columns?: number;
  disabled?: boolean;
  singleSelect?: boolean;
};

export const MultiSelectButtonGroup: React.FC<MultiSelectButtonGroupProps> = ({
  options,
  selectedValues,
  onChange,
  title,
  className = '',
  columns = 1,
  disabled = false,
  singleSelect = false,
}) => {
  // Alterna seleção, com lógica para single select
  const toggleValue = (value: string | number) => {
    if (disabled) return;

    if (singleSelect) {
      // Se já selecionado, desmarca, senão seleciona só esse valor
      if (selectedValues.includes(value)) {
        onChange([]);
      } else {
        onChange([value]);
      }
    } else {
      // Multi select padrão: adiciona ou remove valor
      if (selectedValues.includes(value)) {
        onChange(selectedValues.filter((v) => v !== value));
      } else {
        onChange([...selectedValues, value]);
      }
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {title && (
        <div className="bg-red-600 text-white text-center py-2 rounded font-semibold text-lg select-none">
          {title}
        </div>
      )}

      {/* Grid dinâmico conforme número de colunas */}
      <div
        className={`grid grid-cols-7 sm:grid-cols-${columns} gap-3 mb-2`}
        role="group"
        aria-label={typeof title === 'string' ? title : undefined}
      >
        {options.map(({ value, label }) => {
          const isSelected = selectedValues.includes(value);
          return (
            <button
              key={value}
              type="button"
              onClick={() => toggleValue(value)}
              className={`w-full border rounded-lg px-4 py-2 text-sm font-medium text-center transition-all
                ${isSelected
                  ? 'bg-green-600 text-white border-green-600 shadow-lg'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
              `}
              aria-pressed={isSelected}
              aria-disabled={disabled}
              aria-label={`Selecionar ${label}`}
              disabled={disabled}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
