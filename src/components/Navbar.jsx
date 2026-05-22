import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSettingsStore } from '../store/useSettingsStore';
import { Sun, Moon, Cpu, Sparkles, KeyRound } from 'lucide-react';

export default function Navbar() {
  const { apiKey, theme, setTheme } = useSettingsStore();
  const location = useLocation();

  // Initialize theme class on page mount/reload
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Determine page title based on path
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Study Dashboard';
      case '/generate':
        return 'Create Notes';
      case '/flashcards':
        return 'Flashcards Review';
      case '/history':
        return 'Saved Guides';
      case '/settings':
        return 'Settings';
      default:
        return 'Study Companion';
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 md:py-6 border-b border-slate-200 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/10 backdrop-blur-md transition-colors duration-300 w-full">
      {/* Page Title */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-850 dark:text-slate-100 flex items-center gap-2">
          {getPageTitle()}
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 hidden md:block mt-0.5 font-light">
          A cozy space to organize, review, and master your subjects.
        </p>
      </div>

      {/* Control Actions */}
      <div className="flex items-center gap-3">
        {/* API connection status badge */}
        <Link 
          to="/settings"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition duration-200 hover:-translate-y-0.5 ${
            apiKey 
              ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20' 
              : 'bg-amber-500/5 text-amber-500 border-amber-500/20'
          }`}
        >
          {apiKey ? (
            <>
              <Cpu className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Brain Active</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </>
          ) : (
            <>
              <KeyRound className="w-3.5 h-3.5" />
              <span>Demo Mode</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            </>
          )}
        </Link>

        {/* Quick Link to Generate */}
        {location.pathname !== '/generate' && (
          <Link 
            to="/generate" 
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-750 text-white font-medium text-xs transition duration-200 shadow-md shadow-violet-500/10"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Generate
          </Link>
        )}

        {/* Light/Dark Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition duration-200 cursor-pointer"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-violet-600" />
          )}
        </button>
      </div>
    </header>
  );
}
