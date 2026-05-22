# Study.AI — AI-Powered Student Learning Workspace 🎒

**Study.AI** is a premium, client-side web workspace designed to act as an "AI study assistant" (like Notion AI for students). It allows students to generate structured study summaries, practice with active-recall flashcard decks, and test themselves using multiple-choice quizzes, powered by Google Gemini API integration.

---

## ✨ Features

* **🎒 Cozy Student Dashboard:** Monitor your progress at a glance, showing stats on created guides, total flashcards, mastered cards, starred guides, and category breakdown charts.
* **✨ AI Study Guide Planner:** Enter a topic or paste long text (lecture slides, article transcripts) to generate notes, practice quizzes, and recall flashcard decks using customizable explanation levels (`ELI5`, `Standard`, `Expert`).
* **🃏 3D Active-Recall Flashcards:** Study with interactive, responsive 3D flip cards, track your mastery check progress, and listen to questions and answers spoken aloud.
* **🗣️ Voice Reader (Text-to-Speech):** Browser-native audio narration powered by the Web Speech API for auditory learners.
* **📚 Saved Guides Library:** Search, filter by category or favorites, sort, delete, and view your study notes as markdown files.
* **📥 Save & Restore Backups:** Export your entire notes library and progress to a local JSON file, or restore a previous library backup.
* **🔄 Offline Demo Mode:** Start testing immediately with offline mock summaries and study guides if no API key is entered.

---

## 🛠️ Technologies Used

* **Frontend:** React (Vite), JavaScript, HTML5, CSS3
* **Styling & Animation:** Tailwind CSS v4, Framer Motion (for smooth 3D card flips & view transitions)
* **Icons:** Lucide React
* **State Management:** Zustand (with automatic `localStorage` persistence)
* **Markdown Renderer:** React Markdown
* **AI Engine:** Google Gemini API (`gemini-1.5-flash` model)
* **Auditory Support:** HTML5 Web Speech Synthesis API

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sasivarun-24/Ai-study-generator.git
   cd Ai-study-generator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🔑 AI Integration (Optional)

To enable live, custom note generation on any topic:
1. Obtain a free API key from [Google AI Studio](https://aistudio.google.com/).
2. In the app, navigate to **Settings**.
3. Paste your key in the **Connect your AI Brain** input field and click **Save API Key**.
4. The connection indicator will turn green and display **AI Brain Active**.
