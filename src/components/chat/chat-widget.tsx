import { useEffect, useState } from 'react';
import { useLocation } from '@tanstack/react-router';
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
  const { pathname } = useLocation();
  const [covered, setCovered] = useState(false);

  // The launcher steps aside while the hero or the footer is on screen, so it
  // never sits on the hero's own calls to action or the footer links. The
  // hero is sticky (the content sheet slides over it), so it is tracked by
  // scroll position rather than intersection.
  useEffect(() => {
    const hero = document.getElementById('top');
    const footer = document.querySelector('.portfolio-footer');
    let inHero = false,
      inFooter = false;
    const sync = () => setCovered(inHero || inFooter);
    const onScroll = () => {
      inHero = hero !== null && window.scrollY < window.innerHeight * 0.6;
      sync();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inFooter = entry.isIntersecting;
      sync();
    });
    if (footer) observer.observe(footer);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      setCovered(false);
    };
  }, [pathname]);

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
        {!isOpen && !covered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6"
          >
            {/* Ink with a faint ring, so it holds its edge on cobalt, paper
                and the night sections alike. */}
            <button
              type="button"
              onClick={() => openChat()}
              aria-label="Ask my assistant"
              className="chat-fab group"
            >
              <Sparkles className="size-[18px] text-[var(--lime)] transition-transform duration-500 group-hover:rotate-[20deg]" />
              <span className="hidden sm:inline">Ask my assistant</span>
            </button>
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
              className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-background sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[620px] sm:max-h-[calc(100vh-3rem)] sm:w-[410px] sm:rounded-[28px] sm:border sm:border-foreground/10 sm:shadow-[0_40px_80px_-30px_rgb(12_14_19/0.45)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-foreground/10 px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--lime)]">
                    <Sparkles className="size-4" />
                  </span>
                  <div>
                    <p className="font-sans text-[15px] font-bold tracking-[-0.02em] text-foreground">
                      {profile.firstName}’s assistant
                    </p>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <i className="live-dot !bg-[#1c7a4a]" /> Answers about the
                      work
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
                      className="size-9 rounded-full text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                    >
                      <RotateCcw className="size-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeChat}
                    aria-label="Close chat"
                    className="size-9 rounded-full text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
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
