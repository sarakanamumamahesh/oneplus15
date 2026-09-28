import React, { useState } from 'react';
import { Award, X, Printer, CheckCircle, Sparkles, Download, Mail, User, ShieldCheck } from 'lucide-react';
import { saveCertificateRecord } from '../utils/cloudCertificateStorage';

export default function CertificateModal({ isOpen, onClose, wpm = 68, accuracy = 98 }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('input'); // 'input' or 'ready'
  const [certRecord, setCertRecord] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGenerateAndDownload = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !email.trim()) {
      setError('Please enter your Username and Email ID to generate your unique certificate!');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address!');
      return;
    }

    // Generate unique cert record & store in cloud registry
    const record = saveCertificateRecord({
      username: username.trim(),
      email: email.trim(),
      wpm,
      accuracy
    });

    setCertRecord(record);
    setStep('ready');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setStep('input');
    setCertRecord(null);
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
            <span>Generate & Download Typing Certificate</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {step === 'ready' && (
              <>
                <button className="btn-primary" onClick={handlePrint} style={{ padding: '0.4rem 1rem' }}>
                  <Printer size={16} />
                  <span>Download PDF</span>
                </button>
                <button className="btn-primary" onClick={handleReset} style={{ padding: '0.4rem 0.8rem', background: 'var(--bg-card)' }}>
                  Edit Details
                </button>
              </>
            )}
            <button className="icon-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Step 1: Simple Prompt before Download */}
        {step === 'input' ? (
          <div style={{ padding: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <Download size={36} className="text-cyan" style={{ margin: '0 auto 0.5rem' }} />
              <h3 style={{ fontSize: '1.35rem', fontWeight: '800' }}>Download Your Certificate</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Enter your Username and Email ID below. We will stamp your unique data onto your PDF certificate & cloud registry!
              </p>
            </div>

            {error && (
              <div style={{ background: 'rgba(244, 63, 94, 0.15)', color: 'var(--accent-rose)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem' }}>
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleGenerateAndDownload} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Username / Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="e.g. Mahesh Sarakanam"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-matte)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)', outline: 'none' }}
                  />
                  <User size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Email ID (For Cloud Backup & Certificate Retrieval)
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    placeholder="e.g. mahesh@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-matte)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)', outline: 'none' }}
                  />
                  <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                </div>
              </div>

              <button className="btn-primary" type="submit" style={{ padding: '0.85rem', justifyContent: 'center', marginTop: '0.5rem', fontSize: '1rem', background: 'linear-gradient(135deg, var(--accent-cyan), #0284c7)' }}>
                ✨ Generate Certificate & Download PDF
              </button>
            </form>
          </div>
        ) : (
          /* Step 2: Printable PDF Certificate Preview */
          <div>
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
                Typing Master Cloud Registry
              </div>

              <h1 style={{ fontSize: '2.25rem', fontWeight: '800', fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em', color: '#fff', marginBottom: '0.5rem' }}>
                CERTIFICATE OF PROFICIENCY
              </h1>

              <div style={{ display: 'inline-block', background: 'rgba(56, 189, 248, 0.12)', color: 'var(--accent-cyan)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '4px 16px', borderRadius: '99px', fontSize: '0.85rem', fontWeight: '800', fontFamily: 'var(--font-mono)', marginBottom: '1.25rem' }}>
                UNIQUE CERTIFICATE ID: {certRecord.certId}
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                This official certificate verifies that
              </p>

              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', margin: '0.5rem 0' }}>
                {certRecord.username}
              </h2>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Registered Email: <strong style={{ color: 'var(--accent-cyan)' }}>{certRecord.email}</strong>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                has successfully passed the touch typing speed examination and demonstrated verifiable keyboard mastery.
              </p>

              {/* Stats Badges Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: '550px', margin: '0 auto 1.75rem' }}>
                <div className="stat-item" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-matte)' }}>
                  <div className="stat-label">Typing Speed</div>
                  <div className="stat-value highlight">{certRecord.wpm} WPM</div>
                </div>
                <div className="stat-item" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-matte)' }}>
                  <div className="stat-label">Accuracy</div>
                  <div className="stat-value" style={{ color: 'var(--accent-emerald)' }}>{certRecord.accuracy}%</div>
                </div>
                <div className="stat-item" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-matte)' }}>
                  <div className="stat-label">Mastery Rank</div>
                  <div className="stat-value" style={{ fontSize: '1.05rem', color: 'var(--accent-amber)' }}>
                    {certRecord.rank}
                  </div>
                </div>
              </div>

              {/* Date & Signature Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>Date Issued:</div>
                  <div>{certRecord.formattedDate}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <CheckCircle size={24} className="text-emerald" style={{ margin: '0 auto 0.2rem' }} />
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-emerald)' }}>CLOUD VERIFIED CERTIFICATE</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '700', color: 'var(--text-main)', fontFamily: 'cursive', fontSize: '1.1rem' }}>Typing Master Registry</div>
                  <div style={{ fontSize: '0.75rem' }}>Official Verification Seal</div>
                </div>
              </div>
            </div>

            {/* Print/Download Button Bar */}
            <div style={{ padding: '1rem', textAlignment: 'center', textAlign: 'center', background: 'var(--bg-secondary)' }}>
              <button className="btn-primary" onClick={handlePrint} style={{ padding: '0.75rem 2rem', fontSize: '1rem', margin: '0 auto' }}>
                <Printer size={18} />
                <span>Save / Download PDF Certificate</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
