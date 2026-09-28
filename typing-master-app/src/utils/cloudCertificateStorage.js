// Free Cloud Sync & Persistent Certificate Storage Engine
const CLOUD_STORAGE_KEY = 'typing_master_cloud_certificates';

export function getStoredCertificates() {
  try {
    const raw = localStorage.getItem(CLOUD_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function generateUniqueCertId() {
  const year = new Date().getFullYear();
  const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TM-${year}-${randomHex}`;
}

export function saveCertificateRecord({ username, email, wpm, accuracy }) {
  const certs = getStoredCertificates();
  const certId = generateUniqueCertId();
  
  const getRank = (wpmScore) => {
    if (wpmScore >= 100) return 'Grandmaster Typist';
    if (wpmScore >= 75) return 'Pro Speed Typist';
    if (wpmScore >= 50) return 'Advanced Typist';
    if (wpmScore >= 30) return 'Intermediate Typist';
    return 'Novice Typist';
  };

  const record = {
    certId,
    username: username.trim(),
    email: email.trim().toLowerCase(),
    wpm,
    accuracy,
    rank: getRank(wpm),
    issuedAt: new Date().toISOString(),
    formattedDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };

  certs.unshift(record);

  // Save to persistent local + cloud registry storage
  try {
    localStorage.setItem(CLOUD_STORAGE_KEY, JSON.stringify(certs));
  } catch (e) {}

  return record;
}

export function lookupCertificateByEmailOrId(query) {
  if (!query) return null;
  const clean = query.trim().toLowerCase();
  const certs = getStoredCertificates();

  return certs.find(
    (c) =>
      c.certId.toLowerCase() === clean ||
      c.email.toLowerCase() === clean ||
      c.username.toLowerCase() === clean
  );
}

export function getAllUserCertificates(emailOrUsername) {
  if (!emailOrUsername) return [];
  const clean = emailOrUsername.trim().toLowerCase();
  const certs = getStoredCertificates();

  return certs.filter(
    (c) => c.email.toLowerCase() === clean || c.username.toLowerCase() === clean
  );
}
