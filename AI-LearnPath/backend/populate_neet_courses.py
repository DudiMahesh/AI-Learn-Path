"""
populate_neet_courses.py
Removes previous non-NEET courses and populates complete NEET UG 2026 syllabus courses
for Physics, Chemistry, and Biology with in-depth topics, lessons, formulas, worked examples,
NEET tips, and quick-revision boxes directly from the official NMC/NTA study materials.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))

from app import create_app
from models import db
from models.career import Career
from models.skill import Skill, CareerSkill
from models.course import Course, CourseSkill
from models.topic import Topic, LessonProgress, TopicPrerequisite
from models.lesson import Lesson
from models.learning_path import LearningPathItem

app = create_app()

NEET_CAREERS = [
    {
        "name": "NEET MBBS Aspirant (Medical Entrance)",
        "description": "Comprehensive preparation targeting 680+ marks for top Government Medical Colleges (AIIMS, JIPMER, MAMC).",
        "icon": "activity"
    },
    {
        "name": "NEET Physics Mastery",
        "description": "Focus on high-scoring mechanics, electrodynamics, optics, modern physics, and numerical problem solving.",
        "icon": "zap"
    },
    {
        "name": "NEET Chemistry Mastery",
        "description": "Complete command over Physical Chemistry formulas, Inorganic NCERT line-by-line, and Organic reaction mechanisms.",
        "icon": "flask-conical"
    },
    {
        "name": "NEET Biology Specialist",
        "description": "360/360 targeting track covering Botany, Zoology, Human Physiology, Genetics, and Biotechnology.",
        "icon": "dna"
    },
    {
        "name": "NEET High-Scorer (700+ Target)",
        "description": "Intensive revision, high-yield traps, and full mock test strategies for top national percentile rank.",
        "icon": "award"
    },
    {
        "name": "BDS & Allied Medical Sciences",
        "description": "Balanced score maximization across Physics, Chemistry, and Biology for Dental and Allied Medical admissions.",
        "icon": "stethoscope"
    }
]

NEET_SKILLS = [
    # Physics Skills
    ("Physical Units & Dimensional Analysis", "Physics", "SI units, least count, error propagation, and dimensions"),
    ("Kinematics & Projectile Motion", "Physics", "1D/2D motion, trajectory equations, relative velocity, and circular motion"),
    ("Laws of Motion & Friction", "Physics", "Newton laws, impulse, friction, inclined plane dynamics, and banked roads"),
    ("Work, Energy, Power & Collisions", "Physics", "Work-energy theorem, conservative forces, vertical circle, and elastic collisions"),
    ("Rotational Dynamics & Moment of Inertia", "Physics", "Torque, angular momentum conservation, parallel axes, and rolling motion"),
    ("Gravitation & Satellite Motion", "Physics", "Variation of g, Kepler laws, escape velocity, and satellite orbital energy"),
    ("Fluid Mechanics & Thermal Properties", "Physics", "Bernoulli principle, surface tension, viscosity, and thermal expansion"),
    ("Thermodynamics & Kinetic Theory", "Physics", "First and second laws, Carnot engine efficiency, RMS velocity, and equipartition"),
    ("Oscillations & Wave Optics", "Physics", "Simple harmonic motion, sound waves, organ pipes, YDSE, and diffraction"),
    ("Electrostatics & Capacitance", "Physics", "Coulomb law, Gauss theorem, electric potential, and capacitor dielectrics"),
    ("Current Electricity & Circuit Laws", "Physics", "Drift velocity, Ohm law, Kirchhoff laws, and Wheatstone bridge"),
    ("Magnetism & EMI", "Physics", "Biot-Savart, Lorentz force, Faraday law, Lenz law, and AC resonance"),
    ("Modern Physics & Semiconductor Devices", "Physics", "Photoelectric effect, Bohr atom, nuclear binding energy, and p-n diodes"),
    ("Physics Experimental Skills", "Physics", "Vernier calipers, screw gauge, resonance tube, and metre bridge experiments"),

    # Chemistry Skills
    ("Mole Concept & Stoichiometry", "Physical Chemistry", "Avogadro number, empirical formula, limiting reagents, and molarity"),
    ("Atomic Structure & Quantum Numbers", "Physical Chemistry", "Bohr model, de Broglie, Heisenberg principle, and orbital electronic configuration"),
    ("Chemical Bonding & Molecular Geometry", "Inorganic Chemistry", "VSEPR theory, hybridisation, MOT, and hydrogen bonding"),
    ("Chemical Thermodynamics & Thermochemistry", "Physical Chemistry", "Enthalpy, Hess law, entropy, and Gibbs free energy spontaneity"),
    ("Chemical & Ionic Equilibrium", "Physical Chemistry", "Kc, Kp, Le Chatelier principle, pH, buffer solutions, and solubility product"),
    ("Redox Reactions & Electrochemistry", "Physical Chemistry", "Nernst equation, Daniell cell, Faraday laws of electrolysis, and Kohlrausch law"),
    ("Chemical Kinetics & Arrhenius Equation", "Physical Chemistry", "Rate laws, zero/first order kinetics, half-life, and activation energy"),
    ("Periodic Properties & Trends", "Inorganic Chemistry", "Zeff, atomic radius, ionisation enthalpy, and electronegativity"),
    ("p-Block Elements (Groups 13-18)", "Inorganic Chemistry", "Boron, Carbon, Nitrogen, Oxygen, Halogen, and Noble gas chemistry"),
    ("d- and f-Block Elements", "Inorganic Chemistry", "Transition metals, lanthanoid contraction, KMnO4, and K2Cr2O7"),
    ("Coordination Chemistry", "Inorganic Chemistry", "Werner theory, IUPAC nomenclature, isomerism, and Crystal Field Theory"),
    ("General Organic Chemistry (GOC)", "Organic Chemistry", "Inductive, resonance, hyperconjugation effects, and reaction intermediates"),
    ("Hydrocarbons & Reaction Mechanisms", "Organic Chemistry", "Markovnikov addition, ozonolysis, aromatic substitution, and Hückel rule"),
    ("Haloalkanes & Haloarenes", "Organic Chemistry", "SN1, SN2 mechanisms, elimination, and organometallic Grignard reactions"),
    ("Oxygen Containing Organic Compounds", "Organic Chemistry", "Alcohols, phenols, ethers, aldehydes, ketones, and carboxylic acids"),
    ("Nitrogen Compounds & Biomolecules", "Organic Chemistry", "Amines, diazonium salts, carbohydrates, proteins, nucleic acids, and vitamins"),
    ("Practical Chemistry & Salt Analysis", "Practical Chemistry", "Lassaigne test, cation/anion group separation, and titrations"),

    # Biology Skills
    ("Diversity in the Living World", "Biology", "Taxonomy, binomial nomenclature, five kingdoms, and plant/animal classification"),
    ("Cell Biology & Biomolecules", "Biology", "Cell organelles, mitosis, meiosis, carbohydrates, proteins, and enzymes"),
    ("Plant Physiology", "Biology", "Photosynthesis in higher plants, cellular respiration, and plant growth regulators"),
    ("Human Physiology", "Biology", "Digestion, breathing, body fluids & circulation, excretion, locomotion, and neural control"),
    ("Genetics & Molecular Inheritance", "Biology", "Mendelian inheritance, DNA replication, transcription, translation, and genetic code"),
    ("Evolution & Human Health", "Biology", "Darwinism, human diseases, immunity, AIDS, cancer, and drug abuse"),
    ("Biotechnology Principles & Applications", "Biology", "Recombinant DNA technology, PCR, GMOs, insulin, and gene therapy"),
    ("Ecology & Environment", "Biology", "Organisms and populations, ecosystems, biodiversity conservation, and environmental issues")
]

CHEMISTRY_UNITS = [
    {
        "unit": "Unit 1: Some Basic Concepts in Chemistry",
        "description": "Matter classification, SI units, significant figures, chemical combination laws, Dalton theory, mole concept, empirical formula, stoichiometry, limiting reagent, and concentration terms.",
        "lessons": [
            {
                "title": "1.1 Matter, SI Units & Significant Figures",
                "content": """# Matter, SI Units & Significant Figures

## Matter and Its Nature
Matter is anything that has mass and occupies space. Chemistry studies the composition, structure, properties, and changes of matter.

```
                  MATTER
                  /    \\
        PURE SUBSTANCES  MIXTURES
           /      \\       /       \\
      ELEMENTS  COMPOUNDS HOMOGENEOUS HETEROGENEOUS
      (Na, O2)  (H2O, NaCl) (Air, brine) (Sand + water)
```

- **Element**: One kind of atom ($Fe, O_2, P_4, S_8$). Atomicity = number of atoms per molecule ($He = 1, O_2 = 2, O_3 = 3, P_4 = 4, S_8 = 8$).
- **Compound**: Two or more elements chemically combined in a fixed ratio; properties differ from constituent elements ($NaCl$ is safe to eat, unlike $Na$ or $Cl_2$).
- **Mixture**: Physically mixed, variable composition, components keep individual properties, separable by physical methods.

### States of Matter Comparison
| Property | Solid | Liquid | Gas |
|---|---|---|---|
| **Shape** | Fixed | Takes container shape | Takes container shape |
| **Volume** | Fixed | Fixed | Fills entire container |
| **Compressibility** | Negligible | Very low | High |
| **Particle Motion** | Vibrate in place | Slide past each other | Random, fast translational |

> **NEET Tip**: Plasma and Bose-Einstein condensate are also physical states of matter, but the NEET syllabus focuses on Solid, Liquid, and Gas states.

---

## Measurement & Significant Figures
- **SI Base Units**: Length (metre, $m$), Mass (kilogram, $kg$), Time (second, $s$), Temperature (kelvin, $K$), Electric Current (ampere, $A$), Amount of substance (mole, $mol$), Luminous intensity (candela, $cd$).
- **Key Conversion Factors**:
  - $1\\text{ L} = 1\\text{ dm}^3 = 1000\\text{ cm}^3 = 1000\\text{ mL}$
  - $K = ^\\circ\\text{C} + 273.15$
  - $1\\text{ atm} = 101,325\\text{ Pa} = 760\\text{ mm Hg} = 760\\text{ torr}; \\quad 1\\text{ bar} = 10^5\\text{ Pa}$

### Rules for Significant Figures (SF)
1. All non-zero digits are significant ($2.345 \\rightarrow 4\\text{ SF}$).
2. Zeros between non-zero digits are significant ($2005 \\rightarrow 4\\text{ SF}$).
3. Leading zeros are **never** significant ($0.0025 \\rightarrow 2\\text{ SF}$).
4. Trailing zeros are significant **only if** there is a decimal point ($2.500 \\rightarrow 4\\text{ SF}$; $2500 \\rightarrow 2\\text{ SF}$ or ambiguous).
5. Exact numbers (e.g. 20 eggs, defined conversions) have **infinite** significant figures.
"""
            },
            {
                "title": "1.2 Laws of Chemical Combination & Dalton's Atomic Theory",
                "content": """# Laws of Chemical Combination & Dalton's Theory

## Five Fundamental Chemical Laws
1. **Law of Conservation of Mass (Lavoisier)**: Mass is neither created nor destroyed in a chemical reaction.
   - Example: $2H_2 + O_2 \\rightarrow 2H_2O$ ($4\\text{ g} + 32\\text{ g} = 36\\text{ g}$).
2. **Law of Definite Proportions (Proust)**: A pure chemical compound always contains exactly the same proportion of elements by mass.
   - Example: Pure water always contains $H : O = 1 : 8$ by mass, regardless of source.
3. **Law of Multiple Proportions (Dalton)**: When two elements combine to form more than one compound, the masses of one element that combine with a fixed mass of the other are in small whole-number ratios.
   - Example: $CO$ ($12 : 16$) and $CO_2$ ($12 : 32$) $\\rightarrow$ Oxygen ratio is $16 : 32 = 1 : 2$.
4. **Gay-Lussac's Law of Gaseous Volumes**: Gases react in simple whole-number ratios by volume at constant temperature and pressure.
   - Example: $2\\text{ vol } H_2 + 1\\text{ vol } O_2 \\rightarrow 2\\text{ vol steam}$.
5. **Avogadro's Law**: Equal volumes of all gases at the same temperature and pressure contain an equal number of molecules ($22.4\\text{ L}$ of any gas at STP contains $1\\text{ mole} = 6.022 \\times 10^{23}$ molecules).

---

## Dalton's Atomic Theory Postulates
1. Matter consists of indivisible particles called atoms.
2. All atoms of a given element have identical mass and chemical properties; atoms of different elements differ.
3. Compounds are formed when atoms of different elements combine in fixed whole-number ratios.
4. Chemical reactions involve reorganization of atoms; atoms are neither created nor destroyed.

**Modern Modifications (NEET High-Yield)**:
- Atoms are divisible into subatomic particles ($e^-, p^+, n$).
- Isotopes exist (atoms of the same element with different masses, e.g. $^{35}Cl$ and $^{37}Cl$).
- Isobars exist (different elements with the same mass number, e.g. $^{40}Ar$ and $^{40}Ca$).
"""
            },
            {
                "title": "1.3 The Mole Concept, Stoichiometry & Concentration Terms",
                "content": """# The Mole Concept, Stoichiometry & Concentration Terms

## The Mole Map & Key Relationships
One mole is the amount of substance containing as many elementary entities as there are atoms in exactly $12\\text{ g}$ of $^{12}C$:
$$\\mathbf{N_A = 6.022 \\times 10^{23} \\text{ particles/mol}}$$

```
                 x N_A                    x Molar Mass (g/mol)
 NUMBER OF <-------------> MOLES <------------------------> MASS (g)
 PARTICLES       / N_A       |            / Molar Mass
                             | x 22.4 L/mol (STP: 273 K, 1 atm)
                             v
                       VOLUME OF GAS (L)
```

$$\\text{Moles } (n) = \\frac{\\text{Mass (g)}}{\\text{Molar mass (g/mol)}} = \\frac{N}{N_A} = \\frac{V\\text{ (STP in L)}}{22.4\\text{ L}}$$

### Worked Example 1 (Number of Atoms)
**Problem**: Calculate the number of total atoms in $4.4\\text{ g}$ of $CO_2$.
- Molar mass of $CO_2 = 12 + (2 \\times 16) = 44\\text{ g/mol}$
- $n = 4.4 / 44 = 0.1\\text{ mol}$
- Number of $CO_2$ molecules $= 0.1 \\times 6.022 \\times 10^{23} = 6.022 \\times 10^{22}$
- Each molecule has $3$ atoms ($1\\text{ C} + 2\\text{ O}$):
  $$\\text{Total atoms} = 3 \\times 6.022 \\times 10^{22} = \\mathbf{1.807 \\times 10^{23} \\text{ atoms}}$$

---

## Concentration Terms
| Term | Symbol & Formula | Temperature Dependent? |
|---|---|---|
| **Mass % (w/w)** | $(\\frac{\\text{mass solute}}{\\text{mass solution}}) \\times 100$ | No |
| **Mole Fraction** | $\\chi_1 = \\frac{n_1}{n_1 + n_2}; \\quad \\sum \\chi_i = 1$ | No |
| **Molarity (M)** | $M = \\frac{\\text{moles solute}}{\\text{Volume of solution in Litres}}$ | **Yes** (volume expands with T) |
| **Molality (m)** | $m = \\frac{\\text{moles solute}}{\\text{Mass of solvent in kg}}$ | **No** (mass is temperature independent) |

---

### Unit 1 Quick Revision Box
- $1\\text{ mol} = 6.022 \\times 10^{23} \\text{ particles} = \\text{Molar mass in grams} = 22.4\\text{ L gas at STP}$.
- **Limiting Reagent**: Divide available moles of each reactant by its stoichiometric coefficient; the smallest value marks the limiting reagent!
- Molality and mole fraction do not change with temperature; molarity does!
"""
            }
        ]
    },
    {
        "unit": "Unit 2: Atomic Structure",
        "description": "Subatomic particles, Rutherford model, electromagnetic spectrum, Planck quantum theory, photoelectric effect, Bohr model of H-atom, de Broglie, Heisenberg uncertainty, and quantum numbers.",
        "lessons": [
            {
                "title": "2.1 Subatomic Particles, Rutherford & Dual Nature of Light",
                "content": """# Subatomic Particles, Rutherford & Dual Nature of Light

## Discovery of Subatomic Particles
- **Electron ($e^-$)**: Discovered by J.J. Thomson via cathode ray tube experiment. $e/m = 1.76 \\times 10^{11} \\text{ C/kg}$. Millikan oil drop experiment determined charge: $e = -1.602 \\times 10^{-19}\\text{ C}$, Mass $= 9.109 \\times 10^{-31}\\text{ kg}$.
- **Proton ($p^+$)**: Goldstein (canal rays). Charge $= +1.602 \\times 10^{-19}\\text{ C}$, Mass $= 1.673 \\times 10^{-27}\\text{ kg} \\approx 1.0073\\text{ u}$.
- **Neutron ($n$)**: Chadwick (1932) by bombarding Beryllium with $\\alpha$-particles. Charge $= 0$, Mass $= 1.675 \\times 10^{-27}\\text{ kg} \\approx 1.0087\\text{ u}$.

---

## Rutherford's Alpha Scattering Experiment
- **Observations & Deductions**:
  1. Most $\\alpha$-particles pass undeflected $\\rightarrow$ Atom is mostly empty space.
  2. A small fraction deflected at large angles $\\rightarrow$ Massive, dense positive charge at center.
  3. Very few ($\approx 1$ in 20,000) rebound back ($180^\\circ$) $\\rightarrow$ Nucleus is microscopic ($10^{-15}\\text{ m}$) compared to atomic radius ($10^{-10}\\text{ m}$).
- **Limitations**: Classical Maxwell electrodynamics dictates accelerating electrons must radiate energy and spiral into the nucleus within $10^{-8}\\text{ s}$.

---

## Electromagnetic Radiation & Planck's Quantum Theory
$$c = \\nu \\lambda \\quad (c = 3 \\times 10^8\\text{ m/s}), \\quad \\bar{\\nu} = \\frac{1}{\\lambda}$$
Energy is emitted or absorbed in discrete packets called quanta (photons):
$$E = h\\nu = \\frac{hc}{\\lambda} \\quad (h = 6.626 \\times 10^{-34}\\text{ J s})$$
**Photoelectric Effect (Einstein)**:
$$h\\nu = h\\nu_0 + K_{max} = W_0 + \\frac{1}{2}m v_{max}^2$$
- Work function $W_0 = h\\nu_0 = \\frac{hc}{\\lambda_0}$.
- $K_{max} = e V_0$ (where $V_0$ is the stopping potential).
"""
            },
            {
                "title": "2.2 Bohr's Model & Hydrogen Spectral Series",
                "content": """# Bohr's Model & Hydrogen Spectral Series

## Postulates of Bohr's Model
1. Electrons revolve around the nucleus in specific non-radiating circular orbits (stationary states).
2. Quantisation of Angular Momentum:
   $$m v r = \\frac{n h}{2\\pi} \\quad (n = 1, 2, 3, \\dots)$$
3. Energy emitted/absorbed only when jumping between states:
   $$\\Delta E = E_2 - E_1 = h\\nu = \\frac{hc}{\\lambda}$$

## Derived Formulae for Hydrogen-like Species ($H, He^+, Li^{2+}, Be^{3+}$)
- **Radius**: $r_n = 0.529 \\times \\frac{n^2}{Z} \\text{ \\AA} \\quad (a_0 = 0.529\\text{ \\AA})$
- **Velocity**: $v_n = 2.18 \\times 10^6 \\times \\frac{Z}{n} \\text{ m/s}$
- **Total Energy**: $E_n = -13.6 \\times \\frac{Z^2}{n^2} \\text{ eV} = -2.18 \\times 10^{-18} \\times \\frac{Z^2}{n^2} \\text{ J}$
- **Ionisation Energy of Hydrogen**: $13.6\\text{ eV}$ (transition from $n=1 \\rightarrow \\infty$).

---

## Rydberg Formula & Hydrogen Spectral Lines
$$\\frac{1}{\\lambda} = R_H Z^2 \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right), \\quad R_H = 1.097 \\times 10^7\\text{ m}^{-1}$$

| Spectral Series | $n_1$ | $n_2$ | Spectral Region |
|---|---|---|---|
| **Lyman** | 1 | 2, 3, 4, ... | **Ultraviolet (UV)** |
| **Balmer** | 2 | 3, 4, 5, ... | **Visible** |
| **Paschen** | 3 | 4, 5, 6, ... | **Infrared (IR)** |
| **Brackett** | 4 | 5, 6, 7, ... | **Infrared (IR)** |
| **Pfund** | 5 | 6, 7, 8, ... | **Far Infrared** |

> **NEET Formula**: Total number of spectral lines emitted when electron de-excites from level $n$ to ground state:
> $$N = \\frac{n(n - 1)}{2}$$
"""
            },
            {
                "title": "2.3 Quantum Mechanical Model, Orbitals & Electronic Configuration",
                "content": """# Quantum Mechanical Model, Orbitals & Electronic Configuration

## Dual Nature of Matter & Uncertainty Principle
- **de Broglie Equation**:
  $$\\lambda = \\frac{h}{p} = \\frac{h}{mv}$$
- **Heisenberg's Uncertainty Principle**:
  $$\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi} \\quad \\text{or} \\quad \\Delta x \\cdot m \\Delta v \\ge \\frac{h}{4\\pi}$$

---

## The Four Quantum Numbers
1. **Principal ($n$)**: Determines shell, size, and main energy level ($n = 1, 2, 3, \\dots$). Maximum electrons in a shell $= 2n^2$.
2. **Azimuthal ($l$)**: Determines subshell and orbital shape ($l = 0 \\text{ to } n-1$).
   - $l=0 (s, \\text{spherical}), \\quad l=1 (p, \\text{dumbbell}), \\quad l=2 (d, \\text{double dumbbell}), \\quad l=3 (f, \\text{complex})$.
   - Orbital angular momentum: $L = \\sqrt{l(l+1)} \\frac{h}{2\\pi}$.
3. **Magnetic ($m_l$)**: Spatial orientation in magnetic field ($m_l = -l \\text{ to } +l$, total $2l+1$ values).
4. **Spin ($m_s$)**: Electron intrinsic spin orientation ($+\\frac{1}{2}$ or $-\\frac{1}{2}$).
   - Spin-only magnetic moment: $\\mu = \\sqrt{n(n+2)} \\text{ BM}$ ($n = \\text{unpaired electrons}$).

---

## Rules for Electronic Filling
- **Aufbau Principle**: Electrons fill lower energy orbitals first according to $(n+l)$ rule. If two orbitals have same $(n+l)$, lower $n$ fills first.
  - Energy order: $1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p < 5s < 4d < 5p < 6s < 4f < 5d < 6p < 7s$
- **Pauli Exclusion Principle**: No two electrons in an atom can have all four quantum numbers identical. An orbital holds maximum 2 electrons with opposite spins.
- **Hund's Rule of Maximum Multiplicity**: Pairing does not occur in degenerate orbitals until each orbital holds one electron with parallel spin.
- **NEET High-Yield Anomalies**:
  - Chromium ($Z=24$): $[Ar] 3d^5 4s^1$ (not $3d^4 4s^2$) due to extra stability of half-filled subshell.
  - Copper ($Z=29$): $[Ar] 3d^{10} 4s^1$ (not $3d^9 4s^2$) due to fully-filled subshell stability.
"""
            }
        ]
    },
    {
        "unit": "Unit 3: Chemical Bonding and Molecular Structure",
        "description": "Kossel-Lewis approach, ionic bonds, lattice enthalpy, Born-Haber cycle, covalent parameters, electronegativity, dipole moment, VSEPR theory, VBT hybridisation, MOT, and hydrogen bonding.",
        "lessons": [
            {
                "title": "3.1 Ionic & Covalent Bonding, Born-Haber & Fajan's Rules",
                "content": """# Ionic & Covalent Bonding, Born-Haber & Fajan's Rules

## Types of Chemical Bonds
- **Ionic (Electrovalent)**: Complete transfer of electrons from metal (low IE) to non-metal (high negative $\\Delta_{eg}H$).
- **Covalent**: Mutual sharing of valence electron pairs between atoms of similar electronegativities.
- **Coordinate (Dative)**: Both shared electrons provided by a single donor atom ($NH_4^+, H_3O^+$).

---

## Lattice Enthalpy & Born-Haber Cycle for NaCl
Lattice enthalpy is the energy released when 1 mole of crystalline ionic solid forms from its gaseous ions:
$$\\Delta_f H^\\circ = \\Delta_{sub} H + IE_1 + \\frac{1}{2} D_{Cl-Cl} + \\Delta_{eg} H + (-U_L)$$
- Lattice energy increases with **higher ionic charge** ($q_1 q_2$) and **smaller ionic radii** ($r_c + r_a$).

---

## Fajan's Rules: Covalent Character in Ionic Compounds
Ionic bonds develop covalent character when the cation polarises the electron cloud of the anion:
1. **Small Cation Size**: High charge density $\\rightarrow$ Strong polarising power ($LiCl > NaCl > KCl$).
2. **Large Anion Size**: Loosely bound valence electrons $\\rightarrow$ High polarisability ($LiI > LiBr > LiCl > LiF$).
3. **High Charge**: Greater electrostatic distortion ($AlCl_3 > MgCl_2 > NaCl$).
4. **Pseudo-Noble Gas Configuration ($ns^2 np^6 nd^{10}$)**: Transition metal cations like $Cu^+, Ag^+$ polarise anions much more effectively than noble-gas cations like $Na^+, K^+$ ($AgCl > NaCl$ covalent character).
"""
            },
            {
                "title": "3.2 VSEPR Theory, Hybridisation & Molecular Geometry",
                "content": """# VSEPR Theory, Hybridisation & Molecular Geometry

## VSEPR Theory (Valence Shell Electron Pair Repulsion)
Repulsion Magnitude:
$$\\mathbf{\\text{Lone Pair - Lone Pair} > \\text{Lone Pair - Bond Pair} > \\text{Bond Pair - Bond Pair}}$$

### Steric Number (SN) Calculation:
$$SN = \\frac{1}{2} [V + M - C + A]$$
where $V = \\text{valence electrons on central atom}$, $M = \\text{monovalent atoms (H, F, Cl, Br, I)}$, $C = \\text{cationic charge}$, $A = \\text{anionic charge}$.

| Total Pairs | Lone Pairs | Hybridisation | Geometry / Shape | Examples | Bond Angle |
|---|---|---|---|---|---|
| **2** | 0 | $sp$ | Linear | $BeCl_2, CO_2$ | $180^\\circ$ |
| **3** | 0 | $sp^2$ | Trigonal Planar | $BF_3, BCl_3$ | $120^\\circ$ |
| **3** | 1 | $sp^2$ | Bent / V-shaped | $SO_2, O_3$ | $< 120^\\circ$ |
| **4** | 0 | $sp^3$ | Tetrahedral | $CH_4, CCl_4$ | $109.5^\\circ$ |
| **4** | 1 | $sp^3$ | Trigonal Pyramidal | $NH_3$ | $107^\\circ$ |
| **4** | 2 | $sp^3$ | Bent (V-shaped) | $H_2O$ | $104.5^\\circ$ |
| **5** | 0 | $sp^3d$ | Trigonal Bipyramidal | $PCl_5$ | $90^\\circ, 120^\\circ$ |
| **5** | 1 | $sp^3d$ | See-saw | $SF_4$ | $< 90^\\circ, < 120^\\circ$ |
| **5** | 2 | $sp^3d$ | T-shaped | $ClF_3$ | $< 90^\\circ$ |
| **5** | 3 | $sp^3d$ | Linear | $XeF_2, I_3^-$ | $180^\\circ$ |
| **6** | 0 | $sp^3d^2$ | Octahedral | $SF_6$ | $90^\\circ$ |
| **6** | 1 | $sp^3d^2$ | Square Pyramidal | $BrF_5$ | $< 90^\\circ$ |
| **6** | 2 | $sp^3d^2$ | Square Planar | $XeF_4$ | $90^\\circ$ |
"""
            },
            {
                "title": "3.3 Molecular Orbital Theory (MOT) & Hydrogen Bonding",
                "content": """# Molecular Orbital Theory (MOT) & Hydrogen Bonding

## Principles of MOT
- Linear Combination of Atomic Orbitals (LCAO) produces bonding MOs (lower energy, constructive) and antibonding MOs (higher energy, destructive).
$$\\text{Bond Order} = \\frac{1}{2} (N_b - N_a)$$
- If $\\text{Bond Order} > 0$, molecule is stable. Higher bond order means shorter bond length and higher bond dissociation enthalpy.
- If unpaired electrons exist $\\rightarrow$ **Paramagnetic**; all electrons paired $\\rightarrow$ **Diamagnetic**.

### MO Energy Order
1. **For $O_2, F_2$ (>14 electrons)**:
   $$\\sigma 1s < \\sigma^* 1s < \\sigma 2s < \\sigma^* 2s < \\sigma 2p_z < (\\pi 2p_x = \\pi 2p_y) < (\\pi^* 2p_x = \\pi^* 2p_y) < \\sigma^* 2p_z$$
   - $O_2$ (16 electrons): $N_b = 10, N_a = 6 \\rightarrow \\text{Bond Order} = 2$. Has 2 unpaired electrons in $\\pi^* 2p_x, \\pi^* 2p_y \\rightarrow$ **Paramagnetic** (Crucial NEET question!).
2. **For $B_2, C_2, N_2$ ($\\le 14$ electrons)**:
   $$\\sigma 1s < \\sigma^* 1s < \\sigma 2s < \\sigma^* 2s < (\\pi 2p_x = \\pi 2p_y) < \\sigma 2p_z < (\\pi^* 2p_x = \\pi^* 2p_y) < \\sigma^* 2p_z$$
   - $C_2$ (12 electrons): Bond order $= 2$, and **both** bonds are $\\pi$ bonds (no $\\sigma$ bond!).

---

## Hydrogen Bonding
- Electrostatic attraction between hydrogen attached to strongly electronegative atoms ($F, O, N$) and a lone pair on another electronegative atom.
- **Intermolecular**: Between distinct molecules ($H_2O, HF, NH_3$). Increases boiling point, viscosity, and surface tension.
- **Intramolecular**: Within the same molecule (o-nitrophenol, salicylaldehyde). Lowers boiling point, increases volatility (enables steam distillation).
"""
            }
        ]
    },
    {
        "unit": "Unit 4: Chemical Thermodynamics",
        "description": "System and surroundings, state functions, first law, work, heat capacity, enthalpy, thermochemistry, Hess law, second law, entropy, and Gibbs free energy spontaneity.",
        "lessons": [
            {
                "title": "4.1 First Law of Thermodynamics, Enthalpy & Hess's Law",
                "content": """# First Law of Thermodynamics, Enthalpy & Hess's Law

## Fundamentals & First Law
- **System**: Part of universe under observation (Open: mass + energy exchange; Closed: energy only; Isolated: neither).
- **State Functions**: Independent of path ($U, H, S, G, P, V, T$).
- **First Law Equation**:
  $$\\Delta U = q + w$$
  (IUPAC Sign Convention: Heat absorbed by system $= +q$; Work done on system $= +w$; Work done by system $= -w = -P_{ext}\\Delta V$).

- **Isothermal Reversible Expansion of Ideal Gas**:
  $$w = -2.303\\, nRT \\log\\left(\\frac{V_2}{V_1}\\right) = -2.303\\, nRT \\log\\left(\\frac{P_1}{P_2}\\right)$$

- **Enthalpy ($H = U + PV$)**:
  $$\\Delta H = \\Delta U + \\Delta n_g RT$$
  where $\\Delta n_g = \\text{moles of gaseous products} - \\text{moles of gaseous reactants}$.

---

## Thermochemistry & Hess's Law
- **Hess's Law of Constant Heat Summation**: Enthalpy change of a reaction is constant whether it occurs in one step or several successive steps:
  $$\\Delta_r H^\\circ = \\sum \\Delta_f H^\\circ (\\text{products}) - \\sum \\Delta_f H^\\circ (\\text{reactants})$$
- By international convention, standard enthalpy of formation $\\Delta_f H^\\circ$ of pure elements in standard states is **zero** ($O_2(g), C(graphite), Br_2(l), H_2(g)$).
"""
            },
            {
                "title": "4.2 Second Law, Entropy & Gibbs Free Energy Spontaneity",
                "content": """# Second Law, Entropy & Gibbs Free Energy Spontaneity

## Entropy ($S$) & Spontaneity
Entropy is the quantitative thermodynamic measure of molecular randomness or microscopic disorder:
$$\\Delta S = \\frac{q_{rev}}{T}$$
- **Second Law of Thermodynamics**: In any spontaneous process, total entropy of the universe always increases:
  $$\\Delta S_{total} = \\Delta S_{system} + \\Delta S_{surroundings} > 0$$

---

## Gibbs Free Energy ($G = H - TS$)
At constant temperature and pressure:
$$\\mathbf{\\Delta G = \\Delta H - T\\Delta S}$$

### Criteria for Spontaneity:
| $\\Delta H$ | $\\Delta S$ | $\\Delta G = \\Delta H - T\\Delta S$ | Reaction Spontaneity |
|---|---|---|---|
| **Negative ($-$)** | **Positive ($+$)** | Always **Negative ($-$)** | **Spontaneous at all temperatures** |
| **Positive ($+$)** | **Negative ($-$)** | Always **Positive ($+$)** | **Non-spontaneous at all temperatures** |
| **Negative ($-$)** | **Negative ($-$)** | Negative at low $T$ | **Spontaneous at low temperatures** |
| **Positive ($+$)** | **Positive ($+$)** | Negative at high $T$ | **Spontaneous at high temperatures** |

- At equilibrium: $\\Delta G = 0 \\implies T_{eq} = \\frac{\\Delta H}{\\Delta S}$.
- Relationship with Equilibrium Constant:
  $$\\mathbf{\\Delta G^\\circ = -RT \\ln K = -2.303\\, RT \\log K}$$
"""
            }
        ]
    },
    {
        "unit": "Unit 5: Solutions",
        "description": "Concentrations, Henry law, Raoult law, ideal and non-ideal solutions, azeotropes, colligative properties, van 't Hoff factor, and abnormal molar masses.",
        "lessons": [
            {
                "title": "5.1 Henry's Law, Raoult's Law & Azeotropes",
                "content": """# Henry's Law, Raoult's Law & Azeotropes

## Solubility of Gases in Liquids: Henry's Law
The partial pressure of gas above liquid is directly proportional to its mole fraction in solution:
$$p = K_H \\chi$$
- Higher $K_H$ at same pressure implies **lower solubility**.
- $K_H$ increases with temperature $\\rightarrow$ gas solubility decreases upon heating (aquatic species thrive in cold water).
- Applications: Soft drink bottles pressurized with $CO_2$; deep-sea divers use Helium-diluted air to avoid bends; high altitude anoxia.

---

## Raoult's Law for Binary Solutions
For volatile liquids: $p_A = \\chi_A p_A^\\circ$ and $p_B = \\chi_B p_B^\\circ$. Total pressure:
$$P_{total} = p_A + p_B = \\chi_A p_A^\\circ + \\chi_B p_B^\\circ = p_A^\\circ + (p_B^\\circ - p_A^\\circ)\\chi_B$$

### Ideal vs Non-Ideal Solutions:
| Property | Ideal Solution | Positive Deviation (+ve) | Negative Deviation (-ve) |
|---|---|---|---|
| **Intermolecular Forces** | $A-B = A-A, B-B$ | $A-B$ is **weaker** | $A-B$ is **stronger** |
| **$\\Delta H_{mix}$** | $0$ | $> 0$ (Endothermic) | $< 0$ (Exothermic) |
| **$\\Delta V_{mix}$** | $0$ | $> 0$ (Volume increases) | $< 0$ (Volume contracts) |
| **Examples** | Benzene + Toluene, n-Hexane + n-Heptane | Ethanol + Acetone, $CS_2$ + Acetone | Chloroform + Acetone, $HNO_3$ + $H_2O$ |
| **Azeotrope Type** | None | **Minimum boiling** (95.6% ethanol) | **Maximum boiling** (68% $HNO_3$) |
"""
            },
            {
                "title": "5.2 Colligative Properties & van 't Hoff Factor",
                "content": """# Colligative Properties & van 't Hoff Factor

## The Four Colligative Properties
Colligative properties depend strictly on the **number of solute particles**, not their chemical identity.

1. **Relative Lowering of Vapour Pressure**:
   $$\\frac{p^\\circ - p}{p^\\circ} = i \\chi_{solute} = i \\frac{n_2}{n_1 + n_2}$$
2. **Elevation of Boiling Point**:
   $$\\Delta T_b = i K_b m \\quad \\left(K_b = \\text{ebullioscopic constant, water } = 0.52\\text{ K kg/mol}\\right)$$
3. **Depression of Freezing Point**:
   $$\\Delta T_f = i K_f m \\quad \\left(K_f = \\text{cryoscopic constant, water } = 1.86\\text{ K kg/mol}\\right)$$
4. **Osmotic Pressure**:
   $$\\Pi = i C R T = i \\left(\\frac{n}{V}\\right) R T$$

---

## van 't Hoff Factor ($i$) & Abnormal Molar Mass
$$i = \\frac{\\text{Observed Colligative Property}}{\\text{Calculated Property}} = \\frac{\\text{Normal Molar Mass}}{\\text{Observed Molar Mass}} = \\frac{\\text{Total particles after association/dissociation}}{\\text{Particles before}}$$
- **Dissociation** (electrolytes): $\\alpha = \\frac{i - 1}{n - 1}$
  - For $NaCl$ ($n=2$): $i \\rightarrow 2$.
  - For $CaCl_2$ ($n=3$): $i \\rightarrow 3$.
  - For $K_4[Fe(CN)_6]$ ($n=5$): $i \\rightarrow 5$.
- **Association** (e.g. Acetic acid dimerizes in benzene):
  $$i = 1 - \\alpha \\left(1 - \\frac{1}{n}\\right)$$
"""
            }
        ]
    },
    {
        "unit": "Unit 6: Equilibrium",
        "description": "Dynamic equilibrium, Kc and Kp, Le Chatelier principle, ionic equilibrium, Ostwald dilution law, pH calculations, common ion effect, buffer systems, and Ksp.",
        "lessons": [
            {
                "title": "6.1 Chemical Equilibrium & Le Chatelier's Principle",
                "content": """# Chemical Equilibrium & Le Chatelier's Principle

## Equilibrium Constants $K_c$ and $K_p$
For reversible reaction: $aA + bB \\rightleftharpoons cC + dD$
$$K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}, \\quad K_p = \\frac{(p_C)^c (p_D)^d}{(p_A)^a (p_B)^b}$$
$$\\mathbf{K_p = K_c (RT)^{\\Delta n_g}}$$
- If $\\Delta n_g = 0 \\implies K_p = K_c$ (e.g. $H_2 + I_2 \\rightleftharpoons 2HI$).
- If $\\Delta n_g > 0 \\implies K_p > K_c$ (e.g. $PCl_5 \\rightleftharpoons PCl_3 + Cl_2$).
- If $\\Delta n_g < 0 \\implies K_p < K_c$ (e.g. $N_2 + 3H_2 \\rightleftharpoons 2NH_3$).

---

## Le Chatelier's Principle
If a stress (change in concentration, pressure, volume, or temperature) is applied to an equilibrium system, the system shifts to counteract that disturbance:
- **Concentration**: Adding reactant shifts **Forward**; adding product shifts **Reverse**.
- **Pressure Increase**: Shifts toward side with **fewer moles of gas**.
- **Temperature Increase**: Shifts in **endothermic direction** ($\\Delta H > 0$); changes value of $K$.
- **Catalyst**: Accelerates forward and reverse rates equally; **does not shift** equilibrium position or change $K$.
- **Inert Gas Addition**:
  - At constant volume $\\rightarrow$ **No shift**.
  - At constant pressure $\\rightarrow$ Shifts toward **more gaseous moles**.
"""
            },
            {
                "title": "6.2 Ionic Equilibrium, pH, Buffer Solutions & Solubility Product",
                "content": """# Ionic Equilibrium, pH, Buffer Solutions & Ksp

## Ostwald Dilution Law & pH Calculations
- Degree of ionisation of weak electrolyte: $\\alpha = \\sqrt{\\frac{K_a}{C}}$
- $[H^+] = \\sqrt{K_a C} = C\\alpha$
- $pH = -\\log[H^+], \\quad pOH = -\\log[OH^-], \\quad pH + pOH = 14 \\quad (\\text{at } 25^\\circ\\text{C})$

---

## Buffer Solutions & Henderson-Hasselbalch Equation
Resist changes in $pH$ upon addition of small amounts of strong acid or base.
- **Acidic Buffer** (Weak acid + Salt with strong base, e.g. $CH_3COOH + CH_3COONa$):
  $$pH = pK_a + \\log\\left(\\frac{[\\text{Salt}]}{[\\text{Acid}]}\\right)$$
- **Basic Buffer** (Weak base + Salt with strong acid, e.g. $NH_4OH + NH_4Cl$):
  $$pOH = pK_b + \\log\\left(\\frac{[\\text{Salt}]}{[\\text{Base}]}\\right)$$

---

## Solubility Product ($K_{sp}$) & Common Ion Effect
For sparingly soluble salt $A_x B_y(s) \\rightleftharpoons x A^{y+}(aq) + y B^{x-}(aq)$:
$$K_{sp} = [A^{y+}]^x [B^{x-}]^y = x^x y^y s^{x+y}$$
- $AB$ salt ($AgCl$): $K_{sp} = s^2 \\implies s = \\sqrt{K_{sp}}$
- $AB_2$ salt ($CaF_2$): $K_{sp} = 4s^3 \\implies s = \\sqrt[3]{\\frac{K_{sp}}{4}}$
- $A_2 B_3$ salt ($As_2S_3$): $K_{sp} = 108s^5$
- Precipitation occurs when Ionic Product ($Q_{sp}$) exceeds $K_{sp}$.
"""
            }
        ]
    },
    {
        "unit": "Unit 7: Redox Reactions and Electrochemistry",
        "description": "Oxidation states, balancing redox reactions, electrolytic conductance, Kohlrausch law, galvanic cells, Nernst equation, Gibbs energy, Faraday laws, and batteries.",
        "lessons": [
            {
                "title": "7.1 Redox Reactions, Balancing & Electrochemical Cells",
                "content": """# Redox Reactions, Balancing & Electrochemical Cells

## Oxidation Numbers & Balancing
- Oxidation = loss of electrons / increase in oxidation number.
- Reduction = gain of electrons / decrease in oxidation number.
- Rules: Fluorine always $-1$; Oxygen usually $-2$ (peroxides $-1$, $OF_2 +2$); Hydrogen $+1$ (metal hydrides $-1$).

---

## Galvanic (Voltaic) Daniell Cell
$$\\text{Anode: } Zn(s) \\rightarrow Zn^{2+}(aq) + 2e^- \\quad (\\text{Oxidation, Negative electrode})$$
$$\\text{Cathode: } Cu^{2+}(aq) + 2e^- \\rightarrow Cu(s) \\quad (\\text{Reduction, Positive electrode})$$
- Cell Representation: $Zn(s) | Zn^{2+}(1M) || Cu^{2+}(1M) | Cu(s)$
- Standard Cell Potential:
  $$E^\\circ_{cell} = E^\\circ_{cathode} - E^\\circ_{anode} = 0.34\\text{ V} - (-0.76\\text{ V}) = \\mathbf{+1.10\\text{ V}}$$

---

## The Nernst Equation
At $298\\text{ K}$ ($25^\\circ\\text{C}$):
$$\\mathbf{E_{cell} = E^\\circ_{cell} - \\frac{0.0591}{n} \\log Q}$$
$$\\Delta G^\\circ = -n F E^\\circ_{cell} = -2.303\\, RT \\log K_c$$
where $F = 96,500\\text{ C/mol}$.
"""
            },
            {
                "title": "7.2 Kohlrausch's Law, Electrolysis & Commercial Batteries",
                "content": """# Kohlrausch's Law, Electrolysis & Commercial Batteries

## Electrolytic Conductance
- Specific conductance $\\kappa = G \\times \\left(\\frac{l}{A}\\right)$
- Molar conductance: $\\Lambda_m = \\frac{\\kappa \\times 1000}{C} \\quad (S\\text{ cm}^2\\text{ mol}^{-1})$
- **Kohlrausch's Law of Independent Migration**: At infinite dilution, each ion contributes independently to molar conductivity:
  $$\\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ$$
  Application: Determine degree of dissociation $\\alpha = \\frac{\\Lambda_m}{\\Lambda_m^\\circ}$ and $K_a = \\frac{C\\alpha^2}{1-\\alpha}$.

---

## Faraday's Laws of Electrolysis
1. **First Law**: Mass deposited $w = Z I t = \\left(\\frac{E}{96500}\\right) I t$ where $E = \\frac{\\text{Molar mass}}{\\text{valency factor}}$.
2. **Second Law**: $\\frac{w_1}{w_2} = \\frac{E_1}{E_2}$ for identical electric charge passed through series cells.

---

## Batteries & Fuel Cells
- **Lead Storage Cell** (Secondary/Rechargeable):
  - Discharge: $Pb(s) + PbO_2(s) + 2H_2SO_4(aq) \\rightarrow 2PbSO_4(s) + 2H_2O(l)$ (density of $H_2SO_4$ drops below $1.20\\text{ g/mL}$).
- **Hydrogen-Oxygen Fuel Cell**:
  - High efficiency ($\approx 70\\%$), pollution-free, produces pure drinking water in spacecrafts.
"""
            }
        ]
    },
    {
        "unit": "Unit 8: Chemical Kinetics",
        "description": "Reaction rates, factors affecting rate, rate law, order and molecularity, integrated rate equations, half-life, Arrhenius equation, and collision theory.",
        "lessons": [
            {
                "title": "8.1 Reaction Rate, Order, Molecularity & Integrated Equations",
                "content": """# Reaction Rate, Order, Molecularity & Integrated Equations

## Rate of Reaction & Rate Law
For $aA + bB \\rightarrow cC + dD$:
$$\\text{Rate} = -\\frac{1}{a}\\frac{d[A]}{dt} = -\\frac{1}{b}\\frac{d[B]}{dt} = +\\frac{1}{c}\\frac{d[C]}{dt} = +\\frac{1}{d}\\frac{d[D]}{dt} = k [A]^p [B]^q$$
- Overall Order $= p + q$ (experimental, can be zero, fractional, or negative).
- Molecularity = number of reacting species in elementary step (integer: 1, 2, or 3 only; never zero or fractional).

---

## Integrated Rate Laws & Half-Life
| Order | Integrated Equation | Straight-line Plot | Half-life ($t_{1/2}$) | Units of $k$ |
|---|---|---|---|---|
| **Zero** | $[A] = [A]_0 - kt$ | $[A]$ vs $t$ (slope $-k$) | $t_{1/2} = \\frac{[A]_0}{2k}$ | $\\text{mol L}^{-1}\\text{ s}^{-1}$ |
| **First** | $k = \\frac{2.303}{t}\\log\\left(\\frac{[A]_0}{[A]}\\right)$ | $\\ln[A]$ vs $t$ (slope $-k$) | $t_{1/2} = \\frac{0.693}{k}$ (Independent of $[A]_0$) | $\\text{s}^{-1}$ |

> **NEET High-Yield First Order Relations**:
> $t_{75\\%} = 2\\, t_{1/2}, \\quad t_{87.5\\%} = 3\\, t_{1/2}, \\quad t_{99.9\\%} \\approx 10\\, t_{1/2}$.
"""
            },
            {
                "title": "8.2 Arrhenius Equation & Collision Theory",
                "content": """# Arrhenius Equation & Collision Theory

## Temperature Dependence: Arrhenius Equation
Reaction rate roughly doubles for every $10^\\circ\\text{C}$ rise in temperature:
$$k = A e^{-E_a / RT}$$
$$\\ln k = \\ln A - \\frac{E_a}{RT} \\implies \\log k = \\log A - \\frac{E_a}{2.303\\, RT}$$
- Graph of $\\log k$ vs $\\frac{1}{T}$ gives a straight line with slope $= -\\frac{E_a}{2.303\\, R}$.
- Ratio at two temperatures:
  $$\\mathbf{\\log\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{2.303\\, R}\\left[\\frac{T_2 - T_1}{T_1 T_2}\\right]}$$

---

## Collision Theory of Chemical Reactions
$$\\text{Rate} = Z_{AB} \\cdot P \\cdot e^{-E_a / RT}$$
- $Z_{AB}$: Collision frequency between reacting molecules.
- $e^{-E_a / RT}$: Fraction of molecules possessing energy $\\ge$ Activation Energy ($E_a$).
- $P$: Steric / probability factor ensuring proper spatial orientation.
- **Catalyst Effect**: Provides an alternative reaction pathway with lower activation energy ($E_a$), speeding both forward and reverse rates equally without changing $\\Delta H$ or $K_{eq}$.
"""
            }
        ]
    },
    {
        "unit": "Unit 9: Classification of Elements and Periodicity",
        "description": "Modern periodic law, s, p, d, f blocks, periodic trends in atomic radii, ionisation enthalpy, electron gain enthalpy, electronegativity, and anomalous properties.",
        "lessons": [
            {
                "title": "9.1 Modern Periodic Table & Periodic Trends",
                "content": """# Modern Periodic Table & Periodic Trends

## Modern Periodic Law (Moseley)
Physical and chemical properties of elements are periodic functions of their **atomic numbers** ($Z$):
$$\\sqrt{\\nu} = a(Z - b)$$
- 18 Groups (vertical columns) and 7 Periods (horizontal rows).

---

## Master Periodic Trends Summary
1. **Effective Nuclear Charge ($Z_{eff} = Z - \\sigma$)**: Increases across period, stays nearly constant down group.
2. **Atomic Radii**:
   - Decreases across a period (increasing $Z_{eff}$).
   - Increases down a group (addition of new principal shells).
   - Order: $\\text{van der Waals radius} > \\text{Metallic radius} > \\text{Covalent radius}$.
3. **Ionic Radii**:
   - Cation $<$ Parent atom (e.g. $Na^+ < Na$).
   - Anion $>$ Parent atom (e.g. $Cl^- > Cl$).
   - **Isoelectronic Series**: Higher atomic number ($Z$) $\\rightarrow$ smaller ionic radius:
     $$Al^{3+} < Mg^{2+} < Na^+ < Ne < F^- < O^{2-} < N^{3-}$$
4. **Ionisation Enthalpy ($IE$)**:
   - Increases across period, decreases down group.
   - **NEET High-Yield Exceptions**:
     - $Be > B$ ($2s^2$ fully filled vs $2p^1$).
     - $N > O$ ($2p^3$ half-filled vs $2p^4$).
5. **Electron Gain Enthalpy ($\\Delta_{eg}H$)**:
   - Cl has more negative electron gain enthalpy than F (due to compact $2p$ subshell in F causing intense inter-electronic repulsion):
     $$\\mathbf{Cl > F > Br > I}$$
     $$\\mathbf{S > O}$$
"""
            }
        ]
    },
    {
        "unit": "Unit 10: p-Block Elements (Groups 13–18)",
        "description": "Group 13 to Group 18 chemistry: Boron, Carbon, Nitrogen, Oxygen, Halogens, Noble gases, anomalous properties, structures, and key industrial compounds.",
        "lessons": [
            {
                "title": "10.1 Group 13 (Boron) & Group 14 (Carbon) Family",
                "content": """# Group 13 (Boron) & Group 14 (Carbon) Family

## Group 13: Boron Family ($ns^2 np^1$)
- **Inert Pair Effect**: Reluctance of $s$-electrons to participate in bonding $\\rightarrow$ $+1$ oxidation state becomes increasingly stable down the group ($Tl^+ > Tl^{3+}$).
- **Lewis Acid Strength**: $BF_3 < BCl_3 < BBr_3 < BI_3$ (due to $p\\pi - p\\pi$ back-bonding efficiency being maximum in $BF_3$).
- **Diborane ($B_2H_6$)**:
  - Electron deficient molecule with two $3\\text{c}-2\\text{e}^-$ (banana/bridge) bonds and four terminal $2\\text{c}-2\\text{e}^-$ $B-H$ bonds.
- **Borax ($Na_2B_4O_7 \\cdot 10H_2O$)**:
  - Forms glassy bead ($NaBO_2 + B_2O_3$) used in qualitative identification of transition metal cations.

---

## Group 14: Carbon Family ($ns^2 np^2$)
- Catenation: $C \\gg Si > Ge \\approx Sn > Pb$.
- **Allotropes of Carbon**:
  - **Diamond**: $sp^3$, rigid 3D tetrahedral network, hardest natural substance, electrical insulator.
  - **Graphite**: $sp^2$, planar hexagonal layers held by van der Waals forces, conductor (delocalized $\\pi$ electrons), lubricant.
  - **Fullerenes ($C_{60}$)**: Soccer-ball shape, 20 six-membered rings and 12 five-membered rings.
- **Silicates & Silicones**:
  - Silicones: Hydrophobic organosilicon polymers $(R_2SiO)_n$ from hydrolysis of $R_2SiCl_2$.
  - Zeolites: Microporous aluminosilicates used as shape-selective catalysts (e.g. ZSM-5 turns alcohols into petrol).
"""
            },
            {
                "title": "10.2 Groups 15–18: Nitrogen, Oxygen, Halogens & Noble Gases",
                "content": """# Groups 15–18: Nitrogen, Oxygen, Halogens & Noble Gases

## Group 15: Nitrogen Family ($ns^2 np^3$)
- Basicity of Hydrides: $NH_3 > PH_3 > AsH_3 > SbH_3 > BiH_3$.
- Boiling points: $PH_3 < AsH_3 < NH_3 < SbH_3 < BiH_3$ ($NH_3$ is high due to intermolecular H-bonding).
- Nitric Acid ($HNO_3$ by Ostwald Process):
  - Passivates $Al, Cr, Fe$ by forming protective oxide skin.
  - Brown ring test for nitrate ($NO_3^-$): $[Fe(H_2O)_5(NO)]^{2+}$.

---

## Group 16: Oxygen Family ($ns^2 np^4$)
- Hydride acidic strength: $H_2O < H_2S < H_2Se < H_2Te$.
- Ozone ($O_3$): Strong oxidant; depletes via chlorofluorocarbons ($CF_2Cl_2 \\xrightarrow{h\\nu} \\dot{C}l$).
- Sulfuric Acid ($H_2SO_4$ via Contact Process): $V_2O_5$ catalyst at $720\\text{ K}, 2\\text{ bar}$. Strong dehydrating and oxidising agent.

---

## Group 17: Halogens ($ns^2 np^5$) & Group 18: Noble Gases ($ns^2 np^6$)
- **Halogen Oxidising Power**: $F_2 > Cl_2 > Br_2 > I_2$.
- **Bond Dissociation Enthalpy**: $Cl_2 > Br_2 > F_2 > I_2$ ($F_2$ is lower due to lone-pair repulsion).
- **Xenon Compounds**:
  - $XeF_2$ ($sp^3d$, Linear shape, 3 lone pairs)
  - $XeF_4$ ($sp^3d^2$, Square planar shape, 2 lone pairs)
  - $XeF_6$ ($sp^3d^3$, Distorted octahedral shape, 1 lone pair)
  - $XeO_3$ ($sp^3$, Pyramidal shape, 1 lone pair)
"""
            }
        ]
    },
    {
        "unit": "Unit 11: d- and f-Block Elements",
        "description": "3d transition metals, electronic configurations, oxidation states, magnetic properties, catalytic activity, interstitial alloys, K2Cr2O7, KMnO4, and Lanthanoids/Actinoids.",
        "lessons": [
            {
                "title": "11.1 Transition Elements (3d Series) & Important Compounds",
                "content": """# Transition Elements (3d Series) & Important Compounds

## General Characteristics of Transition Elements
Transition elements have incompletely filled $d$-orbitals in ground state or common oxidation states. $Zn, Cd, Hg$ ($d^{10}$) are not considered typical transition metals.
- **Variable Oxidation States**: From $+2$ up to $+7$ for Manganese ($Mn: [Ar] 3d^5 4s^2$).
- **Color of Ions**: Arises from $d-d$ transitions in crystal field. Ions with $d^0$ ($Sc^{3+}, Ti^{4+}$) or $d^{10}$ ($Zn^{2+}, Cu^+$) are colorless.
- **Magnetic Properties**: Paramagnetism determined by spin-only formula:
  $$\\mu = \\sqrt{n(n+2)} \\text{ BM}$$
  Example: $Fe^{3+}$ ($3d^5$, 5 unpaired $e^-$) $\\rightarrow \\mu = \\sqrt{35} = 5.92\\text{ BM}$.

---

## Potassium Dichromate ($K_2Cr_2O_7$) & Permanganate ($KMnO_4$)
- **Chromate-Dichromate pH Equilibrium**:
  $$2CrO_4^{2-} (\\text{yellow}) + 2H^+ \\rightleftharpoons Cr_2O_7^{2-} (\\text{orange}) + H_2O$$
- **$KMnO_4$ Oxidising Behavior across Media**:
  - **Acidic Medium ($n=5$)**: $MnO_4^- + 8H^+ + 5e^- \\rightarrow Mn^{2+} + 4H_2O$ (Equivalent wt $= M/5$).
  - **Neutral / Weak Alkaline ($n=3$)**: $MnO_4^- + 2H_2O + 3e^- \\rightarrow MnO_2 + 4OH^-$ (Equivalent wt $= M/3$).
  - **Strong Alkaline ($n=1$)**: $MnO_4^- + e^- \\rightarrow MnO_4^{2-}$ (Equivalent wt $= M/1$).
"""
            },
            {
                "title": "11.2 Inner Transition Elements: Lanthanoids & Actinoids",
                "content": """# Inner Transition Elements: Lanthanoids & Actinoids

## Lanthanoid Contraction
The steady decrease in atomic and ionic radii from Lanthanum ($La^{3+}$) to Lutetium ($Lu^{3+}$) due to poor shielding by diffuse $4f$ electrons:
- **Consequences**:
  1. Identical radii and chemical properties of $4d$ and $5d$ pairs ($Zr \\approx Hf$, $Nb \\approx Ta$).
  2. Great difficulty in separation of individual lanthanoids.
  3. Steady decrease in basic strength of hydroxides: $La(OH)_3 > Ce(OH)_3 > \\dots > Lu(OH)_3$.

---

## Actinoids vs Lanthanoids
- Actinoids exhibit wider range of oxidation states (up to $+7$ for $Np, Pu$) because $5f, 6d$, and $7s$ energy levels are comparable.
- Actinoid contraction is greater than lanthanoid contraction due to poorer shielding by $5f$ electrons.
- All actinoids are radioactive.
"""
            }
        ]
    },
    {
        "unit": "Unit 12: Coordination Compounds",
        "description": "Werner theory, ligands, IUPAC naming, structural and stereoisomerism, Valence Bond Theory, Crystal Field Theory, spectrochemical series, and synergic bonding.",
        "lessons": [
            {
                "title": "12.1 Werner's Theory, Ligands, IUPAC & Isomerism",
                "content": """# Werner's Theory, Ligands, IUPAC & Isomerism

## Werner's Coordination Theory
1. **Primary Valence**: Ionisable, corresponds to oxidation state, satisfied by negative ions.
2. **Secondary Valence**: Non-ionisable, corresponds to coordination number, satisfied by neutral or anionic ligands, directs spatial geometry.

---

## Types of Ligands & Chelate Effect
- **Unidentate**: $H_2O, NH_3, Cl^-, CN^-$
- **Bidentate**: Ethylenediamine ($en$), Oxalate ($ox^{2-}$), Glycinate ($gly^-$)
- **Polydentate / Hexadentate**: $EDTA^{4-}$
- **Ambidentate**: Can coordinate through two different atoms ($NO_2^- / ONO^-$, $SCN^- / NCS^-$).
- **Chelate Effect**: Complexes containing cyclic ring ligands are significantly more stable than non-chelated analogs.

---

## Types of Isomerism
- **Ionisation**: $[Co(NH_3)_5 Br]SO_4$ (gives $BaSO_4$ precipitate) vs $[Co(NH_3)_5 SO_4]Br$ (gives $AgBr$ precipitate).
- **Linkage**: $[Co(NH_3)_5(NO_2)]^{2+}$ (yellow) vs $[Co(NH_3)_5(ONO)]^{2+}$ (red).
- **Geometrical**: Cisplatin $cis-[Pt(NH_3)_2 Cl_2]$ (anti-cancer drug) vs trans isomer.
- **Optical**: $[Co(en)_3]^{3+}$ shows dextro and laevo non-superimposable mirror images.
"""
            },
            {
                "title": "12.2 Valence Bond Theory, Crystal Field Theory & Metal Carbonyls",
                "content": """# Valence Bond Theory, Crystal Field Theory & Metal Carbonyls

## Crystal Field Theory (CFT) in Octahedral Complexes
The 5 degenerate $d$-orbitals split into two sets under octahedral ligand field:
- **$t_{2g}$ set** ($d_{xy}, d_{yz}, d_{zx}$): Lower energy ($-0.4\\Delta_o$).
- **$e_g$ set** ($d_{x^2-y^2}, d_{z^2}$): Higher energy ($+0.6\\Delta_o$).

```
 Energy
   ^              --- e_g  (+0.6 Delta_o)
   |            /
   | --- d --->   Delta_o
   |            \\
   |              --- t_2g (-0.4 Delta_o)
```

- **Spectrochemical Series**:
  $$I^- < Br^- < SCN^- < Cl^- < S^{2-} < F^- < OH^- < C_2O_4^{2-} < H_2O < NCS^- < EDTA^{4-} < NH_3 < en < NO_2^- < CN^- < CO$$
- **Weak Field Ligands ($\\Delta_o < P$)**: High spin complexes formed.
- **Strong Field Ligands ($\\Delta_o > P$)**: Electron pairing forced in $t_{2g}$ $\\rightarrow$ Low spin complexes formed.

---

## Synergic Bonding in Metal Carbonyls ($M-CO$)
- $\\sigma$-donation: Carbonyl carbon donates lone pair into vacant metal $d$-orbital.
- $\\pi$-backbonding: Metal donates $d$-electrons into vacant $\\pi^*$ antibonding orbital of $CO$.
- Strengthens $M-C$ bond and weakens $C\\equiv O$ bond.
"""
            }
        ]
    },
    {
        "unit": "Unit 13: Purification and Characterisation of Organic Compounds",
        "description": "Purification techniques, crystallization, sublimation, distillation, chromatography, Lassaigne's test, Dumas, Kjeldahl, and Carius quantitative analysis.",
        "lessons": [
            {
                "title": "13.1 Purification Methods & Qualitative Analysis (Lassaigne's)",
                "content": """# Purification Methods & Qualitative Analysis (Lassaigne's)

## Purification Techniques
- **Sublimation**: Camphor, Naphthalene, Benzoic acid, Anthracene.
- **Steam Distillation**: Immiscible with water, high vapor pressure near $100^\\circ\\text{C}$ (Aniline, Nitrobenzene, o-Nitrophenol).
- **Fractional Distillation**: Difference in boiling points $< 25\\text{ K}$ (Petroleum fractions).
- **Distillation under Reduced Pressure (Vacuum)**: Liquids that decompose near boiling points (Glycerol).
- **Chromatography**: $R_f = \\frac{\\text{Distance travelled by substance}}{\\text{Distance travelled by solvent front}}$.

---

## Lassaigne's Sodium Fusion Test
Convert covalent elements into ionic water-soluble sodium salts ($Na + C + N \\rightarrow NaCN; \\; 2Na + S \\rightarrow Na_2S; \\; Na + X \\rightarrow NaX$).
- **Nitrogen**: Boil extract with $FeSO_4 + \\text{conc. } H_2SO_4 \\rightarrow$ **Prussian Blue** ($Fe_4[Fe(CN)_6]_3$).
- **Sulfur**: Sodium nitroprusside $\\rightarrow$ **Violet color** ($[Fe(CN)_5NOS]^{4-}$).
- **Halogens**: Acidify with $HNO_3$ + add $AgNO_3$:
  - $AgCl$: White precipitate, soluble in $NH_4OH$.
  - $AgBr$: Pale yellow precipitate, sparingly soluble in $NH_4OH$.
  - $AgI$: Yellow precipitate, insoluble in $NH_4OH$.
"""
            },
            {
                "title": "13.2 Quantitative Elemental Analysis Calculations",
                "content": """# Quantitative Elemental Analysis Calculations

## Formulae for Percentage Composition
1. **Carbon & Hydrogen (Liebig Combustion)**:
   $$\\% C = \\frac{12}{44} \\times \\frac{\\text{Mass of } CO_2}{\\text{Mass of compound}} \\times 100$$
   $$\\% H = \\frac{2}{18} \\times \\frac{\\text{Mass of } H_2O}{\\text{Mass of compound}} \\times 100$$
2. **Nitrogen (Dumas Method)**:
   $$\\% N = \\frac{28}{22400} \\times \\frac{\\text{Volume of } N_2 \\text{ at STP (mL)}}{\\text{Mass of compound}} \\times 100$$
3. **Nitrogen (Kjeldahl Method)**:
   $$\\% N = \\frac{1.4 \\times M \\times 2 \\times V}{\\text{Mass of compound}}$$
   *(Fails for nitro, azo groups, and nitrogen in aromatic rings like pyridine).*
4. **Halogens (Carius Method)**:
   $$\\% Cl = \\frac{35.5}{143.5} \\times \\frac{\\text{Mass of } AgCl}{\\text{Mass of compound}} \\times 100$$
   $$\\% Br = \\frac{80}{188} \\times \\frac{\\text{Mass of } AgBr}{\\text{Mass of compound}} \\times 100$$
5. **Sulfur (Carius Method)**:
   $$\\% S = \\frac{32}{233} \\times \\frac{\\text{Mass of } BaSO_4}{\\text{Mass of compound}} \\times 100$$
"""
            }
        ]
    },
    {
        "unit": "Unit 14: Some Basic Principles of Organic Chemistry (GOC)",
        "description": "Hybridisation, IUPAC nomenclature, isomerism (structural, geometrical, optical), inductive, resonance, hyperconjugation effects, and reactive intermediates.",
        "lessons": [
            {
                "title": "14.1 IUPAC Nomenclature, Structural & Stereoisomerism",
                "content": """# IUPAC Nomenclature, Structural & Stereoisomerism

## IUPAC Seniority Order of Functional Groups
$$-COOH > -SO_3H > -COOR > -COCl > -CONH_2 > -CN > -CHO > >C=O > -OH > -NH_2 > C=C > C\\equiv C$$

---

## Stereoisomerism
1. **Geometrical Isomerism ($cis/trans$ and $E/Z$)**:
   - Requires restricted rotation ($C=C$) and two different groups on each double-bonded carbon.
   - Maleic acid ($cis$) dehydrates readily to maleic anhydride; Fumaric acid ($trans$) does not.
2. **Optical Isomerism**:
   - Requires non-superimposable mirror image (chiral center / stereocenter).
   - Enantiomers rotate plane-polarized light in equal and opposite directions ($+d$ and $-l$).
   - **Racemic mixture**: $50:50$ mixture, optically inactive by external compensation.
   - **Meso compounds**: Possess internal plane of symmetry, optically inactive by internal compensation.
"""
            },
            {
                "title": "14.2 Electronic Displacement Effects & Reactive Intermediates",
                "content": """# Electronic Displacement Effects & Reactive Intermediates

## Electronic Effects in Organic Molecules
1. **Inductive Effect ($I$)**: Permanent polarization through $\\sigma$-bonds.
   - $-I$ order: $-NO_2 > -CN > -COOH > -F > -Cl > -Br > -I > -OH > -C_6H_5$
   - $+I$ order: $-C(CH_3)_3 > -CH(CH_3)_2 > -CH_2CH_3 > -CH_3$
2. **Resonance / Mesomeric Effect ($R/M$)**: Delocalization of $\\pi$-electrons or lone pairs.
   - $+R$: $-OH, -OR, -NH_2, -X$ (electron donating by resonance).
   - $-R$: $-NO_2, -CN, >C=O, -COOH$ (electron withdrawing by resonance).
3. **Hyperconjugation (No-Bond Resonance)**: Delocalization of $\\sigma_{C-H}$ into adjacent vacant $p$-orbital or $\\pi$-system. Number of structures $= \\alpha\\text{-hydrogens}$.

---

## Stability of Reactive Intermediates
- **Carbocations ($sp^2$, planar)**: $3^\\circ > 2^\\circ > 1^\\circ > \\dot{C}H_3$ (stabilized by $+I$ and hyperconjugation; benzyl/allyl cations are resonance stabilized).
- **Free Radicals ($sp^2$)**: $3^\\circ > 2^\\circ > 1^\\circ > \\dot{C}H_3$.
- **Carbanions ($sp^3$, pyramidal)**: $\\bar{C}H_3 > 1^\\circ > 2^\\circ > 3^\\circ$ (alkyl groups destabilize carbanions via $+I$).
"""
            }
        ]
    },
    {
        "unit": "Unit 15: Hydrocarbons",
        "description": "Alkanes, alkenes, alkynes, aromatic hydrocarbons, electrophilic additions, Markovnikov rule, ozonolysis, Hückel aromaticity, and Friedel-Crafts reactions.",
        "lessons": [
            {
                "title": "15.1 Alkanes, Alkenes & Alkynes Chemistry",
                "content": """# Alkanes, Alkenes & Alkynes Chemistry

## Alkanes Reactions
- **Wurtz Reaction**: $2RX + 2Na \\xrightarrow{\\text{dry ether}} R-R + 2NaX$ (good for symmetrical even-carbon alkanes).
- **Decarboxylation**: $RCOONa + NaOH/CaO \\xrightarrow{\\Delta} R-H + Na_2CO_3$ (soda lime).
- **Free Radical Halogenation**: Reactivity $F_2 > Cl_2 > Br_2 > I_2$; Hydrogen reactivity $3^\\circ > 2^\\circ > 1^\\circ$.

---

## Alkenes Addition & Oxidation
- **Markovnikov's Rule**: In addition of $HX$ to unsymmetrical alkene, negative part attaches to carbon with fewer hydrogens (proceeds via more stable carbocation).
- **Anti-Markovnikov (Peroxide Effect / Kharasch)**: Occurs **only with $HBr$** in presence of organic peroxides via free-radical mechanism.
- **Ozonolysis**: Cleaves $C=C$ into aldehydes and ketones (used to locate double-bond position).
  - Propene $+ O_3 \\xrightarrow{Zn/H_2O} CH_3CHO + HCHO$.

---

## Alkynes Reactions
- **Acidic Hydrogen**: Terminal alkynes react with $NaNH_2$ or Tollens' reagent ($AgNO_3 + NH_4OH \\rightarrow$ White precipitate $Ag-C\\equiv C-Ag$).
- **Kucherov Reaction (Hydration)**: $HC\\equiv CH + H_2O \\xrightarrow{HgSO_4 / H_2SO_4} CH_3CHO$. Propyne yields Acetone.
- **Cyclic Polymerization**: $3 C_2H_2 \\xrightarrow{\\text{red hot Fe tube, } 873\\text{ K}} \\text{Benzene } (C_6H_6)$.
"""
            },
            {
                "title": "15.2 Aromatic Hydrocarbons: Benzene & Electrophilic Substitution",
                "content": """# Aromatic Hydrocarbons: Benzene & Electrophilic Substitution

## Aromaticity & Hückel's $(4n+2)\\pi$ Rule
A compound is aromatic if it is cyclic, planar, fully conjugated, and contains $(4n+2)\\pi$ electrons ($n=0, 1, 2, \\dots$).
- Benzene ($6\\pi, n=1$), Naphthalene ($10\\pi, n=2$), Anthracene ($14\\pi, n=3$), Cyclopentadienyl anion ($6\\pi$).
- Cyclobutadiene ($4\\pi$) is **anti-aromatic**.

---

## Electrophilic Aromatic Substitution Reactions
1. **Nitration**: $\\text{conc. } HNO_3 + \\text{conc. } H_2SO_4 \\rightarrow$ Electrophile $NO_2^+$ (nitronium ion).
2. **Halogenation**: $Cl_2 + \\text{anhyd. } AlCl_3 \\rightarrow$ Electrophile $Cl^+$.
3. **Friedel-Crafts Alkylation**: $RCl + AlCl_3 \\rightarrow R^+$.
4. **Friedel-Crafts Acylation**: $RCOCl + AlCl_3 \\rightarrow RC\\equiv O^+$ (no carbocation rearrangement!).

---

## Directive Influences of Substituents
- **Activating ($o, p$-directing)**: $-OH, -OCH_3, -NH_2, -CH_3$.
- **Deactivating ($m$-directing)**: $-NO_2, -CN, -CHO, -COOH$.
- **Halogens ($-X$)**: Ortho/para directing but **deactivating** (due to strong $-I$ exceeding $+R$).
"""
            }
        ]
    },
    {
        "unit": "Unit 16: Organic Compounds Containing Halogens",
        "description": "Haloalkanes and haloarenes, SN1 vs SN2 kinetics and mechanisms, elimination reactions, organometallics, and polyhalogen environmental impacts.",
        "lessons": [
            {
                "title": "16.1 SN1 vs SN2 Mechanisms & Haloarene Reactivity",
                "content": """# SN1 vs SN2 Mechanisms & Haloarene Reactivity

## Comparison: SN1 vs SN2
| Feature | $S_N1$ (Unimolecular) | $S_N2$ (Bimolecular) |
|---|---|---|
| **Mechanism** | 2 steps (carbocation intermediate) | 1 concerted step (transition state) |
| **Kinetics** | Rate $= k[RX]$ (First order) | Rate $= k[RX][Nu^-]$ (Second order) |
| **Substrate Reactivity** | $3^\\circ > 2^\\circ > 1^\\circ > CH_3X$ | $CH_3X > 1^\\circ > 2^\\circ > 3^\\circ$ |
| **Stereochemistry** | Racemisation | Complete Inversion (Walden inversion) |
| **Solvent Favored** | Polar protic ($H_2O, EtOH$) | Polar aprotic ($DMSO, DMF, Acetone$) |

---

## Low Reactivity of Haloarenes (Chlorobenzene)
Aryl halides are exceptionally unreactive toward nucleophilic substitution due to:
1. Partial double bond character of $C-Cl$ bond via resonance delocalization.
2. $sp^2$ hybridised carbon (shorter, stronger bond).
3. Instability of phenyl cation.
4. Electronic repulsion between incoming nucleophile and electron-rich $\\pi$-cloud.
- Activated by strong electron-withdrawing groups ($-NO_2$) at **ortho and para** positions (e.g. Picryl chloride hydrolyses in warm water!).
"""
            }
        ]
    },
    {
        "unit": "Unit 17: Organic Compounds Containing Oxygen",
        "description": "Alcohols, phenols, ethers, aldehydes, ketones, carboxylic acids, named reactions (Aldol, Cannizzaro, Reimer-Tiemann, Kolbe, HVZ), and distinction tests.",
        "lessons": [
            {
                "title": "17.1 Alcohols, Phenols & Ethers",
                "content": """# Alcohols, Phenols & Ethers

## Lucas Test for Alcohols ($conc.\\; HCl + ZnCl_2$)
- $3^\\circ$ alcohol: Immediate turbidity.
- $2^\\circ$ alcohol: Turbidity appears within 5 minutes.
- $1^\\circ$ alcohol: No turbidity at room temperature (appears on heating only).

---

## Phenol Reactions
- Acidity: Phenol is more acidic than alcohols due to resonance stabilization of phenoxide ion ($C_6H_5O^-$).
- **Kolbe's Reaction**: $\\text{Phenol} + NaOH + CO_2 \\xrightarrow{400\\text{ K}, 4-7\\text{ atm}} \\text{Salicylic acid}$.
- **Reimer-Tiemann Reaction**: $\\text{Phenol} + CHCl_3 + aq.\\; NaOH \\rightarrow \\text{Salicylaldehyde}$ (Electrophile: Dichlorocarbene $:CCl_2$).
- **Bromine Water Test**: Phenol $+ 3Br_2(aq) \\rightarrow 2,4,6\\text{-tribromophenol}$ (White precipitate).

---

## Ethers & Williamson Synthesis
$$R-X + R'-ONa \\rightarrow R-O-R' + NaX \\quad (S_N2)$$
- Substrate $R-X$ must be **primary ($1^\\circ$)**; tertiary halides yield alkenes by elimination!
- Cleavage with $HI$: Anisole $+ HI \\rightarrow \\text{Phenol} + CH_3I$.
"""
            },
            {
                "title": "17.2 Aldehydes, Ketones & Carboxylic Acids",
                "content": """# Aldehydes, Ketones & Carboxylic Acids

## Nucleophilic Addition & Named Reactions
1. **Aldol Condensation**: Aldehydes/ketones with $\\alpha$-hydrogen $+$ dilute $NaOH \\rightarrow \\beta$-hydroxy carbonyl $\\xrightarrow{\\Delta} \\alpha,\\beta$-unsaturated carbonyl.
   - $2CH_3CHO \\xrightarrow{OH^-} CH_3CH(OH)CH_2CHO \\xrightarrow{\\Delta} CH_3CH=CHCHO$ (Crotonaldehyde).
2. **Cannizzaro Reaction**: Aldehydes without $\\alpha$-hydrogen ($HCHO, C_6H_5CHO$) $+$ conc. $NaOH \\rightarrow$ Disproportionation into alcohol and carboxylate salt:
   $$2HCHO + conc.\\; NaOH \\rightarrow CH_3OH + HCOONa$$
3. **Iodoform Test**: Positive for compounds containing $CH_3-C=O$ or $CH_3-CH(OH)-$ group:
   $$\\text{Acetone} + 3I_2 + 4NaOH \\rightarrow \\mathbf{CHI_3 \\downarrow (\\text{Yellow ppt})} + CH_3COONa + 3NaI + 3H_2O$$
4. **Tollens' & Fehling's Test**: Distinguishes aldehydes (silver mirror / red $Cu_2O$ ppt) from ketones.

---

## Carboxylic Acids & Hell-Volhard-Zelinsky (HVZ)
- Acidity: Increases with electron-withdrawing groups ($-I$):
  $$CF_3COOH > CCl_3COOH > CHCl_2COOH > CH_2ClCOOH > HCOOH > CH_3COOH$$
- **HVZ Reaction**: $R-CH_2COOH + X_2 / \\text{red } P \\rightarrow R-CH(X)COOH$ ($\\alpha$-halogenation).
"""
            }
        ]
    },
    {
        "unit": "Unit 18: Organic Compounds Containing Nitrogen",
        "description": "Amines classification, preparation, basicity trends, Hinsberg test, carbylamine test, diazonium salts, and azo dye coupling reactions.",
        "lessons": [
            {
                "title": "18.1 Amines Basicity, Tests & Diazonium Salts",
                "content": """# Amines Basicity, Tests & Diazonium Salts

## Basicity Order of Amines
- In aqueous solution:
  - Ethyl substituted: $(C_2H_5)_2NH > (C_2H_5)_3N > C_2H_5NH_2 > NH_3$ ($2^\\circ > 3^\\circ > 1^\\circ > NH_3$)
  - Methyl substituted: $(CH_3)_2NH > CH_3NH_2 > (CH_3)_3N > NH_3$ ($2^\\circ > 1^\\circ > 3^\\circ > NH_3$)
- Aniline is much weaker base than ammonia because the lone pair on nitrogen is delocalized into the benzene ring by resonance.

---

## Important Distinction Tests
1. **Carbylamine Test (Isocyanide Test)**:
   $$R-NH_2 + CHCl_3 + 3KOH(alc) \\xrightarrow{\\Delta} R-NC \\text{ (Foul smelling isocyanide)} + 3KCl + 3H_2O$$
   *(Given strictly by $1^\\circ$ aliphatic and aromatic amines only; $2^\\circ$ and $3^\\circ$ amines do NOT respond).*
2. **Hinsberg's Test** ($C_6H_5SO_2Cl$ in alkali):
   - $1^\\circ$ amine forms sulfonamide soluble in $KOH$.
   - $2^\\circ$ amine forms sulfonamide insoluble in $KOH$.
   - $3^\\circ$ amine does not react.

---

## Diazonium Salts & Azo Coupling
$$\\text{Aniline} + NaNO_2 + 2HCl \\xrightarrow{0-5^\\circ\\text{C}} C_6H_5 N_2^+ Cl^- + NaCl + 2H_2O$$
- **Coupling with Phenol** ($pH\\; 9-10$): Yields $p$-hydroxyazobenzene (**Orange dye**).
- **Coupling with Aniline** ($pH\\; 4-5$): Yields $p$-aminoazobenzene (**Yellow dye**).
"""
            }
        ]
    },
    {
        "unit": "Unit 19: Biomolecules",
        "description": "Carbohydrates (glucose, fructose, disaccharides, polysaccharides), proteins, amino acids, enzymes, vitamins, nucleic acids (DNA, RNA), and hormones.",
        "lessons": [
            {
                "title": "19.1 Carbohydrates, Proteins, Nucleic Acids & Vitamins",
                "content": """# Carbohydrates, Proteins, Nucleic Acids & Vitamins

## Carbohydrates
- **D-(+)-Glucose**: Aldohexose with 4 chiral carbons ($2^4 = 16$ stereoisomers).
  - Cyclic structure: Hemiacetal ring between $C1$ and $C5$ $\\rightarrow$ $\\alpha$ and $\\beta$ anomers.
- **Disaccharides**:
  - **Sucrose**: $\\alpha$-D-Glucose $+$ $\\beta$-D-Fructose via $C1-C2$ glycosidic linkage. **Non-reducing sugar**; undergoes inversion during hydrolysis.
  - **Maltose**: Two $\\alpha$-D-Glucose via $\\alpha-1,4$ linkage (Reducing).
  - **Lactose**: $\\beta$-D-Galactose $+$ $\\beta$-D-Glucose via $\\beta-1,4$ linkage (Reducing).

---

## Amino Acids & Proteins
- All natural amino acids are $\\alpha$-amino acids in L-configuration. All are optically active **except Glycine** ($H_2N-CH_2-COOH$).
- **Zwitterion**: $H_3N^+ - CH(R) - COO^-$ exists at isoelectric point ($pI$).
- **Protein Structure**: Primary (peptide bonds $-CO-NH-$), Secondary ($\\alpha$-helix, $\\beta$-pleated sheet via H-bonds), Tertiary (3D folding), Quaternary (multi-subunit assemblies like hemoglobin).

---

## Nucleic Acids (DNA & RNA)
- Nucleoside = Nitrogenous base + Pentose sugar.
- Nucleotide = Nucleoside + Phosphate group.
- DNA Double Helix: $A = T$ (2 H-bonds) and $G \\equiv C$ (3 H-bonds). Chargaff's rule: $[A]=[T]$ and $[G]=[C]$.

---

## Vitamins & Deficiencies
- **Fat Soluble**: A (Night blindness), D (Rickets), E (RBC fragility), K (Delayed blood clotting).
- **Water Soluble**: $B_1$ (Beri-beri), $B_2$ (Cheilosis), $B_{12}$ (Pernicious anaemia), C (Scurvy).
"""
            }
        ]
    },
    {
        "unit": "Unit 20: Principles Related to Practical Chemistry",
        "description": "Detection of functional groups, Mohr's salt, potash alum preparation, acid-base & redox titrations (KMnO4), qualitative salt analysis of cations and anions.",
        "lessons": [
            {
                "title": "20.1 Qualitative Salt Analysis & Titrimetric Principles",
                "content": """# Qualitative Salt Analysis & Titrimetric Principles

## Systematic Cation Group Separation
| Group | Group Reagent | Cations | Precipitate Form |
|---|---|---|---|
| **Group I** | Dilute $HCl$ | $Pb^{2+}$ | White $PbCl_2$ (soluble in hot water) |
| **Group II** | $H_2S$ in acidic medium | $Cu^{2+}$ | Black $CuS$ |
| **Group III** | $NH_4Cl + NH_4OH$ | $Al^{3+}, Fe^{3+}$ | Gelatinous white $Al(OH)_3$, Reddish brown $Fe(OH)_3$ |
| **Group IV** | $H_2S$ in alkaline $NH_4OH$ | $Zn^{2+}, Ni^{2+}$ | White $ZnS$, Black $NiS$ |
| **Group V** | $(NH_4)_2CO_3 + NH_4Cl + NH_4OH$ | $Ba^{2+}, Ca^{2+}$ | White carbonates |
| **Group VI** | $Na_2HPO_4$ | $Mg^{2+}$ | White $MgNH_4PO_4$ |
| **Group 0** | $NaOH$, heat | $NH_4^+$ | $NH_3$ gas (Nessler's reagent brown ppt) |

---

## Redox Titration with $KMnO_4$
- $KMnO_4$ acts as its own **self-indicator** (end point: permanent pale pink color).
- Acidified strictly with dilute $H_2SO_4$; **never use $HCl$** (because $Cl^-$ is oxidized to $Cl_2$) or $HNO_3$ (which is itself an oxidant).
- Titration against Oxalic Acid:
  $$2MnO_4^- + 5C_2O_4^{2-} + 16H^+ \\rightarrow 2Mn^{2+} + 10CO_2 + 8H_2O$$
  Requires warming solution to $60-70^\\circ\\text{C}$ to initiate reaction (autocatalyzed by $Mn^{2+}$).
"""
            }
        ]
    }
]

PHYSICS_UNITS = [
    {
        "unit": "Unit 1: Physics and Measurement",
        "description": "SI base units, vernier calipers, screw gauge least count, significant figures, combination of errors, and dimensional analysis applications.",
        "lessons": [
            {
                "title": "1.1 SI Units, Least Count & Errors in Measurement",
                "content": """# SI Units, Least Count & Errors in Measurement

## Units & Instruments Least Count
- **Vernier Calliper**:
  $$LC = 1\\text{ MSD} - 1\\text{ VSD} = \\frac{\\text{Value of 1 Main Scale Division}}{\\text{Number of Vernier Scale Divisions}}$$
  $$\\text{Reading} = \\text{MSR} + (\\text{VSR} \\times LC) - (\\text{Zero Error})$$
- **Screw Gauge**:
  $$\\text{Pitch} = \\frac{\\text{Linear distance moved}}{\\text{Number of full rotations}}$$
  $$LC = \\frac{\\text{Pitch}}{\\text{Number of circular scale divisions}}$$

---

## Combination of Errors
- For $Z = A + B$ or $Z = A - B \\implies \\Delta Z = \\Delta A + \\Delta B$
- For $Z = \\frac{A^p B^q}{C^r}$:
  $$\\mathbf{\\frac{\\Delta Z}{Z} = p\\left(\\frac{\\Delta A}{A}\\right) + q\\left(\\frac{\\Delta B}{B}\\right) + r\\left(\\frac{\\Delta C}{C}\\right)}$$

### Solved Example
If percentage errors in $a, b, c, d$ are $1\\%, 2\\%, 3\\%, 4\\%$ for $P = \\frac{a^3 b^2}{c \\sqrt{d}}$:
$$\\frac{\\Delta P}{P} = 3(1\\%) + 2(2\\%) + 1(3\\%) + \\frac{1}{2}(4\\%) = 3 + 4 + 3 + 2 = \\mathbf{12\\%}$$
"""
            },
            {
                "title": "1.2 Dimensions & Dimensional Analysis",
                "content": """# Dimensions & Dimensional Analysis

## Dimensional Formulae of Critical Constants
- Planck's Constant ($h$): $[M L^2 T^{-1}]$
- Universal Gravitational Constant ($G$): $[M^{-1} L^3 T^{-2}]$
- Coefficient of Viscosity ($\\eta$): $[M L^{-1} T^{-1}]$
- Magnetic Flux ($\\Phi$): $[M L^2 T^{-2} A^{-1}]$
- Self Inductance ($L$): $[M L^2 T^{-2} A^{-2}]$
- Resistance ($R$): $[M L^2 T^{-3} A^{-2}]$

> **Principle of Homogeneity**: Only physical quantities with identical dimensions can be added, subtracted, or equated!
"""
            }
        ]
    },
    {
        "unit": "Unit 2: Kinematics",
        "description": "Motion in a straight line, graphs of motion, equations of uniformly accelerated motion, vectors, relative velocity, and projectile motion.",
        "lessons": [
            {
                "title": "2.1 1D Motion, Graphs & Calculus Formulations",
                "content": """# 1D Motion, Graphs & Calculus Formulations

## Equations of Uniformly Accelerated Motion
$$v = u + at, \\quad s = ut + \\frac{1}{2}at^2, \\quad v^2 = u^2 + 2as$$
$$\\text{Distance in } n\\text{-th second: } s_n = u + \\frac{a}{2}(2n - 1)$$

---

## Graphs of Motion
- Slope of $x-t$ graph $= \\text{Velocity } v$.
- Slope of $v-t$ graph $= \\text{Acceleration } a$.
- Area under $v-t$ graph $= \\text{Displacement } s$.
- Area under $a-t$ graph $= \\text{Change in velocity } \\Delta v$.
"""
            },
            {
                "title": "2.2 Projectile Motion & Uniform Circular Motion",
                "content": """# Projectile Motion & Uniform Circular Motion

## Oblique Projectile Motion Formulae
Launched with speed $u$ at angle $\\theta$ to horizontal:
- **Time of Flight**: $T = \\frac{2u \\sin\\theta}{g}$
- **Maximum Height**: $H = \\frac{u^2 \\sin^2\\theta}{2g}$
- **Horizontal Range**: $R = \\frac{u^2 \\sin 2\\theta}{g}$
- **Trajectory Equation**:
  $$y = x\\tan\\theta - \\frac{g x^2}{2u^2 \\cos^2\\theta} = x\\tan\\theta \\left(1 - \\frac{x}{R}\\right)$$
- Relationship: $R = \\frac{4H}{\\tan\\theta}$. At $\\theta = 45^\\circ$, $R_{max} = 4H$.

---

## Uniform Circular Motion
- Centripetal Acceleration: $a_c = \\frac{v^2}{r} = \\omega^2 r = \\omega v$ (directed toward center).
"""
            }
        ]
    },
    {
        "unit": "Unit 3: Laws of Motion",
        "description": "Newton's laws, linear momentum, impulse, free body diagrams, friction, banked circular roads, and pulley block systems.",
        "lessons": [
            {
                "title": "3.1 Newton's Laws, Free Body Diagrams & Friction",
                "content": """# Newton's Laws, Free Body Diagrams & Friction

## Newton's Laws of Motion
1. **First Law**: Law of inertia (defines inertial frames).
2. **Second Law**: $F = \\frac{dp}{dt} = ma$. Impulse $J = F \\Delta t = \\Delta p$.
3. **Third Law**: Action and reaction are equal in magnitude, opposite in direction, and act on different bodies.

---

## Friction & Incline Dynamics
- Static friction: $f_s \\le \\mu_s N$ (self-adjusting force).
- Kinetic friction: $f_k = \\mu_k N$ (nearly independent of velocity).
- **Angle of Repose ($\\alpha$)**: $\\tan\\alpha = \\mu_s$.
- Acceleration down rough incline: $a = g(\\sin\\theta - \\mu_k \\cos\\theta)$.

---

## Circular Dynamics & Road Banking
- Maximum safe speed on flat unbanked road: $v_{max} = \\sqrt{\\mu r g}$.
- Ideal banking angle without friction: $\\tan\\theta = \\frac{v^2}{rg} \\implies v = \\sqrt{rg\\tan\\theta}$.
- Banked road with friction:
  $$v_{max} = \\sqrt{rg \\left(\\frac{\\mu + \\tan\\theta}{1 - \\mu\\tan\\theta}\\right)}$$
"""
            }
        ]
    },
    {
        "unit": "Unit 4: Work, Energy and Power",
        "description": "Work done by constant and variable force, work-energy theorem, conservative forces, potential energy, vertical circular motion, and collisions.",
        "lessons": [
            {
                "title": "4.1 Work-Energy Theorem, Vertical Circle & Collisions",
                "content": """# Work-Energy Theorem, Vertical Circle & Collisions

## Work-Energy Theorem
$$W_{net} = \\Delta K = K_f - K_i = \\frac{1}{2}m v_f^2 - \\frac{1}{2}m v_i^2$$
- Work done by spring: $W = -\\frac{1}{2}k(x_f^2 - x_i^2)$.
- Conservative force: $F = -\\frac{dU}{dx}$.

---

## Motion in a Vertical Circle
For a particle tied to a massless string of length $r$:
- Minimum speed at bottom to complete loop: $v_{bottom} = \\sqrt{5gr}$.
- Speed at topmost point: $v_{top} = \\sqrt{gr}$.
- Tension difference: $T_{bottom} - T_{top} = 6mg$.

---

## Elastic & Inelastic Collisions
Coefficient of restitution $e = \\frac{v_2 - v_1}{u_1 - u_2}$:
- **Perfect Elastic ($e=1$)**: Kinetic energy and momentum conserved. If masses are equal ($m_1=m_2$), velocities are completely exchanged!
- **Perfect Inelastic ($e=0$)**: Bodies stick together with common velocity:
  $$V = \\frac{m_1 u_1 + m_2 u_2}{m_1 + m_2}$$
  $$\\Delta K_{loss} = \\frac{1}{2}\\left(\\frac{m_1 m_2}{m_1 + m_2}\\right)(u_1 - u_2)^2$$
"""
            }
        ]
    },
    {
        "unit": "Unit 5: Rotational Motion",
        "description": "Center of mass, torque, angular momentum conservation, moment of inertia of standard shapes, parallel/perpendicular axes theorems, and pure rolling motion.",
        "lessons": [
            {
                "title": "5.1 Centre of Mass, Torque & Moment of Inertia",
                "content": """# Centre of Mass, Torque & Moment of Inertia

## Center of Mass & Angular Momentum
- Discrete: $r_{cm} = \\frac{\\sum m_i r_i}{\\sum m_i}$.
- Torque: $\\tau = r \\times F = I\\alpha = \\frac{dL}{dt}$.
- Angular Momentum: $L = r \\times p = I\\omega$. Conserved when $\\tau_{ext} = 0$.

---

## Moments of Inertia ($I$)
| Object | Axis | Moment of Inertia ($I$) |
|---|---|---|
| **Ring** | Central, perpendicular | $M R^2$ |
| **Disc** | Central, perpendicular | $\\frac{1}{2} M R^2$ |
| **Solid Cylinder** | Own longitudinal axis | $\\frac{1}{2} M R^2$ |
| **Solid Sphere** | Any diameter | $\\frac{2}{5} M R^2$ |
| **Hollow Sphere** | Any diameter | $\\frac{2}{3} M R^2$ |
| **Thin Rod** | Center, perpendicular | $\\frac{1}{12} M L^2$ |
| **Thin Rod** | End, perpendicular | $\\frac{1}{3} M L^2$ |

---

## Rolling Motion without Slipping
$$K_{total} = K_{trans} + K_{rot} = \\frac{1}{2}M v_{cm}^2 \\left(1 + \\frac{K^2}{R^2}\\right)$$
- Acceleration down incline: $a = \\frac{g\\sin\\theta}{1 + \\frac{K^2}{R^2}}$.
- Order of reaching bottom first: **Solid Sphere > Disc > Hollow Sphere > Ring**.
"""
            }
        ]
    },
    {
        "unit": "Unit 6: Gravitation",
        "description": "Newton's law of gravitation, variation of g with height/depth/latitude, Kepler's laws, gravitational potential, escape velocity, and satellite motion.",
        "lessons": [
            {
                "title": "6.1 Gravitation, Variation of g, Escape Velocity & Satellites",
                "content": """# Gravitation, Variation of g, Escape Velocity & Satellites

## Variation of Acceleration due to Gravity ($g = \\frac{GM}{R^2}$)
1. **At Height $h$**:
   $$g_h = g\\left(1 + \\frac{h}{R}\\right)^{-2} \\approx g\\left(1 - \\frac{2h}{R}\\right) \\quad (\\text{for } h \\ll R)$$
2. **At Depth $d$**:
   $$g_d = g\\left(1 - \\frac{d}{R}\\right) \\implies g=0 \\text{ at Earth's center.}$$
3. **Due to Rotation at Latitude $\\lambda$**:
   $$g' = g - \\omega^2 R \\cos^2\\lambda$$

---

## Escape Velocity & Orbital Motion
- **Escape Velocity**:
  $$v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR} \\approx \\mathbf{11.2\\text{ km/s}}$$
- **Satellite Orbital Speed**:
  $$v_o = \\sqrt{\\frac{GM}{R+h}} \\approx \\sqrt{gR} \\approx 7.92\\text{ km/s} \\implies \\mathbf{v_e = \\sqrt{2}\\, v_o}$$
- **Total Satellite Energy**:
  $$E = KE + PE = +\\frac{GMm}{2r} - \\frac{GMm}{r} = -\\frac{GMm}{2r} = -KE = \\frac{1}{2}PE$$
"""
            }
        ]
    },
    {
        "unit": "Unit 7: Properties of Solids and Liquids",
        "description": "Stress-strain, Young's modulus, Pascal's law, Archimedes, viscosity, Stokes law, Bernoulli principle, surface tension, capillarity, calorimetry, and heat transfer.",
        "lessons": [
            {
                "title": "7.1 Elasticity, Fluid Mechanics & Surface Tension",
                "content": """# Elasticity, Fluid Mechanics & Surface Tension

## Elastic Moduli & Energy Stored
- Young's modulus $Y = \\frac{F/A}{\\Delta l / l} = \\frac{F l}{A \\Delta l}$.
- Energy stored per unit volume: $u = \\frac{1}{2} \\times \\text{stress} \\times \\text{strain} = \\frac{1}{2} Y (\\text{strain})^2$.

---

## Fluid Mechanics: Stokes' Law & Bernoulli's Equation
- **Stokes' Viscous Drag**: $F = 6\\pi \\eta r v$.
- **Terminal Velocity**:
  $$v_t = \\frac{2r^2 (\\rho - \\sigma) g}{9\\eta} \\propto r^2$$
- **Bernoulli's Principle**:
  $$P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant}$$
  Applications: Venturimeter, aerodynamic lift, Torricelli's efflux velocity $v = \\sqrt{2gh}$.

---

## Surface Tension & Capillary Rise
- Excess Pressure:
  - Inside liquid drop: $\\Delta P = \\frac{2S}{R}$
  - Inside soap bubble (2 surfaces): $\\Delta P = \\frac{4S}{R}$
- **Capillary Rise**:
  $$h = \\frac{2S \\cos\\theta}{r \\rho g}$$
"""
            }
        ]
    },
    {
        "unit": "Unit 8: Thermodynamics",
        "description": "Zeroth, first and second laws, state variables, isothermal, adiabatic, isobaric, isochoric processes, heat engines, Carnot efficiency, and refrigerators.",
        "lessons": [
            {
                "title": "8.1 Thermodynamics Processes & Carnot Engine",
                "content": """# Thermodynamics Processes & Carnot Engine

## Thermodynamic Processes for Ideal Gas
| Process | Condition | Work Done ($W$) | $\\Delta U$ | Heat ($Q$) |
|---|---|---|---|---|
| **Isothermal** | $\\Delta T = 0$ | $nRT \\ln\\left(\\frac{V_2}{V_1}\\right)$ | $0$ | $Q = W$ |
| **Adiabatic** | $Q = 0$ | $\\frac{P_1 V_1 - P_2 V_2}{\\gamma - 1} = \\frac{nR(T_1 - T_2)}{\\gamma - 1}$ | $-W$ | $0$ |
| **Isobaric** | $\\Delta P = 0$ | $P \\Delta V = nR\\Delta T$ | $n C_v \\Delta T$ | $n C_p \\Delta T$ |
| **Isochoric** | $\\Delta V = 0$ | $0$ | $n C_v \\Delta T$ | $\\Delta U$ |

- Adiabatic Slope is steeper: $(\\frac{dP}{dV})_{adia} = \\gamma (\\frac{dP}{dV})_{iso}$.

---

## Carnot Heat Engine & Refrigerator
- Carnot Efficiency:
  $$\\eta = 1 - \\frac{Q_2}{Q_1} = 1 - \\frac{T_2}{T_1} \\quad (T_1 = \\text{source, } T_2 = \\text{sink in Kelvin})$$
- Coefficient of Performance of Refrigerator:
  $$\\beta = \\frac{Q_2}{W} = \\frac{T_2}{T_1 - T_2} = \\frac{1 - \\eta}{\\eta}$$
"""
            }
        ]
    },
    {
        "unit": "Unit 9: Kinetic Theory of Gases",
        "description": "Gas laws, pressure of ideal gas, RMS/mean/most-probable speeds, degrees of freedom, equipartition law, molar heat capacities, and mean free path.",
        "lessons": [
            {
                "title": "9.1 Molecular Speeds, Degrees of Freedom & Mean Free Path",
                "content": """# Molecular Speeds, Degrees of Freedom & Mean Free Path

## Kinetic Theory Pressure & Speeds
$$P = \\frac{1}{3}\\rho v_{rms}^2 = \\frac{2}{3} E_v$$
- **Root Mean Square**: $v_{rms} = \\sqrt{\\frac{3RT}{M}}$
- **Average Speed**: $v_{avg} = \\sqrt{\\frac{8RT}{\\pi M}}$
- **Most Probable Speed**: $v_{mp} = \\sqrt{\\frac{2RT}{M}}$
- Ratio: $v_{rms} : v_{avg} : v_{mp} = \\sqrt{3} : \\sqrt{\\frac{8}{\\pi}} : \\sqrt{2} \\approx 1.73 : 1.60 : 1.41$.

---

## Equipartition of Energy & Specific Heats
- Monatomic gas ($f=3$): $C_v = \\frac{3}{2}R, \\quad C_p = \\frac{5}{2}R, \\quad \\gamma = \\frac{5}{3} \\approx 1.67$.
- Diatomic gas ($f=5$ at room temp): $C_v = \\frac{5}{2}R, \\quad C_p = \\frac{7}{2}R, \\quad \\gamma = \\frac{7}{5} = 1.40$.
- Mean Free Path: $\\lambda = \\frac{1}{\\sqrt{2}\\pi d^2 n} = \\frac{k_B T}{\\sqrt{2}\\pi d^2 P}$.
"""
            }
        ]
    },
    {
        "unit": "Unit 10: Oscillations and Waves",
        "description": "Simple Harmonic Motion equations, energy of SHM, spring-mass systems, simple pendulum, wave motion, standing waves, organ pipes, beats, and Doppler effect.",
        "lessons": [
            {
                "title": "10.1 Simple Harmonic Motion (SHM) & Simple Pendulum",
                "content": """# Simple Harmonic Motion (SHM) & Simple Pendulum

## Kinematics & Energy of SHM
$$x = A\\sin(\\omega t + \\phi), \\quad v = \\omega\\sqrt{A^2 - x^2}, \\quad a = -\\omega^2 x$$
- Kinetic Energy: $K = \\frac{1}{2}m\\omega^2 (A^2 - x^2)$
- Potential Energy: $U = \\frac{1}{2}m\\omega^2 x^2$
- Total Energy: $E = K + U = \\frac{1}{2}m\\omega^2 A^2 = \\frac{1}{2}k A^2$ (Constant!).
- At $x = \\pm \\frac{A}{\\sqrt{2}}$, Kinetic Energy = Potential Energy.

---

## Pendulums & Springs
- Simple Pendulum: $T = 2\\pi \\sqrt{\\frac{l}{g}}$.
- Spring-Mass: $T = 2\\pi \\sqrt{\\frac{m}{k}}$.
  - Series combination: $\\frac{1}{k_{eq}} = \\frac{1}{k_1} + \\frac{1}{k_2}$.
  - Parallel combination: $k_{eq} = k_1 + k_2$.
"""
            },
            {
                "title": "10.2 Standing Waves, Organ Pipes & Beats",
                "content": """# Standing Waves, Organ Pipes & Beats

## Standing Waves in Organ Pipes
1. **Open Pipe (Both ends open)**:
   - Fundamental: $f_1 = \\frac{v}{2L}$.
   - All harmonics present: $f_n = n f_1$ ($1 : 2 : 3 : 4 : \\dots$).
2. **Closed Pipe (One end closed)**:
   - Fundamental: $f_1 = \\frac{v}{4L}$ (half of open pipe).
   - Only odd harmonics present: $f_n = (2n-1) f_1$ ($1 : 3 : 5 : 7 : \\dots$).

---

## Beats & Doppler Effect
- **Beat Frequency**: $f_{beat} = |f_1 - f_2|$.
- Loading a tuning fork with wax lowers its frequency; filing raises its frequency.
"""
            }
        ]
    },
    {
        "unit": "Unit 11: Electrostatics",
        "description": "Coulomb's law, electric field, electric dipole, Gauss's law applications, electrostatic potential, equipotentials, capacitors, and dielectrics.",
        "lessons": [
            {
                "title": "11.1 Coulomb's Law, Electric Dipole & Gauss's Theorem",
                "content": """# Coulomb's Law, Electric Dipole & Gauss's Theorem

## Coulomb's Law & Electric Dipole
$$F = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1 q_2}{r^2} \\quad \\left(\\frac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^9\\text{ N m}^2\\text{ C}^{-2}\\right)$$
- **Electric Dipole ($p = q \\times 2a$)**:
  - Axial Field ($r \\gg a$): $E_{axial} = \\frac{2kp}{r^3}$
  - Equatorial Field: $E_{eq} = \\frac{kp}{r^3} \\implies \\mathbf{E_{axial} = 2 E_{eq}}$
  - Torque: $\\tau = p \\times E = pE\\sin\\theta$; Potential energy $U = -p \\cdot E = -pE\\cos\\theta$.

---

## Gauss's Law Applications
$$\\Phi = \\oint E \\cdot dA = \\frac{q_{enc}}{\\varepsilon_0}$$
- Infinite Wire: $E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r} = \\frac{2k\\lambda}{r}$.
- Infinite Non-conducting Sheet: $E = \\frac{\\sigma}{2\\varepsilon_0}$.
- Spherical Shell ($R$): Inside $E = 0$; Outside $E = \\frac{kQ}{r^2}$.
"""
            },
            {
                "title": "11.2 Electric Potential & Capacitors with Dielectrics",
                "content": """# Electric Potential & Capacitors with Dielectrics

## Electric Potential & Potential Energy
$$V = \\frac{kQ}{r}, \\quad E = -\\frac{dV}{dr}, \\quad U = \\frac{k q_1 q_2}{r}$$

---

## Capacitors & Dielectrics
Parallel plate capacitor: $C_0 = \\frac{\\varepsilon_0 A}{d}$.
- Dielectric filled: $C = K C_0$.
- Slab of thickness $t$: $C = \\frac{\\varepsilon_0 A}{d - t + t/K}$.
- Energy stored: $U = \\frac{1}{2} C V^2 = \\frac{Q^2}{2C} = \\frac{1}{2} Q V$.
- Combinations: Series $\\frac{1}{C} = \\sum \\frac{1}{C_i}$; Parallel $C = \\sum C_i$.
"""
            }
        ]
    },
    {
        "unit": "Unit 12: Current Electricity",
        "description": "Drift velocity, Ohm's law, temperature dependence of resistance, cell grouping, Kirchhoff's laws, Wheatstone bridge, and metre bridge.",
        "lessons": [
            {
                "title": "12.1 Drift Velocity, Ohm's Law, Kirchhoff's Laws & Metre Bridge",
                "content": """# Drift Velocity, Ohm's Law, Kirchhoff's Laws & Metre Bridge

## Microscopic View of Current
$$I = n e A v_d, \\quad v_d = \\frac{e E \\tau}{m}, \\quad J = \\sigma E$$
- Resistance: $R = \\frac{\\rho l}{A}$. Stretching wire to $n$ times its length increases resistance to $n^2 R$!

---

## Kirchhoff's Laws & Bridges
1. **Kirchhoff's Current Law (KCL)**: $\\sum I = 0$ at any junction (Conservation of Charge).
2. **Kirchhoff's Voltage Law (KVL)**: $\\sum \\Delta V = 0$ around closed loop (Conservation of Energy).
- **Wheatstone Bridge**: $\\frac{P}{Q} = \\frac{R}{S}$ when galvanometer current $I_g = 0$.
- **Metre Bridge**: $\\frac{R}{S} = \\frac{l}{100 - l} \\implies S = R\\left(\\frac{100 - l}{l}\\right)$.
"""
            }
        ]
    },
    {
        "unit": "Unit 13: Magnetic Effects of Current and Magnetism",
        "description": "Biot-Savart law, Ampere circuital law, Lorentz force, cyclotron, torque on loop, moving coil galvanometer, Earth's magnetism, and magnetic materials.",
        "lessons": [
            {
                "title": "13.1 Biot-Savart, Ampere's Law, Lorentz Force & Galvanometer",
                "content": """# Biot-Savart, Ampere's Law, Lorentz Force & Galvanometer

## Magnetic Field Equations
- **Biot-Savart Law**: $dB = \\frac{\\mu_0}{4\\pi} \\frac{I dl \\sin\\theta}{r^2}$.
  - At center of circular loop: $B = \\frac{\\mu_0 N I}{2R}$.
  - Infinitely long straight wire: $B = \\frac{\\mu_0 I}{2\\pi r}$.
- **Ampere's Law**: $\\oint B \\cdot dl = \\mu_0 I_{enc}$. Inside long solenoid $B = \\mu_0 n I$.

---

## Charged Particle in Magnetic Field
- Lorentz force: $F = q(E + v \\times B)$. Magnetic force does **zero work**!
- In perpendicular field ($v \\perp B$): Circular motion with radius $r = \\frac{mv}{qB}$ and period $T = \\frac{2\\pi m}{qB}$.
- **Galvanometer Conversion**:
  - To Ammeter: Low shunt in parallel $S = \\frac{I_g G}{I - I_g}$.
  - To Voltmeter: High resistance in series $R = \\frac{V}{I_g} - G$.
"""
            }
        ]
    },
    {
        "unit": "Unit 14: Electromagnetic Induction and AC",
        "description": "Faraday laws, Lenz law, motional emf, self and mutual inductance, AC circuits, LCR series resonance, power factor, and transformers.",
        "lessons": [
            {
                "title": "14.1 Faraday's Laws, Inductance, LCR Resonance & Transformers",
                "content": """# Faraday's Laws, Inductance, LCR Resonance & Transformers

## Faraday & Lenz's Law
$$e = -N \\frac{d\\Phi_B}{dt}, \\quad e = B l v \\text{ (Motional EMF)}$$
- Self Inductance: $e = -L \\frac{dI}{dt}$, Energy $U = \\frac{1}{2} L I^2$. Long solenoid $L = \\mu_0 n^2 A l$.

---

## Series LCR Circuit & Resonance
- Impedance: $Z = \\sqrt{R^2 + (X_L - X_C)^2}$ where $X_L = \\omega L$, $X_C = \\frac{1}{\\omega C}$.
- **Resonance**: When $X_L = X_C \\implies \\omega_0 = \\frac{1}{\\sqrt{LC}}$:
  - Impedance is minimum ($Z = R$), current is maximum ($I = \\frac{V}{R}$), Power factor $\\cos\\phi = 1$.
- **Transformer**: $\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}$.
"""
            }
        ]
    },
    {
        "unit": "Unit 15: Electromagnetic Waves",
        "description": "Displacement current, Maxwell equations, characteristics of EM waves, and complete electromagnetic spectrum with applications.",
        "lessons": [
            {
                "title": "15.1 Displacement Current & Electromagnetic Spectrum",
                "content": """# Displacement Current & Electromagnetic Spectrum

## Displacement Current & Wave Nature
$$I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt}, \\quad c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} = 3 \\times 10^8\\text{ m/s}, \\quad \\frac{E_0}{B_0} = c$$
- Transverse wave: $\\vec{E} \\perp \\vec{B} \\perp \\vec{c}$. No medium required.

---

## The Electromagnetic Spectrum (Frequency Order)
$$\\text{Radio} < \\text{Microwave} < \\text{Infrared} < \\text{Visible (VIBGYOR)} < \\text{Ultraviolet} < \\text{X-rays} < \\gamma\\text{-rays}$$
"""
            }
        ]
    },
    {
        "unit": "Unit 16: Optics",
        "description": "Ray optics (mirrors, lenses, prisms, optical instruments) and wave optics (Huygens principle, YDSE interference, single-slit diffraction, polarization).",
        "lessons": [
            {
                "title": "16.1 Ray Optics: Mirrors, Lenses, Prisms & Instruments",
                "content": """# Ray Optics: Mirrors, Lenses, Prisms & Instruments

## Formulae Summary
- Mirror Formula: $\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}$, Magnification $m = -\\frac{v}{u}$.
- Lens Formula: $\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}$, Magnification $m = +\\frac{v}{u}$.
- Lens Maker's Formula: $\\frac{1}{f} = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$.
- Prism Formula: $n = \\frac{\\sin\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin(A/2)}$.
- Compound Microscope: $M = -\\frac{v_0}{u_0}\\left(1 + \\frac{D}{f_e}\\right)$.
- Astronomical Telescope: $M = -\\frac{f_0}{f_e}$, Tube length $L = f_0 + f_e$.
"""
            },
            {
                "title": "16.2 Wave Optics: Huygens, YDSE Interference & Diffraction",
                "content": """# Wave Optics: Huygens, YDSE Interference & Diffraction

## Young's Double-Slit Experiment (YDSE)
- Fringe Width: $\\beta = \\frac{\\lambda D}{d}$ (Equal spacing for bright and dark fringes).
- In a medium of refractive index $n$: $\\beta' = \\frac{\\beta}{n}$.

---

## Diffraction & Polarisation
- Single-slit Diffraction: Minima at $a\\sin\\theta = n\\lambda$. Central maximum width $= \\frac{2\\lambda D}{a}$.
- Brewster's Law: $\\tan i_p = n$ (reflected and refracted rays are perpendicular!).
- Malus's Law: $I = I_0 \\cos^2\\theta$.
"""
            }
        ]
    },
    {
        "unit": "Unit 17: Dual Nature of Matter and Radiation",
        "description": "Photoelectric effect, Hertz-Lenard observations, Einstein's photoelectric equation, and de Broglie matter waves.",
        "lessons": [
            {
                "title": "17.1 Photoelectric Effect & de Broglie Matter Waves",
                "content": """# Photoelectric Effect & de Broglie Matter Waves

## Photoelectric Equation
$$E = h\\nu = W_0 + K_{max} \\implies K_{max} = h(\\nu - \\nu_0) = e V_0$$
- Stopping potential $V_0$ depends strictly on **frequency**, not on intensity.
- Photocurrent is directly proportional to **intensity** of light.

---

## de Broglie Wavelength
$$\\lambda = \\frac{h}{p} = \\frac{h}{mv} = \\frac{h}{\\sqrt{2mK}} = \\frac{h}{\\sqrt{2mqV}}$$
- For electron accelerated through $V$ volts:
  $$\\mathbf{\\lambda = \\frac{12.27}{\\sqrt{V}} \\text{ \\AA}}$$
"""
            }
        ]
    },
    {
        "unit": "Unit 18: Atoms and Nuclei",
        "description": "Alpha scattering, Rutherford atom, Bohr model, hydrogen spectrum, nuclear density, mass defect, binding energy per nucleon curve, fission, and fusion.",
        "lessons": [
            {
                "title": "18.1 Bohr Atom, Nuclear Binding Energy & Fission/Fusion",
                "content": """# Bohr Atom, Nuclear Binding Energy & Fission/Fusion

## Bohr Atom Review
$$r_n = 0.529\\frac{n^2}{Z} \\text{ \\AA}, \\quad E_n = -13.6\\frac{Z^2}{n^2} \\text{ eV}$$

---

## Nuclear Physics
- Nuclear Radius: $R = R_0 A^{1/3}$ ($R_0 \\approx 1.2\\text{ fm}$). Nuclear density is constant and independent of mass number $A$ ($\approx 2.3 \\times 10^{17}\\text{ kg/m}^3$).
- Binding Energy: $\\Delta m = [Z m_p + (A-Z) m_n] - M_{nucleus}$, $B.E. = \\Delta m \\times 931.5\\text{ MeV}$.
- $B.E./A$ curve peaks near $^{56}Fe$ ($8.75\\text{ MeV/nucleon}$), signifying maximum stability.
"""
            }
        ]
    },
    {
        "unit": "Unit 19: Electronic Devices",
        "description": "Energy bands, semiconductors, p-n junction diode forward/reverse bias, half/full wave rectifiers, Zener diode regulator, LED, solar cells, and logic gates.",
        "lessons": [
            {
                "title": "19.1 Semiconductors, Diodes, Rectifiers & Logic Gates",
                "content": """# Semiconductors, Diodes, Rectifiers & Logic Gates

## Semiconductors & Diodes
- Intrinsic: $n_e = n_h = n_i$. Extrinsic: $n$-type (pentavalent, $n_e \\gg n_h$), $p$-type (trivalent, $n_h \\gg n_e$).
- Forward bias: Depletion layer narrows; Reverse bias: Depletion layer widens.
- Full-wave rectifier efficiency $\\approx 81.2\\%$; ripple frequency $= 2f_{in}$.
- Zener Diode: Works in **reverse breakdown** as constant voltage regulator.

---

## Digital Electronics & Universal Gates
- Universal Gates: **NAND** and **NOR** can implement all Boolean logic.
- De Morgan's Laws: $\\overline{A + B} = \\bar{A} \\cdot \\bar{B}$ and $\\overline{A \\cdot B} = \\bar{A} + \\bar{B}$.
"""
            }
        ]
    },
    {
        "unit": "Unit 20: Experimental Skills",
        "description": "Vernier calliper, screw gauge, simple pendulum energy dissipation, Searle's Young modulus, capillary rise, resonance tube sound speed, metre bridge, and diode curves.",
        "lessons": [
            {
                "title": "20.1 Core NEET Physics Laboratory Experiments",
                "content": """# Core NEET Physics Laboratory Experiments

## Experimental Principles & Formulae
1. **Vernier Callipers & Screw Gauge**: $LC = 1\\text{ MSD} - 1\\text{ VSD}$; Pitch / divisions.
2. **Resonance Tube**: $\\lambda = 2(l_2 - l_1) \\implies v = 2f(l_2 - l_1)$ (end correction cancels!).
3. **Metre Bridge**: $S = R\\left(\\frac{100 - l}{l}\\right)$. Resistivity $\\rho = \\frac{S \\pi r^2}{L}$.
4. **Galvanometer Half-Deflection Method**: $G = \\frac{R S}{R - S}$; Figure of merit $k = \\frac{E}{(R+G)\\theta}$.
5. **Focal length by Parallax Method**: No relative shift between pin and real inverted image when eye moves.
"""
            }
        ]
    }
]

BIOLOGY_UNITS = [
    {
        "unit": "Unit 1: Diversity in the Living World",
        "description": "Living world characteristics, taxonomic categories, binomial nomenclature, five kingdom system, Monera, Protista, Fungi, Plantae, and Animalia.",
        "lessons": [
            {
                "title": "1.1 Taxonomy, Five Kingdoms & Animal Classification",
                "content": """# Taxonomy, Five Kingdoms & Animal Classification

## Living World & Biological Classification
- Binomial Nomenclature proposed by Carolus Linnaeus ($Genus + species$).
- Five Kingdom Classification (R.H. Whittaker, 1969): Monera, Protista, Fungi, Plantae, Animalia based on cell structure, thallus organization, nutrition, and phylogeny.
- Animal Kingdom Non-Chordates to Chordates: Porifera to Mammalia, coelom, symmetry, and germ layers.
"""
            }
        ]
    },
    {
        "unit": "Unit 2: Cell Structure, Function & Biomolecules",
        "description": "Prokaryotic and eukaryotic cells, cell organelles, fluid mosaic membrane model, cell division (mitosis, meiosis), and biomolecules.",
        "lessons": [
            {
                "title": "2.1 Cell Organelles, Mitosis, Meiosis & Enzymes",
                "content": """# Cell Organelles, Mitosis, Meiosis & Enzymes

## Cell Organelles & Division
- Singer & Nicolson Fluid Mosaic Model of plasma membrane.
- Mitochondria & Chloroplast: Semi-autonomous organelles with own circular DNA and 70S ribosomes.
- Meiosis I: Crossing over in Pachytene stage catalyzed by Recombinase enzyme.
- Enzymes: Protein catalysts with active sites, competitive inhibition ($V_{max}$ unchanged, $K_m$ increases).
"""
            }
        ]
    },
    {
        "unit": "Unit 3: Plant Physiology",
        "description": "Photosynthesis in higher plants (Light reaction, C3 Calvin cycle, C4 Hatch-Slack pathway), Cellular Respiration, and Plant Growth Regulators.",
        "lessons": [
            {
                "title": "3.1 Photosynthesis, Respiration & Plant Hormones",
                "content": """# Photosynthesis, Respiration & Plant Hormones

## Photosynthesis & Respiration
- Light reactions: Z-scheme, photolysis of water ($Mn, Cl$ required), ATP and NADPH synthesis via chemiosmosis.
- C3 vs C4 Pathway: Kranz anatomy in C4 plants (Maize, Sugarcane) avoids photorespiration; first stable product is Oxaloacetic acid (4C).
- Glycolysis (EMP Pathway, 10 steps, net 2 ATP) $\\rightarrow$ Krebs cycle $\\rightarrow$ ETS.
- Plant Hormones: Auxin (apical dominance), Gibberellin (bolting), Cytokinin (cell division), ABA (stress hormone), Ethylene (fruit ripening).
"""
            }
        ]
    },
    {
        "unit": "Unit 4: Human Physiology",
        "description": "Breathing and gas exchange, body fluids and circulation, excretory products, locomotion, neural coordination, and chemical integration (endocrine).",
        "lessons": [
            {
                "title": "4.1 Human Organ Systems: Respiration, Circulation & Excretion",
                "content": """# Human Organ Systems: Respiration, Circulation & Excretion

## Organ Systems Review
- Respiration: Oxygen dissociation curve (sigmoid), Bohr effect, transport of $CO_2$ primarily as bicarbonate ions ($HCO_3^-$).
- Circulation: Cardiac cycle ($0.8\\text{ s}$), ECG waves ($P = \\text{atrial depolarisation}, QRS = \\text{ventricular depolarisation}, T = \\text{ventricular repolarisation}$).
- Excretion: Counter-current mechanism in Henle's loop and vasa recta to produce hypertonic urine.
- Endocrine: Anterior pituitary, thyroid ($T_3, T_4$), adrenal cortex/medulla, pancreas (insulin, glucagon).
"""
            }
        ]
    },
    {
        "unit": "Unit 5: Genetics, Evolution & Biotechnology",
        "description": "Mendelian inheritance, chromosomal theory, DNA replication, transcription, genetic code, translation, human genome project, recombinant DNA, and PCR.",
        "lessons": [
            {
                "title": "5.1 Molecular Genetics, Biotechnology & Ecology",
                "content": """# Molecular Genetics, Biotechnology & Ecology

## Molecular Basis of Inheritance
- DNA replication is semi-conservative (Meselson and Stahl experiment).
- Genetic Code is triplet, universal, non-overlapping, degenerate. Initiator codon: $AUG$ (Methionine).
- Recombinant DNA: Restriction endonucleases (molecular scissors), PCR stages (Denaturation $94^\\circ\\text{C}$, Annealing $54^\\circ\\text{C}$, Extension $72^\\circ\\text{C}$ with Taq polymerase).
- Ecology: 10% energy transfer law (Lindeman), biodiversity hot spots, ozone depletion in stratosphere.
"""
            }
        ]
    }
]

NEET_COURSES = [
    {
        "title": "NEET UG 2026: Physics Complete Master Syllabus (Units 1–20)",
        "description": "Comprehensive textbook-style video and reading modules based on the official NMC/NTA NEET 2026 syllabus. Covers all 20 units with step-by-step mathematical derivations, vector diagrams, worked examples, and NEET practice MCQs.",
        "career": "NEET Physics Mastery",
        "difficulty": "intermediate",
        "units": PHYSICS_UNITS
    },
    {
        "title": "NEET UG 2026: Chemistry Complete Master Syllabus (Units 1–20)",
        "description": "Full textbook notes for Physical, Inorganic, and Organic Chemistry following the official NMC/NTA curriculum. Includes all 20 units with step-by-step chemical equations, reaction mechanisms, numerical problems, and quick revision boxes.",
        "career": "NEET Chemistry Mastery",
        "difficulty": "intermediate",
        "units": CHEMISTRY_UNITS
    },
    {
        "title": "NEET UG 2026: Biology Complete Botany & Zoology Curriculum",
        "description": "High-yield NCERT line-by-line master modules covering Diversity in Living World, Cell Biology, Plant Physiology, Human Physiology, Genetics, Evolution, Biotechnology, and Ecology for maximum 360/360 marks.",
        "career": "NEET Biology Specialist",
        "difficulty": "beginner",
        "units": BIOLOGY_UNITS
    },
    {
        "title": "NEET Physics: Mechanics, Motion & Gravitation (Units 1–6)",
        "description": "In-depth foundational mechanics for NEET: Units and measurement, 1D and 2D kinematics, projectile motion, Newton laws, friction, work-energy, rotational dynamics, and universal gravitation.",
        "career": "NEET Physics Mastery",
        "difficulty": "beginner",
        "units": PHYSICS_UNITS[:6]
    },
    {
        "title": "NEET Physics: Fluids, Thermodynamics & Oscillations (Units 7–10)",
        "description": "Master properties of matter, fluid dynamics, Bernoulli theorem, thermodynamics, kinetic theory of gases, simple harmonic motion, and wave acoustics.",
        "career": "NEET Physics Mastery",
        "difficulty": "intermediate",
        "units": PHYSICS_UNITS[6:10]
    },
    {
        "title": "NEET Physics: Electrodynamics & Magnetism (Units 11–14)",
        "description": "High-weightage electrostatics, Gauss theorem, current electricity, Kirchhoff circuit laws, magnetic fields, electromagnetic induction, and AC resonance circuits.",
        "career": "NEET Physics Mastery",
        "difficulty": "advanced",
        "units": PHYSICS_UNITS[10:14]
    },
    {
        "title": "NEET Physics: Optics, Modern Physics & Experimental Skills (Units 15–20)",
        "description": "Electromagnetic waves, ray and wave optics, dual nature of radiation, nuclear physics, semiconductor diodes, logic gates, and the complete practical lab syllabus.",
        "career": "NEET Physics Mastery",
        "difficulty": "intermediate",
        "units": PHYSICS_UNITS[14:20]
    },
    {
        "title": "NEET Chemistry: Physical Chemistry Numerical Mastery (Units 1–8)",
        "description": "Mole concept, atomic quantum model, thermodynamics, solutions, chemical and ionic equilibrium, redox electrochemistry, and reaction kinetics with solved numericals.",
        "career": "NEET Chemistry Mastery",
        "difficulty": "intermediate",
        "units": CHEMISTRY_UNITS[:8]
    },
    {
        "title": "NEET Chemistry: Inorganic & Coordination Chemistry (Units 9–12)",
        "description": "Modern periodic trends, p-block elements (groups 13 to 18), transition metals, lanthanoids, and coordination complexes with crystal field theory.",
        "career": "NEET Chemistry Mastery",
        "difficulty": "intermediate",
        "units": CHEMISTRY_UNITS[8:12]
    },
    {
        "title": "NEET Chemistry: Organic Chemistry & Biomolecules (Units 13–20)",
        "description": "General Organic Chemistry, reaction mechanisms, hydrocarbons, haloalkanes, alcohols, aldehydes, amines, biomolecules, and practical qualitative analysis.",
        "career": "NEET Chemistry Mastery",
        "difficulty": "advanced",
        "units": CHEMISTRY_UNITS[12:20]
    }
]

def populate_neet():
    with app.app_context():
        print("=" * 60)
        print("Starting NEET UG 2026 Database Migration & Course Population")
        print("=" * 60)

        # 1. Ensure NEET Careers exist
        print("\n1. Ensuring NEET Careers exist in database...")
        career_map = {}
        for c_data in NEET_CAREERS:
            c = Career.query.filter_by(name=c_data["name"]).first()
            if not c:
                c = Career(name=c_data["name"], description=c_data["description"])
                db.session.add(c)
                db.session.flush()
                print(f"  + Added Career: {c.name}")
            else:
                c.description = c_data["description"]
            career_map[c.name] = c.id
        db.session.commit()

        # 2. Ensure NEET Skills exist (commit in small batches to avoid Neon timeout)
        print("\n2. Ensuring NEET Skills exist in database...")
        skill_map = {}
        batch_size = 10
        for i, (s_name, s_cat, s_desc) in enumerate(NEET_SKILLS):
            s = Skill.query.filter_by(name=s_name).first()
            if not s:
                s = Skill(name=s_name, description=f"[{s_cat}] {s_desc}")
                db.session.add(s)
                db.session.flush()
            skill_map[s_name] = s.id
            # Commit in small batches to prevent Neon connection timeout
            if (i + 1) % batch_size == 0:
                db.session.commit()
        db.session.commit()
        print(f"  -> {len(skill_map)} NEET Skills verified.")

        # 3. Clean up old non-NEET courses
        print("\n3. Purging previous non-NEET courses and curriculum hierarchy...")
        all_existing_courses = Course.query.all()
        course_ids = [c.id for c in all_existing_courses]
        
        if course_ids:
            all_topics = Topic.query.filter(Topic.course_id.in_(course_ids)).all()
            topic_ids = [t.id for t in all_topics]

            if topic_ids:
                # Remove learning path items referencing topics
                LearningPathItem.query.filter(LearningPathItem.topic_id.in_(topic_ids)).delete(synchronize_session=False)
                # Remove topic prerequisites
                TopicPrerequisite.query.filter(TopicPrerequisite.topic_id.in_(topic_ids)).delete(synchronize_session=False)
                TopicPrerequisite.query.filter(TopicPrerequisite.prerequisite_id.in_(topic_ids)).delete(synchronize_session=False)
                
                # Remove lessons and lesson progress
                all_lessons = Lesson.query.filter(Lesson.topic_id.in_(topic_ids)).all()
                lesson_ids = [l.id for l in all_lessons]
                if lesson_ids:
                    LessonProgress.query.filter(LessonProgress.lesson_id.in_(lesson_ids)).delete(synchronize_session=False)
                    Lesson.query.filter(Lesson.id.in_(lesson_ids)).delete(synchronize_session=False)
                
                Topic.query.filter(Topic.id.in_(topic_ids)).delete(synchronize_session=False)

            # Remove course skills
            CourseSkill.query.filter(CourseSkill.course_id.in_(course_ids)).delete(synchronize_session=False)
            # Remove courses
            Course.query.filter(Course.id.in_(course_ids)).delete(synchronize_session=False)
            db.session.commit()
            print(f"  -> Successfully removed {len(course_ids)} old courses.")

        # 4. Insert New NEET Courses (commit per course to avoid Neon connection timeout)
        print("\n4. Inserting New Official NEET UG 2026 Courses...")
        total_topics_count = 0
        total_lessons_count = 0

        for c_idx, c_info in enumerate(NEET_COURSES):
            car_id = career_map.get(c_info["career"], career_map["NEET MBBS Aspirant (Medical Entrance)"])
            course = Course(
                title=c_info["title"],
                description=c_info["description"],
                difficulty=c_info["difficulty"],
                career_id=car_id
            )
            db.session.add(course)
            db.session.flush()

            for t_idx, u in enumerate(c_info["units"]):
                topic = Topic(
                    course_id=course.id,
                    title=u["unit"],
                    description=u["description"],
                    order_index=t_idx + 1
                )
                db.session.add(topic)
                db.session.flush()
                total_topics_count += 1

                for l_idx, l in enumerate(u["lessons"]):
                    lesson = Lesson(
                        topic_id=topic.id,
                        title=l["title"],
                        content=l["content"],
                        order_index=l_idx + 1
                    )
                    db.session.add(lesson)
                    total_lessons_count += 1

            # Commit after each course to avoid Neon PostgreSQL timeout
            db.session.commit()
            print(f"  + Added ({c_idx+1}/{len(NEET_COURSES)}): '{course.title}' ({len(c_info['units'])} Units)")

        print("\n" + "=" * 60)
        print(f"NEET Migration Complete! Created {len(NEET_COURSES)} Courses, {total_topics_count} Units/Topics, and {total_lessons_count} In-depth Lessons.")
        print("=" * 60)

if __name__ == '__main__':
    populate_neet()
