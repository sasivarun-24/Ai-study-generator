import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Component Imports
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// Page Views Imports
import Dashboard from './views/Dashboard';
import Generate from './views/Generate';
import Flashcards from './views/Flashcards';
import History from './views/History';
import Settings from './views/Settings';

function App() {
  return (
    <Router>
      <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-[#070b12] text-slate-800 dark:text-[#e2e8f0] transition-colors duration-300">
        
        {/* Toast Notifications Provider */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1e293b',
              color: '#f8fafc',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              fontSize: '13px',
              fontFamily: "'Outfit', sans-serif"
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#1e293b'
              }
            },
            error: {
              iconTheme: {
                primary: '#f43f5e',
                secondary: '#1e293b'
              }
            }
          }}
        />

        {/* Global Page Layout */}
        <Sidebar />

        {/* Main Workspace Frame */}
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />
          
          <main className="flex-1 overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/generate" element={<Generate />} />
              <Route path="/flashcards" element={<Flashcards />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
