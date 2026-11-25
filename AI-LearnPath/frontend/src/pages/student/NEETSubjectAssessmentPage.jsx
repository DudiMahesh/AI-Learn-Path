import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Clock, ChevronLeft, ChevronRight, CheckCircle, XCircle,
  ArrowLeft, Atom, FlaskConical, Dna, Award, AlertCircle, BookOpen
} from 'lucide-react';
import {
  PHYSICS_50_QUESTIONS,
  CHEMISTRY_50_QUESTIONS,
  BIOLOGY_50_QUESTIONS
} from '../../data/neet50QuestionBanks';
import { shuffleArray } from '../../utils/quizRandomizer';
import { getQuestionExplanation } from '../../utils/assessmentExplanationEngine';

// ─── NEET Subject Question Bank ───────────────────────────────────────────────

const NEET_QUESTIONS = {
  // ── PHYSICS (id: 1 & 2) ──────────────────────────────────────────────────
  1: [ // Mechanics & Electrodynamics
    { id: 'p1_1', text: 'A body is thrown vertically upward with velocity u. The time for which it remains in the air is:', options: { A: 'u/g', B: '2u/g', C: 'u/2g', D: 'u²/g' }, correct: 'B', subject: 'Physics', explanation: 'Time up = u/g. Total time = 2u/g (by symmetry of projectile motion).' },
    { id: 'p1_2', text: 'According to Newton\'s Third Law, action and reaction forces:', options: { A: 'Act on the same body', B: 'Act on different bodies', C: 'Are in the same direction', D: 'Have different magnitudes' }, correct: 'B', subject: 'Physics', explanation: 'Action and reaction always act on different bodies and are equal in magnitude, opposite in direction.' },
    { id: 'p1_3', text: 'Work done by a force is zero when the angle between force and displacement is:', options: { A: '0°', B: '45°', C: '90°', D: '180°' }, correct: 'C', subject: 'Physics', explanation: 'W = Fs cosθ. When θ = 90°, cos90° = 0, so W = 0.' },
    { id: 'p1_4', text: 'A particle moving in a circle of radius r with uniform speed v has centripetal acceleration:', options: { A: 'v/r', B: 'v²/r', C: 'vr', D: 'v²r' }, correct: 'B', subject: 'Physics', explanation: 'Centripetal acceleration a = v²/r directed towards the centre.' },
    { id: 'p1_5', text: 'The dimensional formula of electric field intensity is:', options: { A: '[MLT⁻³A⁻¹]', B: '[ML²T⁻³A⁻¹]', C: '[MLT⁻²A⁻¹]', D: '[ML²T⁻²A⁻¹]' }, correct: 'A', subject: 'Physics', explanation: 'E = F/q = [MLT⁻²]/[AT] = [MLT⁻³A⁻¹].' },
    { id: 'p1_6', text: 'The moment of inertia of a solid sphere of mass M and radius R about its diameter is:', options: { A: '(2/5)MR²', B: '(2/3)MR²', C: '(1/2)MR²', D: 'MR²' }, correct: 'A', subject: 'Physics', explanation: 'For a solid sphere I = (2/5)MR² about any diameter.' },
    { id: 'p1_7', text: 'Two charges +q and -q are placed at distance d. The electric potential at the midpoint between them is:', options: { A: 'kq/d', B: 'Zero', C: '2kq/d', D: '4kq/d' }, correct: 'B', subject: 'Physics', explanation: 'V = kq/(d/2) + k(-q)/(d/2) = 0. Potential is a scalar and they cancel.' },
    { id: 'p1_8', text: 'In a series LCR circuit at resonance:', options: { A: 'Impedance is maximum', B: 'Current is minimum', C: 'Impedance equals resistance', D: 'XL > XC' }, correct: 'C', subject: 'Physics', explanation: 'At resonance XL = XC, so Z = √(R² + (XL-XC)²) = R. Current is maximum.' },
    { id: 'p1_9', text: 'Which law states that the induced EMF opposes the change in magnetic flux?', options: { A: 'Ampere\'s Law', B: 'Lenz\'s Law', C: 'Gauss\'s Law', D: 'Faraday\'s First Law' }, correct: 'B', subject: 'Physics', explanation: 'Lenz\'s Law states that induced current always opposes the cause producing it (change in flux).' },
    { id: 'p1_10', text: 'The SI unit of magnetic flux density (B) is:', options: { A: 'Weber', B: 'Tesla', C: 'Henry', D: 'Ampere/meter' }, correct: 'B', subject: 'Physics', explanation: 'Tesla (T) = Wb/m² is the SI unit of magnetic flux density B.' },
    { id: 'p1_11', text: 'A wire carrying current I is placed in a magnetic field B. Force per unit length on the wire is:', options: { A: 'BIL', B: 'BI', C: 'B/I', D: 'I/B' }, correct: 'B', subject: 'Physics', explanation: 'F = BIL sinθ, so F/L = BI when θ=90°.' },
    { id: 'p1_12', text: 'What is the escape velocity from Earth\'s surface if g = 9.8 m/s² and R = 6400 km?', options: { A: '7.9 km/s', B: '11.2 km/s', C: '15.3 km/s', D: '8.5 km/s' }, correct: 'B', subject: 'Physics', explanation: 'v_e = √(2gR) = √(2×9.8×6.4×10⁶) ≈ 11.2 km/s.' },
    { id: 'p1_13', text: 'Ohm\'s law is applicable to:', options: { A: 'Semiconductors', B: 'Metallic conductors at constant temperature', C: 'Electrolytes', D: 'Vacuum diodes' }, correct: 'B', subject: 'Physics', explanation: 'Ohm\'s law V = IR strictly holds for metallic conductors at constant temperature (ohmic conductors).' },
    { id: 'p1_14', text: 'Power dissipated in a resistance R carrying current I is:', options: { A: 'I²/R', B: 'IR', C: 'I²R', D: 'I/R²' }, correct: 'C', subject: 'Physics', explanation: 'P = I²R (Joule\'s law of heating).' },
    { id: 'p1_15', text: 'The angle of minimum deviation for a prism equals the prism angle when:', options: { A: 'The ray passes symmetrically', B: 'Angle of incidence is 0°', C: 'The prism is a right angle prism', D: 'Total internal reflection occurs' }, correct: 'A', subject: 'Physics', explanation: 'At minimum deviation, the ray passes symmetrically through the prism (angle of incidence = angle of emergence).' },
  ],

  2: [ // Thermodynamics, Waves & Modern Physics
    { id: 'p2_1', text: 'The photoelectric effect can be explained by:', options: { A: 'Wave nature of light', B: 'Particle (quantum) nature of light', C: 'Interference of light', D: 'Diffraction of light' }, correct: 'B', subject: 'Physics', explanation: 'The photoelectric effect demonstrates that light behaves as photons (quanta), confirming the particle nature of light (Einstein, 1905).' },
    { id: 'p2_2', text: 'According to Bohr\'s model, the energy of electron in nth orbit is proportional to:', options: { A: 'n', B: '1/n', C: '1/n²', D: 'n²' }, correct: 'C', subject: 'Physics', explanation: 'En = -13.6/n² eV. Energy is proportional to 1/n².' },
    { id: 'p2_3', text: 'In nuclear fission, the Q-value is positive because:', options: { A: 'Products are lighter', B: 'Products have more binding energy per nucleon', C: 'More neutrons are produced', D: 'Reactants have smaller mass number' }, correct: 'B', subject: 'Physics', explanation: 'Energy is released because heavy nuclei have less binding energy per nucleon than the lighter fission products.' },
    { id: 'p2_4', text: 'Which thermodynamic process occurs at constant temperature?', options: { A: 'Adiabatic', B: 'Isobaric', C: 'Isochoric', D: 'Isothermal' }, correct: 'D', subject: 'Physics', explanation: 'Isothermal means constant temperature (iso=equal, thermal=temperature).' },
    { id: 'p2_5', text: 'The de Broglie wavelength of a particle is inversely proportional to its:', options: { A: 'Energy', B: 'Momentum', C: 'Velocity', D: 'Mass' }, correct: 'B', subject: 'Physics', explanation: 'λ = h/p. Wavelength is inversely proportional to momentum p.' },
    { id: 'p2_6', text: 'Ultrasonic waves have frequency:', options: { A: 'Below 20 Hz', B: 'Between 20 Hz – 20,000 Hz', C: 'Above 20,000 Hz', D: 'Equal to 20 Hz' }, correct: 'C', subject: 'Physics', explanation: 'Ultrasonic waves have frequencies above 20 kHz (above human hearing range).' },
    { id: 'p2_7', text: 'The critical angle for total internal reflection is θc. The refractive index of the medium is:', options: { A: 'sin θc', B: 'cos θc', C: '1/sin θc', D: 'tan θc' }, correct: 'C', subject: 'Physics', explanation: 'At critical angle: n sin θc = 1 × sin 90° ⇒ n = 1/sin θc.' },
    { id: 'p2_8', text: 'In Young\'s double slit experiment, fringe width β is:', options: { A: 'Dλ/d', B: 'dλ/D', C: 'λD/d', D: 'd/Dλ' }, correct: 'C', subject: 'Physics', explanation: 'Fringe width β = λD/d, where λ is wavelength, D is screen distance, d is slit separation.' },
    { id: 'p2_9', text: 'Which decay emits a helium-4 nucleus (²⁴He)?', options: { A: 'Alpha decay', B: 'Beta decay', C: 'Gamma decay', D: 'Positron emission' }, correct: 'A', subject: 'Physics', explanation: 'Alpha decay emits an alpha particle (²₄He nucleus) from the parent nucleus.' },
    { id: 'p2_10', text: 'The efficiency of a Carnot engine operating between temperatures T1 and T2 (T1 > T2) is:', options: { A: '1 - T1/T2', B: 'T2/T1', C: '1 - T2/T1', D: 'T1/T2' }, correct: 'C', subject: 'Physics', explanation: 'Carnot efficiency η = 1 - (T2/T1) = (T1-T2)/T1.' },
    { id: 'p2_11', text: 'The rms speed of gas molecules is proportional to:', options: { A: '√T', B: 'T', C: 'T²', D: '1/√T' }, correct: 'A', subject: 'Physics', explanation: 'vrms = √(3RT/M). It is proportional to √T.' },
    { id: 'p2_12', text: 'Standing waves are produced by:', options: { A: 'Two waves of different frequencies', B: 'Superposition of two identical waves travelling in opposite directions', C: 'A single wave reflecting off a soft boundary', D: 'Two incoherent waves' }, correct: 'B', subject: 'Physics', explanation: 'Standing waves form by superposition of two waves of same amplitude, frequency, and speed travelling in opposite directions.' },
    { id: 'p2_13', text: 'Doppler effect in sound: when the source approaches the observer, the observed frequency is:', options: { A: 'Lower than source frequency', B: 'Equal to source frequency', C: 'Higher than source frequency', D: 'Zero' }, correct: 'C', subject: 'Physics', explanation: 'When source approaches observer, more compressions reach the observer per second → higher apparent frequency.' },
    { id: 'p2_14', text: 'What is the half-life of a radioactive substance if its decay constant λ = 0.693 s⁻¹?', options: { A: '0.693 s', B: '1 s', C: '2 s', D: '0.5 s' }, correct: 'B', subject: 'Physics', explanation: 'T½ = 0.693/λ = 0.693/0.693 = 1 s.' },
    { id: 'p2_15', text: 'Which of the following has highest penetrating power?', options: { A: 'Alpha rays', B: 'Beta rays', C: 'Gamma rays', D: 'X-rays' }, correct: 'C', subject: 'Physics', explanation: 'Gamma rays (electromagnetic radiation, no charge, no mass) have the highest penetrating power.' },
  ],

  // ── CHEMISTRY (id: 3 & 4) ────────────────────────────────────────────────
  3: [ // Physical & Inorganic Chemistry
    { id: 'c1_1', text: 'The quantum number that describes the shape of an orbital is:', options: { A: 'Principal quantum number (n)', B: 'Azimuthal quantum number (l)', C: 'Magnetic quantum number (ml)', D: 'Spin quantum number (ms)' }, correct: 'B', subject: 'Chemistry', explanation: 'The azimuthal (angular momentum) quantum number l determines the shape: 0=s, 1=p, 2=d, 3=f.' },
    { id: 'c1_2', text: 'According to VSEPR theory, the shape of water (H₂O) molecule is:', options: { A: 'Linear', B: 'Tetrahedral', C: 'V-shaped (bent)', D: 'Trigonal planar' }, correct: 'C', subject: 'Chemistry', explanation: 'H₂O has 2 bond pairs and 2 lone pairs; VSEPR predicts V-shaped (bent) geometry with bond angle ~104.5°.' },
    { id: 'c1_3', text: 'Which of the following has the highest electronegativity?', options: { A: 'Oxygen', B: 'Nitrogen', C: 'Fluorine', D: 'Chlorine' }, correct: 'C', subject: 'Chemistry', explanation: 'Fluorine has the highest electronegativity (3.98 on Pauling scale) of all elements.' },
    { id: 'c1_4', text: 'The equilibrium constant K for a reaction is 1×10⁻⁵. This indicates:', options: { A: 'Reaction strongly favours products', B: 'Reaction strongly favours reactants', C: 'Equilibrium mixture has equal amounts', D: 'Reaction is very fast' }, correct: 'B', subject: 'Chemistry', explanation: 'K << 1 means the equilibrium position lies far to the left (reactant-favoured).' },
    { id: 'c1_5', text: 'Which process increases the entropy of a system?', options: { A: 'Freezing of water', B: 'Sublimation of dry ice', C: 'Condensation of steam', D: 'Dissolution of NaCl in water at 0°C' }, correct: 'B', subject: 'Chemistry', explanation: 'Sublimation (solid→gas) increases disorder/entropy significantly (ΔS > 0).' },
    { id: 'c1_6', text: 'The oxidation state of Mn in KMnO₄ is:', options: { A: '+4', B: '+5', C: '+6', D: '+7' }, correct: 'D', subject: 'Chemistry', explanation: 'K is +1, O is -2. +1 + Mn + 4(-2) = 0 ⇒ Mn = +7.' },
    { id: 'c1_7', text: 'Which halogen has the lowest bond dissociation enthalpy?', options: { A: 'F₂', B: 'Cl₂', C: 'Br₂', D: 'I₂' }, correct: 'A', subject: 'Chemistry', explanation: 'F₂ has the lowest bond enthalpy due to lone pair repulsion in the small F atom. F-F BDE ≈ 159 kJ/mol.' },
    { id: 'c1_8', text: 'According to Nernst equation, EMF of a cell depends on:', options: { A: 'Temperature only', B: 'Concentration of ions only', C: 'Both temperature and concentration', D: 'Pressure only' }, correct: 'C', subject: 'Chemistry', explanation: 'Nernst equation: E = E° - (RT/nF)lnQ. EMF depends on both temperature T and reaction quotient Q (concentrations).' },
    { id: 'c1_9', text: 'Which period 3 element has the highest ionisation energy?', options: { A: 'Na', B: 'Al', C: 'Cl', D: 'Ar' }, correct: 'D', subject: 'Chemistry', explanation: 'Noble gases have fully filled electronic configurations. Ar has the highest IE in period 3.' },
    { id: 'c1_10', text: 'The coordination number of Na⁺ in NaCl crystal structure is:', options: { A: '4', B: '6', C: '8', D: '12' }, correct: 'B', subject: 'Chemistry', explanation: 'In NaCl (rock salt) structure, each Na⁺ is surrounded by 6 Cl⁻ ions (octahedral arrangement), coordination number = 6.' },
    { id: 'c1_11', text: 'Which of the following gases shows positive deviation from ideal behaviour at high pressure?', options: { A: 'H₂ only', B: 'All real gases', C: 'Only CO₂', D: 'Only NH₃' }, correct: 'B', subject: 'Chemistry', explanation: 'At very high pressures, the repulsive forces dominate and all real gases show positive deviation (Z > 1).' },
    { id: 'c1_12', text: 'Buffer solution resists change in:', options: { A: 'Temperature', B: 'Pressure', C: 'pH', D: 'Volume' }, correct: 'C', subject: 'Chemistry', explanation: 'A buffer solution resists changes in pH upon addition of small amounts of acid or base.' },
    { id: 'c1_13', text: 'The process of converting ore to its oxide is called:', options: { A: 'Smelting', B: 'Roasting', C: 'Calcination', D: 'Leaching' }, correct: 'B', subject: 'Chemistry', explanation: 'Roasting: heating sulphide/carbonate ores in excess air to convert them to metal oxides. Calcination is for carbonates in absence of air.' },
    { id: 'c1_14', text: 'The magnetic moment of Cr³⁺ (Z=24) is approximately:', options: { A: '√8 BM', B: '√15 BM', C: '√3 BM', D: '√24 BM' }, correct: 'B', subject: 'Chemistry', explanation: 'Cr³⁺ has [Ar] 3d³, with 3 unpaired electrons. μ = √(n(n+2)) = √(3×5) = √15 ≈ 3.87 BM.' },
    { id: 'c1_15', text: 'Which of the following is an amphoteric oxide?', options: { A: 'CaO', B: 'Al₂O₃', C: 'Na₂O', D: 'SO₂' }, correct: 'B', subject: 'Chemistry', explanation: 'Al₂O₃ reacts with both acids (Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O) and bases (Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O) — amphoteric.' },
  ],

  4: [ // Organic Chemistry & Reaction Mechanisms
    { id: 'c2_1', text: 'In an SN2 reaction, the nucleophile attacks:', options: { A: 'From the same side as the leaving group', B: 'From the opposite side of the leaving group', C: 'At the adjacent carbon', D: 'At random position' }, correct: 'B', subject: 'Chemistry', explanation: 'SN2 involves backside attack by nucleophile opposite to leaving group, causing inversion of configuration (Walden inversion).' },
    { id: 'c2_2', text: 'Which of the following is an electrophile?', options: { A: 'NH₃', B: 'OH⁻', C: 'BF₃', D: 'CH₃⁻' }, correct: 'C', subject: 'Chemistry', explanation: 'BF₃ has an empty p-orbital and is a Lewis acid (electron-pair acceptor) = electrophile.' },
    { id: 'c2_3', text: 'Markovnikov\'s rule states that in addition to alkenes, the negative part of the addendum goes to the carbon with:', options: { A: 'More hydrogen atoms', B: 'Fewer hydrogen atoms', C: 'Double bond carbon', D: 'No specific preference' }, correct: 'B', subject: 'Chemistry', explanation: 'Markovnikov\'s rule: H adds to the C with more H (less substituted), and X⁻ adds to the C with fewer H (more substituted).' },
    { id: 'c2_4', text: 'The IUPAC name of CH₃-CH(OH)-COOH is:', options: { A: '2-hydroxyethanoic acid', B: '2-hydroxypropanoic acid', C: '3-hydroxypropanoic acid', D: 'Propan-2-ol-1-oic acid' }, correct: 'B', subject: 'Chemistry', explanation: 'Three carbons (propanoic acid), OH at C-2 ⇒ 2-hydroxypropanoic acid (lactic acid).' },
    { id: 'c2_5', text: 'Benzene undergoes preferentially:', options: { A: 'Nucleophilic addition', B: 'Electrophilic substitution', C: 'Free radical addition', D: 'Electrophilic addition' }, correct: 'B', subject: 'Chemistry', explanation: 'Benzene is π-electron rich and preferentially undergoes electrophilic aromatic substitution (EAS) to maintain aromaticity.' },
    { id: 'c2_6', text: 'Which test distinguishes aldehydes from ketones?', options: { A: 'Lucas test', B: 'Fehling\'s test', C: 'Tollens test only', D: 'Both Fehling\'s and Tollens\' tests' }, correct: 'D', subject: 'Chemistry', explanation: 'Both Fehling\'s test (brick-red precipitate) and Tollens\' test (silver mirror) are positive for aldehydes but NOT ketones.' },
    { id: 'c2_7', text: 'The number of sigma (σ) and pi (π) bonds in ethyne (CH≡CH) respectively are:', options: { A: '3σ, 2π', B: '2σ, 2π', C: '3σ, 1π', D: '2σ, 3π' }, correct: 'A', subject: 'Chemistry', explanation: 'CH≡CH: 2 C-H σ bonds + 1 C-C σ bond + 2 C-C π bonds = 3σ, 2π.' },
    { id: 'c2_8', text: 'Which amino acids form the peptide bond?', options: { A: 'Carboxyl group of one + amino group of another', B: 'Amino group + amino group', C: 'Carboxyl + carboxyl groups', D: 'R-group interactions' }, correct: 'A', subject: 'Chemistry', explanation: 'Peptide bond (-CO-NH-) forms by condensation between -COOH of one amino acid and -NH₂ of the next.' },
    { id: 'c2_9', text: 'Which polymer is formed by condensation polymerization?', options: { A: 'Polyethylene', B: 'Polystyrene', C: 'Nylon-6,6', D: 'PVC' }, correct: 'C', subject: 'Chemistry', explanation: 'Nylon-6,6 is formed by condensation (step-growth) polymerization of hexamethylene diamine and adipic acid with loss of water.' },
    { id: 'c2_10', text: 'The functional group present in carboxylic acids is:', options: { A: '-OH', B: '-CHO', C: '-COOH', D: '-CO-' }, correct: 'C', subject: 'Chemistry', explanation: 'Carboxylic acids contain the -COOH (carboxyl) functional group.' },
    { id: 'c2_11', text: 'Which of the following is a broad-spectrum antibiotic?', options: { A: 'Aspirin', B: 'Chloramphenicol', C: 'Insulin', D: 'Morphine' }, correct: 'B', subject: 'Chemistry', explanation: 'Chloramphenicol is a broad-spectrum antibiotic effective against both gram-positive and gram-negative bacteria.' },
    { id: 'c2_12', text: 'Glucose is classified as a:', options: { A: 'Disaccharide', B: 'Polysaccharide', C: 'Aldopentose', D: 'Aldohexose' }, correct: 'D', subject: 'Chemistry', explanation: 'Glucose has 6 carbons (hexose) and an aldehyde group (aldo-) ⇒ aldohexose.' },
    { id: 'c2_13', text: 'The reaction of an alcohol with carboxylic acid in the presence of H₂SO₄ produces:', options: { A: 'Ether', B: 'Alkene', C: 'Ester', D: 'Aldehyde' }, correct: 'C', subject: 'Chemistry', explanation: 'Fischer esterification: R-OH + R\'COOH → R\'COOR + H₂O (ester + water), catalysed by H₂SO₄.' },
    { id: 'c2_14', text: 'Ozone layer depletion is mainly caused by:', options: { A: 'CO₂', B: 'NO₂', C: 'CFCs (Chlorofluorocarbons)', D: 'SO₂' }, correct: 'C', subject: 'Chemistry', explanation: 'CFCs release Cl• radicals in the stratosphere, which catalytically destroy ozone (O₃) molecules.' },
    { id: 'c2_15', text: 'The Hinsberg test is used to distinguish between:', options: { A: 'Primary, secondary and tertiary alcohols', B: 'Primary, secondary and tertiary amines', C: 'Aldehydes and ketones', D: 'Alkanes and alkenes' }, correct: 'B', subject: 'Chemistry', explanation: 'Hinsberg test uses benzenesulfonyl chloride to distinguish 1°, 2° and 3° amines based on solubility of the product.' },
  ],

  // ── BIOLOGY (id: 5 & 6) ──────────────────────────────────────────────────
  5: [ // Botany & Plant Physiology
    { id: 'b1_1', text: 'Which kingdom includes organisms that have cell walls made of chitin?', options: { A: 'Plantae', B: 'Animalia', C: 'Fungi', D: 'Monera' }, correct: 'C', subject: 'Biology', explanation: 'Fungi have cell walls made of chitin, distinguishing them from plants (cellulose) and bacteria (peptidoglycan).' },
    { id: 'b1_2', text: 'The site of photosynthesis in plant cells is the:', options: { A: 'Mitochondria', B: 'Nucleus', C: 'Chloroplast', D: 'Ribosome' }, correct: 'C', subject: 'Biology', explanation: 'Photosynthesis occurs in chloroplasts; light reactions in thylakoids, Calvin cycle in stroma.' },
    { id: 'b1_3', text: 'Which hormone promotes seed dormancy and inhibits growth?', options: { A: 'Auxin (IAA)', B: 'Gibberellin', C: 'Cytokinin', D: 'Abscisic Acid (ABA)' }, correct: 'D', subject: 'Biology', explanation: 'Abscisic acid (ABA) is the stress hormone; it promotes dormancy, stomatal closure, and inhibits growth.' },
    { id: 'b1_4', text: 'C4 plants (e.g., sugarcane) avoid photorespiration because:', options: { A: 'They lack Rubisco', B: 'CO₂ is concentrated in bundle sheath cells away from O₂', C: 'They fix CO₂ only at night', D: 'They have no stomata' }, correct: 'B', subject: 'Biology', explanation: 'In C4 plants, CO₂ is first fixed by PEP carboxylase in mesophyll, then concentrated in bundle sheath cells → minimises O₂ competition with Rubisco.' },
    { id: 'b1_5', text: 'Which process is responsible for the upward movement of water in plants?', options: { A: 'Active transport', B: 'Osmosis', C: 'Transpiration pull (cohesion-tension theory)', D: 'Root pressure alone' }, correct: 'C', subject: 'Biology', explanation: 'The cohesion-tension theory explains ascent of sap: transpiration creates tension that pulls water up through the xylem (Dixon-Joly theory).' },
    { id: 'b1_6', text: 'Double fertilisation is unique to:', options: { A: 'Gymnosperms', B: 'Angiosperms', C: 'Pteridophytes', D: 'Bryophytes' }, correct: 'B', subject: 'Biology', explanation: 'Double fertilisation (syngamy + triple fusion) is a unique feature of angiosperms producing embryo (2n) and endosperm (3n).' },
    { id: 'b1_7', text: 'The correct sequence of taxonomic hierarchy from highest to lowest is:', options: { A: 'Kingdom → Phylum → Class → Order → Family → Genus → Species', B: 'Kingdom → Class → Phylum → Order → Family → Genus → Species', C: 'Species → Genus → Family → Order → Class → Phylum → Kingdom', D: 'Kingdom → Order → Phylum → Class → Family → Genus → Species' }, correct: 'A', subject: 'Biology', explanation: 'KPCOFGS: Kingdom, Phylum, Class, Order, Family, Genus, Species (highest to lowest).' },
    { id: 'b1_8', text: 'Which cell organelle is called the "powerhouse" of the cell?', options: { A: 'Nucleus', B: 'Golgi apparatus', C: 'Mitochondria', D: 'Lysosome' }, correct: 'C', subject: 'Biology', explanation: 'Mitochondria produce ATP via oxidative phosphorylation, hence called the "powerhouse of the cell".' },
    { id: 'b1_9', text: 'The primary cell wall is mainly composed of:', options: { A: 'Lignin', B: 'Chitin', C: 'Cellulose, hemicellulose and pectin', D: 'Suberin' }, correct: 'C', subject: 'Biology', explanation: 'Primary cell wall: cellulose microfibrils embedded in hemicellulose and pectin matrix. Secondary wall adds lignin.' },
    { id: 'b1_10', text: 'Stomata open when guard cells:', options: { A: 'Lose water and become flaccid', B: 'Become turgid due to K⁺ ion uptake', C: 'Increase CO₂ concentration', D: 'Accumulate ABA' }, correct: 'B', subject: 'Biology', explanation: 'K⁺ ions accumulate in guard cells → water enters by osmosis → guard cells become turgid → stomata open.' },
    { id: 'b1_11', text: 'Which part of the flower develops into the fruit?', options: { A: 'Ovule', B: 'Ovary', C: 'Stigma', D: 'Receptacle' }, correct: 'B', subject: 'Biology', explanation: 'After fertilisation, the ovary develops into fruit and ovule(s) develop into seed(s).' },
    { id: 'b1_12', text: 'CAM plants (e.g., cacti) fix CO₂:', options: { A: 'During daytime with open stomata', B: 'At night with open stomata and store as malic acid', C: 'Only in bundle sheath cells', D: 'Via Calvin cycle directly' }, correct: 'B', subject: 'Biology', explanation: 'CAM plants open stomata at night to fix CO₂ as malic acid (organic acid), then use it in Calvin cycle during day with closed stomata.' },
    { id: 'b1_13', text: 'The process of converting atmospheric N₂ into ammonia (NH₃) is called:', options: { A: 'Nitrification', B: 'Denitrification', C: 'Nitrogen fixation', D: 'Ammonification' }, correct: 'C', subject: 'Biology', explanation: 'Nitrogen fixation: N₂ + 8H⁺ + 8e⁻ → 2NH₃ + H₂. Done by Rhizobium (symbiotic) and Azotobacter (free-living).' },
    { id: 'b1_14', text: 'Apomixis in plants refers to:', options: { A: 'Vegetative propagation using cuttings', B: 'Production of seeds without fertilisation', C: 'Cross-pollination between species', D: 'Fusion of two gametes' }, correct: 'B', subject: 'Biology', explanation: 'Apomixis = formation of seeds without fertilisation. Example: some grasses, dandelions.' },
    { id: 'b1_15', text: 'Which phytohormone delays senescence and promotes cell division?', options: { A: 'Ethylene', B: 'ABA', C: 'Auxin', D: 'Cytokinin' }, correct: 'D', subject: 'Biology', explanation: 'Cytokinin promotes cell division (cytokinesis), delays leaf senescence (Richmond-Lang effect), and promotes lateral bud growth.' },
  ],

  6: [ // Zoology, Human Physiology & Genetics
    { id: 'b2_1', text: 'DNA replication in eukaryotes is:', options: { A: 'Conservative', B: 'Dispersive', C: 'Semi-conservative', D: 'Additive' }, correct: 'C', subject: 'Biology', explanation: 'Meselson-Stahl experiment (1958) proved that DNA replication is semi-conservative: each daughter molecule has one old and one new strand.' },
    { id: 'b2_2', text: 'The genetic code is said to be degenerate because:', options: { A: 'More than one codon codes for the same amino acid', B: 'One codon codes for more than one amino acid', C: 'The code is different in different organisms', D: 'Some codons do not code for amino acids' }, correct: 'A', subject: 'Biology', explanation: 'Degeneracy: 64 codons but only 20 amino acids, so multiple codons often code for the same amino acid (e.g., UUU and UUC both code for Phe).' },
    { id: 'b2_3', text: 'The site of protein synthesis in a cell is the:', options: { A: 'Nucleus', B: 'Mitochondria', C: 'Ribosome', D: 'Golgi apparatus' }, correct: 'C', subject: 'Biology', explanation: 'Ribosomes (made of rRNA + proteins) are the molecular machines that translate mRNA into polypeptide chains.' },
    { id: 'b2_4', text: 'Which blood group is called the "universal donor"?', options: { A: 'AB', B: 'A', C: 'B', D: 'O' }, correct: 'D', subject: 'Biology', explanation: 'Blood group O (O negative) has no A or B antigens on RBCs and can donate to any blood group → "universal donor".' },
    { id: 'b2_5', text: 'The functional unit of kidney is the:', options: { A: 'Nephron', B: 'Glomerulus', C: 'Renal corpuscle', D: 'Collecting duct' }, correct: 'A', subject: 'Biology', explanation: 'The nephron (Malpighian tubule) is the structural and functional unit of the kidney (~1 million per kidney).' },
    { id: 'b2_6', text: 'Mendel\'s Law of Independent Assortment holds when genes are located on:', options: { A: 'The same chromosome', B: 'Different (non-homologous) chromosomes', C: 'The X chromosome only', D: 'Mitochondrial DNA' }, correct: 'B', subject: 'Biology', explanation: 'Independent assortment applies to genes on different chromosomes that segregate independently during meiosis.' },
    { id: 'b2_7', text: 'Which hormone regulates blood calcium levels?', options: { A: 'Insulin', B: 'Thyroxine', C: 'Parathyroid hormone (PTH)', D: 'Glucagon' }, correct: 'C', subject: 'Biology', explanation: 'PTH (from parathyroid glands) increases blood Ca²⁺ by stimulating bone resorption, kidney reabsorption, and intestinal absorption.' },
    { id: 'b2_8', text: 'Restriction endonucleases cut DNA at:', options: { A: 'Any random position', B: 'Specific palindromic sequences', C: 'Only AT-rich regions', D: 'Ends of chromosomes' }, correct: 'B', subject: 'Biology', explanation: 'Restriction enzymes recognise specific palindromic DNA sequences (typically 4–8 bp) and cut at or near these sites.' },
    { id: 'b2_9', text: 'Which part of the brain controls body temperature, hunger and thirst?', options: { A: 'Cerebellum', B: 'Medulla oblongata', C: 'Hypothalamus', D: 'Cerebrum' }, correct: 'C', subject: 'Biology', explanation: 'Hypothalamus is the thermostat of the body; it regulates temperature, hunger, thirst, sleep, and many homeostatic functions.' },
    { id: 'b2_10', text: 'The number of chromosomes in a human secondary oocyte is:', options: { A: '46 (diploid)', B: '23 (haploid)', C: '92 (tetraploid)', D: '48' }, correct: 'B', subject: 'Biology', explanation: 'After meiosis I, the secondary oocyte has 23 chromosomes (haploid, but each chromosome consists of 2 chromatids).' },
    { id: 'b2_11', text: 'The vector used for gene cloning in bacteria is typically a:', options: { A: 'Plasmid', B: 'Chromosome', C: 'Mitochondrion', D: 'Lysosome' }, correct: 'A', subject: 'Biology', explanation: 'Plasmids (small circular DNA) are commonly used as vectors in recombinant DNA technology due to their ability to self-replicate in bacteria.' },
    { id: 'b2_12', text: 'Which enzyme is responsible for joining DNA fragments (Okazaki fragments) during replication?', options: { A: 'Helicase', B: 'Primase', C: 'DNA Polymerase III', D: 'DNA Ligase' }, correct: 'D', subject: 'Biology', explanation: 'DNA Ligase joins Okazaki fragments on the lagging strand by sealing nicks between them (3′-OH to 5′-phosphate linkage).' },
    { id: 'b2_13', text: 'Which disease is caused by Plasmodium falciparum?', options: { A: 'Dengue', B: 'Malaria (most severe form)', C: 'Typhoid', D: 'Cholera' }, correct: 'B', subject: 'Biology', explanation: 'Plasmodium falciparum causes cerebral malaria (the most severe and deadly form), transmitted by female Anopheles mosquito.' },
    { id: 'b2_14', text: 'Biodiversity hotspots are characterised by:', options: { A: 'High species richness and high levels of endemism', B: 'Low species richness', C: 'High temperature only', D: 'Presence of only megafauna' }, correct: 'A', subject: 'Biology', explanation: 'Biodiversity hotspots have exceptional species richness and endemism, but are also critically threatened (>70% habitat lost).' },
    { id: 'b2_15', text: 'The acrosome in a sperm is derived from:', options: { A: 'Mitochondria', B: 'Golgi apparatus', C: 'Endoplasmic reticulum', D: 'Nucleus' }, correct: 'B', subject: 'Biology', explanation: 'The acrosome (enzyme-containing cap of sperm head) is derived from the Golgi apparatus. It contains hydrolytic enzymes for egg penetration.' },
  ],

  // ── FULL MOCK (id: 7) ─────────────────────────────────────────────────────
  7: [
    { id: 'fm_1', text: 'The dimensional formula of electric charge is:', options: { A: '[AT]', B: '[A/T]', C: '[AT²]', D: '[A²T]' }, correct: 'A', subject: 'Physics', explanation: 'Charge Q = current × time = [A][T] = [AT].' },
    { id: 'fm_2', text: 'Which of the following is an example of a lyophilic colloid?', options: { A: 'Gold sol', B: 'Starch solution', C: 'As₂S₃ sol', D: 'Fe(OH)₃ sol' }, correct: 'B', subject: 'Chemistry', explanation: 'Lyophilic colloids (solvent-loving): starch, gelatin, gum arabic — they disperse spontaneously in solvent.' },
    { id: 'fm_3', text: 'The genetic information flows from:', options: { A: 'Protein → RNA → DNA', B: 'DNA → RNA → Protein', C: 'RNA → DNA → Protein', D: 'Protein → DNA → RNA' }, correct: 'B', subject: 'Biology', explanation: 'The Central Dogma: DNA → (transcription) → mRNA → (translation) → Protein.' },
    { id: 'fm_4', text: 'Beats are produced when two sound waves of frequencies 256 Hz and 260 Hz superpose. Beat frequency is:', options: { A: '2 Hz', B: '4 Hz', C: '516 Hz', D: '8 Hz' }, correct: 'B', subject: 'Physics', explanation: 'Beat frequency = |f₁ - f₂| = |260 - 256| = 4 Hz.' },
    { id: 'fm_5', text: 'Which of the following reactions represents saponification?', options: { A: 'Ester + H₂O → Acid + Alcohol', B: 'Ester + NaOH → Soap (sodium salt) + Alcohol', C: 'Alcohol + Acid → Ester + H₂O', D: 'Alkene + H₂O → Alcohol' }, correct: 'B', subject: 'Chemistry', explanation: 'Saponification: alkaline hydrolysis of ester with NaOH gives soap (sodium carboxylate salt) and alcohol.' },
    { id: 'fm_6', text: 'Which cell is responsible for producing antibodies?', options: { A: 'T lymphocytes', B: 'Natural killer cells', C: 'Plasma cells (from B lymphocytes)', D: 'Mast cells' }, correct: 'C', subject: 'Biology', explanation: 'Plasma cells (differentiated B lymphocytes) are the antibody-secreting cells of the adaptive immune system.' },
    { id: 'fm_7', text: 'The image formed by a concave mirror when object is at centre of curvature:', options: { A: 'Virtual, erect, same size', B: 'Real, inverted, same size', C: 'Real, erect, magnified', D: 'Virtual, inverted, diminished' }, correct: 'B', subject: 'Physics', explanation: 'Object at C (2f): image is at C, real, inverted, same size. (u = R = 2f; using mirror formula v = 2f too).' },
    { id: 'fm_8', text: 'The molecular formula of Glucose is:', options: { A: 'C₆H₁₀O₅', B: 'C₁₂H₂₂O₁₁', C: 'C₆H₁₂O₆', D: 'C₅H₁₀O₅' }, correct: 'C', subject: 'Chemistry', explanation: 'Glucose: C₆H₁₂O₆. It is an aldohexose (6 carbons, 12 H, 6 O).' },
    { id: 'fm_9', text: 'Lac operon in E. coli is an example of:', options: { A: 'Negative feedback at the genetic level', B: 'Post-translational modification', C: 'Inducible operon (negative regulation)', D: 'Repressible operon' }, correct: 'C', subject: 'Biology', explanation: 'Lac operon is an inducible system under negative control: the repressor normally blocks transcription; lactose (inducer) removes the repressor.' },
    { id: 'fm_10', text: 'The minimum distance for distinct vision of normal human eye is:', options: { A: '15 cm', B: '25 cm', C: '50 cm', D: 'Infinity' }, correct: 'B', subject: 'Physics', explanation: 'The least distance of distinct vision (near point) for a normal human eye is 25 cm.' },
    { id: 'fm_11', text: 'Which of the following is an sp³ hybridised compound with bond angle less than 109.5°?', options: { A: 'CH₄', B: 'NH₃', C: 'BF₃', D: 'C₂H₂' }, correct: 'B', subject: 'Chemistry', explanation: 'NH₃ is sp³ but has 1 lone pair; lone pair-bond pair repulsion reduces bond angle to ~107°. CH₄ is 109.5° with no lone pairs.' },
    { id: 'fm_12', text: 'Which enzyme joins the two strands of DNA during replication?', options: { A: 'DNA Helicase', B: 'DNA Polymerase I', C: 'DNA Ligase', D: 'Topoisomerase' }, correct: 'C', subject: 'Biology', explanation: 'DNA Ligase seals the nick between Okazaki fragments and joins DNA strand breaks.' },
    { id: 'fm_13', text: 'The energy released in ATP hydrolysis under standard conditions is approximately:', options: { A: '-7.3 kJ/mol', B: '-30.5 kJ/mol', C: '+30.5 kJ/mol', D: '-14.6 kJ/mol' }, correct: 'B', subject: 'Chemistry', explanation: 'ATP + H₂O → ADP + Pi, ΔG°\' = -30.5 kJ/mol under standard biochemical conditions.' },
    { id: 'fm_14', text: 'Rh factor is associated with which blood component?', options: { A: 'Plasma proteins', B: 'Platelets', C: 'Red blood cells (RBCs)', D: 'WBCs' }, correct: 'C', subject: 'Biology', explanation: 'Rh (Rhesus) factor is an antigen present on the surface of RBCs. Rh⁺ individuals have it; Rh⁻ do not.' },
    { id: 'fm_15', text: 'A transformer steps up voltage from 220V to 2200V. If primary has 100 turns, number of secondary turns is:', options: { A: '10', B: '100', C: '1000', D: '10000' }, correct: 'C', subject: 'Physics', explanation: 'Vs/Vp = Ns/Np ⇒ 2200/220 = Ns/100 ⇒ Ns = 1000 turns.' },
    { id: 'fm_16', text: 'Which vitamin is synthesised in the skin upon exposure to sunlight?', options: { A: 'Vitamin A', B: 'Vitamin B12', C: 'Vitamin C', D: 'Vitamin D' }, correct: 'D', subject: 'Biology', explanation: 'Vitamin D (calciferol) is synthesised from 7-dehydrocholesterol in skin by UV-B radiation. It aids calcium absorption.' },
    { id: 'fm_17', text: 'Optical isomerism occurs in molecules that have:', options: { A: 'A plane of symmetry', B: 'An asymmetric (chiral) carbon', C: 'Only C, H, and O atoms', D: 'More than 4 carbon atoms' }, correct: 'B', subject: 'Chemistry', explanation: 'A chiral carbon (asymmetric carbon) bonded to 4 different groups is necessary for optical isomerism (non-superimposable mirror images).' },
    { id: 'fm_18', text: 'The process by which mRNA sequence is decoded to produce a polypeptide is called:', options: { A: 'Transcription', B: 'Replication', C: 'Translation', D: 'Transduction' }, correct: 'C', subject: 'Biology', explanation: 'Translation: ribosomes read mRNA codons and tRNAs bring corresponding amino acids to assemble the polypeptide chain.' },
    { id: 'fm_19', text: 'Which of the following has the highest resistivity at room temperature?', options: { A: 'Silver', B: 'Copper', C: 'Silicon', D: 'Nichrome' }, correct: 'C', subject: 'Physics', explanation: 'Silicon (semiconductor) has much higher resistivity (~6.4×10² Ω·m) than metals. Nichrome (~1.1×10⁻⁶ Ω·m), Ag (~1.6×10⁻⁸ Ω·m).' },
    { id: 'fm_20', text: 'The term "in-situ conservation" refers to:', options: { A: 'Conservation in zoos', B: 'Conservation in natural habitats', C: 'Seed banking', D: 'Tissue culture preservation' }, correct: 'B', subject: 'Biology', explanation: 'In-situ conservation: protecting species in their natural habitats (national parks, biosphere reserves, wildlife sanctuaries).' },
    // Additional questions to reach 25
    { id: 'fm_21', text: 'The acceleration due to gravity at height h above earth\'s surface (h << R) is approximately:', options: { A: 'g(1 - 2h/R)', B: 'g(1 + 2h/R)', C: 'g(1 - h/R)', D: 'g(R/(R+h))' }, correct: 'A', subject: 'Physics', explanation: 'g_h = g(1 - 2h/R) for h << R (using binomial approximation of g_h = gR²/(R+h)²).' },
    { id: 'fm_22', text: 'Which of the following is NOT a colligative property?', options: { A: 'Osmotic pressure', B: 'Elevation of boiling point', C: 'Optical rotation', D: 'Depression of freezing point' }, correct: 'C', subject: 'Chemistry', explanation: 'Colligative properties depend only on solute particle count. Optical rotation depends on the nature of the solute, not just number.' },
    { id: 'fm_23', text: 'The conducting zone of human respiratory system does NOT include:', options: { A: 'Trachea', B: 'Bronchi', C: 'Alveoli', D: 'Bronchioles' }, correct: 'C', subject: 'Biology', explanation: 'Alveoli are the respiratory (gas exchange) zone, not the conducting zone. Conducting zone: nostrils → trachea → bronchioles (non-respiratory).' },
    { id: 'fm_24', text: 'In the photoelectric effect, increasing the intensity of incident light increases:', options: { A: 'The stopping potential', B: 'The maximum kinetic energy of photoelectrons', C: 'The number of photoelectrons emitted', D: 'The threshold frequency' }, correct: 'C', subject: 'Physics', explanation: 'Intensity = number of photons per unit time. More photons → more photoelectrons. KE and stopping potential depend on frequency, not intensity.' },
    { id: 'fm_25', text: 'The end product of glycolysis is:', options: { A: 'Acetyl CoA', B: 'Citric acid', C: 'Pyruvate (Pyruvic acid)', D: 'Oxaloacetate' }, correct: 'C', subject: 'Biology', explanation: 'Glycolysis converts 1 glucose → 2 pyruvate + 2 ATP (net) + 2 NADH in the cytoplasm.' },
  ],
};

// ─── Subject icon & color helpers ────────────────────────────────────────────
const SUBJECT_META = {
  Physics: { icon: Atom, color: 'text-blue-400', bg: 'bg-blue-950/40', border: 'border-blue-500/30', badge: 'bg-blue-950 text-blue-300 border-blue-500/40' },
  Chemistry: { icon: FlaskConical, color: 'text-emerald-400', bg: 'bg-emerald-950/40', border: 'border-emerald-500/30', badge: 'bg-emerald-950 text-emerald-300 border-emerald-500/40' },
  Biology: { icon: Dna, color: 'text-green-400', bg: 'bg-green-950/40', border: 'border-green-500/30', badge: 'bg-green-950 text-green-300 border-green-500/40' },
  'Full Mock': { icon: Award, color: 'text-amber-400', bg: 'bg-amber-950/40', border: 'border-amber-500/30', badge: 'bg-amber-950 text-amber-300 border-amber-500/40' },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function NEETSubjectAssessmentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Pull assessment config from navigate state
  const { assessment = {} } = location.state || {};
  const {
    id = 7,
    title = 'NEET (UG) 2026 Assessment',
    category = 'Full Mock',
    time_limit_minutes = 45,
    customQuestions
  } = assessment;

  // Ensure exactly 50 questions per subject model paper / practice exam
  let rawQuestions = (customQuestions && customQuestions.length > 0) ? customQuestions : null;

  if (!rawQuestions || rawQuestions.length === 0) {
    if (category === 'Physics' || id === 1 || id === 2) {
      rawQuestions = PHYSICS_50_QUESTIONS;
    } else if (category === 'Chemistry' || id === 3 || id === 4) {
      rawQuestions = CHEMISTRY_50_QUESTIONS;
    } else if (category === 'Biology' || id === 5 || id === 6) {
      rawQuestions = BIOLOGY_50_QUESTIONS;
    } else {
      rawQuestions = [
        ...PHYSICS_50_QUESTIONS.slice(0, 15),
        ...CHEMISTRY_50_QUESTIONS.slice(0, 15),
        ...BIOLOGY_50_QUESTIONS.slice(0, 20)
      ];
    }
  }
  const SubjectIcon = SUBJECT_META[category]?.icon || Award;
  const meta = SUBJECT_META[category] || SUBJECT_META['Full Mock'];

  // ── State: Dynamic Question Randomization ───────────────────────────────────
  const [shuffledQuestions, setShuffledQuestions] = useState(() => shuffleArray(rawQuestions));
  const questions = shuffledQuestions;

  useEffect(() => {
    setShuffledQuestions(shuffleArray(rawQuestions));
  }, [category, id]);

  const [phase, setPhase] = useState('intro'); // 'intro' | 'quiz' | 'results'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(time_limit_minutes * 60);
  const [submitted, setSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const timerRef = useRef(null);

  // ── Timer ──────────────────────────────────────────────────────────────────
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); handleAutoSubmit(); return 0; }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (phase === 'quiz') startTimer();
    return () => clearInterval(timerRef.current);
  }, [phase, startTimer]);

  const handleAutoSubmit = useCallback(() => {
    clearInterval(timerRef.current);
    setSubmitted(true);
    setPhase('results');
  }, []);

  const formatTime = (s) => {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    if (hrs > 0) {
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // ── Scoring ────────────────────────────────────────────────────────────────
  const getScore = () => {
    const isFullNEET = questions.length === 200 || maxMarks === 720 || totalQuestions === 200;

    if (isFullNEET) {
      // Official NTA NEET-UG scoring across 4 subjects: Physics, Chemistry, Botany, Zoology
      // Section A: 35 questions per subject (all evaluated)
      // Section B: 15 questions per subject (first 10 attempted evaluated per subject)
      // Total attempted: 45 per subject * 4 = 180 questions -> Max Marks = 720
      const subjects = ['Physics', 'Chemistry', 'Botany', 'Zoology'];
      let totalCorrect = 0, totalIncorrect = 0, totalUnanswered = 0;

      subjects.forEach(sub => {
        const subQuestions = questions.filter(qn => (qn.subject || '').toLowerCase() === sub.toLowerCase());
        const targetQuestions = subQuestions.length > 0 ? subQuestions : questions.slice(subjects.indexOf(sub) * 50, (subjects.indexOf(sub) + 1) * 50);

        const secA = targetQuestions.slice(0, 35);
        const secB = targetQuestions.slice(35, 50);

        secA.forEach(qn => {
          const ans = answers[qn.id];
          if (!ans) totalUnanswered++;
          else if (ans === qn.correct) totalCorrect++;
          else totalIncorrect++;
        });

        let secBAttempts = 0;
        secB.forEach(qn => {
          const ans = answers[qn.id];
          if (!ans) {
            totalUnanswered++;
          } else {
            if (secBAttempts < 10) {
              secBAttempts++;
              if (ans === qn.correct) totalCorrect++;
              else totalIncorrect++;
            } else {
              // Beyond 10 attempts in Section B ignored per NTA regulations
            }
          }
        });
      });

      const marks = (totalCorrect * 4) - (totalIncorrect * 1);
      const totalMarks = 720;
      const percentage = Math.max(0, Math.round((marks / totalMarks) * 100));
      return { correct: totalCorrect, incorrect: totalIncorrect, unanswered: totalUnanswered, marks, totalMarks, percentage };
    }

    let correct = 0, incorrect = 0, unanswered = 0;
    questions.forEach(q => {
      const ans = answers[q.id];
      if (!ans) { unanswered++; return; }
      if (ans === q.correct) correct++;
      else incorrect++;
    });
    // NEET marking: +4 for correct, -1 for incorrect
    const marks = (correct * 4) - (incorrect * 1);
    const totalMarks = questions.length * 4;
    const percentage = Math.max(0, Math.round((marks / totalMarks) * 100));
    return { correct, incorrect, unanswered, marks, totalMarks, percentage };
  };

  const handleSubmit = () => {
    setShowConfirm(false);
    clearInterval(timerRef.current);
    setSubmitted(true);
    setPhase('results');
  };

  const q = questions[currentIndex];
  const answered = Object.keys(answers).length;
  const timerUrgent = timeLeft < 300;

  // ── INTRO SCREEN ───────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-10">
        <div className="max-w-lg w-full">
          <button
            onClick={() => navigate('/assessments')}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Assessments
          </button>

          <div className={`rounded-3xl border p-8 space-y-6 ${meta.bg} ${meta.border} bg-zinc-900`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${meta.bg} border ${meta.border}`}>
              <SubjectIcon size={30} className={meta.color} />
            </div>

            <div>
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${meta.badge}`}>
                {category}
              </span>
              <h1 className="text-xl font-extrabold text-white mt-3 leading-snug">{title}</h1>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: 'Questions', value: (questions.length === 200 || maxMarks === 720) ? '180 / 200' : questions.length, sub: (questions.length === 200 || maxMarks === 720) ? '180 to attempt' : 'Total' },
                { label: 'Duration', value: time_limit_minutes >= 60 ? `${Math.floor(time_limit_minutes/60)}h ${time_limit_minutes%60 ? (time_limit_minutes%60)+'m' : ''}` : `${time_limit_minutes}m`, sub: `${time_limit_minutes} min total` },
                { label: 'Max Marks', value: (questions.length === 200 || maxMarks === 720) ? '720' : questions.length * 4, sub: '+4 / −1 scoring' },
              ].map(stat => (
                <div key={stat.label} className="bg-zinc-950/60 rounded-xl p-3 border border-zinc-800">
                  <div className="text-lg font-extrabold text-white">{stat.value}</div>
                  <div className="text-[11px] font-semibold text-emerald-400 mt-0.5">{stat.sub}</div>
                  <div className="text-[10px] text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Subject Distribution Breakdown */}
            {(questions.length === 200 || maxMarks === 720) && (
              <div className="bg-zinc-950/70 rounded-2xl p-4 border border-zinc-800 space-y-2">
                <div className="text-xs font-bold text-zinc-300 flex items-center justify-between">
                  <span>Official NTA NEET (UG) Subject Structure:</span>
                  <span className="text-emerald-400 font-mono">180 Attempt · 720M</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div className="font-bold text-white">Physics</div>
                    <div className="text-[10px] text-zinc-400">45 to attempt (180M)</div>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div className="font-bold text-white">Chemistry</div>
                    <div className="text-[10px] text-zinc-400">45 to attempt (180M)</div>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div className="font-bold text-white">Botany</div>
                    <div className="text-[10px] text-zinc-400">45 to attempt (180M)</div>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div className="font-bold text-white">Zoology</div>
                    <div className="text-[10px] text-zinc-400">45 to attempt (180M)</div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-zinc-950/50 rounded-xl p-4 border border-zinc-800 space-y-2 text-sm">
              <div className="font-bold text-white flex items-center gap-2"><BookOpen size={15} className="text-emerald-400" /> NEET Marking Scheme</div>
              <ul className="space-y-1 text-zinc-400 text-xs">
                <li className="flex items-center gap-2"><span className="text-emerald-400 font-bold">+4</span> for each correct answer</li>
                <li className="flex items-center gap-2"><span className="text-red-400 font-bold">−1</span> for each wrong answer</li>
                <li className="flex items-center gap-2"><span className="text-zinc-400 font-bold">0</span> for unanswered questions</li>
              </ul>
            </div>

            <button
              onClick={() => {
                setShuffledQuestions(shuffleArray(rawQuestions));
                setPhase('quiz');
              }}
              className={`w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25`}
            >
              Start Assessment →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULTS SCREEN ─────────────────────────────────────────────────────────
  if (phase === 'results') {
    const { correct, incorrect, unanswered, marks, totalMarks, percentage } = getScore();
    const level = percentage >= 75 ? 'Advanced' : percentage >= 50 ? 'Intermediate' : 'Needs Practice';
    const levelColor = percentage >= 75 ? 'text-emerald-400' : percentage >= 50 ? 'text-amber-400' : 'text-red-400';

    return (
      <div className="min-h-screen bg-zinc-950 py-10 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Result Header */}
          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 text-center space-y-4">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto text-4xl font-extrabold border-4 ${
              percentage >= 75 ? 'border-emerald-500 text-emerald-400 bg-emerald-950/50' :
              percentage >= 50 ? 'border-amber-500 text-amber-400 bg-amber-950/50' :
              'border-red-500 text-red-400 bg-red-950/50'
            }`}>
              {percentage}%
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white">{title}</h2>
              <p className={`text-sm font-bold mt-1 ${levelColor}`}>{level}</p>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Correct', value: correct, color: 'text-emerald-400' },
                { label: 'Incorrect', value: incorrect, color: 'text-red-400' },
                { label: 'Skipped', value: unanswered, color: 'text-zinc-400' },
                { label: 'Score', value: `${marks}/${totalMarks}`, color: 'text-white' },
              ].map(s => (
                <div key={s.label} className="bg-zinc-950 rounded-xl p-3 border border-zinc-800 text-center">
                  <div className={`text-lg font-extrabold ${s.color}`}>{s.value}</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Question Review */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white px-1">Review Answers</h3>
            {questions.map((qn, idx) => {
              const userAns = answers[qn.id];
              const isCorrect = userAns === qn.correct;
              const isSkipped = !userAns;
              return (
                <div key={qn.id} className={`bg-zinc-900 rounded-2xl border p-5 space-y-3 ${
                  isSkipped ? 'border-zinc-800' : isCorrect ? 'border-emerald-500/40' : 'border-red-500/40'
                }`}>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-zinc-800 text-zinc-400 flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                    <p className="text-sm font-medium text-white leading-relaxed">{qn.text}</p>
                    <span className="ml-auto flex-shrink-0">
                      {isSkipped ? <AlertCircle size={18} className="text-zinc-500" /> :
                       isCorrect ? <CheckCircle size={18} className="text-emerald-400" /> :
                       <XCircle size={18} className="text-red-400" />}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(qn.options).map(([key, text]) => {
                      const isCorrectOpt = key === qn.correct;
                      const isUserOpt = key === userAns;
                      return (
                        <div key={key} className={`text-xs px-3 py-2 rounded-lg border flex items-center gap-2 ${
                          isCorrectOpt ? 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300' :
                          isUserOpt && !isCorrectOpt ? 'border-red-500/60 bg-red-950/40 text-red-300' :
                          'border-zinc-800 text-zinc-500'
                        }`}>
                          <span className="font-bold">{key}.</span> {text}
                        </div>
                      );
                    })}
                  </div>
                  {(() => {
                    const exp = getQuestionExplanation(qn, userAns);
                    return (
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 space-y-3 text-xs">
                        {/* Why Selected is Wrong */}
                        {!isCorrect && !isSkipped && exp.whyWrong && (
                          <div className="bg-red-950/40 border border-red-500/30 rounded-lg p-3">
                            <span className="font-bold text-red-400 block mb-1">❌ Why Option {userAns} is Wrong:</span>
                            <span className="text-zinc-300 leading-relaxed whitespace-pre-line">{exp.whyWrong}</span>
                          </div>
                        )}

                        {/* Why Correct is Right */}
                        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-lg p-3">
                          <span className="font-bold text-emerald-400 block mb-1">✅ Why Option {qn.correct} is Correct:</span>
                          <span className="text-zinc-200 leading-relaxed whitespace-pre-line">{exp.whyCorrect}</span>
                        </div>

                        {/* Derivation Steps */}
                        {exp.derivationSteps && exp.derivationSteps.length > 0 && (
                          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 space-y-1.5">
                            <span className="font-bold text-amber-400 block text-[11px] uppercase tracking-wider">
                              Step-by-Step Derivation & Verification:
                            </span>
                            {exp.derivationSteps.map((step, sIdx) => (
                              <div key={sIdx} className="text-zinc-300 flex items-start gap-2 bg-zinc-950/60 p-2 rounded border border-zinc-800/50">
                                <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                                  {sIdx + 1}
                                </span>
                                <span>{step}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Trap Alert */}
                        {exp.neetTrapAlert && (
                          <div className="text-[11px] text-amber-300 bg-amber-950/30 border border-amber-500/20 rounded-lg p-2.5 flex items-start gap-2">
                            <AlertCircle size={14} className="flex-shrink-0 mt-0.5 text-amber-400" />
                            <span>{exp.neetTrapAlert}</span>
                          </div>
                        )}

                        {/* Key Takeaway & AI Button */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-800">
                          {exp.keyTakeaway && (
                            <span className="text-[11px] text-teal-300">
                              <strong className="text-teal-200">NEET Key Concept: </strong>{exp.keyTakeaway}
                            </span>
                          )}
                          <button
                            onClick={() => {
                              navigate('/courses/ai-tutor', {
                                state: {
                                  subject: qn.subject,
                                  autoQuery: `Explain in depth with step-by-step mathematical derivation and 3D schematic: "${qn.text}"`
                                }
                              });
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[11px] shadow-sm cursor-pointer transition-all ml-auto"
                          >
                            <BookOpen size={12} />
                            <span>Ask AI Tutor for Deep Chapter Guide</span>
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              );
            })}
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-3 pb-6">
            <button
              onClick={() => navigate('/assessments')}
              className="flex-1 py-3 border border-zinc-700 bg-zinc-900 rounded-xl text-sm font-bold text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              ← Back to Assessments
            </button>
            <button
              onClick={() => {
                setShuffledQuestions(shuffleArray(rawQuestions));
                setAnswers({});
                setCurrentIndex(0);
                setTimeLeft(time_limit_minutes * 60);
                setSubmitted(false);
                setPhase('intro');
              }}
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/25 transition-all"
            >
              Retake Assessment (New Shuffle)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── QUIZ SCREEN ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-6 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${meta.badge}`}>
              {category}
            </span>
            <h1 className="text-sm sm:text-base font-bold text-white mt-0.5 line-clamp-1">{title}</h1>
          </div>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl font-mono font-bold text-sm border ${
            timerUrgent ? 'bg-red-950/50 border-red-500/40 text-red-400 animate-pulse' : 'bg-zinc-950 border-zinc-800 text-zinc-200'
          }`}>
            <Clock size={16} className={timerUrgent ? 'text-red-400' : 'text-emerald-400'} />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress */}
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl space-y-2">
          <div className="flex justify-between text-xs text-zinc-400 font-medium">
            <span>Answered: <strong className="text-white">{answered}</strong> of {questions.length}</span>
            <span>Q {currentIndex + 1} / {questions.length}</span>
          </div>
          <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden border border-zinc-800">
            <div
              className="h-1.5 rounded-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Subject Switcher Tabs for Full 200-Question Exam */}
        {questions.length === 200 && (
          <div className="flex gap-2 p-1.5 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-x-auto">
            {[
              { name: 'Physics', start: 0, end: 49, icon: '⚛️' },
              { name: 'Chemistry', start: 50, end: 99, icon: '🧪' },
              { name: 'Botany', start: 100, end: 149, icon: '🌿' },
              { name: 'Zoology', start: 150, end: 199, icon: '🧬' },
            ].map(s => {
              const isCurrent = currentIndex >= s.start && currentIndex <= s.end;
              const subAnswered = questions.slice(s.start, s.end + 1).filter(item => answers[item.id]).length;
              return (
                <button
                  key={s.name}
                  onClick={() => setCurrentIndex(s.start)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <span>{s.icon}</span>
                  <span>{s.name}</span>
                  <span className="text-[10px] opacity-80 font-mono">({subAnswered}/45 attempted)</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Question */}
        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                Question {currentIndex + 1}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${meta.badge}`}>{q.subject}</span>
              <span className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-md border ${
                (q.section || (currentIndex % 50 < 35 ? 'Section A' : 'Section B')).includes('Section B')
                  ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                  : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
              }`}>
                {q.section || (currentIndex % 50 < 35 ? 'Section A (Mandatory)' : 'Section B (Attempt any 10 of 15)')}
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-zinc-400">+4 / −1 Marks</span>
          </div>

          <h2 className="text-sm sm:text-base font-bold text-white leading-relaxed">{q.text}</h2>

          <div className="space-y-3">
            {Object.entries(q.options).map(([key, text]) => {
              const selected = answers[q.id] === key;
              return (
                <button
                  key={key}
                  onClick={() => setAnswers(prev => ({ ...prev, [q.id]: key }))}
                  className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all ${
                    selected
                      ? 'border-emerald-500 bg-emerald-950/40 text-white shadow-sm'
                      : 'border-zinc-800 bg-zinc-950/80 hover:border-zinc-700 text-zinc-300'
                  }`}
                >
                  <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
                    selected ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-400'
                  }`}>{key}</span>
                  <span className="text-xs sm:text-sm leading-relaxed pt-0.5">{text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-5 py-2.5 border border-zinc-800 bg-zinc-900 rounded-xl text-xs sm:text-sm font-semibold text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 transition-colors"
          >
            <ChevronLeft size={16} /> Previous
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex(i => Math.min(questions.length - 1, i + 1))}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all"
            >
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-2 px-7 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all"
            >
              Submit Assessment
            </button>
          )}
        </div>

        {/* Question Palette */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-400">
            <span>
              {questions.length === 200
                ? `Question Palette · ${['Physics (1-50)', 'Chemistry (51-100)', 'Botany (101-150)', 'Zoology (151-200)'][Math.floor(currentIndex / 50)]}`
                : 'Question Palette'}
            </span>
            <span className="text-emerald-400 font-mono">
              {answered} Answered / {questions.length === 200 ? '180 Target' : `${questions.length} Total`}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 justify-center max-h-48 overflow-y-auto p-1 custom-scrollbar">
            {questions.map((qn, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  i === currentIndex ? 'bg-emerald-600 text-white shadow-md scale-105' :
                  answers[questions[i]?.id] ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40' :
                  'bg-zinc-950 border border-zinc-800 text-zinc-500 hover:bg-zinc-800'
                }`}
                title={`Q${i + 1} (${qn.subject || 'NEET'}): ${answers[questions[i]?.id] ? 'Answered ' + answers[questions[i]?.id] : 'Not Answered'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 max-w-sm w-full text-center space-y-5 shadow-2xl">
            <div className="w-14 h-14 bg-emerald-950/60 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Submit Assessment?</h3>
              <p className="text-sm text-zinc-400 mt-1">
                You've answered <strong className="text-emerald-400">{answered}</strong> of <strong className="text-emerald-400">{questions.length}</strong> questions.
              </p>
              {answered < questions.length && (
                <p className="text-xs text-amber-400 bg-amber-950/40 border border-amber-500/30 rounded-xl p-3 mt-3">
                  {questions.length - answered} unanswered questions will score 0.
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-2.5 border border-zinc-700 bg-zinc-800 rounded-xl text-xs font-semibold text-zinc-300 hover:bg-zinc-700">Cancel</button>
              <button onClick={handleSubmit} className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

