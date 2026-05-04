import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ carSlug: string; imageType: string }> }
) {
  const { carSlug, imageType } = await params;

  // Curate custom colors based on car brand or type for premium aesthetic
  const isLuxury = carSlug.includes('bmw') || carSlug.includes('mercedes') || carSlug.includes('audi') || carSlug.includes('porsche') || carSlug.includes('lexus');
  const bgColor = isLuxury ? '#1e1b4b' : '#0f172a';
  const accentColor = isLuxury ? '#6366f1' : '#38bdf8';

  // Format a readable car name from the slug
  const title = carSlug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const typeLabel = imageType.toUpperCase();

  // Create a beautiful, premium modern SVG placeholder
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bgColor}" />
          <stop offset="100%" stop-color="#020617" />
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${accentColor}" />
          <stop offset="100%" stop-color="#ec4899" />
        </linearGradient>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#bg)" />
      
      <!-- Premium Grid background lines -->
      <line x1="0" y1="100" x2="800" y2="100" stroke="#334155" stroke-opacity="0.3" stroke-width="1" />
      <line x1="0" y1="200" x2="800" y2="200" stroke="#334155" stroke-opacity="0.3" stroke-width="1" />
      <line x1="0" y1="300" x2="800" y2="300" stroke="#334155" stroke-opacity="0.3" stroke-width="1" />
      <line x1="0" y1="400" x2="800" y2="400" stroke="#334155" stroke-opacity="0.3" stroke-width="1" />
      
      <line x1="160" y1="0" x2="160" y2="500" stroke="#334155" stroke-opacity="0.3" stroke-width="1" />
      <line x1="320" y1="0" x2="320" y2="500" stroke="#334155" stroke-opacity="0.3" stroke-width="1" />
      <line x1="480" y1="0" x2="480" y2="500" stroke="#334155" stroke-opacity="0.3" stroke-width="1" />
      <line x1="640" y1="0" x2="640" y2="500" stroke="#334155" stroke-opacity="0.3" stroke-width="1" />
      
      <!-- Central display content -->
      <g transform="translate(400, 250)">
        <!-- Elegant glowing background card -->
        <rect x="-300" y="-120" width="600" height="240" rx="20" fill="#090d1f" fill-opacity="0.6" stroke="url(#accent)" stroke-width="1.5" />
        
        <!-- Car logo / Icon symbol -->
        <circle cx="0" cy="-60" r="28" fill="${accentColor}" fill-opacity="0.15" stroke="${accentColor}" stroke-width="2" />
        <path d="M-10,-55 L0,-65 L10,-55 M-10,-60 L0,-70 L10,-60" fill="none" stroke="${accentColor}" stroke-width="2.5" stroke-linecap="round" />
        
        <!-- Animated / Sleek car details -->
        <text y="5" font-family="'Inter', system-ui, sans-serif" font-size="28" font-weight="700" fill="#f8fafc" text-anchor="middle" letter-spacing="0.5">
          ${title}
        </text>
        <text y="40" font-family="'Inter', system-ui, sans-serif" font-size="14" font-weight="500" fill="#94a3b8" text-anchor="middle" letter-spacing="3">
          ${typeLabel} • PREMIUM RENTALS
        </text>
        
        <!-- Subtle details -->
        <rect x="-100" y="65" width="200" height="4" rx="2" fill="url(#accent)" />
      </g>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
