/**
 * High-Resolution Physics & Chemistry Vector Diagrams for NEET (UG)
 * Covers AC Circuits, Atomic Structure (Bohr/Helium), Electrostatics/Circuits,
 * Waves/SHM, and Electrochemistry (Galvanic Cell).
 */

// 1. Alternating Current (AC) Waveform + Series LCR Resonance
export function generateACCircuitDiagram() {
  return `<svg viewBox="0 0 860 440" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="acBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/>
      <stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
    <linearGradient id="acWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="50%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#818cf8"/>
    </linearGradient>
  </defs>
  <rect width="860" height="440" rx="16" fill="url(#acBg)"/>

  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">⚡ ALTERNATING CURRENT (AC) &amp; SERIES LCR RESONANCE</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">NEET Physics · V = V₀ sin(ωt) · Vrms = V₀/√2 · Z = √[R² + (XL − XC)²]</text>

  <!-- Left Panel: Sinusoidal AC Waveform -->
  <rect x="20" y="66" width="415" height="350" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="227" y="90" fill="#38bdf8" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">SINUSOIDAL AC WAVEFORM</text>

  <!-- Axes -->
  <line x1="55" y1="220" x2="410" y2="220" stroke="#475569" stroke-width="1.5"/>
  <line x1="65" y1="115" x2="65" y2="335" stroke="#475569" stroke-width="1.5"/>
  <text x="414" y="224" fill="#94a3b8" font-size="11" font-family="system-ui">ωt</text>
  <text x="65" y="108" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">V, I</text>

  <!-- Peak & RMS dashed lines -->
  <line x1="65" y1="135" x2="400" y2="135" stroke="#10b981" stroke-width="1" stroke-dasharray="4,4" opacity="0.6"/>
  <line x1="65" y1="160" x2="400" y2="160" stroke="#fbbf24" stroke-width="1" stroke-dasharray="4,4" opacity="0.7"/>
  <line x1="65" y1="305" x2="400" y2="305" stroke="#f43f5e" stroke-width="1" stroke-dasharray="4,4" opacity="0.5"/>

  <!-- Voltage Sine Wave -->
  <path d="M 65,220 C 100,135 125,135 150,135 C 175,135 200,220 235,220 C 270,305 295,305 320,305 C 345,305 370,220 405,220"
        fill="none" stroke="url(#acWaveGrad)" stroke-width="3.5" stroke-linecap="round"/>

  <!-- Current Sine Wave (lagging by phase phi) -->
  <path d="M 85,220 C 115,165 140,165 165,165 C 190,165 215,220 250,220 C 285,275 310,275 335,275 C 360,275 385,220 405,220"
        fill="none" stroke="#f59e0b" stroke-width="2.2" stroke-dasharray="6,3" stroke-linecap="round"/>

  <!-- Labels -->
  <text x="35" y="139" fill="#34d399" font-size="10.5" font-weight="700" font-family="monospace">+V₀</text>
  <text x="26" y="164" fill="#fbbf24" font-size="10" font-weight="700" font-family="monospace">Vrms</text>
  <text x="35" y="309" fill="#fb7185" font-size="10.5" font-weight="700" font-family="monospace">−V₀</text>
  <text x="150" y="236" fill="#94a3b8" font-size="10" font-family="system-ui">π/2</text>
  <text x="235" y="236" fill="#94a3b8" font-size="10" font-family="system-ui">π</text>
  <text x="320" y="236" fill="#94a3b8" font-size="10" font-family="system-ui">3π/2</text>
  <text x="398" y="236" fill="#94a3b8" font-size="10" font-family="system-ui">2π (T)</text>

  <!-- Key Waveform Stats -->
  <rect x="38" y="346" width="380" height="56" rx="8" fill="#030712" stroke="#334155" stroke-width="1"/>
  <text x="52" y="366" fill="#34d399" font-size="11" font-weight="700" font-family="monospace">Vrms = V₀ / √2 ≈ 0.707 V₀</text>
  <text x="245" y="366" fill="#fbbf24" font-size="11" font-weight="700" font-family="monospace">Irms = I₀ / √2</text>
  <text x="52" y="388" fill="#e2e8f0" font-size="10.5" font-family="system-ui">• Mean over full cycle = 0  |  Mean over half cycle = 2I₀/π</text>

  <!-- Right Panel: Series LCR Circuit + Phasor -->
  <rect x="450" y="66" width="390" height="350" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="645" y="90" fill="#a78bfa" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">SERIES LCR CIRCUIT &amp; IMPEDANCE</text>

  <!-- Circuit Loop -->
  <rect x="490" y="120" width="310" height="115" rx="8" fill="none" stroke="#64748b" stroke-width="2.5"/>
  <!-- Resistor R -->
  <rect x="525" y="108" width="52" height="24" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
  <text x="551" y="124" fill="#34d399" font-size="12" font-weight="800" text-anchor="middle" font-family="monospace">R</text>
  <!-- Inductor L -->
  <rect x="615" y="108" width="60" height="24" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
  <text x="645" y="124" fill="#7dd3fc" font-size="12" font-weight="800" text-anchor="middle" font-family="monospace">L (XL)</text>
  <!-- Capacitor C -->
  <rect x="712" y="108" width="56" height="24" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
  <text x="740" y="124" fill="#fde68a" font-size="12" font-weight="800" text-anchor="middle" font-family="monospace">C (XC)</text>

  <!-- AC Source Symbol at bottom -->
  <circle cx="645" cy="235" r="20" fill="#030712" stroke="#818cf8" stroke-width="2.5"/>
  <path d="M 633,235 Q 639,225 645,235 T 657,235" fill="none" stroke="#c7d2fe" stroke-width="2.2"/>
  <text x="645" y="268" fill="#c7d2fe" font-size="10.5" font-weight="700" text-anchor="middle" font-family="monospace">V = V₀ sin(ωt)</text>

  <!-- Formulas & Resonance -->
  <rect x="470" y="280" width="350" height="122" rx="10" fill="#030712" stroke="#6366f1" stroke-width="1.2"/>
  <text x="485" y="302" fill="#818cf8" font-size="11.5" font-weight="800" font-family="system-ui">🎯 NEET HIGH-YIELD FORMULAE</text>
  <text x="485" y="322" fill="#e2e8f0" font-size="10.5" font-family="monospace">• XL = ωL = 2πfL    |   XC = 1/(ωC)</text>
  <text x="485" y="340" fill="#e2e8f0" font-size="10.5" font-family="monospace">• Z = √[R² + (XL − XC)²]   (Impedance)</text>
  <text x="485" y="358" fill="#34d399" font-size="10.5" font-weight="700" font-family="monospace">• Resonance (XL = XC): f₀ = 1/(2π√LC)</text>
  <text x="485" y="376" fill="#fbbf24" font-size="10.5" font-family="monospace">• Power: P = Vrms·Irms·cosφ  (cosφ = R/Z)</text>
  <text x="485" y="393" fill="#fb7185" font-size="10" font-family="system-ui">⚠ Pure L or C: φ = 90° → Wattless Current (P = 0)</text>
</svg>`;
}

// 2. Atomic Structure / Bohr Model (highlights Helium when requested)
export function generateAtomicStructureDiagram(isHelium = false) {
  const title = isHelium
    ? '⚛️ HELIUM ATOM (₂He⁴) — BOHR SHELL &amp; NUCLEAR STRUCTURE'
    : '⚛️ BOHR ATOMIC MODEL &amp; QUANTUM ENERGY LEVELS (NCERT)';
  const subtitle = isHelium
    ? 'Atomic No. Z = 2 · Mass No. A = 4 (2p⁺ + 2n⁰) · 1s² Closed Duplet · Noble Gas'
    : 'En = −13.6 × (Z² / n²) eV · Angular Momentum L = n(h / 2π) · Rydberg Spectrum';

  return `<svg viewBox="0 0 860 440" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="atmBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/>
      <stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
    <radialGradient id="nucGlow" cx="40%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#fb7185"/>
      <stop offset="100%" stop-color="#9f1239"/>
    </radialGradient>
  </defs>
  <rect width="860" height="440" rx="16" fill="url(#atmBg)"/>

  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">${title}</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">${subtitle}</text>

  <!-- Left: Atom Concentric Shells -->
  <circle cx="235" cy="240" r="155" fill="none" stroke="#334155" stroke-width="1.5" stroke-dasharray="6,4"/>
  <circle cx="235" cy="240" r="110" fill="none" stroke="#6366f1" stroke-width="1.8" stroke-dasharray="6,4"/>
  <circle cx="235" cy="240" r="65" fill="none" stroke="#10b981" stroke-width="2.5"/>

  <!-- Nucleus (2 Protons + 2 Neutrons cluster) -->
  <circle cx="235" cy="240" r="24" fill="url(#nucGlow)" stroke="#fda4af" stroke-width="2"/>
  <circle cx="228" cy="234" r="7" fill="#ef4444" stroke="#fecaca" stroke-width="1"/>
  <circle cx="242" cy="246" r="7" fill="#ef4444" stroke="#fecaca" stroke-width="1"/>
  <circle cx="242" cy="234" r="7" fill="#94a3b8" stroke="#e2e8f0" stroke-width="1"/>
  <circle cx="228" cy="246" r="7" fill="#94a3b8" stroke="#e2e8f0" stroke-width="1"/>
  <text x="235" y="278" fill="#fda4af" font-size="10.5" font-weight="700" text-anchor="middle" font-family="system-ui">${isHelium ? 'Nucleus (2p⁺, 2n⁰)' : 'Nucleus (+Ze)'}</text>

  <!-- K-Shell Electrons (n=1, 1s²) -->
  <circle cx="170" cy="240" r="7" fill="#38bdf8" stroke="#e0f2fe" stroke-width="1.5"/>
  <circle cx="300" cy="240" r="7" fill="#38bdf8" stroke="#e0f2fe" stroke-width="1.5"/>
  <text x="148" y="244" fill="#7dd3fc" font-size="10" font-weight="700" font-family="monospace">e⁻</text>
  <text x="312" y="244" fill="#7dd3fc" font-size="10" font-weight="700" font-family="monospace">e⁻</text>

  <text x="235" y="167" fill="#34d399" font-size="10.5" font-weight="700" text-anchor="middle" font-family="system-ui">n = 1 (K-shell · 1s²)</text>
  <text x="235" y="122" fill="#818cf8" font-size="10.5" font-weight="600" text-anchor="middle" font-family="system-ui">n = 2 (L-shell)</text>
  <text x="235" y="77" fill="#64748b" font-size="10.5" font-weight="600" text-anchor="middle" font-family="system-ui">n = 3 (M-shell)</text>

  <!-- Right Panel: Properties & Quantum Formulae -->
  <rect x="445" y="74" width="395" height="342" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="642" y="98" fill="#34d399" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">${isHelium ? 'HELIUM (He) — KEY FACTS' : 'BOHR QUANTUM RELATIONS'}</text>

  <rect x="465" y="112" width="355" height="90" rx="8" fill="#030712" stroke="#10b981" stroke-width="1.2"/>
  <text x="480" y="132" fill="#6ee7b7" font-size="11.5" font-weight="700" font-family="system-ui">Electronic &amp; Nuclear Profile</text>
  <text x="480" y="152" fill="#e2e8f0" font-size="10.5" font-family="monospace">• Config: 1s² (Complete Duplet, Group 18)</text>
  <text x="480" y="170" fill="#e2e8f0" font-size="10.5" font-family="monospace">• He²⁺ = Alpha (α) Particle (2p⁺ + 2n⁰)</text>
  <text x="480" y="188" fill="#fbbf24" font-size="10.5" font-family="monospace">• Highest Ionization Energy in Periodic Table</text>

  <rect x="465" y="214" width="355" height="106" rx="8" fill="#030712" stroke="#6366f1" stroke-width="1.2"/>
  <text x="480" y="234" fill="#818cf8" font-size="11.5" font-weight="700" font-family="system-ui">Energy, Radius &amp; Velocity (Bohr)</text>
  <text x="480" y="254" fill="#e2e8f0" font-size="10.5" font-family="monospace">• Radius:  rₙ = 0.529 × (n² / Z) Å</text>
  <text x="480" y="272" fill="#e2e8f0" font-size="10.5" font-family="monospace">• Energy:  Eₙ = −13.6 × (Z² / n²) eV</text>
  <text x="480" y="290" fill="#e2e8f0" font-size="10.5" font-family="monospace">• Velocity: vₙ = 2.18×10⁶ × (Z / n) m/s</text>
  <text x="480" y="308" fill="#94a3b8" font-size="10" font-family="system-ui">  (Applies to H-like 1-e⁻ ions: H, He⁺, Li²⁺)</text>

  <rect x="465" y="332" width="355" height="68" rx="8" fill="#030712" stroke="#f59e0b" stroke-width="1.2"/>
  <text x="480" y="352" fill="#fbbf24" font-size="11" font-weight="700" font-family="system-ui">⚠ NEET Exam Highlights</text>
  <text x="480" y="370" fill="#e2e8f0" font-size="10" font-family="system-ui">• He is used in deep-sea diving (O₂ + He) &amp; MRI cryogenics</text>
  <text x="480" y="386" fill="#e2e8f0" font-size="10" font-family="system-ui">• Zero electron affinity; non-reactive monatomic gas</text>
</svg>`;
}

// 3. Electrostatics, Electric Field & Parallel-Plate Capacitor
export function generateElectrostaticsDiagram() {
  return `<svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="elBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/>
      <stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
  </defs>
  <rect width="860" height="430" rx="16" fill="url(#elBg)"/>
  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">⚡ ELECTROSTATICS &amp; CAPACITOR ARCHITECTURE</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Coulomb's Law · Electric Dipole Field Lines · Parallel-Plate Capacitor (C = κ ε₀ A / d)</text>

  <!-- Left: Electric Dipole Field -->
  <rect x="20" y="68" width="400" height="340" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="220" y="92" fill="#fb7185" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">ELECTRIC DIPOLE FIELD (+q → −q)</text>
  <path d="M 140,210 C 175,130 265,130 300,210" fill="none" stroke="#38bdf8" stroke-width="2"/>
  <path d="M 140,210 C 165,165 275,165 300,210" fill="none" stroke="#38bdf8" stroke-width="2"/>
  <path d="M 140,210 L 300,210" fill="none" stroke="#38bdf8" stroke-width="2.2"/>
  <path d="M 140,210 C 165,255 275,255 300,210" fill="none" stroke="#38bdf8" stroke-width="2"/>
  <path d="M 140,210 C 175,290 265,290 300,210" fill="none" stroke="#38bdf8" stroke-width="2"/>
  <circle cx="140" cy="210" r="22" fill="#dc2626" stroke="#fca5a5" stroke-width="2"/>
  <text x="140" y="215" fill="#ffffff" font-size="14" font-weight="800" text-anchor="middle" font-family="monospace">+q</text>
  <circle cx="300" cy="210" r="22" fill="#2563eb" stroke="#93c5fd" stroke-width="2"/>
  <text x="300" y="215" fill="#ffffff" font-size="14" font-weight="800" text-anchor="middle" font-family="monospace">−q</text>
  <rect x="40" y="322" width="360" height="72" rx="8" fill="#030712" stroke="#334155" stroke-width="1"/>
  <text x="55" y="344" fill="#38bdf8" font-size="11" font-weight="700" font-family="monospace">• F = k·q₁q₂ / r²   (k = 9×10⁹ N·m²/C²)</text>
  <text x="55" y="364" fill="#e2e8f0" font-size="11" font-family="monospace">• E_axial = 2kp/r³  |  E_eq = kp/r³</text>
  <text x="55" y="383" fill="#fbbf24" font-size="10.5" font-family="monospace">• Gauss Law: ∮ E·dA = q_enc / ε₀</text>

  <!-- Right: Parallel Plate Capacitor -->
  <rect x="440" y="68" width="400" height="340" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="640" y="92" fill="#34d399" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">PARALLEL-PLATE CAPACITOR</text>
  <rect x="545" y="125" width="14" height="145" rx="3" fill="#ef4444"/>
  <rect x="720" y="125" width="14" height="145" rx="3" fill="#3b82f6"/>
  <rect x="565" y="132" width="148" height="131" fill="#10b981" opacity="0.18" stroke="#10b981" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="639" y="202" fill="#6ee7b7" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui">Dielectric (κ)</text>
  <line x1="568" y1="160" x2="708" y2="160" stroke="#fbbf24" stroke-width="1.8"/>
  <line x1="568" y1="235" x2="708" y2="235" stroke="#fbbf24" stroke-width="1.8"/>
  <text x="639" y="288" fill="#94a3b8" font-size="10.5" text-anchor="middle" font-family="monospace">←── d (separation) ──→</text>
  <rect x="460" y="305" width="360" height="89" rx="8" fill="#030712" stroke="#10b981" stroke-width="1.2"/>
  <text x="475" y="326" fill="#34d399" font-size="11" font-weight="700" font-family="monospace">• C = κ ε₀ A / d    (Q = C·V)</text>
  <text x="475" y="346" fill="#e2e8f0" font-size="11" font-family="monospace">• Energy: U = ½CV² = Q²/(2C) = ½QV</text>
  <text x="475" y="366" fill="#fbbf24" font-size="10.5" font-family="monospace">• Series: 1/C = Σ(1/Cᵢ) | Parallel: C = ΣCᵢ</text>
  <text x="475" y="384" fill="#94a3b8" font-size="10" font-family="system-ui">• Energy density u = ½ ε₀ E²</text>
</svg>`;
}

// 4. Electrochemistry (Daniell Galvanic Cell)
export function generateElectrochemistryDiagram() {
  return `<svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="ecBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/>
      <stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
  </defs>
  <rect width="860" height="430" rx="16" fill="url(#ecBg)"/>
  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">🔋 ELECTROCHEMISTRY — DANIELL GALVANIC CELL (NCERT)</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s) · E°cell = +1.10 V · Nernst Equation</text>

  <!-- Beaker 1 (Anode - Zn) -->
  <rect x="60" y="185" width="160" height="145" rx="8" fill="#0f172a" stroke="#64748b" stroke-width="2"/>
  <rect x="64" y="230" width="152" height="96" rx="4" fill="#334155" opacity="0.45"/>
  <rect x="95" y="140" width="24" height="150" rx="3" fill="#94a3b8"/>
  <text x="107" y="132" fill="#fca5a5" font-size="12" font-weight="800" text-anchor="middle" font-family="system-ui">Zn (− Anode)</text>
  <text x="140" y="285" fill="#e2e8f0" font-size="11" text-anchor="middle" font-family="monospace">ZnSO₄(aq)</text>

  <!-- Beaker 2 (Cathode - Cu) -->
  <rect x="330" y="185" width="160" height="145" rx="8" fill="#0f172a" stroke="#64748b" stroke-width="2"/>
  <rect x="334" y="230" width="152" height="96" rx="4" fill="#0284c7" opacity="0.35"/>
  <rect x="430" y="140" width="24" height="150" rx="3" fill="#ea580c"/>
  <text x="442" y="132" fill="#6ee7b7" font-size="12" font-weight="800" text-anchor="middle" font-family="system-ui">Cu (+ Cathode)</text>
  <text x="410" y="285" fill="#7dd3fc" font-size="11" text-anchor="middle" font-family="monospace">CuSO₄(aq)</text>

  <!-- Salt Bridge (U-tube) -->
  <path d="M 185,255 L 185,155 Q 185,140 205,140 L 345,140 Q 365,140 365,155 L 365,255"
        fill="none" stroke="#fbbf24" stroke-width="14" stroke-linecap="round" opacity="0.75"/>
  <text x="275" y="164" fill="#fde68a" font-size="10.5" font-weight="700" text-anchor="middle" font-family="system-ui">Salt Bridge (KCl / KNO₃)</text>

  <!-- External Wire + Voltmeter + Electron Flow -->
  <path d="M 107,140 L 107,85 L 442,85 L 442,140" fill="none" stroke="#10b981" stroke-width="2.5"/>
  <circle cx="275" cy="85" r="20" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
  <text x="275" y="90" fill="#34d399" font-size="13" font-weight="800" text-anchor="middle" font-family="monospace">V</text>
  <text x="190" y="76" fill="#34d399" font-size="10.5" font-weight="700" font-family="system-ui">e⁻ flow →</text>
  <text x="345" y="76" fill="#38bdf8" font-size="10.5" font-weight="700" font-family="system-ui">← Current (I)</text>

  <!-- Equations Box -->
  <rect x="520" y="80" width="320" height="320" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="680" y="106" fill="#fbbf24" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">LOAN MNEMONIC &amp; NERNST EQ</text>
  <text x="535" y="132" fill="#fca5a5" font-size="11" font-weight="700" font-family="system-ui">L · O · A · N (Left = Oxidation = Anode = −ve)</text>
  <text x="535" y="152" fill="#e2e8f0" font-size="10.5" font-family="monospace">• Anode:   Zn → Zn²⁺ + 2e⁻  (Oxidation)</text>
  <text x="535" y="172" fill="#e2e8f0" font-size="10.5" font-family="monospace">• Cathode: Cu²⁺ + 2e⁻ → Cu  (Reduction)</text>
  <line x1="535" y1="188" x2="825" y2="188" stroke="#334155" stroke-width="1"/>
  <text x="535" y="210" fill="#34d399" font-size="11" font-weight="700" font-family="monospace">E°cell = E°cathode − E°anode</text>
  <text x="535" y="228" fill="#e2e8f0" font-size="10.5" font-family="monospace">      = 0.34 − (−0.76) = +1.10 V</text>
  <line x1="535" y1="244" x2="825" y2="244" stroke="#334155" stroke-width="1"/>
  <text x="535" y="266" fill="#38bdf8" font-size="11" font-weight="700" font-family="system-ui">Nernst Equation (at 298 K):</text>
  <text x="535" y="286" fill="#e2e8f0" font-size="10.5" font-family="monospace">Ecell = E°cell − (0.0591/n) log Q</text>
  <text x="535" y="312" fill="#c084fc" font-size="11" font-weight="700" font-family="system-ui">Gibbs Free Energy:</text>
  <text x="535" y="332" fill="#e2e8f0" font-size="10.5" font-family="monospace">ΔG° = −n F E°cell  (F = 96500 C/mol)</text>
  <text x="535" y="362" fill="#fb7185" font-size="10" font-family="system-ui">⚠ Salt bridge maintains electrical neutrality</text>
  <text x="535" y="378" fill="#94a3b8" font-size="10" font-family="system-ui">  &amp; completes internal circuit</text>
</svg>`;
}

