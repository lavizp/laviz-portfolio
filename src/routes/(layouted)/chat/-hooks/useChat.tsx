import { getPromptResponse } from '@/services/ai_chat';
import { IChatMessage } from '@/types/chat';
import { createContext, useContext, useState, ReactNode } from 'react';

interface ChatContextType {
  messages: IChatMessage[];
  sendMessage: (prompt: string) => Promise<void>;
  resetMessages: () => void;
  isLoading: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within a ChatProvider');
  return ctx;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const resetMessages = () => setMessages([]);
  const sendMessage = async (prompt: string) => {
    setMessages((data) => [
      ...data,
      {
        id: 1,
        message: prompt,
        role: 'chat',
        type: 'general',
        time: new Date().toLocaleTimeString(),
      },
    ]);
    setIsLoading(true);
    const response = getPromptResponse(prompt);
    await new Promise((res) => setTimeout(res, 1500));
    response.forEach((res) => {
      setMessages((data) => [
        ...data,
        {
          id: messages.length + 1,
          message: res,
          role: 'ai',
          type: res,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    });
    setIsLoading(false);
  };

  return (
    <ChatContext.Provider
      value={{ isLoading, messages, sendMessage, resetMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
};
