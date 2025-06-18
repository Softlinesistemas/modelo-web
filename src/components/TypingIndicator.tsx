// TypingIndicator.tsx - Indicador de 'digitando...'
'use client';
const TypingIndicator = ({ name }: { name: string }) => (
  <div className="text-xs text-gray-500 mb-2">{name} está digitando...</div>
);
export default TypingIndicator;
