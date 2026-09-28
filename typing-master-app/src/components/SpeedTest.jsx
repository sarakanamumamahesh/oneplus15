import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { TEST_TEXTS } from '../data/lessonsData';
import VirtualKeyboard from './VirtualKeyboard';
import { playSound } from '../utils/soundEngine';
import { RotateCcw, Timer, Award } from 'lucide-react';

export default function SpeedTest({ soundEnabled, mode = 'timed' }) {
  const [timeLimit, setTimeLimit] = useState(30); // 15, 30, 60, 120
  const [timeLeft, setTimeLeft] = useState(30);
  const [textCategory, setTextCategory] = useState('words'); // words, quotes, code

  const [text, setText] = useState('');
  const [inputIndex, setInputIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [errorCount, setErrorCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  // Initialize practice text
  useEffect(() => {
    resetTest();
  }, [timeLimit, textCategory, mode]);

  const resetTest = () => {
    const textsArray = TEST_TEXTS[textCategory] || TEST_TEXTS.words;
    const randomText = textsArray[Math.floor(Math.random() * textsArray.length)];
    setText(randomText);
    setInputIndex(0);
    setUserInput('');
    setErrorCount(0);
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(timeLimit);
    setWpm(0);
    setCpm(0);
    setAccuracy(100);
  };

  // Timer Countdown Effect
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const finishTest = () => {
    setIsActive(false);
    setIsFinished(true);
    playSound('success', soundEnabled);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const handleKeyDown = (e) => {
    if (isFinished) return;

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
      if (!isActive && !isFinished) {
        setIsActive(true);
      }

      const targetChar = text[inputIndex];
      const typedChar = e.key;

      if (typedChar === targetChar) {
        playSound(typedChar === ' ' ? 'space' : 'correct', soundEnabled);
      } else {
        playSound('error', soundEnabled);
        setErrorCount((prev) => prev + 1);
      }

      const nextInput = userInput + typedChar;
      setUserInput(nextInput);
      const nextIndex = inputIndex + 1;
      setInputIndex(nextIndex);

      // Compute Live Stats
      const elapsedSeconds = Math.max(1, timeLimit - timeLeft);
      const currentWpm = Math.round((nextIndex / 5) / (elapsedSeconds / 60));
      const currentCpm = Math.round(nextIndex / (elapsedSeconds / 60));
      const currentAcc = Math.max(0, Math.round((nextIndex / (nextIndex + errorCount)) * 100));

      setWpm(currentWpm);
      setCpm(currentCpm);
      setAccuracy(currentAcc);

      if (nextIndex >= text.length) {
        finishTest();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputIndex, userInput, isActive, isFinished, soundEnabled, text, timeLeft, timeLimit]);

  const currentTargetChar = text[inputIndex] || '';

  return (
    <div>
      {/* Settings Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Timer size={20} className="text-cyan" />
          <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>Time Duration:</span>
          {[15, 30, 60, 120].map((t) => (
            <button
              key={t}
              className={`tab-btn ${timeLimit === t ? 'active' : ''}`}
              onClick={() => setTimeLimit(t)}
            >
              {t}s
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-muted)' }}>Mode:</span>
          {['words', 'quotes', 'code'].map((cat) => (
            <button
              key={cat}
              className={`tab-btn ${textCategory === cat ? 'active' : ''}`}
              onClick={() => setTextCategory(cat)}
              style={{ textTransform: 'capitalize' }}
            >
              {cat}
            </button>
          ))}

          <button className="icon-btn" onClick={resetTest} title="Restart Speed Test">
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Telemetry Banner */}
      <div className="stats-banner">
        <div className="stat-item">
          <div className="stat-label">Time Remaining</div>
          <div className="stat-value" style={{ color: timeLeft <= 5 ? 'var(--accent-rose)' : 'var(--text-main)' }}>
            {timeLeft}s
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Net Speed</div>
          <div className="stat-value highlight">{wpm} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>WPM</span></div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Gross CPM</div>
          <div className="stat-value">{cpm}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Accuracy</div>
          <div className="stat-value" style={{ color: accuracy >= 95 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
            {accuracy}%
          </div>
        </div>
      </div>

      {/* Typing Area */}
      <div className="typing-box">
        {!isActive && !isFinished && (
          <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem', fontWeight: '600' }}>
            ▶ Click or start typing to begin the timer...
          </div>
        )}
        <div className="typing-text">
          {text.split('').map((char, index) => {
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

      {/* Completion Modal / Card */}
      {isFinished && (
        <div className="matte-card" style={{ marginBottom: '1.5rem', background: 'var(--bg-secondary)', border: '2px solid var(--accent-cyan)', textAlign: 'center' }}>
          <Award size={48} style={{ color: 'var(--accent-cyan)', margin: '0 auto 0.5rem' }} />
          <h3 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Test Completed!</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', margin: '1rem 0' }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>TYPING SPEED</div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>{wpm} WPM</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>ACCURACY</div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent-emerald)' }}>{accuracy}%</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>ERRORS</div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent-rose)' }}>{errorCount}</div>
            </div>
          </div>
          <button className="btn-primary" onClick={resetTest} style={{ margin: '0 auto' }}>
            <RotateCcw size={16} /> Try Another Test
          </button>
        </div>
      )}

      {/* Virtual Keyboard */}
      <VirtualKeyboard targetChar={currentTargetChar} />
    </div>
  );
}
