// src/routes/__root.tsx
import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router';
import { ThemeProvider } from '@/components/theme-provider';
import { ChatProvider } from '@/hooks/use-chat';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/chat/chat-widget';
import { useReveal } from '@/hooks/use-reveal';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const { pathname } = useLocation();
  // Watches for content arriving on any route, so it does not need re-arming.
  useReveal();
  return (
    <ThemeProvider>
      <ChatProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main
            id="main"
            tabIndex={-1}
            className={pathname === '/' ? 'flex-1' : 'flex-1 pt-24'}
          >
            <Outlet />
          </main>
          <Footer />
        </div>
        <ChatWidget />
      </ChatProvider>
    </ThemeProvider>
  );
}
