import type { IChatMessage, IChatResponseFormat } from '@/types/chat';
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
      default:
        return <NotFoundResponse />;
    }
  };

  const isUser = chat.role === 'chat';

  return (
    <div
      className={`flex animate-chat-entry ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`flex max-w-[88%] flex-col ${
          isUser ? 'items-end' : 'items-start'
        }`}
      >
        <div
          className={`px-4 py-2.5 ${
            isUser
              ? 'bg-brand text-brand-foreground'
              : 'border-2 border-divider bg-card text-card-foreground'
          }`}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed">{chat.message}</p>
          ) : (
            renderResponseComponent(chat.type)
          )}
        </div>
        <span className="mt-1 px-1 font-mono text-[10px] text-muted-foreground">
          {chat.time}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
