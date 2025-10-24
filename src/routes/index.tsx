import ChatInput from '@/components/chat/chat-input';
import WelcomeMessage from '@/components/chat/welcome-message';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <div className="flex flex-col h-full">
      <WelcomeMessage />
      <ChatInput />
    </div>
  );
}
