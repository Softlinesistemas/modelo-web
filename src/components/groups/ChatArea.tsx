'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Lista de participantes com role e avatar
const participants = [
  { name: 'Ramon', role: 'admin', avatar: '/avatars/ramon.png' },
  { name: 'Maria', role: 'user', avatar: '/avatars/maria.png' },
  { name: 'João', role: 'user', avatar: '/avatars/joao.png' },
];

// Função para definir cor por usuário
const getUserColor = (name: string, role: string) => {
  if (role === 'admin') return 'text-[#FF7F50]'; // Cor Petra fixa para ADM
  const colors = ['text-blue-600', 'text-green-600', 'text-purple-600', 'text-pink-600'];
  const index = participants.findIndex((p) => p.name === name);
  return colors[(index + 1) % colors.length]; // +1 pra pular a cor ADM
};

// Tipo para cada mensagem
type ChatMessage = {
  sender: string;
  text: string;
  replyTo?: {
    sender: string;
    text: string;
  };
};

const ChatArea: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'Ramon', text: 'Seja bem-vindo ao grupo!' },
    { sender: 'Maria', text: 'Oi pessoal!' },
    { sender: 'João', text: 'Animado para o evento!' },
  ]);
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);

  // Função para enviar nova mensagem
  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const newMessage: ChatMessage = {
      sender: 'Ramon', // Exemplo fixo - depois você pode pegar o usuário logado
      text: message,
      replyTo: replyingTo ? { sender: replyingTo.sender, text: replyingTo.text } : undefined,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage('');
    setReplyingTo(null);
  };

  // Dados do participante
  const getParticipant = (name: string) => participants.find((p) => p.name === name);

  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col h-[500px]">
      {/* Lista de mensagens */}
      <div className="flex-1 overflow-y-auto mb-2 space-y-3">
        {messages.map((msg, idx) => {
          const user = getParticipant(msg.sender);
          return (
            <div
              key={idx}
              className="flex items-start gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
              onClick={() => setReplyingTo(msg)} // Clicar para responder
            >
              {/* Foto */}
              {user && (
                <Link href={`/perfil/${msg.sender.toLowerCase()}`}>
                  <Image
                    src={user.avatar}
                    alt={msg.sender}
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                  />
                </Link>
              )}

              <div className="flex flex-col">
                {/* Nome */}
                <Link href={`/perfil/${msg.sender.toLowerCase()}`}>
                  <span className={`font-bold ${getUserColor(msg.sender, user?.role || '')}`}>
                    {msg.sender}
                  </span>
                </Link>

                {/* Se for uma resposta, mostra o preview do que foi respondido */}
                {msg.replyTo && (
                  <div className="text-xs text-gray-500 border-l-4 border-gray-300 pl-2 mb-1">
                    Respondendo a <strong>{msg.replyTo.sender}:</strong> {msg.replyTo.text}
                  </div>
                )}

                {/* Texto da mensagem */}
                <div className="text-gray-800">{msg.text}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Se estiver respondendo */}
      {replyingTo && (
        <div className="mb-2 p-2 bg-gray-100 text-sm rounded border-l-4 border-blue-400">
          <div>
            Respondendo a <strong>{replyingTo.sender}:</strong> {replyingTo.text}
          </div>
          <button
            onClick={() => setReplyingTo(null)}
            className="text-red-500 text-xs underline mt-1"
          >
            Cancelar Resposta
          </button>
        </div>
      )}

      {/* Campo de envio */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Digite uma mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatArea;