import React, { useState } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { useNotesStore } from '../store/useNotesStore';
import toast from 'react-hot-toast';
import { 
  KeyRound, 
  Volume2, 
  Trash2, 
  Download, 
  Upload, 
  Eye, 
  EyeOff, 
  ExternalLink,
  Save,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export default function Settings() {
  const { apiKey, setApiKey, ttsEnabled, setTtsEnabled, theme, setTheme } = useSettingsStore();
  const { notes, addNote } = useNotesStore();

  const [inputKey, setInputKey] = useState(apiKey || '');
  const [showKey, setShowKey] = useState(false);

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    setApiKey(inputKey.trim());
    toast.success(
      inputKey.trim() 
        ? "API Key saved successfully! Your study brain is ready." 
        : "API Key removed. Reverted to offline Demo Mode."
    );
  };

  const handleTestTTS = () => {
    if (!('speechSynthesis' in window)) {
      toast.error("Text-to-speech not supported in this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const text = "Voice reader test completed successfully! Ready to study.";
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
    toast.success("Playing sample voice audio...");
  };

  const handleClearData = () => {
    const confirmFirst = confirm("Are you sure you want to delete everything? Your study guides and flashcards will be gone forever.");
    if (confirmFirst) {
      const confirmSecond = confirm("This cannot be undone. Are you absolutely sure?");
      if (confirmSecond) {
        localStorage.removeItem('study-notes-data');
        localStorage.removeItem('study-notes-settings');
        toast.success("All data cleared! Reloading...");
        setTimeout(() => window.location.reload(), 1500);
      }
    }
  };

  const handleExportBackup = () => {
    const backupData = {
      notes: notes,
      settings: {
        theme,
        ttsEnabled
      }
    };
    const jsonString = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `study-ai-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Backup JSON exported successfully!");
  };

  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        if (parsed && Array.isArray(parsed.notes)) {
          parsed.notes.forEach((importedNote) => {
            // Avoid duplicate note entries by checking ID
            const exists = notes.some(existing => existing.id === importedNote.id);
            if (!exists) {
              addNote(importedNote);
            }
          });
          toast.success("Backup study notes imported successfully!");
        } else {
          toast.error("Invalid backup file format. Must contain notes array.");
        }
      } catch (err) {
        toast.error("Failed to parse backup JSON. Confirm file integrity.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 p-6 md:p-8 max-w-4xl mx-auto">
      {/* Settings Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* API Key Panel */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300 space-y-4">
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-violet-500" />
            Connect your AI Brain
          </h3>
          <p className="text-xs text-slate-450 dark:text-slate-500 leading-relaxed font-light">
            Paste your Gemini API key to study custom topics in real-time. Don't have a key? No worries—we'll use pre-loaded guides!
          </p>

          <form onSubmit={handleSaveApiKey} className="space-y-3 pt-2">
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="Paste Gemini API Key here..."
                className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 transition cursor-pointer"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 pt-1">
              <a 
                href="https://aistudio.google.com/" 
                target="_blank" 
                rel="noreferrer"
                className="text-[11px] text-violet-600 dark:text-violet-400 font-bold hover:underline flex items-center gap-1"
              >
                Get API Key
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                type="submit"
                className="px-4 py-2 bg-violet-650 hover:bg-violet-750 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-violet-500/10 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                Save API Key
              </button>
            </div>
          </form>
        </div>

        {/* Audio / Synthesizer Panel */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300 space-y-4">
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-violet-500" />
            Voice Reader Settings
          </h3>
          <p className="text-xs text-slate-450 dark:text-slate-500 leading-relaxed font-light">
            Enable our voice reader to hear flashcard questions and answers spoken aloud. Great for multi-tasking or auditory learning!
          </p>

          <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-350">Enable Voice Reader</span>
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={ttsEnabled} 
                onChange={(e) => setTtsEnabled(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-9 h-5 bg-slate-200 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-violet-600" />
            </label>
          </div>

          <div className="pt-2">
            <button
              onClick={handleTestTTS}
              disabled={!ttsEnabled}
              className={`w-full py-2 px-4 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                ttsEnabled
                  ? 'border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350'
                  : 'border-slate-100 dark:border-slate-850 text-slate-300 dark:text-slate-700 cursor-not-allowed'
              }`}
            >
              <Volume2 className="w-4.5 h-4.5" />
              Try Voice Reader
            </button>
          </div>
        </div>

        {/* Backups Export/Import Panel */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300 space-y-4">
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Download className="w-5 h-5 text-violet-500" />
            Save & Restore Library
          </h3>
          <p className="text-xs text-slate-450 dark:text-slate-500 leading-relaxed font-light">
            Export your study collection to a file on your device, or load a previous backup to restore your notes.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            {/* Export */}
            <button
              onClick={handleExportBackup}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-705 dark:text-slate-300 border border-slate-200 dark:border-slate-800/80 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Export JSON
            </button>

            {/* Import */}
            <label className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-705 dark:text-slate-300 border border-slate-200 dark:border-slate-800/80 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer text-center relative">
              <Upload className="w-4 h-4" />
              <span>Import JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
            </label>
          </div>
        </div>

        {/* Danger Zone Panel */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-red-500/10 dark:border-red-950/20 bg-red-500/5 dark:bg-red-950/5 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-red-655 dark:text-red-400 flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Fresh Start
          </h3>
          <p className="text-xs text-red-500/70 dark:text-red-400/50 leading-relaxed font-light">
            This will permanently wipe all your saved study guides, flashcards, settings, and local database.
          </p>

          <div className="pt-2">
            <button
              onClick={handleClearData}
              className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-red-500/10 cursor-pointer"
            >
              Reset Everything
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
