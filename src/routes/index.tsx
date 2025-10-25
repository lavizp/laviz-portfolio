import ChatInput from '@/components/chat/chat-input';
import WelcomeMessage from '@/components/chat/welcome-message';
import { ChatProvider } from '@/hooks/useChat';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => (
    <ChatProvider>
      <App />
    </ChatProvider>
  ),
});

function App() {
  return (
    <div className="flex flex-col h-full">
      <WelcomeMessage />
      <ChatInput />
    </div>
  );
}
