/**
 * NEET Infographic-Style SVG Diagrams
 * Visual stat-card / timeline / comparison-panel infographics
 * for every major NEET subject & unit.
 * Dark theme: #030712 bg, emerald / indigo / rose / amber accents.
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. MENSTRUAL CYCLE — 4-phase horizontal timeline + hormone bars
// ─────────────────────────────────────────────────────────────────────────────
export function generateMenstrualCycleInfographic() {
  return `<svg viewBox="0 0 900 480" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="mcBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/>
      <stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
    <linearGradient id="mcP1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="100%" stop-color="#9f1239"/>
    </linearGradient>
    <linearGradient id="mcP2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <linearGradient id="mcP3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#065f46"/>
    </linearGradient>
    <linearGradient id="mcP4" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#4c1d95"/>
    </linearGradient>
    <filter id="mcGlow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="900" height="480" fill="url(#mcBg)" rx="16"/>
  
  <!-- Title -->
  <text x="450" y="34" fill="#f8fafc" font-size="18" font-weight="800" text-anchor="middle" font-family="system-ui">🔬 MENSTRUAL CYCLE — 28-Day Hormonal Infographic</text>
  <text x="450" y="54" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">NEET Biology · Human Reproduction · Reproductive Physiology</text>

  <!-- Phase Boxes -->
  <!-- Phase 1: Menstrual (Day 1-5) -->
  <rect x="20" y="70" width="155" height="90" rx="12" fill="url(#mcP1)" opacity="0.85"/>
  <text x="97" y="94" fill="white" font-size="13" font-weight="700" text-anchor="middle" font-family="system-ui">🩸 MENSTRUAL</text>
  <text x="97" y="110" fill="#fecdd3" font-size="11" text-anchor="middle" font-family="system-ui">Days 1 – 5</text>
  <text x="97" y="128" fill="white" font-size="10" text-anchor="middle" font-family="system-ui">Endometrium shed</text>
  <text x="97" y="143" fill="white" font-size="10" text-anchor="middle" font-family="system-ui">Low E₂, P₄, LH, FSH</text>

  <!-- Phase 2: Follicular (Day 6-13) -->
  <rect x="192" y="70" width="210" height="90" rx="12" fill="url(#mcP2)" opacity="0.85"/>
  <text x="297" y="94" fill="white" font-size="13" font-weight="700" text-anchor="middle" font-family="system-ui">🌱 FOLLICULAR</text>
  <text x="297" y="110" fill="#fef3c7" font-size="11" text-anchor="middle" font-family="system-ui">Days 6 – 13</text>
  <text x="297" y="128" fill="white" font-size="10" text-anchor="middle" font-family="system-ui">FSH↑ → Graafian follicle grows</text>
  <text x="297" y="143" fill="white" font-size="10" text-anchor="middle" font-family="system-ui">Estrogen↑ → Endometrium proliferates</text>

  <!-- Phase 3: Ovulation (Day 14) -->
  <rect x="419" y="70" width="120" height="90" rx="12" fill="url(#mcP3)" opacity="0.90"/>
  <text x="479" y="94" fill="white" font-size="13" font-weight="700" text-anchor="middle" font-family="system-ui">💥 OVULATION</text>
  <text x="479" y="110" fill="#d1fae5" font-size="11" text-anchor="middle" font-family="system-ui">Day 14</text>
  <text x="479" y="128" fill="white" font-size="10" text-anchor="middle" font-family="system-ui">LH surge triggers</text>
  <text x="479" y="143" fill="white" font-size="10" text-anchor="middle" font-family="system-ui">oocyte release</text>

  <!-- Phase 4: Luteal (Day 15-28) -->
  <rect x="556" y="70" width="324" height="90" rx="12" fill="url(#mcP4)" opacity="0.85"/>
  <text x="718" y="94" fill="white" font-size="13" font-weight="700" text-anchor="middle" font-family="system-ui">🌙 LUTEAL</text>
  <text x="718" y="110" fill="#ede9fe" font-size="11" text-anchor="middle" font-family="system-ui">Days 15 – 28</text>
  <text x="718" y="128" fill="white" font-size="10" text-anchor="middle" font-family="system-ui">Corpus luteum → Progesterone↑ + Estrogen↑</text>
  <text x="718" y="143" fill="white" font-size="10" text-anchor="middle" font-family="system-ui">If no fertilization → CL degenerates → menstruation</text>

  <!-- Hormone Bars Section -->
  <text x="20" y="182" fill="#94a3b8" font-size="12" font-weight="700" font-family="system-ui">HORMONE LEVEL TIMELINE (relative units)</text>

  <!-- Day axis -->
  <line x1="20" y1="430" x2="880" y2="430" stroke="#334155" stroke-width="1.5"/>
  <!-- Day ticks -->
  <text x="20" y="445" fill="#64748b" font-size="10" font-family="system-ui">1</text>
  <text x="175" y="445" fill="#64748b" font-size="10" font-family="system-ui">5</text>
  <text x="334" y="445" fill="#64748b" font-size="10" font-family="system-ui">10</text>
  <text x="490" y="445" fill="#64748b" font-size="10" font-family="system-ui">14</text>
  <text x="597" y="445" fill="#64748b" font-size="10" font-family="system-ui">17</text>
  <text x="718" y="445" fill="#64748b" font-size="10" font-family="system-ui">21</text>
  <text x="860" y="445" fill="#64748b" font-size="10" font-family="system-ui">28</text>
  <text x="450" y="460" fill="#475569" font-size="11" text-anchor="middle" font-family="system-ui">Day of Cycle →</text>

  <!-- FSH curve (amber) -->
  <polyline points="20,420 100,390 200,350 400,340 490,200 540,380 650,400 860,420"
    fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  
  <!-- LH curve (rose) — sharp spike at day 14 -->
  <polyline points="20,420 150,400 350,390 460,195 490,120 500,200 540,400 700,415 860,420"
    fill="none" stroke="#f43f5e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Estrogen curve (emerald) — dual peak -->
  <polyline points="20,420 150,400 350,250 450,220 490,280 550,210 650,280 800,400 860,420"
    fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Progesterone curve (violet) -->
  <polyline points="20,420 350,420 490,420 540,310 650,250 750,290 820,380 860,420"
    fill="none" stroke="#8b5cf6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- LH Spike marker -->
  <line x1="490" y1="120" x2="490" y2="430" stroke="#f43f5e" stroke-width="1" stroke-dasharray="4,3" opacity="0.7"/>
  <text x="494" y="195" fill="#f43f5e" font-size="10" font-weight="700" font-family="system-ui">LH SURGE</text>
  <text x="494" y="207" fill="#f43f5e" font-size="10" font-family="system-ui">Day 14</text>

  <!-- Legend -->
  <rect x="20" y="192" width="12" height="4" fill="#f59e0b" rx="2"/>
  <text x="36" y="200" fill="#f59e0b" font-size="11" font-family="system-ui">FSH</text>
  <rect x="80" y="192" width="12" height="4" fill="#f43f5e" rx="2"/>
  <text x="96" y="200" fill="#f43f5e" font-size="11" font-family="system-ui">LH</text>
  <rect x="130" y="192" width="12" height="4" fill="#10b981" rx="2"/>
  <text x="146" y="200" fill="#10b981" font-size="11" font-family="system-ui">Estrogen (E₂)</text>
  <rect x="240" y="192" width="12" height="4" fill="#8b5cf6" rx="2"/>
  <text x="256" y="200" fill="#8b5cf6" font-size="11" font-family="system-ui">Progesterone (P₄)</text>

  <!-- Key Facts -->
  <rect x="600" y="192" width="280" height="100" rx="10" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
  <text x="740" y="212" fill="#94a3b8" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">KEY FACTS (NEET)</text>
  <text x="615" y="228" fill="#e2e8f0" font-size="10" font-family="system-ui">• Cycle = 28 days (avg); ovulation ≈ Day 14</text>
  <text x="615" y="244" fill="#e2e8f0" font-size="10" font-family="system-ui">• Corpus luteum lives ~14 days if no implant</text>
  <text x="615" y="260" fill="#e2e8f0" font-size="10" font-family="system-ui">• hCG from trophoblast maintains CL in pregnancy</text>
  <text x="615" y="276" fill="#e2e8f0" font-size="10" font-family="system-ui">• Menstruation = day 1 (new cycle begins)</text>
  <text x="615" y="288" fill="#10b981" font-size="10" font-family="system-ui">• Estrogen: proliferative phase; P₄: secretory phase</text>
</svg>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. ERROR PROPAGATION INFOGRAPHIC — 3-column stat cards
// ─────────────────────────────────────────────────────────────────────────────
export function generateErrorPropagationInfographic() {
  return `<svg viewBox="0 0 880 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="epBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/>
      <stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
  </defs>
  <rect width="880" height="420" fill="url(#epBg)" rx="16"/>

  <!-- Title -->
  <text x="440" y="34" fill="#f8fafc" font-size="18" font-weight="800" text-anchor="middle" font-family="system-ui">📐 ERROR ANALYSIS INFOGRAPHIC</text>
  <text x="440" y="54" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">NEET Physics · Units &amp; Measurement · Error Propagation</text>

  <!-- Card 1: Absolute Error -->
  <rect x="20" y="72" width="260" height="310" rx="14" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
  <rect x="20" y="72" width="260" height="44" rx="14" fill="#059669"/>
  <rect x="20" y="100" width="260" height="16" fill="#059669"/>
  <text x="150" y="100" fill="white" font-size="14" font-weight="800" text-anchor="middle" font-family="system-ui">① ABSOLUTE ERROR</text>
  <text x="150" y="130" fill="#10b981" font-size="28" font-weight="800" text-anchor="middle" font-family="monospace">ΔA</text>
  <line x1="40" y1="148" x2="260" y2="148" stroke="#1e293b" stroke-width="1"/>
  <text x="150" y="168" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Definition:</text>
  <text x="150" y="184" fill="#e2e8f0" font-size="11" text-anchor="middle" font-family="monospace">ΔAᵢ = |Amean − Aᵢ|</text>
  <text x="150" y="206" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Mean absolute error:</text>
  <text x="150" y="222" fill="#10b981" font-size="12" font-weight="700" text-anchor="middle" font-family="monospace">Δā = (ΣΔAᵢ) / n</text>
  <line x1="40" y1="236" x2="260" y2="236" stroke="#1e293b" stroke-width="1"/>
  <text x="150" y="256" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">For addition / subtraction Z = A ± B:</text>
  <text x="150" y="272" fill="#10b981" font-size="12" font-weight="700" text-anchor="middle" font-family="monospace">ΔZ = ΔA + ΔB</text>
  <text x="150" y="296" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">Example: l = 5.3 cm, Δl = 0.1 cm</text>
  <text x="150" y="312" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">t = 2.1 s, Δt = 0.1 s</text>
  <text x="150" y="334" fill="#10b981" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Unit: Same as the measured quantity</text>
  <text x="150" y="368" fill="#f59e0b" font-size="10" text-anchor="middle" font-family="system-ui">⚠ NEET Trap: Absolute error always +ve</text>

  <!-- Card 2: Relative / Fractional Error -->
  <rect x="306" y="72" width="260" height="310" rx="14" fill="#0f172a" stroke="#6366f1" stroke-width="1.5"/>
  <rect x="306" y="72" width="260" height="44" rx="14" fill="#4f46e5"/>
  <rect x="306" y="100" width="260" height="16" fill="#4f46e5"/>
  <text x="436" y="100" fill="white" font-size="14" font-weight="800" text-anchor="middle" font-family="system-ui">② RELATIVE ERROR</text>
  <text x="436" y="130" fill="#818cf8" font-size="28" font-weight="800" text-anchor="middle" font-family="monospace">ΔA/A</text>
  <line x1="326" y1="148" x2="546" y2="148" stroke="#1e293b" stroke-width="1"/>
  <text x="436" y="168" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Definition:</text>
  <text x="436" y="184" fill="#e2e8f0" font-size="11" text-anchor="middle" font-family="monospace">δ = Δā / Amean</text>
  <text x="436" y="206" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Percentage error:</text>
  <text x="436" y="222" fill="#818cf8" font-size="12" font-weight="700" text-anchor="middle" font-family="monospace">% err = (Δā/Amean)×100</text>
  <line x1="326" y1="236" x2="546" y2="236" stroke="#1e293b" stroke-width="1"/>
  <text x="436" y="256" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">For multiplication / division Z = A×B/C:</text>
  <text x="436" y="272" fill="#818cf8" font-size="12" font-weight="700" text-anchor="middle" font-family="monospace">ΔZ/Z = ΔA/A + ΔB/B + ΔC/C</text>
  <text x="436" y="296" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">Example: v = 20 m/s, Δv = 0.5 m/s</text>
  <text x="436" y="312" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">Relative error = 0.5/20 = 0.025</text>
  <text x="436" y="334" fill="#818cf8" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Unit: Dimensionless (pure ratio)</text>
  <text x="436" y="368" fill="#f59e0b" font-size="10" text-anchor="middle" font-family="system-ui">⚠ Smaller = more precise measurement</text>

  <!-- Card 3: Power Rule -->
  <rect x="592" y="72" width="268" height="310" rx="14" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
  <rect x="592" y="72" width="268" height="44" rx="14" fill="#b45309"/>
  <rect x="592" y="100" width="268" height="16" fill="#b45309"/>
  <text x="726" y="100" fill="white" font-size="14" font-weight="800" text-anchor="middle" font-family="system-ui">③ POWER RULE</text>
  <text x="726" y="130" fill="#fbbf24" font-size="22" font-weight="800" text-anchor="middle" font-family="monospace">Z = Aᵖ Bq / Cʳ</text>
  <line x1="612" y1="148" x2="840" y2="148" stroke="#1e293b" stroke-width="1"/>
  <text x="726" y="168" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Maximum relative error:</text>
  <text x="726" y="192" fill="#fbbf24" font-size="13" font-weight="700" text-anchor="middle" font-family="monospace">ΔZ/Z = p·ΔA/A</text>
  <text x="726" y="210" fill="#fbbf24" font-size="13" font-weight="700" text-anchor="middle" font-family="monospace">+ q·ΔB/B + r·ΔC/C</text>
  <line x1="612" y1="224" x2="840" y2="224" stroke="#1e293b" stroke-width="1"/>
  <text x="726" y="244" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Worked NEET Example:</text>
  <text x="726" y="260" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="system-ui">T = 2π√(l/g), p=½, so</text>
  <text x="726" y="276" fill="#fbbf24" font-size="11" font-weight="700" text-anchor="middle" font-family="monospace">ΔT/T = ½(Δl/l) + ½(Δg/g)</text>
  <text x="726" y="296" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">If Δl/l = 2%, Δg/g = 1%</text>
  <text x="726" y="312" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">→ ΔT/T = ½×2 + ½×1 = 1.5%</text>
  <text x="726" y="340" fill="#f59e0b" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Higher power = amplified error!</text>
  <text x="726" y="368" fill="#f43f5e" font-size="10" text-anchor="middle" font-family="system-ui">⚠ Exponent multiplies the error fraction</text>
</svg>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. KINEMATICS EQUATIONS INFOGRAPHIC — 5 equation cards + velocity-time graph
// ─────────────────────────────────────────────────────────────────────────────
export function generateKinematicsInfographic() {
  return `<svg viewBox="0 0 920 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="kinBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/>
      <stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
    <linearGradient id="kinCard" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0d2137"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <rect width="920" height="500" fill="url(#kinBg)" rx="16"/>

  <!-- Title -->
  <text x="460" y="34" fill="#f8fafc" font-size="18" font-weight="800" text-anchor="middle" font-family="system-ui">⚡ KINEMATICS — 5 Equations of Motion</text>
  <text x="460" y="54" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">NEET Physics · Motion in Straight Line · Uniform Acceleration</text>

  <!-- Equation Cards (5 in a row) -->
  <!-- Eq 1: v = u + at -->
  <rect x="10" y="68" width="170" height="100" rx="12" fill="url(#kinCard)" stroke="#10b981" stroke-width="1.5"/>
  <text x="95" y="88" fill="#10b981" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">EQ 1 · Velocity</text>
  <text x="95" y="118" fill="white" font-size="20" font-weight="800" text-anchor="middle" font-family="monospace">v = u + at</text>
  <text x="95" y="142" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">Independent of displacement</text>
  <text x="95" y="158" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">u=init vel, a=accel, t=time</text>

  <!-- Eq 2: s = ut + ½at² -->
  <rect x="192" y="68" width="170" height="100" rx="12" fill="url(#kinCard)" stroke="#6366f1" stroke-width="1.5"/>
  <text x="277" y="88" fill="#818cf8" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">EQ 2 · Displacement</text>
  <text x="277" y="118" fill="white" font-size="17" font-weight="800" text-anchor="middle" font-family="monospace">s = ut + ½at²</text>
  <text x="277" y="142" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">Independent of final velocity</text>
  <text x="277" y="158" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Area under v-t graph</text>

  <!-- Eq 3: v² = u² + 2as -->
  <rect x="374" y="68" width="170" height="100" rx="12" fill="url(#kinCard)" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="459" y="88" fill="#fbbf24" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">EQ 3 · Energy Form</text>
  <text x="459" y="118" fill="white" font-size="17" font-weight="800" text-anchor="middle" font-family="monospace">v² = u² + 2as</text>
  <text x="459" y="142" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">Independent of time</text>
  <text x="459" y="158" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Relates v, u, a, s only</text>

  <!-- Eq 4: s = (u+v)/2 · t -->
  <rect x="556" y="68" width="170" height="100" rx="12" fill="url(#kinCard)" stroke="#f43f5e" stroke-width="1.5"/>
  <text x="641" y="88" fill="#fb7185" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">EQ 4 · Average</text>
  <text x="641" y="118" fill="white" font-size="17" font-weight="800" text-anchor="middle" font-family="monospace">s = ½(u+v)t</text>
  <text x="641" y="142" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">Independent of acceleration</text>
  <text x="641" y="158" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Avg velocity × time</text>

  <!-- Eq 5: sₙ = u + a/2(2n-1) -->
  <rect x="738" y="68" width="172" height="100" rx="12" fill="url(#kinCard)" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="824" y="88" fill="#c084fc" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">EQ 5 · nth Second</text>
  <text x="824" y="114" fill="white" font-size="14" font-weight="800" text-anchor="middle" font-family="monospace">sₙ = u+(a/2)(2n-1)</text>
  <text x="824" y="142" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">Distance in nth second</text>
  <text x="824" y="158" fill="#f43f5e" font-size="10" text-anchor="middle" font-family="system-ui">⚠ NEET favorite!</text>

  <!-- Velocity-Time Graph -->
  <text x="460" y="192" fill="#94a3b8" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui">VELOCITY–TIME GRAPH (Uniform Acceleration)</text>
  
  <!-- Graph Area -->
  <rect x="20" y="204" width="860" height="210" rx="10" fill="#0a1628" stroke="#1e293b" stroke-width="1"/>
  
  <!-- Grid lines -->
  <line x1="100" y1="210" x2="100" y2="408" stroke="#1e293b" stroke-width="1"/>
  <line x1="300" y1="210" x2="300" y2="408" stroke="#1e293b" stroke-width="1"/>
  <line x1="500" y1="210" x2="500" y2="408" stroke="#1e293b" stroke-width="1"/>
  <line x1="700" y1="210" x2="700" y2="408" stroke="#1e293b" stroke-width="1"/>
  <line x1="30" y1="260" x2="870" y2="260" stroke="#1e293b" stroke-width="1"/>
  <line x1="30" y1="310" x2="870" y2="310" stroke="#1e293b" stroke-width="1"/>
  <line x1="30" y1="360" x2="870" y2="360" stroke="#1e293b" stroke-width="1"/>

  <!-- Axes -->
  <line x1="30" y1="408" x2="880" y2="408" stroke="#475569" stroke-width="2"/>
  <line x1="30" y1="210" x2="30" y2="408" stroke="#475569" stroke-width="2"/>
  <text x="455" y="424" fill="#64748b" font-size="11" text-anchor="middle" font-family="system-ui">Time (t) →</text>
  <text x="20" y="314" fill="#64748b" font-size="11" text-anchor="middle" font-family="system-ui" transform="rotate(-90 20 314)">Velocity (v) →</text>

  <!-- v-t line (uniform acceleration: straight line from u to v) -->
  <line x1="30" y1="380" x2="880" y2="220" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
  
  <!-- Area shading (displacement = area under curve) -->
  <polygon points="30,380 880,220 880,408 30,408" fill="#10b981" opacity="0.08"/>
  
  <!-- u annotation -->
  <circle cx="30" cy="380" r="5" fill="#10b981"/>
  <text x="40" y="376" fill="#10b981" font-size="11" font-weight="700" font-family="system-ui">u (initial velocity)</text>

  <!-- v annotation -->
  <circle cx="880" cy="220" r="5" fill="#10b981"/>
  <text x="840" y="216" fill="#10b981" font-size="11" font-weight="700" font-family="system-ui">v = u+at</text>

  <!-- slope annotation -->
  <text x="400" y="295" fill="#f59e0b" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui">Slope = a (acceleration)</text>
  
  <!-- area annotation -->
  <text x="450" y="395" fill="#6366f1" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Shaded Area = s = displacement</text>

  <!-- Stat strip -->
  <rect x="20" y="430" width="860" height="58" rx="10" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
  <text x="100" y="454" fill="#10b981" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui">FREE FALL</text>
  <text x="100" y="470" fill="#e2e8f0" font-size="11" text-anchor="middle" font-family="system-ui">a = g = 9.8 m/s²</text>
  <text x="300" y="454" fill="#818cf8" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui">MAX HEIGHT</text>
  <text x="300" y="470" fill="#e2e8f0" font-size="11" text-anchor="middle" font-family="system-ui">H = u²/2g</text>
  <text x="500" y="454" fill="#fbbf24" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui">TIME OF FLIGHT</text>
  <text x="500" y="470" fill="#e2e8f0" font-size="11" text-anchor="middle" font-family="system-ui">T = 2u/g</text>
  <text x="700" y="454" fill="#fb7185" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui">RETARDATION</text>
  <text x="700" y="470" fill="#e2e8f0" font-size="11" text-anchor="middle" font-family="system-ui">a = negative (−ve)</text>
  <text x="860" y="454" fill="#c084fc" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui">ATWOOD</text>
  <text x="860" y="470" fill="#e2e8f0" font-size="11" text-anchor="middle" font-family="system-ui">a=(m₁-m₂)g/(m₁+m₂)</text>
</svg>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. CELL ORGANELLE INFOGRAPHIC — icon badge cards with function labels
// ─────────────────────────────────────────────────────────────────────────────
export function generateCellOrganelleInfographic() {
  return `<svg viewBox="0 0 920 520" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="coBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/>
      <stop offset="100%" stop-color="#071428"/>
    </linearGradient>
  </defs>
  <rect width="920" height="520" fill="url(#coBg)" rx="16"/>

  <!-- Title -->
  <text x="460" y="34" fill="#f8fafc" font-size="18" font-weight="800" text-anchor="middle" font-family="system-ui">🔬 CELL ORGANELLES — Function &amp; Key Facts</text>
  <text x="460" y="54" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">NEET Biology · Cell Structure &amp; Function · Eukaryotic Cell</text>

  <!-- Organelle cards: 4 per row -->
  <!-- Row 1 -->

  <!-- Nucleus -->
  <rect x="10" y="68" width="210" height="130" rx="12" fill="#0f172a" stroke="#6366f1" stroke-width="1.8"/>
  <circle cx="50" cy="98" r="18" fill="#4f46e5" opacity="0.8"/>
  <text x="50" y="104" fill="white" font-size="20" text-anchor="middle" font-family="system-ui">🧬</text>
  <text x="130" y="94" fill="#818cf8" font-size="14" font-weight="800" font-family="system-ui">Nucleus</text>
  <text x="130" y="110" fill="#94a3b8" font-size="10" font-family="system-ui">Control centre of cell</text>
  <line x1="20" y1="120" x2="210" y2="120" stroke="#1e293b" stroke-width="1"/>
  <text x="20" y="136" fill="#e2e8f0" font-size="10" font-family="system-ui">• Houses DNA + chromosomes</text>
  <text x="20" y="150" fill="#e2e8f0" font-size="10" font-family="system-ui">• Nucleolus: rRNA synthesis</text>
  <text x="20" y="164" fill="#e2e8f0" font-size="10" font-family="system-ui">• Double membrane; nuclear pores</text>
  <text x="20" y="186" fill="#f43f5e" font-size="10" font-family="system-ui">⚠ Absent in RBC (mature mammalian)</text>

  <!-- Mitochondria -->
  <rect x="232" y="68" width="210" height="130" rx="12" fill="#0f172a" stroke="#10b981" stroke-width="1.8"/>
  <circle cx="272" cy="98" r="18" fill="#059669" opacity="0.8"/>
  <text x="272" y="104" fill="white" font-size="20" text-anchor="middle" font-family="system-ui">⚡</text>
  <text x="352" y="94" fill="#10b981" font-size="14" font-weight="800" font-family="system-ui">Mitochondria</text>
  <text x="352" y="110" fill="#94a3b8" font-size="10" font-family="system-ui">Powerhouse of cell</text>
  <line x1="242" y1="120" x2="432" y2="120" stroke="#1e293b" stroke-width="1"/>
  <text x="242" y="136" fill="#e2e8f0" font-size="10" font-family="system-ui">• Site of ATP synthesis (Krebs + ETC)</text>
  <text x="242" y="150" fill="#e2e8f0" font-size="10" font-family="system-ui">• Cristae: inner folded membrane</text>
  <text x="242" y="164" fill="#e2e8f0" font-size="10" font-family="system-ui">• Has own DNA + 70S ribosomes</text>
  <text x="242" y="186" fill="#f43f5e" font-size="10" font-family="system-ui">⚠ Semi-autonomous organelle</text>

  <!-- Golgi Apparatus -->
  <rect x="454" y="68" width="210" height="130" rx="12" fill="#0f172a" stroke="#f59e0b" stroke-width="1.8"/>
  <circle cx="494" cy="98" r="18" fill="#b45309" opacity="0.8"/>
  <text x="494" y="104" fill="white" font-size="20" text-anchor="middle" font-family="system-ui">📦</text>
  <text x="574" y="94" fill="#fbbf24" font-size="14" font-weight="800" font-family="system-ui">Golgi Body</text>
  <text x="574" y="110" fill="#94a3b8" font-size="10" font-family="system-ui">Packaging &amp; dispatch centre</text>
  <line x1="464" y1="120" x2="654" y2="120" stroke="#1e293b" stroke-width="1"/>
  <text x="464" y="136" fill="#e2e8f0" font-size="10" font-family="system-ui">• Modifies &amp; sorts proteins/lipids</text>
  <text x="464" y="150" fill="#e2e8f0" font-size="10" font-family="system-ui">• Cisternae: stacked flat sacs</text>
  <text x="464" y="164" fill="#e2e8f0" font-size="10" font-family="system-ui">• Forms lysosomes &amp; secretory vesicles</text>
  <text x="464" y="186" fill="#f43f5e" font-size="10" font-family="system-ui">⚠ Cis = ER side; Trans = cell surface</text>

  <!-- Lysosome -->
  <rect x="676" y="68" width="234" height="130" rx="12" fill="#0f172a" stroke="#f43f5e" stroke-width="1.8"/>
  <circle cx="716" cy="98" r="18" fill="#be123c" opacity="0.8"/>
  <text x="716" y="104" fill="white" font-size="20" text-anchor="middle" font-family="system-ui">🗑</text>
  <text x="800" y="94" fill="#fb7185" font-size="14" font-weight="800" font-family="system-ui">Lysosome</text>
  <text x="800" y="110" fill="#94a3b8" font-size="10" font-family="system-ui">Suicidal bag of cell</text>
  <line x1="686" y1="120" x2="900" y2="120" stroke="#1e293b" stroke-width="1"/>
  <text x="686" y="136" fill="#e2e8f0" font-size="10" font-family="system-ui">• Contains hydrolytic enzymes</text>
  <text x="686" y="150" fill="#e2e8f0" font-size="10" font-family="system-ui">• Autolysis: self-digestion</text>
  <text x="686" y="164" fill="#e2e8f0" font-size="10" font-family="system-ui">• pH ~5 (acidic lumen)</text>
  <text x="686" y="186" fill="#f43f5e" font-size="10" font-family="system-ui">⚠ Autophagic vacuole in starvation</text>

  <!-- Row 2 -->

  <!-- Endoplasmic Reticulum -->
  <rect x="10" y="214" width="210" height="130" rx="12" fill="#0f172a" stroke="#8b5cf6" stroke-width="1.8"/>
  <circle cx="50" cy="244" r="18" fill="#7c3aed" opacity="0.8"/>
  <text x="50" y="250" fill="white" font-size="20" text-anchor="middle" font-family="system-ui">🌐</text>
  <text x="130" y="240" fill="#c084fc" font-size="13" font-weight="800" font-family="system-ui">Endoplasmic ER</text>
  <text x="130" y="256" fill="#94a3b8" font-size="10" font-family="system-ui">Intracellular highway</text>
  <line x1="20" y1="266" x2="210" y2="266" stroke="#1e293b" stroke-width="1"/>
  <text x="20" y="282" fill="#e2e8f0" font-size="10" font-family="system-ui">• Rough ER (RER): has ribosomes</text>
  <text x="20" y="296" fill="#e2e8f0" font-size="10" font-family="system-ui">• Smooth ER (SER): lipid synthesis</text>
  <text x="20" y="310" fill="#e2e8f0" font-size="10" font-family="system-ui">• RER: secretory protein synthesis</text>
  <text x="20" y="332" fill="#f43f5e" font-size="10" font-family="system-ui">⚠ Sarcoplasmic ER in muscle = Ca²⁺ store</text>

  <!-- Ribosome -->
  <rect x="232" y="214" width="210" height="130" rx="12" fill="#0f172a" stroke="#06b6d4" stroke-width="1.8"/>
  <circle cx="272" cy="244" r="18" fill="#0891b2" opacity="0.8"/>
  <text x="272" y="250" fill="white" font-size="20" text-anchor="middle" font-family="system-ui">🔩</text>
  <text x="352" y="240" fill="#22d3ee" font-size="14" font-weight="800" font-family="system-ui">Ribosome</text>
  <text x="352" y="256" fill="#94a3b8" font-size="10" font-family="system-ui">Protein factory</text>
  <line x1="242" y1="266" x2="432" y2="266" stroke="#1e293b" stroke-width="1"/>
  <text x="242" y="282" fill="#e2e8f0" font-size="10" font-family="system-ui">• Prokaryote: 70S (30S + 50S)</text>
  <text x="242" y="296" fill="#e2e8f0" font-size="10" font-family="system-ui">• Eukaryote: 80S (40S + 60S)</text>
  <text x="242" y="310" fill="#e2e8f0" font-size="10" font-family="system-ui">• Composed of rRNA + protein</text>
  <text x="242" y="332" fill="#f43f5e" font-size="10" font-family="system-ui">⚠ 70S in mitochondria &amp; chloroplast</text>

  <!-- Chloroplast -->
  <rect x="454" y="214" width="210" height="130" rx="12" fill="#0f172a" stroke="#84cc16" stroke-width="1.8"/>
  <circle cx="494" cy="244" r="18" fill="#65a30d" opacity="0.8"/>
  <text x="494" y="250" fill="white" font-size="20" text-anchor="middle" font-family="system-ui">🌿</text>
  <text x="574" y="240" fill="#a3e635" font-size="14" font-weight="800" font-family="system-ui">Chloroplast</text>
  <text x="574" y="256" fill="#94a3b8" font-size="10" font-family="system-ui">Solar energy converter</text>
  <line x1="464" y1="266" x2="654" y2="266" stroke="#1e293b" stroke-width="1"/>
  <text x="464" y="282" fill="#e2e8f0" font-size="10" font-family="system-ui">• Thylakoid: light reactions</text>
  <text x="464" y="296" fill="#e2e8f0" font-size="10" font-family="system-ui">• Stroma: Calvin cycle (CO₂ fixation)</text>
  <text x="464" y="310" fill="#e2e8f0" font-size="10" font-family="system-ui">• Has 70S ribosomes + own DNA</text>
  <text x="464" y="332" fill="#f43f5e" font-size="10" font-family="system-ui">⚠ Only in plant &amp; algal cells</text>

  <!-- Centrosome / Centriole -->
  <rect x="676" y="214" width="234" height="130" rx="12" fill="#0f172a" stroke="#f97316" stroke-width="1.8"/>
  <circle cx="716" cy="244" r="18" fill="#c2410c" opacity="0.8"/>
  <text x="716" y="250" fill="white" font-size="20" text-anchor="middle" font-family="system-ui">⭕</text>
  <text x="800" y="240" fill="#fb923c" font-size="14" font-weight="800" font-family="system-ui">Centrosome</text>
  <text x="800" y="256" fill="#94a3b8" font-size="10" font-family="system-ui">Cell division director</text>
  <line x1="686" y1="266" x2="900" y2="266" stroke="#1e293b" stroke-width="1"/>
  <text x="686" y="282" fill="#e2e8f0" font-size="10" font-family="system-ui">• Centrioles: 9+0 microtubule triplets</text>
  <text x="686" y="296" fill="#e2e8f0" font-size="10" font-family="system-ui">• Forms spindle fibres during mitosis</text>
  <text x="686" y="310" fill="#e2e8f0" font-size="10" font-family="system-ui">• Absent in higher plant cells</text>
  <text x="686" y="332" fill="#f43f5e" font-size="10" font-family="system-ui">⚠ Flagella/cilia: 9+2 microtubule doublets</text>

  <!-- Bottom Summary Row -->
  <rect x="10" y="358" width="900" height="150" rx="12" fill="#0a1628" stroke="#1e293b" stroke-width="1"/>
  <text x="460" y="378" fill="#94a3b8" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui">COMPARATIVE SUMMARY TABLE</text>

  <!-- Headers -->
  <text x="80" y="398" fill="#818cf8" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Feature</text>
  <text x="250" y="398" fill="#818cf8" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Prokaryote</text>
  <text x="420" y="398" fill="#818cf8" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Eukaryote (Animal)</text>
  <text x="620" y="398" fill="#818cf8" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Eukaryote (Plant)</text>
  <text x="820" y="398" fill="#818cf8" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Speciality</text>
  <line x1="20" y1="404" x2="900" y2="404" stroke="#334155" stroke-width="1"/>

  <text x="80" y="420" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="system-ui">Cell Wall</text>
  <text x="250" y="420" fill="#10b981" font-size="10" text-anchor="middle" font-family="system-ui">✓ Peptidoglycan</text>
  <text x="420" y="420" fill="#f43f5e" font-size="10" text-anchor="middle" font-family="system-ui">✗ Absent</text>
  <text x="620" y="420" fill="#10b981" font-size="10" text-anchor="middle" font-family="system-ui">✓ Cellulose</text>
  <text x="820" y="420" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Fungi: Chitin</text>

  <text x="80" y="438" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="system-ui">Nucleus</text>
  <text x="250" y="438" fill="#f43f5e" font-size="10" text-anchor="middle" font-family="system-ui">✗ Nucleoid region</text>
  <text x="420" y="438" fill="#10b981" font-size="10" text-anchor="middle" font-family="system-ui">✓ Membrane-bound</text>
  <text x="620" y="438" fill="#10b981" font-size="10" text-anchor="middle" font-family="system-ui">✓ Membrane-bound</text>
  <text x="820" y="438" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">True nucleus = Eukaryote</text>

  <text x="80" y="456" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="system-ui">Ribosome</text>
  <text x="250" y="456" fill="#fbbf24" font-size="10" text-anchor="middle" font-family="system-ui">70S</text>
  <text x="420" y="456" fill="#fbbf24" font-size="10" text-anchor="middle" font-family="system-ui">80S cytoplasmic</text>
  <text x="620" y="456" fill="#fbbf24" font-size="10" text-anchor="middle" font-family="system-ui">80S + 70S in chloro</text>
  <text x="820" y="456" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">S = Svedberg unit</text>

  <text x="80" y="474" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="system-ui">Mitochondria</text>
  <text x="250" y="474" fill="#f43f5e" font-size="10" text-anchor="middle" font-family="system-ui">✗ Absent</text>
  <text x="420" y="474" fill="#10b981" font-size="10" text-anchor="middle" font-family="system-ui">✓ Present</text>
  <text x="620" y="474" fill="#10b981" font-size="10" text-anchor="middle" font-family="system-ui">✓ Present</text>
  <text x="820" y="474" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">ATP via OXPHOS</text>

  <text x="80" y="492" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="system-ui">Chloroplast</text>
  <text x="250" y="492" fill="#f43f5e" font-size="10" text-anchor="middle" font-family="system-ui">✗ Absent</text>
  <text x="420" y="492" fill="#f43f5e" font-size="10" text-anchor="middle" font-family="system-ui">✗ Absent</text>
  <text x="620" y="492" fill="#10b981" font-size="10" text-anchor="middle" font-family="system-ui">✓ Present</text>
  <text x="820" y="492" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Photosynthesis only</text>
  <text x="80" y="510" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="system-ui">Size</text>
  <text x="250" y="510" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">1–10 μm</text>
  <text x="420" y="510" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">10–100 μm</text>
  <text x="620" y="510" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">10–100 μm</text>
  <text x="820" y="510" fill="#f43f5e" font-size="10" text-anchor="middle" font-family="system-ui">Prokaryote always smaller</text>
</svg>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. DNA INFOGRAPHIC — Chargaff rules, base pair stats, helix dimensions
// ─────────────────────────────────────────────────────────────────────────────
export function generateDNAInfographic() {
  return `<svg viewBox="0 0 900 480" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="dnaBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/>
      <stop offset="100%" stop-color="#071428"/>
    </linearGradient>
  </defs>
  <rect width="900" height="480" fill="url(#dnaBg)" rx="16"/>

  <!-- Title -->
  <text x="450" y="34" fill="#f8fafc" font-size="18" font-weight="800" text-anchor="middle" font-family="system-ui">🧬 DNA STRUCTURE — Molecular Infographic</text>
  <text x="450" y="54" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">NEET Biology · Molecular Basis of Inheritance · Watson-Crick Model</text>

  <!-- Left: Chargaff Rule Bar Chart -->
  <text x="20" y="78" fill="#818cf8" font-size="13" font-weight="700" font-family="system-ui">CHARGAFF'S RULE — Base Pairing %</text>
  <text x="20" y="94" fill="#64748b" font-size="10" font-family="system-ui">[A] = [T] and [G] = [C] in any dsDNA</text>

  <!-- A bar -->
  <rect x="20" y="104" width="200" height="28" rx="6" fill="#10b981" opacity="0.9"/>
  <text x="30" y="123" fill="white" font-size="14" font-weight="800" font-family="system-ui">A (Adenine)</text>
  <text x="210" y="123" fill="#10b981" font-size="14" font-weight="800" font-family="system-ui">30%</text>

  <!-- T bar -->
  <rect x="20" y="140" width="200" height="28" rx="6" fill="#34d399" opacity="0.9"/>
  <text x="30" y="159" fill="white" font-size="14" font-weight="800" font-family="system-ui">T (Thymine)</text>
  <text x="210" y="159" fill="#34d399" font-size="14" font-weight="800" font-family="system-ui">30%</text>

  <!-- G bar -->
  <rect x="20" y="176" width="160" height="28" rx="6" fill="#6366f1" opacity="0.9"/>
  <text x="30" y="195" fill="white" font-size="14" font-weight="800" font-family="system-ui">G (Guanine)</text>
  <text x="172" y="195" fill="#818cf8" font-size="14" font-weight="800" font-family="system-ui">20%</text>

  <!-- C bar -->
  <rect x="20" y="212" width="160" height="28" rx="6" fill="#818cf8" opacity="0.9"/>
  <text x="30" y="231" fill="white" font-size="14" font-weight="800" font-family="system-ui">C (Cytosine)</text>
  <text x="172" y="231" fill="#c7d2fe" font-size="14" font-weight="800" font-family="system-ui">20%</text>

  <!-- Hydrogen bond counts -->
  <text x="20" y="264" fill="#f59e0b" font-size="13" font-weight="700" font-family="system-ui">HYDROGEN BONDS</text>
  <rect x="20" y="274" width="230" height="40" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
  <text x="135" y="292" fill="white" font-size="13" font-weight="800" text-anchor="middle" font-family="monospace">A = T  → 2 H-bonds</text>
  <text x="135" y="307" fill="#10b981" font-size="11" text-anchor="middle" font-family="system-ui">Weaker; easier to denature</text>

  <rect x="20" y="322" width="230" height="40" rx="10" fill="#0f172a" stroke="#6366f1" stroke-width="1.5"/>
  <text x="135" y="340" fill="white" font-size="13" font-weight="800" text-anchor="middle" font-family="monospace">G ≡ C  → 3 H-bonds</text>
  <text x="135" y="355" fill="#818cf8" font-size="11" text-anchor="middle" font-family="system-ui">Stronger; higher Tm</text>

  <rect x="20" y="370" width="230" height="38" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="135" y="386" fill="#fbbf24" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Higher G+C → higher melting temp (Tm)</text>
  <text x="135" y="400" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Tm ↑ with G≡C content</text>

  <!-- Middle: Helix Dimension stat cards -->
  <text x="300" y="78" fill="#f43f5e" font-size="13" font-weight="700" font-family="system-ui">WATSON-CRICK B-DNA DIMENSIONS</text>
  
  <!-- Stat card: Pitch -->
  <rect x="300" y="88" width="140" height="78" rx="12" fill="#0f172a" stroke="#f43f5e" stroke-width="1.5"/>
  <text x="370" y="114" fill="#f43f5e" font-size="30" font-weight="900" text-anchor="middle" font-family="monospace">3.4</text>
  <text x="370" y="130" fill="#fb7185" font-size="13" font-weight="700" text-anchor="middle" font-family="system-ui">nm</text>
  <text x="370" y="156" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Pitch (1 full turn)</text>

  <!-- Stat card: Rise per bp -->
  <rect x="454" y="88" width="140" height="78" rx="12" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
  <text x="524" y="114" fill="#10b981" font-size="30" font-weight="900" text-anchor="middle" font-family="monospace">0.34</text>
  <text x="524" y="130" fill="#34d399" font-size="13" font-weight="700" text-anchor="middle" font-family="system-ui">nm</text>
  <text x="524" y="156" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Rise per base pair</text>

  <!-- Stat card: BPs per turn -->
  <rect x="300" y="178" width="140" height="78" rx="12" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="370" y="204" fill="#fbbf24" font-size="30" font-weight="900" text-anchor="middle" font-family="monospace">10</text>
  <text x="370" y="220" fill="#f59e0b" font-size="13" font-weight="700" text-anchor="middle" font-family="system-ui">bp</text>
  <text x="370" y="246" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Base pairs per turn</text>

  <!-- Stat card: Diameter -->
  <rect x="454" y="178" width="140" height="78" rx="12" fill="#0f172a" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="524" y="204" fill="#c084fc" font-size="30" font-weight="900" text-anchor="middle" font-family="monospace">2</text>
  <text x="524" y="220" fill="#8b5cf6" font-size="13" font-weight="700" text-anchor="middle" font-family="system-ui">nm</text>
  <text x="524" y="246" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Helix diameter</text>

  <!-- Purine vs Pyrimidine -->
  <text x="300" y="278" fill="#06b6d4" font-size="13" font-weight="700" font-family="system-ui">PURINE vs PYRIMIDINE</text>
  <rect x="300" y="288" width="140" height="88" rx="10" fill="#0f172a" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="370" y="308" fill="#22d3ee" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">PURINES</text>
  <text x="370" y="326" fill="#e2e8f0" font-size="12" text-anchor="middle" font-family="monospace">A, G</text>
  <text x="370" y="344" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Double ring structure</text>
  <text x="370" y="360" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Larger molecular size</text>
  <text x="370" y="372" fill="#f43f5e" font-size="10" text-anchor="middle" font-family="system-ui">Remember: PURe As Gold</text>
  
  <rect x="454" y="288" width="140" height="88" rx="10" fill="#0f172a" stroke="#f97316" stroke-width="1.5"/>
  <text x="524" y="308" fill="#fb923c" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">PYRIMIDINES</text>
  <text x="524" y="326" fill="#e2e8f0" font-size="12" text-anchor="middle" font-family="monospace">C, T (U in RNA)</text>
  <text x="524" y="344" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Single ring structure</text>
  <text x="524" y="360" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Smaller molecular size</text>
  <text x="524" y="372" fill="#f43f5e" font-size="10" text-anchor="middle" font-family="system-ui">Remember: CUT the PY</text>

  <!-- Right: Central Dogma flow -->
  <text x="640" y="78" fill="#10b981" font-size="13" font-weight="700" font-family="system-ui">CENTRAL DOGMA</text>
  <rect x="640" y="88" width="240" height="50" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
  <text x="760" y="118" fill="white" font-size="14" font-weight="800" text-anchor="middle" font-family="monospace">DNA → RNA → Protein</text>

  <!-- Arrow flows -->
  <text x="760" y="156" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Replication (DNA → DNA)</text>
  <rect x="640" y="162" width="240" height="34" rx="8" fill="#059669" opacity="0.7"/>
  <text x="760" y="183" fill="white" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">DNA → DNA (DNA polymerase)</text>

  <text x="760" y="210" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Transcription (DNA → RNA)</text>
  <rect x="640" y="216" width="240" height="34" rx="8" fill="#4f46e5" opacity="0.7"/>
  <text x="760" y="237" fill="white" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">DNA → mRNA (RNA polymerase)</text>

  <text x="760" y="264" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Translation (RNA → Protein)</text>
  <rect x="640" y="270" width="240" height="34" rx="8" fill="#b45309" opacity="0.7"/>
  <text x="760" y="291" fill="white" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">mRNA → Protein (Ribosome)</text>

  <!-- Exceptions -->
  <rect x="640" y="316" width="240" height="68" rx="10" fill="#0f172a" stroke="#f43f5e" stroke-width="1.5"/>
  <text x="760" y="334" fill="#f43f5e" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui">EXCEPTIONS (Temin's)</text>
  <text x="650" y="350" fill="#e2e8f0" font-size="10" font-family="system-ui">• Reverse transcription: RNA → DNA</text>
  <text x="650" y="364" fill="#e2e8f0" font-size="10" font-family="system-ui">  (Retroviruses like HIV)</text>
  <text x="650" y="378" fill="#e2e8f0" font-size="10" font-family="system-ui">• RNA → RNA (RNA viruses: Replicase)</text>

  <!-- Bottom NEET tips -->
  <rect x="20" y="418" width="860" height="52" rx="10" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
  <text x="440" y="436" fill="#f59e0b" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui">🎯 TOP NEET POINTS</text>
  <text x="100" y="456" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="system-ui">A+G = C+T always</text>
  <text x="260" y="456" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="system-ui">DNA is antiparallel (5'→3' and 3'→5')</text>
  <text x="460" y="456" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="system-ui">Meselson-Stahl proved semi-conservative replication</text>
  <text x="680" y="456" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="system-ui">Okazaki fragments on lagging strand</text>
  <text x="860" y="456" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="system-ui">RNA has U, not T</text>
</svg>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. PERIODIC TRENDS INFOGRAPHIC
// ─────────────────────────────────────────────────────────────────────────────
export function generatePeriodicTrendsInfographic() {
  return `<svg viewBox="0 0 900 460" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="ptBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/>
      <stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
  </defs>
  <rect width="900" height="460" fill="url(#ptBg)" rx="16"/>

  <text x="450" y="34" fill="#f8fafc" font-size="18" font-weight="800" text-anchor="middle" font-family="system-ui">⚗ PERIODIC TRENDS INFOGRAPHIC</text>
  <text x="450" y="54" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">NEET Chemistry · Classification of Elements · Periodic Properties</text>

  <!-- Period trend arrows (left-right) -->
  <text x="450" y="80" fill="#f59e0b" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui">↔  ACROSS A PERIOD (Left → Right)  ↔</text>

  <!-- Property cards across a period -->
  <!-- Atomic Radius -->
  <rect x="10" y="90" width="200" height="90" rx="12" fill="#0f172a" stroke="#f43f5e" stroke-width="1.5"/>
  <text x="110" y="112" fill="#fb7185" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">Atomic Radius</text>
  <text x="110" y="134" fill="white" font-size="22" font-weight="900" text-anchor="middle" font-family="system-ui">↓ Decreases</text>
  <text x="110" y="154" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">More protons pull e⁻ closer</text>
  <text x="110" y="170" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">Na &gt; Mg &gt; Al &gt; Si &gt; P &gt; S &gt; Cl</text>

  <!-- Ionization Energy -->
  <rect x="225" y="90" width="200" height="90" rx="12" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
  <text x="325" y="112" fill="#10b981" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">Ionization Energy</text>
  <text x="325" y="134" fill="white" font-size="22" font-weight="900" text-anchor="middle" font-family="system-ui">↑ Increases</text>
  <text x="325" y="154" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">More nuclear charge, smaller radius</text>
  <text x="325" y="170" fill="#f43f5e" font-size="10" text-anchor="middle" font-family="system-ui">⚠ N &gt; O exception (half-filled 2p)</text>

  <!-- Electronegativity -->
  <rect x="440" y="90" width="200" height="90" rx="12" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="540" y="112" fill="#fbbf24" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">Electronegativity</text>
  <text x="540" y="134" fill="white" font-size="22" font-weight="900" text-anchor="middle" font-family="system-ui">↑ Increases</text>
  <text x="540" y="154" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">F is highest (3.98 Pauling)</text>
  <text x="540" y="170" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">F &gt; O &gt; N &gt; Cl &gt; Br</text>

  <!-- Electron Affinity -->
  <rect x="655" y="90" width="235" height="90" rx="12" fill="#0f172a" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="772" y="112" fill="#c084fc" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">Electron Affinity</text>
  <text x="772" y="134" fill="white" font-size="22" font-weight="900" text-anchor="middle" font-family="system-ui">↑ Increases</text>
  <text x="772" y="154" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Cl highest EA (not F!)</text>
  <text x="772" y="170" fill="#f43f5e" font-size="10" text-anchor="middle" font-family="system-ui">⚠ F exception: small size, e-e repulsion</text>

  <!-- Group trend arrows (top-bottom) -->
  <text x="450" y="202" fill="#06b6d4" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui">↕  DOWN A GROUP (Top → Bottom)  ↕</text>

  <!-- Group cards -->
  <!-- Atomic Radius -->
  <rect x="10" y="212" width="200" height="90" rx="12" fill="#0f172a" stroke="#f43f5e" stroke-width="1.5"/>
  <text x="110" y="234" fill="#fb7185" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">Atomic Radius</text>
  <text x="110" y="256" fill="white" font-size="22" font-weight="900" text-anchor="middle" font-family="system-ui">↑ Increases</text>
  <text x="110" y="276" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">New shells added</text>
  <text x="110" y="292" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">Li &lt; Na &lt; K &lt; Rb &lt; Cs</text>

  <!-- Ionization Energy -->
  <rect x="225" y="212" width="200" height="90" rx="12" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
  <text x="325" y="234" fill="#10b981" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">Ionization Energy</text>
  <text x="325" y="256" fill="white" font-size="22" font-weight="900" text-anchor="middle" font-family="system-ui">↓ Decreases</text>
  <text x="325" y="276" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">More shielding, larger radius</text>
  <text x="325" y="292" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">Li &gt; Na &gt; K &gt; Rb &gt; Cs</text>

  <!-- Electronegativity -->
  <rect x="440" y="212" width="200" height="90" rx="12" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="540" y="234" fill="#fbbf24" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">Electronegativity</text>
  <text x="540" y="256" fill="white" font-size="22" font-weight="900" text-anchor="middle" font-family="system-ui">↓ Decreases</text>
  <text x="540" y="276" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Greater atomic size</text>
  <text x="540" y="292" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">F &gt; Cl &gt; Br &gt; I &gt; At</text>

  <!-- Metallic Character -->
  <rect x="655" y="212" width="235" height="90" rx="12" fill="#0f172a" stroke="#f97316" stroke-width="1.5"/>
  <text x="772" y="234" fill="#fb923c" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">Metallic Character</text>
  <text x="772" y="256" fill="white" font-size="22" font-weight="900" text-anchor="middle" font-family="system-ui">↑ Increases</text>
  <text x="772" y="276" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Easier to lose electrons</text>
  <text x="772" y="292" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">Fr is most metallic</text>

  <!-- Summary visual: periodic table trend arrows -->
  <rect x="10" y="318" width="880" height="130" rx="12" fill="#0a1628" stroke="#1e293b" stroke-width="1"/>
  <text x="450" y="338" fill="#94a3b8" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui">PERIODIC TABLE TREND OVERVIEW</text>
  
  <!-- Mini table representation -->
  <rect x="20" y="348" width="860" height="88" rx="8" fill="#030712"/>

  <!-- Gradient box left-to-right: atomic radius decreases -->
  <rect x="30" y="358" width="840" height="20" rx="4" fill="url(#ptBg)" opacity="0.6"/>
  <text x="30" y="372" fill="#f43f5e" font-size="11" font-weight="700" font-family="system-ui">←── ATOMIC RADIUS INCREASES ──</text>
  <text x="700" y="372" fill="#f43f5e" font-size="11" font-weight="700" font-family="system-ui">DECREASES ──→</text>

  <text x="30" y="395" fill="#10b981" font-size="11" font-weight="700" font-family="system-ui">←── IE, EN, EA DECREASE ──</text>
  <text x="650" y="395" fill="#10b981" font-size="11" font-weight="700" font-family="system-ui">INCREASE (across period) ──→</text>

  <text x="30" y="416" fill="#f59e0b" font-size="11" font-weight="700" font-family="system-ui">↑ Metallic char. increases DOWN group | Non-metallic char. increases UP &amp; RIGHT →</text>

  <text x="30" y="434" fill="#8b5cf6" font-size="11" font-weight="700" font-family="system-ui">Most EN: F (3.98) | Least EN: Fr | Highest IE: He | Lowest IE: Cs | Largest atom: Cs</text>
</svg>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. PHOTOSYNTHESIS INFOGRAPHIC — Light reactions vs Calvin cycle
// ─────────────────────────────────────────────────────────────────────────────
export function generatePhotosynthesisInfographic() {
  return `<svg viewBox="0 0 920 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="psBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/>
      <stop offset="100%" stop-color="#071428"/>
    </linearGradient>
    <linearGradient id="lightRxn" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0d3b2a"/>
      <stop offset="100%" stop-color="#0a2416"/>
    </linearGradient>
    <linearGradient id="calvinRxn" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#0f0d2e"/>
    </linearGradient>
  </defs>
  <rect width="920" height="500" fill="url(#psBg)" rx="16"/>

  <!-- Title -->
  <text x="460" y="34" fill="#f8fafc" font-size="18" font-weight="800" text-anchor="middle" font-family="system-ui">🌿 PHOTOSYNTHESIS — Complete Infographic</text>
  <text x="460" y="54" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">NEET Biology · Plant Physiology · Light &amp; Dark Reactions</text>

  <!-- Overall equation -->
  <rect x="10" y="64" width="900" height="36" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
  <text x="460" y="87" fill="white" font-size="14" font-weight="800" text-anchor="middle" font-family="monospace">6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂</text>

  <!-- Left Panel: Light Reactions (Thylakoid) -->
  <rect x="10" y="108" width="430" height="360" rx="14" fill="url(#lightRxn)" stroke="#10b981" stroke-width="2"/>
  <rect x="10" y="108" width="430" height="38" rx="14" fill="#059669"/>
  <rect x="10" y="130" width="430" height="16" fill="#059669"/>
  <text x="225" y="134" fill="white" font-size="14" font-weight="800" text-anchor="middle" font-family="system-ui">☀ LIGHT REACTIONS (Thylakoid Membrane)</text>

  <!-- Inputs -->
  <text x="30" y="162" fill="#94a3b8" font-size="11" font-weight="700" font-family="system-ui">INPUTS:</text>
  <rect x="30" y="168" width="80" height="26" rx="8" fill="#0d4a38"/>
  <text x="70" y="185" fill="#6ee7b7" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">H₂O</text>
  <rect x="122" y="168" width="100" height="26" rx="8" fill="#0d4a38"/>
  <text x="172" y="185" fill="#6ee7b7" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Light (hν)</text>
  <rect x="234" y="168" width="80" height="26" rx="8" fill="#0d4a38"/>
  <text x="274" y="185" fill="#6ee7b7" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">ADP+Pi</text>
  <rect x="326" y="168" width="100" height="26" rx="8" fill="#0d4a38"/>
  <text x="376" y="185" fill="#6ee7b7" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">NADP⁺</text>

  <!-- Process steps -->
  <text x="225" y="218" fill="#34d399" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui">PHOTOSYSTEMS</text>
  
  <rect x="30" y="224" width="180" height="56" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
  <text x="120" y="244" fill="#10b981" font-size="12" font-weight="800" text-anchor="middle" font-family="system-ui">PS II</text>
  <text x="120" y="260" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="system-ui">680 nm (P₆₈₀)</text>
  <text x="120" y="274" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Water splitting → O₂</text>

  <rect x="230" y="224" width="190" height="56" rx="10" fill="#0f172a" stroke="#34d399" stroke-width="1.5"/>
  <text x="325" y="244" fill="#34d399" font-size="12" font-weight="800" text-anchor="middle" font-family="system-ui">PS I</text>
  <text x="325" y="260" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="system-ui">700 nm (P₇₀₀)</text>
  <text x="325" y="274" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">NADP⁺ → NADPH</text>

  <!-- ETC and ATP synthesis -->
  <text x="225" y="302" fill="#6ee7b7" font-size="11" text-anchor="middle" font-family="system-ui">Electron Transport Chain (ETC) → Chemiosmosis</text>
  <rect x="30" y="308" width="390" height="30" rx="8" fill="#0d4a38" stroke="#6ee7b7" stroke-width="1"/>
  <text x="225" y="327" fill="white" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui">ADP + Pi → ATP  (Photophosphorylation)</text>

  <!-- Outputs -->
  <text x="30" y="356" fill="#94a3b8" font-size="11" font-weight="700" font-family="system-ui">OUTPUTS:</text>
  <rect x="30" y="362" width="80" height="26" rx="8" fill="#134e3c"/>
  <text x="70" y="379" fill="#6ee7b7" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">ATP</text>
  <rect x="122" y="362" width="100" height="26" rx="8" fill="#134e3c"/>
  <text x="172" y="379" fill="#6ee7b7" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">NADPH</text>
  <rect x="234" y="362" width="80" height="26" rx="8" fill="#134e3c"/>
  <text x="274" y="379" fill="#6ee7b7" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">O₂</text>

  <!-- Cyclic / Non-cyclic note -->
  <rect x="30" y="398" width="390" height="56" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="225" y="418" fill="#fbbf24" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Cyclic vs Non-Cyclic Photophosphorylation</text>
  <text x="40" y="436" fill="#e2e8f0" font-size="10" font-family="system-ui">Cyclic: Only PS I, only ATP (no NADPH, no O₂)</text>
  <text x="40" y="450" fill="#e2e8f0" font-size="10" font-family="system-ui">Non-Cyclic: PS I + PS II, ATP + NADPH + O₂</text>

  <!-- Right Panel: Calvin Cycle -->
  <rect x="454" y="108" width="456" height="360" rx="14" fill="url(#calvinRxn)" stroke="#818cf8" stroke-width="2"/>
  <rect x="454" y="108" width="456" height="38" rx="14" fill="#4f46e5"/>
  <rect x="454" y="130" width="456" height="16" fill="#4f46e5"/>
  <text x="682" y="134" fill="white" font-size="14" font-weight="800" text-anchor="middle" font-family="system-ui">🌑 CALVIN CYCLE (Stroma, C3 Pathway)</text>

  <!-- Inputs -->
  <text x="470" y="162" fill="#94a3b8" font-size="11" font-weight="700" font-family="system-ui">INPUTS:</text>
  <rect x="470" y="168" width="80" height="26" rx="8" fill="#1e1b4b"/>
  <text x="510" y="185" fill="#c7d2fe" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">CO₂</text>
  <rect x="562" y="168" width="80" height="26" rx="8" fill="#1e1b4b"/>
  <text x="602" y="185" fill="#c7d2fe" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">ATP</text>
  <rect x="654" y="168" width="100" height="26" rx="8" fill="#1e1b4b"/>
  <text x="704" y="185" fill="#c7d2fe" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">NADPH</text>
  <rect x="766" y="168" width="130" height="26" rx="8" fill="#1e1b4b"/>
  <text x="831" y="185" fill="#c7d2fe" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">RuBP (C5 acceptor)</text>

  <!-- 3 Stages -->
  <text x="682" y="218" fill="#c7d2fe" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui">3 STAGES OF CALVIN CYCLE</text>

  <rect x="468" y="224" width="130" height="68" rx="10" fill="#0f172a" stroke="#818cf8" stroke-width="1.5"/>
  <text x="533" y="244" fill="#818cf8" font-size="12" font-weight="800" text-anchor="middle" font-family="system-ui">① FIXATION</text>
  <text x="533" y="260" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="system-ui">CO₂ + RuBP</text>
  <text x="533" y="274" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">→ 2 × 3-PGA (C3)</text>
  <text x="533" y="286" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">RuBisCO enzyme</text>

  <rect x="614" y="224" width="130" height="68" rx="10" fill="#0f172a" stroke="#6366f1" stroke-width="1.5"/>
  <text x="679" y="244" fill="#6366f1" font-size="12" font-weight="800" text-anchor="middle" font-family="system-ui">② REDUCTION</text>
  <text x="679" y="260" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="system-ui">3-PGA → G3P</text>
  <text x="679" y="274" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Uses ATP + NADPH</text>
  <text x="679" y="286" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">G3P = triose phosphate</text>

  <rect x="762" y="224" width="140" height="68" rx="10" fill="#0f172a" stroke="#a855f7" stroke-width="1.5"/>
  <text x="832" y="244" fill="#a855f7" font-size="12" font-weight="800" text-anchor="middle" font-family="system-ui">③ REGEN</text>
  <text x="832" y="260" fill="#e2e8f0" font-size="10" text-anchor="middle" font-family="system-ui">G3P → RuBP</text>
  <text x="832" y="274" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Uses ATP</text>
  <text x="832" y="286" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">Regenerates acceptor</text>

  <!-- Net per 3 CO₂ -->
  <rect x="468" y="306" width="434" height="40" rx="10" fill="#0d1b35" stroke="#c7d2fe" stroke-width="1"/>
  <text x="685" y="323" fill="#c7d2fe" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">For 3 CO₂: 9 ATP + 6 NADPH consumed → 1 G3P net</text>
  <text x="685" y="339" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">2 G3P → Glucose (6 CO₂ → 1 Glucose = 18 ATP + 12 NADPH)</text>

  <!-- Outputs -->
  <text x="470" y="362" fill="#94a3b8" font-size="11" font-weight="700" font-family="system-ui">OUTPUTS:</text>
  <rect x="470" y="368" width="130" height="26" rx="8" fill="#1e1b4b"/>
  <text x="535" y="385" fill="#c7d2fe" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Glucose (C₆H₁₂O₆)</text>
  <rect x="612" y="368" width="100" height="26" rx="8" fill="#1e1b4b"/>
  <text x="662" y="385" fill="#c7d2fe" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Starch / Sucrose</text>

  <!-- C4 comparison -->
  <rect x="468" y="404" width="434" height="52" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="685" y="422" fill="#fbbf24" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">C4 Plants (Hatch-Slack): CO₂ fixed as OAA (C4)</text>
  <text x="478" y="438" fill="#e2e8f0" font-size="10" font-family="system-ui">Bundle sheath cells do Calvin cycle. Examples: Maize, Sugarcane, Sorghum</text>
  <text x="478" y="450" fill="#f43f5e" font-size="10" font-family="system-ui">⚠ C4 more efficient in hot/arid; PEP carboxylase enzyme (high CO₂ affinity)</text>

  <!-- Bottom fact strip -->
  <rect x="10" y="478" width="900" height="16" rx="8" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
  <text x="450" y="490" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">🎯 NEET: RuBisCO is most abundant protein on Earth · Photosystem discovered by Emerson · CAM plants: stomata open at night</text>
</svg>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. THERMOCHEMISTRY INFOGRAPHIC — Hess's Law + ΔH stat cards
// ─────────────────────────────────────────────────────────────────────────────
export function generateThermochemistryInfographic() {
  return `<svg viewBox="0 0 900 480" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="tcBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/>
      <stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
  </defs>
  <rect width="900" height="480" fill="url(#tcBg)" rx="16"/>

  <text x="450" y="34" fill="#f8fafc" font-size="18" font-weight="800" text-anchor="middle" font-family="system-ui">🔥 THERMOCHEMISTRY &amp; HESS'S LAW</text>
  <text x="450" y="54" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">NEET Chemistry · Thermodynamics · Enthalpy Changes</text>

  <!-- Left: ΔH types stat cards -->
  <text x="20" y="78" fill="#f43f5e" font-size="13" font-weight="700" font-family="system-ui">STANDARD ENTHALPY TYPES</text>

  <!-- Combustion -->
  <rect x="10" y="88" width="200" height="64" rx="10" fill="#0f172a" stroke="#f43f5e" stroke-width="1.5"/>
  <text x="110" y="108" fill="#fb7185" font-size="12" font-weight="800" text-anchor="middle" font-family="system-ui">ΔH°combustion</text>
  <text x="110" y="126" fill="white" font-size="11" text-anchor="middle" font-family="system-ui">Heat released when 1 mol burns</text>
  <text x="110" y="142" fill="#f43f5e" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Always NEGATIVE (exothermic)</text>

  <!-- Formation -->
  <rect x="10" y="162" width="200" height="64" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
  <text x="110" y="182" fill="#10b981" font-size="12" font-weight="800" text-anchor="middle" font-family="system-ui">ΔH°formation</text>
  <text x="110" y="200" fill="white" font-size="11" text-anchor="middle" font-family="system-ui">Forming 1 mol from elements</text>
  <text x="110" y="216" fill="#34d399" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">ΔHf° of elements = 0</text>

  <!-- Atomisation -->
  <rect x="10" y="236" width="200" height="64" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="110" y="256" fill="#fbbf24" font-size="12" font-weight="800" text-anchor="middle" font-family="system-ui">ΔH°atomisation</text>
  <text x="110" y="274" fill="white" font-size="11" text-anchor="middle" font-family="system-ui">Breaking molecule to gas atoms</text>
  <text x="110" y="290" fill="#fbbf24" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Always POSITIVE (endothermic)</text>

  <!-- Neutralisation -->
  <rect x="10" y="310" width="200" height="64" rx="10" fill="#0f172a" stroke="#6366f1" stroke-width="1.5"/>
  <text x="110" y="330" fill="#818cf8" font-size="12" font-weight="800" text-anchor="middle" font-family="system-ui">ΔH°neutralisation</text>
  <text x="110" y="348" fill="white" font-size="11" text-anchor="middle" font-family="system-ui">Strong acid + strong base</text>
  <text x="110" y="364" fill="#818cf8" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">≈ −57.1 kJ/mol always</text>

  <!-- Solution -->
  <rect x="10" y="384" width="200" height="64" rx="10" fill="#0f172a" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="110" y="404" fill="#c084fc" font-size="12" font-weight="800" text-anchor="middle" font-family="system-ui">ΔH°solution</text>
  <text x="110" y="422" fill="white" font-size="11" text-anchor="middle" font-family="system-ui">Dissolving 1 mol in solvent</text>
  <text x="110" y="438" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Can be + or − (endothermic/exo)</text>

  <!-- Middle: Hess's Law triangle diagram -->
  <text x="450" y="78" fill="#06b6d4" font-size="13" font-weight="700" text-anchor="middle" font-family="system-ui">HESS'S LAW CYCLE</text>
  <text x="450" y="94" fill="#64748b" font-size="10" text-anchor="middle" font-family="system-ui">Total enthalpy change is path-independent</text>

  <!-- Triangle nodes -->
  <!-- A: top left -->
  <rect x="230" y="104" width="100" height="40" rx="10" fill="#0f172a" stroke="#06b6d4" stroke-width="2"/>
  <text x="280" y="129" fill="#22d3ee" font-size="14" font-weight="800" text-anchor="middle" font-family="monospace">A</text>
  
  <!-- B: top right -->
  <rect x="570" y="104" width="100" height="40" rx="10" fill="#0f172a" stroke="#06b6d4" stroke-width="2"/>
  <text x="620" y="129" fill="#22d3ee" font-size="14" font-weight="800" text-anchor="middle" font-family="monospace">B</text>

  <!-- C: bottom centre -->
  <rect x="400" y="260" width="100" height="40" rx="10" fill="#0f172a" stroke="#06b6d4" stroke-width="2"/>
  <text x="450" y="285" fill="#22d3ee" font-size="14" font-weight="800" text-anchor="middle" font-family="monospace">C</text>

  <!-- Arrow A→B (direct, top) -->
  <line x1="330" y1="124" x2="570" y2="124" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrowAmber)"/>
  <text x="450" y="118" fill="#fbbf24" font-size="12" font-weight="700" text-anchor="middle" font-family="monospace">ΔH₁ (direct)</text>

  <!-- Arrow A→C -->
  <line x1="280" y1="144" x2="430" y2="260" stroke="#10b981" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="310" y="210" fill="#10b981" font-size="11" font-weight="700" font-family="monospace">ΔH₂</text>

  <!-- Arrow C→B -->
  <line x1="500" y1="260" x2="638" y2="144" stroke="#f43f5e" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="590" y="210" fill="#f43f5e" font-size="11" font-weight="700" font-family="monospace">ΔH₃</text>

  <!-- Hess equation -->
  <rect x="230" y="308" width="440" height="36" rx="10" fill="#0f172a" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="450" y="330" fill="white" font-size="14" font-weight="800" text-anchor="middle" font-family="monospace">ΔH₁ = ΔH₂ + ΔH₃</text>

  <!-- Born-Haber Cycle box -->
  <rect x="230" y="356" width="440" height="96" rx="12" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="450" y="376" fill="#fbbf24" font-size="13" font-weight="700" text-anchor="middle" font-family="system-ui">BORN-HABER CYCLE (Ionic compounds)</text>
  <text x="240" y="396" fill="#e2e8f0" font-size="10" font-family="system-ui">ΔHf°(NaCl) = ΔHsublimation(Na) + ΔHdissociation(½Cl₂)</text>
  <text x="240" y="412" fill="#e2e8f0" font-size="10" font-family="system-ui">         + IE₁(Na) + EA(Cl) + ΔHlattice(NaCl)</text>
  <text x="240" y="428" fill="#f43f5e" font-size="10" font-family="system-ui">⚠ Lattice enthalpy: cannot be measured directly (use Born-Haber)</text>
  <text x="240" y="444" fill="#94a3b8" font-size="10" font-family="system-ui">Higher lattice energy → more stable ionic compound</text>

  <!-- Right: Key formulas column -->
  <text x="720" y="78" fill="#f97316" font-size="13" font-weight="700" font-family="system-ui">KEY FORMULAE</text>

  <rect x="680" y="88" width="210" height="44" rx="10" fill="#0f172a" stroke="#f97316" stroke-width="1.5"/>
  <text x="785" y="106" fill="#fb923c" font-size="11" font-weight="700" text-anchor="middle" font-family="monospace">ΔH = H_products − H_reactants</text>
  <text x="785" y="122" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Exo: −ΔH, Endo: +ΔH</text>

  <rect x="680" y="142" width="210" height="44" rx="10" fill="#0f172a" stroke="#f43f5e" stroke-width="1.5"/>
  <text x="785" y="162" fill="#fb7185" font-size="12" font-weight="700" text-anchor="middle" font-family="monospace">ΔH° = ΣΔHf°(prod)</text>
  <text x="785" y="178" fill="#fb7185" font-size="12" font-weight="700" text-anchor="middle" font-family="monospace">   − ΣΔHf°(react)</text>

  <rect x="680" y="196" width="210" height="44" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
  <text x="785" y="216" fill="#10b981" font-size="11" font-weight="700" text-anchor="middle" font-family="monospace">q = mcΔT</text>
  <text x="785" y="232" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Calorimetry (heat absorbed)</text>

  <rect x="680" y="250" width="210" height="44" rx="10" fill="#0f172a" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="785" y="270" fill="#c084fc" font-size="11" font-weight="700" text-anchor="middle" font-family="monospace">ΔG = ΔH − TΔS</text>
  <text x="785" y="286" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Gibbs free energy (spontaneity)</text>

  <rect x="680" y="304" width="210" height="44" rx="10" fill="#0f172a" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="785" y="324" fill="#22d3ee" font-size="11" font-weight="700" text-anchor="middle" font-family="monospace">ΔG° = −RT lnKₑq</text>
  <text x="785" y="340" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Thermodynamic equilibrium</text>

  <!-- Spontaneity table -->
  <rect x="680" y="358" width="210" height="96" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="785" y="376" fill="#fbbf24" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">SPONTANEITY (ΔG)</text>
  <text x="688" y="394" fill="#94a3b8" font-size="10" font-family="system-ui">ΔH−  ΔS+  → Always spontaneous</text>
  <text x="688" y="410" fill="#94a3b8" font-size="10" font-family="system-ui">ΔH+  ΔS−  → Never spontaneous</text>
  <text x="688" y="426" fill="#94a3b8" font-size="10" font-family="system-ui">ΔH−  ΔS−  → Spontaneous at low T</text>
  <text x="688" y="442" fill="#94a3b8" font-size="10" font-family="system-ui">ΔH+  ΔS+  → Spontaneous at high T</text>
</svg>`;
}

