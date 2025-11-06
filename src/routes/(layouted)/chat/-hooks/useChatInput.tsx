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
  onSubmit: (prompt: string) => void;
  resetChat: () => void;
}

export const useChatInput = (): UseChatInputReturn => {
  const [inputValue, setInputValue] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const { sendMessage, resetMessages } = useChat();

  const allSuggestions: string[] = [
    'Tell me something about yourself',
    'What projects have you worked on?',
    'How do I contact you?',
    'What skills do you have?',
    'What tech stack do you work with?',
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
  const resetChat = () => {
    setInputValue('');
    setSelectedIndex(-1);
    resetMessages();
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion: string, send: boolean): void => {
    setInputValue(suggestion);
    inputRef.current?.focus();
    if (send) {
      onSubmit(suggestion);
    }
    setShowSuggestions(false);
  };
  const onSubmit = (prompt: string) => {
    sendMessage(prompt);
    setInputValue('');
    setSelectedIndex(-1);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key == 'Enter') {
      e.preventDefault();
      onSubmit(inputValue);
    }
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
      if (selectedIndex >= 0) {
        e.preventDefault();
        handleSuggestionClick(suggestions[selectedIndex], true);
      }
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
    onSubmit,
    resetChat,
  };
};
