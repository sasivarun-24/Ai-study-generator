import React from 'react';
import { Link } from 'react-router-dom';
import { useNotesStore } from '../store/useNotesStore';
import { 
  Sparkles, 
  BookOpen, 
  History as LibraryIcon, 
  TrendingUp, 
  Award, 
  Heart,
  FileText,
  Clock
} from 'lucide-react';

export default function Dashboard() {
  const { notes } = useNotesStore();

  // Compute metrics
  const totalNotes = notes.length;
  const favoriteNotes = notes.filter(n => n.isFavorite).length;
  
  const totalFlashcards = notes.reduce((sum, n) => sum + (n.flashcards?.length || 0), 0);
  const masteredFlashcards = notes.reduce(
    (sum, n) => sum + (n.flashcards?.filter(f => f.mastered).length || 0), 0
  );

  const recentNotes = notes.slice(0, 3);

  // Group categories to show distribution
  const categories = ['Programming', 'Science', 'Math', 'History', 'Other'];
  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat] = notes.filter(n => n.category === cat).length;
    return acc;
  }, {});

  return (
    <div className="space-y-8 p-6 md:p-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 p-8 md:p-10 shadow-xl shadow-indigo-500/10">
        {/* Background glow balls */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[70px] pointer-events-none -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-cyan-400/20 rounded-full blur-[60px] pointer-events-none" />

        <div className="relative z-10 max-w-xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            Your personal study sidekick 🎒
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            What are we learning today?
          </h1>
          <p className="text-slate-100/90 text-sm md:text-base font-light leading-relaxed">
            Create custom study guides, practice with active-recall flashcards, and test yourself on any subject.
          </p>
          <div className="pt-2">
            <Link 
              to="/generate" 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-violet-700 font-bold text-sm shadow-md transition duration-200 hover:-translate-y-0.5"
            >
              Create a Study Guide
              <Sparkles className="w-4 h-4 text-violet-600" />
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 transition duration-300 hover:border-violet-500/30">
          <div className="p-3 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Guides Created</p>
            <h4 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-150">{totalNotes}</h4>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 transition duration-300 hover:border-cyan-500/30">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Flashcards</p>
            <h4 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-150">{totalFlashcards}</h4>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 transition duration-300 hover:border-emerald-500/30">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Cards Mastered</p>
            <h4 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-150">
              {masteredFlashcards} <span className="text-xs text-slate-400 font-normal">/ {totalFlashcards}</span>
            </h4>
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 transition duration-300 hover:border-fuchsia-500/30">
          <div className="p-3 rounded-xl bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Starred</p>
            <h4 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-150">{favoriteNotes}</h4>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Recent Notes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Clock className="w-5 h-5 text-violet-500" />
              Your Recent Guides
            </h3>
            {notes.length > 3 && (
              <Link to="/history" className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline">
                View All Library
              </Link>
            )}
          </div>

          {recentNotes.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {recentNotes.map((note) => (
                <div 
                  key={note.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border border-violet-200/20">
                        {note.category}
                      </span>
                      <span className="text-xs text-slate-450 dark:text-slate-500">{note.date}</span>
                    </div>
                    <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">{note.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {note.summary || 'Summary not available.'}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    <span className="text-xs text-slate-450 dark:text-slate-500 font-light">
                      {note.flashcards?.length || 0} Flashcards &bull; {note.quizzes?.length || 0} Quizzes
                    </span>
                    <div className="flex gap-2">
                      <Link 
                        to="/flashcards"
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 transition"
                      >
                        Study Cards
                      </Link>
                      <Link 
                        to="/history"
                        state={{ openNoteId: note.id }}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-violet-600 hover:bg-violet-700 text-white transition"
                      >
                        Read Guide
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-250 dark:border-slate-800 text-center flex flex-col items-center justify-center space-y-4 min-h-[250px]">
              <div className="p-4 rounded-full bg-violet-50 dark:bg-violet-950/20 text-violet-500">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-700 dark:text-slate-350">Your library is empty!</h4>
                <p className="text-xs text-slate-450 dark:text-slate-500 max-w-xs leading-normal">
                  Paste some lecture slides or type in a topic, and let's craft some beautiful study notes!
                </p>
              </div>
              <Link 
                to="/generate" 
                className="px-4 py-2 bg-violet-650 hover:bg-violet-750 text-white rounded-xl text-xs font-bold transition shadow-md shadow-violet-500/10"
              >
                Create your first guide
              </Link>
            </div>
          )}
        </div>

        {/* Right 1 Column: Learning Overview */}
        <div className="space-y-6">
          {/* Action Hub */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-violet-500" />
              My Study Breakdown
            </h3>
            
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Subjects by Category</h4>
              
              <div className="space-y-3 pt-2">
                {categories.map((cat) => {
                  const count = categoryCounts[cat] || 0;
                  const percent = totalNotes > 0 ? (count / totalNotes) * 100 : 0;
                  return (
                    <div key={cat} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-350">
                        <span>{cat}</span>
                        <span>{count} {count === 1 ? 'note' : 'notes'}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
