import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useNotesStore = create(
  persist(
    (set) => ({
      notes: [],

      // Add a newly generated study note
      addNote: (note) =>
        set((state) => ({
          notes: [
            {
              id: note.id || Date.now().toString(),
              title: note.title || 'Untitled Study Note',
              topic: note.topic || '',
              content: note.content || '',
              summary: note.summary || '',
              date: note.date || new Date().toLocaleDateString(),
              category: note.category || 'Other',
              isFavorite: false,
              flashcards: note.flashcards || [],
              quizzes: note.quizzes || [],
            },
            ...state.notes,
          ],
        })),

      // Remove a note by ID
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),

      // Toggle favorite status
      toggleFavorite: (id) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
          ),
        })),

      // Update flashcards for a specific note
      updateFlashcards: (noteId, flashcards) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === noteId
              ? {
                  ...note,
                  flashcards: flashcards.map((f) => ({
                    id: f.id || Math.random().toString(36).substring(2, 9),
                    question: f.question,
                    answer: f.answer,
                    mastered: f.mastered || false,
                  })),
                }
              : note
          ),
        })),

      // Toggle mastering a specific flashcard in a note
      toggleFlashcardMastered: (noteId, cardId) =>
        set((state) => ({
          notes: state.notes.map((note) => {
            if (note.id === noteId) {
              return {
                ...note,
                flashcards: note.flashcards.map((card) =>
                  card.id === cardId
                    ? { ...card, mastered: !card.mastered }
                    : card
                ),
              };
            }
            return note;
          }),
        })),

      // Save a quiz attempt score inside a note
      saveQuizResult: (noteId, score, total) =>
        set((state) => ({
          notes: state.notes.map((note) => {
            if (note.id === noteId) {
              const newQuiz = {
                id: Date.now().toString(),
                score,
                total,
                date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              };
              return {
                ...note,
                quizzes: [newQuiz, ...(note.quizzes || [])],
              };
            }
            return note;
          }),
        })),
    }),
    {
      name: 'study-notes-data', // key in localStorage
    }
  )
);
