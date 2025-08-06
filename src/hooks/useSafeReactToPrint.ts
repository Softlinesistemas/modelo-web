// hooks/useSafeReactToPrint.ts
import { useReactToPrint } from "react-to-print";
import type { UseReactToPrintOptions } from "react-to-print";

export function useSafeReactToPrint(options: UseReactToPrintOptions) {
  // Corrige tipagem do 'content'
  const safeOptions = options as unknown as Parameters<typeof useReactToPrint>[0];
  return useReactToPrint(safeOptions);
}
