import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BeginnerAcademy from './components/BeginnerAcademy';
import SpeedTest from './components/SpeedTest';
import WordDefenseGame from './components/WordDefenseGame';
import BeginnerGuideModal from './components/BeginnerGuideModal';
import './styles/matte-theme.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('academy'); // academy, speed, quotes, defense
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Content Arena */}
      <main style={{ flex: 1 }}>
        {activeTab === 'academy' && (
          <BeginnerAcademy soundEnabled={soundEnabled} />
        )}

        {activeTab === 'speed' && (
          <SpeedTest soundEnabled={soundEnabled} mode="timed" />
        )}

        {activeTab === 'quotes' && (
          <SpeedTest soundEnabled={soundEnabled} mode="quote" />
        )}

        {activeTab === 'defense' && (
          <WordDefenseGame soundEnabled={soundEnabled} />
        )}
      </main>

      {/* Beginner Guide Modal */}
      <BeginnerGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Footer */}
      <footer style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <div>
          Typing Master • Matte Pro Edition • Touch Typing Academy & Speed Trainer
        </div>
      </footer>
    </div>
  );
}
