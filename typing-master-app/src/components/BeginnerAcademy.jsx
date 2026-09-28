import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { BEGINNER_LESSONS, QWERTY_FINGER_MAP } from '../data/lessonsData';
import VirtualKeyboard from './VirtualKeyboard';
import { playSound } from '../utils/soundEngine';
import { CheckCircle2, RotateCcw, ArrowRight, Info } from 'lucide-react';

export default function BeginnerAcademy({ soundEnabled }) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const lesson = BEGINNER_LESSONS[currentLessonIndex];

  const [inputIndex, setInputIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [errorCount, setErrorCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const containerRef = useRef(null);

  // Reset state when lesson changes
  useEffect(() => {
    resetLesson();
  }, [currentLessonIndex]);

  const resetLesson = () => {
    setInputIndex(0);
    setUserInput('');
    setErrorCount(0);
    setStartTime(null);
    setCompleted(false);
    setWpm(0);
    setAccuracy(100);
  };

  const handleKeyDown = (e) => {
    if (completed) return;

    // Ignore special modifier keys
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
      if (!startTime) {
        setStartTime(Date.now());
      }

      const targetChar = lesson.text[inputIndex];
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

      // Compute live WPM and Accuracy
      const elapsedSeconds = Math.max(1, (Date.now() - (startTime || Date.now())) / 1000);
      const currentWpm = Math.round((nextIndex / 5) / (elapsedSeconds / 60));
      const totalAttempts = nextIndex + errorCount;
      const currentAcc = Math.max(0, Math.round((nextIndex / (nextIndex + errorCount)) * 100));

      setWpm(currentWpm);
      setAccuracy(currentAcc);

      // Check completion
      if (nextIndex >= lesson.text.length) {
        setCompleted(true);
        playSound('success', soundEnabled);
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputIndex, userInput, startTime, completed, soundEnabled, currentLessonIndex]);

  const currentTargetChar = lesson.text[inputIndex] || '';
  const recommendedFinger = QWERTY_FINGER_MAP[currentTargetChar.toLowerCase()] || 'thumb';

  return (
    <div>
      {/* Lesson Navigation Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{lesson.title}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Follow the active finger prompt and complete the pattern accurately.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <select 
            value={currentLessonIndex}
            onChange={(e) => setCurrentLessonIndex(Number(e.target.value))}
            className="tab-btn"
            style={{ padding: '0.5rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border-matte)' }}
          >
            {BEGINNER_LESSONS.map((l, index) => (
              <option key={l.id} value={index}>
                {l.title}
              </option>
            ))}
          </select>

          <button className="icon-btn" onClick={resetLesson} title="Restart Lesson">
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Live Finger Guidance Tip Box */}
      <div className="matte-card" style={{ marginBottom: '1.25rem', borderLeft: `4px solid var(--finger-${recommendedFinger})` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Info size={22} style={{ color: `var(--finger-${recommendedFinger})` }} />
          <div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>
              Target Key: <code style={{ fontSize: '1.1rem', background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: '4px' }}>
                {currentTargetChar === ' ' ? 'SPACEBAR' : currentTargetChar.toUpperCase()}
              </code>
              {' '}➔ Use Finger: <span style={{ textTransform: 'capitalize', color: `var(--finger-${recommendedFinger})`, fontWeight: '800' }}>{recommendedFinger}</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {lesson.fingerTip}
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry Stats Banner */}
      <div className="stats-banner">
        <div className="stat-item">
          <div className="stat-label">Speed</div>
          <div className="stat-value highlight">{wpm} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>WPM</span></div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Accuracy</div>
          <div className="stat-value" style={{ color: accuracy >= 95 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
            {accuracy}%
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Progress</div>
          <div className="stat-value">
            {inputIndex} / {lesson.text.length}
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Errors</div>
          <div className="stat-value" style={{ color: errorCount > 0 ? 'var(--accent-rose)' : 'var(--text-main)' }}>
            {errorCount}
          </div>
        </div>
      </div>

      {/* Typing Display Arena */}
      <div className="typing-box">
        <div className="typing-text">
          {lesson.text.split('').map((char, index) => {
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

      {/* Lesson Completed Overlay / Card */}
      {completed && (
        <div className="matte-card" style={{ marginBottom: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', borderColor: 'var(--accent-emerald)', textAlign: 'center' }}>
          <CheckCircle2 size={48} style={{ color: 'var(--accent-emerald)', margin: '0 auto 0.5rem' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff' }}>Lesson Completed!</h3>
          <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 1rem' }}>
            Final Speed: <strong>{wpm} WPM</strong> | Accuracy: <strong>{accuracy}%</strong>
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="icon-btn" onClick={resetLesson} style={{ padding: '0.5rem 1rem', width: 'auto' }}>
              <RotateCcw size={16} /> Repeat Lesson
            </button>
            {currentLessonIndex < BEGINNER_LESSONS.length - 1 && (
              <button 
                className="btn-primary" 
                onClick={() => setCurrentLessonIndex((prev) => prev + 1)}
              >
                <span>Next Lesson</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Virtual Keyboard */}
      <VirtualKeyboard targetChar={currentTargetChar} />
    </div>
  );
}
