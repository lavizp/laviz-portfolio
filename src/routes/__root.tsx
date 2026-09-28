// src/routes/__root.tsx
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ThemeProvider } from '@/components/theme-provider';
import { ChatProvider } from '@/hooks/use-chat';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/chat/chat-widget';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
        <ChatWidget />
        <TanStackRouterDevtools position="bottom-left" />
      </ChatProvider>
    </ThemeProvider>
  );
}
