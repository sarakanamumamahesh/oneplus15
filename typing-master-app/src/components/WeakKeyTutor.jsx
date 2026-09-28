import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { getWeakestKeys, generateAdaptiveDrillText, recordKeyAttempt } from '../utils/weakKeyTutor';
import VirtualKeyboard from './VirtualKeyboard';
import { playSound } from '../utils/soundEngine';
import { BrainCircuit, RotateCcw, Target } from 'lucide-react';

export default function WeakKeyTutor({ soundEnabled }) {
  const [weakKeys, setWeakKeys] = useState([]);
  const [drillText, setDrillText] = useState('');
  const [inputIndex, setInputIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [errorCount, setErrorCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [accuracy, setAccuracy] = useState(100);

  useEffect(() => {
    loadWeakKeysAndGenerateDrill();
  }, []);

  const loadWeakKeysAndGenerateDrill = () => {
    const keys = getWeakestKeys(4);
    setWeakKeys(keys);
    const newDrill = generateAdaptiveDrillText(keys);
    setDrillText(newDrill);
    setInputIndex(0);
    setUserInput('');
    setErrorCount(0);
    setCompleted(false);
    setAccuracy(100);
  };

  const handleKeyDown = (e) => {
    if (completed) return;

    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(e.key)) {
      return;
    }

    if (e.key === 'Backspace') {
      if (inputIndex > 0) {
        setInputIndex((prev) => prev - 1);
        setUserInput((prev) => prev.slice(0, -1));
        playSound('click', soundEnabled);
      }
      return;
    }

    if (e.key.length === 1) {
      const targetChar = drillText[inputIndex];
      const typedChar = e.key;
      const isCorrect = typedChar === targetChar;

      if (targetChar) {
        recordKeyAttempt(targetChar, isCorrect);
      }

      if (isCorrect) {
        playSound(typedChar === ' ' ? 'space' : 'correct', soundEnabled);
      } else {
        playSound('error', soundEnabled);
        setErrorCount((prev) => prev + 1);
      }

      const nextInput = userInput + typedChar;
      setUserInput(nextInput);
      const nextIndex = inputIndex + 1;
      setInputIndex(nextIndex);

      const totalAttempts = nextIndex + errorCount;
      const currentAcc = Math.max(0, Math.round((nextIndex / totalAttempts) * 100));
      setAccuracy(currentAcc);

      if (nextIndex >= drillText.length) {
        setCompleted(true);
        playSound('success', soundEnabled);
        try {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } catch (e) {}
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputIndex, userInput, completed, soundEnabled, drillText, errorCount]);

  const currentTargetChar = drillText[inputIndex] || '';

  return (
    <div>
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BrainCircuit className="text-violet" size={24} />
            <span>AI Adaptive Weak-Key Tutor</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Analyzes your typing mistakes and auto-generates targeted muscle-memory drills.
          </p>
        </div>

        <button className="btn-primary" onClick={loadWeakKeysAndGenerateDrill}>
          <RotateCcw size={16} />
          <span>Regenerate AI Drill</span>
        </button>
      </div>

      {/* Weak Keys AI Diagnostic Panel */}
      <div className="matte-card" style={{ marginBottom: '1.25rem', borderLeft: '4px solid var(--accent-violet)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={18} className="text-violet" />
              <span>AI Detected Weak Keys:</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              {weakKeys.map((key) => (
                <span key={key} style={{ background: 'rgba(244, 63, 94, 0.2)', color: 'var(--accent-rose)', border: '1px solid rgba(244, 63, 94, 0.4)', padding: '4px 12px', borderRadius: '6px', fontWeight: '800', fontSize: '1.1rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  {key === ' ' ? 'SPACE' : key}
                </span>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '300px' }}>
            ✨ Practice this AI-tailored pattern to eliminate your error hotspots and push accuracy above 95%!
          </div>
        </div>
      </div>

      {/* Telemetry */}
      <div className="stats-banner">
        <div className="stat-item">
          <div className="stat-label">AI Accuracy</div>
          <div className="stat-value" style={{ color: accuracy >= 95 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
            {accuracy}%
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Drill Progress</div>
          <div className="stat-value highlight">
            {inputIndex} / {drillText.length}
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Errors</div>
          <div className="stat-value" style={{ color: errorCount > 0 ? 'var(--accent-rose)' : 'var(--text-main)' }}>
            {errorCount}
          </div>
        </div>
      </div>

      {/* Typing Arena */}
      <div className="typing-box">
        <div className="typing-text">
          {drillText.split('').map((char, index) => {
            let status = 'untyped';
            if (index < inputIndex) {
              status = userInput[index] === char ? 'correct' : 'incorrect';
            } else if (index === inputIndex) {
              status = 'current';
            }
            return (
              <span key={index} className={`char ${status}`}>
                {char}
              </span>
            );
          })}
        </div>
      </div>

      {/* Virtual Keyboard */}
      <VirtualKeyboard targetChar={currentTargetChar} />
    </div>
  );
}
