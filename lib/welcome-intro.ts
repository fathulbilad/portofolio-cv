export const welcomeStorageKey = "cv-welcome-seen";

// Runs in the head before paint. No script means the CV remains visible.
// If hydration fails or is slow, the independent deadline also opens the CV.
export const welcomeBootstrap = `(() => {
  const root = document.documentElement;
  if (location.pathname !== '/' || location.hash || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let seen = false;
  try { seen = localStorage.getItem('${welcomeStorageKey}') === '1'; }
  catch {}
  if (!seen) { try { seen = sessionStorage.getItem('${welcomeStorageKey}') === '1'; } catch {} }
  if (seen) return;
  try { localStorage.setItem('${welcomeStorageKey}', '1'); }
  catch { try { sessionStorage.setItem('${welcomeStorageKey}', '1'); } catch {} }
  root.dataset.cvWelcome = 'pending';
  root.dataset.cvWelcomeStarted = String(Date.now());
  window.setTimeout(() => {
    if (root.dataset.cvWelcome === 'pending' || root.dataset.cvWelcome === 'revealing') {
      root.dataset.cvWelcome = 'done';
      const site = document.getElementById('cv-site');
      site?.removeAttribute('inert');
      site?.removeAttribute('aria-hidden');
      window.dispatchEvent(new Event('cv:welcome-deadline'));
    }
  }, 2400);
})();`;
