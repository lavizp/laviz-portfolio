import { Paperclip, Sparkles, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ChatInput = () => {
  return (
    <div className="border-t border-gray-200 bg-linear-to-b from-white to-gray-50/50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl blur-lg" />

          <div className="relative bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] transition-all duration-300">
            <div className="relative flex items-center gap-2 p-2">
              <div className="flex items-center gap-1 pl-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors h-9 w-9"
                >
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors h-9 w-9"
                >
                  <Mic className="w-5 h-5" />
                </Button>
              </div>

              <Input
                placeholder="Ask me anything or describe what you need..."
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-900 placeholder:text-gray-400 text-base px-4 h-12"
              />

              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity" />
                <Button
                  size="icon"
                  className="relative bg-linear-to-br from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white rounded-2xl w-12 h-12 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Press{' '}
          <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-600 font-mono">
            Enter
          </kbd>{' '}
          to send
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
