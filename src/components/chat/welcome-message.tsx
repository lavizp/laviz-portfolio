import { Sparkles } from 'lucide-react';
import { chatSuggestions, profile } from '@/data/portfolio';
import { useChat } from '@/hooks/use-chat';

const WelcomeMessage = () => {
  const { sendMessage } = useChat();

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
      <span className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
        <Sparkles className="size-6" />
      </span>
      <h3 className="font-serif text-xl font-semibold text-foreground">
        Ask me anything
      </h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
        I'm {profile.firstName}'s AI assistant. Ask about his work, skills,
        or how to get in touch.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {chatSuggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => void sendMessage(suggestion)}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-brand/40 hover:text-brand"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeMessage;
