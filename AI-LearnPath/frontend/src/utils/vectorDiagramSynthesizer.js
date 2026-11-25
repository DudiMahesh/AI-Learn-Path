/**
 * High-Resolution 3D Vector Diagram Synthesizer for NEET (UG) AI Tutor & Curriculum
 * 
 * Generates and guarantees authentic, realistic, medical-textbook-grade 3D Vector SVG schematics
 * with anatomical accuracy, physical vector mechanics, chemical geometries, and clear annotations.
 */

// ── Infographic generators (imported for local use + re-exported) ─────────
import {
  generateMenstrualCycleInfographic,
  generateErrorPropagationInfographic,
  generateKinematicsInfographic,
  generateCellOrganelleInfographic,
  generateDNAInfographic,
  generatePeriodicTrendsInfographic,
  generatePhotosynthesisInfographic,
  generateThermochemistryInfographic
} from './infographics.js';

export {
  generateMenstrualCycleInfographic,
  generateErrorPropagationInfographic,
  generateKinematicsInfographic,
  generateCellOrganelleInfographic,
  generateDNAInfographic,
  generatePeriodicTrendsInfographic,
  generatePhotosynthesisInfographic,
  generateThermochemistryInfographic
};

// ── Handcrafted Medical Anatomy Diagrams ──────────────────────────────────
import {
  generateHumanLiverDiagram,
  generateHumanHeartDiagram,
  generateNephronDiagram
} from './anatomyDiagrams.js';

export {
  generateHumanLiverDiagram,
  generateHumanHeartDiagram,
  generateNephronDiagram
};

// 1. Biology - Eukaryotic Cell & Organelle Architecture
export function generateCell3DDiagram(caption = 'Eukaryotic Cell Organelle Architecture (3D Vector Schematic)') {
  return `<svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <radialGradient id="cytoplasmGrad" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#064e3b" stop-opacity="0.85"/>
      <stop offset="65%" stop-color="#022c22" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#011611" stop-opacity="1.0"/>
    </radialGradient>
    <radialGradient id="nucleusGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#e9d5ff"/>
      <stop offset="30%" stop-color="#a855f7"/>
      <stop offset="70%" stop-color="#7e22ce"/>
      <stop offset="100%" stop-color="#3b0764"/>
    </radialGradient>
    <radialGradient id="nucleolusGrad" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#fbcfe8"/>
      <stop offset="40%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#831843"/>
    </radialGradient>
    <linearGradient id="mitoOuterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fed7aa"/>
      <stop offset="40%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="#9a3412"/>
    </linearGradient>
    <linearGradient id="cristaeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#ea580c"/>
    </linearGradient>
    <radialGradient id="lysoGrad" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#67e8f9"/>
      <stop offset="45%" stop-color="#06b6d4"/>
      <stop offset="85%" stop-color="#0e7490"/>
      <stop offset="100%" stop-color="#164e63"/>
    </radialGradient>
    <linearGradient id="erGrad" x1="0%" y1="0%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <linearGradient id="golgiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fb7185"/>
      <stop offset="100%" stop-color="#be123c"/>
    </linearGradient>
    <filter id="cellGlow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#10b981" flood-opacity="0.25"/>
    </filter>
    <filter id="organelleShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="3" dy="6" stdDeviation="5" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <rect width="680" height="400" rx="16" fill="#030712"/>

  <!-- Plasma Membrane & Cytosol Outer Boundary -->
  <path d="M 60,200 C 60,90 140,50 340,50 C 540,50 620,100 620,200 C 620,310 520,360 340,360 C 150,360 60,310 60,200 Z"
        fill="url(#cytoplasmGrad)" stroke="#10b981" stroke-width="4" filter="url(#cellGlow)"/>
  <path d="M 66,200 C 66,96 144,56 340,56 C 536,56 614,106 614,200 C 614,304 516,354 340,354 C 154,354 66,304 66,200 Z"
        fill="none" stroke="#34d399" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.6"/>

  <!-- Nucleus -->
  <g transform="translate(200, 190)" filter="url(#organelleShadow)">
    <circle cx="0" cy="0" r="75" fill="none" stroke="#c084fc" stroke-width="4" stroke-dasharray="14 3"/>
    <circle cx="0" cy="0" r="70" fill="url(#nucleusGrad)"/>
    <path d="M -40,-25 Q -10,-55 20,-30 T 45,5 Q 30,45 -10,35 T -45,-5" fill="none" stroke="#d8b4fe" stroke-width="1.5" opacity="0.45" stroke-dasharray="3 3"/>
    <circle cx="15" cy="-10" r="24" fill="url(#nucleolusGrad)" stroke="#f472b6" stroke-width="1.5"/>
    <text x="15" y="-7" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle" font-family="sans-serif">Nucleolus</text>
    <text x="15" y="4" fill="#fbcfe8" font-size="7.5" text-anchor="middle" font-family="sans-serif">(rRNA Synth)</text>
  </g>

  <!-- Endoplasmic Reticulum -->
  <g transform="translate(130, 160)" opacity="0.9">
    <path d="M 0,-40 C -30,-45 -45,-15 -25,0 C -5,15 -35,35 -15,55 C 5,75 -20,95 5,110" fill="none" stroke="url(#erGrad)" stroke-width="7" stroke-linecap="round"/>
    <path d="M 12,-35 C -15,-40 -30,-15 -10,0 C 8,15 -20,35 0,55" fill="none" stroke="url(#erGrad)" stroke-width="5" stroke-linecap="round"/>
    <circle cx="-25" cy="-20" r="2.2" fill="#38bdf8"/>
    <circle cx="-18" cy="-5" r="2.2" fill="#38bdf8"/>
    <circle cx="-28" cy="15" r="2.2" fill="#38bdf8"/>
  </g>

  <!-- Mitochondria -->
  <g transform="translate(430, 140) rotate(-18)" filter="url(#organelleShadow)">
    <rect x="-65" y="-35" width="130" height="70" rx="35" fill="url(#mitoOuterGrad)" stroke="#ea580c" stroke-width="2.5"/>
    <rect x="-58" y="-28" width="116" height="56" rx="28" fill="#7c2d12" stroke="#fdba74" stroke-width="1.5"/>
    <path d="M -42,-26 C -40,-5 -30,-5 -28,-26 M -20,-26 C -18,2 -8,2 -6,-26 M 6,-26 C 8,-2 18,-2 20,-26 M 32,-26 C 34,-8 42,-8 44,-26"
          fill="none" stroke="url(#cristaeGrad)" stroke-width="3.5" stroke-linecap="round"/>
    <text x="0" y="3" fill="#ffedd5" font-size="8.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">Mitochondrial Matrix</text>
  </g>

  <!-- Lysosome -->
  <g transform="translate(350, 290)" filter="url(#organelleShadow)">
    <circle cx="0" cy="0" r="26" fill="url(#lysoGrad)" stroke="#22d3ee" stroke-width="2"/>
    <circle cx="-7" cy="-6" r="3" fill="#a5f3fc"/>
    <circle cx="6" cy="-4" r="3" fill="#a5f3fc"/>
    <text x="0" y="1" fill="#ecfeff" font-size="8" font-weight="bold" text-anchor="middle" font-family="sans-serif">Acid Hydrolases</text>
    <text x="0" y="14" fill="#a5f3fc" font-size="7" text-anchor="middle" font-family="sans-serif">pH ~ 5.0</text>
  </g>

  <!-- Callouts -->
  <rect x="18" y="14" width="260" height="24" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
  <text x="26" y="30" fill="#38bdf8" font-size="10.5" font-weight="bold" font-family="sans-serif">🔬 3D Cell Architecture · NCERT Unit 3</text>
</svg>`;
}

// 2. Biology - Human Reproduction & Anatomical Fertilization Pathway (Directly Addresses User Request)
export function generateHumanReproductionDiagram() {
  return `<svg viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="uterusWallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#be185d"/>
      <stop offset="50%" stop-color="#9d174d"/>
      <stop offset="100%" stop-color="#4c0519"/>
    </linearGradient>
    <radialGradient id="ovaryGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fde047"/>
      <stop offset="40%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </radialGradient>
    <linearGradient id="tubeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ec4899"/>
      <stop offset="50%" stop-color="#f43f5e"/>
      <stop offset="100%" stop-color="#fb7185"/>
    </linearGradient>
    <radialGradient id="zygoteGrad" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#67e8f9"/>
      <stop offset="60%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#082f49"/>
    </radialGradient>
    <filter id="medGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#ec4899" flood-opacity="0.3"/>
    </filter>
    <filter id="starGlow">
      <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#38bdf8" flood-opacity="0.9"/>
    </filter>
  </defs>

  <!-- Deep Canvas -->
  <rect width="700" height="420" rx="16" fill="#040711"/>

  <!-- Outer Frame -->
  <rect x="15" y="15" width="670" height="390" rx="12" fill="none" stroke="#1e293b" stroke-width="1.5"/>

  <!-- Title Badge -->
  <rect x="30" y="25" width="410" height="30" rx="8" fill="#1e1026" stroke="#db2777" stroke-width="1.5"/>
  <text x="42" y="45" fill="#f472b6" font-size="12" font-weight="bold" font-family="sans-serif">
    🫀 Female Reproductive Anatomy &amp; Fertilization Site (NEET UG)
  </text>

  <!-- ================= FEMALE REPRODUCTIVE ANATOMY ================= -->
  <!-- Fundus & Body of Uterus -->
  <path d="M 270,160 C 270,110 320,90 350,90 C 380,90 430,110 430,160 C 430,220 385,250 375,280 L 325,280 C 315,250 270,220 270,160 Z"
        fill="url(#uterusWallGrad)" stroke="#f43f5e" stroke-width="3" filter="url(#medGlow)"/>

  <!-- Endometrial Cavity (Inner Layer) -->
  <path d="M 310,160 C 310,130 335,115 350,115 C 365,115 390,130 390,160 C 390,200 365,225 360,250 L 340,250 C 335,225 310,200 310,160 Z"
        fill="#831843" stroke="#fda4af" stroke-width="1.5"/>

  <!-- Cervix & Cervical Canal -->
  <rect x="330" y="280" width="40" height="45" rx="5" fill="#9d174d" stroke="#f43f5e" stroke-width="1.5"/>
  <line x1="350" y1="280" x2="350" y2="325" stroke="#fbcfe8" stroke-width="2"/>

  <!-- Vagina -->
  <path d="M 320,325 L 320,380 L 380,380 L 380,325 Z" fill="#4c0519" stroke="#db2777" stroke-width="2"/>

  <!-- Left Fallopian Tube (Oviduct) -->
  <path d="M 285,130 C 240,110 190,100 150,120 C 120,135 105,170 120,205"
        fill="none" stroke="url(#tubeGrad)" stroke-width="12" stroke-linecap="round"/>
  <!-- Fimbriae (Finger-like projections) -->
  <path d="M 120,205 C 115,220 100,225 95,215 M 120,205 C 122,225 110,235 105,228 M 120,205 C 130,225 125,238 120,230"
        fill="none" stroke="#fb7185" stroke-width="3.5" stroke-linecap="round"/>

  <!-- Left Ovary -->
  <ellipse cx="145" cy="235" rx="30" ry="20" fill="url(#ovaryGrad)" stroke="#f59e0b" stroke-width="2.5" filter="url(#medGlow)"/>
  <circle cx="135" cy="230" r="5" fill="#fef08a"/>
  <circle cx="152" cy="238" r="7" fill="#f59e0b"/>
  <!-- Ovarian Ligament -->
  <line x1="175" y1="235" x2="280" y2="180" stroke="#f472b6" stroke-width="2.5" stroke-dasharray="3 3"/>

  <!-- Right Fallopian Tube -->
  <path d="M 415,130 C 460,110 510,100 550,120 C 580,135 595,170 580,205"
        fill="none" stroke="url(#tubeGrad)" stroke-width="12" stroke-linecap="round"/>
  <!-- Right Fimbriae -->
  <path d="M 580,205 C 585,220 600,225 605,215 M 580,205 C 578,225 590,235 595,228 M 580,205 C 570,225 575,238 580,230"
        fill="none" stroke="#fb7185" stroke-width="3.5" stroke-linecap="round"/>

  <!-- Right Ovary -->
  <ellipse cx="555" cy="235" rx="30" ry="20" fill="url(#ovaryGrad)" stroke="#f59e0b" stroke-width="2.5" filter="url(#medGlow)"/>
  <circle cx="565" cy="230" r="5" fill="#fef08a"/>
  <!-- Right Ovarian Ligament -->
  <line x1="525" y1="235" x2="420" y2="180" stroke="#f472b6" stroke-width="2.5" stroke-dasharray="3 3"/>

  <!-- ================= CRITICAL NEET MILESTONE: AMPULLA SITE ================= -->
  <!-- Glowing Marker at Ampulla of Left Tube -->
  <circle cx="160" cy="115" r="14" fill="#0284c7" stroke="#38bdf8" stroke-width="2.5" filter="url(#starGlow)" opacity="0.9"/>
  <circle cx="160" cy="115" r="6" fill="#ffffff"/>
  <!-- Sperm entering ovum visual -->
  <path d="M 175,130 Q 168,122 163,117" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>

  <!-- Callout Card: AMPULLA -->
  <line x1="160" y1="100" x2="160" y2="60" stroke="#38bdf8" stroke-width="1.8"/>
  <g transform="translate(60, 48)">
    <rect width="200" height="42" rx="8" fill="#0c4a6e" stroke="#38bdf8" stroke-width="1.8"/>
    <text x="100" y="18" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">AMPULLA (Site of Fertilization)</text>
    <text x="100" y="32" fill="#7dd3fc" font-size="9" text-anchor="middle" font-family="sans-serif">⭐ NCERT: Ampullary Region</text>
  </g>

  <!-- Isthmus Callout -->
  <line x1="230" y1="118" x2="230" y2="85" stroke="#f472b6" stroke-width="1.2"/>
  <rect x="200" y="72" width="60" height="20" rx="4" fill="#1e1026" stroke="#f472b6" stroke-width="1"/>
  <text x="230" y="86" fill="#fbcfe8" font-size="9.5" text-anchor="middle" font-family="sans-serif">Isthmus</text>

  <!-- Infundibulum Callout -->
  <line x1="125" y1="175" x2="65" y2="175" stroke="#f472b6" stroke-width="1.2"/>
  <rect x="10" y="165" width="85" height="22" rx="4" fill="#1e1026" stroke="#f472b6" stroke-width="1"/>
  <text x="52" y="180" fill="#fbcfe8" font-size="9.5" text-anchor="middle" font-family="sans-serif">Infundibulum</text>

  <!-- Ovary Callout -->
  <line x1="145" y1="258" x2="145" y2="300" stroke="#f59e0b" stroke-width="1.2"/>
  <rect x="95" y="300" width="100" height="24" rx="5" fill="#382104" stroke="#f59e0b" stroke-width="1"/>
  <text x="145" y="316" fill="#fef08a" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">Ovary (Follicles)</text>

  <!-- Uterus Endometrium Callout -->
  <line x1="390" y1="160" x2="480" y2="160" stroke="#fb7185" stroke-width="1.2"/>
  <g transform="translate(480, 142)">
    <rect width="180" height="38" rx="6" fill="#38081a" stroke="#fb7185" stroke-width="1.2"/>
    <text x="90" y="16" fill="#fecdd3" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">Endometrium (Inner Lining)</text>
    <text x="90" y="30" fill="#fda4af" font-size="8.5" text-anchor="middle" font-family="sans-serif">Site of Blastocyst Implantation</text>
  </g>

  <!-- Myometrium Callout -->
  <line x1="410" y1="200" x2="480" y2="200" stroke="#fb7185" stroke-width="1.2"/>
  <rect x="480" y="188" width="160" height="24" rx="5" fill="#38081a" stroke="#fb7185" stroke-width="1"/>
  <text x="560" y="204" fill="#fda4af" font-size="9.5" text-anchor="middle" font-family="sans-serif">Myometrium (Smooth Muscle)</text>

  <!-- Cervix Callout -->
  <line x1="372" y1="300" x2="440" y2="300" stroke="#c084fc" stroke-width="1.2"/>
  <rect x="440" y="288" width="120" height="22" rx="4" fill="#1e1026" stroke="#c084fc" stroke-width="1"/>
  <text x="500" y="303" fill="#e9d5ff" font-size="9.5" text-anchor="middle" font-family="sans-serif">Cervix &amp; Cervical Canal</text>

  <!-- Bottom Timeline Summary -->
  <rect x="30" y="355" width="260" height="36" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
  <text x="160" y="370" fill="#38bdf8" font-size="9.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">Zygote (Day 1) → Morula (Day 3)</text>
  <text x="160" y="383" fill="#94a3b8" font-size="8.5" text-anchor="middle" font-family="sans-serif">Blastocyst Implants in Endometrium (Day 7)</text>
</svg>`;
}

// 3. Biology - DNA Double Helix & Molecular Inheritance
export function generateDNADoubleHelixDiagram() {
  return `<svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="strand1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="strand2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#be123c"/>
    </linearGradient>
    <filter id="dnaGlow">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#38bdf8" flood-opacity="0.3"/>
    </filter>
  </defs>

  <rect width="680" height="340" rx="16" fill="#030712"/>
  <rect x="15" y="15" width="650" height="310" rx="12" fill="none" stroke="#1e293b" stroke-width="1.5"/>

  <!-- Title Badge -->
  <rect x="30" y="24" width="370" height="26" rx="6" fill="#0c4a6e" stroke="#38bdf8" stroke-width="1.2"/>
  <text x="40" y="41" fill="#e0f2fe" font-size="11" font-weight="bold" font-family="sans-serif">
    🧬 DNA B-Form Double Helix · Watson &amp; Crick Model (NEET Core)
  </text>

  <!-- 3D Double Helix Strands -->
  <g transform="translate(60, 70)" filter="url(#dnaGlow)">
    <!-- Base Pairs (rungs) -->
    <!-- Rung 1 (A=T) -->
    <line x1="80" y1="40" x2="80" y2="140" stroke="#f59e0b" stroke-width="4.5"/>
    <text x="80" y="95" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle" font-family="sans-serif">A = T</text>

    <!-- Rung 2 (G≡C) -->
    <line x1="160" y1="70" x2="160" y2="110" stroke="#10b981" stroke-width="4.5"/>
    <text x="160" y="95" fill="#ffffff" font-size="8.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">G ≡ C</text>

    <!-- Rung 3 (T=A) -->
    <line x1="240" y1="120" x2="240" y2="60" stroke="#f59e0b" stroke-width="4.5"/>
    <text x="240" y="95" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle" font-family="sans-serif">T = A</text>

    <!-- Rung 4 (C≡G) -->
    <line x1="320" y1="50" x2="320" y2="130" stroke="#10b981" stroke-width="4.5"/>
    <text x="320" y="95" fill="#ffffff" font-size="8.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">C ≡ G</text>

    <!-- Rung 5 (A=T) -->
    <line x1="400" y1="70" x2="400" y2="110" stroke="#f59e0b" stroke-width="4.5"/>
    <text x="400" y="95" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle" font-family="sans-serif">A = T</text>

    <!-- Rung 6 (G≡C) -->
    <line x1="480" y1="40" x2="480" y2="140" stroke="#10b981" stroke-width="4.5"/>
    <text x="480" y="95" fill="#ffffff" font-size="8.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">G ≡ C</text>

    <!-- Strand 1 (Blue 5' to 3') -->
    <path d="M 40,40 Q 120,40 160,90 T 280,140 Q 360,140 400,90 T 520,40"
          fill="none" stroke="url(#strand1)" stroke-width="8" stroke-linecap="round"/>

    <!-- Strand 2 (Pink 3' to 5') -->
    <path d="M 40,140 Q 120,140 160,90 T 280,40 Q 360,40 400,90 T 520,140"
          fill="none" stroke="url(#strand2)" stroke-width="8" stroke-linecap="round"/>

    <!-- 5' and 3' Labels -->
    <text x="25" y="44" fill="#38bdf8" font-size="11" font-weight="bold" font-family="sans-serif">5'</text>
    <text x="25" y="144" fill="#ec4899" font-size="11" font-weight="bold" font-family="sans-serif">3'</text>
    <text x="535" y="44" fill="#ec4899" font-size="11" font-weight="bold" font-family="sans-serif">3'</text>
    <text x="535" y="144" fill="#38bdf8" font-size="11" font-weight="bold" font-family="sans-serif">5'</text>
  </g>

  <!-- Key Quantitative Metrics for NEET -->
  <g transform="translate(40, 250)">
    <!-- Metric 1: Pitch -->
    <rect width="180" height="55" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="1.2"/>
    <text x="90" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Helical Pitch = 3.4 nm</text>
    <text x="90" y="40" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">34 Å per full 360° turn</text>

    <!-- Metric 2: Base pair distance -->
    <rect x="200" width="190" height="55" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="1.2"/>
    <text x="295" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Base Pair Dist = 0.34 nm</text>
    <text x="295" y="40" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">10 base pairs per helical turn</text>

    <!-- Metric 3: Hydrogen bonds -->
    <rect x="410" width="190" height="55" rx="8" fill="#0f172a" stroke="#f59e0b" stroke-width="1.2"/>
    <text x="505" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Complementary H-Bonds</text>
    <text x="505" y="40" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">A = T (2 bonds) · G ≡ C (3 bonds)</text>
  </g>
</svg>`;
}

// 4. Physics - 2D Projectile Motion & Kinematics Vector Decomposition
export function generateProjectileMotionDiagram() {
  return `<svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="trajGrad" x1="0%" y1="100%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="50%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
    <filter id="trajGlow">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#38bdf8" flood-opacity="0.3"/>
    </filter>
  </defs>

  <rect width="680" height="340" rx="16" fill="#040814"/>
  <rect x="15" y="15" width="650" height="310" rx="12" fill="none" stroke="#1e293b" stroke-width="1.5"/>

  <!-- Title Badge -->
  <rect x="30" y="25" width="350" height="26" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1.2"/>
  <text x="40" y="42" fill="#34d399" font-size="11" font-weight="bold" font-family="sans-serif">
    🎯 2D Projectile Motion · Vector Kinematics (NEET Physics)
  </text>

  <!-- Axes -->
  <line x1="60" y1="260" x2="620" y2="260" stroke="#475569" stroke-width="2"/>
  <line x1="60" y1="260" x2="60" y2="50" stroke="#475569" stroke-width="2"/>
  <polygon points="620,256 628,260 620,264" fill="#475569"/>
  <polygon points="56,50 60,42 64,50" fill="#475569"/>
  <text x="630" y="264" fill="#94a3b8" font-size="11" font-family="sans-serif">X (Range)</text>
  <text x="60" y="38" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="sans-serif">Y (Height)</text>

  <!-- Parabolic Trajectory -->
  <path d="M 60,260 Q 300,30 540,260" fill="none" stroke="url(#trajGrad)" stroke-width="3.5" filter="url(#trajGlow)"/>

  <!-- Launch Velocity Vectors at Origin -->
  <line x1="60" y1="260" x2="160" y2="145" stroke="#38bdf8" stroke-width="3"/>
  <polygon points="160,145 152,156 166,155" fill="#38bdf8"/>
  <text x="175" y="145" fill="#38bdf8" font-size="12" font-weight="bold" font-family="sans-serif">u (Initial)</text>

  <!-- Horizontal Component ux -->
  <line x1="60" y1="260" x2="140" y2="260" stroke="#10b981" stroke-width="2.5"/>
  <polygon points="140,257 146,260 140,263" fill="#10b981"/>
  <text x="100" y="278" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">uₓ = u cos θ</text>

  <!-- Vertical Component uy -->
  <line x1="60" y1="260" x2="60" y2="180" stroke="#f43f5e" stroke-width="2.5"/>
  <polygon points="57,180 60,174 63,180" fill="#f43f5e"/>
  <text x="42" y="220" fill="#fb7185" font-size="10" font-weight="bold" text-anchor="end" font-family="sans-serif">uᵧ = u sin θ</text>

  <!-- Launch Angle Arc -->
  <path d="M 90,260 A 30,30 0 0,0 84,233" fill="none" stroke="#facc15" stroke-width="1.8"/>
  <text x="96" y="246" fill="#fde047" font-size="11" font-weight="bold" font-family="sans-serif">θ</text>

  <!-- Apex (Maximum Height Point) -->
  <circle cx="300" cy="87.5" r="5" fill="#e11d48"/>
  <line x1="300" y1="87.5" x2="300" y2="260" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="4 4"/>
  <!-- Velocity at peak (Only horizontal ux) -->
  <line x1="300" y1="87.5" x2="360" y2="87.5" stroke="#10b981" stroke-width="2.5"/>
  <polygon points="360,84.5 366,87.5 360,90.5" fill="#10b981"/>
  <text x="375" y="91" fill="#34d399" font-size="10" font-weight="bold" font-family="sans-serif">vᵧ = 0 (v = uₓ)</text>

  <!-- Formula Card 1: Hmax -->
  <g transform="translate(210, 110)">
    <rect width="180" height="38" rx="6" fill="#1e1026" stroke="#e11d48" stroke-width="1.2"/>
    <text x="90" y="17" fill="#fda4af" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">Max Height (Hₘₐₓ)</text>
    <text x="90" y="30" fill="#ffffff" font-size="10.5" font-family="sans-serif">Hₘₐₓ = (u² sin²θ) / (2g)</text>
  </g>

  <!-- Formula Card 2: Range -->
  <line x1="60" y1="290" x2="540" y2="290" stroke="#a855f7" stroke-width="1.5"/>
  <polygon points="60,287 54,290 60,293" fill="#a855f7"/>
  <polygon points="540,287 546,290 540,293" fill="#a855f7"/>
  <g transform="translate(210, 275)">
    <rect width="180" height="36" rx="6" fill="#1e1026" stroke="#a855f7" stroke-width="1.2"/>
    <text x="90" y="16" fill="#e9d5ff" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">Horizontal Range (R)</text>
    <text x="90" y="29" fill="#ffffff" font-size="10" font-family="sans-serif">R = (u² sin 2θ) / g</text>
  </g>

  <!-- Formula Card 3: Time of Flight -->
  <g transform="translate(420, 150)">
    <rect width="170" height="36" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.2"/>
    <text x="85" y="16" fill="#7dd3fc" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">Time of Flight (T)</text>
    <text x="85" y="29" fill="#ffffff" font-size="10" font-family="sans-serif">T = (2u sin θ) / g</text>
  </g>
</svg>`;
}

// 5. Physics - Optics & Ray Tracing (Convex Lens)
export function generateOpticsDiagram() {
  return `<svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.4"/>
      <stop offset="50%" stop-color="#0284c7" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.4"/>
    </linearGradient>
    <filter id="rayGlow">
      <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#facc15" flood-opacity="0.5"/>
    </filter>
  </defs>

  <rect width="680" height="340" rx="16" fill="#030712"/>
  <rect x="15" y="15" width="650" height="310" rx="12" fill="none" stroke="#1e293b" stroke-width="1.5"/>

  <!-- Title Badge -->
  <rect x="30" y="24" width="340" height="26" rx="6" fill="#0c4a6e" stroke="#38bdf8" stroke-width="1.2"/>
  <text x="40" y="41" fill="#e0f2fe" font-size="11" font-weight="bold" font-family="sans-serif">
    🔍 Ray Optics · Convex Lens Image Formation (NEET Core)
  </text>

  <!-- Principal Axis -->
  <line x1="40" y1="170" x2="640" y2="170" stroke="#475569" stroke-width="1.8"/>

  <!-- Thin Convex Lens -->
  <path d="M 340,60 C 370,110 370,230 340,280 C 310,230 310,110 340,60 Z"
        fill="url(#lensGrad)" stroke="#38bdf8" stroke-width="2.5"/>
  <line x1="340" y1="50" x2="340" y2="290" stroke="#38bdf8" stroke-width="1" stroke-dasharray="3 3"/>

  <!-- Optical Center O -->
  <circle cx="340" cy="170" r="3" fill="#ffffff"/>
  <text x="340" y="186" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="sans-serif">O</text>

  <!-- Focal Points -->
  <!-- Left Side: 2F1 and F1 -->
  <circle cx="160" cy="170" r="3.5" fill="#facc15"/>
  <text x="160" y="188" fill="#fde047" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">2F₁</text>

  <circle cx="250" cy="170" r="3.5" fill="#facc15"/>
  <text x="250" y="188" fill="#fde047" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">F₁</text>

  <!-- Right Side: F2 and 2F2 -->
  <circle cx="430" cy="170" r="3.5" fill="#facc15"/>
  <text x="430" y="188" fill="#fde047" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">F₂</text>

  <circle cx="520" cy="170" r="3.5" fill="#facc15"/>
  <text x="520" y="188" fill="#fde047" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">2F₂</text>

  <!-- Object at 2F1 (Height h = 70px) -->
  <line x1="160" y1="170" x2="160" y2="100" stroke="#10b981" stroke-width="4"/>
  <polygon points="160,95 154,103 166,103" fill="#10b981"/>
  <text x="160" y="85" fill="#34d399" font-size="10.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">Object (at 2F₁)</text>

  <!-- Ray 1: Parallel -> Refracts through F2 (Cyan) -->
  <line x1="160" y1="100" x2="340" y2="100" stroke="#38bdf8" stroke-width="2"/>
  <polygon points="255,96 265,100 255,104" fill="#38bdf8"/>
  <line x1="340" y1="100" x2="520" y2="240" stroke="#38bdf8" stroke-width="2"/>
  <polygon points="435,170 443,178 435,182" fill="#38bdf8"/>

  <!-- Ray 2: Optical Center O -> Straight (Yellow) -->
  <line x1="160" y1="100" x2="520" y2="240" stroke="#facc15" stroke-width="2" filter="url(#rayGlow)"/>
  <polygon points="335,166 345,170 338,174" fill="#facc15"/>

  <!-- Inverted Real Image at 2F2 (Height h' = -70px) -->
  <line x1="520" y1="170" x2="520" y2="240" stroke="#f43f5e" stroke-width="4"/>
  <polygon points="520,245 514,237 526,237" fill="#f43f5e"/>
  <text x="520" y="260" fill="#fb7185" font-size="10.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">Real &amp; Inverted Image (at 2F₂)</text>

  <!-- Formula Badge -->
  <g transform="translate(180, 275)">
    <rect width="320" height="38" rx="8" fill="#0f172a" stroke="#818cf8" stroke-width="1.5"/>
    <text x="160" y="16" fill="#c7d2fe" font-size="10.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">Lens Formula: 1/f = 1/v - 1/u</text>
    <text x="160" y="30" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">Magnification m = v / u = h' / h = -1 (Equal Size)</text>
  </g>
</svg>`;
}

// 6. Chemistry - Hybridization & Molecular Geometries (sp3, sp2, sp)
export function generateHybridizationDiagram() {
  return `<svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="orbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
  </defs>

  <rect width="680" height="340" rx="16" fill="#030712"/>
  <rect x="15" y="15" width="650" height="310" rx="12" fill="none" stroke="#1e293b" stroke-width="1.5"/>

  <!-- Title Badge -->
  <rect x="30" y="24" width="370" height="26" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1.2"/>
  <text x="40" y="41" fill="#34d399" font-size="11" font-weight="bold" font-family="sans-serif">
    🧪 Orbital Hybridization &amp; VSEPR Geometry (NEET Chemistry)
  </text>

  <!-- Card 1: sp3 Tetrahedral -->
  <g transform="translate(35, 70)">
    <rect width="190" height="235" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="1.8"/>
    <text x="95" y="26" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">sp³ Hybridization</text>
    <text x="95" y="42" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="sans-serif">Tetrahedral · 109.5°</text>
    <line x1="15" y1="52" x2="175" y2="52" stroke="#1e293b" stroke-width="1"/>

    <!-- Central Atom & 4 Orbitals -->
    <circle cx="95" cy="115" r="14" fill="#10b981"/>
    <text x="95" y="119" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">C</text>
    <!-- Top bond -->
    <line x1="95" y1="101" x2="95" y2="68" stroke="#38bdf8" stroke-width="3"/>
    <circle cx="95" cy="65" r="8" fill="#0284c7"/>
    <text x="95" y="68" fill="#ffffff" font-size="7.5" text-anchor="middle" font-family="sans-serif">H</text>
    <!-- Bottom Left -->
    <line x1="84" y1="123" x2="55" y2="155" stroke="#38bdf8" stroke-width="3"/>
    <circle cx="50" cy="160" r="8" fill="#0284c7"/>
    <text x="50" y="163" fill="#ffffff" font-size="7.5" text-anchor="middle" font-family="sans-serif">H</text>
    <!-- Bottom Right -->
    <line x1="106" y1="123" x2="135" y2="155" stroke="#38bdf8" stroke-width="3"/>
    <circle cx="140" cy="160" r="8" fill="#0284c7"/>
    <text x="140" y="163" fill="#ffffff" font-size="7.5" text-anchor="middle" font-family="sans-serif">H</text>
    <!-- Wedged Bond -->
    <polygon points="95,125 105,145 85,145" fill="#38bdf8"/>

    <text x="95" y="195" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="sans-serif">• 25% s + 75% p character</text>
    <text x="95" y="215" fill="#a7f3d0" font-size="9" text-anchor="middle" font-family="sans-serif">e.g. CH₄, NH₃ (pyramidal), H₂O</text>
  </g>

  <!-- Card 2: sp2 Trigonal Planar -->
  <g transform="translate(245, 70)">
    <rect width="190" height="235" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="1.8"/>
    <text x="95" y="26" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">sp² Hybridization</text>
    <text x="95" y="42" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="sans-serif">Trigonal Planar · 120°</text>
    <line x1="15" y1="52" x2="175" y2="52" stroke="#1e293b" stroke-width="1"/>

    <!-- Central Atom & 3 Orbitals -->
    <circle cx="95" cy="115" r="14" fill="#0284c7"/>
    <text x="95" y="119" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">B</text>
    <!-- Top bond -->
    <line x1="95" y1="101" x2="95" y2="68" stroke="#10b981" stroke-width="3"/>
    <circle cx="95" cy="65" r="8" fill="#059669"/>
    <text x="95" y="68" fill="#ffffff" font-size="7.5" text-anchor="middle" font-family="sans-serif">F</text>
    <!-- Left bond 120° -->
    <line x1="84" y1="123" x2="52" y2="142" stroke="#10b981" stroke-width="3"/>
    <circle cx="48" cy="145" r="8" fill="#059669"/>
    <text x="48" y="148" fill="#ffffff" font-size="7.5" text-anchor="middle" font-family="sans-serif">F</text>
    <!-- Right bond 120° -->
    <line x1="106" y1="123" x2="138" y2="142" stroke="#10b981" stroke-width="3"/>
    <circle cx="142" cy="145" r="8" fill="#059669"/>
    <text x="142" y="148" fill="#ffffff" font-size="7.5" text-anchor="middle" font-family="sans-serif">F</text>

    <text x="95" y="195" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="sans-serif">• 33.3% s + 66.7% p</text>
    <text x="95" y="215" fill="#bae6fd" font-size="9" text-anchor="middle" font-family="sans-serif">e.g. BF₃, C₂H₄ (alkenes), CO₃²⁻</text>
  </g>

  <!-- Card 3: sp Linear -->
  <g transform="translate(455, 70)">
    <rect width="190" height="235" rx="10" fill="#0f172a" stroke="#a855f7" stroke-width="1.8"/>
    <text x="95" y="26" fill="#c084fc" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">sp Hybridization</text>
    <text x="95" y="42" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="sans-serif">Linear · 180°</text>
    <line x1="15" y1="52" x2="175" y2="52" stroke="#1e293b" stroke-width="1"/>

    <!-- Central Atom & 2 Linear Orbitals -->
    <circle cx="95" cy="115" r="14" fill="#7e22ce"/>
    <text x="95" y="119" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">Be</text>
    <!-- Left 180° -->
    <line x1="81" y1="115" x2="48" y2="115" stroke="#ec4899" stroke-width="3"/>
    <circle cx="42" cy="115" r="8" fill="#be123c"/>
    <text x="42" y="118" fill="#ffffff" font-size="7.5" text-anchor="middle" font-family="sans-serif">Cl</text>
    <!-- Right 180° -->
    <line x1="109" y1="115" x2="142" y2="115" stroke="#ec4899" stroke-width="3"/>
    <circle cx="148" cy="115" r="8" fill="#be123c"/>
    <text x="148" y="118" fill="#ffffff" font-size="7.5" text-anchor="middle" font-family="sans-serif">Cl</text>

    <text x="95" y="195" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="sans-serif">• 50% s + 50% p (High EN)</text>
    <text x="95" y="215" fill="#e9d5ff" font-size="9" text-anchor="middle" font-family="sans-serif">e.g. BeCl₂, C₂H₂ (alkynes), CO₂</text>
  </g>
</svg>`;
}

// 7. Physics & Chemistry - Thermodynamics Carnot Cycle (P-V Diagram)
export function generateThermodynamicsDiagram() {
  return `<svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="carnotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#10b981" stop-opacity="0.3"/>
    </linearGradient>
  </defs>

  <rect width="680" height="340" rx="16" fill="#040814"/>
  <rect x="15" y="15" width="650" height="310" rx="12" fill="none" stroke="#1e293b" stroke-width="1.5"/>

  <!-- Title Badge -->
  <rect x="30" y="24" width="370" height="26" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1.2"/>
  <text x="40" y="41" fill="#fde047" font-size="11" font-weight="bold" font-family="sans-serif">
    ⚙️ Thermodynamics · Carnot Reversible Heat Engine Cycle
  </text>

  <!-- Axes -->
  <line x1="70" y1="270" x2="600" y2="270" stroke="#475569" stroke-width="2"/>
  <line x1="70" y1="270" x2="70" y2="50" stroke="#475569" stroke-width="2"/>
  <polygon points="600,266 608,270 600,274" fill="#475569"/>
  <polygon points="66,50 70,42 74,50" fill="#475569"/>
  <text x="600" y="290" fill="#94a3b8" font-size="11" font-family="sans-serif">Volume (V)</text>
  <text x="50" y="160" fill="#94a3b8" font-size="11" text-anchor="middle" transform="rotate(-90 50 160)" font-family="sans-serif">Pressure (P)</text>

  <!-- Carnot Loop Shaded Area -->
  <path d="M 160,90 Q 240,110 300,140 Q 360,210 400,240 Q 320,225 250,200 Q 190,130 160,90 Z"
        fill="url(#carnotGrad)" stroke="#38bdf8" stroke-width="2.5"/>

  <!-- 4 Vertices & Direction Arrows -->
  <!-- A: (P1, V1, T1) -->
  <circle cx="160" cy="90" r="5" fill="#f43f5e"/>
  <text x="145" y="85" fill="#fda4af" font-size="11" font-weight="bold" font-family="sans-serif">A</text>
  <!-- Stage 1 Arrow (Isothermal Expansion at TH) -->
  <path d="M 225,102 L 235,106" stroke="#10b981" stroke-width="2.5"/>

  <!-- B: (P2, V2, T1) -->
  <circle cx="300" cy="140" r="5" fill="#f59e0b"/>
  <text x="315" y="135" fill="#fde047" font-size="11" font-weight="bold" font-family="sans-serif">B</text>

  <!-- C: (P3, V3, TC) -->
  <circle cx="400" cy="240" r="5" fill="#38bdf8"/>
  <text x="415" y="245" fill="#7dd3fc" font-size="11" font-weight="bold" font-family="sans-serif">C</text>

  <!-- D: (P4, V4, TC) -->
  <circle cx="250" cy="200" r="5" fill="#a855f7"/>
  <text x="235" y="215" fill="#e9d5ff" font-size="11" font-weight="bold" font-family="sans-serif">D</text>

  <!-- Stage Annotations -->
  <text x="230" y="85" fill="#34d399" font-size="9" font-weight="bold" font-family="sans-serif">1. Isothermal (T₁)</text>
  <text x="370" y="180" fill="#38bdf8" font-size="9" font-weight="bold" font-family="sans-serif">2. Adiabatic</text>
  <text x="315" y="235" fill="#f43f5e" font-size="9" font-weight="bold" font-family="sans-serif">3. Isothermal (T₂)</text>
  <text x="180" y="170" fill="#c084fc" font-size="9" font-weight="bold" font-family="sans-serif">4. Adiabatic</text>

  <text x="280" y="170" fill="#ffffff" font-size="10.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">Wₙₑₜ = ∮ P dV</text>

  <!-- Formula Summary Card -->
  <g transform="translate(420, 70)">
    <rect width="220" height="90" rx="8" fill="#0f172a" stroke="#f59e0b" stroke-width="1.2"/>
    <text x="110" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Carnot Efficiency (η)</text>
    <text x="110" y="42" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">η = 1 - (T₂ / T₁) = W / Q₁</text>
    <text x="110" y="62" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">Always &lt; 100% (2nd Law)</text>
    <text x="110" y="78" fill="#7dd3fc" font-size="8.5" text-anchor="middle" font-family="sans-serif">Depends ONLY on Reservoir Temp</text>
  </g>
</svg>`;
}

// 8. Physics - Bernoulli Fluid Dynamics & Continuity
export function generateBernoulli3DDiagram() {
  return `<svg viewBox="0 0 650 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="fluidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0369a1" stop-opacity="0.85"/>
      <stop offset="45%" stop-color="#38bdf8" stop-opacity="0.95"/>
      <stop offset="55%" stop-color="#38bdf8" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0369a1" stop-opacity="0.85"/>
    </linearGradient>
    <linearGradient id="colGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>
    <filter id="tubeGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#0284c7" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect width="650" height="340" rx="16" fill="#070d19"/>
  <path d="M 0,170 L 650,170" stroke="#1e293b" stroke-dasharray="4 4" stroke-width="1"/>
  <path d="M 40,110 L 190,110 Q 240,110 270,140 L 380,140 Q 410,110 460,110 L 610,110 L 610,230 L 460,230 Q 410,230 380,200 L 270,200 Q 240,230 190,230 L 40,230 Z" fill="url(#fluidGrad)" stroke="#38bdf8" stroke-width="2.5" filter="url(#tubeGlow)"/>
  <rect x="110" y="30" width="28" height="80" rx="4" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
  <rect x="112" y="45" width="24" height="65" rx="3" fill="url(#colGrad)"/>
  <rect x="315" y="30" width="28" height="110" rx="4" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
  <rect x="317" y="95" width="24" height="45" rx="3" fill="url(#colGrad)"/>
  <line x1="145" y1="45" x2="310" y2="45" stroke="#f59e0b" stroke-dasharray="3 3" stroke-width="1.5"/>
  <line x1="140" y1="45" x2="140" y2="95" stroke="#f59e0b" stroke-width="2"/>
  <rect x="145" y="60" width="85" height="22" rx="5" fill="#0f172a" stroke="#f59e0b" stroke-width="1"/>
  <text x="187" y="75" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Δh = P1 - P2</text>
  <rect x="175" y="298" width="300" height="30" rx="8" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
  <text x="325" y="318" fill="#c7d2fe" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">P + ½ρv² + ρgh = Constant (Bernoulli)</text>
</svg>`;
}

// 9. Chemistry - Organic Reaction Mechanism (SN1 vs SN2 / Carbocation Intermediate)
export function generateOrganicReaction3DDiagram() {
  return `<svg viewBox="0 0 650 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="coordGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="50%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
    <filter id="cardGlow">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#ec4899" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="650" height="340" rx="16" fill="#090d16"/>
  <line x1="70" y1="280" x2="600" y2="280" stroke="#475569" stroke-width="2"/>
  <line x1="70" y1="280" x2="70" y2="40" stroke="#475569" stroke-width="2"/>
  <path d="M 80,230 Q 150,230 190,80 Q 230,80 260,170 Q 300,90 350,110 Q 420,130 570,250"
        fill="none" stroke="url(#coordGrad)" stroke-width="3.5" filter="url(#cardGlow)"/>
  <circle cx="190" cy="80" r="7" fill="#f43f5e"/>
  <rect x="135" y="42" width="110" height="26" rx="6" fill="#3f0f1c" stroke="#f43f5e" stroke-width="1.2"/>
  <text x="190" y="58" fill="#fecdd3" font-size="9.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">TS 1 [R···X]‡ (RDS)</text>
  <circle cx="260" cy="170" r="7" fill="#a855f7"/>
  <rect x="200" y="185" width="125" height="32" rx="6" fill="#240e3b" stroke="#a855f7" stroke-width="1.5"/>
  <text x="262" y="200" fill="#e9d5ff" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">R⁺ Carbocation</text>
  <text x="262" y="212" fill="#c084fc" font-size="8" text-anchor="middle" font-family="sans-serif">Planar sp² Hybridized</text>
  <circle cx="570" cy="250" r="6" fill="#10b981"/>
  <rect x="500" y="260" width="110" height="30" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="1.2"/>
  <text x="555" y="278" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">R-Nu + X⁻ Product</text>
  <rect x="80" y="10" width="280" height="22" rx="5" fill="#0f172a" stroke="#334155" stroke-width="1"/>
  <text x="90" y="25" fill="#38bdf8" font-size="10" font-weight="bold" font-family="sans-serif">⚡ Organic Reaction Coordinate (3D Profile)</text>
</svg>`;
}

// 10. Universal High-Yield 3D Architecture Blueprint
export function generateGenericConcept3DDiagram(topic = 'Core Concept Architecture') {
  const cleanTopic = (topic || 'NEET Concept Architecture').replace(/["`]/g, '').trim();
  return `<svg viewBox="0 0 660 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="cardGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#065f46"/>
      <stop offset="100%" stop-color="#022c22"/>
    </linearGradient>
    <linearGradient id="cardGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#075985"/>
      <stop offset="100%" stop-color="#082f49"/>
    </linearGradient>
    <linearGradient id="cardGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6b21a8"/>
      <stop offset="100%" stop-color="#3b0764"/>
    </linearGradient>
    <filter id="nodeGlow">
      <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#10b981" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="660" height="260" rx="16" fill="#050a14"/>
  <rect x="15" y="15" width="630" height="230" rx="12" fill="none" stroke="#1e293b" stroke-width="1.5"/>
  <text x="330" y="45" fill="#f8fafc" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">
    ⚡ ${cleanTopic} · Systematic 3D Architecture
  </text>
  <line x1="160" y1="58" x2="500" y2="58" stroke="#334155" stroke-width="1" stroke-dasharray="4 4"/>
  <!-- Step 1 -->
  <g transform="translate(35, 85)" filter="url(#nodeGlow)">
    <rect width="160" height="130" rx="10" fill="url(#cardGrad1)" stroke="#10b981" stroke-width="1.8"/>
    <text x="48" y="27" fill="#34d399" font-size="11.5" font-weight="bold" font-family="sans-serif">First Principles</text>
    <line x1="10" y1="42" x2="150" y2="42" stroke="#047857" stroke-width="1"/>
    <text x="12" y="65" fill="#e2e8f0" font-size="10" font-family="sans-serif">• NCERT Definitions</text>
    <text x="12" y="85" fill="#e2e8f0" font-size="10" font-family="sans-serif">• Governing Laws</text>
    <text x="12" y="105" fill="#a7f3d0" font-size="9" font-family="sans-serif">• Boundary Conditions</text>
  </g>
  <!-- Step 2 -->
  <g transform="translate(250, 85)" filter="url(#nodeGlow)">
    <rect width="160" height="130" rx="10" fill="url(#cardGrad2)" stroke="#0284c7" stroke-width="1.8"/>
    <text x="48" y="27" fill="#38bdf8" font-size="11.5" font-weight="bold" font-family="sans-serif">Mechanisms</text>
    <line x1="10" y1="42" x2="150" y2="42" stroke="#0369a1" stroke-width="1"/>
    <text x="12" y="65" fill="#e2e8f0" font-size="10" font-family="sans-serif">• Derivations &amp; Steps</text>
    <text x="12" y="85" fill="#e2e8f0" font-size="10" font-family="sans-serif">• Microscopic States</text>
    <text x="12" y="105" fill="#bae6fd" font-size="9" font-family="sans-serif">• Stoichiometry &amp; Ratio</text>
  </g>
  <!-- Step 3 -->
  <g transform="translate(465, 85)" filter="url(#nodeGlow)">
    <rect width="160" height="130" rx="10" fill="url(#cardGrad3)" stroke="#a855f7" stroke-width="1.8"/>
    <text x="48" y="27" fill="#c084fc" font-size="11.5" font-weight="bold" font-family="sans-serif">NEET Application</text>
    <line x1="10" y1="42" x2="150" y2="42" stroke="#7e22ce" stroke-width="1"/>
    <text x="12" y="65" fill="#e2e8f0" font-size="10" font-family="sans-serif">• Solved Numericals</text>
    <text x="12" y="85" fill="#e2e8f0" font-size="10" font-family="sans-serif">• Distractor Elimination</text>
    <text x="12" y="105" fill="#e9d5ff" font-size="9" font-family="sans-serif">• High-Yield Traps</text>
  </g>
</svg>`;
}

/**
 * Helper to determine if an incoming SVG string is crude/primitive (e.g. LLM wrote broken 5-element boxes)
 */
function isCrudeSVG(svgString) {
  if (!svgString) return true;
  // Must have a valid viewBox so coordinates aren't clipped off-screen
  if (!/viewBox\s*=\s*["'][^"']+["']/i.test(svgString)) return true;
  // Count meaningful geometric tags
  const tags = (svgString.match(/<(path|circle|rect|ellipse|polygon|line)\b/gi) || []).length;
  // Raw LLM SVGs without gradients or with < 14 shapes are typically crude/clipped
  const hasGradient = /<(linearGradient|radialGradient)\b/i.test(svgString);
  if (!hasGradient || tags < 14) return true;
  // Detect dark/black text on dark canvas or raw <image> placeholders
  if (/fill\s*=\s*["'](?:#000|#000000|black|#1e293b|#0f172a)["']/i.test(svgString) && /<text/i.test(svgString)) {
    return true;
  }
  return false;
}

/**
 * Master synthesizer: Inspects code/diagram text and topic to return a guaranteed high-res 3D SVG string
 */
export function synthesizeVectorDiagram(rawText = '', topic = '', subject = 'Biology') {
  const text = (rawText || '').toLowerCase();
  const lowerTopic = (topic || '').toLowerCase();
  const combined = `${text} ${lowerTopic} ${(subject || '').toLowerCase()}`;

  // 0a. Human Liver, Biliary Tract, Gallbladder, Hepatic Lobule
  if (
    combined.includes('liver') || combined.includes('hepatic') || combined.includes('gallbladder') ||
    combined.includes('bile duct') || combined.includes('cystic duct') || combined.includes('glisson') ||
    combined.includes('falciform') || combined.includes('kupffer')
  ) {
    return generateHumanLiverDiagram();
  }

  // 0b. Human Heart, Double Circulation, Chambers, Valves, SA/AV Node
  if (
    combined.includes('heart') || combined.includes('cardiac') || combined.includes('atrium') ||
    combined.includes('ventricle') || combined.includes('tricuspid') || combined.includes('bicuspid') ||
    combined.includes('aorta') || combined.includes('sa node') || combined.includes('double circulation')
  ) {
    return generateHumanHeartDiagram();
  }

  // 0c. Kidney, Nephron, Glomerulus, Bowman's Capsule, Loop of Henle
  if (
    combined.includes('nephron') || combined.includes('glomerulus') || combined.includes('bowman') ||
    combined.includes('loop of henle') || combined.includes('kidney') || combined.includes('ultrafiltration') ||
    combined.includes('collecting duct')
  ) {
    return generateNephronDiagram();
  }

  // 1. Human Reproduction, Reproductive Health, Embryo, Gametogenesis, Fertilization, Anatomy
  if (
    combined.includes('reproduct') || combined.includes('uterus') || combined.includes('ovary') ||
    combined.includes('ovaries') || combined.includes('testis') || combined.includes('testes') ||
    combined.includes('ampulla') || combined.includes('fallopian') || combined.includes('vas deferens') ||
    combined.includes('zygote') || combined.includes('semen') || combined.includes('fertiliz') ||
    combined.includes('menstrua') || combined.includes('embryo') || combined.includes('blastocyst')
  ) {
    return generateHumanReproductionDiagram();
  }

  // 2. DNA, RNA, Genetics, Molecular Inheritance, Transcription, Translation, Replication
  if (
    combined.includes('dna') || combined.includes('helix') || combined.includes('watson') ||
    combined.includes('nucleotide') || combined.includes('base pair') || combined.includes('genetic') ||
    combined.includes('transcription') || combined.includes('translation') || combined.includes('rna') ||
    combined.includes('codon') || combined.includes('replication') || combined.includes('adenine')
  ) {
    return generateDNADoubleHelixDiagram();
  }

  // 3. Cell & Organelles (Nucleus, Mitochondria, Cristae, Lysosome, Golgi, ER)
  if (
    combined.includes('nucleus') || combined.includes('mitochondri') || combined.includes('lysosome') ||
    combined.includes('cristae') || combined.includes('organelle') || combined.includes('cell') ||
    combined.includes('golgi') || combined.includes('endoplasmic') || combined.includes('cytoplasm')
  ) {
    return generateCell3DDiagram();
  }

  // 4. Projectile Motion, 2D Kinematics, Trajectory, Vectors
  if (
    combined.includes('projectile') || combined.includes('trajectory') || combined.includes('parabol') ||
    combined.includes('hmax') || combined.includes('range') || combined.includes('kinematic') ||
    combined.includes('time of flight') || combined.includes('initial velocity') || combined.includes('angle of projection')
  ) {
    return generateProjectileMotionDiagram();
  }

  // 5. Optics, Lenses, Mirrors, Ray Tracing, Refraction
  if (
    combined.includes('optic') || combined.includes('lens') || combined.includes('mirror') ||
    combined.includes('ray tracing') || combined.includes('focal') || combined.includes('refraction') ||
    combined.includes('reflection') || combined.includes('magnification') || combined.includes('convex') ||
    combined.includes('concave')
  ) {
    return generateOpticsDiagram();
  }

  // 6. Fluid dynamics, Bernoulli, Pressure, Flow, Continuity
  if (
    combined.includes('bernoulli') || combined.includes('venturi') || combined.includes('fluid') ||
    combined.includes('streamline') || combined.includes('viscosity') || combined.includes('continuity')
  ) {
    return generateBernoulli3DDiagram();
  }

  // 7. Chemistry - Hybridization, Orbitals, Geometries, VSEPR
  if (
    combined.includes('hybrid') || combined.includes('sp3') || combined.includes('sp2') ||
    combined.includes('tetrahedral') || combined.includes('vsepr') || combined.includes('orbital') ||
    combined.includes('bond angle') || combined.includes('geometry')
  ) {
    return generateHybridizationDiagram();
  }

  // 8. Thermodynamics, Carnot Cycle, Heat Engine, P-V Diagram
  if (
    combined.includes('carnot') || combined.includes('thermodynamic') || combined.includes('heat engine') ||
    combined.includes('isothermal') || combined.includes('adiabatic') || combined.includes('p-v') ||
    combined.includes('efficiency') || combined.includes('entropy')
  ) {
    return generateThermodynamicsDiagram();
  }

  // 9. Organic Chemistry, Reaction Coordinate, SN1, SN2, Carbocation, Activation Energy
  if (
    combined.includes('sn1') || combined.includes('sn2') || combined.includes('carbocation') ||
    combined.includes('reaction coordinate') || combined.includes('intermediate') || combined.includes('activation energy')
  ) {
    return generateOrganicReaction3DDiagram();
  }

  // ── INFOGRAPHIC ROUTES (rich visual stat-card / timeline diagrams) ──────

  // 10. Menstrual Cycle, Hormone, Ovulation, LH/FSH/Estrogen/Progesterone
  if (
    combined.includes('menstrual') || combined.includes('ovulation') || combined.includes('luteal') ||
    combined.includes('follicular phase') || combined.includes('corpus luteum') ||
    combined.includes('estrogen') || combined.includes('progesterone') ||
    (combined.includes('fsh') && combined.includes('lh'))
  ) {
    return generateMenstrualCycleInfographic();
  }

  // 11. Error Propagation, Measurement Error, Relative Error, Absolute Error
  if (
    combined.includes('absolute error') || combined.includes('relative error') ||
    combined.includes('error propagation') || combined.includes('fractional error') ||
    combined.includes('percentage error') || combined.includes('error analysis') ||
    combined.includes('power rule error')
  ) {
    return generateErrorPropagationInfographic();
  }

  // 12. Kinematics Equations, Equation of Motion, v=u+at, velocity-time
  if (
    combined.includes('equation of motion') || combined.includes('v = u') ||
    combined.includes('v=u+at') || combined.includes('equations of motion') ||
    combined.includes('nth second') || combined.includes('velocity time graph') ||
    (combined.includes('kinematics') && combined.includes('uniform'))
  ) {
    return generateKinematicsInfographic();
  }

  // 13. Cell organelle comparison (broader topic → infographic badge cards)
  if (
    combined.includes('organelle function') || combined.includes('cell organelle') ||
    combined.includes('prokaryote') || combined.includes('eukaryote') ||
    combined.includes('70s') || combined.includes('80s ribosome') ||
    combined.includes('ribosome comparison')
  ) {
    return generateCellOrganelleInfographic();
  }

  // 14. DNA structure infographic (Chargaff, base pair, helix stats)
  if (
    combined.includes('chargaff') || combined.includes('base pair') ||
    combined.includes('watson') || combined.includes('central dogma') ||
    combined.includes('double helix') || combined.includes('purine') ||
    combined.includes('pyrimidine') || combined.includes('3.4 nm')
  ) {
    return generateDNAInfographic();
  }

  // 15. Periodic Trends
  if (
    combined.includes('periodic trend') || combined.includes('ionization energy') ||
    combined.includes('electronegativity') || combined.includes('electron affinity') ||
    (combined.includes('atomic radius') && combined.includes('periodic')) ||
    combined.includes('shielding effect') || combined.includes('metallic character')
  ) {
    return generatePeriodicTrendsInfographic();
  }

  // 16. Photosynthesis, Calvin Cycle, Light Reactions, PS I / PS II
  if (
    combined.includes('photosynthesis') || combined.includes('calvin') ||
    combined.includes('light reaction') || combined.includes('dark reaction') ||
    combined.includes('ps i') || combined.includes('ps ii') ||
    combined.includes('thylakoid') || combined.includes('stroma') ||
    combined.includes('rubisco') || combined.includes('c4 plant') ||
    combined.includes('cam plant') || combined.includes('photophosphorylation')
  ) {
    return generatePhotosynthesisInfographic();
  }

  // 17. Thermochemistry, Hess's Law, Born-Haber, ΔH, Enthalpy
  if (
    combined.includes('hess') || combined.includes('born-haber') || combined.includes('born haber') ||
    combined.includes('lattice enthalpy') || combined.includes('enthalpy of') ||
    combined.includes('thermochemistry') || combined.includes('heat of combustion') ||
    combined.includes('heat of formation') || combined.includes('gibbs') ||
    combined.includes('delta h') || combined.includes('spontaneity')
  ) {
    return generateThermochemistryInfographic();
  }

  // 18. Check if rawText is ALREADY a valid, non-crude SVG
  if (rawText.includes('<svg') && rawText.includes('</svg>')) {
    const s = rawText.indexOf('<svg');
    const e = rawText.lastIndexOf('</svg>');
    const svgBody = rawText.slice(s, e + 6);
    if (!isCrudeSVG(svgBody)) {
      return svgBody;
    }
  }

  // Default Fallback: Generate smart 3D Concept Architecture diagram
  return generateGenericConcept3DDiagram(topic || subject || 'NEET High-Yield Concept');
}
