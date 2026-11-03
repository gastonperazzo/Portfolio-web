import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#181712" />
      <stop offset="50%" stop-color="#13120e" />
      <stop offset="100%" stop-color="#0b0a08" />
    </linearGradient>

    <!-- Warm Amber Radial Glow -->
    <radialGradient id="amberGlow" cx="15%" cy="20%" r="55%">
      <stop offset="0%" stop-color="#e7a200" stop-opacity="0.14" />
      <stop offset="60%" stop-color="#e7a200" stop-opacity="0.02" />
      <stop offset="100%" stop-color="#e7a200" stop-opacity="0" />
    </radialGradient>

    <!-- Emerald Secondary Glow -->
    <radialGradient id="emeraldGlow" cx="85%" cy="80%" r="50%">
      <stop offset="0%" stop-color="#00d68f" stop-opacity="0.09" />
      <stop offset="70%" stop-color="#00d68f" stop-opacity="0" />
    </radialGradient>

    <!-- Card Inner Border Gradient -->
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3d382d" />
      <stop offset="50%" stop-color="#24211a" />
      <stop offset="100%" stop-color="#1a1813" />
    </linearGradient>

    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <style>
    .title {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-weight: 800;
      fill: #ffffff;
      letter-spacing: -0.03em;
    }
    .role {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-weight: 600;
      fill: #e7a200;
      letter-spacing: -0.01em;
    }
    .description {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-weight: 400;
      fill: #a8a29e;
      letter-spacing: -0.01em;
      line-height: 1.5;
    }
    .badge {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      fill: #e7a200;
    }
    .pill-text {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-weight: 500;
      font-size: 15px;
      fill: #d6d3d1;
    }
    .footer-text {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-weight: 500;
      font-size: 15px;
      fill: #78716c;
    }
    .highlight {
      fill: #ffffff;
      font-weight: 600;
    }
  </style>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGradient)" />
  <rect width="${width}" height="${height}" fill="url(#amberGlow)" />
  <rect width="${width}" height="${height}" fill="url(#emeraldGlow)" />

  <!-- Subtle Blueprint Grid lines -->
  <g opacity="0.04" stroke="#ffffff" stroke-width="1">
    <line x1="80" y1="0" x2="80" y2="630" />
    <line x1="1120" y1="0" x2="1120" y2="630" />
    <line x1="0" y1="80" x2="1200" y2="80" />
    <line x1="0" y1="550" x2="1200" y2="550" />
  </g>

  <!-- Main Card Container -->
  <rect x="50" y="50" width="1100" height="530" rx="24" fill="#151410" fill-opacity="0.65" stroke="url(#borderGrad)" stroke-width="1.5" filter="url(#shadow)" />

  <!-- Accent Top Border Highlight -->
  <path d="M 90 50 L 320 50" stroke="#e7a200" stroke-width="2.5" stroke-linecap="round" />

  <!-- Top Kicker with Status Indicator -->
  <g transform="translate(90, 105)">
    <!-- Active Status Pulse -->
    <circle cx="6" cy="6" r="5" fill="#e7a200" />
    <circle cx="6" cy="6" r="8" fill="#e7a200" opacity="0.3" />
    <text x="24" y="10" class="badge">UX &amp; PRODUCT RESEARCH SPECIALIST</text>
  </g>

  <!-- Headline: Gastón Perazzo -->
  <text x="90" y="195" font-size="68" class="title">Gastón Perazzo</text>

  <!-- Subheadline / Value Proposition -->
  <text x="90" y="248" font-size="28" class="role">Product Strategy · Product Analytics · Experimentation</text>

  <!-- Core Bio summary -->
  <text x="90" y="305" font-size="20" class="description">
    Turning user needs, behavioral patterns, and quantitative data into clearer product decisions.
  </text>
  <text x="90" y="335" font-size="19" class="description">
    10+ years across Fintech, Government, Healthcare, and Enterprise B2B SaaS.
  </text>

  <!-- Capability Pills -->
  <g transform="translate(90, 385)">
    <!-- Pill 1: Product Analytics -->
    <rect x="0" y="0" width="195" height="42" rx="21" fill="#201e18" stroke="#353127" stroke-width="1" />
    <text x="97" y="26" text-anchor="middle" class="pill-text">Product Analytics</text>

    <!-- Pill 2: Behavioral Experiments -->
    <rect x="207" y="0" width="225" height="42" rx="21" fill="#201e18" stroke="#353127" stroke-width="1" />
    <text x="319" y="26" text-anchor="middle" class="pill-text">Behavioral Experiments</text>

    <!-- Pill 3: Generative Research -->
    <rect x="444" y="0" width="200" height="42" rx="21" fill="#201e18" stroke="#353127" stroke-width="1" />
    <text x="544" y="26" text-anchor="middle" class="pill-text">Generative Research</text>

    <!-- Pill 4: Social Anthropology -->
    <rect x="656" y="0" width="195" height="42" rx="21" fill="#201e18" stroke="#353127" stroke-width="1" />
    <text x="753" y="26" text-anchor="middle" class="pill-text">Social Anthropology</text>
  </g>

  <!-- Divider Line -->
  <line x1="90" y1="465" x2="1110" y2="465" stroke="#25221b" stroke-width="1" />

  <!-- Footer Info Bar -->
  <g transform="translate(90, 508)">
    <!-- Left: Recognition & Experience -->
    <text x="0" y="0" class="footer-text">
      <tspan class="highlight">10+ Years</tspan> Experience · <tspan class="highlight">2019 Webby Award Winner</tspan> · Chat Crecer
    </text>

    <!-- Right: Location & Global Availability -->
    <text x="1020" y="0" text-anchor="end" class="footer-text">
      Buenos Aires, Argentina · <tspan class="highlight">Working Globally</tspan>
    </text>
  </g>
</svg>
`;

async function run() {
  const outputPath = path.resolve(process.cwd(), 'public/og-image.png');
  const svgPath = path.resolve(process.cwd(), 'public/og-image.svg');
  
  // Save the SVG
  fs.writeFileSync(svgPath, svg.trim());
  console.log('Saved SVG to', svgPath);

  // Convert SVG to high-quality PNG with sharp
  await sharp(Buffer.from(svg))
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(outputPath);

  console.log('Rendered 1200x630 PNG card to', outputPath);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
