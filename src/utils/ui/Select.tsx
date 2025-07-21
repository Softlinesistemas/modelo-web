import {
  createContext,
  useContext,
  useState,
  ReactNode,
  ReactElement,
  cloneElement,
} from "react";
import { ChevronDown } from "lucide-react";

type SelectContextProps = {
  value: string;
  setValue: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  placeholder?: string;
};

const SelectContext = createContext<SelectContextProps | null>(null);

function useSelectContext(component: string) {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error(`${component} deve estar dentro de <Select>`);
  return ctx;
}

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  children: ReactNode;
};

export function Select({ value, onChange, placeholder, children }: SelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <SelectContext.Provider value={{ value, setValue: onChange, open, setOpen, placeholder }}>
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({
  children,
  className,            // adiciona className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { setOpen, open } = useSelectContext("SelectTrigger");

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={`
        flex justify-between items-center w-full px-3 py-2 border rounded text-sm bg-white shadow-sm
        ${className || ""}
      `}
    >
      {children}
      <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
    </button>
  );
}

export function SelectContent({
  children,
  className,            // adiciona className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open } = useSelectContext("SelectContent");
  if (!open) return null;

  return (
    <div
      className={`
        absolute w-full mt-1 border rounded bg-white shadow-md z-50 text-sm
        ${className || ""}
      `}
    >
      {children}
    </div>
  );
}

export function SelectItem({
  value,
  children,
  className,            // adiciona className
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { setValue, setOpen } = useSelectContext("SelectItem");

  return (
    <button
      type="button"
      onClick={() => {
        setValue(value);
        setOpen(false);
      }}
      className={`
        w-full px-3 py-2 text-left hover:bg-blue-100
        ${className || ""}
      `}
    >
      {children}
    </button>
  );
}

// Se precisar de className no SelectValue, faça o mesmo:
export function SelectValue({
  placeholder,
  className,
}: {
  placeholder?: string;
  className?: string;
}) {
  const { value, placeholder: ctxPlaceholder } = useSelectContext("SelectValue");
  return (
    <span className={className || ""}>
      {value || placeholder || ctxPlaceholder || "Selecione"}
    </span>
  );
}