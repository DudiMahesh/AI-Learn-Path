"""
Diagram Enhancer Service for NEET (UG) AI Tutor

Detects and converts any crude ASCII text art or missing SVG diagrams
in LLM responses into high-resolution, multi-color 3D vector SVG schematics.
"""

import re
import html

CELL_3D_SVG = r'''```svg
<svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
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

  <!-- Rough ER -->
  <g transform="translate(130, 160)" opacity="0.9">
    <path d="M 0,-40 C -30,-45 -45,-15 -25,0 C -5,15 -35,35 -15,55 C 5,75 -20,95 5,110" fill="none" stroke="url(#erGrad)" stroke-width="7" stroke-linecap="round"/>
    <circle cx="-25" cy="-20" r="2.2" fill="#38bdf8"/>
    <circle cx="-18" cy="-5" r="2.2" fill="#38bdf8"/>
  </g>

  <!-- Mitochondrion with Cristae -->
  <g transform="translate(430, 140) rotate(-18)" filter="url(#organelleShadow)">
    <rect x="-65" y="-35" width="130" height="70" rx="35" fill="url(#mitoOuterGrad)" stroke="#ea580c" stroke-width="2.5"/>
    <rect x="-58" y="-28" width="116" height="56" rx="28" fill="#7c2d12" stroke="#fdba74" stroke-width="1.5"/>
    <path d="M -42,-26 C -40,-5 -30,-5 -28,-26 M -20,-26 C -18,2 -8,2 -6,-26 M 6,-26 C 8,-2 18,-2 20,-26 M 32,-26 C 34,-8 42,-8 44,-26"
          fill="none" stroke="url(#cristaeGrad)" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M -32,26 C -30,5 -20,5 -18,26 M -8,26 C -6,-2 4,-2 6,26 M 18,26 C 20,4 28,4 30,26"
          fill="none" stroke="url(#cristaeGrad)" stroke-width="3.5" stroke-linecap="round"/>
    <text x="0" y="3" fill="#ffedd5" font-size="8.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">Mitochondrial Matrix</text>
  </g>

  <!-- Lysosomes -->
  <g transform="translate(350, 290)" filter="url(#organelleShadow)">
    <circle cx="0" cy="0" r="26" fill="url(#lysoGrad)" stroke="#22d3ee" stroke-width="2"/>
    <circle cx="-7" cy="-6" r="3" fill="#a5f3fc"/>
    <circle cx="6" cy="-4" r="3" fill="#a5f3fc"/>
    <text x="0" y="1" fill="#ecfeff" font-size="8" font-weight="bold" text-anchor="middle" font-family="sans-serif">Acid Hydrolases</text>
    <text x="0" y="15" fill="#a5f3fc" font-size="7" text-anchor="middle" font-family="sans-serif">pH ~ 5.0</text>
  </g>

  <!-- Labels -->
  <rect x="120" y="18" width="160" height="26" rx="6" fill="#1e1035" stroke="#a855f7" stroke-width="1.2"/>
  <text x="200" y="34" fill="#e9d5ff" font-size="10.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">Nucleus (Double Membrane)</text>

  <rect x="470" y="48" width="165" height="26" rx="6" fill="#2d1203" stroke="#f97316" stroke-width="1.2"/>
  <text x="552" y="64" fill="#fed7aa" font-size="10.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">Mitochondrion (Cristae Folds)</text>

  <rect x="270" y="360" width="160" height="26" rx="6" fill="#082f49" stroke="#06b6d4" stroke-width="1.2"/>
  <text x="350" y="376" fill="#cffafe" font-size="10.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">Lysosome (Hydrolytic Enzymes)</text>
</svg>
```'''

BERNOULLI_3D_SVG = r'''```svg
<svg viewBox="0 0 650 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="fluidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0369a1" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0369a1" stop-opacity="0.85"/>
    </linearGradient>
  </defs>
  <rect width="650" height="340" rx="16" fill="#070d19"/>
  <path d="M 40,110 L 190,110 Q 240,110 270,140 L 380,140 Q 410,110 460,110 L 610,110 L 610,230 L 460,230 Q 410,230 380,200 L 270,200 Q 240,230 190,230 L 40,230 Z" fill="url(#fluidGrad)" stroke="#38bdf8" stroke-width="2.5"/>
  <rect x="50" y="245" width="140" height="42" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
  <text x="120" y="262" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Wide Inlet: Area A1</text>
  <text x="120" y="278" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="sans-serif">Low Speed v1 · High P1</text>
  <rect x="255" y="245" width="145" height="42" rx="8" fill="#0f172a" stroke="#f43f5e" stroke-width="1.5"/>
  <text x="327" y="262" fill="#fb7185" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Narrow Throat: Area A2</text>
  <text x="327" y="278" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="sans-serif">High Speed v2 · Low P2</text>
  <rect x="175" y="298" width="300" height="30" rx="8" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
  <text x="325" y="318" fill="#c7d2fe" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">P + ½ρv² + ρgh = Constant (Bernoulli Law)</text>
</svg>
```'''

PROJECTILE_3D_SVG = r'''```svg
<svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="projGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#818cf8"/>
      <stop offset="100%" stop-color="#f43f5e"/>
    </linearGradient>
  </defs>
  <rect width="680" height="340" rx="16" fill="#030712"/>
  <line x1="70" y1="280" x2="620" y2="280" stroke="#475569" stroke-width="2"/>
  <line x1="70" y1="280" x2="70" y2="40" stroke="#475569" stroke-width="2"/>
  <path d="M 70,280 Q 345,-30 620,280" fill="none" stroke="url(#projGrad1)" stroke-width="3.5"/>
  <g transform="translate(345, 95)">
    <circle cx="0" cy="0" r="9" fill="#f43f5e" stroke="#fecdd3" stroke-width="2"/>
    <line x1="0" y1="0" x2="65" y2="0" stroke="#38bdf8" stroke-width="2.5"/>
    <polygon points="65,-4 73,0 65,4" fill="#38bdf8"/>
    <text x="80" y="4" fill="#7dd3fc" font-size="10.5" font-weight="bold" font-family="sans-serif">v_top = u·cos θ</text>
  </g>
  <rect x="250" y="160" width="190" height="28" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1.2"/>
  <text x="345" y="178" fill="#fde047" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">H_max = u² sin²θ / (2g)</text>
  <rect x="235" y="295" width="220" height="28" rx="6" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.2"/>
  <text x="345" y="313" fill="#c7d2fe" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Range R = u² sin(2θ) / g</text>
</svg>
```'''

CONCEPT_BLUEPRINT_3D_SVG = r'''```svg
<svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="cgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#059669"/>
      <stop offset="50%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
  </defs>
  <rect width="680" height="340" rx="16" fill="#030712"/>
  <rect x="30" y="30" width="620" height="65" rx="12" fill="url(#cgGrad)"/>
  <text x="340" y="62" fill="#ffffff" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">NEET (UG) 2026 Core Conceptual Architecture</text>
  <text x="340" y="82" fill="#e0f2fe" font-size="11" text-anchor="middle" font-family="sans-serif">NCERT First Principles · Governing Formulations · High-Yield Traps</text>
  <g transform="translate(50, 130)">
    <rect width="170" height="170" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="1.8"/>
    <text x="85" y="28" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">1. Definitions</text>
    <line x1="15" y1="40" x2="155" y2="40" stroke="#1e293b" stroke-width="1"/>
    <text x="15" y="68" fill="#e2e8f0" font-size="10.5" font-family="sans-serif">• First Principles</text>
    <text x="15" y="95" fill="#e2e8f0" font-size="10.5" font-family="sans-serif">• SI Units &amp; Dimensions</text>
    <text x="15" y="122" fill="#e2e8f0" font-size="10.5" font-family="sans-serif">• NCERT Citations</text>
  </g>
  <g transform="translate(255, 130)">
    <rect width="170" height="170" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="1.8"/>
    <text x="85" y="28" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">2. Derivations</text>
    <line x1="15" y1="40" x2="155" y2="40" stroke="#1e293b" stroke-width="1"/>
    <text x="15" y="68" fill="#e2e8f0" font-size="10.5" font-family="sans-serif">• Governing Equations</text>
    <text x="15" y="95" fill="#e2e8f0" font-size="10.5" font-family="sans-serif">• Stoichiometry</text>
    <text x="15" y="122" fill="#e2e8f0" font-size="10.5" font-family="sans-serif">• Microscopic Steps</text>
  </g>
  <g transform="translate(460, 130)">
    <rect width="170" height="170" rx="10" fill="#0f172a" stroke="#a855f7" stroke-width="1.8"/>
    <text x="85" y="28" fill="#c084fc" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">3. High-Yield MCQs</text>
    <line x1="15" y1="40" x2="155" y2="40" stroke="#1e293b" stroke-width="1"/>
    <text x="15" y="68" fill="#e2e8f0" font-size="10.5" font-family="sans-serif">• Solved Numericals</text>
    <text x="15" y="95" fill="#e2e8f0" font-size="10.5" font-family="sans-serif">• Trap Elimination</text>
    <text x="15" y="122" fill="#e2e8f0" font-size="10.5" font-family="sans-serif">• Assertion &amp; Reason</text>
  </g>
</svg>
```'''

def get_fallback_svg_for_query(query: str, subject: str = "Biology") -> str:
    q = (query or "").lower()
    sub = (subject or "").lower()
    if any(k in q for k in ["cell", "organelle", "membrane", "nucleus", "mitochondri", "lysosome", "cristae", "dna", "plant", "physiology", "genetics"]) or "bio" in sub:
        return CELL_3D_SVG
    if any(k in q for k in ["bernoulli", "fluid", "pressure", "flow", "venturi"]):
        return BERNOULLI_3D_SVG
    if any(k in q for k in ["projectile", "kinematics", "motion", "velocity", "trajectory", "vector"]):
        return PROJECTILE_3D_SVG
    if "phys" in sub:
        return BERNOULLI_3D_SVG
    return CONCEPT_BLUEPRINT_3D_SVG

def enhance_diagrams_in_answer(answer: str, query: str = "", subject: str = "") -> str:
    r"""
    Checks if answer contains crude ASCII art diagrams (like `/\/\/\`, `|  Nucleus`, etc.)
    and replaces them with real, high-resolution SVG code blocks.
    """
    if not answer:
        return answer

    # Check if answer contains ASCII diagram patterns in ANY code block
    pattern = re.compile(
        r'```[a-zA-Z0-9_-]*\s*\n([^`]*?(?:/\s*\\|\\/|\\_+/|\+--|\|[\s\w]+\||--{2,}|/\\/\\|\\______/)[^`]*?)```',
        re.DOTALL | re.IGNORECASE
    )
    
    def replacer(match):
        block_content = match.group(1)
        lower_block = block_content.lower()
        # If the block contains ASCII art symbols or diagram text
        if any(sym in block_content for sym in ['/\\/\\', '|', '\\______/', '+--', '/\\', '\\/']) or \
           any(term in lower_block for term in ['cristae', 'nucleus', 'mitochondri', 'lysosome', 'throat', 'pipe', 'inlet', 'diagram', 'flow', 'double membrane']):
            return get_fallback_svg_for_query(query + " " + block_content, subject)
        return match.group(0)

    enhanced = pattern.sub(replacer, answer)

    # Check if answer has crude un-fenced ASCII diagram lines (like the screenshot uploaded by user)
    unfenced_cell_pattern = re.compile(
        r'(?:\|\s*Nucleus[\s\S]*?(?:\\______/|\(hydrolytic\)|Mitochondrion|cristae)[^\n]*\n?)',
        re.IGNORECASE
    )
    if unfenced_cell_pattern.search(enhanced):
        enhanced = unfenced_cell_pattern.sub(CELL_3D_SVG, enhanced)

    return enhanced
