import { IChatMessage, IChatResponseFormat } from '@/types/chat';
import AboutResponse from './chat-responses/about';
import ContactResponse from './chat-responses/contact';
import ProjectsResponse from './chat-responses/project';
import SkillsResponse from './chat-responses/skills';
import TechStackResponse from './chat-responses/tech_stack';
import ExperienceResponse from './chat-responses/experience';
import NotFoundResponse from './chat-responses/not_found';
import GeneralResponse from './chat-responses/general';

type ChatMessageProps = {
  chat: IChatMessage;
};
const ChatMessage = ({ chat }: ChatMessageProps) => {
  const renderResponseComponent = (format: IChatResponseFormat) => {
    switch (format) {
      case 'about':
        return <AboutResponse />;
      case 'contact':
        return <ContactResponse />;
      case 'skills':
        return <SkillsResponse />;
      case 'tech_stack':
        return <TechStackResponse />;
      case 'projects':
        return <ProjectsResponse />;
      case 'experience':
        return <ExperienceResponse />;
      case 'general':
        return <GeneralResponse />;
      case 'not_found':
        return <NotFoundResponse />;
      default:
        return <NotFoundResponse />;
    }
  };
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
          {chat.type && (
            <div className="space-y-3 w-full mt-0">
              <div>
                {chat.role == 'ai'
                  ? renderResponseComponent(chat.type)
                  : chat.message}
              </div>
            </div>
          )}
        </div>
        <span className="text-xs text-gray-400 mt-1.5 px-1">now</span>
      </div>
    </div>
  );
};

export default ChatMessage;
