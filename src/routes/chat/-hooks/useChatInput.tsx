import { useState, useRef, useEffect } from 'react';
import { useChat } from '../-hooks/useChat';

export interface UseChatInputReturn {
  inputRef: React.RefObject<HTMLInputElement | null>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  showSuggestions: boolean;
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  suggestions: string[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSuggestionClick: (suggestion: string, send: boolean) => void;
  sendMessage: (prompt: string) => void;
}

export const useChatInput = (): UseChatInputReturn => {
  const [inputValue, setInputValue] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const { sendMessage } = useChat();

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

  const handleSuggestionClick = (suggestion: string, send: boolean): void => {
    setInputValue(suggestion);
    inputRef.current?.focus();
    if (send) {
      sendMessage(suggestion);
      setInputValue('');
    }
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!showSuggestions) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0) {
        handleSuggestionClick(suggestions[selectedIndex], true);
        return;
      }
      sendMessage(inputValue);
      setInputValue('');
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return {
    inputRef,
    inputValue,
    setInputValue,
    showSuggestions,
    setShowSuggestions,
    selectedIndex,
    setSelectedIndex,
    suggestions,
    handleInputChange,
    handleKeyDown,
    handleSuggestionClick,
    sendMessage,
  };
};
