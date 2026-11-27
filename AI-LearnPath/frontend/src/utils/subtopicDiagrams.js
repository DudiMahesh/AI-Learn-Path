/**
 * Subtopic & Small-Topic Vector Diagrams with Built-In Worked NEET Examples
 */

// 1. Physics Subtopic: Work, Energy, Power & Elastic Collisions
export function generateWorkEnergyCollisionDiagram() {
  return `<svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="weBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/><stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
  </defs>
  <rect width="860" height="430" rx="16" fill="url(#weBg)"/>
  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">💥 WORK, ENERGY, POWER &amp; COLLISIONS (NCERT)</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">W = F·d·cosθ · Work-Energy Theorem: W_net = ΔKE · Momentum Conserved: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂</text>

  <!-- Left: Elastic Collision -->
  <rect x="20" y="68" width="405" height="340" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="222" y="92" fill="#38bdf8" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">1D ELASTIC COLLISION (e = 1)</text>
  <circle cx="105" cy="145" r="24" fill="#10b981" stroke="#6ee7b7" stroke-width="2"/>
  <text x="105" y="150" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle" font-family="monospace">m₁</text>
  <line x1="132" y1="145" x2="190" y2="145" stroke="#34d399" stroke-width="2.5"/>
  <text x="160" y="136" fill="#34d399" font-size="11" font-weight="700" font-family="monospace">u₁</text>
  <circle cx="280" cy="145" r="24" fill="#3b82f6" stroke="#93c5fd" stroke-width="2"/>
  <text x="280" y="150" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle" font-family="monospace">m₂</text>
  <text x="322" y="149" fill="#94a3b8" font-size="11" font-family="monospace">u₂ = 0</text>
  <line x1="50" y1="185" x2="395" y2="185" stroke="#334155" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="222" y="206" fill="#fbbf24" font-size="11.5" font-weight="700" text-anchor="middle" font-family="system-ui">If m₁ = m₂ (Equal Masses): Velocities Interchange! (v₁ = 0, v₂ = u₁)</text>

  <rect x="38" y="222" width="370" height="170" rx="8" fill="#030712" stroke="#10b981" stroke-width="1.2"/>
  <text x="52" y="244" fill="#34d399" font-size="11.5" font-weight="800" font-family="system-ui">💡 WORKED EXAMPLE (Vertical Loop &amp; Spring):</text>
  <text x="52" y="264" fill="#e2e8f0" font-size="10.5" font-family="system-ui">Q: A 2 kg block slides down frictionless height h = 5 m and</text>
  <text x="52" y="280" fill="#e2e8f0" font-size="10.5" font-family="system-ui">compresses spring (k = 200 N/m). Find max compression x.</text>
  <text x="52" y="302" fill="#38bdf8" font-size="10.5" font-family="monospace">• Conservation of Mechanical Energy: mgh = ½ k x²</text>
  <text x="52" y="320" fill="#e2e8f0" font-size="10.5" font-family="monospace">• 2 × 10 × 5 = ½ × 200 × x²  ⇒  100 = 100 x²</text>
  <text x="52" y="340" fill="#34d399" font-size="11" font-weight="700" font-family="monospace">• Answer: x = 1.0 m</text>
  <text x="52" y="366" fill="#fb7185" font-size="10" font-family="system-ui">⚠ Vertical Circle min speed: bottom √(5gR), top √(gR)</text>

  <!-- Right: Power & Coefficient of Restitution -->
  <rect x="440" y="68" width="400" height="340" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="640" y="92" fill="#a78bfa" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">KEY FORMULAE &amp; RESTITUTION (e)</text>
  <text x="460" y="124" fill="#e2e8f0" font-size="11" font-family="monospace">• Work by variable force: W = ∫ F·dx (Area under F-x)</text>
  <text x="460" y="146" fill="#34d399" font-size="11" font-weight="700" font-family="monospace">• Kinetic Energy &amp; Momentum: KE = p² / (2m)</text>
  <text x="460" y="168" fill="#fbbf24" font-size="11" font-family="monospace">• Power: P = dW/dt = F·v·cosθ  (1 HP = 746 W)</text>
  <line x1="460" y1="186" x2="820" y2="186" stroke="#334155" stroke-width="1"/>
  <text x="460" y="208" fill="#38bdf8" font-size="11" font-weight="700" font-family="monospace">• Coefficient e = (v₂ − v₁) / (u₁ − u₂)</text>
  <text x="460" y="228" fill="#e2e8f0" font-size="10.5" font-family="system-ui">  e = 1 (Elastic, KE conserved)</text>
  <text x="460" y="246" fill="#e2e8f0" font-size="10.5" font-family="system-ui">  e = 0 (Perfectly Inelastic, bodies stick together)</text>
  <text x="460" y="264" fill="#fb7185" font-size="10.5" font-family="monospace">• Bouncing ball height after n bounces: hₙ = e²ⁿ h₀</text>
  <rect x="460" y="285" width="360" height="105" rx="8" fill="#030712" stroke="#6366f1" stroke-width="1.2"/>
  <text x="475" y="308" fill="#818cf8" font-size="11" font-weight="800" font-family="system-ui">💡 WORKED EXAMPLE 2 (Momentum &amp; KE):</text>
  <text x="475" y="328" fill="#e2e8f0" font-size="10.5" font-family="system-ui">Q: If linear momentum p increases by 50%, find %↑ in KE.</text>
  <text x="475" y="348" fill="#34d399" font-size="10.5" font-family="monospace">• KE ∝ p² ⇒ (1.5)² = 2.25 ⇒ +125% increase!</text>
  <text x="475" y="368" fill="#94a3b8" font-size="10" font-family="system-ui">• Shortcut: %ΔKE = 2(%Δp) + (%Δp)²/100 = 100 + 25 = 125%</text>
</svg>`;
}

// 2. Physics Subtopic: Nuclear Physics, Radioactivity & Binding Energy
export function generateNuclearRadioactivityDiagram() {
  return `<svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="nucBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/><stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
  </defs>
  <rect width="860" height="430" rx="16" fill="url(#nucBg)"/>
  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">☢️ NUCLEAR PHYSICS — RADIOACTIVE DECAY &amp; HALF-LIFE (NCERT)</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">R = R₀ A^(1/3) · N = N₀ e^(−λt) = N₀ (½)^(t / T₁/₂) · Binding Energy ΔE = Δm · 931.5 MeV</text>

  <!-- Exponential Decay Curve -->
  <rect x="20" y="68" width="405" height="340" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="222" y="92" fill="#fbbf24" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">EXPONENTIAL DECAY CURVE</text>
  <line x1="65" y1="245" x2="395" y2="245" stroke="#475569" stroke-width="1.5"/>
  <line x1="65" y1="115" x2="65" y2="245" stroke="#475569" stroke-width="1.5"/>
  <path d="M 65,120 Q 130,195 210,222 T 390,242" fill="none" stroke="#10b981" stroke-width="3"/>
  <circle cx="135" cy="182" r="5" fill="#fbbf24"/><text x="145" y="176" fill="#fde68a" font-size="10" font-family="monospace">T₁/₂ (N₀/2)</text>
  <circle cx="210" cy="214" r="5" fill="#38bdf8"/><text x="218" y="208" fill="#7dd3fc" font-size="10" font-family="monospace">2T₁/₂ (N₀/4)</text>
  <rect x="38" y="262" width="370" height="130" rx="8" fill="#030712" stroke="#f59e0b" stroke-width="1.2"/>
  <text x="52" y="284" fill="#fbbf24" font-size="11.5" font-weight="800" font-family="system-ui">💡 WORKED EXAMPLE (Half-Life):</text>
  <text x="52" y="304" fill="#e2e8f0" font-size="10.5" font-family="system-ui">Q: A sample has T₁/₂ = 10 days. What fraction remains after 30 days?</text>
  <text x="52" y="324" fill="#38bdf8" font-size="10.5" font-family="monospace">• n = t / T₁/₂ = 30 / 10 = 3 half-lives</text>
  <text x="52" y="344" fill="#34d399" font-size="11" font-weight="700" font-family="monospace">• N / N₀ = (½)³ = 1/8 (12.5% remains; 87.5% decayed)</text>
  <text x="52" y="370" fill="#fb7185" font-size="10" font-family="system-ui">⚠ Mean life τ = 1/λ = 1.44 × T₁/₂</text>

  <rect x="440" y="68" width="400" height="340" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="640" y="92" fill="#fb7185" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">α, β, γ DECAY &amp; NUCLEAR DENSITY</text>
  <text x="460" y="124" fill="#e2e8f0" font-size="11" font-family="monospace">• α-decay (₂He⁴):  Z → Z−2,  A → A−4</text>
  <text x="460" y="146" fill="#e2e8f0" font-size="11" font-family="monospace">• β⁻-decay (e⁻):   Z → Z+1,  A unchanged</text>
  <text x="460" y="168" fill="#e2e8f0" font-size="11" font-family="monospace">• β⁺-decay (e⁺):   Z → Z−1,  A unchanged</text>
  <text x="460" y="190" fill="#34d399" font-size="11" font-weight="700" font-family="monospace">• Nuclear Density ρ ≈ 2.3×10¹⁷ kg/m³ [Indep. of A!]</text>
  <rect x="460" y="210" width="360" height="180" rx="8" fill="#030712" stroke="#6366f1" stroke-width="1.2"/>
  <text x="475" y="234" fill="#818cf8" font-size="11.5" font-weight="800" font-family="system-ui">💡 WORKED EXAMPLE 2 (Q-Value &amp; Stability):</text>
  <text x="475" y="254" fill="#e2e8f0" font-size="10.5" font-family="system-ui">Q: Mass defect Δm = 0.02 u. Find Binding Energy.</text>
  <text x="475" y="274" fill="#34d399" font-size="10.5" font-family="monospace">• BE = 0.02 × 931.5 = 18.63 MeV</text>
  <text x="475" y="298" fill="#fbbf24" font-size="10.5" font-family="system-ui">• Highest BE/nucleon: ⁵⁶Fe (~8.8 MeV) → Most stable!</text>
  <text x="475" y="320" fill="#e2e8f0" font-size="10.5" font-family="system-ui">• Fission: Heavy nucleus splits (U-235 + n → Ba + Kr + 3n)</text>
  <text x="475" y="340" fill="#e2e8f0" font-size="10.5" font-family="system-ui">• Fusion: Light nuclei join (4 ¹H → ⁴He + 26.7 MeV in Sun)</text>
</svg>`;
}

// 3. Chemistry Subtopic: Coordination Compounds & Crystal Field Splitting
export function generateCoordinationDiagram() {
  return `<svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="cdBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/><stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
  </defs>
  <rect width="860" height="430" rx="16" fill="url(#cdBg)"/>
  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">💎 COORDINATION COMPOUNDS — CRYSTAL FIELD SPLITTING (Δ₀)</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Octahedral: eg (+0.6Δ₀) &amp; t2g (−0.4Δ₀) · Spectrochemical Series · μ = √[n(n+2)] BM</text>

  <!-- Octahedral Splitting Diagram -->
  <rect x="20" y="68" width="405" height="340" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="222" y="92" fill="#38bdf8" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">OCTAHEDRAL d-ORBITAL SPLITTING</text>
  <line x1="60" y1="195" x2="170" y2="195" stroke="#94a3b8" stroke-width="2.5"/>
  <text x="115" y="214" fill="#cbd5e1" font-size="10.5" text-anchor="middle" font-family="system-ui">5 Degenerate d-orbitals</text>
  <line x1="170" y1="195" x2="230" y2="135" stroke="#fb7185" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="195" x2="230" y2="240" stroke="#34d399" stroke-width="1.5" stroke-dasharray="4,3"/>
  <!-- eg level -->
  <line x1="230" y1="135" x2="365" y2="135" stroke="#f43f5e" stroke-width="3"/>
  <text x="298" y="124" fill="#fda4af" font-size="11" font-weight="700" text-anchor="middle" font-family="monospace">eg (+0.6 Δ₀) [dz², dx²-y²]</text>
  <!-- t2g level -->
  <line x1="230" y1="240" x2="365" y2="240" stroke="#10b981" stroke-width="3"/>
  <text x="298" y="260" fill="#6ee7b7" font-size="11" font-weight="700" text-anchor="middle" font-family="monospace">t2g (−0.4 Δ₀) [dxy, dyz, dzx]</text>
  <text x="382" y="192" fill="#fbbf24" font-size="12" font-weight="800" font-family="monospace">Δ₀</text>

  <rect x="38" y="280" width="370" height="112" rx="8" fill="#030712" stroke="#10b981" stroke-width="1.2"/>
  <text x="52" y="302" fill="#34d399" font-size="11" font-weight="800" font-family="system-ui">💡 WORKED EXAMPLE ([Fe(CN)₆]⁴⁻ vs [Fe(H₂O)₆]²⁺):</text>
  <text x="52" y="322" fill="#e2e8f0" font-size="10.5" font-family="system-ui">• Fe²⁺ is d⁶. CN⁻ is strong field (Δ₀ &gt; P): t2g⁶ eg⁰</text>
  <text x="52" y="340" fill="#38bdf8" font-size="10.5" font-family="monospace">  → n = 0 unpaired e⁻ → Diamagnetic (μ = 0 BM), d²sp³</text>
  <text x="52" y="360" fill="#fb7185" font-size="10.5" font-family="system-ui">• H₂O is weak field (Δ₀ &lt; P): t2g⁴ eg² (n = 4 → 4.9 BM, sp³d²)</text>

  <!-- Right Panel -->
  <rect x="440" y="68" width="400" height="340" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="640" y="92" fill="#fbbf24" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">SPECTROCHEMICAL SERIES &amp; GEOMETRY</text>
  <text x="460" y="122" fill="#fb7185" font-size="10.5" font-weight="700" font-family="system-ui">Weak Field (High Spin) → Strong Field (Low Spin):</text>
  <text x="460" y="142" fill="#e2e8f0" font-size="10.5" font-family="monospace">I⁻ &lt; Br⁻ &lt; Cl⁻ &lt; F⁻ &lt; OH⁻ &lt; H₂O &lt; NH₃ &lt; en &lt; CN⁻ &lt; CO</text>
  <line x1="460" y1="160" x2="820" y2="160" stroke="#334155" stroke-width="1"/>
  <text x="460" y="184" fill="#34d399" font-size="11" font-weight="700" font-family="monospace">• Tetrahedral Splitting: Δt = (4/9) Δ₀ (Always High Spin)</text>
  <text x="460" y="206" fill="#38bdf8" font-size="11" font-weight="700" font-family="monospace">• CN = 4: sp³ (Tetrahedral) or dsp² (Square Planar, Ni(CN)₄²⁻)</text>
  <text x="460" y="228" fill="#c084fc" font-size="11" font-weight="700" font-family="monospace">• CN = 6: d²sp³ (Inner) or sp³d² (Outer Octahedral)</text>
  <rect x="460" y="250" width="360" height="140" rx="8" fill="#030712" stroke="#6366f1" stroke-width="1.2"/>
  <text x="475" y="274" fill="#818cf8" font-size="11" font-weight="800" font-family="system-ui">💡 WORKED EXAMPLE 2 (AgCl Precipitate Test):</text>
  <text x="475" y="294" fill="#e2e8f0" font-size="10.5" font-family="system-ui">Q: [Co(NH₃)₅Cl]Cl₂ reacts with excess AgNO₃. Moles of AgCl?</text>
  <text x="475" y="314" fill="#34d399" font-size="10.5" font-family="monospace">• 2 ionizable Cl⁻ outside bracket ⇒ 2 moles AgCl!</text>
  <text x="475" y="336" fill="#fbbf24" font-size="10.5" font-family="system-ui">• Total ions in solution = 1 complex cation + 2 Cl⁻ = 3 ions.</text>
  <text x="475" y="358" fill="#94a3b8" font-size="10" font-family="system-ui">• Ambidentate ligands (NO₂⁻, SCN⁻) show Linkage Isomerism.</text>
</svg>`;
}

// 4. Chemistry Subtopic: Organic Named Reactions (Aldol, Cannizzaro, Haloform)
export function generateOrganicNamedReactionsDiagram() {
  return `<svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="orgBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/><stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
  </defs>
  <rect width="860" height="430" rx="16" fill="url(#orgBg)"/>
  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">⚗️ ORGANIC CHEMISTRY — ALDOL, CANNIZZARO &amp; HALOFORM (NCERT)</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">α-Hydrogen Reactions · Disproportionation · Iodoform Test (CH₃CO−) · Markovnikov &amp; Friedel-Crafts</text>

  <!-- 3 Cards -->
  <rect x="20" y="70" width="265" height="215" rx="12" fill="#0f172a" stroke="#10b981" stroke-width="1.8"/>
  <text x="152" y="96" fill="#34d399" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">① ALDOL CONDENSATION</text>
  <text x="35" y="122" fill="#fbbf24" font-size="10.5" font-weight="700" font-family="system-ui">Requires: ≥ 1 α-Hydrogen</text>
  <text x="35" y="144" fill="#e2e8f0" font-size="10.5" font-family="monospace">2 CH₃CHO ─(dil. NaOH)→</text>
  <text x="35" y="162" fill="#38bdf8" font-size="10.5" font-family="monospace">CH₃−CH(OH)−CH₂−CHO (Aldol)</text>
  <text x="35" y="182" fill="#e2e8f0" font-size="10.5" font-family="monospace">─(Δ, −H₂O)→ CH₃−CH=CH−CHO</text>
  <text x="35" y="210" fill="#6ee7b7" font-size="10" font-family="system-ui">Ex: Acetaldehyde, Acetone</text>
  <text x="35" y="228" fill="#fb7185" font-size="10" font-family="system-ui">✗ HCHO &amp; C₆H₅CHO do NOT give</text>

  <rect x="298" y="70" width="265" height="215" rx="12" fill="#0f172a" stroke="#6366f1" stroke-width="1.8"/>
  <text x="430" y="96" fill="#818cf8" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">② CANNIZZARO REACTION</text>
  <text x="313" y="122" fill="#fbbf24" font-size="10.5" font-weight="700" font-family="system-ui">Requires: NO α-Hydrogen</text>
  <text x="313" y="144" fill="#e2e8f0" font-size="10.5" font-family="monospace">2 HCHO + conc. NaOH →</text>
  <text x="313" y="162" fill="#34d399" font-size="10.5" font-family="monospace">CH₃OH (Reduced Alcohol)</text>
  <text x="313" y="182" fill="#fb7185" font-size="10.5" font-family="monospace">+ HCOONa (Oxidized Salt)</text>
  <text x="313" y="210" fill="#c7d2fe" font-size="10" font-family="system-ui">Ex: HCHO, Benzaldehyde</text>
  <text x="313" y="228" fill="#94a3b8" font-size="10" font-family="system-ui">• Disproportionation (Redox)</text>

  <rect x="576" y="70" width="264" height="215" rx="12" fill="#0f172a" stroke="#f59e0b" stroke-width="1.8"/>
  <text x="708" y="96" fill="#fbbf24" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">③ IODOFORM TEST</text>
  <text x="591" y="122" fill="#34d399" font-size="10.5" font-weight="700" font-family="system-ui">Group: CH₃CO− or CH₃CH(OH)−</text>
  <text x="591" y="144" fill="#e2e8f0" font-size="10.5" font-family="monospace">R−CO−CH₃ + I₂/NaOH →</text>
  <text x="591" y="162" fill="#fbbf24" font-size="11" font-weight="700" font-family="monospace">CHI₃ ↓ (Yellow ppt)</text>
  <text x="591" y="182" fill="#e2e8f0" font-size="10.5" font-family="monospace">+ RCOONa</text>
  <text x="591" y="210" fill="#6ee7b7" font-size="10" font-family="system-ui">✓ Ethanol, Acetone, 2-Propanol</text>
  <text x="591" y="228" fill="#fb7185" font-size="10" font-family="system-ui">✗ Methanol, 1-Propanol, HCHO</text>

  <!-- Worked Example Strip -->
  <rect x="20" y="300" width="820" height="110" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="40" y="324" fill="#38bdf8" font-size="12" font-weight="800" font-family="system-ui">💡 WORKED NEET EXAMPLE (Distinguishing Pairs):</text>
  <text x="40" y="346" fill="#e2e8f0" font-size="11" font-family="system-ui">• Distinguish Propanal (CH₃CH₂CHO) vs Propanone (CH₃COCH₃): Tollens' Test (+ve for Propanal → Silver Mirror; Propanone gives Yellow Iodoform CHI₃).</text>
  <text x="40" y="368" fill="#34d399" font-size="11" font-family="system-ui">• Distinguish Phenol vs Ethanol: Neutral FeCl₃ gives Violet complex with Phenol; Ethanol gives Iodoform yellow ppt with I₂/NaOH.</text>
  <text x="40" y="390" fill="#fb7185" font-size="10.5" font-family="system-ui">• Reimer-Tiemann: Phenol + CHCl₃ + NaOH → Salicylaldehyde (o-hydroxybenzaldehyde via :CCl₂ carbene intermediate).</text>
</svg>`;
}

// 5. Biology Subtopic: Mitosis & Meiosis Cell Division
export function generateCellDivisionDiagram() {
  return `<svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="cdvBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/><stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
  </defs>
  <rect width="860" height="430" rx="16" fill="url(#cdvBg)"/>
  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">🧬 CELL CYCLE — MITOSIS vs MEIOSIS (NCERT)</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Interphase (G₁ → S [DNA 2C→4C] → G₂) · Pachytene Crossing Over (Recombinase) · Equational vs Reductional</text>

  <rect x="20" y="70" width="400" height="335" rx="12" fill="#0f172a" stroke="#10b981" stroke-width="1.8"/>
  <text x="220" y="96" fill="#34d399" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">MITOSIS (EQUATIONAL: 2n → 2n)</text>
  <text x="40" y="124" fill="#e2e8f0" font-size="11" font-family="system-ui">• Prophase: Chromatin condenses; nuclear envelope disappears.</text>
  <text x="40" y="146" fill="#38bdf8" font-size="11" font-weight="700" font-family="system-ui">• Metaphase: Chromosomes align at equator (Best to count!).</text>
  <text x="40" y="168" fill="#fbbf24" font-size="11" font-weight="700" font-family="system-ui">• Anaphase: Centromeres split; sister chromatids separate.</text>
  <text x="40" y="190" fill="#e2e8f0" font-size="11" font-family="system-ui">• Telophase: Two identical diploid daughter nuclei form.</text>
  <rect x="38" y="215" width="364" height="170" rx="8" fill="#030712" stroke="#10b981" stroke-width="1.2"/>
  <text x="52" y="238" fill="#34d399" font-size="11.5" font-weight="800" font-family="system-ui">💡 WORKED NEET EXAMPLE (DNA Content 2C → 4C):</text>
  <text x="52" y="258" fill="#e2e8f0" font-size="10.5" font-family="system-ui">Q: A diploid cell has 2n = 16 chromosomes and 2C DNA in G₁.</text>
  <text x="52" y="276" fill="#e2e8f0" font-size="10.5" font-family="system-ui">Find chromosome number &amp; DNA content after S-phase.</text>
  <text x="52" y="298" fill="#fbbf24" font-size="11" font-weight="700" font-family="monospace">• Chromosomes = STILL 16 (2n)! [Never doubles in S]</text>
  <text x="52" y="318" fill="#38bdf8" font-size="11" font-weight="700" font-family="monospace">• DNA Content = Doubles to 4C!</text>
  <text x="52" y="344" fill="#94a3b8" font-size="10" font-family="system-ui">• Plant Cytokinesis: Cell Plate (Golgi) | Animal: Furrow</text>

  <rect x="440" y="70" width="400" height="335" rx="12" fill="#0f172a" stroke="#a855f7" stroke-width="1.8"/>
  <text x="640" y="96" fill="#c084fc" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">MEIOSIS I PROPHASE I (5 STAGES)</text>
  <text x="460" y="124" fill="#e2e8f0" font-size="11" font-family="system-ui">1. Leptotene: Compaction of chromosomes.</text>
  <text x="460" y="146" fill="#38bdf8" font-size="11" font-weight="700" font-family="system-ui">2. Zygotene: Synapsis (Bivalent / Tetrad, Synaptonemal complex).</text>
  <text x="460" y="168" fill="#34d399" font-size="11" font-weight="700" font-family="system-ui">3. Pachytene: Crossing over (Recombinase enzyme).</text>
  <text x="460" y="190" fill="#fbbf24" font-size="11" font-weight="700" font-family="system-ui">4. Diplotene: X-shaped Chiasmata visible.</text>
  <text x="460" y="212" fill="#fb7185" font-size="11" font-weight="700" font-family="system-ui">5. Diakinesis: Terminalisation of chiasmata.</text>
  <rect x="458" y="232" width="364" height="153" rx="8" fill="#030712" stroke="#a855f7" stroke-width="1.2"/>
  <text x="472" y="256" fill="#c084fc" font-size="11.5" font-weight="800" font-family="system-ui">💡 WORKED EXAMPLE 2 (Gamete Count):</text>
  <text x="472" y="276" fill="#e2e8f0" font-size="10.5" font-family="system-ui">Q: How many meiotic divisions produce 100 pollen grains</text>
  <text x="472" y="294" fill="#e2e8f0" font-size="10.5" font-family="system-ui">vs 100 egg cells in angiosperms?</text>
  <text x="472" y="316" fill="#34d399" font-size="10.5" font-family="monospace">• 1 Meiosis → 4 Pollen ⇒ 100/4 = 25 Meiosis</text>
  <text x="472" y="336" fill="#fbbf24" font-size="10.5" font-family="monospace">• 1 Meiosis → 1 Functional Egg ⇒ 100 Meiosis</text>
  <text x="472" y="362" fill="#94a3b8" font-size="10" font-family="system-ui">• Total for 100 seeds = 25 + 100 = 125 meiotic divisions!</text>
</svg>`;
}

// 6. Biology Subtopic: Mendelian Genetics & Punnett Square
export function generateMendelianGeneticsDiagram() {
  return `<svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="genBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/><stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
  </defs>
  <rect width="860" height="430" rx="16" fill="url(#genBg)"/>
  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">🌱 MENDELIAN GENETICS — MONOHYBRID, DIHYBRID &amp; TEST CROSS</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Monohybrid F₂: 3:1 (Phenotype), 1:2:1 (Genotype) · Dihybrid F₂: 9:3:3:1 · Test Cross: Tt × tt = 1:1</text>

  <!-- Punnett Square (Tt x Tt) -->
  <rect x="20" y="70" width="400" height="335" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="220" y="95" fill="#34d399" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">MONOHYBRID PUNNETT SQUARE (Tt × Tt)</text>
  <text x="190" y="122" fill="#fbbf24" font-size="13" font-weight="800" text-anchor="middle" font-family="monospace">T</text>
  <text x="290" y="122" fill="#fbbf24" font-size="13" font-weight="800" text-anchor="middle" font-family="monospace">t</text>
  <text x="115" y="165" fill="#fbbf24" font-size="13" font-weight="800" text-anchor="middle" font-family="monospace">T</text>
  <text x="115" y="235" fill="#fbbf24" font-size="13" font-weight="800" text-anchor="middle" font-family="monospace">t</text>
  <rect x="140" y="132" width="100" height="65" fill="#065f46" stroke="#34d399" stroke-width="1.5"/>
  <text x="190" y="170" fill="#ffffff" font-size="15" font-weight="800" text-anchor="middle" font-family="monospace">TT (Tall)</text>
  <rect x="240" y="132" width="100" height="65" fill="#064e3b" stroke="#34d399" stroke-width="1.5"/>
  <text x="290" y="170" fill="#ffffff" font-size="15" font-weight="800" text-anchor="middle" font-family="monospace">Tt (Tall)</text>
  <rect x="140" y="197" width="100" height="65" fill="#064e3b" stroke="#34d399" stroke-width="1.5"/>
  <text x="190" y="235" fill="#ffffff" font-size="15" font-weight="800" text-anchor="middle" font-family="monospace">Tt (Tall)</text>
  <rect x="240" y="197" width="100" height="65" fill="#7f1d1d" stroke="#f43f5e" stroke-width="1.5"/>
  <text x="290" y="235" fill="#fecaca" font-size="15" font-weight="800" text-anchor="middle" font-family="monospace">tt (Dwarf)</text>

  <rect x="38" y="280" width="365" height="108" rx="8" fill="#030712" stroke="#10b981" stroke-width="1.2"/>
  <text x="52" y="302" fill="#34d399" font-size="11" font-weight="800" font-family="system-ui">💡 WORKED EXAMPLE (Gametes &amp; Genotypes):</text>
  <text x="52" y="322" fill="#e2e8f0" font-size="10.5" font-family="system-ui">Q: How many gametes are formed by AaBbCc?</text>
  <text x="52" y="342" fill="#fbbf24" font-size="11" font-weight="700" font-family="monospace">• Formula = 2ⁿ (n = heterozygous loci = 3) ⇒ 2³ = 8</text>
  <text x="52" y="364" fill="#38bdf8" font-size="10.5" font-family="monospace">• Incomplete Dominance (Snapdragon): 1:2:1 (Pheno = Geno!)</text>

  <!-- Exceptions & Blood Groups -->
  <rect x="440" y="70" width="400" height="335" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="640" y="95" fill="#fbbf24" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">ABO BLOOD GROUPS, LINKAGE &amp; DISORDERS</text>
  <text x="460" y="126" fill="#e2e8f0" font-size="11" font-family="system-ui">• ABO Blood Group: Multiple Allelism (Iᴬ, Iᴮ, i) + Codominance (IᴬIᴮ)</text>
  <text x="460" y="148" fill="#34d399" font-size="11" font-weight="700" font-family="monospace">  6 Genotypes, 4 Phenotypes (A, B, AB, O)</text>
  <text x="460" y="174" fill="#38bdf8" font-size="11" font-family="system-ui">• Linkage (Morgan, Drosophila): Recombination ∝ Distance between genes</text>
  <text x="460" y="198" fill="#fb7185" font-size="11" font-weight="700" font-family="system-ui">• X-Linked Recessive: Haemophilia, Colour Blindness (Crisscross)</text>
  <rect x="458" y="220" width="364" height="168" rx="8" fill="#030712" stroke="#6366f1" stroke-width="1.2"/>
  <text x="472" y="244" fill="#818cf8" font-size="11.5" font-weight="800" font-family="system-ui">💡 WORKED EXAMPLE 2 (Blood Group Cross):</text>
  <text x="472" y="264" fill="#e2e8f0" font-size="10.5" font-family="system-ui">Q: Father is Blood Group A (Iᴬi), Mother is B (Iᴮi).</text>
  <text x="472" y="282" fill="#e2e8f0" font-size="10.5" font-family="system-ui">Possible blood groups in children?</text>
  <text x="472" y="304" fill="#34d399" font-size="11" font-weight="700" font-family="monospace">• IᴬIᴮ (AB), Iᴬi (A), Iᴮi (B), ii (O) → ALL 4 possible!</text>
  <text x="472" y="330" fill="#fbbf24" font-size="10" font-family="system-ui">• Chromosomal Disorders: Down's (21-Trisomy, 47), Klinefelter (XXY),</text>
  <text x="472" y="346" fill="#fbbf24" font-size="10" font-family="system-ui">  Turner's (XO, 45, sterile female).</text>
</svg>`;
}

