import { Home, Compass, Library, Clock, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Sidebar = () => {
  const navItems = [
    { icon: Home, label: 'Home' },
    { icon: Compass, label: 'Explore' },
    { icon: Library, label: 'Library' },
    { icon: Clock, label: 'History' },
  ];

  const conversationHistory = [
    'Tomorrow',
    "What's something you've learn...",
    'If you could teleport anywher...',
    "What's one goal you want to re...",
    '7 Days Ago',
    'Ask me anything weird or rand...',
    'How are you feeling today, real...',
    "What's one habit you wish you...",
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      <div className="p-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <span className="font-semibold text-gray-900">BeeBot</span>
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
            className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="flex-1 overflow-y-auto px-4 pt-6">
        {conversationHistory.map((item, index) => (
          <div
            key={index}
            className={`text-xs py-2 ${
              ['Tomorrow', '7 Days Ago'].includes(item)
                ? 'text-gray-400 font-medium uppercase tracking-wider'
                : 'text-gray-600 cursor-pointer hover:text-gray-900'
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-600" />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 truncate">
            Judha Mayuasya
          </div>
          <div className="text-xs text-gray-500 truncate">
            judha.m@yusya.com
          </div>
        </div>
        <Button variant="ghost" size="icon" className="w-6 h-6">
          <span className="text-gray-400">⋮</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
