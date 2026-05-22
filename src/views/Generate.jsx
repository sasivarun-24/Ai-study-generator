import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotesStore } from '../store/useNotesStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { generateStudyContent } from '../utils/gemini';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import { 
  Sparkles, 
  BookOpen, 
  HelpCircle,
  FileText, 
  Copy, 
  Download, 
  Save, 
  ArrowRight,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

const SUGGESTIONS = [
  { topic: "React Hooks", desc: "Front-end coding state hooks" },
  { topic: "Photosynthesis", desc: "Plant solar energy conversion" },
  { topic: "SQL Joins", desc: "Combining relational databases" }
];

const LOADING_CAPTIONS = [
  "Organizing the core concepts...",
  "Reading through the details...",
  "Writing clean explanations...",
  "Creating memory flashcards...",
  "Generating practice quiz questions...",
  "Making the notes look beautiful..."
];

export default function Generate() {
  const navigate = useNavigate();
  const { addNote } = useNotesStore();
  const { apiKey, difficulty } = useSettingsStore();

  const [topic, setTopic] = useState('');
  const [material, setMaterial] = useState('');
  const [category, setCategory] = useState('Programming');
  const [localDifficulty, setLocalDifficulty] = useState(difficulty || 'intermediate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingCaptionIndex, setLoadingCaptionIndex] = useState(0);

  // Result States
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes', 'quiz'
  const [isSaved, setIsSaved] = useState(false);

  // Quiz active states
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { questionIdx: optionText }
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Loading text rotation
  useEffect(() => {
    let interval;
    if (isGenerating) {
      interval = setInterval(() => {
        setLoadingCaptionIndex((prev) => (prev + 1) % LOADING_CAPTIONS.length);
      }, 3000);
    } else {
      setLoadingCaptionIndex(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  // Sync global store difficulty when component mounts
  useEffect(() => {
    if (difficulty) {
      setLocalDifficulty(difficulty);
    }
  }, [difficulty]);

  const handleSuggestionClick = (selectedTopic) => {
    setTopic(selectedTopic);
    toast.success(`Selected topic: "${selectedTopic}"`);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim() && !material.trim()) {
      toast.error("Please provide either a topic name or paste study notes.");
      return;
    }

    setIsGenerating(true);
    setResult(null);
    setIsSaved(false);
    setSelectedAnswers({});
    setSubmittedQuiz(false);
    setQuizScore(0);

    const promise = generateStudyContent({
      topic,
      material,
      difficulty: localDifficulty,
      apiKey
    });

    toast.promise(promise, {
      loading: 'Talking to Gemini...',
      success: 'Your study guide is ready! 🎉',
      error: (err) => err.message || 'Generation failed'
    });

    try {
      const data = await promise;
      setResult(data);
      setActiveTab('notes');
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveNote = () => {
    if (!result) return;
    
    addNote({
      id: Date.now().toString(),
      title: result.title,
      topic: topic || result.title,
      content: result.content,
      summary: result.summary,
      category: category,
      date: new Date().toLocaleDateString(),
      flashcards: result.flashcards,
      quizzes: []
    });

    setIsSaved(true);
    toast.success("Saved to Library!");
  };

  const handleCopyNotes = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.content);
    toast.success("Notes copied to clipboard!");
  };

  const handleDownloadNotes = () => {
    if (!result) return;
    const blob = new Blob([result.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.title.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Markdown file downloaded!");
  };

  // Interactive Quiz Logic
  const handleSelectAnswer = (qIdx, option) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIdx]: option
    }));
  };

  const handleSubmitQuiz = () => {
    if (!result?.quiz) return;
    
    let correctCount = 0;
    result.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    setQuizScore(correctCount);
    setSubmittedQuiz(true);
    toast.success(`Quiz Completed! You scored ${correctCount} / ${result.quiz.length}`);
  };

  return (
    <div className="space-y-8 p-6 md:p-8 max-w-5xl mx-auto">
      {/* Settings warning (if in demo mode) */}
      {!apiKey && (
        <div className="flex items-center gap-3 p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 text-amber-500 text-sm">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <div>
            <span className="font-bold">Demo Mode Active:</span> We're using pre-made guides. To generate your own custom topics, add an API key in <span className="underline font-bold cursor-pointer" onClick={() => navigate('/settings')}>Settings</span>!
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form (5 Cols) */}
        <form onSubmit={handleGenerate} className="lg:col-span-5 space-y-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-500" />
            Study Guide Planner
          </h3>

          {/* Topic */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">What topic are we studying?</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic (e.g. Photosynthesis, SQL Joins, Ancient Greece)..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
            />
          </div>

          {/* Suggestions */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              Need some inspiration?
            </span>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  type="button"
                  key={s.topic}
                  onClick={() => handleSuggestionClick(s.topic)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20 hover:border-violet-500/30 text-left text-xs text-slate-600 dark:text-slate-400 transition hover:-translate-y-0.5 cursor-pointer"
                >
                  <span className="font-bold block text-slate-700 dark:text-slate-350">{s.topic}</span>
                  <span className="text-[9px] text-slate-450 dark:text-slate-500">{s.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Paste material */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Paste study text, articles, or transcripts (optional)</label>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                {material.length} / 5000 chars
              </span>
            </div>
            <textarea
              value={material}
              onChange={(e) => setMaterial(e.target.value.slice(0, 5000))}
              rows="6"
              placeholder="Paste articles, lecture transcripts, or notes to summarize..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition resize-none"
            />
          </div>

          {/* Double Selectors */}
          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-xs text-slate-750 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition cursor-pointer"
              >
                <option value="Programming">Programming</option>
                <option value="Science">Science</option>
                <option value="Math">Math</option>
                <option value="History">History</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Difficulty */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Explanation Style</label>
              <select
                value={localDifficulty}
                onChange={(e) => setLocalDifficulty(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-xs text-slate-750 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition cursor-pointer"
              >
                <option value="beginner">ELI5 (Explain Like I'm 5)</option>
                <option value="intermediate">Standard Student / Balanced</option>
                <option value="advanced">Expert Analyst / Deep Dive</option>
              </select>
            </div>
          </div>

          {/* Action Trigger */}
          <button
            type="submit"
            disabled={isGenerating}
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all duration-300 ${
              isGenerating 
                ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed text-slate-400 dark:text-slate-500 shadow-none' 
                : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-violet-500/20 hover:-translate-y-0.5'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Craft Study Guide ✨
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Right Column: Loading or Outputs (7 Cols) */}
        <div className="lg:col-span-7 min-h-[450px] flex flex-col">
          {isGenerating ? (
            /* Pulsing Loading State */
            <div className="flex-1 flex flex-col justify-center items-center p-8 rounded-2xl bg-white/40 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/60 shadow-sm space-y-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-violet-500/10 border-t-violet-500 animate-spin" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-violet-500 animate-pulse">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-2 text-center">
                <h4 className="font-bold text-slate-800 dark:text-slate-150 animate-pulse">
                  Crafting your study guide...
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs h-4 font-light">
                  {LOADING_CAPTIONS[loadingCaptionIndex]}
                </p>
              </div>
              <div className="w-full max-w-md space-y-3 pt-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4 animate-pulse" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-full animate-pulse" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-5/6 animate-pulse" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-2/3 animate-pulse" />
              </div>
            </div>
          ) : result ? (
            /* Results Panel */
            <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden transition-colors duration-300">
              {/* Tab Selector & Control Actions */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition duration-200 ${
                      activeTab === 'notes'
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-500/10'
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Summary Notes
                  </button>
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition duration-200 ${
                      activeTab === 'quiz'
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-500/10'
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850'
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    Practice Quiz
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleCopyNotes}
                    title="Copy Markdown"
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 transition"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleDownloadNotes}
                    title="Download Notes"
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 transition"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleSaveNote}
                    disabled={isSaved}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
                      isSaved
                        ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/20 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                    }`}
                  >
                    <Save className="w-3.5 h-3.5" />
                    {isSaved ? 'Saved' : 'Save to Library'}
                  </button>
                </div>
              </div>

              {/* Tab Outputs */}
              <div className="flex-1 p-6 overflow-y-auto max-h-[500px]">
                {activeTab === 'notes' ? (
                  /* Render Markdown content */
                  <div className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed text-slate-650 dark:text-slate-350 space-y-4">
                    <ReactMarkdown
                      components={{
                        h1: ({ node, ...props }) => <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-150 border-b border-slate-100 dark:border-slate-800/80 pb-2 mt-4" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-5 mb-2" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-base font-bold text-slate-700 dark:text-slate-200 mt-4" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-1 mt-2" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal pl-5 space-y-1 mt-2" {...props} />,
                        code: ({ node, inline, ...props }) => (
                          inline 
                            ? <code className="bg-slate-100 dark:bg-slate-850 px-1.5 py-0.5 rounded text-xs font-mono text-pink-650 dark:text-pink-400" {...props} />
                            : <pre className="bg-slate-100 dark:bg-slate-950 p-4 rounded-xl font-mono text-xs overflow-x-auto text-slate-800 dark:text-slate-350 border border-slate-200 dark:border-slate-800 mt-3" {...props} />
                        )
                      }}
                    >
                      {result.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  /* Quiz View */
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Let's see what you remember!</h4>
                      {submittedQuiz && (
                        <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-550 dark:text-violet-400 text-xs font-bold border border-violet-500/25">
                          Score: {quizScore} / {result.quiz.length} ({Math.round((quizScore / result.quiz.length) * 100)}%)
                        </span>
                      )}
                    </div>

                    <div className="space-y-6">
                      {result.quiz?.map((q, qIdx) => {
                        const isCorrect = selectedAnswers[qIdx] === q.correctAnswer;
                        const hasSelected = selectedAnswers[qIdx] !== undefined;

                        return (
                          <div 
                            key={qIdx} 
                            className={`p-5 rounded-2xl border transition duration-300 ${
                              submittedQuiz 
                                ? isCorrect 
                                  ? 'border-emerald-500/35 bg-emerald-500/5' 
                                  : 'border-rose-500/35 bg-rose-500/5'
                                : 'border-slate-150 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-950/10'
                            }`}
                          >
                            <h5 className="font-bold text-sm text-slate-800 dark:text-slate-150 flex gap-2">
                              <span>Q{qIdx + 1}.</span>
                              <span>{q.question}</span>
                            </h5>

                            {/* Options */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                              {q.options.map((option, oIdx) => {
                                const isSelected = selectedAnswers[qIdx] === option;
                                const isOptionCorrect = option === q.correctAnswer;

                                return (
                                  <button
                                    type="button"
                                    key={oIdx}
                                    onClick={() => handleSelectAnswer(qIdx, option)}
                                    disabled={submittedQuiz}
                                    className={`px-4 py-3 rounded-xl border text-left text-xs font-medium transition duration-200 cursor-pointer ${
                                      isSelected
                                        ? 'border-violet-600 bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 font-bold'
                                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 text-slate-700 dark:text-slate-350'
                                    } ${
                                      submittedQuiz && isOptionCorrect
                                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-350 font-bold'
                                        : ''
                                    } ${
                                      submittedQuiz && isSelected && !isOptionCorrect
                                        ? 'bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-350 line-through'
                                        : ''
                                    }`}
                                  >
                                    {option}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Explanation */}
                            {submittedQuiz && (
                              <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed pl-1.5 border-l-2 border-slate-300 dark:border-slate-750">
                                <span className="font-bold text-slate-700 dark:text-slate-350">Explanation:</span> {q.explanation}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {!submittedQuiz ? (
                      <button
                        type="button"
                        onClick={handleSubmitQuiz}
                        disabled={Object.keys(selectedAnswers).length < (result.quiz?.length || 0)}
                        className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition ${
                          Object.keys(selectedAnswers).length < (result.quiz?.length || 0)
                            ? 'bg-slate-100 dark:bg-slate-850 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none'
                            : 'bg-violet-600 hover:bg-violet-750 text-white'
                        }`}
                      >
                        Grade My Quiz
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAnswers({});
                          setSubmittedQuiz(false);
                          setQuizScore(0);
                        }}
                        className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-750 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition"
                      >
                        Try Again
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="flex-1 flex flex-col justify-center items-center p-8 rounded-2xl border border-dashed border-slate-250 dark:border-slate-800 text-center space-y-4">
              <div className="p-4 rounded-full bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-550">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-700 dark:text-slate-350">Your workspace is ready!</h4>
                <p className="text-xs text-slate-450 dark:text-slate-500 max-w-xs leading-normal font-light">
                  Type in a topic on the left or use a quick suggestion to craft your study materials.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
