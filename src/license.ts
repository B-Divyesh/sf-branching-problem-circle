export type LicenseState = 'free' | 'checking' | 'unlocked' | 'invalid' | 'offline';

const SLUG = 'branching-problem-circle';
const TOKEN_KEY = `sb_license:${SLUG}`;
const CACHE_KEY = `sb_license_verdict:${SLUG}`;
export const CHECKOUT_URL = `https://api.sociobot.in/api/v1/products/${SLUG}/checkout`;

interface CachedVerdict { valid: boolean; checkedAt: number }

export function captureLicense(): string | null {
  const url = new URL(location.href);
  const incoming = url.searchParams.get('license');
  if (incoming) {
    localStorage.setItem(TOKEN_KEY, incoming);
    localStorage.removeItem(CACHE_KEY);
    url.searchParams.delete('license');
    history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }
  return incoming ?? localStorage.getItem(TOKEN_KEY);
}

export function restoreLicense(token: string): void {
  localStorage.setItem(TOKEN_KEY, token.trim());
  localStorage.removeItem(CACHE_KEY);
}

export function forgetLicense(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(CACHE_KEY);
}

export function cachedLicenseState(): LicenseState {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return 'free';
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) ?? '') as CachedVerdict;
    return cached.valid ? 'unlocked' : 'invalid';
  } catch { return 'checking'; }
}

export async function verifyLicense(force = false): Promise<LicenseState> {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return 'free';
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) ?? '') as CachedVerdict;
    if (!force && Date.now() - cached.checkedAt < 86_400_000) return cached.valid ? 'unlocked' : 'invalid';
  } catch { /* verify below */ }
  if (!navigator.onLine) return cachedLicenseState() === 'unlocked' ? 'unlocked' : 'offline';
  try {
    const response = await fetch(`https://api.sociobot.in/api/v1/products/${SLUG}/verify?license=${encodeURIComponent(token)}`);
    if (!response.ok) throw new Error('verification unavailable');
    const result = await response.json() as { valid: boolean };
    localStorage.setItem(CACHE_KEY, JSON.stringify({ valid: result.valid, checkedAt: Date.now() }));
    return result.valid ? 'unlocked' : 'invalid';
  } catch { return cachedLicenseState() === 'unlocked' ? 'unlocked' : 'offline'; }
}
