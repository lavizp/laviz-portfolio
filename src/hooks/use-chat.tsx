import { getPromptResponse } from '@/services/ai_chat';
import type { IChatMessage } from '@/types/chat';
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

interface ChatContextValue {
  messages: IChatMessage[];
  sendMessage: (prompt: string) => Promise<void>;
  resetMessages: () => void;
  isLoading: boolean;
  isOpen: boolean;
  openChat: (prompt?: string) => void;
  closeChat: () => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within a ChatProvider');
  return ctx;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const resetMessages = () => setMessages([]);

  const sendMessage = async (prompt: string) => {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    setMessages((data) => [
      ...data,
      {
        id: Date.now(),
        message: trimmed,
        role: 'chat',
        type: 'general',
        time: new Date().toLocaleTimeString(),
      },
    ]);
    setIsLoading(true);
    const response = getPromptResponse(trimmed);
    await new Promise((res) => setTimeout(res, 1200));
    response.forEach((res) => {
      setMessages((data) => [
        ...data,
        {
          id: Date.now() + Math.random(),
          message: res,
          role: 'ai',
          type: res,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    });
    setIsLoading(false);
  };

  const openChat = (prompt?: string) => {
    setIsOpen(true);
    if (prompt && prompt.trim()) {
      void sendMessage(prompt);
    }
  };

  const closeChat = () => setIsOpen(false);

  return (
    <ChatContext.Provider
      value={{
        isLoading,
        messages,
        sendMessage,
        resetMessages,
        isOpen,
        openChat,
        closeChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
