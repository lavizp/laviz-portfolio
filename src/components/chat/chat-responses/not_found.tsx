import { chatSuggestions } from '@/data/portfolio';
import { useChat } from '@/hooks/use-chat';

const NotFoundResponse = () => {
  const { sendMessage } = useChat();

  return (
    <div>
      <p className="mb-3 text-sm text-muted-foreground">
        I'm not sure about that one — try asking about:
      </p>
      <div className="flex flex-wrap gap-1.5">
        {chatSuggestions.slice(0, 4).map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => void sendMessage(suggestion)}
            className="border border-divider bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-brand hover:text-brand"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NotFoundResponse;
