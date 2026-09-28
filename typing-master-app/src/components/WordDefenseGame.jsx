import React, { useState, useEffect, useRef } from 'react';
import { DEFENSE_WORDS } from '../data/lessonsData';
import { playSound } from '../utils/soundEngine';
import { Shield, Zap, Flame, RotateCcw, Trophy } from 'lucide-react';

export default function WordDefenseGame({ soundEnabled }) {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [wave, setWave] = useState(1);
  const [highScore, setHighScore] = useState(() => {
    return Number(localStorage.getItem('typing_defense_high_score') || 0);
  });
  const [gameInput, setGameInput] = useState('');
  const [activeWords, setActiveWords] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const requestRef = useRef();

  const startGame = () => {
    setScore(0);
    setLives(5);
    setWave(1);
    setGameInput('');
    setActiveWords([]);
    setGameOver(false);
    setGameStarted(true);
    spawnWord();
  };

  const spawnWord = () => {
    const randomWord = DEFENSE_WORDS[Math.floor(Math.random() * DEFENSE_WORDS.length)];
    const xPos = Math.floor(Math.random() * 70) + 15; // 15% to 85% width
    const newWord = {
      id: Date.now() + Math.random(),
      text: randomWord,
      x: xPos,
      y: 0, // starts at top
      speed: 0.3 + Math.min(wave * 0.1, 1.2)
    };
    setActiveWords((prev) => [...prev, newWord]);
  };

  // Game Loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(() => {
      // Spawn new word periodically
      if (Math.random() < 0.4 && activeWords.length < 5 + wave) {
        spawnWord();
      }
    }, 2000);

    const updatePosition = () => {
      setActiveWords((prevWords) => {
        const nextWords = [];
        let lostLife = false;

        prevWords.forEach((word) => {
          const nextY = word.y + word.speed;
          if (nextY >= 85) {
            // Word reached danger zone (bottom)
            lostLife = true;
            playSound('error', soundEnabled);
          } else {
            nextWords.push({ ...word, y: nextY });
          }
        });

        if (lostLife) {
          setLives((prevLives) => {
            const nextLives = prevLives - 1;
            if (nextLives <= 0) {
              setGameOver(true);
              playSound('error', soundEnabled);
            }
            return nextLives;
          });
        }

        return nextWords;
      });
      requestRef.current = requestAnimationFrame(updatePosition);
    };

    requestRef.current = requestAnimationFrame(updatePosition);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(requestRef.current);
    };
  }, [gameStarted, gameOver, wave, soundEnabled]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setGameInput(val);

    // Check if input matches any active word
    const matchedIndex = activeWords.findIndex((w) => w.text === val.trim());
    if (matchedIndex !== -1) {
      playSound('success', soundEnabled);
      const matchedWord = activeWords[matchedIndex];

      // Remove matched word
      setActiveWords((prev) => prev.filter((_, idx) => idx !== matchedIndex));
      setGameInput('');

      // Update Score
      const points = matchedWord.text.length * 10;
      setScore((prevScore) => {
        const nextScore = prevScore + points;
        if (nextScore > highScore) {
          setHighScore(nextScore);
          localStorage.setItem('typing_defense_high_score', nextScore);
        }
        if (nextScore > wave * 150) {
          setWave((prevWave) => prevWave + 1);
        }
        return nextScore;
      });
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Game Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Zap className="text-cyan" size={24} />
            <span>Word Defense Arcade</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Type falling words before they hit the bottom defense barrier!
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="stat-item" style={{ padding: '0.5rem 1rem' }}>
            <div className="stat-label">High Score</div>
            <div className="stat-value highlight" style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Trophy size={16} className="text-amber" /> {highScore}
            </div>
          </div>

          <div className="stat-item" style={{ padding: '0.5rem 1rem' }}>
            <div className="stat-label">Score</div>
            <div className="stat-value" style={{ fontSize: '1.25rem' }}>{score}</div>
          </div>

          <div className="stat-item" style={{ padding: '0.5rem 1rem' }}>
            <div className="stat-label">Wave</div>
            <div className="stat-value" style={{ fontSize: '1.25rem', color: 'var(--accent-violet)' }}>{wave}</div>
          </div>

          <div className="stat-item" style={{ padding: '0.5rem 1rem' }}>
            <div className="stat-label">Shields</div>
            <div className="stat-value" style={{ fontSize: '1.25rem', color: lives <= 2 ? 'var(--accent-rose)' : 'var(--accent-emerald)' }}>
              {'❤️'.repeat(Math.max(0, lives))}
            </div>
          </div>
        </div>
      </div>

      {/* Arcade Canvas Box */}
      <div className="typing-box" style={{ height: '380px', position: 'relative', background: 'radial-gradient(circle at center, #1e2638 0%, #0f1219 100%)', border: '2px solid var(--border-matte)' }}>
        {!gameStarted && !gameOver && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(15, 18, 25, 0.85)', backdropFilter: 'blur(4px)' }}>
            <Shield size={64} style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>Ready for Defense?</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', textAlign: 'center', maxWidth: '400px' }}>
              Defend the city by typing words quickly as they fall. Keep your accuracy sharp!
            </p>
            <button className="btn-primary" onClick={startGame} style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
              Start Defense Game
            </button>
          </div>
        )}

        {/* Falling Asteroid Words */}
        {gameStarted && !gameOver && activeWords.map((word) => (
          <div
            key={word.id}
            style={{
              position: 'absolute',
              left: `${word.x}%`,
              top: `${word.y}%`,
              fontFamily: 'var(--font-mono)',
              fontSize: '1.1rem',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: '6px',
              background: gameInput && word.text.startsWith(gameInput) ? 'var(--accent-cyan)' : 'var(--bg-card)',
              color: gameInput && word.text.startsWith(gameInput) ? '#000' : 'var(--text-main)',
              border: '1px solid var(--border-matte)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              transition: 'transform 0.05s linear',
              transform: 'translateX(-50%)'
            }}
          >
            {word.text}
          </div>
        ))}

        {/* Defense Barrier Line */}
        <div style={{ position: 'absolute', bottom: '15%', left: 0, right: 0, height: '2px', background: 'dashed linear-gradient(90deg, var(--accent-rose), var(--accent-cyan))', opacity: 0.6 }} />

        {/* Game Over Screen */}
        {gameOver && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(15, 18, 25, 0.92)', backdropFilter: 'blur(6px)' }}>
            <Flame size={64} style={{ color: 'var(--accent-rose)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent-rose)', marginBottom: '0.25rem' }}>Shields Breached!</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Final Score: <strong style={{ color: '#fff' }}>{score}</strong> | Survived: <strong style={{ color: '#fff' }}>Wave {wave}</strong>
            </p>
            <button className="btn-primary" onClick={startGame} style={{ padding: '0.75rem 2rem' }}>
              <RotateCcw size={18} /> Play Again
            </button>
          </div>
        )}
      </div>

      {/* Arcade Input Slot */}
      {gameStarted && !gameOver && (
        <div style={{ marginTop: '1rem' }}>
          <input
            type="text"
            value={gameInput}
            onChange={handleInputChange}
            placeholder="Type matching word here..."
            autoFocus
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-secondary)',
              border: '2px solid var(--accent-cyan)',
              color: '#fff',
              fontSize: '1.25rem',
              fontFamily: 'var(--font-mono)',
              textAlign: 'center',
              outline: 'none',
              boxShadow: '0 0 16px rgba(56, 189, 248, 0.2)'
            }}
          />
        </div>
      )}
    </div>
  );
}
