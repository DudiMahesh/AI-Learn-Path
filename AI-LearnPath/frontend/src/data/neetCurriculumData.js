// NEET (UG) 2026 Complete Curriculum Metadata & Interactive Study Data
// Exact mapping with official NMC/NTA notified syllabi and the 3 study guides

export const SUBJECTS_CONFIG = {
  physics: {
    id: 'physics',
    title: 'NEET (UG) 2026 Physics: Expanded Study Guide',
    shortTitle: 'Physics',
    badge: 'Physics · 76 Pages',
    color: 'emerald',
    gradient: 'from-emerald-600 to-teal-700',
    accentText: 'text-emerald-500',
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-500/30',
    pdfUrl: '/materials/NEET_UG_2026_Physics_Expanded_Study_Guide.pdf',
    fileName: 'NEET_UG_2026_Physics_Expanded_Study_Guide.pdf',
    totalPages: 76,
    totalUnits: 20,
    estimatedHours: 45,
    tagline: 'Mechanics, Electrodynamics, Optics & Modern Physics with full worked derivations.',
    quickPrompts: [
      "Derive Bernoulli's Equation and state its applications",
      "Explain common NEET traps in Rotational Motion (MI, Torque, Rolling)",
      "Give me all essential formulas for Current Electricity & Kirchhoff's laws",
      "Explain Photoelectric effect equations and Einstein's work function",
      "What is the difference between Interference and Diffraction?"
    ],
    cheatSheet: [
      {
        title: "Kinematics & Motion in 1D/2D",
        formulas: [
          "v = u + at | s = ut + ½at² | v² = u² + 2as",
          "s_nth = u + a/2 (2n - 1)",
          "Range R = (u² sin 2θ) / g | H_max = (u² sin² θ) / (2g)",
          "Time of flight T = (2u sin θ) / g",
          "R_max = u² / g (at θ = 45°)"
        ]
      },
      {
        title: "Laws of Motion & Work-Power-Energy",
        formulas: [
          "F = dp/dt = ma | Impulse J = F Δt = Δp",
          "Friction f_s ≤ μ_s N | f_k = μ_k N",
          "Banked road without friction: v = √(R g tan θ)",
          "Work W = ∫ F·dr = ΔK (Work-Energy Theorem)",
          "Power P = dW/dt = F·v | Potential Energy U = - ∫ F·dr"
        ]
      },
      {
        title: "Electrostatics & Current Electricity",
        formulas: [
          "Coulomb's Law: F = (1 / 4πε₀) (q₁q₂ / r²)",
          "Electric Field of Dipole: E_axial = 2kp/r³ | E_equatorial = kp/r³",
          "Capacitance C = ε₀A / d | Energy U = ½CV² = Q² / (2C)",
          "Ohm's Law: V = IR | Resistance R = ρL/A",
          "Drift Velocity v_d = eEτ / m | Current I = n e A v_d"
        ]
      },
      {
        title: "Modern Physics & Optics",
        formulas: [
          "Mirror Formula: 1/f = 1/v + 1/u | Lens Formula: 1/f = 1/v - 1/u",
          "Lens Maker's: 1/f = (μ - 1)(1/R₁ - 1/R₂)",
          "Einstein Photoelectric: hν = Φ + K_max = hν₀ + eV₀",
          "de Broglie: λ = h / p = h / √(2mE) = 12.27 / √V Å (for electron)",
          "Bohr Orbit Radius r_n = 0.529 (n² / Z) Å | E_n = -13.6 (Z² / n²) eV"
        ]
      }
    ],
    sampleQuiz: [
      {
        question: "What is the dimensional formula of Universal Gravitational Constant (G)?",
        options: ["[M⁻¹ L³ T⁻²]", "[M¹ L² T⁻¹]", "[M⁰ L² T⁻²]", "[M⁻² L² T⁻¹]"],
        correct: 0,
        explanation: "F = G m₁m₂ / r² => G = F r² / m² = [M L T⁻²][L²] / [M²] = [M⁻¹ L³ T⁻²]."
      },
      {
        question: "A ball thrown at angle 45° reaches max range R. At what angle with same speed does it reach max height?",
        options: ["30°", "45°", "60°", "90°"],
        correct: 3,
        explanation: "H = u² sin²θ / 2g. Maximum height occurs when sin θ = 1, i.e., θ = 90° (vertical throw)."
      },
      {
        question: "For an isothermal expansion of an ideal gas, the change in internal energy (ΔU) is:",
        options: ["Positive", "Negative", "Zero", "Dependent on volume"],
        correct: 2,
        explanation: "Internal energy of an ideal gas depends solely on temperature. In an isothermal process, ΔT = 0, so ΔU = 0."
      },
      {
        question: "If the distance between two charges is halved and both charges are doubled, the electrostatic force becomes:",
        options: ["4 times", "8 times", "16 times", "Unchanged"],
        correct: 2,
        explanation: "F = k(q₁q₂)/r². New force F' = k(2q₁ * 2q₂) / (r/2)² = 4 / (1/4) * F = 16F."
      },
      {
        question: "The de Broglie wavelength of an electron accelerated through a potential difference of V volts is approximately:",
        options: ["12.27 / √V Å", "1.227 / √V nm", "12.27 / V nm", "Both A and B"],
        correct: 3,
        explanation: "λ = 12.27 / √V Å = 1.227 / √V nm. Both A and B express the exact same physical value."
      }
    ],
    units: [
      { id: 1,  number: 1,  title: "Physics and Measurement", page: 3,  topics: "SI units, Dimensional analysis, Errors in measurement" },
      { id: 2,  number: 2,  title: "Kinematics", page: 8,  topics: "1D/2D motion, Relative velocity, Projectile motion" },
      { id: 3,  number: 3,  title: "Laws of Motion", page: 14, topics: "Newton's laws, Momentum, Friction, Circular motion" },
      { id: 4,  number: 4,  title: "Work, Energy and Power", page: 18, topics: "Work-energy theorem, Collisions (elastic/inelastic), Power" },
      { id: 5,  number: 5,  title: "Rotational Motion", page: 21, topics: "Centre of mass, Torque, Moment of inertia, Rolling motion" },
      { id: 6,  number: 6,  title: "Gravitation", page: 25, topics: "Kepler's laws, Acceleration due to gravity, Escape velocity, Satellites" },
      { id: 7,  number: 7,  title: "Properties of Solids and Liquids", page: 28, topics: "Hooke's law, Moduli of elasticity, Pascal's law, Viscosity, Bernoulli" },
      { id: 8,  number: 8,  title: "Thermodynamics", page: 33, topics: "Thermal equilibrium, 1st & 2nd laws, Carnot engine, Refrigerators" },
      { id: 9,  number: 9,  title: "Kinetic Theory of Gases", page: 36, topics: "Pressure of ideal gas, RMS velocity, Degrees of freedom, Law of equipartition" },
      { id: 10, number: 10, title: "Oscillations and Waves", page: 39, topics: "SHM, Simple pendulum, Wave speed, Doppler effect, Beats" },
      { id: 11, number: 11, title: "Electrostatics", page: 42, topics: "Coulomb's law, Gauss's law, Potential, Capacitors in series/parallel" },
      { id: 12, number: 12, title: "Current Electricity", page: 46, topics: "Ohm's law, Kirchhoff's laws, Potentiometer, Wheatstone bridge" },
      { id: 13, number: 13, title: "Magnetic Effects of Current & Magnetism", page: 49, topics: "Biot-Savart law, Ampere's law, Cyclotron, Bar magnet, Diamagnetism" },
      { id: 14, number: 14, title: "Electromagnetic Induction & AC", page: 52, topics: "Faraday's law, Lenz's law, LCR circuit, Resonance, Transformers" },
      { id: 15, number: 15, title: "Electromagnetic Waves", page: 55, topics: "Displacement current, EM spectrum wavelengths and uses" },
      { id: 16, number: 16, title: "Optics", page: 57, topics: "Refraction, Total internal reflection, Lens maker formula, Wave optics, Young's double slit" },
      { id: 17, number: 17, title: "Dual Nature of Matter & Radiation", page: 62, topics: "Photoelectric effect, de Broglie relation, Davisson-Germer experiment" },
      { id: 18, number: 18, title: "Atoms and Nuclei", page: 65, topics: "Rutherford & Bohr model, Hydrogen spectrum, Nuclear binding energy, Radioactivity" },
      { id: 19, number: 19, title: "Electronic Devices", page: 69, topics: "p-n junction diodes, Rectifiers, Zener diode, Logic gates" },
      { id: 20, number: 20, title: "Experimental Skills", page: 72, topics: "Vernier callipers, Screw gauge, Metre bridge, Prism, Focal length measurements" }
    ]
  },

  chemistry: {
    id: 'chemistry',
    title: 'NEET (UG) 2026 Chemistry: Expanded Study Guide',
    shortTitle: 'Chemistry',
    badge: 'Chemistry · 111 Pages',
    color: 'teal',
    gradient: 'from-teal-600 to-cyan-700',
    accentText: 'text-teal-400',
    accentBg: 'bg-teal-500/10',
    accentBorder: 'border-teal-500/30',
    pdfUrl: '/materials/NEET_UG_2026_Chemistry_Expanded_Study_Guide.pdf',
    fileName: 'NEET_UG_2026_Chemistry_Expanded_Study_Guide.pdf',
    totalPages: 111,
    totalUnits: 20,
    estimatedHours: 60,
    tagline: 'Physical, Inorganic, and Organic Chemistry with NCERT reaction maps & mechanisms.',
    quickPrompts: [
      "Explain the key differences between SN1 and SN2 reaction mechanisms",
      "Give me the electronic configuration and anomalies of d- and f-Block elements",
      "Summary of all formulas in Chemical Thermodynamics (ΔH, ΔS, ΔG)",
      "How does Nernst equation calculate cell potential under non-standard conditions?",
      "List named reactions in Organic Chemistry: Aldol, Cannizzaro, Sandmeyer"
    ],
    cheatSheet: [
      {
        title: "Physical Chemistry Key Formulas",
        formulas: [
          "Molarity M = moles/V(L) | Molality m = moles/kg(solvent)",
          "Bohr Radius: r_n = 0.529 (n²/Z) Å | Energy E_n = -13.6 (Z²/n²) eV",
          "de Broglie: λ = h / mv | Heisenberg: Δx · Δp ≥ h / (4π)",
          "First Law: ΔU = q + w | Work w = -P_ext ΔV",
          "Gibbs Energy: ΔG = ΔH - TΔS | ΔG° = -RT ln K = -nFE°_cell",
          "Nernst: E_cell = E°_cell - (0.0591 / n) log Q (at 298 K)"
        ]
      },
      {
        title: "Inorganic Trends & Principles",
        formulas: [
          "Ionisation Enthalpy: increases across period, decreases down group",
          "Electron Gain Enthalpy: Cl > F (due to small size & interelectronic repulsion in F)",
          "Electronegativity: F > O > N > Cl > Br > I > S > C > H",
          "Lanthanoid Contraction: poor shielding of 4f electrons causes Zr ≈ Hf, Nb ≈ Ta",
          "Crystal Field Splitting: Δ_octahedral > Δ_tetrahedral (Δ_t = 4/9 Δ_o)"
        ]
      },
      {
        title: "Organic Reactions & Mechanisms",
        formulas: [
          "Markovnikov Rule: H goes to carbon with more hydrogens, halogen to more substituted",
          "Anti-Markovnikov (Peroxide Effect): HBr only (via free radical intermediate)",
          "SN1: 2-step via planar carbocation (racemisation; rate ∝ [substrate]; 3° > 2° > 1°)",
          "SN2: 1-step concerted via transition state (Walden inversion; 1° > 2° > 3°)",
          "Aldol Condensation: α-hydrogen required (dil. NaOH) => β-hydroxy aldehyde => α,β-unsaturated"
        ]
      }
    ],
    sampleQuiz: [
      {
        question: "What is the hybridisation of xenon in XeF₄ and its molecular geometry?",
        options: ["sp³d, T-shaped", "sp³d², Square Planar", "sp³d², Octahedral", "sp³, Tetrahedral"],
        correct: 1,
        explanation: "Xe has 8 valence electrons. With 4 bond pairs and 2 lone pairs, total steric number = 6 (sp³d² hybridisation). The geometry is octahedral, but molecular shape is Square Planar."
      },
      {
        question: "Which of the following elements has the most negative electron gain enthalpy?",
        options: ["Fluorine (F)", "Chlorine (Cl)", "Bromine (Br)", "Oxygen (O)"],
        correct: 1,
        explanation: "Chlorine has the highest negative electron gain enthalpy (-349 kJ/mol). Fluorine has higher electron-electron repulsion in its compact 2p subshell."
      },
      {
        question: "In an SN1 substitution reaction of optically active alkyl halides, the stereochemical outcome is:",
        options: ["Complete Retention", "Complete Inversion", "Racemisation (with partial inversion)", "No reaction"],
        correct: 2,
        explanation: "SN1 proceeds via a planar carbocation intermediate. Nucleophilic attack can occur equally from both faces, resulting in racemisation."
      },
      {
        question: "What is the oxidation state of Chromium in Potassium Dichromate (K₂Cr₂O₇)?",
        options: ["+3", "+4", "+6", "+7"],
        correct: 2,
        explanation: "2(+1) + 2(Cr) + 7(-2) = 0 => 2 + 2(Cr) - 14 = 0 => 2(Cr) = +12 => Cr = +6."
      },
      {
        question: "Cannizzaro reaction is not shown by which of the following aldehydes?",
        options: ["Formaldehyde (HCHO)", "Benzaldehyde (C₆H₅CHO)", "Acetaldehyde (CH₃CHO)", "Trimethylacetaldehyde ((CH₃)₃CCHO)"],
        correct: 2,
        explanation: "Cannizzaro reaction is shown only by aldehydes lacking an α-hydrogen. Acetaldehyde contains 3 α-hydrogens and instead undergoes Aldol condensation."
      }
    ],
    units: [
      { id: 1,  number: 1,  title: "Some Basic Concepts in Chemistry", page: 4,  topics: "Mole concept, Stoichiometry, Empirical formulas, Concentration units" },
      { id: 2,  number: 2,  title: "Atomic Structure", page: 10, topics: "Bohr's model, Quantum numbers, Pauli & Hund rules, Electronic configs" },
      { id: 3,  number: 3,  title: "Chemical Bonding & Molecular Structure", page: 16, topics: "Ionic/covalent bonds, VSEPR theory, Hybridisation, MO theory" },
      { id: 4,  number: 4,  title: "Chemical Thermodynamics", page: 22, topics: "Internal energy, Enthalpy (ΔH), Hess's law, Entropy (ΔS), Gibbs free energy" },
      { id: 5,  number: 5,  title: "Solutions", page: 26, topics: "Raoult's law, Colligative properties (ΔTb, ΔTf, π), van't Hoff factor (i)" },
      { id: 6,  number: 6,  title: "Equilibrium", page: 31, topics: "Chemical equilibrium (Kc, Kp), Le Chatelier, pH, Buffer solutions, Solubility product" },
      { id: 7,  number: 7,  title: "Redox Reactions & Electrochemistry", page: 36, topics: "Oxidation numbers, Galvanic cells, Nernst equation, Kohlrausch law" },
      { id: 8,  number: 8,  title: "Chemical Kinetics", page: 42, topics: "Rate laws, Order & molecularity, Integrated rate equations, Arrhenius equation" },
      { id: 9,  number: 9,  title: "Classification of Elements & Periodicity", page: 46, topics: "Periodic trends in atomic radius, IE, electron gain enthalpy, electronegativity" },
      { id: 10, number: 10, title: "p-Block Elements (Groups 13-18)", page: 50, topics: "Inert pair effect, Boron & Carbon families, Nitrogen, Oxygen & Halogens" },
      { id: 11, number: 11, title: "d- and f-Block Elements", page: 56, topics: "Transition metals, Oxidation states, Lanthanoid & Actinoid contraction" },
      { id: 12, number: 12, title: "Coordination Compounds", page: 61, topics: "Werner theory, IUPAC naming, Isomerism, Valence Bond & Crystal Field theory" },
      { id: 13, number: 13, title: "Purification & Characterisation", page: 67, topics: "Crystallisation, Distillation, Chromatography, Quantitative organic analysis" },
      { id: 14, number: 14, title: "Basic Principles of Organic Chemistry", page: 71, topics: "IUPAC nomenclature, Electronic displacements (inductive, mesomeric), Intermediates" },
      { id: 15, number: 15, title: "Hydrocarbons", page: 77, topics: "Alkanes (free radical), Alkenes (electrophilic addition), Alkynes, Benzene aromaticity" },
      { id: 16, number: 16, title: "Organic Compounds with Halogens", page: 83, topics: "Haloalkanes, SN1 and SN2 mechanisms, Haloarenes nucleophilic substitution" },
      { id: 17, number: 17, title: "Organic Compounds with Oxygen", page: 88, topics: "Alcohols, Phenols, Ethers, Aldehydes, Ketones, Carboxylic acids (Reactions & Tests)" },
      { id: 18, number: 18, title: "Organic Compounds with Nitrogen", page: 98, topics: "Amines basicity, Diazonium salts, Carbylamine test, Hinsberg test" },
      { id: 19, number: 19, title: "Biomolecules", page: 102, topics: "Carbohydrates (glucose/fructose), Amino acids, Proteins (structure), Nucleic acids" },
      { id: 20, number: 20, title: "Principles of Practical Chemistry", page: 107, topics: "Qualitative salt analysis (cations/anions), Titrations, Functional group identification" }
    ]
  },

  biology: {
    id: 'biology',
    title: 'NEET (UG) 2026 Biology: Complete Study Guide',
    shortTitle: 'Biology',
    badge: 'Biology · 84 Pages',
    color: 'emerald',
    gradient: 'from-green-600 to-emerald-800',
    accentText: 'text-green-400',
    accentBg: 'bg-green-500/10',
    accentBorder: 'border-green-500/30',
    pdfUrl: '/materials/NEET_UG_2026_Biology_Complete_Study_Guide.pdf',
    fileName: 'NEET_UG_2026_Biology_Complete_Study_Guide.pdf',
    totalPages: 84,
    totalUnits: 10,
    estimatedHours: 50,
    tagline: 'Botany and Zoology from Basics to Depth with comparison tables, diagrams, and NCERT line traps.',
    quickPrompts: [
      "Compare C3 and C4 Photosynthetic pathways and explain Kranz anatomy",
      "Explain the phases of the human menstrual cycle and their hormonal surges",
      "Summary of non-chordate phyla (Porifera to Hemichordata) with key examples",
      "Explain Lac Operon regulation: role of allolactose and repressor",
      "List the Evil Quartet causes of biodiversity loss and examples"
    ],
    cheatSheet: [
      {
        title: "Cell Biology & Biomolecules",
        formulas: [
          "Cell Theory: Schleiden (1838) + Schwann (1839) + Virchow (1855, Omnis cellula-e cellula)",
          "Fluid Mosaic Model: Singer & Nicolson (1972) - 52% protein, 40% lipid in human RBC",
          "Prokaryote Ribosome: 70S (50S + 30S) | Eukaryote: 80S (60S + 40S)",
          "Most abundant protein: RuBisCO (whole biosphere), Collagen (animal kingdom)",
          "Cell Cycle: G1 -> S (DNA 2C -> 4C) -> G2 -> M phase (Karyokinesis + Cytokinesis)"
        ]
      },
      {
        title: "Genetics & Molecular Biology",
        formulas: [
          "Mendelian Ratios: Monohybrid F2 = 3:1 (phenotypic), 1:2:1 (genotypic)",
          "Dihybrid Cross F2: 9:3:3:1 (phenotypic ratio)",
          "Chargaff Rule: A = T (2 H-bonds) and G ≡ C (3 H-bonds) => Purines = Pyrimidines",
          "DNA pitch: 3.4 nm per turn (10 bp/turn), 0.34 nm between base pairs",
          "Sickle Cell Anemia: Point mutation GAG -> GUG (glutamic acid -> valine at position 6 of β-chain)"
        ]
      },
      {
        title: "Ecology & Human Physiology",
        formulas: [
          "Tidal Volume (TV) = 500 mL | Vital Capacity (VC) = ERV + TV + IRV (3500-4500 mL)",
          "Cardiac Cycle: 0.8 s | Stroke Volume = 70 mL | Cardiac Output = ~5 L/min",
          "GFR = 125 mL/min (180 L/day) | Daily urine volume = ~1.5 L/day",
          "Lindeman's 10% Law: Only 10% of energy transferred to next trophic level",
          "Species-Area Relationship: log S = log C + Z log A (Z = 0.1-0.2 for small, 0.6-1.2 for continents)"
        ]
      }
    ],
    sampleQuiz: [
      {
        question: "Which of the following is considered the defining property of all living organisms without exception in NCERT?",
        options: ["Growth", "Reproduction", "Metabolism", "Locomotion"],
        correct: 2,
        explanation: "Metabolism is shown by every living organism without exception. Growth and reproduction have exceptions (mules, sterile worker bees, extrinsic mountain growth)."
      },
      {
        question: "Kranz anatomy with large bundle sheath cells containing chloroplasts is characteristic of:",
        options: ["C3 plants (Wheat, Rice)", "C4 plants (Maize, Sugarcane)", "CAM plants", "Bryophytes"],
        correct: 1,
        explanation: "Kranz anatomy is found in C4 plants (maize, sugarcane) where PEP carboxylase initially fixes CO2 in mesophyll and releases it into bundle-sheath cells for Calvin cycle."
      },
      {
        question: "The primary pacemaker of the human heart is the:",
        options: ["AV node", "SA node", "Bundle of His", "Purkinje fibres"],
        correct: 1,
        explanation: "The Sino-Atrial (SA) node located in the right upper corner of the right atrium generates rhythm impulses (~70-75/min) and functions as the natural pacemaker."
      },
      {
        question: "During which phase of the menstrual cycle does the LH surge occur?",
        options: ["Menstrual phase (day 1-5)", "Follicular phase (day 6-13)", "Ovulatory phase (around day 14)", "Luteal phase (day 15-28)"],
        correct: 2,
        explanation: "A rapid secretion of LH leading to its maximum level (LH surge) induces rupturing of Graafian follicle and release of an ovum (ovulation) around the 14th day."
      },
      {
        question: "Which of the following ecological pyramids is always upright and can never be inverted?",
        options: ["Pyramid of Number", "Pyramid of Biomass", "Pyramid of Energy", "All of the above"],
        correct: 2,
        explanation: "The pyramid of energy is always upright, because when energy flows from a particular trophic level to the next level, some energy is always lost as heat at each step (Lindeman 10% law)."
      }
    ],
    units: [
      { id: 1,  number: 1,  title: "Diversity in the Living World", page: 4,  topics: "What is living?, Taxonomy, 5-Kingdom system, Plant & Animal kingdom" },
      { id: 2,  number: 2,  title: "Structural Organisation in Animals & Plants", page: 16, topics: "Morphology, Anatomy of dicot/monocot, Animal tissues, Cockroach, Frog" },
      { id: 3,  number: 3,  title: "Cell Structure and Function", page: 25, topics: "Cell theory, Organelles, Fluid mosaic model, Biomolecules, Mitosis & Meiosis" },
      { id: 4,  number: 4,  title: "Plant Physiology", page: 33, topics: "Photosynthesis (Light/Dark, C3/C4), Cellular respiration, Growth regulators (PGRs)" },
      { id: 5,  number: 5,  title: "Human Physiology", page: 42, topics: "Breathing, Circulation, Excretion, Locomotion, Nervous system, Endocrine hormones" },
      { id: 6,  number: 6,  title: "Reproduction", page: 52, topics: "Flower reproduction, Double fertilisation, Male/Female human systems, Menstrual cycle, ART" },
      { id: 7,  number: 7,  title: "Genetics and Evolution", page: 60, topics: "Mendelian inheritance, DNA replication/transcription/translation, Lac operon, Evolution" },
      { id: 8,  number: 8,  title: "Biology and Human Welfare", page: 70, topics: "Health & diseases, Immunology, AIDS & Cancer, Microbes in welfare & sewage" },
      { id: 9,  number: 9,  title: "Biotechnology and Its Applications", page: 75, topics: "rDNA technology, Restriction enzymes, PCR, Bt cotton, Gene therapy, Transgenic animals" },
      { id: 10, number: 10, title: "Ecology and Environment", page: 79, topics: "Population ecology, Ecosystem productivity, Food chains, Biodiversity conservation" }
    ]
  }
};

