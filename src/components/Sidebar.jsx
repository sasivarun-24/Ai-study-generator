import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sparkles, 
  BookOpen, 
  History, 
  Settings, 
  Menu, 
  X,
  Brain
} from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Create Notes', path: '/generate', icon: Sparkles },
    { name: 'Flashcards', path: '/flashcards', icon: BookOpen },
    { name: 'Saved Notes', path: '/history', icon: History },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Top Navbar (Visible only on mobile/tablet) */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 w-full transition-colors duration-300">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/35">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
            Study.AI
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-20 bg-slate-950/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div 
            className="w-64 max-w-[80vw] h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-850 p-6 flex flex-col justify-between transition-colors duration-300 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                  Study.AI
                </span>
              </div>

              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition duration-200
                        ${isActive 
                          ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
            
            <div className="text-xs text-slate-400 dark:text-slate-500 text-center font-light border-t border-slate-100 dark:border-slate-800/80 pt-4">
              v1.0.0 &bull; Student Toolkit
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar (Permanent Sidebar for md and larger screen sizes) */}
      <aside className="hidden md:flex flex-col justify-between w-64 h-screen sticky top-0 border-r border-slate-200 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md px-6 py-8 transition-colors duration-300 z-10">
        <div className="space-y-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg leading-tight tracking-tight bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                Study.AI
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
                Student Toolkit
              </span>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25 translate-x-1' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-250 hover:translate-x-0.5'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800/60 pt-6">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-600/5 to-cyan-600/5 border border-slate-100 dark:border-slate-800/50 flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-350">Tip of the Day</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed">
              Use Flashcards to study. Test recall, flip, and repeat for maximum mastery!
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
