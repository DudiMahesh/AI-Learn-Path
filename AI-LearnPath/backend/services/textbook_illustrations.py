"""
Clean White-Background Textbook-Style Scientific SVG Illustrations for NEET (UG).

Matches classic NCERT / medical textbook illustration aesthetics:
- Clean white/cream background (#ffffff / #fcfbf7)
- Bold dark header typography
- Colour-coded anatomical & botanical structures
- Crisp straight black leader lines with exact scientific labels
"""


def get_textbook_svg(question: str, topic: str = '') -> str | None:
    """Return a specialized textbook-style SVG if the query matches a core visual."""
    q = f"{question} {topic}".lower()

    if 'photosynthesis' in q or 'chloroplast' in q or 'calvin' in q:
        return PHOTOSYNTHESIS_TEXTBOOK_SVG
    if 'plant anatomy' in q or ('xylem' in q and 'phloem' in q) or 'palisade' in q or 'vascular bundle' in q:
        return PLANT_ANATOMY_TEXTBOOK_SVG
    if 'flower' in q or 'carpel' in q or 'stamen' in q or 'angiosperm' in q or 'pistil' in q:
        return FLOWER_STRUCTURE_TEXTBOOK_SVG
    if 'heart' in q or 'cardiac' in q or 'aorta' in q or 'ventricle' in q:
        return HEART_ANATOMY_TEXTBOOK_SVG
    if 'digestive' in q or 'stomach' in q or 'esophagus' in q or 'intestine' in q or 'alimentary' in q:
        return DIGESTIVE_SYSTEM_TEXTBOOK_SVG
    if ('animal' in q and 'plant' in q and 'cell' in q) or 'plant cell' in q or 'animal cell' in q:
        return ANIMAL_PLANT_CELL_TEXTBOOK_SVG
    return None


PLANT_ANATOMY_TEXTBOOK_SVG = """<svg viewBox="0 0 820 560" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff;border-radius:14px;font-family:system-ui,-apple-system,sans-serif">
  <rect width="820" height="560" fill="#ffffff" rx="14"/>
  <text x="200" y="56" text-anchor="middle" fill="#1e293b" font-size="30" font-weight="900" letter-spacing="1">PLANT</text>
  <text x="200" y="90" text-anchor="middle" fill="#1e293b" font-size="30" font-weight="900" letter-spacing="1">ANATOMY</text>

  <!-- Whole Plant (Left) -->
  <line x1="85" y1="360" x2="325" y2="360" stroke="#334155" stroke-width="1.5"/>
  <!-- Stem -->
  <rect x="198" y="165" width="12" height="195" fill="#84cc16" stroke="#1e293b" stroke-width="1.8"/>
  <!-- Apex bud -->
  <path d="M194,165 Q204,135 214,165 Z" fill="#65a30d" stroke="#1e293b" stroke-width="1.6"/>
  <!-- Leaves -->
  <path d="M210,205 Q255,170 295,190 Q260,215 210,212 Z" fill="#84cc16" stroke="#1e293b" stroke-width="1.6"/>
  <path d="M198,235 Q145,205 105,225 Q145,250 198,242 Z" fill="#84cc16" stroke="#1e293b" stroke-width="1.6"/>
  <path d="M210,275 Q260,245 305,268 Q265,292 210,282 Z" fill="#84cc16" stroke="#1e293b" stroke-width="1.6"/>
  <path d="M198,305 Q140,280 95,302 Q140,328 198,312 Z" fill="#84cc16" stroke="#1e293b" stroke-width="1.6"/>
  <!-- Tap Root & Root Hairs -->
  <path d="M198,360 L201,515 L207,515 L210,360 Z" fill="#d9a066" stroke="#1e293b" stroke-width="1.6"/>
  <path d="M200,385 L140,420 M208,395 L268,428 M200,425 L155,465 M207,440 L255,472 M201,465 L175,492" stroke="#92400e" stroke-width="2.5" stroke-linecap="round"/>

  <!-- Left Plant Labels -->
  <line x1="265" y1="196" x2="375" y2="196" stroke="#1e293b" stroke-width="1.4"/>
  <text x="382" y="200" fill="#0f172a" font-size="12" font-weight="800">LEAF</text>

  <line x1="210" y1="295" x2="375" y2="295" stroke="#1e293b" stroke-width="1.4"/>
  <text x="382" y="299" fill="#0f172a" font-size="12" font-weight="800">STEM</text>

  <line x1="208" y1="425" x2="375" y2="425" stroke="#1e293b" stroke-width="1.4"/>
  <text x="382" y="429" fill="#0f172a" font-size="12" font-weight="800">ROOT</text>

  <polyline points="155,438 130,455 85,455" fill="none" stroke="#1e293b" stroke-width="1.3"/>
  <text x="20" y="459" fill="#0f172a" font-size="11" font-weight="800">ROOT HAIRS</text>

  <polyline points="208,455 245,480 325,480" fill="none" stroke="#1e293b" stroke-width="1.3"/>
  <text x="260" y="496" fill="#0f172a" font-size="11" font-weight="800">TAP ROOT</text>

  <polyline points="204,515 235,536 335,536" fill="none" stroke="#1e293b" stroke-width="1.3"/>
  <text x="242" y="531" fill="#0f172a" font-size="11" font-weight="800">ROOT CAP</text>
  <text x="72" y="500" fill="#0f172a" font-size="11" font-weight="800">APICAL MERISTEM</text>
  <line x1="185" y1="496" x2="201" y2="496" stroke="#1e293b" stroke-width="1.3"/>

  <!-- Top Right: 3D Leaf Cross-Section -->
  <g transform="translate(450, 35)">
    <polygon points="10,55 110,10 210,55 110,100" fill="#84cc16" stroke="#1e293b" stroke-width="1.6"/>
    <polygon points="10,55 110,100 110,122 10,77" fill="#a3e635" stroke="#1e293b" stroke-width="1.4"/>
    <polygon points="110,100 210,55 210,77 110,122" fill="#65a30d" stroke="#1e293b" stroke-width="1.4"/>
    <!-- Spongy mesophyll & Vascular bundle -->
    <circle cx="45" cy="122" r="9" fill="#fde047" stroke="#1e293b" stroke-width="1.2"/>
    <circle cx="70" cy="130" r="9" fill="#fde047" stroke="#1e293b" stroke-width="1.2"/>
    <circle cx="30" cy="142" r="9" fill="#fde047" stroke="#1e293b" stroke-width="1.2"/>
    <ellipse cx="145" cy="120" rx="45" ry="18" fill="#a855f7" stroke="#1e293b" stroke-width="1.5"/>
    <ellipse cx="145" cy="113" rx="35" ry="8" fill="#f97316" stroke="#1e293b" stroke-width="1.2"/>
    <!-- Lower epidermis + Stoma -->
    <polygon points="10,152 110,197 210,152 110,107" fill="#bef264" fill-opacity="0.7" stroke="#1e293b" stroke-width="1.5"/>
    <ellipse cx="140" cy="172" rx="14" ry="8" fill="#fb7185" stroke="#1e293b" stroke-width="1.4"/>
  </g>
  <!-- Leaf CS Labels -->
  <polyline points="605,55 645,35 725,35" fill="none" stroke="#1e293b" stroke-width="1.3"/>
  <text x="730" y="39" fill="#0f172a" font-size="11" font-weight="800">CUTICLE</text>
  <polyline points="640,95 675,78 725,78" fill="none" stroke="#1e293b" stroke-width="1.3"/>
  <text x="730" y="75" fill="#0f172a" font-size="10.5" font-weight="800">PALISADE</text>
  <text x="730" y="88" fill="#0f172a" font-size="10.5" font-weight="800">PARENCHYMA</text>
  <line x1="625" y1="145" x2="725" y2="145" stroke="#1e293b" stroke-width="1.3"/>
  <text x="730" y="149" fill="#0f172a" font-size="11" font-weight="800">XYLEM</text>
  <line x1="625" y1="162" x2="725" y2="162" stroke="#1e293b" stroke-width="1.3"/>
  <text x="730" y="166" fill="#0f172a" font-size="11" font-weight="800">PHLOEM</text>
  <line x1="600" y1="205" x2="725" y2="205" stroke="#1e293b" stroke-width="1.3"/>
  <text x="730" y="209" fill="#0f172a" font-size="11" font-weight="800">GUARD CELL</text>
  <polyline points="590,215 620,238 725,238" fill="none" stroke="#1e293b" stroke-width="1.3"/>
  <text x="730" y="242" fill="#0f172a" font-size="11" font-weight="800">STOMA</text>
  <text x="385" y="142" fill="#0f172a" font-size="10.5" font-weight="800">SPONGY</text>
  <text x="372" y="155" fill="#0f172a" font-size="10.5" font-weight="800">MESOPHYLL</text>

  <!-- Middle Right: Stem Cross-Section -->
  <circle cx="565" cy="315" r="56" fill="#ecfccb" stroke="#15803d" stroke-width="4"/>
  <text x="565" y="319" text-anchor="middle" fill="#1e293b" font-size="11" font-weight="800">PITH</text>
  <circle cx="565" cy="272" r="9" fill="#f97316" stroke="#1e293b" stroke-width="1.2"/>
  <circle cx="565" cy="358" r="9" fill="#f97316" stroke="#1e293b" stroke-width="1.2"/>
  <circle cx="522" cy="315" r="9" fill="#f97316" stroke="#1e293b" stroke-width="1.2"/>
  <circle cx="608" cy="315" r="9" fill="#f97316" stroke="#1e293b" stroke-width="1.2"/>
  <circle cx="535" cy="285" r="8" fill="#a855f7" stroke="#1e293b" stroke-width="1.2"/>
  <circle cx="595" cy="285" r="8" fill="#a855f7" stroke="#1e293b" stroke-width="1.2"/>
  <circle cx="535" cy="345" r="8" fill="#a855f7" stroke="#1e293b" stroke-width="1.2"/>
  <circle cx="595" cy="345" r="8" fill="#a855f7" stroke="#1e293b" stroke-width="1.2"/>

  <line x1="600" y1="285" x2="725" y2="285" stroke="#1e293b" stroke-width="1.3"/>
  <text x="730" y="289" fill="#0f172a" font-size="11" font-weight="800">PHLOEM</text>
  <line x1="612" y1="312" x2="725" y2="312" stroke="#1e293b" stroke-width="1.3"/>
  <text x="730" y="316" fill="#0f172a" font-size="11" font-weight="800">XYLEM</text>
  <polyline points="602,340 640,355 725,355" fill="none" stroke="#1e293b" stroke-width="1.3"/>
  <text x="730" y="352" fill="#0f172a" font-size="10.5" font-weight="800">VASCULAR</text>
  <text x="730" y="365" fill="#0f172a" font-size="10.5" font-weight="800">CAMBIUM</text>

  <!-- Bottom Right: Root Cross-Section -->
  <circle cx="565" cy="472" r="52" fill="#dcfce7" stroke="#166534" stroke-width="3.5"/>
  <circle cx="565" cy="472" r="24" fill="#fef3c7" stroke="#1e293b" stroke-width="2"/>
  <path d="M555,472 L575,472 M565,462 L565,482" stroke="#a855f7" stroke-width="6" stroke-linecap="round"/>
  <line x1="590" y1="432" x2="725" y2="432" stroke="#1e293b" stroke-width="1.3"/>
  <text x="730" y="436" fill="#0f172a" font-size="11" font-weight="800">CORTEX</text>
  <line x1="575" y1="472" x2="725" y2="472" stroke="#1e293b" stroke-width="1.3"/>
  <text x="730" y="476" fill="#0f172a" font-size="11" font-weight="800">XYLEM</text>
  <line x1="585" y1="492" x2="725" y2="492" stroke="#1e293b" stroke-width="1.3"/>
  <text x="730" y="496" fill="#0f172a" font-size="11" font-weight="800">ENDODERMIS</text>
  <polyline points="605,508 640,526 725,526" fill="none" stroke="#1e293b" stroke-width="1.3"/>
  <text x="730" y="530" fill="#0f172a" font-size="11" font-weight="800">EPIDERMIS</text>
</svg>"""


PHOTOSYNTHESIS_TEXTBOOK_SVG = """<svg viewBox="0 0 820 500" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#fcfbf7;border-radius:14px;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="psArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="#1e293b"/>
    </marker>
    <marker id="psGold" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="#eab308"/>
    </marker>
    <marker id="psBlue" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="#0284c7"/>
    </marker>
    <marker id="psPurple" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="#7c3aed"/>
    </marker>
  </defs>
  <rect width="820" height="500" fill="#fcfbf7" rx="14"/>
  <text x="410" y="52" text-anchor="middle" fill="#14532d" font-size="38" font-weight="900" letter-spacing="1">PHOTOSYNTHESIS</text>
  <text x="410" y="76" text-anchor="middle" fill="#1e293b" font-size="13.5" font-weight="600">The process by which green plants make their own food using sunlight, water, and carbon dioxide.</text>

  <!-- Sun -->
  <circle cx="135" cy="140" r="28" fill="#facc15" stroke="#eab308" stroke-width="2"/>
  <text x="135" y="192" text-anchor="middle" fill="#ca8a04" font-size="14" font-weight="800">SUNLIGHT</text>
  <text x="135" y="208" text-anchor="middle" fill="#334155" font-size="11.5">Energy from the sun</text>
  <path d="M185,130 Q255,135 298,172" fill="none" stroke="#eab308" stroke-width="3.5" marker-end="url(#psGold)"/>

  <!-- CO2 -->
  <circle cx="110" cy="252" r="10" fill="#ef4444" stroke="#1e293b" stroke-width="1.2"/>
  <circle cx="135" cy="252" r="13" fill="#334155" stroke="#0f172a" stroke-width="1.2"/>
  <circle cx="160" cy="252" r="10" fill="#ef4444" stroke="#1e293b" stroke-width="1.2"/>
  <text x="135" y="284" text-anchor="middle" fill="#334155" font-size="13.5" font-weight="800">CARBON DIOXIDE</text>
  <text x="135" y="300" text-anchor="middle" fill="#475569" font-size="11.5">From the air</text>
  <path d="M185,256 Q220,256 248,246" fill="none" stroke="#475569" stroke-width="3" marker-end="url(#psArr)"/>

  <!-- Water -->
  <path d="M135,320 Q152,344 135,358 Q118,344 135,320 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
  <text x="135" y="378" text-anchor="middle" fill="#0369a1" font-size="14" font-weight="800">WATER</text>
  <text x="135" y="394" text-anchor="middle" fill="#475569" font-size="11.5">From the soil</text>
  <path d="M168,348 Q225,342 268,365" fill="none" stroke="#0284c7" stroke-width="3" marker-end="url(#psBlue)"/>

  <!-- Soil & Roots -->
  <ellipse cx="410" cy="390" rx="215" ry="26" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
  <path d="M410,375 L370,400 M410,378 L445,402 M410,382 L395,408 M410,382 L422,408" stroke="#d97706" stroke-width="2.5"/>

  <!-- Plant Stem & Leaves -->
  <rect x="405" y="210" width="10" height="170" fill="#65a30d" stroke="#14532d" stroke-width="1.5"/>
  <path d="M410,225 Q470,115 540,120 Q525,205 410,225 Z" fill="#65a30d" stroke="#14532d" stroke-width="1.8"/>
  <path d="M410,260 Q465,220 520,245 Q480,295 410,260 Z" fill="#84cc16" stroke="#14532d" stroke-width="1.8"/>
  <path d="M405,245 Q315,175 245,235 Q315,280 405,245 Z" fill="#65a30d" stroke="#14532d" stroke-width="1.8"/>

  <!-- Chloroplast Cutaway -->
  <ellipse cx="335" cy="232" rx="44" ry="22" fill="#bbf7d0" stroke="#14532d" stroke-width="2"/>
  <rect x="308" y="222" width="14" height="20" rx="4" fill="#15803d"/>
  <rect x="328" y="218" width="14" height="24" rx="4" fill="#15803d"/>
  <rect x="348" y="222" width="14" height="20" rx="4" fill="#15803d"/>
  <text x="335" y="280" text-anchor="middle" fill="#14532d" font-size="13" font-weight="800">CHLOROPLASTS</text>
  <text x="335" y="295" text-anchor="middle" fill="#334155" font-size="11">Capture light energy</text>

  <!-- Oxygen Output -->
  <circle cx="622" cy="148" r="14" fill="#38bdf8" stroke="#0369a1" stroke-width="1.5"/>
  <circle cx="645" cy="142" r="14" fill="#0284c7" stroke="#0369a1" stroke-width="1.5"/>
  <text x="635" y="185" text-anchor="middle" fill="#0284c7" font-size="14" font-weight="800">OXYGEN</text>
  <text x="635" y="201" text-anchor="middle" fill="#334155" font-size="11.5">Released into the air</text>
  <path d="M510,225 Q555,205 588,165" fill="none" stroke="#0284c7" stroke-width="3" marker-end="url(#psBlue)"/>

  <!-- Glucose Output -->
  <polygon points="650,255 674,268 674,295 650,308 626,295 626,268" fill="#8b5cf6" stroke="#4c1d95" stroke-width="2"/>
  <text x="650" y="330" text-anchor="middle" fill="#6d28d9" font-size="14" font-weight="800">GLUCOSE</text>
  <text x="650" y="346" text-anchor="middle" fill="#334155" font-size="11.5">Food for the plant (energy)</text>
  <path d="M525,265 Q570,285 605,285" fill="none" stroke="#7c3aed" stroke-width="3" marker-end="url(#psPurple)"/>

  <!-- Bottom Equation Box -->
  <rect x="85" y="428" width="650" height="52" rx="10" fill="#f0fdf4" stroke="#166534" stroke-width="2"/>
  <text x="410" y="454" text-anchor="middle" fill="#14532d" font-size="17" font-weight="800">6CO₂  +  6H₂O  +  LIGHT ENERGY  →  C₆H₁₂O₆  +  6O₂</text>
  <text x="410" y="472" text-anchor="middle" fill="#475569" font-size="11">(Carbon dioxide)      (Water)           (Sunlight)            (Glucose)       (Oxygen)</text>
</svg>"""


FLOWER_STRUCTURE_TEXTBOOK_SVG = """<svg viewBox="0 0 800 500" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff;border-radius:14px;font-family:system-ui,-apple-system,sans-serif">
  <rect width="800" height="500" fill="#ffffff" rx="14"/>
  <text x="400" y="36" text-anchor="middle" fill="#0f172a" font-size="22" font-weight="900">STRUCTURE OF A FLOWER (ANGIOSPERM)</text>

  <!-- Peduncle & Receptacle & Sepals -->
  <rect x="386" y="410" width="28" height="75" fill="#65a30d" stroke="#1e293b" stroke-width="1.6"/>
  <ellipse cx="400" cy="400" rx="52" ry="26" fill="#84cc16" stroke="#1e293b" stroke-width="1.8"/>
  <path d="M350,395 Q240,360 155,345 Q235,415 365,412 Z" fill="#4d7c0f" stroke="#1e293b" stroke-width="1.6"/>
  <path d="M450,395 Q560,360 645,345 Q565,415 435,412 Z" fill="#4d7c0f" stroke="#1e293b" stroke-width="1.6"/>

  <!-- Petals -->
  <path d="M360,380 Q130,330 120,210 Q180,140 330,220 Z" fill="#f9a8d4" stroke="#db2777" stroke-width="1.8"/>
  <path d="M440,380 Q670,330 680,210 Q620,140 470,220 Z" fill="#f9a8d4" stroke="#db2777" stroke-width="1.8"/>

  <!-- Stamens (Filaments & Anthers) -->
  <path d="M360,350 Q315,240 315,150" fill="none" stroke="#f472b6" stroke-width="3.5"/>
  <ellipse cx="315" cy="145" rx="10" ry="16" fill="#d97706" stroke="#1e293b" stroke-width="1.5"/>
  <path d="M372,350 Q345,230 350,120" fill="none" stroke="#f472b6" stroke-width="3.5"/>
  <ellipse cx="350" cy="115" rx="10" ry="16" fill="#d97706" stroke="#1e293b" stroke-width="1.5"/>
  <path d="M440,350 Q485,240 485,150" fill="none" stroke="#f472b6" stroke-width="3.5"/>
  <ellipse cx="485" cy="145" rx="10" ry="16" fill="#d97706" stroke="#1e293b" stroke-width="1.5"/>

  <!-- Carpel (Stigma, Style, Ovary, Ovule) -->
  <ellipse cx="400" cy="345" rx="46" ry="54" fill="#84cc16" stroke="#1e293b" stroke-width="2"/>
  <ellipse cx="400" cy="350" rx="24" ry="30" fill="#fef08a" stroke="#1e293b" stroke-width="1.6"/>
  <circle cx="400" cy="350" r="9" fill="#38bdf8" stroke="#1e293b" stroke-width="1.4"/>
  <rect x="392" y="165" width="16" height="130" fill="#84cc16" stroke="#1e293b" stroke-width="1.8"/>
  <ellipse cx="400" cy="160" rx="22" ry="12" fill="#a3e635" stroke="#1e293b" stroke-width="1.8"/>

  <!-- Left Labels -->
  <text x="155" y="70" fill="#0f172a" font-size="16" font-weight="900" text-decoration="underline">stamen</text>
  <line x1="230" y1="145" x2="305" y2="145" stroke="#0f172a" stroke-width="1.5"/>
  <text x="155" y="150" fill="#0f172a" font-size="14" font-weight="700">anther</text>
  <line x1="230" y1="180" x2="322" y2="180" stroke="#0f172a" stroke-width="1.5"/>
  <text x="155" y="185" fill="#0f172a" font-size="14" font-weight="700">filament</text>
  <line x1="175" y1="215" x2="175" y2="255" stroke="#0f172a" stroke-width="1.5"/>
  <text x="145" y="208" fill="#0f172a" font-size="14" font-weight="700">petal</text>
  <line x1="195" y1="365" x2="195" y2="415" stroke="#0f172a" stroke-width="1.5"/>
  <text x="165" y="432" fill="#0f172a" font-size="14" font-weight="700">sepal</text>

  <!-- Right Labels -->
  <text x="565" y="70" fill="#0f172a" font-size="16" font-weight="900" text-decoration="underline">carpel</text>
  <polyline points="415,155 460,105 555,105" fill="none" stroke="#0f172a" stroke-width="1.5"/>
  <text x="565" y="110" fill="#0f172a" font-size="14" font-weight="700">stigma</text>
  <polyline points="408,225 480,145 555,145" fill="none" stroke="#0f172a" stroke-width="1.5"/>
  <text x="565" y="150" fill="#0f172a" font-size="14" font-weight="700">style</text>
  <polyline points="440,320 500,185 555,185" fill="none" stroke="#0f172a" stroke-width="1.5"/>
  <text x="565" y="190" fill="#0f172a" font-size="14" font-weight="700">ovary</text>
  <polyline points="420,348 515,225 555,225" fill="none" stroke="#0f172a" stroke-width="1.5"/>
  <text x="565" y="230" fill="#0f172a" font-size="14" font-weight="700">ovule</text>

  <line x1="448" y1="405" x2="535" y2="405" stroke="#0f172a" stroke-width="1.5"/>
  <text x="542" y="410" fill="#0f172a" font-size="14" font-weight="700">receptacle</text>
  <line x1="414" y1="455" x2="500" y2="455" stroke="#0f172a" stroke-width="1.5"/>
  <text x="508" y="460" fill="#0f172a" font-size="14" font-weight="700">peduncle</text>
</svg>"""


HEART_ANATOMY_TEXTBOOK_SVG = """<svg viewBox="0 0 800 540" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff;border-radius:14px;font-family:system-ui,-apple-system,sans-serif">
  <rect width="800" height="540" fill="#ffffff" rx="14"/>
  <text x="400" y="42" text-anchor="middle" fill="#1e1b4b" font-size="28" font-weight="900">ANATOMY OF THE HEART</text>

  <!-- Superior & Inferior Vena Cava (Blue) -->
  <rect x="295" y="95" width="38" height="125" rx="8" fill="#38bdf8" stroke="#0f172a" stroke-width="2"/>
  <rect x="320" y="405" width="36" height="80" rx="8" fill="#38bdf8" stroke="#0f172a" stroke-width="2"/>

  <!-- Aorta Arch (Red) -->
  <path d="M390,220 C390,85 520,85 520,175 L475,185 C475,135 430,135 430,220 Z" fill="#f87171" stroke="#0f172a" stroke-width="2"/>
  <rect x="422" y="88" width="16" height="28" fill="#f87171" stroke="#0f172a" stroke-width="1.6"/>
  <rect x="452" y="84" width="16" height="28" fill="#f87171" stroke="#0f172a" stroke-width="1.6"/>
  <rect x="482" y="92" width="16" height="28" fill="#f87171" stroke="#0f172a" stroke-width="1.6"/>

  <!-- Pulmonary Artery (Blue) -->
  <path d="M365,245 L365,175 L540,175 L540,210 L405,210 L405,245 Z" fill="#38bdf8" stroke="#0f172a" stroke-width="2"/>

  <!-- Heart Body -->
  <path d="M275,245 C255,345 315,445 435,465 C525,475 555,365 535,245 C515,195 315,195 275,245 Z" fill="#fda4af" stroke="#0f172a" stroke-width="2.5"/>
  <!-- Right Atrium & Right Ventricle (Deoxygenated - Blue) -->
  <path d="M285,245 C275,295 290,340 340,340 L345,235 Z" fill="#0284c7" stroke="#0f172a" stroke-width="1.8"/>
  <path d="M295,355 C310,415 365,445 425,445 L405,340 Z" fill="#0369a1" stroke="#0f172a" stroke-width="1.8"/>
  <!-- Left Atrium & Left Ventricle (Oxygenated - Red) -->
  <path d="M445,235 L450,315 L525,315 C525,265 495,235 445,235 Z" fill="#ef4444" stroke="#0f172a" stroke-width="1.8"/>
  <path d="M445,330 L455,445 C505,430 520,375 520,330 Z" fill="#dc2626" stroke="#0f172a" stroke-width="1.8"/>

  <!-- Left Labels -->
  <line x1="205" y1="115" x2="435" y2="115" stroke="#0f172a" stroke-width="1.5"/>
  <text x="195" y="120" text-anchor="end" fill="#0f172a" font-size="14" font-weight="700">Aorta</text>

  <line x1="205" y1="165" x2="310" y2="165" stroke="#0f172a" stroke-width="1.5"/>
  <text x="195" y="160" text-anchor="end" fill="#0f172a" font-size="14" font-weight="700">Superior</text>
  <text x="195" y="177" text-anchor="end" fill="#0f172a" font-size="14" font-weight="700">vena cava</text>

  <line x1="205" y1="230" x2="375" y2="230" stroke="#0f172a" stroke-width="1.5"/>
  <text x="195" y="235" text-anchor="end" fill="#0f172a" font-size="14" font-weight="700">Pulmonary valve</text>

  <line x1="205" y1="295" x2="310" y2="295" stroke="#0f172a" stroke-width="1.5"/>
  <text x="195" y="300" text-anchor="end" fill="#0f172a" font-size="14" font-weight="700">Right atrium</text>

  <line x1="205" y1="348" x2="340" y2="348" stroke="#0f172a" stroke-width="1.5"/>
  <text x="195" y="353" text-anchor="end" fill="#0f172a" font-size="14" font-weight="700">Tricuspid valve</text>

  <line x1="205" y1="405" x2="365" y2="405" stroke="#0f172a" stroke-width="1.5"/>
  <text x="195" y="410" text-anchor="end" fill="#0f172a" font-size="14" font-weight="700">Right ventricle</text>

  <polyline points="205,475 335,475 335,455" fill="none" stroke="#0f172a" stroke-width="1.5"/>
  <text x="195" y="468" text-anchor="end" fill="#0f172a" font-size="14" font-weight="700">Inferior</text>
  <text x="195" y="485" text-anchor="end" fill="#0f172a" font-size="14" font-weight="700">vena cava</text>

  <!-- Right Labels -->
  <line x1="510" y1="185" x2="615" y2="185" stroke="#0f172a" stroke-width="1.5"/>
  <text x="625" y="180" fill="#0f172a" font-size="14" font-weight="700">Pulmonary</text>
  <text x="625" y="197" fill="#0f172a" font-size="14" font-weight="700">artery</text>

  <line x1="520" y1="230" x2="615" y2="230" stroke="#0f172a" stroke-width="1.5"/>
  <text x="625" y="226" fill="#0f172a" font-size="14" font-weight="700">Pulmonary</text>
  <text x="625" y="243" fill="#0f172a" font-size="14" font-weight="700">vein</text>

  <line x1="505" y1="280" x2="615" y2="280" stroke="#0f172a" stroke-width="1.5"/>
  <text x="625" y="285" fill="#0f172a" font-size="14" font-weight="700">Left atrium</text>

  <line x1="485" y1="325" x2="615" y2="325" stroke="#0f172a" stroke-width="1.5"/>
  <text x="625" y="330" fill="#0f172a" font-size="14" font-weight="700">Mitral valve</text>

  <line x1="460" y1="365" x2="615" y2="365" stroke="#0f172a" stroke-width="1.5"/>
  <text x="625" y="370" fill="#0f172a" font-size="14" font-weight="700">Aortic valve</text>

  <line x1="495" y1="410" x2="615" y2="410" stroke="#0f172a" stroke-width="1.5"/>
  <text x="625" y="415" fill="#0f172a" font-size="14" font-weight="700">Left ventricle</text>

  <polyline points="435,425 495,480 615,480" fill="none" stroke="#0f172a" stroke-width="1.5"/>
  <text x="625" y="485" fill="#0f172a" font-size="14" font-weight="700">Septum</text>
</svg>"""


DIGESTIVE_SYSTEM_TEXTBOOK_SVG = """<svg viewBox="0 0 800 540" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff;border-radius:14px;font-family:system-ui,-apple-system,sans-serif">
  <rect width="800" height="540" fill="#ffffff" rx="14"/>
  <text x="400" y="42" text-anchor="middle" fill="#0f172a" font-size="27" font-weight="900">HUMAN DIGESTIVE SYSTEM</text>

  <!-- Mouth & Esophagus -->
  <ellipse cx="380" cy="108" rx="34" ry="20" fill="#fda4af" stroke="#0f172a" stroke-width="1.6"/>
  <rect x="392" y="122" width="16" height="82" fill="#fbcfe8" stroke="#0f172a" stroke-width="1.6"/>
  <!-- Salivary Glands -->
  <circle cx="415" cy="96" r="10" fill="#fde047" stroke="#0f172a" stroke-width="1.4"/>

  <!-- Liver & Gallbladder -->
  <path d="M295,210 C295,180 390,175 435,200 C425,225 350,248 295,248 Z" fill="#9a3412" stroke="#0f172a" stroke-width="1.8"/>
  <ellipse cx="348" cy="246" rx="12" ry="18" fill="#65a30d" stroke="#0f172a" stroke-width="1.5"/>

  <!-- Stomach & Pancreas -->
  <path d="M398,204 C445,192 475,225 462,265 C448,295 395,295 380,268 Z" fill="#fda4af" stroke="#0f172a" stroke-width="1.8"/>
  <ellipse cx="415" cy="296" rx="38" ry="12" fill="#fde047" stroke="#0f172a" stroke-width="1.5"/>

  <!-- Large & Small Intestine -->
  <rect x="315" y="315" width="170" height="125" rx="22" fill="#fecdd3" stroke="#9f1239" stroke-width="4"/>
  <rect x="342" y="338" width="116" height="82" rx="16" fill="#fda4af" stroke="#be123c" stroke-width="2"/>
  <rect x="388" y="440" width="24" height="68" rx="6" fill="#fda4af" stroke="#0f172a" stroke-width="1.8"/>

  <!-- Left Labels -->
  <line x1="255" y1="108" x2="345" y2="108" stroke="#0f172a" stroke-width="1.6"/>
  <text x="245" y="106" text-anchor="end" fill="#0f172a" font-size="14" font-weight="800">MOUTH</text>
  <text x="245" y="122" text-anchor="end" fill="#334155" font-size="12" font-weight="600">(Teeth &amp; Tongue)</text>

  <line x1="255" y1="215" x2="310" y2="215" stroke="#0f172a" stroke-width="1.6"/>
  <text x="245" y="220" text-anchor="end" fill="#0f172a" font-size="14" font-weight="800">LIVER</text>

  <line x1="255" y1="252" x2="338" y2="252" stroke="#0f172a" stroke-width="1.6"/>
  <text x="245" y="257" text-anchor="end" fill="#0f172a" font-size="14" font-weight="800">GALLBLADDER</text>

  <line x1="255" y1="378" x2="315" y2="378" stroke="#0f172a" stroke-width="1.6"/>
  <text x="245" y="370" text-anchor="end" fill="#0f172a" font-size="14" font-weight="800">LARGE INTESTINE</text>
  <text x="245" y="388" text-anchor="end" fill="#334155" font-size="11.5" font-weight="600">(Cecum, Colon)</text>

  <!-- Right Labels -->
  <line x1="425" y1="96" x2="545" y2="96" stroke="#0f172a" stroke-width="1.6"/>
  <text x="555" y="101" fill="#0f172a" font-size="14" font-weight="800">SALIVARY GLANDS</text>

  <line x1="408" y1="158" x2="545" y2="158" stroke="#0f172a" stroke-width="1.6"/>
  <text x="555" y="163" fill="#0f172a" font-size="14" font-weight="800">ESOPHAGUS</text>

  <line x1="462" y1="230" x2="545" y2="230" stroke="#0f172a" stroke-width="1.6"/>
  <text x="555" y="235" fill="#0f172a" font-size="14" font-weight="800">STOMACH</text>

  <line x1="448" y1="296" x2="545" y2="296" stroke="#0f172a" stroke-width="1.6"/>
  <text x="555" y="301" fill="#0f172a" font-size="14" font-weight="800">PANCREAS</text>

  <line x1="455" y1="378" x2="545" y2="378" stroke="#0f172a" stroke-width="1.6"/>
  <text x="555" y="372" fill="#0f172a" font-size="14" font-weight="800">SMALL INTESTINE</text>
  <text x="555" y="390" fill="#334155" font-size="11.5" font-weight="600">(Duodenum, Jejunum, Ileum)</text>

  <line x1="412" y1="465" x2="545" y2="465" stroke="#0f172a" stroke-width="1.6"/>
  <text x="555" y="470" fill="#0f172a" font-size="14" font-weight="800">RECTUM</text>

  <line x1="412" y1="502" x2="545" y2="502" stroke="#0f172a" stroke-width="1.6"/>
  <text x="555" y="507" fill="#0f172a" font-size="14" font-weight="800">ANUS</text>
</svg>"""


ANIMAL_PLANT_CELL_TEXTBOOK_SVG = """<svg viewBox="0 0 820 520" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff;border-radius:14px;font-family:system-ui,-apple-system,sans-serif">
  <rect width="820" height="520" fill="#ffffff" rx="14"/>
  <text x="45" y="36" fill="#991b1b" font-size="16" font-weight="800">Biology diagram</text>
  <circle cx="185" cy="30" r="6" fill="#15803d"/>
  <circle cx="204" cy="30" r="6" fill="#b91c1c"/>
  <circle cx="223" cy="30" r="6" fill="#1e1b4b"/>
  <text x="45" y="72" fill="#0f172a" font-size="25" font-weight="900">Structure of ANIMAL and PLANT CELL</text>

  <!-- Badges -->
  <rect x="65" y="96" width="135" height="32" rx="16" fill="#f97316"/>
  <text x="132" y="117" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="800">Animal cell</text>

  <rect x="520" y="96" width="135" height="32" rx="16" fill="#15803d"/>
  <text x="587" y="117" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="800">Plant cell</text>

  <!-- Animal Cell (Left) -->
  <path d="M90,260 C85,175 160,155 215,165 C285,175 335,215 325,305 C315,395 245,425 165,415 C95,405 95,330 90,260 Z" fill="#ffedd5" stroke="#fb923c" stroke-width="6"/>
  <!-- Animal Nucleus & Nucleolus -->
  <circle cx="170" cy="345" r="42" fill="#93c5fd" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="6,3"/>
  <circle cx="158" cy="355" r="12" fill="#1e3a8a"/>
  <!-- Animal Mitochondria & Vacuole -->
  <ellipse cx="240" cy="245" rx="14" ry="26" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
  <ellipse cx="225" cy="195" rx="14" ry="18" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>

  <!-- Plant Cell (Right) -->
  <rect x="505" y="160" width="235" height="270" rx="45" fill="#ecfdf5" stroke="#4d7c0f" stroke-width="10"/>
  <!-- Large Central Vacuole -->
  <ellipse cx="600" cy="215" rx="48" ry="30" fill="#bae6fd" stroke="#0284c7" stroke-width="1.8"/>
  <!-- Plant Nucleus -->
  <circle cx="665" cy="355" r="40" fill="#93c5fd" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="6,3"/>
  <circle cx="675" cy="360" r="12" fill="#1e3a8a"/>
  <!-- Chloroplasts -->
  <ellipse cx="555" cy="380" rx="18" ry="9" fill="#16a34a" stroke="#14532d" stroke-width="1.4"/>
  <ellipse cx="705" cy="255" rx="18" ry="9" fill="#16a34a" stroke="#14532d" stroke-width="1.4"/>
  <!-- Plant Mitochondria -->
  <ellipse cx="575" cy="275" rx="22" ry="12" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>

  <!-- Shared Center Labels & Leader Lines -->
  <text x="410" y="205" text-anchor="middle" fill="#0f172a" font-size="12.5" font-weight="700">Vacuole</text>
  <line x1="238" y1="196" x2="378" y2="201" stroke="#0f172a" stroke-width="1.2"/>
  <line x1="442" y1="201" x2="565" y2="215" stroke="#0f172a" stroke-width="1.2"/>

  <text x="410" y="252" text-anchor="middle" fill="#0f172a" font-size="12.5" font-weight="700">Mitochondria</text>
  <line x1="252" y1="245" x2="365" y2="248" stroke="#0f172a" stroke-width="1.2"/>
  <line x1="455" y1="248" x2="555" y2="270" stroke="#0f172a" stroke-width="1.2"/>

  <text x="410" y="298" text-anchor="middle" fill="#0f172a" font-size="12.5" font-weight="700">Ribosome</text>
  <text x="410" y="335" text-anchor="middle" fill="#0f172a" font-size="12.5" font-weight="700">Endoplasmic Reticulum</text>

  <text x="410" y="395" text-anchor="middle" fill="#0f172a" font-size="12.5" font-weight="700">Chloroplast</text>
  <line x1="450" y1="392" x2="540" y2="382" stroke="#0f172a" stroke-width="1.2"/>

  <!-- Bottom Labels -->
  <line x1="158" y1="365" x2="115" y2="455" stroke="#0f172a" stroke-width="1.2"/>
  <text x="95" y="472" text-anchor="middle" fill="#0f172a" font-size="12.5" font-weight="700">Nucleolus</text>
  <line x1="185" y1="385" x2="195" y2="465" stroke="#0f172a" stroke-width="1.2"/>
  <text x="195" y="482" text-anchor="middle" fill="#0f172a" font-size="12.5" font-weight="700">Nucleus</text>

  <line x1="650" y1="392" x2="585" y2="465" stroke="#0f172a" stroke-width="1.2"/>
  <text x="580" y="482" text-anchor="middle" fill="#0f172a" font-size="12.5" font-weight="700">Nucleus</text>
  <line x1="678" y1="372" x2="690" y2="455" stroke="#0f172a" stroke-width="1.2"/>
  <text x="695" y="472" text-anchor="middle" fill="#0f172a" font-size="12.5" font-weight="700">Nucleolus</text>
</svg>"""

