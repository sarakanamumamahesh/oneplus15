import React from 'react';
import { X, Target, ShieldAlert, Award, Compass } from 'lucide-react';

export default function BeginnerGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Compass className="text-cyan" size={26} />
            <span>Beginner Touch Typing Guide</span>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="guide-grid">
          <div className="guide-card">
            <h4>
              <Target size={18} />
              1. The Home Row Position
            </h4>
            <p>
              The <strong>Home Row</strong> is where your fingers rest between strokes:
            </p>
            <ul>
              <li><strong>Left Hand:</strong> Pinky on <code>A</code>, Ring on <code>S</code>, Middle on <code>D</code>, Index on <code>F</code></li>
              <li><strong>Right Hand:</strong> Index on <code>J</code>, Middle on <code>K</code>, Ring on <code>L</code>, Pinky on <code>;</code></li>
              <li><strong>Thumbs:</strong> Rest gently on the <code>Spacebar</code></li>
            </ul>
            <p style={{ marginTop: '0.5rem', color: 'var(--accent-cyan)' }}>
              <em>Tip: Notice the raised bumps on the <strong>F</strong> and <strong>J</strong> keys! Use them to orient your hands without looking down.</em>
            </p>
          </div>

          <div className="guide-card">
            <h4>
              <Award size={18} />
              2. Color-Coded Finger Zones
            </h4>
            <p>
              Each finger is responsible for a specific column of keys:
            </p>
            <ul>
              <li><span style={{ color: 'var(--finger-pinky)', fontWeight: 'bold' }}>● Pinky:</span> Q, A, Z, P, ;, /, 1, 0</li>
              <li><span style={{ color: 'var(--finger-ring)', fontWeight: 'bold' }}>● Ring:</span> W, S, X, O, L, ., 2, 9</li>
              <li><span style={{ color: 'var(--finger-middle)', fontWeight: 'bold' }}>● Middle:</span> E, D, C, I, K, ,, 3, 8</li>
              <li><span style={{ color: 'var(--finger-index)', fontWeight: 'bold' }}>● Index:</span> R, T, F, G, V, B (Left) | Y, U, H, J, N, M (Right)</li>
              <li><span style={{ color: 'var(--finger-thumb)', fontWeight: 'bold' }}>● Thumbs:</span> Spacebar</li>
            </ul>
          </div>

          <div className="guide-card">
            <h4>
              <ShieldAlert size={18} />
              3. The Golden Rules of Touch Typing
            </h4>
            <ul>
              <li><strong>Rule 1: Never look at the keyboard!</strong> Use the visual virtual keyboard on screen to guide your eyes.</li>
              <li><strong>Rule 2: Prioritize Accuracy over Speed.</strong> Aim for 95%+ accuracy before trying to type faster. Speed comes automatically with muscle memory!</li>
              <li><strong>Rule 3: Always return to Home Row.</strong> After pressing any key in top or bottom row, immediately bring your finger back to its home key.</li>
            </ul>
          </div>

          <div className="guide-card">
            <h4>
              <Compass size={18} />
              4. Ergonomics & Posture
            </h4>
            <ul>
              <li>Keep your back straight and feet flat on the floor.</li>
              <li>Keep elbows bent at a 90-degree angle.</li>
              <li>Hover your wrists slightly above the desk—do not rest them heavily on the table edge while typing.</li>
            </ul>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button className="btn-primary" onClick={onClose} style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}>
            Got it! Let's Start Practice
          </button>
        </div>
      </div>
    </div>
  );
}
