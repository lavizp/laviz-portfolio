import { Link, useLocation } from '@tanstack/react-router';
import React, { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'home.tsx', icon: '⚛️' },
    { path: '/about', label: 'README.md', icon: 'ℹ️' },
    { path: '/skills', label: 'skills.json', icon: '{}' },
    { path: '/projects', label: 'projects.ts', icon: 'TS' },
    { path: '/contact', label: 'contact.md', icon: '📝' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0d1117]/90 backdrop-blur-md border-b border-brand-border' : 'bg-transparent pt-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo / Branch Name */}
          <div className="flex items-center gap-4">
             <Link to="/" className="flex items-center gap-2 group">
               <div className="bg-brand-accent p-1.5 rounded-md transform transition-transform group-hover:rotate-12">
                 <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                 </svg>
               </div>
               <div className="flex flex-col">
                 <span className="text-white font-mono font-bold text-sm tracking-tight">laviz-pandey</span>
                 <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                   <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
                   main
                 </span>
               </div>
             </Link>
          </div>

          {/* Desktop IDE Tabs */}
          <div className="hidden md:flex items-end h-full">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    relative h-10 px-4 flex items-center gap-2 text-xs font-mono border-t-2 transition-colors
                    ${active 
                      ? 'border-brand-accent bg-[#1e1e1e] text-white rounded-t-sm' 
                      : 'border-transparent text-slate-500 hover:bg-[#1e1e1e]/50 hover:text-slate-300'
                    }
                  `}
                >
                  <span className="opacity-70">{item.icon}</span>
                  {item.label}
                  {active && (
                    <span className="ml-2 w-1.5 h-1.5 rounded-full bg-white opacity-0 hover:opacity-100 transition-opacity"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded text-[10px] font-mono text-slate-400 border border-slate-700">
               <span className="w-2 h-2 rounded-full bg-green-500"></span>
               Build: Passing
            </div>
            <Link to="/contact" className="px-4 py-1.5 text-xs font-mono font-bold bg-brand-accent hover:bg-brand-secondary text-white rounded transition-colors shadow-lg shadow-brand-accent/20">
              git checkout contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0d1117] border-b border-brand-border animate-slide-up shadow-xl">
          <div className="flex flex-col font-mono text-sm">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-6 py-3 border-l-2 flex items-center gap-3 ${
                   isActive(item.path) 
                   ? 'border-brand-accent bg-[#1e1e1e] text-white' 
                   : 'border-transparent text-slate-400 hover:bg-[#1e1e1e]'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;