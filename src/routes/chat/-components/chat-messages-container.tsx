import { useRef, useEffect } from 'react';
import { useChat } from '../-hooks/useChat';
import ChatMessage from './chat-message';
import { ChatLoading } from './chat-loading';

const ChatMessagesContainer = () => {
  const { messages, isLoading } = useChat();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="h-full flex flex-col flex-1 p-2 gap-3 lg:py-2">
      {messages.map((item) => (
        <ChatMessage chat={item} />
      ))}
      {isLoading && <ChatLoading />}
      <div ref={endRef} />
    </div>
  );
};

export default ChatMessagesContainer;
