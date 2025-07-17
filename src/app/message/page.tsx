'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { FiPaperclip, FiSmile, FiCamera, FiMic, FiArrowLeft, FiSend } from 'react-icons/fi';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

type Message = {
  id: number;
  from: 'user' | 'contact';
  text: string;
  image?: string;
  audio?: string;
};

const MessagePage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get('name') || 'Contato';
  const avatar = searchParams.get('avatar') || '';

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: 'contact', text: 'Oi, tudo bem?' },
    { id: 2, from: 'user', text: 'Tudo ótimo! 😊 E você?' },
  ]);

  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [recording, setRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onEmojiClick = (_: any, emojiObject: any) => {
    setInputText((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, from: 'user', text: inputText },
    ]);
    setInputText('');
    setShowEmojiPicker(false);
  };

  const onClickAttach = () => fileInputRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMessages((prev) => [
          ...prev,
          { id: prev.length + 1, from: 'user', text: '', image: reader.result as string },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const onToggleRecording = () => {
    setRecording((r) => !r);
    setShowActions(false);
    // Aqui pode colocar integração real com MediaRecorder depois
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 sticky top-0 bg-white z-10">
        <button onClick={() => router.push('/chat')} type="button">
          <FiArrowLeft size={24} className="text-gray-700" />
        </button>
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
        <h2 className="text-base font-bold text-gray-800">{name}</h2>
      </div>

      {/* Chat body */}
      <div className="flex-1 overflow-y-auto px-3 py-2 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex mb-2 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`rounded-lg px-3 py-2 text-sm shadow-md ${
                msg.from === 'user'
                  ? 'bg-green-100 text-gray-800'
                  : 'bg-white text-gray-800'
              }`}
            >
              {msg.text}
              {msg.image && <img src={msg.image} alt="Imagem enviada" className="mt-2 max-w-[200px] rounded" />}
              {msg.audio && (
                <audio controls className="mt-2 w-full">
                  <source src={msg.audio} />
                  Seu navegador não suporta áudio.
                </audio>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="relative p-3 border-t flex items-center bg-white gap-2">
        <button onClick={() => setShowActions(!showActions)} type="button">
          <FiPaperclip size={24} className="text-gray-600" />
        </button>

        {showActions && (
          <div className="absolute bottom-14 left-4 bg-white border shadow-md rounded p-2 flex gap-3 z-20">
            <button onClick={() => setShowEmojiPicker(true)}><FiSmile size={24} className="text-orange-500" /></button>
            <button onClick={onClickAttach}><FiCamera size={24} className="text-green-500" /></button>
            <button onClick={onToggleRecording}>
              <FiMic size={24} className={`${recording ? 'text-red-500' : 'text-gray-700'}`} />
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onFileChange}
        />

        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          type="text"
          placeholder="Digite sua mensagem..."
          className="flex-1 text-sm px-3 py-2 border rounded-lg outline-none"
        />

        <button onClick={sendMessage} type="button" className="p-2 text-green-600">
          {inputText.trim() ? <FiSend size={24} /> : <FiMic size={24} />}
        </button>

        {showEmojiPicker && (
          <div className="absolute bottom-20 left-14 z-30">
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePage;
