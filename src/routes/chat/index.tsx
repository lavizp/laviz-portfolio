import { createFileRoute } from '@tanstack/react-router';
import WelcomeMessage from './-components/welcome-message';
import ChatMessagesContainer from './-components/chat-messages-container';
import ChatInput from './-components/chat-input';
import { useChat } from './-hooks/useChat';

export const Route = createFileRoute('/chat/')({
  component: App,
});

function App() {
  const { messages } = useChat();

  return (
    <div className="flex flex-col max-h-screen h-screen">
      <div className={`flex-1 overflow-y-auto`}>
        {messages.length === 0 ? <WelcomeMessage /> : <ChatMessagesContainer />}
      </div>
      <div className="sticky bottom-0 bg-background">
        <ChatInput />
      </div>
    </div>
  );
}
