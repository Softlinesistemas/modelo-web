'use client'
import { Label } from "@/utils/ui/Label"
import { Input } from "@/utils/ui/Input"
import { FaUserClock } from "react-icons/fa"

export function FaixaEtaria() {
  return (
    <div className="mb-4 w-full">
      {/* Título */}
      <Label className="flex items-center gap-1 font-bold text-green-700 mb-2">
        <FaUserClock className="text-green-800" />
        FAIXA DE IDADE
      </Label>

        {/* Inputs personalizados (mín – máx) */}
        <div className="flex items-center mt-3 gap-2 sm:flex-nowrap">
          
          <Input
            type="number"
            placeholder="mín"
            className="w-10 text-center"
          />
          <span className="text-sm text-gray-600">até</span>
          <Input
            type="number"
            placeholder="máx"
            className="w-10 text-center"
          />
        </div>
      </div>
    
  )
}
