// Unique Certificate Storage & Verification Registry
const USERS_STORAGE_KEY = 'typing_master_users';
const CERTS_STORAGE_KEY = 'typing_master_certificates';
const CURRENT_USER_KEY = 'typing_master_current_user';

export function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveCurrentUser(user) {
  try {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (e) {}
}

export function registerUser({ username, email, fullName }) {
  const users = getUsers();
  const cleanEmail = email.trim().toLowerCase();
  const cleanUsername = username.trim().toLowerCase();

  const existingEmail = users.find((u) => u.email.toLowerCase() === cleanEmail);
  if (existingEmail && existingEmail.username.toLowerCase() !== cleanUsername) {
    return { success: false, error: 'Email is already registered under another username!' };
  }

  const existingUsername = users.find((u) => u.username.toLowerCase() === cleanUsername);
  if (existingUsername && existingUsername.email.toLowerCase() !== cleanEmail) {
    return { success: false, error: 'Username is already taken. Please choose a unique username!' };
  }

  const userObj = {
    username: username.trim(),
    email: cleanEmail,
    fullName: fullName.trim() || username.trim(),
    createdAt: new Date().toISOString()
  };

  if (!existingUsername && !existingEmail) {
    users.push(userObj);
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {}
  }

  saveCurrentUser(userObj);
  return { success: true, user: userObj };
}

export function getCertificates() {
  try {
    const raw = localStorage.getItem(CERTS_STORAGE_KEY);
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

export function issueCertificate({ user, wpm, accuracy }) {
  const certs = getCertificates();
  const certId = generateUniqueCertId();
  
  const getRank = (wpmScore) => {
    if (wpmScore >= 100) return 'Grandmaster Typist';
    if (wpmScore >= 75) return 'Pro Speed Typist';
    if (wpmScore >= 50) return 'Advanced Typist';
    if (wpmScore >= 30) return 'Intermediate Typist';
    return 'Novice Typist';
  };

  const certRecord = {
    certId,
    username: user.username,
    email: user.email,
    fullName: user.fullName,
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

  certs.unshift(certRecord);
  try {
    localStorage.setItem(CERTS_STORAGE_KEY, JSON.stringify(certs));
  } catch (e) {}

  return certRecord;
}

export function verifyCertificate(certIdOrUser) {
  if (!certIdOrUser) return null;
  const search = certIdOrUser.trim().toLowerCase();
  const certs = getCertificates();

  return certs.find(
    (c) =>
      c.certId.toLowerCase() === search ||
      c.username.toLowerCase() === search ||
      c.email.toLowerCase() === search
  );
}
