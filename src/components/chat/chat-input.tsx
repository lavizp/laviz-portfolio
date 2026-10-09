import { useState } from 'react';
import { SendHorizonal } from 'lucide-react';
import { useChat } from '@/hooks/use-chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ChatInput = () => {
  const { sendMessage, isLoading } = useChat();
  const [value, setValue] = useState('');

  const submit = () => {
    if (!value.trim() || isLoading) return;
    void sendMessage(value);
    setValue('');
  };

  return (
    <div className="border-t border-foreground/10 bg-background p-3">
      <div className="flex items-center gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="Ask me anything..."
          className="h-11 flex-1 rounded-full border-foreground/15 bg-card px-5 text-sm focus-visible:border-brand"
        />
        <Button
          size="icon"
          onClick={submit}
          disabled={!value.trim() || isLoading}
          aria-label="Send message"
          className="size-11 shrink-0 rounded-full bg-brand text-brand-foreground hover:bg-brand-600"
        >
          <SendHorizonal className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
