import React, { useState, useEffect } from 'react';
import { Award, X, Printer, CheckCircle, Sparkles, User, Mail, ShieldCheck } from 'lucide-react';
import { getCurrentUser, registerUser, issueCertificate } from '../utils/certificateRegistry';

export default function CertificateModal({ isOpen, onClose, wpm = 68, accuracy = 98 }) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [issuedRecord, setIssuedRecord] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const activeUser = getCurrentUser();
      if (activeUser) {
        setFullName(activeUser.fullName || activeUser.username);
        setUsername(activeUser.username);
        setEmail(activeUser.email);
        autoIssue(activeUser);
      }
    }
  }, [isOpen]);

  const autoIssue = (user) => {
    const cert = issueCertificate({ user, wpm, accuracy });
    setIssuedRecord(cert);
  };

  const handleIssueSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !username.trim() || !email.trim()) {
      setError('Please fill in your Name, Username, and Email!');
      return;
    }

    const res = registerUser({ username, email, fullName });
    if (!res.success) {
      setError(res.error);
      return;
    }

    const cert = issueCertificate({ user: res.user, wpm, accuracy });
    setIssuedRecord(cert);
  };

  if (!isOpen) return null;

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
            {issuedRecord && (
              <button className="btn-primary" onClick={handlePrint} style={{ padding: '0.4rem 1rem' }}>
                <Printer size={16} />
                <span>Print / Save PDF</span>
              </button>
            )}
            <button className="icon-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* User Registration Form if not yet registered/issued */}
        {!issuedRecord ? (
          <div style={{ padding: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <ShieldCheck size={36} className="text-cyan" style={{ margin: '0 auto 0.5rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Register Profile for Certificate Issue</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                Each user email and username must be unique to generate a verifiable Certificate ID.
              </p>
            </div>

            {error && (
              <div style={{ background: 'rgba(244, 63, 94, 0.15)', color: 'var(--accent-rose)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem' }}>
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleIssueSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                  Full Name (Appears on Certificate)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mahesh Sarakanam"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-matte)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                    Unique Username
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. mahesh_typist"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-matte)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                    Unique Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. mahesh@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-matte)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <button className="btn-primary" type="submit" style={{ width: '100%', padding: '0.85rem', justifyContent: 'center', marginTop: '0.5rem', fontSize: '1rem' }}>
                🎓 Generate Unique Certificate
              </button>
            </form>
          </div>
        ) : (
          /* Printable Verified Certificate Frame */
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
              Typing Master Academy Registry
            </div>

            <h1 style={{ fontSize: '2.25rem', fontWeight: '800', fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em', color: '#fff', marginBottom: '0.5rem' }}>
              CERTIFICATE OF PROFICIENCY
            </h1>

            <div style={{ display: 'inline-block', background: 'rgba(56, 189, 248, 0.12)', color: 'var(--accent-cyan)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '4px 16px', borderRadius: '99px', fontSize: '0.85rem', fontWeight: '800', fontFamily: 'var(--font-mono)', marginBottom: '1.25rem' }}>
              ID: {issuedRecord.certId}
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              This official certificate verifies that
            </p>

            <h2 style={{ fontSize: '1.85rem', fontWeight: '800', color: '#fff', margin: '0.5rem 0' }}>
              {issuedRecord.fullName}
            </h2>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Username: <strong style={{ color: 'var(--accent-cyan)' }}>@{issuedRecord.username}</strong> ({issuedRecord.email})
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
              has successfully passed the touch typing speed examination and demonstrated verifiable keyboard mastery.
            </p>

            {/* Stats Badges Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: '550px', margin: '0 auto 1.75rem' }}>
              <div className="stat-item" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-matte)' }}>
                <div className="stat-label">Typing Speed</div>
                <div className="stat-value highlight">{issuedRecord.wpm} WPM</div>
              </div>
              <div className="stat-item" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-matte)' }}>
                <div className="stat-label">Accuracy</div>
                <div className="stat-value" style={{ color: 'var(--accent-emerald)' }}>{issuedRecord.accuracy}%</div>
              </div>
              <div className="stat-item" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-matte)' }}>
                <div className="stat-label">Mastery Rank</div>
                <div className="stat-value" style={{ fontSize: '1.05rem', color: 'var(--accent-amber)' }}>
                  {issuedRecord.rank}
                </div>
              </div>
            </div>

            {/* Date & Signature Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>Date Issued:</div>
                <div>{issuedRecord.formattedDate}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <CheckCircle size={24} className="text-emerald" style={{ margin: '0 auto 0.2rem' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-emerald)' }}>VERIFIED CERTIFICATE ID</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: '700', color: 'var(--text-main)', fontFamily: 'cursive', fontSize: '1.1rem' }}>Typing Master Registry</div>
                <div style={{ fontSize: '0.75rem' }}>Official Verification Seal</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
