import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BeginnerAcademy from './components/BeginnerAcademy';
import WeakKeyTutor from './components/WeakKeyTutor';
import SpeedTest from './components/SpeedTest';
import WordDefenseGame from './components/WordDefenseGame';
import VerificationPortal from './components/VerificationPortal';
import BeginnerGuideModal from './components/BeginnerGuideModal';
import CertificateModal from './components/CertificateModal';
import './styles/matte-theme.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('academy'); // academy, aitutor, speed, verify, defense
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isCertOpen, setIsCertOpen] = useState(false);

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
        onOpenCertificate={() => setIsCertOpen(true)}
      />

      {/* Main Content Arena */}
      <main style={{ flex: 1 }}>
        {activeTab === 'academy' && (
          <BeginnerAcademy soundEnabled={soundEnabled} />
        )}

        {activeTab === 'aitutor' && (
          <WeakKeyTutor soundEnabled={soundEnabled} />
        )}

        {activeTab === 'speed' && (
          <SpeedTest soundEnabled={soundEnabled} mode="timed" />
        )}

        {activeTab === 'verify' && (
          <VerificationPortal />
        )}

        {activeTab === 'defense' && (
          <WordDefenseGame soundEnabled={soundEnabled} />
        )}
      </main>

      {/* Modals */}
      <BeginnerGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <CertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        wpm={68}
        accuracy={98}
      />

      {/* Footer */}
      <footer style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <div>
          Typing Master • Unique Certificate Registration & Public Verification Registry
        </div>
      </footer>
    </div>
  );
}
