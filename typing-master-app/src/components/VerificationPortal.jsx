import React, { useState } from 'react';
import { verifyCertificate, getCertificates } from '../utils/certificateRegistry';
import { ShieldCheck, Search, Award, Calendar, CheckCircle2, User, Mail, AlertCircle } from 'lucide-react';

export default function VerificationPortal() {
  const [query, setQuery] = useState('');
  const [searchedCert, setSearchedCert] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const cert = verifyCertificate(query);
    setSearchedCert(cert);
    setHasSearched(true);
  };

  const allCerts = getCertificates();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlignment: 'center', marginBottom: '1.75rem', textAlign: 'center' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-emerald), var(--accent-cyan))', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}>
          <ShieldCheck size={32} color="#fff" />
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Official Certificate Verification Portal</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.35rem', fontSize: '0.95rem' }}>
          Verify the authenticity and date of any Typing Master Certificate using a unique Certificate ID or Username.
        </p>
      </div>

      {/* Search Bar Form */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            type="text"
            placeholder="Enter Certificate ID (e.g. TM-2026-8A4F1E) or Username / Email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.85rem 1rem 0.85rem 2.75rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-matte)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-main)',
              fontSize: '0.95rem',
              outline: 'none',
              fontFamily: 'var(--font-sans)'
            }}
          />
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
        <button className="btn-primary" type="submit" style={{ padding: '0 1.5rem', fontSize: '0.95rem' }}>
          Verify Now
        </button>
      </form>

      {/* Search Result Card */}
      {hasSearched && (
        <div style={{ marginBottom: '2.5rem' }}>
          {searchedCert ? (
            <div className="matte-card" style={{ border: '2px solid var(--accent-emerald)', background: 'linear-gradient(135deg, #0d261e 0%, var(--bg-card) 100%)', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
                    <CheckCircle2 size={18} />
                    <span>AUTHENTIC & VERIFIED CERTIFICATE</span>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '0.25rem' }}>{searchedCert.fullName}</h3>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><User size={14} /> @{searchedCert.username}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Mail size={14} /> {searchedCert.email}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Unique ID</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: '800', fontSize: '1.1rem', color: 'var(--accent-cyan)' }}>
                    {searchedCert.certId}
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div className="stat-item">
                  <div className="stat-label">Speed</div>
                  <div className="stat-value highlight">{searchedCert.wpm} WPM</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Accuracy</div>
                  <div className="stat-value" style={{ color: 'var(--accent-emerald)' }}>{searchedCert.accuracy}%</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Rank Title</div>
                  <div className="stat-value" style={{ fontSize: '1rem', color: 'var(--accent-amber)' }}>{searchedCert.rank}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Calendar size={15} /> Issued Date: <strong>{searchedCert.formattedDate}</strong>
                </span>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: '700' }}>Official Registry Seal Record Verified</span>
              </div>
            </div>
          ) : (
            <div className="matte-card" style={{ borderLeft: '4px solid var(--accent-rose)', textAlign: 'center', padding: '2rem' }}>
              <AlertCircle size={36} color="var(--accent-rose)" style={{ margin: '0 auto 0.5rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Certificate Not Found</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', fontSize: '0.9rem' }}>
                No matching certificate record found for "<strong>{query}</strong>". Please verify the ID or username.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Issued Certificates Registry List */}
      <div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Award size={20} className="text-cyan" />
          <span>Recently Issued Certificates Registry ({allCerts.length})</span>
        </h3>

        {allCerts.length === 0 ? (
          <div className="matte-card" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
            No certificates issued yet. Complete a Speed Test or AI Tutor session to earn your unique certificate!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {allCerts.map((cert) => (
              <div
                key={cert.certId}
                className="matte-card"
                onClick={() => { setQuery(cert.certId); setSearchedCert(cert); setHasSearched(true); }}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  padding: '1rem 1.25rem',
                  border: '1px solid var(--border-subtle)',
                  transition: 'all 0.2s'
                }}
              >
                <div>
                  <div style={{ fontWeight: '800', fontSize: '1rem' }}>{cert.fullName} <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 'normal' }}>(@{cert.username})</span></div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                    {cert.rank} • {cert.formattedDate}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: '800', color: 'var(--accent-cyan)', fontSize: '0.9rem' }}>
                    {cert.certId}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: '700' }}>
                    {cert.wpm} WPM ({cert.accuracy}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
