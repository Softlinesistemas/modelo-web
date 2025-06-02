import { ChangeEvent } from "react";

interface InputFormProps {
  element: string;
  value: string;
  type: string;
  barWidth: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  pattern?: string;
  title?: string;
}

export default function InputForm(props: InputFormProps) {
  const {
    label,
    element,
    value,
    type,
    barWidth,
    handleInputChange,
    pattern,
    title,
  } = props;

  return (
    <div className="relative w-full" id={`input-container-${element}`}>
      <div
        className={`absolute h-1 left-4 z-11 bg-third font-bold`}
        style={{ width: barWidth }}
        id={`bar-${element}`}
      />
      <label
        htmlFor={`input-${element}`}
        className="absolute z-10 -top-3 px-1 bg-transparent left-4 text-primary font-bold"
        id={`label-${element}`}>
        {label}
      </label>
      {title ? (
        <input
          id={`input-${element}`}
          name={element}
          type={type}
          value={value}
          onChange={handleInputChange}
          pattern={pattern}
          title={title}
        />
      ) : (
        <input
          id={`input-${element}`}
          name={element}
          type={type}
          value={value}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
}
