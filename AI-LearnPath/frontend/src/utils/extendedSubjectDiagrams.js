/**
 * Extended Physics, Chemistry & Biology Vector Diagrams for NEET (UG)
 * Ensures every major NEET unit and subtopic has a dedicated, accurate schematic.
 */

// 1. Physics: Mechanics, Free Body Diagram, Pulley & Friction
export function generateMechanicsForceDiagram() {
  return `<svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="mechBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/><stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
  </defs>
  <rect width="860" height="430" rx="16" fill="url(#mechBg)"/>
  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">⚙️ LAWS OF MOTION — INCLINED PLANE &amp; PULLEY FBD (NCERT)</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Newton's Laws · Free Body Diagram · Friction (fs ≤ μsN) · Atwood Acceleration</text>

  <!-- Left: Inclined Plane FBD -->
  <rect x="20" y="68" width="405" height="340" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="222" y="92" fill="#38bdf8" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">INCLINED PLANE FREE BODY DIAGRAM</text>
  <polygon points="60,310 370,310 370,150" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
  <text x="115" y="300" fill="#fbbf24" font-size="12" font-weight="700" font-family="monospace">θ</text>
  <!-- Block on incline -->
  <g transform="translate(230,222) rotate(-27)">
    <rect x="-28" y="-22" width="56" height="44" rx="5" fill="#059669" stroke="#6ee7b7" stroke-width="2"/>
    <text x="0" y="5" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle" font-family="monospace">m</text>
    <!-- Normal N -->
    <line x1="0" y1="-22" x2="0" y2="-75" stroke="#38bdf8" stroke-width="2.5"/>
    <text x="12" y="-65" fill="#38bdf8" font-size="11" font-weight="700" font-family="monospace">N = mg cosθ</text>
    <!-- Friction f -->
    <line x1="28" y1="0" x2="82" y2="0" stroke="#fbbf24" stroke-width="2.5"/>
    <text x="42" y="-10" fill="#fbbf24" font-size="11" font-weight="700" font-family="monospace">f = μN</text>
    <!-- mg sin theta -->
    <line x1="-28" y1="0" x2="-88" y2="0" stroke="#f43f5e" stroke-width="2.5"/>
    <text x="-85" y="-12" fill="#fb7185" font-size="11" font-weight="700" font-family="monospace">mg sinθ</text>
  </g>
  <!-- Vertical mg -->
  <line x1="230" y1="244" x2="230" y2="338" stroke="#f43f5e" stroke-width="2.5"/>
  <text x="240" y="335" fill="#fda4af" font-size="11" font-weight="700" font-family="monospace">mg</text>
  <rect x="38" y="348" width="370" height="46" rx="8" fill="#030712" stroke="#334155" stroke-width="1"/>
  <text x="223" y="368" fill="#34d399" font-size="11" font-weight="700" text-anchor="middle" font-family="monospace">a = g(sinθ − μₖ cosθ)  |  Angle of Repose: tanθ = μₛ</text>
  <text x="223" y="385" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Banking of roads (no friction): tanθ = v² / (rg)</text>

  <!-- Right: Atwood Pulley & Laws -->
  <rect x="440" y="68" width="400" height="340" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="640" y="92" fill="#a78bfa" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">ATWOOD MACHINE &amp; NEWTON'S LAWS</text>
  <circle cx="640" cy="145" r="24" fill="#334155" stroke="#94a3b8" stroke-width="2.5"/>
  <line x1="616" y1="145" x2="616" y2="235" stroke="#e2e8f0" stroke-width="2"/>
  <line x1="664" y1="145" x2="664" y2="265" stroke="#e2e8f0" stroke-width="2"/>
  <rect x="596" y="235" width="40" height="36" rx="5" fill="#4f46e5" stroke="#a5b4fc" stroke-width="1.8"/>
  <text x="616" y="258" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle" font-family="monospace">m₁</text>
  <rect x="644" y="265" width="40" height="36" rx="5" fill="#dc2626" stroke="#fca5a5" stroke-width="1.8"/>
  <text x="664" y="288" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle" font-family="monospace">m₂</text>
  <rect x="460" y="315" width="360" height="80" rx="8" fill="#030712" stroke="#6366f1" stroke-width="1.2"/>
  <text x="475" y="336" fill="#818cf8" font-size="11" font-weight="700" font-family="monospace">• a = (m₂ − m₁)g / (m₁ + m₂)</text>
  <text x="475" y="355" fill="#34d399" font-size="11" font-weight="700" font-family="monospace">• Tension T = 2m₁m₂g / (m₁ + m₂)</text>
  <text x="475" y="375" fill="#fbbf24" font-size="10.5" font-family="monospace">• Impulse J = F·Δt = Δp  |  F_net = dp/dt</text>
</svg>`;
}

// 2. Physics: Gravitation & Orbital Mechanics
export function generateGravitationDiagram() {
  return `<svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="gravBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/><stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
    <radialGradient id="earthGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#38bdf8"/><stop offset="60%" stop-color="#0284c7"/><stop offset="100%" stop-color="#1e3a8a"/>
    </radialGradient>
  </defs>
  <rect width="860" height="430" rx="16" fill="url(#gravBg)"/>
  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">🌍 GRAVITATION — KEPLER ORBITS, g VARIATION &amp; ESCAPE VELOCITY</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">F = GMm/r² · v_escape = √(2gR) = 11.2 km/s · T² ∝ r³</text>

  <ellipse cx="235" cy="235" rx="175" ry="110" fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="6,4"/>
  <circle cx="170" cy="235" r="46" fill="url(#earthGrad)" stroke="#7dd3fc" stroke-width="2"/>
  <text x="170" y="240" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">Earth (M, R)</text>
  <circle cx="385" cy="180" r="14" fill="#fbbf24" stroke="#fef08a" stroke-width="2"/>
  <text x="385" y="158" fill="#fde68a" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Satellite (m)</text>
  <line x1="216" y1="224" x2="372" y2="184" stroke="#10b981" stroke-width="1.8" stroke-dasharray="4,3"/>
  <text x="295" y="195" fill="#34d399" font-size="11" font-weight="700" font-family="monospace">r = R + h</text>

  <rect x="445" y="74" width="395" height="330" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="642" y="100" fill="#38bdf8" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">🎯 NEET GRAVITATION FORMULAE</text>
  <text x="465" y="130" fill="#34d399" font-size="11" font-weight="700" font-family="monospace">• Surface g = GM / R² ≈ 9.8 m/s²</text>
  <text x="465" y="152" fill="#e2e8f0" font-size="10.5" font-family="monospace">• Altitude (h): g' = g / (1 + h/R)² ≈ g(1 − 2h/R)</text>
  <text x="465" y="174" fill="#e2e8f0" font-size="10.5" font-family="monospace">• Depth (d):    g' = g(1 − d/R)  [0 at center]</text>
  <line x1="465" y1="192" x2="820" y2="192" stroke="#334155" stroke-width="1"/>
  <text x="465" y="214" fill="#fbbf24" font-size="11" font-weight="700" font-family="monospace">• Orbital Velocity: v₀ = √(GM/r) = √(gR)</text>
  <text x="465" y="236" fill="#fb7185" font-size="11" font-weight="700" font-family="monospace">• Escape Velocity:  vₑ = √(2GM/R) = √2 · v₀</text>
  <text x="465" y="258" fill="#c084fc" font-size="10.5" font-family="monospace">• Total Energy E = −GMm/(2r) = −KE = PE/2</text>
  <line x1="465" y1="276" x2="820" y2="276" stroke="#334155" stroke-width="1"/>
  <text x="465" y="298" fill="#38bdf8" font-size="11" font-weight="700" font-family="system-ui">Kepler's Three Laws:</text>
  <text x="465" y="318" fill="#e2e8f0" font-size="10.5" font-family="system-ui">1. Elliptical orbits (Sun at one focus)</text>
  <text x="465" y="336" fill="#e2e8f0" font-size="10.5" font-family="system-ui">2. dA/dt = L/(2m) = constant (Angular momentum)</text>
  <text x="465" y="354" fill="#34d399" font-size="10.5" font-weight="700" font-family="monospace">3. T² = (4π² / GM) r³  ⇒  T² ∝ r³</text>
</svg>`;
}

// 3. Physics: Current Electricity & Wheatstone Bridge
export function generateCurrentElectricityDiagram() {
  return `<svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="ceBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/><stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
  </defs>
  <rect width="860" height="430" rx="16" fill="url(#ceBg)"/>
  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">🔌 CURRENT ELECTRICITY — WHEATSTONE BRIDGE &amp; KIRCHHOFF'S LAWS</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">I = n e A vd · V = I R · Balanced Bridge: P / Q = R / S (Ig = 0)</text>

  <!-- Wheatstone Bridge Diamond -->
  <polygon points="225,110 355,220 225,330 95,220" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
  <line x1="225" y1="110" x2="225" y2="330" stroke="#fbbf24" stroke-width="2" stroke-dasharray="5,3"/>
  <circle cx="225" cy="220" r="18" fill="#0f172a" stroke="#fbbf24" stroke-width="2"/>
  <text x="225" y="225" fill="#fbbf24" font-size="13" font-weight="800" text-anchor="middle" font-family="monospace">G</text>
  <rect x="130" y="142" width="36" height="22" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
  <text x="148" y="157" fill="#34d399" font-size="11" font-weight="700" text-anchor="middle" font-family="monospace">P</text>
  <rect x="284" y="142" width="36" height="22" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
  <text x="302" y="157" fill="#34d399" font-size="11" font-weight="700" text-anchor="middle" font-family="monospace">Q</text>
  <rect x="130" y="268" width="36" height="22" rx="4" fill="#0f172a" stroke="#818cf8" stroke-width="1.5"/>
  <text x="148" y="283" fill="#a5b4fc" font-size="11" font-weight="700" text-anchor="middle" font-family="monospace">R</text>
  <rect x="284" y="268" width="36" height="22" rx="4" fill="#0f172a" stroke="#818cf8" stroke-width="1.5"/>
  <text x="302" y="283" fill="#a5b4fc" font-size="11" font-weight="700" text-anchor="middle" font-family="monospace">S</text>
  <text x="225" y="365" fill="#34d399" font-size="12" font-weight="700" text-anchor="middle" font-family="monospace">Balanced: P/Q = R/S ⇒ Ig = 0</text>

  <!-- Right Panel: Key Laws -->
  <rect x="440" y="75" width="400" height="330" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="640" y="102" fill="#34d399" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">DRIFT VELOCITY, POWER &amp; KIRCHHOFF</text>
  <text x="460" y="132" fill="#e2e8f0" font-size="11" font-family="monospace">• Drift Velocity: vd = (eE / m)τ  |  I = neAvd</text>
  <text x="460" y="154" fill="#e2e8f0" font-size="11" font-family="monospace">• Resistance: R = ρ(L / A)  |  ρ = m/(ne²τ)</text>
  <text x="460" y="176" fill="#fbbf24" font-size="11" font-family="monospace">• Stretching wire (n×): R_new = n² R_old</text>
  <line x1="460" y1="194" x2="820" y2="194" stroke="#334155" stroke-width="1"/>
  <text x="460" y="216" fill="#38bdf8" font-size="11" font-weight="700" font-family="system-ui">Kirchhoff's Rules:</text>
  <text x="460" y="236" fill="#e2e8f0" font-size="10.5" font-family="system-ui">1. KCL (Junction): ΣI = 0 (Charge conservation)</text>
  <text x="460" y="256" fill="#e2e8f0" font-size="10.5" font-family="system-ui">2. KVL (Loop): ΣΔV = 0 (Energy conservation)</text>
  <line x1="460" y1="274" x2="820" y2="274" stroke="#334155" stroke-width="1"/>
  <text x="460" y="296" fill="#fb7185" font-size="11" font-weight="700" font-family="monospace">• Cell Terminal Voltage: V = E − I·r</text>
  <text x="460" y="316" fill="#34d399" font-size="11" font-weight="700" font-family="monospace">• Max Power Transfer when R_ext = r_int</text>
  <text x="460" y="338" fill="#c084fc" font-size="10.5" font-family="monospace">• Power P = VI = I²R = V²/R</text>
  <text x="460" y="368" fill="#94a3b8" font-size="10" font-family="system-ui">• Meter Bridge &amp; Potentiometer work on null deflection</text>
</svg>`;
}

// 4. Physics: Magnetism, Solenoid & Lorentz Force
export function generateMagnetismDiagram() {
  return `<svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="magBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/><stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
  </defs>
  <rect width="860" height="430" rx="16" fill="url(#magBg)"/>
  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">🧲 MAGNETISM — SOLENOID FIELD &amp; LORENTZ FORCE (NCERT)</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Biot-Savart Law · Ampere's Law (B = μ₀nI) · F = q(v × B)</text>

  <!-- Solenoid coils & uniform B field -->
  <rect x="45" y="95" width="370" height="260" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="230" y="120" fill="#38bdf8" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">SOLENOID MAGNETIC FIELD (B = μ₀nI)</text>
  <line x1="75" y1="220" x2="385" y2="220" stroke="#10b981" stroke-width="3"/>
  <line x1="75" y1="195" x2="385" y2="195" stroke="#10b981" stroke-width="2" stroke-dasharray="6,3"/>
  <line x1="75" y1="245" x2="385" y2="245" stroke="#10b981" stroke-width="2" stroke-dasharray="6,3"/>
  <ellipse cx="140" cy="220" rx="16" ry="52" fill="none" stroke="#f59e0b" stroke-width="3"/>
  <ellipse cx="185" cy="220" rx="16" ry="52" fill="none" stroke="#f59e0b" stroke-width="3"/>
  <ellipse cx="230" cy="220" rx="16" ry="52" fill="none" stroke="#f59e0b" stroke-width="3"/>
  <ellipse cx="275" cy="220" rx="16" ry="52" fill="none" stroke="#f59e0b" stroke-width="3"/>
  <ellipse cx="320" cy="220" rx="16" ry="52" fill="none" stroke="#f59e0b" stroke-width="3"/>
  <text x="230" y="302" fill="#34d399" font-size="11.5" font-weight="700" text-anchor="middle" font-family="monospace">Uniform B inside: B = μ₀ n I</text>
  <text x="230" y="324" fill="#94a3b8" font-size="10.5" text-anchor="middle" font-family="monospace">At ends: B_end = ½ μ₀ n I</text>

  <!-- Right Panel: Cyclotron / Circular Motion -->
  <rect x="440" y="75" width="400" height="330" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="640" y="102" fill="#fb7185" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">CHARGED PARTICLE IN B-FIELD</text>
  <text x="460" y="134" fill="#e2e8f0" font-size="11" font-family="monospace">• Magnetic Force: F = qvB sinθ</text>
  <text x="460" y="156" fill="#34d399" font-size="11" font-weight="700" font-family="monospace">• Radius (θ=90°): r = mv / (qB) = p/(qB)</text>
  <text x="460" y="178" fill="#fbbf24" font-size="11" font-weight="700" font-family="monospace">• Time Period: T = 2πm / (qB)  [indep. of v!]</text>
  <line x1="460" y1="196" x2="820" y2="196" stroke="#334155" stroke-width="1"/>
  <text x="460" y="220" fill="#38bdf8" font-size="11" font-weight="700" font-family="monospace">• Wire at center of loop: B = μ₀I / (2R)</text>
  <text x="460" y="242" fill="#e2e8f0" font-size="11" font-family="monospace">• Long straight wire:     B = μ₀I / (2πd)</text>
  <text x="460" y="264" fill="#c084fc" font-size="11" font-family="monospace">• Force btw 2 wires: F/L = μ₀I₁I₂ / (2πd)</text>
  <line x1="460" y1="282" x2="820" y2="282" stroke="#334155" stroke-width="1"/>
  <text x="460" y="306" fill="#fb7185" font-size="10.5" font-family="system-ui">• Faraday EMI: ε = −dΦ_B / dt  (Lenz's Law)</text>
  <text x="460" y="326" fill="#e2e8f0" font-size="10.5" font-family="system-ui">• Motional EMF: ε = B · l · v</text>
  <text x="460" y="346" fill="#34d399" font-size="10.5" font-family="system-ui">• Self-Inductance Energy: U = ½ L I²</text>
</svg>`;
}

// 5. Physics: Waves, SHM & Doppler Effect
export function generateWavesSHMDiagram() {
  return `<svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="wvBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/><stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
  </defs>
  <rect width="860" height="430" rx="16" fill="url(#wvBg)"/>
  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">〰️ OSCILLATIONS (SHM) &amp; STANDING WAVES (NCERT)</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">a = −ω²x · T = 2π√(l/g) · Standing Wave Nodes &amp; Antinodes · Organ Pipes</text>

  <!-- Standing wave harmonic n=2 -->
  <rect x="25" y="70" width="400" height="330" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="225" y="96" fill="#34d399" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">STANDING WAVE &amp; SHM ENERGY</text>
  <line x1="55" y1="190" x2="395" y2="190" stroke="#475569" stroke-width="1.5"/>
  <path d="M 55,190 Q 140,115 225,190 T 395,190" fill="none" stroke="#38bdf8" stroke-width="3"/>
  <path d="M 55,190 Q 140,265 225,190 T 395,190" fill="none" stroke="#818cf8" stroke-width="2" stroke-dasharray="5,3"/>
  <circle cx="55" cy="190" r="6" fill="#f43f5e"/><circle cx="225" cy="190" r="6" fill="#f43f5e"/><circle cx="395" cy="190" r="6" fill="#f43f5e"/>
  <text x="225" y="212" fill="#fb7185" font-size="10.5" font-weight="700" text-anchor="middle" font-family="system-ui">Node (N)</text>
  <text x="140" y="135" fill="#38bdf8" font-size="10.5" font-weight="700" text-anchor="middle" font-family="system-ui">Antinode (A)</text>
  <rect x="45" y="285" width="360" height="95" rx="8" fill="#030712" stroke="#10b981" stroke-width="1.2"/>
  <text x="60" y="308" fill="#34d399" font-size="11" font-weight="700" font-family="monospace">• N–N distance = λ/2  |  N–A = λ/4</text>
  <text x="60" y="328" fill="#e2e8f0" font-size="10.5" font-family="monospace">• Closed Pipe: f = (2n−1)v/(4L) [Odd only]</text>
  <text x="60" y="348" fill="#e2e8f0" font-size="10.5" font-family="monospace">• Open Pipe:   f = n·v / (2L)   [All harmonics]</text>
  <text x="60" y="368" fill="#fbbf24" font-size="10.5" font-family="monospace">• Beats: f_beat = |f₁ − f₂|</text>

  <rect x="445" y="70" width="395" height="330" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="642" y="96" fill="#fbbf24" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">SHM KINEMATICS &amp; DOPPLER</text>
  <text x="465" y="130" fill="#e2e8f0" font-size="11" font-family="monospace">• x = A sin(ωt + φ)</text>
  <text x="465" y="152" fill="#38bdf8" font-size="11" font-weight="700" font-family="monospace">• v = ω√(A² − x²)  [v_max = Aω at x=0]</text>
  <text x="465" y="174" fill="#fb7185" font-size="11" font-weight="700" font-family="monospace">• a = −ω²x         [a_max = ω²A at x=±A]</text>
  <text x="465" y="198" fill="#34d399" font-size="11" font-weight="700" font-family="monospace">• KE = ½k(A²−x²) | PE = ½kx² | TE = ½kA²</text>
  <line x1="465" y1="216" x2="820" y2="216" stroke="#334155" stroke-width="1"/>
  <text x="465" y="240" fill="#fbbf24" font-size="11" font-weight="700" font-family="monospace">• Spring:   T = 2π√(m / k)</text>
  <text x="465" y="262" fill="#fbbf24" font-size="11" font-weight="700" font-family="monospace">• Pendulum: T = 2π√(l / g)</text>
  <line x1="465" y1="280" x2="820" y2="280" stroke="#334155" stroke-width="1"/>
  <text x="465" y="304" fill="#c084fc" font-size="11" font-weight="700" font-family="system-ui">Doppler Effect (Sound):</text>
  <text x="465" y="326" fill="#e2e8f0" font-size="11.5" font-weight="700" font-family="monospace">f' = f · [(v ± v₀) / (v ∓ vₛ)]</text>
  <text x="465" y="348" fill="#94a3b8" font-size="10" font-family="system-ui">Approach → higher frequency; Receding → lower f'</text>
</svg>`;
}

// 6. Physics: Semiconductors, p-n Junction & Logic Gates
export function generateSemiconductorModernDiagram() {
  return `<svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="smBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/><stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
  </defs>
  <rect width="860" height="430" rx="16" fill="url(#smBg)"/>
  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">💻 SEMICONDUCTORS, P-N JUNCTION &amp; LOGIC GATES (NCERT)</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">P-Type (Holes) · N-Type (Electrons) · Depletion Layer · Universal Gates (NAND / NOR)</text>

  <!-- p-n Junction Diagram -->
  <rect x="25" y="72" width="400" height="330" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="225" y="96" fill="#38bdf8" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">P-N JUNCTION DIODE &amp; DEPLETION LAYER</text>
  <rect x="55" y="125" width="140" height="110" fill="#7c3aed" opacity="0.35" stroke="#a78bfa" stroke-width="1.5"/>
  <rect x="195" y="125" width="60" height="110" fill="#f59e0b" opacity="0.22" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="255" y="125" width="140" height="110" fill="#059669" opacity="0.35" stroke="#34d399" stroke-width="1.5"/>
  <text x="125" y="165" fill="#ddd6fe" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">P-Type</text>
  <text x="125" y="185" fill="#c4b5fd" font-size="10.5" text-anchor="middle" font-family="system-ui">Majority: Holes (+)</text>
  <text x="225" y="175" fill="#fde68a" font-size="10" font-weight="700" text-anchor="middle" font-family="system-ui">Depletion</text>
  <text x="225" y="190" fill="#fde68a" font-size="10" text-anchor="middle" font-family="system-ui">Region</text>
  <text x="325" y="165" fill="#a7f3d0" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">N-Type</text>
  <text x="325" y="185" fill="#6ee7b7" font-size="10.5" text-anchor="middle" font-family="system-ui">Majority: e⁻ (−)</text>
  <rect x="45" y="255" width="360" height="128" rx="8" fill="#030712" stroke="#334155" stroke-width="1"/>
  <text x="60" y="278" fill="#34d399" font-size="11" font-weight="700" font-family="system-ui">• Forward Bias (P to +, N to −): Width ↓, Current flows</text>
  <text x="60" y="298" fill="#fb7185" font-size="11" font-weight="700" font-family="system-ui">• Reverse Bias (P to −, N to +): Width ↑, No current</text>
  <text x="60" y="320" fill="#fbbf24" font-size="10.5" font-family="system-ui">• Zener Diode: Voltage regulator (Reverse breakdown)</text>
  <text x="60" y="340" fill="#38bdf8" font-size="10.5" font-family="system-ui">• Photoelectric: hν = φ₀ + K_max (Einstein)</text>
  <text x="60" y="360" fill="#e2e8f0" font-size="10.5" font-family="monospace">• de Broglie: λ = h / p = h / √(2mK)</text>

  <!-- Logic Gates Reference -->
  <rect x="445" y="72" width="395" height="330" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="642" y="96" fill="#34d399" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">DIGITAL LOGIC GATES (BOOLEAN)</text>
  <text x="465" y="130" fill="#e2e8f0" font-size="11" font-weight="700" font-family="monospace">1. AND:  Y = A · B    (1 only if A=1, B=1)</text>
  <text x="465" y="156" fill="#e2e8f0" font-size="11" font-weight="700" font-family="monospace">2. OR:   Y = A + B    (0 only if A=0, B=0)</text>
  <text x="465" y="182" fill="#e2e8f0" font-size="11" font-weight="700" font-family="monospace">3. NOT:  Y = Ā        (Inverter)</text>
  <line x1="465" y1="202" x2="820" y2="202" stroke="#334155" stroke-width="1"/>
  <text x="465" y="226" fill="#fbbf24" font-size="11.5" font-weight="800" font-family="monospace">4. NAND: Y = (A·B)'   [Universal Gate]</text>
  <text x="465" y="252" fill="#fbbf24" font-size="11.5" font-weight="800" font-family="monospace">5. NOR:  Y = (A+B)'   [Universal Gate]</text>
  <text x="465" y="278" fill="#c084fc" font-size="11" font-weight="700" font-family="monospace">6. XOR:  Y = A⊕B = ĀB + AḂ</text>
  <line x1="465" y1="298" x2="820" y2="298" stroke="#334155" stroke-width="1"/>
  <text x="465" y="322" fill="#38bdf8" font-size="11" font-weight="700" font-family="system-ui">De Morgan's Theorems (NEET Favorite):</text>
  <text x="465" y="344" fill="#34d399" font-size="11.5" font-weight="700" font-family="monospace">• (A + B)' = Ā · B̄</text>
  <text x="465" y="366" fill="#34d399" font-size="11.5" font-weight="700" font-family="monospace">• (A · B)' = Ā + B̄</text>
</svg>`;
}

// 7. Chemistry: Equilibrium, Le Chatelier & Kinetics
export function generateEquilibriumKineticsDiagram() {
  return `<svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="eqBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/><stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
  </defs>
  <rect width="860" height="430" rx="16" fill="url(#eqBg)"/>
  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">⚖️ CHEMICAL EQUILIBRIUM &amp; KINETICS INFOGRAPHIC (NCERT)</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Kp = Kc(RT)^Δng · pH = −log[H⁺] · First-Order t₁/₂ = 0.693 / k · Arrhenius Equation</text>

  <!-- Left: Dynamic Equilibrium Graph -->
  <rect x="20" y="70" width="405" height="335" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="222" y="96" fill="#34d399" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">DYNAMIC EQUILIBRIUM (rf = rb)</text>
  <line x1="60" y1="260" x2="395" y2="260" stroke="#475569" stroke-width="1.5"/>
  <line x1="60" y1="120" x2="60" y2="260" stroke="#475569" stroke-width="1.5"/>
  <path d="M 60,135 Q 140,190 240,195 L 390,195" fill="none" stroke="#38bdf8" stroke-width="3"/>
  <path d="M 60,255 Q 140,200 240,195 L 390,195" fill="none" stroke="#f43f5e" stroke-width="3"/>
  <line x1="240" y1="120" x2="240" y2="260" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="115" y="140" fill="#7dd3fc" font-size="11" font-weight="700" font-family="system-ui">Forward Rate (rf)</text>
  <text x="115" y="245" fill="#fda4af" font-size="11" font-weight="700" font-family="system-ui">Reverse Rate (rb)</text>
  <text x="315" y="185" fill="#34d399" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Equilibrium (rf = rb)</text>
  <rect x="38" y="278" width="368" height="112" rx="8" fill="#030712" stroke="#10b981" stroke-width="1.2"/>
  <text x="52" y="298" fill="#34d399" font-size="11" font-weight="700" font-family="monospace">• Kp = Kc(RT)^Δng   |   Q &lt; K → Forward</text>
  <text x="52" y="318" fill="#e2e8f0" font-size="10.5" font-family="system-ui">• Le Chatelier: ↑Pressure → fewer gas moles</text>
  <text x="52" y="338" fill="#fbbf24" font-size="10.5" font-family="monospace">• Henderson Buffer: pH = pKa + log([Salt]/[Acid])</text>
  <text x="52" y="358" fill="#38bdf8" font-size="10.5" font-family="monospace">• Solubility Product (AB₂): Ksp = 4s³</text>
  <text x="52" y="378" fill="#94a3b8" font-size="10" font-family="system-ui">• pH + pOH = 14 (at 298 K, Kw = 10⁻¹⁴)</text>

  <!-- Right: Chemical Kinetics -->
  <rect x="440" y="70" width="400" height="335" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="640" y="96" fill="#fbbf24" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">CHEMICAL KINETICS &amp; ORDER</text>
  <rect x="460" y="112" width="360" height="72" rx="8" fill="#030712" stroke="#6366f1" stroke-width="1.2"/>
  <text x="475" y="134" fill="#818cf8" font-size="11" font-weight="700" font-family="monospace">Zero Order (n=0):</text>
  <text x="475" y="152" fill="#e2e8f0" font-size="10.5" font-family="monospace">• [A] = [A]₀ − kt   |   t₁/₂ = [A]₀ / (2k)</text>
  <text x="475" y="170" fill="#94a3b8" font-size="10" font-family="monospace">• Unit of k: mol·L⁻¹·s⁻¹</text>

  <rect x="460" y="196" width="360" height="80" rx="8" fill="#030712" stroke="#10b981" stroke-width="1.2"/>
  <text x="475" y="218" fill="#34d399" font-size="11" font-weight="700" font-family="monospace">First Order (n=1) — Most Tested:</text>
  <text x="475" y="236" fill="#e2e8f0" font-size="10.5" font-family="monospace">• k = (2.303/t) log([A]₀/[A])</text>
  <text x="475" y="254" fill="#fbbf24" font-size="11" font-weight="700" font-family="monospace">• t₁/₂ = 0.693 / k  (Independent of [A]₀!)</text>
  <text x="475" y="270" fill="#94a3b8" font-size="10" font-family="monospace">• Unit of k: s⁻¹</text>

  <rect x="460" y="288" width="360" height="102" rx="8" fill="#030712" stroke="#f43f5e" stroke-width="1.2"/>
  <text x="475" y="310" fill="#fb7185" font-size="11" font-weight="700" font-family="system-ui">Arrhenius Equation &amp; Catalyst:</text>
  <text x="475" y="330" fill="#e2e8f0" font-size="11" font-weight="700" font-family="monospace">• k = A · e^(−Ea / RT)</text>
  <text x="475" y="350" fill="#e2e8f0" font-size="10.5" font-family="monospace">• log(k₂/k₁) = (Ea / 2.303R) [1/T₁ − 1/T₂]</text>
  <text x="475" y="372" fill="#34d399" font-size="10" font-family="system-ui">• Catalyst lowers Ea; ΔH &amp; Keq remain unchanged</text>
</svg>`;
}

// 8. Biology: Neuron, Synapse & Impulse Conduction
export function generateNeuronSynapseDiagram() {
  return `<svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="neuBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/><stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
  </defs>
  <rect width="860" height="430" rx="16" fill="url(#neuBg)"/>
  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">🧠 NEURON STRUCTURE &amp; SYNAPTIC TRANSMISSION (NCERT)</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Dendrites → Soma → Axon (Myelin Sheath / Nodes of Ranvier) → Synaptic Knob (ACh)</text>

  <!-- Soma & Dendrites -->
  <path d="M 85,120 L 125,165 M 65,180 L 120,180 M 85,245 L 125,195 M 115,105 L 145,155" stroke="#38bdf8" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="155" cy="180" r="42" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2.5"/>
  <circle cx="155" cy="180" r="14" fill="#a855f7" stroke="#e9d5ff" stroke-width="1.5"/>
  <!-- Axon -->
  <line x1="197" y1="180" x2="545" y2="180" stroke="#fbbf24" stroke-width="6"/>
  <!-- Myelin Sheaths (Schwann Cells) -->
  <rect x="220" y="164" width="68" height="32" rx="14" fill="#059669" stroke="#6ee7b7" stroke-width="2"/>
  <rect x="305" y="164" width="68" height="32" rx="14" fill="#059669" stroke="#6ee7b7" stroke-width="2"/>
  <rect x="390" y="164" width="68" height="32" rx="14" fill="#059669" stroke="#6ee7b7" stroke-width="2"/>
  <rect x="475" y="164" width="68" height="32" rx="14" fill="#059669" stroke="#6ee7b7" stroke-width="2"/>
  <!-- Synaptic Terminals -->
  <path d="M 545,180 L 605,145 M 545,180 L 605,180 M 545,180 L 605,215" stroke="#fbbf24" stroke-width="3"/>
  <circle cx="612" cy="145" r="9" fill="#f43f5e"/><circle cx="612" cy="180" r="9" fill="#f43f5e"/><circle cx="612" cy="215" r="9" fill="#f43f5e"/>

  <!-- Labels -->
  <text x="155" y="242" fill="#93c5fd" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Cell Body (Nissl's Granules)</text>
  <text x="296" y="148" fill="#fde68a" font-size="10.5" font-weight="700" text-anchor="middle" font-family="system-ui">Node of Ranvier (Saltatory)</text>
  <text x="424" y="216" fill="#6ee7b7" font-size="10.5" font-weight="700" text-anchor="middle" font-family="system-ui">Myelin Sheath (Schwann Cell)</text>
  <text x="640" y="184" fill="#fda4af" font-size="11" font-weight="700" font-family="system-ui">Synaptic Knobs (Ca²⁺ → ACh)</text>

  <!-- Action Potential Summary Cards -->
  <rect x="35" y="275" width="790" height="130" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="55" y="300" fill="#34d399" font-size="12" font-weight="800" font-family="system-ui">⚡ NERVE IMPULSE CONDUCTION (ACTION POTENTIAL)</text>
  <text x="55" y="324" fill="#e2e8f0" font-size="11" font-family="system-ui">1. Resting Potential (−70 mV): Axoplasm high K⁺, outer high Na⁺ (3Na⁺ out / 2K⁺ in pump).</text>
  <text x="55" y="344" fill="#fbbf24" font-size="11" font-family="system-ui">2. Depolarization (+30 to +45 mV): Rapid influx of Na⁺ ions across voltage-gated channels.</text>
  <text x="55" y="364" fill="#38bdf8" font-size="11" font-family="system-ui">3. Repolarization: Outflux of K⁺ ions restores resting negativity.</text>
  <text x="55" y="384" fill="#fb7185" font-size="11" font-family="system-ui">4. Chemical Synapse: Ca²⁺ entry triggers vesicle fusion → Acetylcholine crosses 20 nm cleft.</text>
</svg>`;
}

// 9. Biology: Biotechnology (PCR & Recombinant DNA)
export function generateBiotechPCRDiagram() {
  return `<svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="btBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/><stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
  </defs>
  <rect width="860" height="430" rx="16" fill="url(#btBg)"/>
  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">🧪 BIOTECHNOLOGY — PCR AMPLIFICATION &amp; rDNA (NCERT)</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Denaturation (94°C) → Annealing (54°C) → Extension (72°C, Taq Polymerase) · EcoRI Sticky Ends</text>

  <!-- 3 PCR Steps -->
  <rect x="25" y="75" width="250" height="150" rx="12" fill="#0f172a" stroke="#f43f5e" stroke-width="1.8"/>
  <text x="150" y="102" fill="#fb7185" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">① DENATURATION (94°C)</text>
  <line x1="65" y1="130" x2="235" y2="130" stroke="#38bdf8" stroke-width="3"/>
  <line x1="65" y1="160" x2="235" y2="160" stroke="#10b981" stroke-width="3"/>
  <text x="150" y="195" fill="#e2e8f0" font-size="10.5" text-anchor="middle" font-family="system-ui">H-bonds break; dsDNA separates</text>
  <text x="150" y="212" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">into two single-stranded templates</text>

  <rect x="305" y="75" width="250" height="150" rx="12" fill="#0f172a" stroke="#f59e0b" stroke-width="1.8"/>
  <text x="430" y="102" fill="#fbbf24" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">② ANNEALING (50–60°C)</text>
  <line x1="345" y1="130" x2="515" y2="130" stroke="#38bdf8" stroke-width="3"/>
  <rect x="345" y="138" width="45" height="8" fill="#fbbf24" rx="2"/>
  <rect x="470" y="150" width="45" height="8" fill="#fbbf24" rx="2"/>
  <line x1="345" y1="162" x2="515" y2="162" stroke="#10b981" stroke-width="3"/>
  <text x="430" y="195" fill="#e2e8f0" font-size="10.5" text-anchor="middle" font-family="system-ui">Two oligonucleotide primers bind</text>
  <text x="430" y="212" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">to 3' ends of target DNA</text>

  <rect x="585" y="75" width="250" height="150" rx="12" fill="#0f172a" stroke="#10b981" stroke-width="1.8"/>
  <text x="710" y="102" fill="#34d399" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">③ EXTENSION (72°C)</text>
  <line x1="625" y1="130" x2="795" y2="130" stroke="#38bdf8" stroke-width="3"/>
  <line x1="625" y1="140" x2="795" y2="140" stroke="#10b981" stroke-width="3" stroke-dasharray="6,2"/>
  <text x="710" y="195" fill="#e2e8f0" font-size="10.5" text-anchor="middle" font-family="system-ui">Thermostable Taq Polymerase</text>
  <text x="710" y="212" fill="#6ee7b7" font-size="10" text-anchor="middle" font-family="system-ui">(Thermus aquaticus) → 2ⁿ copies!</text>

  <!-- pBR322 & Restriction Enzymes -->
  <rect x="25" y="245" width="810" height="160" rx="12" fill="#0f172a" stroke="#6366f1" stroke-width="1.5"/>
  <text x="430" y="270" fill="#818cf8" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">RECOMBINANT DNA TOOLS (pBR322 &amp; RESTRICTION ENZYMES)</text>
  <text x="45" y="298" fill="#34d399" font-size="11" font-weight="700" font-family="monospace">• EcoRI Palindrome: 5'-G↓AATTC-3' / 3'-CTTAA↑G-5'  (Sticky Ends)</text>
  <text x="45" y="320" fill="#e2e8f0" font-size="11" font-family="system-ui">• Vector pBR322: ori + rop + Selectable Markers (ampᴿ with PstI/PvuI; tetᴿ with BamHI/SalI)</text>
  <text x="45" y="342" fill="#fbbf24" font-size="11" font-family="system-ui">• Gel Electrophoresis: DNA (−ve) moves toward Anode (+); smaller fragments travel faster; stained with Ethidium Bromide (UV orange).</text>
  <text x="45" y="364" fill="#38bdf8" font-size="11" font-family="system-ui">• Insertional Inactivation: Blue-White screening (lacZ gene inactivated → White colonies = Recombinants).</text>
  <text x="45" y="386" fill="#fb7185" font-size="10.5" font-family="system-ui">• PCR Amplification after 30 cycles = 2³⁰ ≈ 1 billion copies (Kary Mullis)</text>
</svg>`;
}

// 10. Biology: Ecology & 10% Energy Pyramid
export function generateEcologyPyramidDiagram() {
  return `<svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="ecoBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/><stop offset="100%" stop-color="#071428"/>
    </linearGradient>
  </defs>
  <rect width="860" height="430" rx="16" fill="url(#ecoBg)"/>
  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">🌿 ECOLOGY — LINDEMAN'S 10% ENERGY PYRAMID (ALWAYS UPRIGHT)</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Trophic Levels · GPP − R = NPP · Unidirectional Energy Flow · Ecological Pyramids</text>

  <!-- Pyramid Tiers -->
  <polygon points="225,95 275,160 175,160" fill="#f43f5e" stroke="#fda4af" stroke-width="1.5"/>
  <text x="225" y="148" fill="#ffffff" font-size="10.5" font-weight="700" text-anchor="middle" font-family="system-ui">T4: 10 J</text>

  <polygon points="175,165 275,165 315,230 135,230" fill="#f59e0b" stroke="#fde68a" stroke-width="1.5"/>
  <text x="225" y="205" fill="#ffffff" font-size="11.5" font-weight="700" text-anchor="middle" font-family="system-ui">T3 Secondary: 100 J</text>

  <polygon points="135,235 315,235 355,300 95,300" fill="#3b82f6" stroke="#93c5fd" stroke-width="1.5"/>
  <text x="225" y="275" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui">T2 Herbivores: 1,000 J</text>

  <polygon points="95,305 355,305 400,375 50,375" fill="#10b981" stroke="#6ee7b7" stroke-width="1.5"/>
  <text x="225" y="346" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">T1 Producers (Plants): 10,000 J</text>

  <rect x="430" y="75" width="410" height="325" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="635" y="102" fill="#34d399" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">🎯 NEET ECOLOGY HIGH-YIELD RULES</text>
  <text x="450" y="132" fill="#34d399" font-size="11" font-weight="700" font-family="system-ui">1. Pyramid of Energy: ALWAYS UPRIGHT (10% Law)</text>
  <text x="450" y="152" fill="#e2e8f0" font-size="10.5" font-family="system-ui">   90% energy lost as heat at each trophic transfer.</text>
  <text x="450" y="180" fill="#fbbf24" font-size="11" font-weight="700" font-family="system-ui">2. Exceptions (Inverted Pyramids):</text>
  <text x="450" y="200" fill="#e2e8f0" font-size="10.5" font-family="system-ui">   • Pyramid of Biomass in SEA/OCEAN = INVERTED</text>
  <text x="450" y="218" fill="#e2e8f0" font-size="10.5" font-family="system-ui">   • Pyramid of Number on single TREE = INVERTED/Spindle</text>
  <line x1="450" y1="236" x2="820" y2="236" stroke="#334155" stroke-width="1"/>
  <text x="450" y="260" fill="#38bdf8" font-size="11" font-weight="700" font-family="monospace">• Productivity: NPP = GPP − R (Respiration)</text>
  <text x="450" y="282" fill="#c084fc" font-size="11" font-weight="700" font-family="monospace">• Logistic Growth: dN/dt = rN[(K − N)/K]</text>
  <text x="450" y="304" fill="#fb7185" font-size="11" font-weight="700" font-family="monospace">• Species-Area: log S = log C + Z log A</text>
  <text x="450" y="330" fill="#94a3b8" font-size="10" font-family="system-ui">• Decomposition: Fragmentation → Leaching → Catabolism</text>
  <text x="450" y="348" fill="#94a3b8" font-size="10" font-family="system-ui">  → Humification → Mineralisation</text>
</svg>`;
}

export function generateAnimalKingdomDiagram() {
  return `<svg viewBox="0 0 840 420" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#050a14;border-radius:16px;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <radialGradient id="akBg" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#0f2922" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#050a14" stop-opacity="1"/>
    </radialGradient>
  </defs>
  <rect width="840" height="420" fill="url(#akBg)" rx="16"/>

  <!-- Header -->
  <rect x="24" y="16" width="792" height="40" rx="10" fill="#0b1526" stroke="#10b981" stroke-width="1.2" stroke-opacity="0.6"/>
  <text x="420" y="41" text-anchor="middle" fill="#34d399" font-size="15" font-weight="800" letter-spacing="0.4">KINGDOM ANIMALIA — BODY PLAN &amp; CLASSIFICATION (NCERT)</text>

  <!-- Card 1: Symmetry -->
  <rect x="24" y="70" width="250" height="175" rx="12" fill="#0a192f" stroke="#38bdf8" stroke-width="1.2" stroke-opacity="0.7"/>
  <text x="149" y="94" text-anchor="middle" fill="#38bdf8" font-size="12.5" font-weight="800">1. BODY SYMMETRY</text>
  <line x1="40" y1="102" x2="258" y2="102" stroke="#38bdf8" stroke-opacity="0.25"/>
  <!-- Asymmetrical -->
  <circle cx="58" cy="130" r="14" fill="#1e293b" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,2"/>
  <text x="82" y="127" fill="#e2e8f0" font-size="11" font-weight="700">Asymmetrical</text>
  <text x="82" y="141" fill="#94a3b8" font-size="10">Sponges (Porifera)</text>
  <!-- Radial -->
  <circle cx="58" cy="175" r="14" fill="#0c4a6e" stroke="#38bdf8" stroke-width="1.5"/>
  <line x1="44" y1="175" x2="72" y2="175" stroke="#38bdf8" stroke-width="1"/>
  <line x1="58" y1="161" x2="58" y2="189" stroke="#38bdf8" stroke-width="1"/>
  <text x="82" y="172" fill="#e2e8f0" font-size="11" font-weight="700">Radial Symmetry</text>
  <text x="82" y="186" fill="#94a3b8" font-size="10">Coelenterata, Ctenophora</text>
  <!-- Bilateral -->
  <ellipse cx="58" cy="220" rx="11" ry="15" fill="#064e3b" stroke="#34d399" stroke-width="1.5"/>
  <line x1="58" y1="205" x2="58" y2="235" stroke="#34d399" stroke-width="1.2"/>
  <text x="82" y="217" fill="#e2e8f0" font-size="11" font-weight="700">Bilateral Symmetry</text>
  <text x="82" y="231" fill="#94a3b8" font-size="10">Platyhelminthes → Chordata</text>

  <!-- Card 2: Germ Layers -->
  <rect x="295" y="70" width="250" height="175" rx="12" fill="#0a192f" stroke="#c084fc" stroke-width="1.2" stroke-opacity="0.7"/>
  <text x="420" y="94" text-anchor="middle" fill="#c084fc" font-size="12.5" font-weight="800">2. GERM LAYERS</text>
  <line x1="311" y1="102" x2="529" y2="102" stroke="#c084fc" stroke-opacity="0.25"/>
  <!-- Diploblastic -->
  <circle cx="332" cy="142" r="22" fill="#3b0764" stroke="#c084fc" stroke-width="2"/>
  <circle cx="332" cy="142" r="14" fill="#1e1b4b" stroke="#64748b" stroke-width="1" stroke-dasharray="2,2"/>
  <circle cx="332" cy="142" r="7" fill="#7c3aed"/>
  <text x="364" y="135" fill="#e2e8f0" font-size="11" font-weight="700">Diploblastic (2 Layers)</text>
  <text x="364" y="150" fill="#cbd5e1" font-size="9.5">Ectoderm + Endoderm</text>
  <text x="364" y="163" fill="#94a3b8" font-size="9.5">(Mesoglea in between)</text>
  <!-- Triploblastic -->
  <circle cx="332" cy="205" r="22" fill="#4c1d95" stroke="#e879f9" stroke-width="2"/>
  <circle cx="332" cy="205" r="14" fill="#be185d" stroke="#f472b6" stroke-width="1.5"/>
  <circle cx="332" cy="205" r="7" fill="#0f172a"/>
  <text x="364" y="198" fill="#e2e8f0" font-size="11" font-weight="700">Triploblastic (3 Layers)</text>
  <text x="364" y="213" fill="#cbd5e1" font-size="9.5">+ Mesoderm layer</text>
  <text x="364" y="226" fill="#94a3b8" font-size="9.5">Platyhelminthes → Chordata</text>

  <!-- Card 3: Coelom -->
  <rect x="566" y="70" width="250" height="175" rx="12" fill="#0a192f" stroke="#fbbf24" stroke-width="1.2" stroke-opacity="0.7"/>
  <text x="691" y="94" text-anchor="middle" fill="#fbbf24" font-size="12.5" font-weight="800">3. BODY CAVITY (COELOM)</text>
  <line x1="582" y1="102" x2="800" y2="102" stroke="#fbbf24" stroke-opacity="0.25"/>
  <text x="584" y="128" fill="#fda4af" font-size="11" font-weight="700">• Acoelomate</text>
  <text x="594" y="143" fill="#94a3b8" font-size="10">No cavity — Platyhelminthes</text>
  <text x="584" y="170" fill="#fde047" font-size="11" font-weight="700">• Pseudocoelomate</text>
  <text x="594" y="185" fill="#94a3b8" font-size="10">Mesoderm pouches — Aschelminthes</text>
  <text x="584" y="212" fill="#34d399" font-size="11" font-weight="700">• True Coelomate</text>
  <text x="594" y="227" fill="#94a3b8" font-size="10">Mesoderm-lined — Annelida → Chordata</text>

  <!-- Bottom Evolutionary Flowchart + Worked Example -->
  <rect x="24" y="260" width="792" height="140" rx="12" fill="#081222" stroke="#1e293b" stroke-width="1.2"/>
  <text x="42" y="284" fill="#34d399" font-size="11.5" font-weight="800">EVOLUTIONARY PHYLA PROGRESSION (CELLULAR → ORGAN-SYSTEM GRADE)</text>

  <rect x="42" y="298" width="128" height="32" rx="6" fill="#0f172a" stroke="#475569"/>
  <text x="106" y="318" text-anchor="middle" fill="#e2e8f0" font-size="10.5" font-weight="700">Porifera (Cellular)</text>
  <text x="180" y="318" fill="#38bdf8" font-size="14" font-weight="800">→</text>

  <rect x="196" y="298" width="150" height="32" rx="6" fill="#0f172a" stroke="#38bdf8"/>
  <text x="271" y="318" text-anchor="middle" fill="#7dd3fc" font-size="10.5" font-weight="700">Cnidaria (Tissue)</text>
  <text x="356" y="318" fill="#38bdf8" font-size="14" font-weight="800">→</text>

  <rect x="372" y="298" width="186" height="32" rx="6" fill="#0f172a" stroke="#c084fc"/>
  <text x="465" y="318" text-anchor="middle" fill="#e9d5ff" font-size="10.5" font-weight="700">Platyhelminthes (Organ)</text>
  <text x="568" y="318" fill="#38bdf8" font-size="14" font-weight="800">→</text>

  <rect x="584" y="298" width="214" height="32" rx="6" fill="#064e3b" stroke="#34d399"/>
  <text x="691" y="318" text-anchor="middle" fill="#6ee7b7" font-size="10.5" font-weight="700">Annelida → Chordata (Organ-Sys)</text>

  <rect x="42" y="346" width="756" height="40" rx="8" fill="#0b1526" stroke="#10b981" stroke-opacity="0.4"/>
  <text x="56" y="363" fill="#fbbf24" font-size="10.5" font-weight="800">KEY DIAGNOSTIC EXAMPLE (NEET PYQ):</text>
  <text x="56" y="379" fill="#cbd5e1" font-size="10.5">Echinoderms (e.g., Starfish): Larva = Bilateral symmetry, Adult = Radial symmetry | Chordata = Notochord + Dorsal hollow nerve cord + Pharyngeal gill slits.</text>
</svg>`;
}

