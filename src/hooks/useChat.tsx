import { createContext, useContext, useState, ReactNode } from 'react';

interface ChatContextType {
  isWelcome: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const ctx = useContext(ChatContext);
  return ctx;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isWelcome, setWelcome] = useState<boolean>(false);
  return (
    <ChatContext.Provider value={{ isWelcome }}>
      {children}
    </ChatContext.Provider>
  );
};
