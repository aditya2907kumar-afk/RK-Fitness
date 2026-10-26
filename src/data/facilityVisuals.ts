// High-aesthetic dark-crimson architectural & facility vector photographic SVGs
// for RK FITNESS facilities showcase

export function generateFacilityArt(name: string, subtitle: string, iconType: string): string {
  const cleanName = name.replace(/&/g, 'and');
  const cleanSub = subtitle.replace(/&/g, 'and');

  // Distinct visual icon/silhouette for each facility
  let visualGeometry = '';
  if (iconType === 'lockers_male' || iconType === 'lockers_female') {
    visualGeometry = `
      <!-- Luxury Locker Doors & Benches -->
      <g transform="translate(400, 260)">
        <rect x="-240" y="-120" width="100" height="240" rx="4" fill="#0f172a" stroke="#E11D48" stroke-width="2" />
        <rect x="-120" y="-120" width="100" height="240" rx="4" fill="#090d16" stroke="#334155" stroke-width="1.5" />
        <rect x="0" y="-120" width="100" height="240" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1.5" />
        <rect x="120" y="-120" width="100" height="240" rx="4" fill="#090d16" stroke="#E11D48" stroke-width="2" />
        <!-- Locker Slits -->
        <line x1="-210" y1="-90" x2="-170" y2="-90" stroke="#E11D48" stroke-width="2" />
        <line x1="-210" y1="-80" x2="-170" y2="-80" stroke="#E11D48" stroke-width="2" />
        <line x1="150" y1="-90" x2="190" y2="-90" stroke="#E11D48" stroke-width="2" />
        <!-- Hardwood Bench -->
        <rect x="-260" y="80" width="520" height="14" rx="3" fill="#cbd5e1" opacity="0.8" />
        <line x1="-200" y1="94" x2="-200" y2="130" stroke="#475569" stroke-width="4" />
        <line x1="200" y1="94" x2="200" y2="130" stroke="#475569" stroke-width="4" />
      </g>`;
  } else if (iconType === 'ac') {
    visualGeometry = `
      <!-- Climate Control HVAC & Airflow Stream -->
      <g transform="translate(400, 260)">
        <rect x="-200" y="-70" width="400" height="90" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
        <line x1="-160" y1="-10" x2="160" y2="-10" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" />
        <!-- Blue Cool Air Waves -->
        <path d="M-150 40 Q -100 80, -50 40 T 50 40 T 150 40" fill="none" stroke="#38bdf8" stroke-width="3" opacity="0.8" />
        <path d="M-170 70 Q -110 110, -50 70 T 70 70 T 170 70" fill="none" stroke="#0284c7" stroke-width="2" opacity="0.5" />
        <!-- Temperature indicator -->
        <rect x="110" y="-55" width="60" height="25" rx="4" fill="#0369a1" />
        <text x="140" y="-38" text-anchor="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="bold">19°C</text>
      </g>`;
  } else if (iconType === 'biometric') {
    visualGeometry = `
      <!-- Biometric Fingerprint Scanner & Gate -->
      <g transform="translate(400, 260)">
        <rect x="-70" y="-100" width="140" height="200" rx="16" fill="#0a0f1d" stroke="#E11D48" stroke-width="2.5" />
        <!-- Fingerprint ridges -->
        <path d="M-30 -20 A 30 30 0 0 1 30 -20" fill="none" stroke="#E11D48" stroke-width="3" stroke-linecap="round" />
        <path d="M-40 0 A 40 40 0 0 1 40 0" fill="none" stroke="#E11D48" stroke-width="3" stroke-linecap="round" />
        <path d="M-20 -40 A 20 20 0 0 1 20 -40" fill="none" stroke="#E11D48" stroke-width="3" stroke-linecap="round" />
        <path d="M-35 25 A 35 35 0 0 1 35 25" fill="none" stroke="#E11D48" stroke-width="3" stroke-linecap="round" />
        <!-- Glow scan bar -->
        <line x1="-55" y1="-5" x2="55" y2="-5" stroke="#38bdf8" stroke-width="3" opacity="0.9" />
        <circle cx="0" cy="70" r="8" fill="#10b981" />
      </g>`;
  } else if (iconType === 'boxing') {
    visualGeometry = `
      <!-- Heavy Hanging Punching Bag & Gloves -->
      <g transform="translate(400, 250)">
        <!-- Bag Mount & Chain -->
        <line x1="0" y1="-140" x2="0" y2="-70" stroke="#94a3b8" stroke-width="4" stroke-dasharray="6,4" />
        <!-- Heavy Bag -->
        <rect x="-45" y="-70" width="90" height="210" rx="35" fill="#111827" stroke="#E11D48" stroke-width="3" />
        <rect x="-45" y="-30" width="90" height="40" fill="#E11D48" opacity="0.85" />
        <text x="0" y="-5" text-anchor="middle" fill="#FFFFFF" font-family="'Cinzel', serif" font-size="12" font-weight="bold" letter-spacing="2">RK BOXING</text>
        <!-- Leather Gloves -->
        <ellipse cx="-85" cy="40" rx="28" ry="34" fill="#E11D48" stroke="#ffffff" stroke-width="1.5" />
        <ellipse cx="85" cy="40" rx="28" ry="34" fill="#E11D48" stroke="#ffffff" stroke-width="1.5" />
      </g>`;
  } else if (iconType === 'sunlight') {
    visualGeometry = `
      <!-- Large Architectural Glass Windows & Sun Rays -->
      <g transform="translate(400, 260)">
        <polygon points="-240,-120 240,-120 180,120 -180,120" fill="#0f172a" stroke="#FCD34D" stroke-width="2" opacity="0.7" />
        <line x1="0" y1="-120" x2="0" y2="120" stroke="#FCD34D" stroke-width="2" />
        <line x1="-120" y1="-120" x2="-90" y2="120" stroke="#FCD34D" stroke-width="1.5" opacity="0.5" />
        <line x1="120" y1="-120" x2="90" y2="120" stroke="#FCD34D" stroke-width="1.5" opacity="0.5" />
        <!-- Sun bloom -->
        <circle cx="160" cy="-70" r="35" fill="#FCD34D" opacity="0.4" />
        <line x1="160" y1="-70" x2="-80" y2="90" stroke="#FCD34D" stroke-width="4" opacity="0.3" />
      </g>`;
  } else if (iconType === 'parking') {
    visualGeometry = `
      <!-- Free Parking Spaces & Security -->
      <g transform="translate(400, 260)">
        <rect x="-180" y="-90" width="360" height="180" rx="12" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
        <!-- Parking P emblem -->
        <circle cx="0" cy="0" r="50" fill="#0284c7" />
        <text x="0" y="18" text-anchor="middle" fill="#FFFFFF" font-family="'Cinzel', serif" font-size="44" font-weight="black">P</text>
        <line x1="-120" y1="-70" x2="-120" y2="70" stroke="#FCD34D" stroke-width="3" stroke-dasharray="8,6" />
        <line x1="120" y1="-70" x2="120" y2="70" stroke="#FCD34D" stroke-width="3" stroke-dasharray="8,6" />
      </g>`;
  } else {
    // Default gym machines / turf / barbells
    visualGeometry = `
      <g transform="translate(400, 260)">
        <rect x="-240" y="-6" width="480" height="12" rx="3" fill="#cbd5e1" stroke="#475569" stroke-width="1.5" />
        <rect x="-220" y="-85" width="20" height="170" rx="5" fill="#E11D48" />
        <rect x="-195" y="-70" width="16" height="140" rx="4" fill="#0f172a" stroke="#E11D48" stroke-width="2" />
        <rect x="200" y="-85" width="20" height="170" rx="5" fill="#E11D48" />
        <rect x="179" y="-70" width="16" height="140" rx="4" fill="#0f172a" stroke="#E11D48" stroke-width="2" />
        <!-- Center hex -->
        <polygon points="0,-50 45,-25 45,25 0,50 -45,25 -45,-25" fill="#050B14" stroke="#E11D48" stroke-width="2" />
        <text x="0" y="8" text-anchor="middle" fill="#FFFFFF" font-family="'Cinzel', serif" font-size="14" font-weight="bold">RK</text>
      </g>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <defs>
      <radialGradient id="fgrad-center" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stop-color="#190e18" />
        <stop offset="60%" stop-color="#0a0f18" />
        <stop offset="100%" stop-color="#050B14" />
      </radialGradient>
      <filter id="fblur-filter" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="35" result="blur" />
      </filter>
      <pattern id="fpattern" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M0 20 L20 0 M0 0 L20 20" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
      </pattern>
    </defs>

    <rect width="800" height="600" fill="url(#fgrad-center)" />
    <rect width="800" height="600" fill="url(#fpattern)" />

    <!-- Ambient Crimson & Gold blooms -->
    <circle cx="250" cy="200" r="180" fill="#E11D48" opacity="0.22" filter="url(#fblur-filter)" />
    <circle cx="600" cy="380" r="160" fill="#9F1239" opacity="0.18" filter="url(#fblur-filter)" />

    <!-- Architectural Frame Lines -->
    <path d="M40 0 L40 600 M760 0 L760 600" stroke="#ffffff" stroke-opacity="0.04" stroke-width="2" />
    <line x1="40" y1="50" x2="200" y2="50" stroke="#E11D48" stroke-width="3" stroke-linecap="round" />

    ${visualGeometry}

    <!-- Bottom Scrim & Tag -->
    <rect y="440" width="800" height="160" fill="#050B14" opacity="0.88" />
    <text x="50" y="520" fill="#E11D48" font-family="'Cinzel', serif" font-size="12" font-weight="bold" letter-spacing="4">RK FITNESS · FACILITY</text>
    <text x="50" y="555" fill="#F8FAFC" font-family="'Playfair Display', Georgia, serif" font-size="24" font-weight="bold">${cleanName}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
