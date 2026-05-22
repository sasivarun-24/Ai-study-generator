import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSettingsStore = create(
  persist(
    (set) => ({
      apiKey: '',
      theme: 'dark',
      difficulty: 'intermediate', // 'beginner' (ELI5), 'intermediate' (standard), 'advanced' (expert)
      ttsEnabled: true,

      setApiKey: (key) => set({ apiKey: key }),
      setTheme: (theme) => {
        set({ theme });
        // Update document body class list for dark/light mode
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      setDifficulty: (difficulty) => set({ difficulty }),
      setTtsEnabled: (enabled) => set({ ttsEnabled: enabled }),
    }),
    {
      name: 'study-notes-settings', // key in localStorage
    }
  )
);
