'use client'
import { useEffect, useState } from "react";

const MessageItem = ({ title, text }: { title: string; text: string }) => (
  <div className="bg-white p-3 rounded shadow flex justify-between items-center transition-transform duration-300 hover:scale-[1.01]">
    <div>
      <h2 className="text-sm font-medium">{title}</h2>
      <p className="text-xs text-gray-500">{text}</p>
    </div>
    <span className="text-gray-400">›</span>
  </div>
);

export default function MessageList({ filter }: any) {
  const [messages, setMessages] = useState([
    { title: "List item", text: "Supporting line text lorem ipsum dolor sit amet." },
    { title: "List item", text: "Supporting line text lorem ipsum dolor sit amet." },
    { title: "List item", text: "Supporting line text lorem ipsum dolor sit amet." },
    { title: "List item", text: "Supporting line text lorem ipsum dolor sit amet." },
    { title: "List item", text: "Supporting line text lorem ipsum dolor sit amet." },
    { title: "List item", text: "Supporting line text lorem ipsum dolor sit amet." },
    { title: "List item", text: "Supporting line text lorem ipsum dolor sit amet." },
    { title: "List item", text: "Supporting line text lorem ipsum dolor sit amet." },
    { title: "List item", text: "Supporting line text lorem ipsum dolor sit amet." },
  ]);

  useEffect(() => {
    const intervals = [30000, 60000, 90000];
    let index = 0;
    let timeoutId: NodeJS.Timeout;

    const scheduleMessage = () => {
      if (index < intervals.length) {
        timeoutId = setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              title: "Aviso",
              text: "Para ver mais, registre-se.",
            },
          ]);
          index++;
          scheduleMessage();
        }, intervals[index]);
      }
    };

    scheduleMessage();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="px-4 space-y-2 overflow-y-auto max-h-60 scroll-smooth">
      {messages.map((msg, i) => (
        <MessageItem key={i} title={msg.title} text={msg.text} />
      ))}
    </div>
  );
}