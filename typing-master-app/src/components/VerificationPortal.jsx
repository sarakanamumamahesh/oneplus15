import React, { useState } from 'react';
import { lookupCertificateByEmailOrId, getAllUserCertificates, getStoredCertificates } from '../utils/cloudCertificateStorage';
import { ShieldCheck, Search, Award, Calendar, CheckCircle2, User, Mail, AlertCircle, Download, Printer } from 'lucide-react';

export default function VerificationPortal() {
  const [query, setQuery] = useState('');
  const [searchedCert, setSearchedCert] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const cert = lookupCertificateByEmailOrId(query);
    setSearchedCert(cert);
    setHasSearched(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const allCerts = getStoredCertificates();

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-emerald), var(--accent-cyan))', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}>
          <ShieldCheck size={32} color="#fff" />
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Cloud Certificate Retrieval & Verification</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.35rem', fontSize: '0.95rem' }}>
          Enter your <strong>Unique Certificate ID</strong> or <strong>Email ID</strong> to retrieve, verify, and re-download your saved PDF certificate.
        </p>
      </div>

      {/* Search Bar Form */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            type="text"
            placeholder="Enter Unique Certificate ID (e.g. TM-2026-8A4F1E) or Email ID"
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
        <button className="btn-primary" type="submit" style={{ padding: '0 1.5rem', fontSize: '0.95rem', background: 'linear-gradient(135deg, var(--accent-cyan), #0284c7)' }}>
          Find Certificate
        </button>
      </form>

      {/* Search Result Card / Download Preview */}
      {hasSearched && (
        <div style={{ marginBottom: '2.5rem' }}>
          {searchedCert ? (
            <div>
              {/* Certificate Frame Preview */}
              <div 
                id="certificate-frame" 
                style={{
                  padding: '2.5rem',
                  background: 'radial-gradient(circle at center, #1b2233 0%, #0f1219 100%)',
                  border: '8px double var(--accent-emerald)',
                  borderRadius: '12px',
                  textAlign: 'center',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                  <CheckCircle2 size={18} />
                  <span>AUTHENTIC & CLOUD VERIFIED CERTIFICATE</span>
                </div>

                <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', marginBottom: '0.5rem' }}>
                  CERTIFICATE OF PROFICIENCY
                </h1>

                <div style={{ display: 'inline-block', background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-cyan)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '4px 16px', borderRadius: '99px', fontSize: '0.85rem', fontWeight: '800', fontFamily: 'var(--font-mono)', marginBottom: '1.25rem' }}>
                  CERTIFICATE ID: {searchedCert.certId}
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  This official certificate verifies that
                </p>

                <h2 style={{ fontSize: '1.85rem', fontWeight: '800', color: '#fff', margin: '0.35rem 0' }}>
                  {searchedCert.username}
                </h2>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Email ID: <strong style={{ color: 'var(--accent-cyan)' }}>{searchedCert.email}</strong>
                </div>

                {/* Metrics Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', maxWidth: '550px', margin: '0 auto 1.5rem' }}>
                  <div className="stat-item" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-matte)' }}>
                    <div className="stat-label">Speed</div>
                    <div className="stat-value highlight">{searchedCert.wpm} WPM</div>
                  </div>
                  <div className="stat-item" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-matte)' }}>
                    <div className="stat-label">Accuracy</div>
                    <div className="stat-value" style={{ color: 'var(--accent-emerald)' }}>{searchedCert.accuracy}%</div>
                  </div>
                  <div className="stat-item" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-matte)' }}>
                    <div className="stat-label">Rank Title</div>
                    <div className="stat-value" style={{ fontSize: '1rem', color: 'var(--accent-amber)' }}>{searchedCert.rank}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={15} /> Date Issued: <strong>{searchedCert.formattedDate}</strong>
                  </span>
                  <span style={{ color: 'var(--accent-emerald)', fontWeight: '700' }}>Cloud Verified Record</span>
                </div>
              </div>

              {/* Download Action Bar */}
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <button className="btn-primary" onClick={handlePrint} style={{ padding: '0.75rem 2rem', fontSize: '1rem', margin: '0 auto' }}>
                  <Printer size={18} />
                  <span>Download PDF Certificate</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="matte-card" style={{ borderLeft: '4px solid var(--accent-rose)', textAlign: 'center', padding: '2rem' }}>
              <AlertCircle size={36} color="var(--accent-rose)" style={{ margin: '0 auto 0.5rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>No Certificate Record Found</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', fontSize: '0.9rem' }}>
                No matching certificate found for "<strong>{query}</strong>". Please verify your Certificate ID or Email ID.
              </p>
            </div>
          )}
        </div>
      )}

      {/* All Cloud Stored Certificates List */}
      <div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Award size={20} className="text-cyan" />
          <span>Saved Cloud Certificates Registry ({allCerts.length})</span>
        </h3>

        {allCerts.length === 0 ? (
          <div className="matte-card" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
            No saved certificates in cloud storage yet. Click 📜 Certificate to generate your first PDF!
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
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div>
                  <div style={{ fontWeight: '800', fontSize: '1rem' }}>{cert.username} <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 'normal' }}>({cert.email})</span></div>
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
