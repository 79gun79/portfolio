// 기본 썸네일 생성 (포스트 타이틀 기반)
export function generateThumbnail(title: string): string {
  const hash = Array.from(title).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const hue = (hash * 37) % 360;
  const hueB = (hue + 60) % 360;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="hsl(${hue} 75% 92%)" />
      <stop offset="100%" stop-color="hsl(${hueB} 70% 88%)" />
    </linearGradient>
    <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.5" fill="rgba(0,0,0,0.05)"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <circle cx="900" cy="150" r="180" fill="rgba(255,255,255,0.4)" opacity="0.6"/>
  <circle cx="200" cy="480" r="120" fill="rgba(255,255,255,0.3)" opacity="0.5"/>
</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
