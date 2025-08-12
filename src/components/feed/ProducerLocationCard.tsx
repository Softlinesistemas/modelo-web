'use client'
import { FiCopy } from 'react-icons/fi'
import { useState } from 'react'

export const ProducerLocationCard = () => {
  const enderecoCompleto = 'Rua Rui Barbosa, 1305, Centro, Queimadas, Bahia, Brasil - 43.730-001'
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(enderecoCompleto)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex justify-between items-start bg-white rounded-md shadow-sm shadow-gray-400 px-3 py-2 mb-1 text-sm relative">
      {/* Bloco da esquerda */}
      <div className="flex flex-col">
        <p>Queimadas, Bahia, Brasil</p>
        <p>Rua Rui Barbosa, 1305</p>
      </div>

      {/* Bloco da direita */}
      <div className="flex flex-col items-end text-right mr-8">
        <p>Centro</p>
        <p>43.730-001</p>
      </div>

      {/* Ícone de copiar */}
      <button
        onClick={handleCopy}
        title="Copiar endereço"
        className="absolute top-2 right-2 font-semibold text-green-700 hover:text-orange-500 transition"
      >
        <FiCopy size={16} />
      </button>

      {/* Feedback de cópia */}
      {copied && (
        <span className="absolute bottom-1 right-2 text-xs text-green-600">Copiado!</span>
      )}
    </div>
  )
}
