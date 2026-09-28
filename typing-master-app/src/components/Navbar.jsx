import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { Keyboard, GraduationCap, Zap, BookOpen, Gamepad2, Volume2, VolumeX, Moon, Sun, HelpCircle, Download, BrainCircuit, Award } from 'lucide-react';
=======
import { Keyboard, GraduationCap, Zap, BookOpen, Gamepad2, Volume2, VolumeX, Moon, Sun, HelpCircle, Download, BrainCircuit, Award, ShieldCheck } from 'lucide-react';
>>>>>>> main

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  soundEnabled, 
  setSoundEnabled, 
  theme, 
  toggleTheme, 
  onOpenGuide,
  onOpenCertificate
}) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("To install as a PWA:\n• On Chrome/Edge: Click the Install icon in the address bar.\n• On iOS Safari: Tap Share ➔ Add to Home Screen.\n• On Android Chrome: Tap Menu ➔ Install app.");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  return (
    <header className="nav-header">
      <div className="logo-section">
        <div className="logo-icon">
          <Keyboard size={24} />
        </div>
        <div>
          <div className="logo-title">Typing Master</div>
          <span className="logo-badge">Matte PWA</span>
        </div>
      </div>

      <nav className="nav-tabs">
        <button 
          className={`tab-btn ${activeTab === 'academy' ? 'active' : ''}`}
          onClick={() => setActiveTab('academy')}
          title="Beginner Lessons & Guided Practice"
        >
          <GraduationCap size={18} />
          <span>Academy</span>
        </button>

        <button 
          className={`tab-btn ${activeTab === 'aitutor' ? 'active' : ''}`}
          onClick={() => setActiveTab('aitutor')}
          title="AI Adaptive Weak Key Tutor"
        >
          <BrainCircuit size={18} />
          <span>AI Tutor</span>
        </button>

        <button 
          className={`tab-btn ${activeTab === 'speed' ? 'active' : ''}`}
          onClick={() => setActiveTab('speed')}
          title="Timed Speed Tests"
        >
          <Zap size={18} />
          <span>Speed Test</span>
        </button>

        <button 
          className={`tab-btn ${activeTab === 'verify' ? 'active' : ''}`}
          onClick={() => setActiveTab('verify')}
          title="Certificate Verification Portal"
        >
          <ShieldCheck size={18} />
          <span>Verify Cert</span>
        </button>

        <button 
          className={`tab-btn ${activeTab === 'defense' ? 'active' : ''}`}
          onClick={() => setActiveTab('defense')}
          title="Arcade Typing Defense Game"
        >
          <Gamepad2 size={18} />
          <span>Defense</span>
        </button>
      </nav>

      <div className="nav-actions">
        <button 
          className="btn-primary"
          onClick={onOpenCertificate}
          style={{ background: 'linear-gradient(135deg, var(--accent-amber), #d97706)', border: 'none' }}
<<<<<<< HEAD
          title="Generate Shareable Typing Certificate"
=======
          title="Generate Unique Verifiable Typing Certificate"
>>>>>>> main
        >
          <Award size={16} />
          <span>Certificate</span>
        </button>

        <button 
          className="btn-primary"
          onClick={handleInstallClick}
          style={{ background: 'linear-gradient(135deg, var(--accent-emerald), #059669)', border: 'none' }}
          title="Install Typing Master as a PWA app on Desktop/Mobile"
        >
          <Download size={16} />
          <span>Install App</span>
        </button>

        <button 
          className="icon-btn" 
          onClick={() => setSoundEnabled(!soundEnabled)}
          title={soundEnabled ? "Mute Key Audio" : "Enable Mechanical Key Audio"}
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        <button 
          className="icon-btn" 
          onClick={toggleTheme}
          title="Toggle Dark / Light Matte Theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button 
          className="btn-primary" 
          onClick={onOpenGuide}
          title="View Beginner Instructions & Finger Placement Guide"
        >
          <HelpCircle size={18} />
          <span>Guide</span>
        </button>
      </div>
    </header>
  );
}
