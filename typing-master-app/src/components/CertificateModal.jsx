import React, { useState } from 'react';
import { Award, X, Printer, CheckCircle, Sparkles } from 'lucide-react';

export default function CertificateModal({ isOpen, onClose, wpm = 65, accuracy = 98 }) {
  const [userName, setUserName] = useState('Touch Typist');

  if (!isOpen) return null;

  const getRank = (wpmScore) => {
    if (wpmScore >= 100) return { title: 'Grandmaster Typist', badge: '👑', color: 'var(--accent-amber)' };
    if (wpmScore >= 75) return { title: 'Pro Speed Typist', badge: '💎', color: 'var(--accent-cyan)' };
    if (wpmScore >= 50) return { title: 'Advanced Typist', badge: '🥇', color: 'var(--accent-emerald)' };
    if (wpmScore >= 30) return { title: 'Intermediate Typist', badge: '🥈', color: 'var(--accent-violet)' };
    return { title: 'Novice Typist', badge: '🥉', color: 'var(--accent-rose)' };
  };

  const rank = getRank(wpm);
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '780px', padding: 0, overflow: 'hidden', background: 'var(--bg-primary)' }}
      >
        {/* Modal Action Header */}
        <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ fontWeight: '700', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award className="text-cyan" size={22} />
            <span>Official Typing Proficiency Certificate</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button className="btn-primary" onClick={handlePrint} style={{ padding: '0.4rem 1rem' }}>
              <Printer size={16} />
              <span>Print / Save PDF</span>
            </button>
            <button className="icon-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Certificate Frame */}
        <div 
          id="certificate-frame" 
          style={{
            padding: '2.5rem',
            background: 'radial-gradient(circle at center, #1b2233 0%, #0f1219 100%)',
            border: '8px double var(--border-matte)',
            margin: '1rem',
            borderRadius: '12px',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          {/* Header Seal */}
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)' }}>
            <Sparkles size={32} color="#fff" style={{ margin: 'auto' }} />
          </div>

          <div style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.2em', color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            Typing Master Academy
          </div>

          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em', color: '#fff', marginBottom: '1rem' }}>
            CERTIFICATE OF PROFICIENCY
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            This certificate verifies that
          </p>

          {/* User Name Input / Display */}
          <div style={{ margin: '1rem 0' }}>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter Your Name"
              style={{
                fontSize: '1.75rem',
                fontWeight: '800',
                color: 'var(--accent-cyan)',
                background: 'transparent',
                border: 'none',
                borderBottom: '2px dashed var(--border-matte)',
                textAlign: 'center',
                outline: 'none',
                width: '80%',
                fontFamily: 'var(--font-sans)'
              }}
            />
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            has successfully passed the touch typing speed & accuracy examination and demonstrated exceptional keyboard mastery.
          </p>

          {/* Stats Badges Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: '550px', margin: '0 auto 1.75rem' }}>
            <div className="stat-item" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-matte)' }}>
              <div className="stat-label">Typing Speed</div>
              <div className="stat-value highlight">{wpm} WPM</div>
            </div>
            <div className="stat-item" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-matte)' }}>
              <div className="stat-label">Accuracy</div>
              <div className="stat-value" style={{ color: 'var(--accent-emerald)' }}>{accuracy}%</div>
            </div>
            <div className="stat-item" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-matte)' }}>
              <div className="stat-label">Mastery Rank</div>
              <div className="stat-value" style={{ fontSize: '1.1rem', color: rank.color, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}>
                <span>{rank.badge}</span>
                <span>{rank.title}</span>
              </div>
            </div>
          </div>

          {/* Date & Signature Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>Date Issued:</div>
              <div>{currentDate}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <CheckCircle size={28} className="text-emerald" style={{ margin: '0 auto 0.2rem' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-emerald)' }}>VERIFIED PWA CERTIFICATE</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: '700', color: 'var(--text-main)', fontFamily: 'cursive', fontSize: '1.2rem' }}>Typing Master Pro</div>
              <div>Official Signature</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
