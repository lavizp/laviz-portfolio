export function ChatLoading() {
  return (
    <div className="flex gap-1  bg-white dark:invert animate-chat-entry">
      <div className="h-4 w-4 bg-gray-200 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="h-4 w-4 bg-gray-200 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="h-4 w-4 bg-gray-200 rounded-full animate-bounce" />
    </div>
  );
}
