import { useEffect, useRef } from 'react';
import { useChat } from '@/hooks/use-chat';
import ChatMessage from './chat-message';
import { ChatLoading } from './chat-loading';

const ChatMessagesContainer = () => {
  const { messages, isLoading } = useChat();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-1 flex-col gap-3 p-4">
      {messages.map((item) => (
        <ChatMessage key={item.id} chat={item} />
      ))}
      {isLoading && <ChatLoading />}
      <div ref={endRef} />
    </div>
  );
};

export default ChatMessagesContainer;
