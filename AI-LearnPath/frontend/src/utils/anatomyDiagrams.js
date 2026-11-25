/**
 * Medically Accurate Handcrafted 3D Vector Anatomy Diagrams for NEET (UG)
 * Dark theme (#030712) with multi-layer gradients, clear pointer lines,
 * and guaranteed non-overlapping high-contrast NCERT labels.
 */

// 1. Human Liver, Biliary Tract & Hepatic Lobule (NCERT Class 11 Digestion & Absorption)
export function generateHumanLiverDiagram() {
  return `<svg viewBox="0 0 860 480" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="liverBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/>
      <stop offset="100%" stop-color="#0b1220"/>
    </linearGradient>
    <radialGradient id="rightLobeGrad" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="50%" stop-color="#b91c1c"/>
      <stop offset="100%" stop-color="#7f1d1d"/>
    </radialGradient>
    <radialGradient id="leftLobeGrad" cx="45%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#f87171"/>
      <stop offset="55%" stop-color="#dc2626"/>
      <stop offset="100%" stop-color="#991b1b"/>
    </radialGradient>
    <radialGradient id="gallGrad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="55%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#064e3b"/>
    </radialGradient>
    <linearGradient id="ivcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1d4ed8"/>
      <stop offset="50%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1e3a8a"/>
    </linearGradient>
    <linearGradient id="portalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6d28d9"/>
      <stop offset="50%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#4c1d95"/>
    </linearGradient>
    <linearGradient id="duodenumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <filter id="organShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#000000" flood-opacity="0.65"/>
    </filter>
  </defs>

  <!-- Canvas -->
  <rect width="860" height="480" rx="16" fill="url(#liverBg)"/>

  <!-- Header -->
  <rect x="20" y="14" width="820" height="46" rx="10" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
  <text x="430" y="36" fill="#f8fafc" font-size="16" font-weight="800" text-anchor="middle" font-family="system-ui">HUMAN LIVER &amp; BILIARY SYSTEM — GROSS ANATOMY (NCERT)</text>
  <text x="430" y="52" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Largest Gland (~1.2–1.5 kg) · Two Lobes · Glisson's Capsule · Hepatic Lobules</text>

  <!-- Inferior Vena Cava (behind liver) -->
  <path d="M 335,75 L 335,280" stroke="url(#ivcGrad)" stroke-width="18" stroke-linecap="round" opacity="0.9"/>
  <path d="M 335,75 L 335,280" stroke="#60a5fa" stroke-width="4" stroke-dasharray="6,6" opacity="0.5"/>

  <!-- Diaphragm dome -->
  <path d="M 85,150 Q 275,65 495,145" fill="none" stroke="#64748b" stroke-width="2.5" stroke-dasharray="6,4" opacity="0.7"/>

  <!-- RIGHT LOBE OF LIVER (Anatomical Right = Viewer's Left, larger ~5/6) -->
  <path d="M 110,165 C 95,120 185,88 305,100 C 332,103 345,118 345,145 L 338,245 C 330,275 280,292 225,282 C 145,268 100,225 110,165 Z"
        fill="url(#rightLobeGrad)" stroke="#fca5a5" stroke-width="1.8" filter="url(#organShadow)"/>

  <!-- LEFT LOBE OF LIVER (Anatomical Left = Viewer's Right, smaller tapering) -->
  <path d="M 345,145 C 350,115 375,105 425,115 C 485,128 520,152 515,172 C 510,192 435,205 375,222 C 352,228 340,210 338,185 Z"
        fill="url(#leftLobeGrad)" stroke="#fca5a5" stroke-width="1.8" filter="url(#organShadow)"/>

  <!-- Falciform Ligament (divides Right & Left Lobes) -->
  <path d="M 340,95 Q 348,160 338,238" fill="none" stroke="#fef3c7" stroke-width="4" stroke-linecap="round" opacity="0.9"/>
  <path d="M 340,95 Q 348,160 338,238" fill="none" stroke="#f59e0b" stroke-width="1.5"/>

  <!-- Gallbladder (pear-shaped sac beneath Right Lobe) -->
  <path d="M 245,255 C 228,265 222,295 240,312 C 258,328 278,312 276,288 C 274,270 264,258 258,250 Z"
        fill="url(#gallGrad)" stroke="#6ee7b7" stroke-width="1.8" filter="url(#organShadow)"/>

  <!-- Biliary Duct Tree -->
  <!-- Right & Left Hepatic Ducts -->
  <path d="M 275,215 Q 295,235 305,252" fill="none" stroke="#10b981" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M 365,205 Q 335,230 305,252" fill="none" stroke="#10b981" stroke-width="4.5" stroke-linecap="round"/>
  <!-- Common Hepatic Duct -->
  <path d="M 305,252 L 305,286" fill="none" stroke="#10b981" stroke-width="5" stroke-linecap="round"/>
  <!-- Cystic Duct from Gallbladder -->
  <path d="M 258,252 Q 282,265 305,286" fill="none" stroke="#34d399" stroke-width="4.5" stroke-linecap="round"/>
  <!-- Common Bile Duct descending to Duodenum -->
  <path d="M 305,286 L 305,365 Q 305,388 330,395" fill="none" stroke="#10b981" stroke-width="6" stroke-linecap="round"/>

  <!-- Hepatic Portal Vein (entering porta hepatis) -->
  <path d="M 355,405 Q 350,310 345,235" fill="none" stroke="url(#portalGrad)" stroke-width="10" stroke-linecap="round" opacity="0.88"/>
  <!-- Hepatic Artery -->
  <path d="M 380,405 Q 372,310 362,235" fill="none" stroke="#f43f5e" stroke-width="5" stroke-linecap="round" opacity="0.9"/>

  <!-- Duodenum (C-shaped loop receiving Common Bile Duct) -->
  <path d="M 325,355 C 375,355 405,380 400,415 C 395,442 355,452 325,445"
        fill="none" stroke="url(#duodenumGrad)" stroke-width="22" stroke-linecap="round" opacity="0.75"/>
  <circle cx="332" cy="395" r="5" fill="#fef08a" stroke="#10b981" stroke-width="2"/>

  <!-- ==================== CLEAR POINTERS & NON-OVERLAPPING LABELS ==================== -->
  <!-- Diaphragm -->
  <line x1="205" y1="95" x2="145" y2="82" stroke="#94a3b8" stroke-width="1.2"/>
  <rect x="28" y="68" width="122" height="24" rx="6" fill="#0f172a" stroke="#475569" stroke-width="1"/>
  <text x="89" y="84" fill="#cbd5e1" font-size="11" font-weight="600" text-anchor="middle" font-family="system-ui">Diaphragm</text>

  <!-- Right Lobe -->
  <line x1="175" y1="185" x2="105" y2="185" stroke="#fca5a5" stroke-width="1.2"/>
  <rect x="20" y="172" width="90" height="26" rx="6" fill="#0f172a" stroke="#ef4444" stroke-width="1.2"/>
  <text x="65" y="189" fill="#fecaca" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Right Lobe</text>

  <!-- Gallbladder -->
  <line x1="230" y1="295" x2="145" y2="305" stroke="#34d399" stroke-width="1.2"/>
  <rect x="20" y="292" width="130" height="34" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1.2"/>
  <text x="85" y="307" fill="#6ee7b7" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Gallbladder</text>
  <text x="85" y="320" fill="#94a3b8" font-size="9.5" text-anchor="middle" font-family="system-ui">(Stores &amp; concentrates bile)</text>

  <!-- Cystic Duct -->
  <line x1="278" y1="268" x2="180" y2="355" stroke="#34d399" stroke-width="1.2"/>
  <rect x="20" y="344" width="165" height="24" rx="6" fill="#0f172a" stroke="#34d399" stroke-width="1.2"/>
  <text x="102" y="360" fill="#a7f3d0" font-size="11" font-weight="600" text-anchor="middle" font-family="system-ui">Cystic Duct (from Gallbladder)</text>

  <!-- Common Bile Duct -->
  <line x1="305" y1="335" x2="210" y2="395" stroke="#10b981" stroke-width="1.2"/>
  <rect x="20" y="384" width="195" height="26" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1.2"/>
  <text x="117" y="401" fill="#6ee7b7" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Common Bile Duct → Duodenum</text>

  <!-- IVC -->
  <line x1="342" y1="84" x2="410" y2="80" stroke="#60a5fa" stroke-width="1.2"/>
  <rect x="410" y="68" width="165" height="24" rx="6" fill="#0f172a" stroke="#3b82f6" stroke-width="1.2"/>
  <text x="492" y="84" fill="#93c5fd" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Inferior Vena Cava (IVC)</text>

  <!-- Falciform Ligament -->
  <line x1="342" y1="125" x2="425" y2="108" stroke="#fbbf24" stroke-width="1.2"/>
  <rect x="425" y="96" width="145" height="24" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1.2"/>
  <text x="497" y="112" fill="#fde68a" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Falciform Ligament</text>

  <!-- Left Lobe -->
  <line x1="470" y1="160" x2="505" y2="215" stroke="#fca5a5" stroke-width="1.2"/>
  <rect x="435" y="215" width="125" height="26" rx="6" fill="#0f172a" stroke="#f87171" stroke-width="1.2"/>
  <text x="497" y="232" fill="#fecaca" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Left Lobe (Smaller)</text>

  <!-- Hepatic Portal Vein & Artery -->
  <line x1="358" y1="295" x2="430" y2="275" stroke="#a78bfa" stroke-width="1.2"/>
  <rect x="430" y="256" width="150" height="36" rx="6" fill="#0f172a" stroke="#8b5cf6" stroke-width="1.2"/>
  <text x="505" y="271" fill="#ddd6fe" font-size="10.5" font-weight="700" text-anchor="middle" font-family="system-ui">Hepatic Portal Vein (Violet)</text>
  <text x="505" y="285" fill="#fda4af" font-size="10.5" font-weight="600" text-anchor="middle" font-family="system-ui">&amp; Hepatic Artery (Red)</text>

  <!-- Duodenum / Sphincter of Oddi -->
  <line x1="395" y1="415" x2="435" y2="415" stroke="#fbbf24" stroke-width="1.2"/>
  <rect x="435" y="395" width="150" height="38" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1.2"/>
  <text x="510" y="411" fill="#fde68a" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Duodenum &amp; Sphincter</text>
  <text x="510" y="425" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">of Oddi (Ampulla of Vater)</text>

  <!-- ==================== INSET: HEPATIC LOBULE (NCERT HIGH-YIELD) ==================== -->
  <rect x="595" y="72" width="245" height="388" rx="14" fill="#0a1628" stroke="#10b981" stroke-width="1.5"/>
  <text x="717" y="96" fill="#34d399" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">🔬 HEPATIC LOBULE (INSET)</text>
  <text x="717" y="112" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="system-ui">Structural &amp; Functional Unit of Liver</text>

  <!-- Hexagonal Lobule with Glisson's Capsule -->
  <polygon points="717,130 785,168 785,244 717,282 649,244 649,168"
           fill="#450a0a" stroke="#fbbf24" stroke-width="2.5" stroke-linejoin="round"/>
  <!-- Central Vein -->
  <circle cx="717" cy="206" r="14" fill="#1d4ed8" stroke="#93c5fd" stroke-width="2"/>
  <text x="717" y="210" fill="#ffffff" font-size="9" font-weight="700" text-anchor="middle" font-family="system-ui">CV</text>

  <!-- Radiating Hepatic Cords (Hepatocytes) -->
  <line x1="717" y1="142" x2="717" y2="188" stroke="#f87171" stroke-width="3" stroke-dasharray="5,3"/>
  <line x1="717" y1="224" x2="717" y2="270" stroke="#f87171" stroke-width="3" stroke-dasharray="5,3"/>
  <line x1="660" y1="175" x2="701" y2="198" stroke="#f87171" stroke-width="3" stroke-dasharray="5,3"/>
  <line x1="733" y1="214" x2="774" y2="237" stroke="#f87171" stroke-width="3" stroke-dasharray="5,3"/>
  <line x1="774" y1="175" x2="733" y2="198" stroke="#f87171" stroke-width="3" stroke-dasharray="5,3"/>
  <line x1="701" y1="214" x2="660" y2="237" stroke="#f87171" stroke-width="3" stroke-dasharray="5,3"/>

  <!-- Portal Triad dots at vertices -->
  <circle cx="649" cy="168" r="5" fill="#8b5cf6"/>
  <circle cx="785" cy="168" r="5" fill="#8b5cf6"/>
  <circle cx="717" cy="282" r="5" fill="#8b5cf6"/>

  <!-- NCERT Bullet Notes inside Inset -->
  <text x="610" y="308" fill="#fde68a" font-size="11" font-weight="700" font-family="system-ui">1. Glisson's Capsule:</text>
  <text x="610" y="323" fill="#e2e8f0" font-size="10" font-family="system-ui">   Thin connective tissue sheath</text>
  <text x="610" y="336" fill="#e2e8f0" font-size="10" font-family="system-ui">   covering each hepatic lobule.</text>

  <text x="610" y="358" fill="#93c5fd" font-size="11" font-weight="700" font-family="system-ui">2. Central Vein (CV):</text>
  <text x="610" y="373" fill="#e2e8f0" font-size="10" font-family="system-ui">   Drains sinusoid blood to IVC.</text>

  <text x="610" y="395" fill="#fca5a5" font-size="11" font-weight="700" font-family="system-ui">3. Hepatocytes (Cords):</text>
  <text x="610" y="410" fill="#e2e8f0" font-size="10" font-family="system-ui">   Secrete bile (NO enzymes!).</text>

  <text x="610" y="432" fill="#6ee7b7" font-size="11" font-weight="700" font-family="system-ui">4. Kupffer Cells:</text>
  <text x="610" y="447" fill="#e2e8f0" font-size="10" font-family="system-ui">   Phagocytic macrophages in sinusoids.</text>
</svg>`;
}

// 2. Human Heart & Double Circulation (NCERT Body Fluids & Circulation)
export function generateHumanHeartDiagram() {
  return `<svg viewBox="0 0 860 460" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="hrtBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/>
      <stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
    <radialGradient id="oxyGrad" cx="40%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="100%" stop-color="#9f1239"/>
    </radialGradient>
    <radialGradient id="deoxyGrad" cx="40%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1e3a8a"/>
    </radialGradient>
  </defs>
  <rect width="860" height="460" rx="16" fill="url(#hrtBg)"/>
  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">❤️ HUMAN HEART — 4-CHAMBERED DOUBLE CIRCULATION (NCERT)</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Myogenic Heart · SA Node (Pacemaker) · Tricuspid &amp; Bicuspid (Mitral) Valves</text>

  <!-- Right Atrium & Right Ventricle (Deoxygenated - Blue, Viewer's Left) -->
  <path d="M 210,130 C 175,130 165,180 185,210 L 295,210 L 295,130 Z" fill="url(#deoxyGrad)" stroke="#93c5fd" stroke-width="2"/>
  <path d="M 185,215 L 295,215 L 295,380 C 240,365 180,295 185,215 Z" fill="url(#deoxyGrad)" stroke="#93c5fd" stroke-width="2"/>

  <!-- Left Atrium & Left Ventricle (Oxygenated - Red, Viewer's Right, Thicker Wall) -->
  <path d="M 305,130 L 305,210 L 415,210 C 435,180 425,130 390,130 Z" fill="url(#oxyGrad)" stroke="#fda4af" stroke-width="2"/>
  <path d="M 305,215 L 415,215 C 425,305 365,375 305,385 Z" fill="url(#oxyGrad)" stroke="#fda4af" stroke-width="3.5"/>

  <!-- Interventricular Septum -->
  <rect x="295" y="130" width="10" height="255" fill="#fbbf24" rx="4" opacity="0.85"/>

  <!-- SA Node & AV Node -->
  <circle cx="205" cy="148" r="8" fill="#fef08a" stroke="#f59e0b" stroke-width="2"/>
  <circle cx="282" cy="198" r="7" fill="#fef08a" stroke="#f59e0b" stroke-width="2"/>

  <!-- Valves -->
  <line x1="205" y1="212" x2="275" y2="212" stroke="#fde047" stroke-width="4" stroke-dasharray="10,4"/>
  <line x1="325" y1="212" x2="395" y2="212" stroke="#fde047" stroke-width="4" stroke-dasharray="10,4"/>

  <!-- Great Vessels -->
  <path d="M 225,80 L 225,130" stroke="#3b82f6" stroke-width="14" stroke-linecap="round"/>
  <path d="M 275,215 Q 275,90 345,75" fill="none" stroke="#60a5fa" stroke-width="12" stroke-linecap="round"/>
  <path d="M 335,215 Q 335,85 405,95" fill="none" stroke="#f43f5e" stroke-width="14" stroke-linecap="round"/>

  <!-- Chamber Labels -->
  <text x="240" y="175" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle" font-family="system-ui">Right Atrium</text>
  <text x="245" y="290" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle" font-family="system-ui">Right Ventricle</text>
  <text x="360" y="175" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle" font-family="system-ui">Left Atrium</text>
  <text x="355" y="290" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle" font-family="system-ui">Left Ventricle</text>

  <!-- Right Side Info Cards -->
  <rect x="470" y="75" width="370" height="84" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="485" y="98" fill="#fbbf24" font-size="12" font-weight="800" font-family="system-ui">⚡ CONDUCTION SYSTEM</text>
  <text x="485" y="118" fill="#e2e8f0" font-size="11" font-family="system-ui">• SA Node (Right Atrium): Pacemaker (~70-75/min)</text>
  <text x="485" y="135" fill="#e2e8f0" font-size="11" font-family="system-ui">• AV Node → Bundle of His → Purkinje Fibres</text>
  <text x="485" y="150" fill="#94a3b8" font-size="10" font-family="system-ui">• Cardiac Output = Stroke Volume (70 mL) × HR (72) ≈ 5 L/min</text>

  <rect x="470" y="175" width="370" height="84" rx="10" fill="#0f172a" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="485" y="198" fill="#60a5fa" font-size="12" font-weight="800" font-family="system-ui">🔵 PULMONARY CIRCULATION (Deoxygenated)</text>
  <text x="485" y="218" fill="#e2e8f0" font-size="11" font-family="system-ui">Vena Cava → Right Atrium → Tricuspid Valve →</text>
  <text x="485" y="235" fill="#e2e8f0" font-size="11" font-family="system-ui">Right Ventricle → Pulmonary Artery → Lungs</text>

  <rect x="470" y="275" width="370" height="84" rx="10" fill="#0f172a" stroke="#f43f5e" stroke-width="1.5"/>
  <text x="485" y="298" fill="#fb7185" font-size="12" font-weight="800" font-family="system-ui">🔴 SYSTEMIC CIRCULATION (Oxygenated)</text>
  <text x="485" y="318" fill="#e2e8f0" font-size="11" font-family="system-ui">Pulmonary Veins → Left Atrium → Bicuspid (Mitral) →</text>
  <text x="485" y="335" fill="#e2e8f0" font-size="11" font-family="system-ui">Left Ventricle (thickest wall) → Aorta → Body</text>

  <rect x="470" y="375" width="370" height="65" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
  <text x="485" y="398" fill="#34d399" font-size="12" font-weight="800" font-family="system-ui">🔊 HEART SOUNDS (NEET TRAP)</text>
  <text x="485" y="416" fill="#e2e8f0" font-size="10.5" font-family="system-ui">• LUB (1st): Closure of Tricuspid &amp; Bicuspid valves</text>
  <text x="485" y="432" fill="#e2e8f0" font-size="10.5" font-family="system-ui">• DUB (2nd): Closure of Semilunar valves</text>
</svg>`;
}

// 3. Nephron Structure & Urine Formation (NCERT Excretory Products)
export function generateNephronDiagram() {
  return `<svg viewBox="0 0 860 460" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="nepBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/>
      <stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
  </defs>
  <rect width="860" height="460" rx="16" fill="url(#nepBg)"/>
  <text x="430" y="32" fill="#f8fafc" font-size="17" font-weight="800" text-anchor="middle" font-family="system-ui">🫘 NEPHRON — FUNCTIONAL UNIT OF KIDNEY (NCERT)</text>
  <text x="430" y="50" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="system-ui">Ultrafiltration (Glomerulus) · Selective Reabsorption (PCT) · Counter-Current (Loop of Henle)</text>

  <!-- Bowman's Capsule + Glomerulus -->
  <path d="M 110,120 C 75,120 75,205 115,205 L 155,205" fill="none" stroke="#fbbf24" stroke-width="10" stroke-linecap="round"/>
  <circle cx="120" cy="162" r="24" fill="#dc2626" stroke="#fca5a5" stroke-width="2"/>
  <line x1="40" y1="148" x2="98" y2="154" stroke="#ef4444" stroke-width="6"/>
  <line x1="40" y1="178" x2="98" y2="172" stroke="#f87171" stroke-width="3.5"/>

  <!-- PCT -> Loop of Henle -> DCT -> Collecting Duct -->
  <path d="M 155,205 Q 190,170 225,205 Q 250,235 275,205 L 275,390 Q 275,420 315,420 Q 355,420 355,390 L 355,190 Q 385,155 415,190 Q 445,215 475,190 L 505,190"
        fill="none" stroke="#10b981" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Collecting Duct -->
  <line x1="505" y1="120" x2="505" y2="420" stroke="#8b5cf6" stroke-width="14" stroke-linecap="round"/>

  <!-- Labels -->
  <rect x="20" y="80" width="165" height="24" rx="6" fill="#0f172a" stroke="#ef4444" stroke-width="1"/>
  <text x="102" y="96" fill="#fca5a5" font-size="10.5" font-weight="700" text-anchor="middle" font-family="system-ui">Afferent &gt; Efferent Arteriole</text>

  <rect x="170" y="130" width="130" height="26" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1"/>
  <text x="235" y="147" fill="#6ee7b7" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">PCT (70-80% Reabs.)</text>

  <rect x="155" y="340" width="110" height="36" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1"/>
  <text x="210" y="355" fill="#fde68a" font-size="10.5" font-weight="700" text-anchor="middle" font-family="system-ui">Descending Limb</text>
  <text x="210" y="369" fill="#94a3b8" font-size="9.5" text-anchor="middle" font-family="system-ui">Permeable to H₂O</text>

  <rect x="368" y="340" width="115" height="36" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1"/>
  <text x="425" y="355" fill="#fde68a" font-size="10.5" font-weight="700" text-anchor="middle" font-family="system-ui">Ascending Limb</text>
  <text x="425" y="369" fill="#94a3b8" font-size="9.5" text-anchor="middle" font-family="system-ui">Impermeable to H₂O</text>

  <rect x="355" y="115" width="135" height="26" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1"/>
  <text x="422" y="132" fill="#6ee7b7" font-size="10.5" font-weight="700" text-anchor="middle" font-family="system-ui">DCT (ADH &amp; Aldosterone)</text>

  <rect x="440" y="425" width="130" height="24" rx="6" fill="#0f172a" stroke="#8b5cf6" stroke-width="1"/>
  <text x="505" y="441" fill="#ddd6fe" font-size="10.5" font-weight="700" text-anchor="middle" font-family="system-ui">Collecting Duct</text>

  <!-- Summary Key Points Panel -->
  <rect x="550" y="75" width="290" height="365" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="695" y="100" fill="#34d399" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">🎯 NEET HIGH-YIELD SUMMARY</text>

  <text x="565" y="128" fill="#fbbf24" font-size="11.5" font-weight="700" font-family="system-ui">1. Glomerular Filtration (GFR):</text>
  <text x="565" y="145" fill="#e2e8f0" font-size="10.5" font-family="system-ui">• GFR ≈ 125 mL/min (180 L/day)</text>
  <text x="565" y="161" fill="#e2e8f0" font-size="10.5" font-family="system-ui">• Podocytes form filtration slits</text>

  <text x="565" y="190" fill="#6ee7b7" font-size="11.5" font-weight="700" font-family="system-ui">2. PCT (Brush-Border Cuboidal):</text>
  <text x="565" y="207" fill="#e2e8f0" font-size="10.5" font-family="system-ui">• Reabsorbs nearly 100% glucose,</text>
  <text x="565" y="223" fill="#e2e8f0" font-size="10.5" font-family="system-ui">  amino acids &amp; 70-80% electrolytes</text>

  <text x="565" y="252" fill="#93c5fd" font-size="11.5" font-weight="700" font-family="system-ui">3. Loop of Henle:</text>
  <text x="565" y="269" fill="#e2e8f0" font-size="10.5" font-family="system-ui">• Counter-current concentrates urine</text>
  <text x="565" y="285" fill="#e2e8f0" font-size="10.5" font-family="system-ui">• Medullary osmolarity: 300 → 1200 mOsm/L</text>

  <text x="565" y="314" fill="#ddd6fe" font-size="11.5" font-weight="700" font-family="system-ui">4. Hormonal Regulation:</text>
  <text x="565" y="331" fill="#e2e8f0" font-size="10.5" font-family="system-ui">• ADH: H₂O reabsorption in DCT/CD</text>
  <text x="565" y="347" fill="#e2e8f0" font-size="10.5" font-family="system-ui">• Aldosterone: Na⁺ reabsorption</text>
  <text x="565" y="363" fill="#e2e8f0" font-size="10.5" font-family="system-ui">• ANF: Vasodilation (lowers BP)</text>

  <text x="565" y="395" fill="#fb7185" font-size="11" font-weight="700" font-family="system-ui">⚠ Urine Output: ~1–1.5 L/day</text>
  <text x="565" y="413" fill="#94a3b8" font-size="10" font-family="system-ui">(~99% of filtrate is reabsorbed!)</text>
</svg>`;
}

