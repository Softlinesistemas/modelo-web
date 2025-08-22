'use client'
import { FiCopy } from 'react-icons/fi'
import { useState } from 'react'

interface ProducerLocationCardProps {
  endereco?: {
    rua: string
    bairro: string
    cidade: string
    estado: string
    pais: string
    cep: string
  }
  gps?: { lat: number; lng: number }
}

export const ProducerLocationCard: React.FC<ProducerLocationCardProps> = ({
  endereco,
  gps,
}) => {
  const [copied, setCopied] = useState(false)

  const enderecoCompleto = endereco
    ? `${endereco.rua}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, ${endereco.pais} - ${endereco.cep}`
    : 'Endereço não informado'

  const handleCopy = () => {
    navigator.clipboard.writeText(enderecoCompleto)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOpenMap = () => {
    if (!gps) return
    const { lat, lng } = gps
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank')
  }

  if (!endereco) return <div>Endereço não disponível</div>

  return (
    <div className="flex justify-between items-start bg-white rounded-md shadow-sm shadow-gray-400 px-3 py-2 mb-1 text-sm relative">
      {/* Bloco da esquerda */}
      <div className="flex flex-col">
        <p>{endereco.cidade}, {endereco.estado}, {endereco.pais}</p>
        <p>{endereco.rua}</p>
      </div>

      {/* Bloco da direita */}
      <div className="flex flex-col items-end text-right mr-8">
        <p>{endereco.bairro}</p>
        <p>{endereco.cep}</p>
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

      {/* Abrir mapa caso GPS exista */}
      {gps && (
        <button
          onClick={handleOpenMap}
          title="Abrir no mapa"
          className="absolute bottom-1 left-2 text-xs text-blue-600 hover:text-blue-800"
        >
          Ver no mapa
        </button>
      )}
    </div>
  )
}




// 'use client'
// import { FiCopy } from 'react-icons/fi'
// import { useState } from 'react'

// export const ProducerLocationCard = () => {
//   const enderecoCompleto = 'Rua Rui Barbosa, 1305, Centro, Queimadas, Bahia, Brasil - 43.730-001'
//   const [copied, setCopied] = useState(false)

//   const handleCopy = () => {
//     navigator.clipboard.writeText(enderecoCompleto)
//     setCopied(true)
//     setTimeout(() => setCopied(false), 2000)
//   }

//   return (
//     <div className="flex justify-between items-start bg-white rounded-md shadow-sm shadow-gray-400 px-3 py-2 mb-1 text-sm relative">
//       {/* Bloco da esquerda */}
//       <div className="flex flex-col">
//         <p>Queimadas, Bahia, Brasil</p>
//         <p>Rua Rui Barbosa, 1305</p>
//       </div>

//       {/* Bloco da direita */}
//       <div className="flex flex-col items-end text-right mr-8">
//         <p>Centro</p>
//         <p>43.730-001</p>
//       </div>

//       {/* Ícone de copiar */}
//       <button
//         onClick={handleCopy}
//         title="Copiar endereço"
//         className="absolute top-2 right-2 font-semibold text-green-700 hover:text-orange-500 transition"
//       >
//         <FiCopy size={16} />
//       </button>

//       {/* Feedback de cópia */}
//       {copied && (
//         <span className="absolute bottom-1 right-2 text-xs text-green-600">Copiado!</span>
//       )}
//     </div>
//   )
// }
