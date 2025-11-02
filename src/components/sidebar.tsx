import { useState } from 'react';
import {
  Home,
  Compass,
  Search,
  Sparkles,
  MessageSquare,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Link, useRouter } from '@tanstack/react-router';

const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => {
  const router = useRouter();

  const navItems = [
    { icon: Home, label: 'Chat', path: '/chat' },
    { icon: Compass, label: 'Blog', path: '/blog' },
  ];

  const conversationHistory = [
    {
      title: 'About',
      prompt: 'Tell me something about yourself',
      key: 'about',
    },
    {
      title: 'Projects',
      prompt: 'What projects have you worked on?',
      key: 'projects',
    },
    {
      title: 'Tech Stack',
      prompt: 'What Tech Stack Do you use?',
      key: 'tech stack',
    },
    { title: 'Skill', prompt: 'What Skill Do you have?', key: 'skill' },
  ];

  const handleNavClick = (path: string) => {
    router.navigate({ to: path, search: { prompt: '' } });
    onNavigate?.();
  };

  return (
    <>
      <div className="p-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <span className="font-semibold text-gray-900">LavizP</span>
      </div>

      <div className="px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search"
            className="pl-9 bg-gray-50 border-gray-200 text-sm"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-xs text-gray-400 bg-white border border-gray-200 rounded">
            ⌘F
          </kbd>
        </div>
      </div>

      <nav className="px-2 space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50 cursor-pointer"
            onClick={() => handleNavClick(item.path)}
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="flex-1 overflow-y-auto px-4 pt-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">History:</h3>
        {conversationHistory.map((item) => (
          <Link
            key={item.key}
            className="flex items-center gap-3 py-3 px-3 transition-colors duration-150 border-b border-gray-100 hover:bg-orange-50 hover:text-orange-700 rounded-md cursor-pointer"
            to="/chat"
            search={{ prompt: item.prompt }}
          >
            <MessageSquare className="h-3 w-3" />
            <div className="truncate">{item.title}</div>
          </Link>
        ))}
      </div>
    </>
  );
};

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-30 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex h-14 items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileOpen(true)}
            className="mr-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">LavizP</span>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        {/* Overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Sliding Sidebar */}
        <div
          className={cn(
            'fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-50 transform transition-transform duration-300 ease-in-out',
            isMobileOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          {/* Close button for mobile */}
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <SidebarContent onNavigate={() => setIsMobileOpen(false)} />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col h-screen">
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
