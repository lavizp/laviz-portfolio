import { IChatMessage } from '@/types/chat';

type ChatMessageProps = {
  chat: IChatMessage;
};
const ChatMessage = ({ chat }: ChatMessageProps) => {
  return (
    <div
      key={chat.id}
      className={`flex ${
        chat.role === 'chat' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`flex flex-col ${
          chat.role === 'chat' ? 'items-end' : 'items-start'
        } max-w-[80%] md:max-w-[70%]`}
      >
        <div
          className={`rounded-2xl px-5 py-3 ${
            chat.role === 'chat'
              ? 'bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20'
              : 'bg-white border border-gray-200 text-gray-900 shadow-sm'
          }`}
        >
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
            {chat.message}
          </p>
        </div>
        <span className="text-xs text-gray-400 mt-1.5 px-1">now</span>
      </div>
    </div>
  );
};

export default ChatMessage;
