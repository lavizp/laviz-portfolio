import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { RotateCcw, Sparkles, X } from 'lucide-react';
import { useChat } from '@/hooks/use-chat';
import { profile } from '@/data/portfolio';
import { Button } from '@/components/ui/button';
import WelcomeMessage from './welcome-message';
import ChatMessagesContainer from './chat-messages-container';
import ChatInput from './chat-input';

export function ChatWidget() {
  const { isOpen, openChat, closeChat, messages, resetMessages } = useChat();

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeChat();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeChat]);

  return (
    <>
      {/* Floating action button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => openChat()}
              size="lg"
              aria-label="Open AI chat"
              className="group size-14 rounded-full bg-brand p-0 text-brand-foreground shadow-lg shadow-brand/30 hover:bg-brand/90"
            >
              <Sparkles className="size-6 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop (mobile) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeChat}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm sm:hidden"
            />
            <motion.aside
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 flex flex-col bg-background sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[600px] sm:max-h-[calc(100vh-3rem)] sm:w-[400px] sm:rounded-3xl sm:border sm:border-border sm:shadow-2xl sm:shadow-black/10"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Sparkles className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {profile.firstName}'s AI
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Ask me anything
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {messages.length > 0 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={resetMessages}
                      aria-label="Reset conversation"
                      className="size-8 rounded-full text-muted-foreground hover:text-foreground"
                    >
                      <RotateCcw className="size-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeChat}
                    aria-label="Close chat"
                    className="size-8 rounded-full text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex flex-1 flex-col overflow-y-auto">
                {messages.length === 0 ? (
                  <WelcomeMessage />
                ) : (
                  <ChatMessagesContainer />
                )}
              </div>

              {/* Input */}
              <ChatInput />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
