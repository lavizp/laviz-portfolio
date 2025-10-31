import { getPromptResponse } from '@/services/ai_chat';
import { IChatMessage } from '@/types/chat';
import { createContext, useContext, useState, ReactNode } from 'react';

interface ChatContextType {
  messages: IChatMessage[];
  sendMessage: (prompt: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within a ChatProvider');
  return ctx;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<IChatMessage[]>([]);

  const sendMessage = (prompt: string) => {
    setMessages((data) => [
      ...data,
      {
        id: 1,
        message: prompt,
        role: 'chat',
        type: 'about',
      },
    ]);
    const response = getPromptResponse(prompt);
    response.forEach((res) => {
      setMessages((data) => [
        ...data,
        {
          id: messages.length + 1,
          message: res,
          role: 'ai',
          type: 'about',
        },
      ]);
    });
    // const keys: IChatResponseFormat[] = getPromptResponse(prompt);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
