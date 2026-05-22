import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotesStore } from '../store/useNotesStore';
import { useSettingsStore } from '../store/useSettingsStore';
import toast from 'react-hot-toast';
import { 
  BookOpen, 
  Volume2, 
  RotateCw, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight,
  Bookmark,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export default function Flashcards() {
  const navigate = useNavigate();
  const { notes, toggleFlashcardMastered } = useNotesStore();
  const { ttsEnabled } = useSettingsStore();

  const [selectedNoteId, setSelectedNoteId] = useState(notes[0]?.id || '');
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Get active note and deck
  const activeNote = notes.find(n => n.id === selectedNoteId);
  const deck = activeNote?.flashcards || [];
  const currentCard = deck[currentCardIdx];

  const handleNext = () => {
    if (currentCardIdx < deck.length - 1) {
      setCurrentCardIdx(currentCardIdx + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentCardIdx > 0) {
      setCurrentCardIdx(currentCardIdx - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleToggleMastered = (e) => {
    e.stopPropagation(); // prevent flipping the card
    if (!activeNote || !currentCard) return;

    toggleFlashcardMastered(activeNote.id, currentCard.id);
    const updatedMastered = !currentCard.mastered;
    
    if (updatedMastered) {
      toast.success("Card marked as Mastered! Keep it up.");
    } else {
      toast.success("Card moved back to Review Later.");
    }
  };

  // Text to Speech
  const speakText = (e, text) => {
    e.stopPropagation(); // prevent flipping the card
    if (!('speechSynthesis' in window)) {
      toast.error("Text-to-speech is not supported in this browser.");
      return;
    }
    window.speechSynthesis.cancel(); // cancel speaking previous queues
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  // Calculate statistics for current deck
  const masteredCount = deck.filter(c => c.mastered).length;
  const progressPercent = deck.length > 0 ? (masteredCount / deck.length) * 100 : 0;

  return (
    <div className="space-y-8 p-6 md:p-8 max-w-4xl mx-auto">
      {/* Selector Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <div className="space-y-1">
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-violet-500" />
            My Study Decks
          </h3>
          <p className="text-xs text-slate-450 dark:text-slate-500">Select a guide to review its active-recall flashcards.</p>
        </div>

        {notes.length > 0 ? (
          <select
            value={selectedNoteId}
            onChange={(e) => {
              setSelectedNoteId(e.target.value);
              setCurrentCardIdx(0);
              setIsFlipped(false);
            }}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 cursor-pointer"
          >
            {notes.map((n) => (
              <option key={n.id} value={n.id}>
                {n.title} ({n.flashcards?.length || 0} cards)
              </option>
            ))}
          </select>
        ) : (
          <span className="text-xs text-slate-400 dark:text-slate-500">No decks available.</span>
        )}
      </div>

      {deck.length > 0 && currentCard ? (
        <div className="space-y-6">
          {/* Deck Metrics */}
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Card {currentCardIdx + 1} of {deck.length}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                {masteredCount} / {deck.length} Mastered
              </span>
              <div className="w-32 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* 3D Flip Card Container */}
          <div className="flex justify-center py-4">
            <div 
              onClick={handleFlip}
              className="w-full max-w-xl h-80 cursor-pointer select-none [perspective:1000px] group"
            >
              <div 
                className={`relative w-full h-full rounded-3xl duration-500 [transform-style:preserve-3d] transition-transform ${
                  isFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* Front Side (Question) */}
                <div className="absolute inset-0 w-full h-full rounded-3xl p-8 bg-gradient-to-tr from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xl [backface-visibility:hidden] z-10">
                  <div className="flex justify-between items-center w-full">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[10px] font-bold tracking-wider uppercase">
                      <HelpCircle className="w-3 h-3" /> Question
                    </span>
                    <button
                      onClick={(e) => speakText(e, currentCard.question)}
                      disabled={!ttsEnabled}
                      title="Listen"
                      className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition"
                    >
                      <Volume2 className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  <div className="text-center px-4">
                    <h3 className="text-lg md:text-xl font-bold text-slate-850 dark:text-slate-100 leading-relaxed">
                      {currentCard.question}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-450 dark:text-slate-500 w-full">
                    <span className="flex items-center gap-1">
                      <RotateCw className="w-3.5 h-3.5 animate-pulse" /> Tap or click to flip
                    </span>
                    <button
                      onClick={handleToggleMastered}
                      title={currentCard.mastered ? "Unmark Mastered" : "Mark Mastered"}
                      className={`p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition ${
                        currentCard.mastered ? 'text-emerald-500' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      <CheckCircle className="w-5 h-5 fill-current text-opacity-10" />
                    </button>
                  </div>
                </div>

                {/* Back Side (Answer) */}
                <div className="absolute inset-0 w-full h-full rounded-3xl p-8 bg-gradient-to-br from-violet-600 to-indigo-650 text-white flex flex-col justify-between shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="flex justify-between items-center w-full">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold tracking-wider uppercase border border-white/10">
                      <Bookmark className="w-3 h-3" /> Answer
                    </span>
                    <button
                      onClick={(e) => speakText(e, currentCard.answer)}
                      disabled={!ttsEnabled}
                      title="Listen"
                      className="p-2 rounded-xl hover:bg-white/10 text-white/80 transition"
                    >
                      <Volume2 className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  <div className="text-center px-4">
                    <p className="text-sm md:text-base leading-relaxed font-medium">
                      {currentCard.answer}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-violet-200 w-full">
                    <span>Tap or click to flip back</span>
                    <button
                      onClick={handleToggleMastered}
                      className={`p-2 rounded-xl hover:bg-white/10 transition ${
                        currentCard.mastered ? 'text-emerald-300' : 'text-white/60'
                      }`}
                    >
                      <CheckCircle className="w-5 h-5 fill-current text-opacity-10" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={handlePrev}
              disabled={currentCardIdx === 0}
              className={`p-3 rounded-2xl border transition duration-200 ${
                currentCardIdx === 0
                  ? 'border-slate-100 dark:border-slate-850 text-slate-300 dark:text-slate-700 cursor-not-allowed'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleFlip}
              className="px-6 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition duration-200 border border-slate-200 dark:border-slate-800 cursor-pointer"
            >
              Flip Card
            </button>

            <button
              onClick={handleNext}
              disabled={currentCardIdx === deck.length - 1}
              className={`p-3 rounded-2xl border transition duration-200 ${
                currentCardIdx === deck.length - 1
                  ? 'border-slate-100 dark:border-slate-850 text-slate-300 dark:text-slate-700 cursor-not-allowed'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer'
              }`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 rounded-3xl bg-white dark:bg-slate-900 border border-dashed border-slate-250 dark:border-slate-800 text-center flex flex-col items-center justify-center space-y-4 min-h-[300px]">
          <div className="p-4 rounded-full bg-violet-50 dark:bg-violet-950/20 text-violet-550">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-750 dark:text-slate-300">No flashcards found</h4>
            <p className="text-xs text-slate-450 dark:text-slate-500 max-w-xs leading-normal">
              Create a study guide first, and the flashcards will automatically appear here!
            </p>
          </div>
          <button
            onClick={() => navigate('/generate')}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-750 text-white rounded-xl text-xs font-bold transition shadow-md shadow-violet-500/10 cursor-pointer"
          >
            Create a Study Guide
          </button>
        </div>
      )}
    </div>
  );
}
