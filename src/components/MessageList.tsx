'use client';

import { useEffect, useState } from "react";

const MessageItem = ({ title, text }: { title: string; text: string }) => (
  <div className="bg-white p-3 rounded shadow flex justify-between items-center hover:bg-gray-50 transition duration-200">
    <div>
      <h2 className="text-sm font-bold text-gray-800">{title}</h2>
      <p className="text-xs text-gray-500">{text}</p>
    </div>
    <span className="text-gray-400 text-lg">›</span>
  </div>
);

export default function MessageList({ filter }: any) {
  const [messages, setMessages] = useState([
    { title: "Mensagem", text: "Texto de exemplo da mensagem." },
    { title: "Mensagem", text: "Mais uma mensagem exemplo." },
    { title: "Mensagem", text: "Outra mensagem só pra teste." },
  ]);

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setMessages((prev) => [
        ...prev,
        { title: "Nova mensagem", text: "Esta é uma nova mensagem gerada." },
      ]);
    }, 45000);

    return () => clearInterval(timeoutId);
  }, []);

  return (
    <div className="px-4 space-y-2 overflow-y-auto max-h-80 md:max-h-[500px] scroll-smooth">
      {messages.map((msg, i) => (
        <MessageItem key={i} title={msg.title} text={msg.text} />
      ))}
    </div>
  );
}
