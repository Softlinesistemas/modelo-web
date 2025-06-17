'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';

// Simulando lista de chats (futuramente você pode puxar de uma API)
const chats = [
  {
    id: 1,
    name: 'Maria Silva',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    lastMessage: 'Oi, como você está?',
    time: '10:15',
  },
  {
    id: 2,
    name: 'João Souza',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    lastMessage: 'Vamos nos encontrar amanhã?',
    time: 'Ontem',
  },
  {
    id: 3,
    name: 'Carla Mendes',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    lastMessage: 'Ok, combinado!',
    time: 'Sábado',
  },
];

export default function Chat() {
  const router = useRouter();

  const openChat = (chat: typeof chats[0]) => {
    router.push(`/message?name=${encodeURIComponent(chat.name)}&avatar=${encodeURIComponent(chat.avatar)}`);
  };

  return (
    <div className="h-screen bg-white">
    <Header />
      {/* Header */}
      <div className="p-4 border-b shadow-sm">
        <h1 className="text-lg font-bold">Conversas</h1>
      </div>

      {/* Lista de chats */}
      <div className="overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => openChat(chat)}
            className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition"
          >
            <img
              src={chat.avatar}
              alt={`Avatar de ${chat.name}`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-semibold">{chat.name}</h2>
                <span className="text-xs text-gray-400">{chat.time}</span>
              </div>
              <p className="text-xs text-gray-600 truncate">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}