import React, { useEffect, useState } from 'react';
import { QWERTY_FINGER_MAP } from '../data/lessonsData';

const KEYBOARD_ROWS = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
  ['Space']
];

export default function VirtualKeyboard({ targetChar }) {
  const [pressedKeys, setPressedKeys] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      setPressedKeys((prev) => ({ ...prev, [key]: true }));
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      setPressedKeys((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const normalizedTarget = targetChar ? targetChar.toLowerCase() : null;

  const getKeyFinger = (key) => {
    return QWERTY_FINGER_MAP[key] || null;
  };

  const isKeyTarget = (key) => {
    if (!normalizedTarget) return false;
    if (normalizedTarget === ' ' && key === 'Space') return true;
    return normalizedTarget === key;
  };

  const isKeyPressed = (key) => {
    if (key === 'Space') return pressedKeys[' '];
    if (key === 'Backspace') return pressedKeys['backspace'];
    if (key === 'Enter') return pressedKeys['enter'];
    if (key === 'Shift') return pressedKeys['shift'];
    return pressedKeys[key];
  };

  return (
    <div className="keyboard-container">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key, keyIndex) => {
            const finger = getKeyFinger(key);
            const target = isKeyTarget(key);
            const pressed = isKeyPressed(key);

            let extraClass = '';
            if (key === 'Backspace' || key === 'Enter') extraClass = 'key-wide-2';
            else if (key === 'Tab' || key === 'Caps') extraClass = 'key-wide-1_5';
            else if (key === 'Shift') extraClass = 'key-wide-2_5';
            else if (key === 'Space') extraClass = 'key-space';

            return (
              <div
                key={keyIndex}
                className={`key ${extraClass} ${target ? 'target' : ''} ${pressed ? 'pressed' : ''}`}
                data-finger={finger}
                title={finger ? `Finger: ${finger}` : ''}
              >
                {key === 'Space' ? 'Spacebar' : key.toUpperCase()}
              </div>
            );
          })}
        </div>
      ))}

      {/* Finger Legend */}
      <div className="finger-legend">
        <div className="finger-pill">
          <div className="finger-dot" style={{ background: 'var(--finger-pinky)' }}></div>
          <span>Pinky (A, Z, P, ;)</span>
        </div>
        <div className="finger-pill">
          <div className="finger-dot" style={{ background: 'var(--finger-ring)' }}></div>
          <span>Ring (S, W, X, O, L)</span>
        </div>
        <div className="finger-pill">
          <div className="finger-dot" style={{ background: 'var(--finger-middle)' }}></div>
          <span>Middle (D, E, C, I, K)</span>
        </div>
        <div className="finger-pill">
          <div className="finger-dot" style={{ background: 'var(--finger-index)' }}></div>
          <span>Index (F, G, R, T, V, B / J, H, U, Y, N, M)</span>
        </div>
        <div className="finger-pill">
          <div className="finger-dot" style={{ background: 'var(--finger-thumb)' }}></div>
          <span>Thumb (Space)</span>
        </div>
      </div>
    </div>
  );
}
