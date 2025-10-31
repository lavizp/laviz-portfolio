import { useRef, useEffect } from 'react';
import { useChat } from '../-hooks/useChat';
import ChatMessage from './chat-message';

const ChatMessagesContainer = () => {
  const { messages } = useChat();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="h-full flex flex-col flex-1 p-2">
      {messages.map((item) => (
        <ChatMessage chat={item} />
      ))}
    </div>
  );
};

export default ChatMessagesContainer;
