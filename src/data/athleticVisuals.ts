// Generates ultra-luxury dark-crimson photographic aesthetic SVG data-URIs
// featuring powerlifting, gym equipment, athletes, iron plates, and barbell textures

export function generateAthleticArt(title: string, category: string, accentColor = '#E11D48'): string {
  const cleanTitle = title.replace(/&/g, 'and');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <defs>
      <radialGradient id="grad-center" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stop-color="#1e101a" />
        <stop offset="50%" stop-color="#0a0e17" />
        <stop offset="100%" stop-color="#050B14" />
      </radialGradient>
      <linearGradient id="crimson-glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#881337" stop-opacity="0.3" />
      </linearGradient>
      <linearGradient id="iron-metal" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#334155" />
        <stop offset="50%" stop-color="#1e293b" />
        <stop offset="100%" stop-color="#0f172a" />
      </linearGradient>
      <filter id="blur-filter" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="30" result="blur" />
      </filter>
      <pattern id="knurling" width="16" height="16" patternUnits="userSpaceOnUse">
        <path d="M0 16 L16 0 M0 0 L16 16" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>
      </pattern>
    </defs>

    <!-- Base Canvas -->
    <rect width="800" height="600" fill="url(#grad-center)" />
    <rect width="800" height="600" fill="url(#knurling)" />

    <!-- Ambient Crimson Light Blooms -->
    <circle cx="200" cy="180" r="160" fill="${accentColor}" opacity="0.18" filter="url(#blur-filter)" />
    <circle cx="650" cy="420" r="180" fill="#BE123C" opacity="0.12" filter="url(#blur-filter)" />

    <!-- Architectural Gym Framing Lines -->
    <path d="M50 0 L50 600 M750 0 L750 600" stroke="#ffffff" stroke-opacity="0.05" stroke-width="2" />
    <path d="M0 120 L800 120 M0 480 L800 480" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1" />
    <line x1="50" y1="50" x2="250" y2="50" stroke="${accentColor}" stroke-width="3" stroke-linecap="round" />

    <!-- Central Gym / Barbell Graphic -->
    <g transform="translate(400, 260)">
      <!-- Olympic Barbell Shaft -->
      <rect x="-320" y="-7" width="640" height="14" rx="4" fill="url(#iron-metal)" stroke="#475569" stroke-width="1.5" />
      <!-- Knurling bands on barbell -->
      <rect x="-240" y="-8" width="110" height="16" fill="${accentColor}" opacity="0.25" />
      <rect x="130" y="-8" width="110" height="16" fill="${accentColor}" opacity="0.25" />
      <!-- Barbell Collars -->
      <rect x="-260" y="-24" width="16" height="48" rx="3" fill="#cbd5e1" opacity="0.9" />
      <rect x="244" y="-24" width="16" height="48" rx="3" fill="#cbd5e1" opacity="0.9" />
      <!-- 25kg Cast Iron Heavy Plates (Left) -->
      <rect x="-310" y="-120" width="18" height="240" rx="6" fill="#090d16" stroke="${accentColor}" stroke-width="2" />
      <rect x="-288" y="-105" width="16" height="210" rx="6" fill="#111827" stroke="#334155" stroke-width="1.5" />
      <!-- 25kg Cast Iron Heavy Plates (Right) -->
      <rect x="292" y="-120" width="18" height="240" rx="6" fill="#090d16" stroke="${accentColor}" stroke-width="2" />
      <rect x="272" y="-105" width="16" height="210" rx="6" fill="#111827" stroke="#334155" stroke-width="1.5" />
      
      <!-- Power Hexagon & Crest -->
      <polygon points="0,-75 65,-37 65,37 0,75 -65,37 -65,-37" fill="#050B14" stroke="${accentColor}" stroke-width="2" opacity="0.9" />
      <path d="M-25 -20 L0 -45 L25 -20 L0 5 Z" fill="${accentColor}" opacity="0.8" />
      <text x="0" y="26" text-anchor="middle" fill="#FFFFFF" font-family="'Cinzel', serif" font-size="14" font-weight="bold" letter-spacing="3">RK</text>
    </g>

    <!-- Subtle Chalk Dust Sprinkles -->
    <circle cx="360" cy="220" r="2.5" fill="#FFFFFF" opacity="0.5" />
    <circle cx="440" cy="210" r="1.5" fill="#FFFFFF" opacity="0.4" />
    <circle cx="410" cy="290" r="2" fill="#FFFFFF" opacity="0.6" />
    <circle cx="280" cy="250" r="3" fill="#FFFFFF" opacity="0.3" />
    <circle cx="510" cy="270" r="2" fill="#FFFFFF" opacity="0.4" />

    <!-- Bottom Vignette Scrim -->
    <rect y="380" width="800" height="220" fill="url(#crimson-glow)" opacity="0.35" />
    <rect y="440" width="800" height="160" fill="#050B14" opacity="0.85" />

    <!-- Stylized Category & Emblem -->
    <text x="50" y="520" fill="${accentColor}" font-family="'Cinzel', serif" font-size="12" font-weight="bold" letter-spacing="4">RK FITNESS · STRENGTH CLUB</text>
    <text x="50" y="555" fill="#F8FAFC" font-family="'Playfair Display', Georgia, serif" font-size="24" font-weight="bold">${cleanTitle}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
