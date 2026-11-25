/**
 * NEET (UG) 2026 Authentic Learning & Preparation Resources Catalog
 * Curated for medical aspirants: NCERT textbooks, standard references,
 * official NTA portals, PYQ paper archives, and high-yield revision guides.
 */

export const NEET_RESOURCE_CATEGORIES = [
  'All Categories',
  'Official NTA & NCERT',
  'Biology',
  'Physics',
  'Chemistry',
  'PYQ & Mock Tests',
  'Revision & Formulas'
]

export const NEET_RESOURCE_TYPES = {
  all: { label: 'All Types' },
  documentation: { label: 'NCERT / Official', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' },
  book: { label: 'Standard Book', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
  practice: { label: 'Practice & PYQ', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' },
  article: { label: 'Revision Notes', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' },
  video: { label: 'Video Lectures', color: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300' },
}

export const NEET_RESOURCES = [
  // ── Official NTA & NCERT ──
  {
    id: 1,
    title: 'NCERT Official Digital Textbooks (Class 11 & 12)',
    category: 'Official NTA & NCERT',
    type: 'documentation',
    difficulty: 'beginner',
    desc: 'The official digital repository for NCERT Physics, Chemistry, and Biology. Forms 90%+ of direct questions in the NEET (UG) exam.',
    url: 'https://ncert.nic.in/textbook.php',
    isInternal: false,
    tags: ['NCERT', 'Class 11', 'Class 12', 'Official'],
    recommendedFor: 'Foundations & Core Revision'
  },
  {
    id: 2,
    title: 'NTA Official NEET (UG) Examination Portal',
    category: 'Official NTA & NCERT',
    type: 'documentation',
    difficulty: 'beginner',
    desc: 'National Testing Agency official portal for NEET (UG) information bulletin, syllabus clarifications, tie-breaking criteria, and advisories.',
    url: 'https://exams.nta.ac.in/NEET/',
    isInternal: false,
    tags: ['NTA', 'Syllabus', 'Official Guidelines'],
    recommendedFor: 'All Aspirants'
  },
  {
    id: 3,
    title: 'NTA National Test Abhyas AI Mock Test Platform',
    category: 'Official NTA & NCERT',
    type: 'practice',
    difficulty: 'intermediate',
    desc: 'Government-released test preparation platform featuring full-length 720-mark simulated mock tests with NTA-style difficulty and timing.',
    url: 'https://www.nta.ac.in/Abhyas',
    isInternal: false,
    tags: ['Mock Test', 'NTA Abhyas', 'Timed Practice'],
    minutes: 180,
    recommendedFor: 'Full-Length Simulation'
  },
  {
    id: 4,
    title: 'SWAYAM-PRABHA Medical & Pre-Medical Video Lectures',
    category: 'Official NTA & NCERT',
    type: 'video',
    difficulty: 'intermediate',
    desc: 'MHRD initiative delivering 24/7 DTH educational channels with curated conceptual video lectures by premier IIT, AIIMS, and university faculty.',
    url: 'https://www.swayamprabha.gov.in/',
    isInternal: false,
    tags: ['Video', 'Government Portal', 'Conceptual Clarity'],
    minutes: 360,
    recommendedFor: 'Concept Reinforcement'
  },

  // ── Biology (Botany & Zoology: 360 Marks) ──
  {
    id: 5,
    title: 'NCERT Biology Line-by-Line Complete Syllabus Guide',
    category: 'Biology',
    type: 'documentation',
    difficulty: 'beginner',
    desc: 'Line-by-line master analysis of Class 11 & 12 Biology: Human Physiology, Genetics & Evolution, Ecology, Plant Physiology, and Biotechnology.',
    url: 'https://ncert.nic.in/textbook.php?kebo1=0-22',
    isInternal: false,
    tags: ['Biology', '360 Marks', 'Genetics', 'Physiology'],
    recommendedFor: 'Mandatory Daily Reading'
  },
  {
    id: 6,
    title: 'MTG NCERT at your Fingertips — Biology',
    category: 'Biology',
    type: 'practice',
    difficulty: 'intermediate',
    desc: 'Chapter-wise NCERT-extracted objective MCQs, assertion-reason drills, and diagram-based questions matching authentic NEET exam patterns.',
    url: 'https://mtg.in/neet-books/objective-ncert-at-your-fingertips-biology/',
    isInternal: false,
    tags: ['Biology', 'MCQs', 'Assertion-Reason'],
    minutes: 480,
    recommendedFor: 'Chapter-wise Practice'
  },
  {
    id: 7,
    title: 'Trueman’s Elementary Biology (Vol 1 & 2)',
    category: 'Biology',
    type: 'book',
    difficulty: 'advanced',
    desc: 'Comprehensive reference text for in-depth botanical and zoological anatomical diagrams, comparative physiology, and high-difficulty questions.',
    url: 'https://www.trueman.in/',
    isInternal: false,
    tags: ['Biology', 'Anatomy', 'Reference Text'],
    recommendedFor: 'Top-Ranker Deep Dive'
  },
  {
    id: 8,
    title: 'AI-LearnPath Interactive Biology Diagram & Taxonomy Index',
    category: 'Biology',
    type: 'article',
    difficulty: 'intermediate',
    desc: 'Curated repository of all 180+ NCERT diagrams across Plant Kingdom, Animal Kingdom, Cell Cycle, and Neural Control with labeling challenges.',
    url: '/courses',
    isInternal: true,
    tags: ['Diagrams', 'Morphology', 'Visual Memory'],
    recommendedFor: 'High-Yield Visual Recall'
  },

  // ── Physics (180 Marks) ──
  {
    id: 9,
    title: 'Concepts of Physics by Dr. H.C. Verma (Vol 1 & 2)',
    category: 'Physics',
    type: 'book',
    difficulty: 'advanced',
    desc: 'The gold standard conceptual physics text. Excellent for Mechanics, Waves, Electrodynamics, and Optics with rigorous conceptual questions.',
    url: 'https://www.conceptsofphysics.com/',
    isInternal: false,
    tags: ['Physics', 'Mechanics', 'Electrodynamics', 'Concepts'],
    recommendedFor: 'Conceptual Mastery'
  },
  {
    id: 10,
    title: 'DC Pandey Objective Physics for NEET (Arihant Series)',
    category: 'Physics',
    type: 'practice',
    difficulty: 'intermediate',
    desc: 'Step-by-step problem-solving series tailored for NEET-level numerical calculations, shortcut tricks, and past question analysis.',
    url: 'https://arihantbooks.com/product-category/medical-entrances/neet-physics/',
    isInternal: false,
    tags: ['Physics', 'Numerical Practice', 'Shortcuts'],
    minutes: 600,
    recommendedFor: 'Speed & Numerical Accuracy'
  },
  {
    id: 11,
    title: 'AI-LearnPath NEET Physics Master Formula Vault',
    category: 'Physics',
    type: 'article',
    difficulty: 'beginner',
    desc: 'Interactive formula sheet covering all 28 NEET physics chapters with SI units, dimensional formulas, and typical exam pitfalls.',
    url: '/courses/formulas',
    isInternal: true,
    tags: ['Physics', 'Formulas', 'Cheat Sheet', 'In-App'],
    recommendedFor: 'Rapid Pre-Exam Revision'
  },
  {
    id: 12,
    title: 'NCERT Physics Exemplar Problems & Solutions',
    category: 'Physics',
    type: 'documentation',
    difficulty: 'intermediate',
    desc: 'Official NCERT advanced problem book featuring high-order thinking skills (HOTS) questions and multi-concept MCQs frequently adapted for NEET.',
    url: 'https://ncert.nic.in/exemplar-problems.php',
    isInternal: false,
    tags: ['NCERT Exemplar', 'HOTS', 'Multi-Concept'],
    recommendedFor: 'Rank-Booster Problems'
  },

  // ── Chemistry (Physical, Organic & Inorganic: 180 Marks) ──
  {
    id: 13,
    title: 'NCERT Chemistry Class 11 & 12 (Core Exam Focus)',
    category: 'Chemistry',
    type: 'documentation',
    difficulty: 'beginner',
    desc: 'Essential textbook for Inorganic reactions, Periodic trends, and Organic transformations. Over 85% of inorganic MCQs quote NCERT tables directly.',
    url: 'https://ncert.nic.in/textbook.php',
    isInternal: false,
    tags: ['Chemistry', 'Inorganic', 'Organic', 'NCERT'],
    recommendedFor: 'Foundations & Memory Work'
  },
  {
    id: 14,
    title: 'MS Chouhan Elementary Problems in Organic Chemistry',
    category: 'Chemistry',
    type: 'practice',
    difficulty: 'advanced',
    desc: 'Problem book for Organic Chemistry reaction mechanisms: Electrophilic Aromatic Substitution, Carbonyl compounds, Biomolecules, and Named Reactions.',
    url: 'https://www.balajiofficial.com/',
    isInternal: false,
    tags: ['Organic Chemistry', 'Mechanisms', 'Reaction Roadmaps'],
    minutes: 420,
    recommendedFor: 'Organic Reaction Mastery'
  },
  {
    id: 15,
    title: 'O.P. Tandon Physical Chemistry for Medical Entrances',
    category: 'Chemistry',
    type: 'book',
    difficulty: 'intermediate',
    desc: 'Comprehensive theory and structured numerical sets for Thermodynamics, Electrochemistry, Equilibrium, Chemical Kinetics, and Solutions.',
    url: 'https://grbbooks.com/',
    isInternal: false,
    tags: ['Physical Chemistry', 'Thermodynamics', 'Numericals'],
    recommendedFor: 'Numerical Chemistry Mastery'
  },
  {
    id: 16,
    title: 'V.K. Jaiswal Concise Problems in Inorganic Chemistry',
    category: 'Chemistry',
    type: 'practice',
    difficulty: 'intermediate',
    desc: 'Targeted MCQ practice covering Coordination Compounds, Chemical Bonding, p-Block, and d/f-Block elements with detailed explanatory solutions.',
    url: 'https://www.balajiofficial.com/',
    isInternal: false,
    tags: ['Inorganic Chemistry', 'Coordination', 'Bonding'],
    recommendedFor: 'Inorganic Drill'
  },

  // ── PYQ & Mock Tests ──
  {
    id: 17,
    title: 'AI-LearnPath 10-Year NEET PYQ Paper Archive & Solutions',
    category: 'PYQ & Mock Tests',
    type: 'practice',
    difficulty: 'intermediate',
    desc: 'Interactive past examination papers (2016-2025) with chapter tags, authentic answer keys, step-by-step explanations, and error analytics.',
    url: '/pyq-papers',
    isInternal: true,
    tags: ['PYQ', '2016-2025', 'In-App Suite', 'Authentic'],
    minutes: 200,
    recommendedFor: 'Official Trend Analysis'
  },
  {
    id: 18,
    title: 'NTA Official 10-Year NEET (UG) Solved Archive',
    category: 'PYQ & Mock Tests',
    type: 'documentation',
    difficulty: 'intermediate',
    desc: 'Official archived question papers and final verified answer keys released directly by the National Testing Agency (NTA).',
    url: 'https://exams.nta.ac.in/NEET/',
    isInternal: false,
    tags: ['NTA Archive', 'Verified Keys', 'Official'],
    recommendedFor: 'Standard Benchmark'
  },
  {
    id: 19,
    title: 'OMR Simulation Answer Sheet (PDF Printable)',
    category: 'PYQ & Mock Tests',
    type: 'practice',
    difficulty: 'beginner',
    desc: 'Official 200-question NTA format OMR bubbling sheet for practicing physical exam speed, bubbling accuracy, and bubble-filling discipline.',
    url: 'https://exams.nta.ac.in/NEET/',
    isInternal: false,
    tags: ['OMR', 'Bubble Practice', 'Exam Readiness'],
    recommendedFor: 'Exam Day Simulation'
  },

  // ── Revision & Formulas ──
  {
    id: 20,
    title: 'NEET Organic Named Reactions Master Handbook',
    category: 'Revision & Formulas',
    type: 'article',
    difficulty: 'intermediate',
    desc: 'Quick-reference guide to all 42 high-frequency named reactions (Aldol, Cannizzaro, Reimer-Tiemann, Gabriel Phthalimide, Hoffmann Bromamide) with reagents.',
    url: '/courses/formulas',
    isInternal: true,
    tags: ['Organic Reactions', 'Reagents', 'Summary'],
    recommendedFor: '48-Hour Exam Prep'
  },
  {
    id: 21,
    title: 'Rapid High-Yield Biology Diagrammatic Flashcards',
    category: 'Revision & Formulas',
    type: 'article',
    difficulty: 'beginner',
    desc: 'Visual memory triggers covering Nephron counter-current mechanism, Heart cardiac cycle, Secondary growth in dicot stems, and Calvin cycle.',
    url: '/courses',
    isInternal: true,
    tags: ['Biology', 'Flashcards', 'Quick Revision'],
    recommendedFor: 'Daily Morning Review'
  },
  {
    id: 22,
    title: 'AI-LearnPath 24/7 NEET AI NCERT Doubt Solver',
    category: 'Official NTA & NCERT',
    type: 'video',
    difficulty: 'intermediate',
    desc: 'Ask any NCERT line, derivation, reaction mechanism, or numerical problem to the RAG-grounded AI Tutor with authentic NCERT page citations.',
    url: '/courses/ai-tutor',
    isInternal: true,
    tags: ['AI Tutor', 'RAG Grounded', 'Doubt Resolution', 'In-App'],
    recommendedFor: 'Instant Conceptual Clarification'
  }
]

