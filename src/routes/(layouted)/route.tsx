import Sidebar from '@/components/sidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { ChatProvider } from './chat/-hooks/useChat';

export const Route = createFileRoute('/(layouted)')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ChatProvider>
      <div className="w-full max-h-screen h-screen flex flex-col lg:flex-row">
        <Sidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </ChatProvider>
  );
}
