// MessageItem.tsx - Mensagem com favorito, status e reações
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiTrash2, FiCheck } from 'react-icons/fi';
import { IoCheckmarkDone } from "react-icons/io5";

type Message = {
  id: number;
  text: string;
  from: 'user' | 'contact';
  status: 'sent' | 'delivered' | 'read';
  favorite: boolean;
  reactions: string[];
};

type Props = {
  message: Message;
  onFavorite: (id: number) => void;
  onDelete: (id: number) => void;
  onReact: (id: number, reaction: string) => void;
};

const statusIcon = {
  sent: <FiCheck className="text-gray-500" />,
  delivered: <IoCheckmarkDone className="text-gray-500" />,
  read: <IoCheckmarkDone className="text-green-500" />,
};

const MessageItem: React.FC<Props> = ({ message, onFavorite, onDelete, onReact }) => {
  const [showReactions, setShowReactions] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className={`relative p-2 rounded-lg text-sm shadow ${message.from === 'user' ? 'bg-green-100 self-end' : 'bg-white self-start'}`}
    >
      <p>{message.text}</p>
      <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          {message.reactions.map((r, idx) => (<span key={idx}>{r}</span>))}
        </div>
        <div className="flex items-center gap-1">
          {statusIcon[message.status]}
          <button onClick={() => onFavorite(message.id)}><FiStar className={message.favorite ? 'text-yellow-500' : 'text-gray-400'} /></button>
          <button onClick={() => setShowReactions(!showReactions)}>😊</button>
          <button onClick={() => { if (confirm('Excluir esta mensagem?')) onDelete(message.id); }}><FiTrash2 /></button>
        </div>
      </div>
      {showReactions && (
        <div className="absolute bottom-full mb-1 left-0 bg-white border shadow rounded p-1 flex gap-1">
          {['👍', '❤️', '😂', '😮', '😢'].map((emoji) => (
            <button key={emoji} onClick={() => onReact(message.id, emoji)}>{emoji}</button>
          ))}
        </div>
      )}
    </motion.div>
  );
};
export default MessageItem;
