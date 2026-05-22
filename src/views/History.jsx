import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNotesStore } from '../store/useNotesStore';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import { 
  Search, 
  Trash2, 
  Heart, 
  Download, 
  FileText, 
  ExternalLink,
  BookOpen,
  X,
  Sparkles,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function History() {
  const location = useLocation();
  const navigate = useNavigate();
  const { notes, deleteNote, toggleFavorite } = useNotesStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'alphabetical'
  
  // Selected note details modal
  const [activeNote, setActiveNote] = useState(null);

  // Check if navigate passed a state to open a specific note
  useEffect(() => {
    if (location.state?.openNoteId && notes.length > 0) {
      const target = notes.find(n => n.id === location.state.openNoteId);
      if (target) {
        setActiveNote(target);
      }
    }
  }, [location.state, notes]);

  const handleDelete = (id, e) => {
    e.stopPropagation(); // prevent opening the note details modal
    if (confirm("Are you sure you want to delete this study note?")) {
      deleteNote(id);
      toast.success("Note deleted successfully.");
      if (activeNote?.id === id) {
        setActiveNote(null);
      }
    }
  };

  const handleToggleFav = (id, e) => {
    e.stopPropagation(); // prevent opening the note
    toggleFavorite(id);
  };

  const handleDownload = (note, e) => {
    if (e) e.stopPropagation();
    const blob = new Blob([note.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Markdown downloaded!");
  };

  // Filter & Sort notes
  const filteredNotes = notes
    .filter((note) => {
      const matchSearch = 
        note.title.toLowerCase().includes(search.toLowerCase()) || 
        note.summary.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase());
      
      const matchCategory = selectedCategory === 'All' || note.category === selectedCategory;
      const matchFav = !showFavoritesOnly || note.isFavorite;

      return matchSearch && matchCategory && matchFav;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.id.localeCompare(a.id); // Assuming IDs are timestamp-based strings
      if (sortBy === 'oldest') return a.id.localeCompare(b.id);
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      return 0;
    });

  const categories = ['All', 'Programming', 'Science', 'Math', 'History', 'Other'];

  return (
    <div className="space-y-6 p-6 md:p-8 max-w-7xl mx-auto relative">
      {/* Control Actions Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
        
        {/* Search */}
        <div className="md:col-span-4 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search my guides..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
          />
        </div>

        {/* Categories Pills */}
        <div className="md:col-span-5 flex gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-violet-650 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-850 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Favorite & Sort Options */}
        <div className="md:col-span-3 flex justify-end gap-3 w-full">
          {/* Favorites check */}
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
              showFavoritesOnly
                ? 'border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-550 dark:text-fuchsia-400'
                : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-current' : ''}`} />
            Favorites
          </button>

          {/* Sort selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-650 dark:text-slate-350 focus:outline-none cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="alphabetical">A - Z</option>
          </select>
        </div>
      </div>

      {/* Grid Library Items */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => setActiveNote(note)}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-md hover:border-violet-500/30 transition-all duration-300 flex flex-col justify-between h-56 cursor-pointer"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-violet-50 dark:bg-violet-950/40 text-violet-650 dark:text-violet-300 border border-violet-200/10">
                    {note.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleToggleFav(note.id, e)}
                      className={`p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-850 transition ${
                        note.isFavorite ? 'text-fuchsia-500' : 'text-slate-400 hover:text-fuchsia-500'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${note.isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => handleDelete(note.id, e)}
                      className="p-1.5 rounded-lg hover:bg-rose-500/10 hover:text-rose-500 text-slate-400 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="font-bold text-base text-slate-800 dark:text-slate-150 line-clamp-1 group-hover:text-violet-550 dark:group-hover:text-violet-400 transition">
                  {note.title}
                </h4>
                <p className="text-xs text-slate-450 dark:text-slate-400 line-clamp-3 leading-relaxed font-light">
                  {note.summary || 'Summary not available.'}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60 text-[10px] text-slate-400 dark:text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {note.date}
                </span>
                <span className="flex items-center gap-1 font-semibold text-violet-605 dark:text-violet-400">
                  Open Study Guide <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty states */
        <div className="p-12 rounded-3xl bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 text-center flex flex-col items-center justify-center space-y-4 min-h-[350px]">
          <div className="p-4 rounded-full bg-violet-50 dark:bg-violet-950/20 text-violet-500">
            <Search className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-750 dark:text-slate-350">No matching study guides found</h4>
            <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs leading-normal">
              {notes.length === 0 
                ? "You haven't generated any study guides yet. Let's make some notes!"
                : "Try adjusting your filters or typing a different query to find your notes."}
            </p>
          </div>
        </div>
      )}

      {/* Note Detailed Markdown Overlay Modal */}
      {activeNote && (
        <div className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm flex justify-center items-center p-4 md:p-6" onClick={() => setActiveNote(null)}>
          <div 
            className="w-full max-w-4xl max-h-[85vh] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header info */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/30">
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded bg-violet-500/10 text-[9px] font-extrabold uppercase tracking-wide text-violet-650 dark:text-violet-400 border border-violet-500/10">
                  {activeNote.category}
                </span>
                <h3 className="font-bold text-base md:text-lg text-slate-850 dark:text-slate-100 line-clamp-1">{activeNote.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleDownload(activeNote, e)}
                  title="Download Markdown"
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 transition"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveNote(null)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-650 dark:text-slate-350 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content Body (Markdown render) */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[60vh] prose prose-slate dark:prose-invert max-w-none text-xs md:text-sm leading-relaxed text-slate-650 dark:text-slate-355 space-y-4">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-slate-150 border-b border-slate-100 dark:border-slate-800 pb-2 mt-4" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-200 mt-5 mb-2" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-sm md:text-base font-bold text-slate-705 dark:text-slate-250 mt-4" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-1 mt-2" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal pl-5 space-y-1 mt-2" {...props} />,
                  code: ({ node, inline, ...props }) => (
                    inline 
                      ? <code className="bg-slate-100 dark:bg-slate-850 px-1.5 py-0.5 rounded text-xs font-mono text-pink-655 dark:text-pink-400" {...props} />
                      : <pre className="bg-slate-100 dark:bg-slate-950 p-4 rounded-xl font-mono text-xs overflow-x-auto text-slate-800 dark:text-slate-350 border border-slate-200 dark:border-slate-800 mt-3" {...props} />
                  )
                }}
              >
                {activeNote.content}
              </ReactMarkdown>
            </div>

            {/* Footer Summary details */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-xs text-slate-450 dark:text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span>Saved on {activeNote.date} &bull; Includes {activeNote.flashcards?.length || 0} Flashcards</span>
              <button
                onClick={() => {
                  setActiveNote(null);
                  navigate('/flashcards');
                }}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-750 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Go to Flashcards Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
