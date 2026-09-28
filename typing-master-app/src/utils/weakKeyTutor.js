// AI-Powered Weak Key Tutor Utility
const STORAGE_KEY = 'typing_master_key_stats';

export function getKeyStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function recordKeyAttempt(key, isCorrect) {
  if (!key || key.length !== 1) return;
  const k = key.toLowerCase();
  const stats = getKeyStats();

  if (!stats[k]) {
    stats[k] = { attempts: 0, errors: 0 };
  }

  stats[k].attempts += 1;
  if (!isCorrect) {
    stats[k].errors += 1;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {}
}

export function getWeakestKeys(limit = 4) {
  const stats = getKeyStats();
  const keysArray = Object.keys(stats).map((k) => {
    const { attempts, errors } = stats[k];
    const errorRate = attempts > 0 ? errors / attempts : 0;
    return { key: k, attempts, errors, errorRate };
  });

<<<<<<< HEAD
  // Filter keys with at least 2 attempts and sort by error rate descending
=======
>>>>>>> main
  const weakKeys = keysArray
    .filter((item) => item.attempts >= 2 && item.errors > 0)
    .sort((a, b) => b.errorRate - a.errorRate)
    .slice(0, limit)
    .map((item) => item.key);

<<<<<<< HEAD
  // Default fallbacks if user is new
=======
>>>>>>> main
  if (weakKeys.length === 0) {
    return ['p', 'q', 'z', 'x'];
  }
  return weakKeys;
}

export function generateAdaptiveDrillText(weakKeys) {
  const keys = weakKeys && weakKeys.length > 0 ? weakKeys : ['p', 'q', 'z', 'x'];
  const fillers = ['a', 's', 'd', 'f', 'j', 'k', 'l'];

  let patterns = [];
<<<<<<< HEAD
  for (let i = 0; i < 12; i++) {
=======
  for (let i = 0; i < 10; i++) {
>>>>>>> main
    const k1 = keys[i % keys.length];
    const k2 = keys[(i + 1) % keys.length];
    const f1 = fillers[i % fillers.length];
    const f2 = fillers[(i + 2) % fillers.length];

    patterns.push(`${f1}${k1}${f2} ${k1}${k2}${f1} ${f2}${k2}${k1} ${k1}${f1}${k2}${f2}`);
  }

  return patterns.join(' ');
}
