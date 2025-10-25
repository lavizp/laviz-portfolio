import { useState, useRef, useEffect } from 'react';
import { Sparkles, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ChatInput: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const allSuggestions: string[] = [
    'How to create a React component',
    'How to use useState hook',
    'How to build a responsive navbar',
    'How to add animations with CSS',
    'How to fetch data from an API',
    'How to deploy a web application',
    'How to optimize website performance',
    'How to create a todo app',
    'How to use Tailwind CSS',
    'How to implement dark mode',
    'Write a function to sort an array',
    'Explain async/await in JavaScript',
    'Create a login form with validation',
    'Design a landing page',
    'Build a weather app',
  ];

  const suggestions: string[] = inputValue.trim()
    ? allSuggestions
        .filter((s: string) =>
          s.toLowerCase().includes(inputValue.toLowerCase()),
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    setShowSuggestions(suggestions.length > 0 && inputValue.trim() !== '');
  }, [suggestions.length, inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion: string): void => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!showSuggestions) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev: number) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev: number) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-linear-to-b from-white to-gray-50/50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {showSuggestions && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
              {suggestions.map((suggestion: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full text-left px-6 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3 group ${
                    selectedIndex === index ? 'bg-blue-50' : ''
                  }`}
                >
                  <Search className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {suggestion}
                  </span>
                </button>
              ))}
            </div>
          )}

          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl blur-lg" />
            <div className="relative bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] transition-all duration-300">
              <div className="relative flex items-center gap-2 p-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => inputValue.trim() && setShowSuggestions(true)}
                  placeholder="Ask me anything or describe what you need..."
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-900 placeholder:text-gray-400 text-base px-4 h-12"
                />
                <div className="relative">
                  <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity" />
                  <Button
                    size="icon"
                    className="cursor-pointer relative bg-linear-to-br from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white rounded-2xl w-12 h-12 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
                  >
                    <Sparkles className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">
          Press{' '}
          <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-600 font-mono">
            Enter
          </kbd>{' '}
          to send • Use{' '}
          <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-600 font-mono">
            ↑↓
          </kbd>{' '}
          to navigate suggestions
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
