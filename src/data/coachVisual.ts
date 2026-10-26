// Default luxury aesthetic coach silhouette portrait for Coach Kushal Sharma
export function generateCoachPortraitArt(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
    <defs>
      <radialGradient id="coach-bg" cx="50%" cy="35%" r="70%">
        <stop offset="0%" stop-color="#2a0f18" />
        <stop offset="55%" stop-color="#12060b" />
        <stop offset="100%" stop-color="#050104" />
      </radialGradient>
      <radialGradient id="coach-halo" cx="50%" cy="30%" r="50%">
        <stop offset="0%" stop-color="#E11D48" stop-opacity="0.45" />
        <stop offset="60%" stop-color="#9F1239" stop-opacity="0.15" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#334155" />
        <stop offset="50%" stop-color="#1e293b" />
        <stop offset="100%" stop-color="#0f172a" />
      </linearGradient>
      <linearGradient id="rim-light" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FDA4AF" stop-opacity="0.8" />
        <stop offset="15%" stop-color="#E11D48" stop-opacity="0.5" />
        <stop offset="85%" stop-color="#E11D48" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#FDA4AF" stop-opacity="0.7" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="15" result="blur" />
      </filter>
    </defs>

    <!-- Background -->
    <rect width="400" height="400" fill="url(#coach-bg)" />
    <circle cx="200" cy="160" r="140" fill="url(#coach-halo)" />

    <!-- Subtle Athletic Geometry / Chalk Lines -->
    <circle cx="200" cy="200" r="185" fill="none" stroke="#E11D48" stroke-opacity="0.15" stroke-width="1.5" stroke-dasharray="6,6" />
    <circle cx="200" cy="200" r="170" fill="none" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="1" />

    <!-- Athletic Coach Silhouette: Broad athletic shoulders & head -->
    <g transform="translate(200, 220)">
      <!-- Shoulders & Upper Torso -->
      <path d="M-135 150 C-130 90, -85 55, -45 42 L-30 40 L-25 15 L25 15 L30 40 L45 42 C85 55, 130 90, 135 150 Z" fill="url(#body-grad)" stroke="url(#rim-light)" stroke-width="2" />
      <!-- Trapezius and Neck -->
      <path d="M-40 40 C-35 0, -28 -15, -20 -30 L20 -30 C28 -15, 35 0, 40 40 Z" fill="#1e293b" stroke="#E11D48" stroke-width="1.5" stroke-opacity="0.4" />
      <!-- Athletic Head Silhouette -->
      <ellipse cx="0" cy="-65" rx="36" ry="46" fill="url(#body-grad)" stroke="url(#rim-light)" stroke-width="2" />
      <!-- Collarbone definition -->
      <path d="M-55 70 Q0 85 55 70" fill="none" stroke="#E11D48" stroke-width="1.5" stroke-opacity="0.35" />
    </g>

    <!-- Barbell Crest across bottom of portrait -->
    <g transform="translate(200, 360)">
      <rect x="-110" y="-3" width="220" height="6" rx="2" fill="#475569" stroke="#E11D48" stroke-width="1" />
      <circle cx="-110" cy="0" r="14" fill="#0f172a" stroke="#E11D48" stroke-width="2" />
      <circle cx="110" cy="0" r="14" fill="#0f172a" stroke="#E11D48" stroke-width="2" />
    </g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
