"""
Visual Learning & Educational Image Generation Service for NEET (UG) RAG Chatbot.

Kept separate from the core RAG pipeline module. Takes a student's question,
retrieved NEET syllabus chunks, and optional RAG text answer to:
1. Identify the subject (Physics, Chemistry, Botany, Zoology, Biology).
2. Classify the appropriate educational image type.
3. Extract syllabus-grounded scientific concepts, labels, and NEET exam notes.
4. Generate an educational image prompt and a scientifically accurate SVG
   diagram/infographic with programmatic text labels and arrows.
"""

import json
import logging
import os
import re
from typing import Any, Dict, List, Optional

logger = logging.getLogger(__name__)

# ── Subject Keywords ──────────────────────────────────────────────────────────
BOTANY_KEYWORDS = [
    'plant', 'botany', 'root', 'stem', 'leaf', 'leaves', 'flower', 'floral',
    'photosynthesis', 'chloroplast', 'chlorophyll', 'transpiration', 'xylem',
    'phloem', 'stomata', 'angiosperm', 'gymnosperm', 'bryophyte', 'pteridophyte',
    'algae', 'fungi', 'seed', 'pollen', 'ovule', 'meristem', 'parenchyma',
    'collenchyma', 'sclerenchyma', 'calvin cycle', 'c3', 'c4', 'photoperiodism',
    'vernalization', 'auxin', 'gibberellin', 'cytokinin', 'plant cell',
    'vascular bundle', 'monocot', 'dicot', 'alternation of generations'
]

ZOOLOGY_KEYWORDS = [
    'animal', 'zoology', 'animalia', 'porifera', 'cnidaria', 'coelenterata',
    'platyhelminthes', 'aschelminthes', 'annelida', 'arthropoda', 'mollusca',
    'echinodermata', 'chordata', 'vertebrata', 'amphibia', 'reptilia', 'aves',
    'mammalia', 'cockroach', 'frog', 'earthworm', 'epithelial', 'connective tissue',
    'muscular tissue', 'neural tissue', 'coelom', 'notochord', 'organ system',
    'structural organisation'
]

BIOLOGY_KEYWORDS = [
    'heart', 'cardiac', 'kidney', 'nephron', 'liver', 'hepatic', 'digestive',
    'respiratory', 'lungs', 'alveoli', 'nervous', 'neuron', 'synapse', 'brain',
    'dna', 'rna', 'transcription', 'translation', 'replication', 'mitosis',
    'meiosis', 'cell division', 'genetics', 'mendel', 'chromosome', 'reproduction',
    'uterus', 'ovary', 'testis', 'fertilization', 'menstrual', 'evolution',
    'darwin', 'hardy-weinberg', 'immune', 'antibody', 'biotech', 'pcr', 'plasmid',
    'enzyme', 'cell', 'mitochondria', 'nucleus', 'ecology', 'ecosystem', 'pyramid'
]

CHEMISTRY_KEYWORDS = [
    'benzene', 'hybridization', 'orbital', 'molecular', 'covalent', 'ionic',
    'chemical bond', 'vsepr', 'periodic table', 'electronegativity', 'ionization',
    'electrochemical', 'galvanic', 'daniell', 'nernst', 'electrode', 'cathode',
    'anode', 'organic', 'reaction mechanism', 'sn1', 'sn2', 'aldol', 'cannizzaro',
    'wurtz', 'friedel-crafts', 'grignard', 'equilibrium', 'le chatelier',
    'kinetics', 'arrhenius', 'thermodynamics', 'enthalpy', 'entropy', 'gibbs',
    'atomic structure', 'bohr', 'quantum', 'coordination', 'ligand', 'isomer',
    'acid', 'base', 'ph', 'buffer', 'mole', 'molarity', 'titration', 'alkane',
    'alkene', 'alkyne', 'alcohol', 'aldehyde', 'ketone', 'carboxylic', 'amine'
]

PHYSICS_KEYWORDS = [
    'ray optics', 'lens', 'mirror', 'refraction', 'snell', 'prism', 'focal',
    'wave optics', 'interference', 'diffraction', 'circuit', 'resistor',
    'capacitor', 'ohm', 'kirchhoff', 'wheatstone', 'potentiometer', 'lcr',
    'alternating current', 'impedance', 'transformer', 'magnetic', 'solenoid',
    'lorentz', 'ampere', 'biot-savart', 'faraday', 'electromagnetic induction',
    'lenz', 'newton', 'force', 'friction', 'free body', 'pulley', 'projectile',
    'kinematics', 'motion', 'momentum', 'collision', 'work', 'energy', 'power',
    'gravitation', 'kepler', 'escape velocity', 'wave', 'shm', 'oscillation',
    'doppler', 'thermodynamics', 'carnot', 'heat engine', 'semiconductor',
    'diode', 'transistor', 'logic gate', 'photoelectric', 'nuclear', 'decay',
    'electrostatics', 'gauss', 'electric field', 'dipole', 'bernoulli', 'fluid'
]


def identify_subject(question: str, explicit_subject: Optional[str] = None) -> str:
    """Identify the NEET subject area: Physics, Chemistry, Botany, Zoology, or Biology."""
    q = (question or '').lower()

    # Check Botany & Zoology specifically even if user is in Biology tab
    if any(kw in q for kw in BOTANY_KEYWORDS):
        return 'Botany'
    if any(kw in q for kw in ZOOLOGY_KEYWORDS):
        return 'Zoology'
    if any(kw in q for kw in PHYSICS_KEYWORDS):
        return 'Physics'
    if any(kw in q for kw in CHEMISTRY_KEYWORDS):
        return 'Chemistry'
    if any(kw in q for kw in BIOLOGY_KEYWORDS):
        return 'Biology'

    if explicit_subject:
        s = explicit_subject.strip().capitalize()
        if s in {'Physics', 'Chemistry', 'Biology', 'Botany', 'Zoology'}:
            return s
    return 'Biology'


def classify_image_type(question: str, subject: str) -> str:
    """Classify the question into a specific educational visual format."""
    q = (question or '').lower()

    # Physics classifications
    if subject == 'Physics':
        if any(k in q for k in ['ray', 'optics', 'lens', 'mirror', 'refraction', 'prism', 'snell']):
            return 'Ray Diagram'
        if any(k in q for k in ['circuit', 'resistor', 'capacitor', 'kirchhoff', 'wheatstone', 'lcr', 'ohm', 'transformer']):
            return 'Electric Circuit Diagram'
        if any(k in q for k in ['magnetic', 'solenoid', 'biot-savart', 'lorentz', 'induction', 'faraday', 'lenz']):
            return 'Magnetic Field Illustration'
        if any(k in q for k in ['graph', 'plot', 'curve', 'pv diagram', 'stress-strain', 'v-t graph']):
            return 'Physics Graph'
        return 'Physics Concept Illustration'

    # Chemistry classifications
    if subject == 'Chemistry':
        if any(k in q for k in ['benzene', 'structure of', 'hybridization', 'vsepr', 'lewis', 'orbital', 'molecular']):
            return 'Chemical Molecular Structure'
        if any(k in q for k in ['mechanism', 'sn1', 'sn2', 'aldol', 'cannizzaro', 'reaction', 'synthesis', 'flowchart']):
            return 'Organic Reaction Mechanism'
        if any(k in q for k in ['electrochemical', 'galvanic', 'daniell', 'nernst', 'electrolysis', 'cell potential']):
            return 'Electrochemical Cell Diagram'
        if any(k in q for k in ['periodic table', 'periodic trend', 'electronegativity', 'ionization']):
            return 'Periodic Table Infographic'
        if any(k in q for k in ['bohr', 'atomic structure', 'quantum', 'spectrum']):
            return 'Atomic Structure Illustration'
        return 'Chemical Bonding & Reaction Diagram'

    # Biology / Botany / Zoology classifications
    if any(k in q for k in ['mitosis', 'meiosis', 'cell cycle', 'cell division', 'replication', 'transcription', 'translation']):
        return 'Step-by-Step Biological Diagram'
    if any(k in q for k in ['photosynthesis', 'transpiration', 'glycolysis', 'krebs', 'calvin', 'life cycle', 'menstrual', 'pcr']):
        return 'Scientific Process Infographic'
    if any(k in q for k in ['heart', 'kidney', 'nephron', 'liver', 'brain', 'neuron', 'eye', 'ear', 'digestive',
                            'respiratory', 'reproductive', 'uterus', 'flower', 'leaf', 'root', 'stem', 'plant cell',
                            'animal cell', 'chloroplast', 'mitochondria', 'dna', 'rna']):
        return 'Labelled Anatomy Diagram'
    if any(k in q for k in ['classification', 'kingdom', 'phylum', 'taxonomy', 'animalia', 'chordata']):
        return 'Zoological Classification Diagram'
    if subject == 'Botany':
        return 'Botanical Anatomy & Process Diagram'
    if subject == 'Zoology':
        return 'Zoological Anatomy & System Diagram'
    return 'Scientific Concept Infographic'


def _extract_topic_name(question: str) -> str:
    """Derive a clean, concise topic title from the student's question."""
    q = (question or '').strip()
    q = re.sub(r'^(explain|what is|what are|describe|define|draw|show me|how does|tell me about)\s+', '', q, flags=re.I)
    q = q.split(':')[0].split('?')[0].strip()
    if len(q) > 65:
        q = q[:62].rsplit(' ', 1)[0] + '...'
    return q.title() if q else 'NEET Scientific Concept'


def _build_default_concepts(question: str, subject: str, image_type: str, retrieved_chunks: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Deterministic fallback concept extraction grounded in retrieved RAG chunks."""
    topic = _extract_topic_name(question)
    has_syllabus = bool(retrieved_chunks)

    snippet_points: List[str] = []
    for chunk in (retrieved_chunks or [])[:3]:
        content = (chunk.get('content') or '').strip()
        if content:
            first_sent = re.split(r'(?<=[.!?])\s+', content)[0].strip()
            if 15 <= len(first_sent) <= 180:
                snippet_points.append(first_sent)

    important_concepts = snippet_points if snippet_points else [
        f"Core structural and functional principles of {topic} in {subject}.",
        f"Visual representation formatted as a {image_type} with colour-coded components.",
        "Cause-and-effect relationships and directional flow between labelled parts."
    ]

    neet_notes = [
        f"NCERT High-Yield Focus ({subject}): Memorize exact terminology and directional arrows for {topic}.",
        "Check standard NCERT exceptions, units, and diagram-based assertion-reason traps.",
        "Review past NEET (UG) diagram-labelling PYQs related to this topic."
    ]

    limitation_note = None if has_syllabus else (
        "Retrieved syllabus context for this specific query was limited; "
        "diagram uses standard NCERT NEET (UG) reference principles."
    )

    return {
        'topic': topic,
        'short_explanation': f"{image_type} illustrating {topic} for NEET {subject} preparation.",
        'image_prompt': (
            f"High-resolution educational {image_type} of {topic} for NEET {subject}, "
            f"clean dark scientific background, colour-coded components, clear arrows, accurate NCERT labels."
        ),
        'important_concepts': important_concepts[:4],
        'neet_exam_notes': neet_notes,
        'syllabus_grounded': has_syllabus,
        'limitation_note': limitation_note,
        'components': [
            {'label': f'{topic} Core', 'detail': important_concepts[0][:70] if important_concepts else 'Primary structure'},
            {'label': 'Mechanism / Flow', 'detail': f'{image_type} pathway & interactions'},
            {'label': 'NEET Key Point', 'detail': f'{subject} NCERT exam-critical relation'}
        ]
    }


def extract_scientific_concepts(
    question: str,
    subject: str,
    image_type: str,
    retrieved_chunks: List[Dict[str, Any]],
    rag_answer: str = ''
) -> Dict[str, Any]:
    """
    Extract structured scientific concepts, image prompt, and diagram labels
    strictly grounded in the retrieved NEET syllabus chunks.
    """
    fallback = _build_default_concepts(question, subject, image_type, retrieved_chunks)

    # Only invoke LLM if a real API key is configured
    api_key = os.getenv('GROQ_API_KEY', '') or os.getenv('GROK_API_KEY', '')
    if not api_key or 'placeholder' in api_key.lower() or 'your-' in api_key.lower():
        return fallback

    try:
        from rag.llm.llm_factory import get_llm_provider
        llm = get_llm_provider(os.getenv('LLM_PROVIDER', 'groq'))

        syllabus_context = '\n'.join(
            f"- [{c.get('metadata', {}).get('title', 'NCERT')}] {(c.get('content') or '')[:350]}"
            for c in (retrieved_chunks or [])[:3]
        ) or 'No specific syllabus chunks retrieved.'

        prompt = f"""You are a NEET (UG) scientific visual designer.
Given the student question, subject ({subject}), classified visual format ({image_type}), and retrieved syllabus context, output ONLY valid JSON (no markdown fences) with these exact keys:
{{
  "topic": "concise 2-6 word scientific title",
  "short_explanation": "1-2 sentence explanation of what the diagram shows",
  "image_prompt": "detailed educational illustration prompt grounded in the syllabus",
  "important_concepts": ["3 to 4 concise points shown in the diagram"],
  "neet_exam_notes": ["3 concise NEET exam tips, formulas, or NCERT traps"],
  "components": [
    {{"label": "Structure/Part 1 (max 24 chars)", "detail": "Role/value (max 52 chars)"}},
    {{"label": "Structure/Part 2 (max 24 chars)", "detail": "Role/value (max 52 chars)"}},
    {{"label": "Structure/Part 3 (max 24 chars)", "detail": "Role/value (max 52 chars)"}},
    {{"label": "Structure/Part 4 (max 24 chars)", "detail": "Role/value (max 52 chars)"}}
  ]
}}

Student Question: {question}
Retrieved NEET Syllabus Context:
{syllabus_context}
"""
        raw = llm.generate(
            [
                {'role': 'system', 'content': 'Return strictly valid JSON only. Never invent biological or chemical facts.'},
                {'role': 'user', 'content': prompt}
            ],
            max_tokens=650
        )
        match = re.search(r'\{[\s\S]*\}', raw or '')
        if not match:
            return fallback
        parsed = json.loads(match.group(0))
        return {
            'topic': parsed.get('topic') or fallback['topic'],
            'short_explanation': parsed.get('short_explanation') or fallback['short_explanation'],
            'image_prompt': parsed.get('image_prompt') or fallback['image_prompt'],
            'important_concepts': parsed.get('important_concepts') or fallback['important_concepts'],
            'neet_exam_notes': parsed.get('neet_exam_notes') or fallback['neet_exam_notes'],
            'syllabus_grounded': bool(retrieved_chunks),
            'limitation_note': fallback['limitation_note'],
            'components': (parsed.get('components') or fallback['components'])[:4]
        }
    except Exception as exc:
        logger.warning(f"Concept extraction fallback used: {exc}")
        return fallback


def _escape_xml(text: str) -> str:
    return (
        str(text or '')
        .replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
        .replace('"', '&quot;')
    )


def _render_programmatic_svg(
    subject: str,
    image_type: str,
    concepts: Dict[str, Any],
    regenerate: bool = False
) -> str:
    """
    Render a clean white-background NCERT textbook-style educational SVG
    with bold dark typography, colour-coded components, and straight leader lines.
    """
    palette = {
        'Physics': ('#0284c7', '#e0f2fe', '#0369a1'),
        'Chemistry': ('#7c3aed', '#f3e8ff', '#5b21b6'),
        'Biology': ('#15803d', '#dcfce7', '#14532d'),
        'Botany': ('#16a34a', '#dcfce7', '#14532d'),
        'Zoology': ('#e11d48', '#ffe4e6', '#9f1239'),
    }
    accent, badge_bg, title_col = palette.get(subject, palette['Biology'])
    topic = _escape_xml(concepts.get('topic', 'NEET Concept')).upper()
    short_exp = _escape_xml((concepts.get('short_explanation') or '')[:95])
    components = concepts.get('components') or []
    neet_note = _escape_xml((concepts.get('neet_exam_notes') or ['NCERT High-Yield Concept'])[0][:88])
    variant_tag = ' (ALT VIEW)' if regenerate else ''

    card_styles = [
        ('#f97316', '#ffedd5', '#9a3412'),
        ('#16a34a', '#dcfce7', '#14532d'),
        ('#0284c7', '#e0f2fe', '#075985'),
        ('#9333ea', '#f3e8ff', '#581c87'),
    ]
    nodes_svg = []
    positions = [(40, 125), (430, 125), (40, 250), (430, 250)]
    for idx, comp in enumerate(components[:4]):
        x, y = positions[idx]
        stroke_c, fill_c, text_c = card_styles[idx % len(card_styles)]
        lbl = _escape_xml((comp.get('label') or f'Component {idx + 1}')[:26])
        det = _escape_xml((comp.get('detail') or '')[:50])
        nodes_svg.append(f"""
  <g>
    <rect x="{x}" y="{y}" width="330" height="92" rx="14" fill="{fill_c}" stroke="{stroke_c}" stroke-width="2"/>
    <rect x="{x + 14}" y="{y + 12}" width="24" height="24" rx="12" fill="{stroke_c}"/>
    <text x="{x + 26}" y="{y + 28}" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="800">{idx + 1}</text>
    <text x="{x + 48}" y="{y + 29}" fill="{text_c}" font-size="13.5" font-weight="800">{lbl}</text>
    <line x1="{x + 14}" y1="{y + 46}" x2="{x + 316}" y2="{y + 46}" stroke="{stroke_c}" stroke-opacity="0.35" stroke-width="1.2"/>
    <text x="{x + 16}" y="{y + 68}" fill="#1e293b" font-size="11.5" font-weight="600">{det}</text>
  </g>""")

    return f"""<svg viewBox="0 0 800 450" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#fcfbf7;border-radius:14px;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="vlArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="#0f172a"/>
    </marker>
  </defs>
  <rect width="800" height="450" rx="14" fill="#fcfbf7"/>

  <!-- Textbook Header -->
  <rect x="28" y="18" width="220" height="26" rx="13" fill="{badge_bg}" stroke="{accent}" stroke-width="1.2"/>
  <text x="138" y="35" text-anchor="middle" fill="{title_col}" font-size="11" font-weight="800" letter-spacing="0.6">{_escape_xml(subject.upper())} · {_escape_xml(image_type.upper())}{variant_tag}</text>
  <text x="400" y="72" text-anchor="middle" fill="#0f172a" font-size="24" font-weight="900" letter-spacing="0.4">{topic}</text>
  <text x="400" y="96" text-anchor="middle" fill="#334155" font-size="12" font-weight="600">{short_exp}</text>

  <!-- Crisp Straight Leader Arrows -->
  <line x1="370" y1="171" x2="422" y2="171" stroke="#0f172a" stroke-width="2" marker-end="url(#vlArrow)"/>
  <line x1="595" y1="217" x2="595" y2="242" stroke="#0f172a" stroke-width="2" marker-end="url(#vlArrow)"/>
  <line x1="430" y1="296" x2="378" y2="296" stroke="#0f172a" stroke-width="2" marker-end="url(#vlArrow)"/>

  {''.join(nodes_svg)}

  <!-- Bottom Equation / NCERT Exam Box -->
  <rect x="28" y="370" width="744" height="58" rx="10" fill="#f0fdf4" stroke="#166534" stroke-width="2"/>
  <text x="46" y="393" fill="#14532d" font-size="11.5" font-weight="900">NEET (UG) EXAM FOCUS:</text>
  <text x="46" y="413" fill="#1e293b" font-size="12" font-weight="700">{neet_note}</text>
</svg>"""


def generate_educational_visual(
    question: str,
    explicit_subject: Optional[str] = None,
    retrieved_chunks: Optional[List[Dict[str, Any]]] = None,
    rag_answer: str = '',
    regenerate: bool = False
) -> Dict[str, Any]:
    """
    End-to-end visual learning pipeline:
    Question -> Subject -> Image Type -> Syllabus Concept Extraction -> Visual SVG/Image.
    """
    from services.textbook_illustrations import get_textbook_svg

    chunks = retrieved_chunks or []
    subject = identify_subject(question, explicit_subject)
    image_type = classify_image_type(question, subject)
    concepts = extract_scientific_concepts(question, subject, image_type, chunks, rag_answer)

    # Prefer rich textbook-style illustration when available; otherwise render clean textbook infographic
    textbook_svg = None if regenerate else get_textbook_svg(question, concepts['topic'])
    image_svg = textbook_svg or _render_programmatic_svg(subject, image_type, concepts, regenerate=regenerate)

    return {
        'subject': subject,
        'image_type': image_type,
        'topic': concepts['topic'],
        'short_explanation': concepts['short_explanation'],
        'image_prompt': concepts['image_prompt'],
        'important_concepts': concepts['important_concepts'],
        'neet_exam_notes': concepts['neet_exam_notes'],
        'syllabus_grounded': concepts['syllabus_grounded'],
        'limitation_note': concepts['limitation_note'],
        'image_svg': image_svg,
        'image_url': None
    }

