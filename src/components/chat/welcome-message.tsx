import { Plus } from 'lucide-react';
import OfficeEmployeeIcon from '../icons/office-employee';
import BlockIcon from '../icons/block';
import BaloonIcon from '../icons/baloon';
import TaskListPin from '../icons/task-list-pin';

const WelcomeMessage = () => {
  const suggestions = [
    {
      title: 'Projects',
      key: 'projects',
      icon: <BlockIcon />,
      color: '#86efac', // green-300
    },
    {
      title: 'About',
      key: 'about',
      icon: <OfficeEmployeeIcon />,
      color: '#93c5fd', // blue-300
    },
    {
      title: 'Skills',
      key: 'skils',
      icon: <BaloonIcon />,
      color: '#fca5a5', // red-300
    },
    {
      title: 'Contact',
      key: 'contact',
      icon: <TaskListPin />,
      color: '#fde68a', // amber-200
    },
  ];
  return (
    <div className="flex-1 flex items-center justify-center overflow-hidden">
      <div className="text-center relative px-8">
        {/* Multiple Gradient Blobs for depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-32 w-64 h-64 bg-linear-to-br from-blue-400 via-indigo-400 to-purple-300 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute top-8 left-1/4 -translate-x-1/2 w-48 h-48 bg-linear-to-br from-indigo-300 to-blue-300 rounded-full blur-2xl opacity-30" />
        <div className="absolute top-8 right-1/4 translate-x-1/2 w-40 h-40 bg-linear-to-br from-purple-300 to-indigo-300 rounded-full blur-2xl opacity-25" />
        {/* Decorative sparkles */}
        <div className="absolute -top-12 left-1/3 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse" />
        <div className="absolute -top-8 right-1/3 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-50" />
        <div className="absolute top-16 left-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-40 animate-pulse" />
        {/* Welcome Text */}
        <div className="relative space-y-3">
          <div className="inline-block">
            <h1 className="text-5xl font-bold text-gray-900 mb-1 tracking-tight">
              Good Morning
            </h1>
            <div className="h-1 w-32 bg-linear-to-r from-transparent via-blue-600 to-transparent mx-auto rounded-full opacity-50" />
          </div>

          <p className="text-5xl font-bold leading-tight">
            <span className="text-gray-900">How Can I </span>
            <span className="relative inline-block">
              <span className="relative z-10 bg-linear-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Assist You Today?
              </span>
              <span className="absolute inset-0 bg-linear-to-r from-blue-600/20 via-indigo-600/20 to-blue-700/20 blur-lg" />
            </span>
          </p>

          <p className="text-sm text-gray-400 mt-6 font-medium tracking-wide">
            Note: This is not powered by an LLM
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center justify-center px-5 mt-10">
          {suggestions.map((item) => {
            return (
              <div
                key={item.title}
                className="rounded-xl border font-semibold border-gray-200 px-3 py-3 flex justify-between items-center"
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`rounded-xl p-3`}
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div>{item.title}</div>
                </div>
                <div className="flex items-center justify-center h-8 w-8 rounded-full border border-gray-300 cursor-pointer mr-1 transition-transform duration-100 hover:scale-110">
                  <Plus size={18} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
