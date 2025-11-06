import { Send } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { InView } from '../ui/in-view';
import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from 'components/motion-primitives/disclosure';
import { useNavigate } from '@tanstack/react-router';

export function ChatHero() {
  const [message, setMessage] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const examplePrompts = [
    'Tell me something about yourself',
    'What projects have you worked on?',
    'How can I contact you?',
  ];

  const handleSend = () => {
    if (message.trim()) {
      navigate({ to: '/chat', search: { prompt: message } });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handlePromptClick = (prompt: string) => {
    setMessage(prompt);
  };
  return (
    <InView
      variants={{
        hidden: { opacity: 0, y: 100, filter: 'blur(4px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
      }}
      viewOptions={{ margin: '0px 0px -200px 0px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 via-white to-cyan-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-16">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-5xl lg:text-8xl font-black leading-tight tracking-tight">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-600 to-black">
                  Tired of the{' '}
                </span>
                <span className="text-black">old portfolios?</span>
              </h1>

              <p className="text-md md:text-xl text-gray-700 max-w-2xl mx-auto font-medium">
                Try something new, ask my chatbot about me and get your answers
              </p>
            </div>
            <Disclosure className="h-fit">
              <DisclosureTrigger>
                {isClicked ? (
                  <></>
                ) : (
                  <div className="flex items-center w-full justify-center">
                    <button
                      onClick={() => setIsClicked(true)}
                      className="rounded-3xl text-2xl py-3 px-8 bg-orange-600 text-white hover:bg-orange-500 hover:text-white cursor-pointer flex items-center justify-center gap-2"
                    >
                      Try Now
                    </button>
                  </div>
                )}
              </DisclosureTrigger>
              <DisclosureContent>
                <div className="flex flex-col gap-10 justify-center items-center w-full py-10">
                  <div className="relative group animate-fade-in w-full">
                    <div className="relative backdrop-blur-xl bg-white/80 border border-gray-200/60 rounded-3xl p-3 shadow-lg">
                      <div className="flex gap-3">
                        <Input
                          type="text"
                          placeholder="Type your message here..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="flex-1 bg-white/90 border-gray-300/60 text-gray-900 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-orange-500 text-lg rounded-2xl h-14 px-6"
                        />
                        <Button
                          onClick={handleSend}
                          className="cursor-pointer bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-2xl px-8 shadow-md hover:shadow-lg transition-all duration-300 h-14"
                        >
                          <Send className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="space-y-6 animate-fade-in"
                    style={{ animationDelay: '0.2s' }}
                  >
                    <p className="text-lg font-semibold text-gray-800">
                      Try these prompts:
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {examplePrompts.map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => handlePromptClick(prompt)}
                          className="cursor-pointer group relative px-6 py-3 backdrop-blur-xl bg-white/80 hover:bg-white/95 text-gray-800 font-medium rounded-2xl border border-orange-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                        >
                          <span className="relative z-10">{prompt}</span>
                          <div className="absolute inset-0 bg-linear-to-r from-orange-600/0 to-amber-600/0 group-hover:from-orange-600/10 group-hover:to-amber-600/10 rounded-2xl transition-all duration-300" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </DisclosureContent>
            </Disclosure>
          </div>
        </div>
      </div>
    </InView>
  );
}
