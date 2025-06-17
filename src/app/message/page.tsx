'use client'

import { useSearchParams, useRouter } from 'next/navigation'; // ✅ Mantém só esse
import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { FiPaperclip, FiSmile, FiCamera, FiMic, FiArrowLeft } from 'react-icons/fi';

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
  const router = useRouter(); // ✅ Hook certo no lugar certo

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

  const onEmojiClick = (event: any, emojiObject: any) => {
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

  const onClickAttach = () => {
    fileInputRef.current?.click();
    setShowActions(false);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            from: 'user',
            text: '',
            image: reader.result as string,
          },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const onToggleRecording = () => {
    setRecording((r) => !r);
    setShowActions(false);
    // Aqui pode entrar código real de gravação com MediaRecorder
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header com botão voltar */}
      <div className="flex items-center gap-3 p-4 border-b shadow-sm">
        <button
          onClick={() => router.push('/chat')} // ✅ Agora usando o hook correto
          className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-2"
          type="button"
        >
          <FiArrowLeft size={24} />
          Voltar
        </button>
        <img
          src={avatar}
          alt={`Avatar de ${name}`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <h2 className="text-base font-semibold">{name}</h2>
      </div>

      {/* Corpo das mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.from === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] px-3 py-2 rounded-lg shadow text-sm ${
                message.from === 'user'
                  ? 'bg-green-100 text-right'
                  : 'bg-white text-left'
              }`}
            >
              {message.from === 'contact' && (
                <p className="text-xs text-gray-500 mb-1">{name}</p>
              )}
              {message.text}
              {message.image && (
                <img
                  src={message.image}
                  alt="Imagem enviada"
                  className="mt-2 max-w-full rounded"
                />
              )}
              {message.audio && (
                <audio controls className="mt-2 w-full">
                  <source src={message.audio} />
                  Seu navegador não suporta áudio.
                </audio>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer: input + botões */}
      <div className="p-4 border-t flex items-center gap-2 bg-white relative">
        <button
          onClick={() => setShowActions((v) => !v)}
          className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          aria-label="Abrir opções"
          type="button"
        >
          <FiPaperclip size={24} />
        </button>

        {showActions && (
          <div className="absolute bottom-14 left-4 z-10 bg-white p-2 rounded shadow flex gap-4 border border-gray-200">
            <button
              onClick={() => {
                setShowEmojiPicker(true);
                setShowActions(false);
              }}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              aria-label="Emoji"
              type="button"
            >
              <FiSmile size={24} />
            </button>

            <button
              onClick={onClickAttach}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              aria-label="Enviar foto"
              type="button"
            >
              <FiCamera size={24} />
            </button>

            <button
              onClick={onToggleRecording}
              className={`transition-colors duration-200 ${
                recording ? 'text-red-500' : 'text-gray-600 hover:text-gray-900'
              }`}
              aria-label="Gravar áudio"
              type="button"
            >
              <FiMic size={24} />
            </button>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={onFileChange}
        />

        <input
          type="text"
          placeholder="Digite sua mensagem..."
          className="flex-1 px-3 py-2 border rounded-lg outline-none text-sm"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
          type="button"
        >
          Enviar
        </button>

        {showEmojiPicker && (
          <div className="absolute bottom-20 left-14 z-10">
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePage;
