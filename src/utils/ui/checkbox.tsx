import * as React from "react";

interface CheckboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onCheckedChange,
  ...props
}) => {
  return (
    <button
      type="button"
      onClick={() => onCheckedChange(!checked)}
      className={`w-5 h-5 border rounded flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className ?? ""}`}
      {...props} // espalha todas as outras props aqui
    >
      {checked && <span className="w-3 h-3 bg-blue-600 rounded-sm" />}
    </button>
  );
};
