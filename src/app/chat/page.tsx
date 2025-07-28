'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { BottomNav } from '@/components/BottomNav';
import { MainBanner } from '@/components/MainBanner';

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
];

export default function ChatListPage() {
  const router = useRouter();

  const openChat = (chat: typeof chats[0]) => {
    router.push(`/message?name=${encodeURIComponent(chat.name)}&avatar=${encodeURIComponent(chat.avatar)}`);
  };

  return (
    <div className="h-screen bg-white flex flex-col">
    <MainBanner />
      <h1 className="p-4 border-b text-lg font-bold text-green-700">Conversas</h1>

      {/* Lista de chats */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => openChat(chat)}
            className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 transition"
          >
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-semibold text-gray-800">{chat.name}</h2>
                <span className="text-xs text-gray-500">{chat.time}</span>
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
