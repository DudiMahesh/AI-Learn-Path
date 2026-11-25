// NEET 50-Question Master Question Banks per Subject
// Verified against official NMC/NTA NEET (UG) 2026 Examination Standards
// 4 Core Subjects: Physics, Chemistry, Botany & Zoology (50 Questions each = 200 Questions total)
// Official NEET Exam: 3 hours 20 minutes (200 minutes) | 180 questions to be attempted | 720 Total Marks

export const PHYSICS_50_QUESTIONS = [
  {
    id: 'p50_1',
    text: 'What is the dimensional formula of the Universal Gravitational Constant (G)?',
    options: { A: '[M⁻¹ L³ T⁻²]', B: '[M¹ L² T⁻¹]', C: '[M⁰ L² T⁻²]', D: '[M⁻² L² T⁻¹]' },
    correct: 'A',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'F = G(m₁m₂)/r² ⇒ G = F r² / m² = [MLT⁻²][L²] / [M²] = [M⁻¹ L³ T⁻²].'
  },
  {
    id: 'p50_2',
    text: 'In an experiment, percentage errors in quantities A, B, and C are 1%, 2%, and 3%. If X = A² B / √C, what is maximum percentage error in X?',
    options: { A: '4.5%', B: '5.5%', C: '6.5%', D: '3.5%' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'ΔX/X = 2(ΔA/A) + (ΔB/B) + 0.5(ΔC/C) = 2(1%) + 2% + 0.5(3%) = 5.5%.'
  },
  {
    id: 'p50_3',
    text: 'A particle is thrown vertically upwards with speed u. The time for which it remains in the air is:',
    options: { A: 'u/g', B: '2u/g', C: 'u/2g', D: 'u²/g' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'Ascent time = u/g. Total flight time = 2u/g.'
  },
  {
    id: 'p50_4',
    text: 'For a projectile launched at speed u at angle θ with horizontal, the maximum horizontal range is achieved at angle:',
    options: { A: '30°', B: '45°', C: '60°', D: '90°' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'R = u² sin(2θ) / g. Range is maximum when sin(2θ) = 1 ⇒ 2θ = 90° ⇒ θ = 45°.'
  },
  {
    id: 'p50_5',
    text: 'A block of mass 2 kg is pulled on a rough horizontal surface (μ = 0.2) with a force of 10 N. The acceleration (g = 10 m/s²) is:',
    options: { A: '3 m/s²', B: '5 m/s²', C: '2 m/s²', D: '4 m/s²' },
    correct: 'A',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'f_max = μmg = 0.2 × 2 × 10 = 4 N. F_net = 10 - 4 = 6 N. a = 6 / 2 = 3 m/s².'
  },
  {
    id: 'p50_6',
    text: 'A bob of mass m is suspended by a string of length L. The minimum horizontal speed at lowest point to complete a full vertical circle is:',
    options: { A: '√(2gL)', B: '√(3gL)', C: '√(5gL)', D: '√(4gL)' },
    correct: 'C',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'For vertical looping: tension at apex T ≥ 0 ⇒ v_top ≥ √(gL). Conservation of energy gives v_bottom = √(5gL).'
  },
  {
    id: 'p50_7',
    text: 'The work done by a conservative force along a closed path is always:',
    options: { A: 'Positive', B: 'Negative', C: 'Zero', D: 'Infinite' },
    correct: 'C',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'By definition, work done by conservative forces (gravitational, electrostatic) around any closed loop is zero.'
  },
  {
    id: 'p50_8',
    text: 'The moment of inertia of a solid cylinder of mass M and radius R about its own geometric longitudinal axis is:',
    options: { A: 'MR²', B: '½ MR²', C: '¼ MR²', D: '⅔ MR²' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'A solid cylinder about its central axis acts identical to a thick disc: I = ½ MR².'
  },
  {
    id: 'p50_9',
    text: 'If the radius of Earth shrinks by 1% while mass remains constant, the acceleration due to gravity on its surface:',
    options: { A: 'Increases by 2%', B: 'Decreases by 2%', C: 'Increases by 1%', D: 'Decreases by 1%' },
    correct: 'A',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'g = GM / R². Δg/g ≈ -2(ΔR/R). If ΔR/R = -1%, then Δg/g = -2(-1%) = +2%.'
  },
  {
    id: 'p50_10',
    text: 'What is the escape velocity from the surface of Earth (R = 6400 km, g = 9.8 m/s²)?',
    options: { A: '8.0 km/s', B: '11.2 km/s', C: '15.0 km/s', D: '9.8 km/s' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'v_e = √(2gR) = √(2 × 9.8 × 6.4 × 10⁶) ≈ 11.2 km/s.'
  },
  {
    id: 'p50_11',
    text: 'According to Hooke\'s Law, within elastic limits, stress is proportional to:',
    options: { A: 'Strain', B: '(Strain)²', C: '1/Strain', D: '√(Strain)' },
    correct: 'A',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'Hooke\'s Law states that within proportionality limit: Stress = Modulus of Elasticity × Strain.'
  },
  {
    id: 'p50_12',
    text: 'Terminal velocity of a spherical ball of radius r falling through a viscous fluid is proportional to:',
    options: { A: 'r', B: 'r²', C: 'r³', D: '1/r' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'From Stokes\' Law: v_t = 2r²(ρ - σ)g / (9η) ⇒ v_t ∝ r².'
  },
  {
    id: 'p50_13',
    text: 'Excess pressure inside a liquid drop of surface tension T and radius R is:',
    options: { A: '2T/R', B: '4T/R', C: 'T/R', D: 'T/2R' },
    correct: 'A',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'A liquid drop has one free surface: ΔP = 2T/R. (Soap bubble with two surfaces has 4T/R).'
  },
  {
    id: 'p50_14',
    text: 'Which thermodynamic process involves zero heat exchange with surroundings (dQ = 0)?',
    options: { A: 'Isothermal', B: 'Adiabatic', C: 'Isobaric', D: 'Isochoric' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'In an adiabatic process, the system is thermally insulated so dQ = 0 and dW = -dU.'
  },
  {
    id: 'p50_15',
    text: 'The efficiency of a Carnot engine working between 300 K and 600 K is:',
    options: { A: '25%', B: '50%', C: '75%', D: '100%' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'η = 1 - (T₂/T₁) = 1 - (300/600) = 0.50 = 50%.'
  },
  {
    id: 'p50_16',
    text: 'The average translational kinetic energy of an ideal gas molecule at absolute temperature T is:',
    options: { A: '½ kT', B: '3/2 kT', C: 'kT', D: '5/2 kT' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'Each translational degree of freedom has ½ kT. With 3 translational dimensions, total KE = 3/2 kT.'
  },
  {
    id: 'p50_17',
    text: 'A particle executes SHM with amplitude A. At what displacement from the mean position is KE equal to PE?',
    options: { A: 'A/2', B: 'A/√2', C: 'A/4', D: 'A/√3' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section A',
    explanation: '½mω²(A² - x²) = ½mω²x² ⇒ 2x² = A² ⇒ x = A/√2.'
  },
  {
    id: 'p50_18',
    text: 'Two waves of frequencies 250 Hz and 254 Hz produce beats. The beat period is:',
    options: { A: '4 s', B: '0.25 s', C: '0.5 s', D: '2 s' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'Beat frequency f_b = 254 - 250 = 4 Hz. Beat period T_b = 1/f_b = ¼ s = 0.25 s.'
  },
  {
    id: 'p50_19',
    text: 'Two point charges +4q and +q are placed at distance L apart. Where should a third charge Q be placed so that it is in equilibrium?',
    options: { A: '2L/3 from +4q', B: 'L/3 from +4q', C: 'L/2 from +4q', D: '3L/4 from +4q' },
    correct: 'A',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'k(4q)/x² = k(q)/(L - x)² ⇒ 2/x = 1/(L - x) ⇒ 2L - 2x = x ⇒ x = 2L/3 from +4q.'
  },
  {
    id: 'p50_20',
    text: 'Electric potential at distance r from a short electric dipole along its axial line is proportional to:',
    options: { A: '1/r', B: '1/r²', C: '1/r³', D: 'r' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'V_axial = kp / r². Electric potential of dipole falls off as 1/r².'
  },
  {
    id: 'p50_21',
    text: 'A parallel plate capacitor with plate area A and separation d has capacitance C₀. If a dielectric slab (K = 4) of thickness d/2 is inserted, the new capacitance is:',
    options: { A: '1.6 C₀', B: '2.0 C₀', C: '2.5 C₀', D: '0.8 C₀' },
    correct: 'A',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'C = ε₀A / (d - t + t/K) = ε₀A / (d - d/2 + d/8) = ε₀A / (5d/8) = (8/5) C₀ = 1.6 C₀.'
  },
  {
    id: 'p50_22',
    text: 'A uniform copper wire of resistance R is stretched uniformly to double its original length. Its new resistance is:',
    options: { A: '2 R', B: '4 R', C: 'R/2', D: 'R/4' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'Volume V = A·L is constant. When length L becomes 2L, area becomes A/2. R\' = ρ(2L)/(A/2) = 4 R.'
  },
  {
    id: 'p50_23',
    text: 'In a potentiometer experiment, a cell of EMF 1.5 V gives balance point at 60 cm. Another cell gives balance at 80 cm. EMF of the second cell is:',
    options: { A: '2.0 V', B: '1.8 V', C: '2.5 V', D: '1.2 V' },
    correct: 'A',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'E₁/E₂ = l₁/l₂ ⇒ 1.5/E₂ = 60/80 = ¾ ⇒ E₂ = 1.5 × 4/3 = 2.0 V.'
  },
  {
    id: 'p50_24',
    text: 'A proton and an alpha particle enter a uniform magnetic field with the same velocity perpendicular to B. The ratio of their radii (r_p / r_α) is:',
    options: { A: '1 : 2', B: '2 : 1', C: '1 : 4', D: '1 : 1' },
    correct: 'A',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'r = mv / (qB). r_p / r_α = (m_p / m_α) × (q_α / q_p) = (1/4) × (2/1) = 2/4 = 1/2.'
  },
  {
    id: 'p50_25',
    text: 'The magnetic field at the centre of a circular coil of N turns, radius R carrying current I is:',
    options: { A: 'μ₀NI / (2R)', B: 'μ₀NI / (4πR)', C: 'μ₀NI / R', D: 'μ₀I / (2NR)' },
    correct: 'A',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'Standard Biot-Savart result: B = μ₀ N I / (2R).'
  },
  {
    id: 'p50_26',
    text: 'The angle between magnetic meridian and geographic meridian at a place is called:',
    options: { A: 'Magnetic inclination (Dip)', B: 'Magnetic declination', C: 'Horizontal component', D: 'Zenith angle' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'Declination is the angle between the true geographic north and magnetic north.'
  },
  {
    id: 'p50_27',
    text: 'Lenz\'s law of electromagnetic induction is a consequence of which conservation law?',
    options: { A: 'Conservation of charge', B: 'Conservation of energy', C: 'Conservation of momentum', D: 'Conservation of mass' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'Lenz\'s law ensures that mechanical work done against opposing induced force converts into electrical energy.'
  },
  {
    id: 'p50_28',
    text: 'The magnetic energy stored in an inductor of inductance L carrying steady current I is:',
    options: { A: '½ L I²', B: 'L I²', C: '½ L² I', D: 'L I' },
    correct: 'A',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'U = ½ L I².'
  },
  {
    id: 'p50_29',
    text: 'In an AC circuit, V = 200 sin(100t) V and I = 2 sin(100t + π/3) A. The average power dissipated is:',
    options: { A: '200 W', B: '100 W', C: '50 W', D: '400 W' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'P = V_rms I_rms cosφ = (200/√2) × (2/√2) × cos(π/3) = 200 × ½ = 100 W.'
  },
  {
    id: 'p50_30',
    text: 'Which electromagnetic wave has the shortest wavelength in the spectrum?',
    options: { A: 'Radio waves', B: 'Microwaves', C: 'X-rays', D: 'Gamma rays' },
    correct: 'D',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'Gamma rays have the highest frequency and shortest wavelength (< 10⁻¹¹ m).'
  },
  {
    id: 'p50_31',
    text: 'A concave mirror of focal length 15 cm forms a real image at 30 cm from pole. Object distance is:',
    options: { A: '30 cm', B: '10 cm', C: '20 cm', D: '45 cm' },
    correct: 'A',
    subject: 'Physics',
    section: 'Section A',
    explanation: '1/f = 1/v + 1/u ⇒ -1/15 = -1/30 + 1/u ⇒ 1/u = -1/15 + 1/30 = -1/30 ⇒ u = -30 cm.'
  },
  {
    id: 'p50_32',
    text: 'The critical angle for total internal reflection in a medium of refractive index n = √2 into air is:',
    options: { A: '30°', B: '45°', C: '60°', D: '90°' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'sin θ_c = 1/n = 1/√2 ⇒ θ_c = 45°.'
  },
  {
    id: 'p50_33',
    text: 'In Young\'s double slit experiment, if slit separation d is halved and screen distance D is doubled, the fringe width becomes:',
    options: { A: 'Double', B: '4 times', C: 'Halved', D: 'Unchanged' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'β = λD/d. β\' = λ(2D)/(d/2) = 4 (λD/d) = 4 β.'
  },
  {
    id: 'p50_34',
    text: 'According to Brewster\'s Law, the angle of incidence i_p for complete polarization satisfies:',
    options: { A: 'sin i_p = n', B: 'tan i_p = n', C: 'cos i_p = n', D: 'cot i_p = n' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'Brewster\'s law: tan(i_p) = n.'
  },
  {
    id: 'p50_35',
    text: 'In photoelectric effect, kinetic energy of emitted photoelectrons depends solely on:',
    options: { A: 'Intensity of light', B: 'Frequency of incident light', C: 'Time of exposure', D: 'Surface area of cathode' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section A',
    explanation: 'Einstein\'s equation: KE_max = hν - Φ. Kinetic energy depends on frequency, while intensity determines current.'
  },
  // Section B
  {
    id: 'p50_36',
    text: 'The de Broglie wavelength of an electron accelerated through 100 V is:',
    options: { A: '1.227 Å', B: '0.1227 Å', C: '12.27 Å', D: '0.01227 Å' },
    correct: 'A',
    subject: 'Physics',
    section: 'Section B',
    explanation: 'λ = 12.27 / √V Å = 12.27 / √100 = 12.27 / 10 = 1.227 Å.'
  },
  {
    id: 'p50_37',
    text: 'In Bohr\'s hydrogen model, the radius of the nth orbit is proportional to:',
    options: { A: 'n', B: 'n²', C: '1/n', D: '1/n²' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section B',
    explanation: 'r_n = 0.529 n² / Z Å. Radius is proportional to n².'
  },
  {
    id: 'p50_38',
    text: 'The binding energy per nucleon is maximum for which of the following nuclei?',
    options: { A: '²H (Deuterium)', B: '⁴He', C: '⁵⁶Fe (Iron)', D: '²³⁸U' },
    correct: 'C',
    subject: 'Physics',
    section: 'Section B',
    explanation: '⁵⁶Fe has the highest binding energy per nucleon (~8.75 MeV/nucleon), making it the most stable nucleus.'
  },
  {
    id: 'p50_39',
    text: 'The half-life of a radioactive sample is 10 days. The fraction remaining undecayed after 30 days is:',
    options: { A: '⅛', B: '¼', C: '½', D: '1/16' },
    correct: 'A',
    subject: 'Physics',
    section: 'Section B',
    explanation: 'Number of half-lives n = 30/10 = 3. Remaining fraction = (½)³ = ⅛.'
  },
  {
    id: 'p50_40',
    text: 'In an intrinsic semiconductor at room temperature, the relation between electron and hole concentrations is:',
    options: { A: 'n_e > n_h', B: 'n_e = n_h', C: 'n_e < n_h', D: 'n_e = 0' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section B',
    explanation: 'In pure (intrinsic) semiconductor, thermal agitation generates equal numbers of conduction electrons and valence holes.'
  },
  {
    id: 'p50_41',
    text: 'An n-type semiconductor is obtained by doping pure Silicon with pentavalent atoms such as:',
    options: { A: 'Boron', B: 'Aluminium', C: 'Phosphorus', D: 'Indium' },
    correct: 'C',
    subject: 'Physics',
    section: 'Section B',
    explanation: 'Pentavalent dopants (Phosphorus, Arsenic, Antimony) provide extra conduction electrons, forming n-type semiconductors.'
  },
  {
    id: 'p50_42',
    text: 'Under reverse bias, the width of the depletion layer in a p-n junction diode:',
    options: { A: 'Increases', B: 'Decreases', C: 'Remains unchanged', D: 'Becomes zero' },
    correct: 'A',
    subject: 'Physics',
    section: 'Section B',
    explanation: 'Reverse bias pulls majority carriers away from junction, widening the depletion region.'
  },
  {
    id: 'p50_43',
    text: 'A Zener diode is operated primarily in which region for voltage regulation?',
    options: { A: 'Forward active region', B: 'Reverse breakdown region', C: 'Cut-off region', D: 'Saturation region' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section B',
    explanation: 'Zener diode maintains constant terminal voltage under reverse breakdown condition.'
  },
  {
    id: 'p50_44',
    text: 'The logic gate represented by Y = (A · B)\' is:',
    options: { A: 'AND Gate', B: 'NAND Gate', C: 'NOR Gate', D: 'XOR Gate' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section B',
    explanation: 'Y = NOT(A AND B) = NAND gate.'
  },
  {
    id: 'p50_45',
    text: 'Two lenses of powers +3 D and -1 D are kept in close contact. The focal length of the combination is:',
    options: { A: '50 cm', B: '25 cm', C: '100 cm', D: '-50 cm' },
    correct: 'A',
    subject: 'Physics',
    section: 'Section B',
    explanation: 'P_total = +3 - 1 = +2 D. Focal length F = 1/P = ½ m = +50 cm.'
  },
  {
    id: 'p50_46',
    text: 'A spring has spring constant k. If it is cut into two equal halves, the spring constant of each half is:',
    options: { A: 'k/2', B: '2k', C: 'k', D: '4k' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section B',
    explanation: 'Spring constant is inversely proportional to length (k ∝ 1/L). Halving length doubles the spring constant to 2k.'
  },
  {
    id: 'p50_47',
    text: 'The unit of self-inductance (Henry) expressed in SI fundamental units is:',
    options: { A: '[M L² T⁻² A⁻²]', B: '[M L² T⁻¹ A⁻²]', C: '[M L T⁻² A⁻¹]', D: '[M L² T⁻² A⁻¹]' },
    correct: 'A',
    subject: 'Physics',
    section: 'Section B',
    explanation: 'U = ½ L I² ⇒ L = 2U / I² = [M L² T⁻²] / [A²] = [M L² T⁻² A⁻²].'
  },
  {
    id: 'p50_48',
    text: 'Water flows through a horizontal pipe of non-uniform cross-section. Where velocity is maximum, pressure is:',
    options: { A: 'Maximum', B: 'Minimum', C: 'Zero', D: 'Independent of velocity' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section B',
    explanation: 'By Bernoulli\'s theorem: P + ½ρv² = constant. Higher velocity regions exhibit lower static pressure.'
  },
  {
    id: 'p50_49',
    text: 'A convex lens of glass (n = 1.5) is immersed in water (n = 1.33). Its focal length:',
    options: { A: 'Increases', B: 'Decreases', C: 'Remains same', D: 'Becomes negative' },
    correct: 'A',
    subject: 'Physics',
    section: 'Section B',
    explanation: '1/f = (n_lens/n_med - 1)(1/R₁ - 1/R₂). Relative refractive index decreases, so focal length increases (approx 4 times).'
  },
  {
    id: 'p50_50',
    text: 'The magnetic susceptibility χ of a paramagnetic substance varies with temperature T as:',
    options: { A: 'χ ∝ T', B: 'χ ∝ 1/T (Curie\'s Law)', C: 'χ ∝ T²', D: 'χ is independent of T' },
    correct: 'B',
    subject: 'Physics',
    section: 'Section B',
    explanation: 'Curie\'s Law states that paramagnetic susceptibility is inversely proportional to absolute temperature: χ = C / T.'
  }
];

export const CHEMISTRY_50_QUESTIONS = [
  {
    id: 'c50_1',
    text: 'The number of moles of solute present in 1 liter of solution is defined as:',
    options: { A: 'Molality', B: 'Molarity', C: 'Normality', D: 'Mole Fraction' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Molarity (M) = Moles of solute / Volume of solution in liters.'
  },
  {
    id: 'c50_2',
    text: 'The maximum number of electrons that can be accommodated in a subshell with azimuthal quantum number l is:',
    options: { A: '2l + 1', B: '4l + 2', C: '2n²', D: 'l(l + 1)' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Number of orbitals in subshell = (2l + 1). Each holds 2 electrons ⇒ Total = 2(2l + 1) = 4l + 2.'
  },
  {
    id: 'c50_3',
    text: 'According to Hund\'s Rule of Maximum Multiplicity, electron pairing in degenerate orbitals occurs only when:',
    options: { A: 'Each orbital holds one electron with parallel spins', B: 'All subshells are filled', C: 'Spin quantum number is zero', D: 'Temperature increases' },
    correct: 'A',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Electrons singly occupy degenerate orbitals with parallel spins before pairing begins.'
  },
  {
    id: 'c50_4',
    text: 'Which of the following elements has the highest electronegativity on Pauling scale?',
    options: { A: 'Oxygen (O)', B: 'Fluorine (F)', C: 'Chlorine (Cl)', D: 'Nitrogen (N)' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Fluorine has the highest electronegativity (approx 3.98).'
  },
  {
    id: 'c50_5',
    text: 'Which halogen has the highest negative electron gain enthalpy?',
    options: { A: 'Fluorine', B: 'Chlorine', C: 'Bromine', D: 'Iodine' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Chlorine has -349 kJ/mol electron gain enthalpy due to less inter-electronic repulsion in 3p compared to 2p of F.'
  },
  {
    id: 'c50_6',
    text: 'The shape and hybridisation of PCl₅ in gas phase are:',
    options: { A: 'sp³d, Trigonal bipyramidal', B: 'sp³d², Octahedral', C: 'sp³, Tetrahedral', D: 'dsp², Square Planar' },
    correct: 'A',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'PCl₅ has 5 bond pairs and 0 lone pairs ⇒ sp³d hybridisation with trigonal bipyramidal shape.'
  },
  {
    id: 'c50_7',
    text: 'Which of the following molecules has zero dipole moment due to symmetric geometry?',
    options: { A: 'NH₃', B: 'H₂O', C: 'BF₃', D: 'SO₂' },
    correct: 'C',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'BF₃ has trigonal planar geometry (120° bond angles). The three B-F bond dipoles cancel out completely (μ = 0).'
  },
  {
    id: 'c50_8',
    text: 'For an ideal gas undergoing isothermal expansion into vacuum (free expansion), which is true?',
    options: { A: 'w = 0, q = 0, ΔU = 0', B: 'w > 0, q = 0', C: 'ΔU > 0', D: 'w = -q' },
    correct: 'A',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Against vacuum, P_ext = 0 ⇒ w = 0. For isothermal ideal gas ΔU = 0. Thus q = 0.'
  },
  {
    id: 'c50_9',
    text: 'A reaction is spontaneous at all temperatures if:',
    options: { A: 'ΔH < 0 and ΔS > 0', B: 'ΔH > 0 and ΔS > 0', C: 'ΔH < 0 and ΔS < 0', D: 'ΔH > 0 and ΔS < 0' },
    correct: 'A',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'ΔG = ΔH - TΔS. When ΔH is negative and ΔS is positive, ΔG is always negative at all temperatures.'
  },
  {
    id: 'c50_10',
    text: 'For the Haber process N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + Heat, the equilibrium yield of NH₃ is increased by:',
    options: { A: 'High pressure and low temperature', B: 'Low pressure and high temperature', C: 'High temperature alone', D: 'Adding an inert gas at constant pressure' },
    correct: 'A',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'By Le Chatelier: exothermic reaction with Δn_g = 2 - 4 = -2 favours product at high pressure and low temperature.'
  },
  {
    id: 'c50_11',
    text: 'The pH of a 10⁻⁸ M HCl solution at 25°C is:',
    options: { A: '8', B: 'Between 6 and 7 (approx 6.96)', C: '7', D: '1' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'At very low concentration, H⁺ from auto-ionization of water (10⁻⁷ M) must be included: [H⁺] = 10⁻⁸ + 10⁻⁷ = 1.1 × 10⁻⁷ ⇒ pH ≈ 6.96 (slightly acidic).'
  },
  {
    id: 'c50_12',
    text: 'What is the oxidation state of Chromium in Potassium Dichromate (K₂Cr₂O₇)?',
    options: { A: '+3', B: '+4', C: '+6', D: '+7' },
    correct: 'C',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: '2(+1) + 2(Cr) + 7(-2) = 0 ⇒ 2Cr = 12 ⇒ Cr = +6.'
  },
  {
    id: 'c50_13',
    text: 'The unit of rate constant for a second-order reaction is:',
    options: { A: 's⁻¹', B: 'mol L⁻¹ s⁻¹', C: 'L mol⁻¹ s⁻¹', D: 'L² mol⁻² s⁻¹' },
    correct: 'C',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'k unit = (mol/L)^(1-n) s⁻¹. For n = 2: (mol/L)⁻¹ s⁻¹ = L mol⁻¹ s⁻¹.'
  },
  {
    id: 'c50_14',
    text: 'The half-life of a first-order chemical reaction is independent of:',
    options: { A: 'Temperature', B: 'Initial concentration of reactants', C: 'Catalyst', D: 'Rate constant' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'For first order: t½ = 0.693 / k. It does not depend on initial concentration [A]₀.'
  },
  {
    id: 'c50_15',
    text: 'Which of the following colligative properties is most suitable for determining molecular weights of polymers and biomolecules?',
    options: { A: 'Osmotic pressure', B: 'Elevation of boiling point', C: 'Depression of freezing point', D: 'Relative lowering of vapor pressure' },
    correct: 'A',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Osmotic pressure can be accurately measured at room temperature with high precision for dilute macromolecular solutions.'
  },
  {
    id: 'c50_16',
    text: 'The standard electrode potential (E°) of Standard Hydrogen Electrode (SHE) is assigned as:',
    options: { A: '1.0 V', B: '0.00 V', C: '-1.0 V', D: '0.76 V' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'SHE is the universal reference electrode assigned E° = 0.00 V at all temperatures.'
  },
  {
    id: 'c50_17',
    text: 'Which gas is evolved at the cathode during electrolysis of brine (concentrated aqueous NaCl)?',
    options: { A: 'Cl₂', B: 'H₂', C: 'O₂', D: 'Na metal' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'H⁺ has higher reduction potential than Na⁺ in aqueous medium: 2H₂O + 2e⁻ → H₂ + 2OH⁻ at cathode.'
  },
  {
    id: 'c50_18',
    text: 'Tyndall effect is an optical property displayed by:',
    options: { A: 'True solutions', B: 'Colloidal solutions', C: 'Ideal solutions', D: 'Pure solvents' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Colloidal particles (size 1–1000 nm) scatter visible light rays producing the Tyndall cone.'
  },
  {
    id: 'c50_19',
    text: 'The coordination number and oxidation state of cobalt in [Co(en)₃]³⁺ are respectively:',
    options: { A: '3 and +3', B: '6 and +3', C: '6 and +2', D: '3 and +6' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Ethylenediamine (en) is a bidentate ligand. 3 × 2 = 6 donor atoms (C.N. = 6). Cobalt oxidation state = +3.'
  },
  {
    id: 'c50_20',
    text: 'Which of the following ligands is an ambidentate ligand capable of bonding through two different atoms?',
    options: { A: 'H₂O', B: 'NH₃', C: 'NO₂⁻ (nitro / nitrito)', D: 'Cl⁻' },
    correct: 'C',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'NO₂⁻ can coordinate through N (-NO₂, nitro) or through O (-ONO, nitrito): ambidentate ligand.'
  },
  {
    id: 'c50_21',
    text: 'The spin-only magnetic moment of Mn²⁺ (atomic number Z = 25) in high-spin state is:',
    options: { A: '3.87 BM', B: '4.90 BM', C: '5.92 BM', D: '1.73 BM' },
    correct: 'C',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Mn²⁺ is 3d⁵ with 5 unpaired electrons. μ = √(5(5+2)) = √35 ≈ 5.92 BM.'
  },
  {
    id: 'c50_22',
    text: 'Which transition metal compound is intensely purple due to Ligand to Metal Charge Transfer (LMCT)?',
    options: { A: 'KMnO₄', B: 'K₂Cr₂O₇', C: 'CuSO₄', D: 'FeSO₄' },
    correct: 'A',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Mn(VII) in KMnO₄ has d⁰ electronic configuration; its intense purple colour arises from O²⁻ → Mn⁷⁺ charge transfer.'
  },
  {
    id: 'c50_23',
    text: 'Lanthanoid contraction is attributed to poor shielding of nuclear charge by which electrons?',
    options: { A: '5d electrons', B: '4f electrons', C: '6s electrons', D: '5p electrons' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Diffuse shapes of 4f orbitals provide poor screening, pulling outer electrons closer as Z increases.'
  },
  {
    id: 'c50_24',
    text: 'In general organic chemistry, which carbocation is the most stable due to hyperconjugation and inductive effect?',
    options: { A: 'Methyl carbocation (CH₃⁺)', B: 'Ethyl carbocation (1°)', C: 'Isopropyl carbocation (2°)', D: 'Tert-butyl carbocation (3°)' },
    correct: 'D',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Tert-butyl cation (CH₃)₃C⁺ has 9 α-hydrogens for hyperconjugation and 3 electron-donating +I methyl groups.'
  },
  {
    id: 'c50_25',
    text: 'The IUPAC name of neopentane (CH₃)₄C is:',
    options: { A: '2,2-dimethylpropane', B: '2-methylbutane', C: 'Pentane', D: '1,1,1-trimethylethane' },
    correct: 'A',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Longest continuous carbon chain has 3 carbons with two methyl substituents at C-2: 2,2-dimethylpropane.'
  },
  {
    id: 'c50_26',
    text: 'Addition of HBr to propene in the presence of benzoyl peroxide yields 1-bromopropane via:',
    options: { A: 'Markovnikov addition', B: 'Anti-Markovnikov (Kharasch / Peroxide effect)', C: 'Electrophilic substitution', D: 'Nucleophilic addition' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Peroxide generates Br• free radicals that add preferentially to form the more stable 2° alkyl free radical.'
  },
  {
    id: 'c50_27',
    text: 'In an SN2 mechanism, nucleophilic attack proceeds with:',
    options: { A: 'Complete retention of configuration', B: 'Complete inversion of configuration (Walden inversion)', C: 'Racemisation', D: 'Rearrangement of skeleton' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Backside attack by nucleophile pushes leaving group from opposite face, producing umbrella-like inversion.'
  },
  {
    id: 'c50_28',
    text: 'Lucas test is used to differentiate between primary, secondary, and tertiary alcohols using:',
    options: { A: 'Anhydrous ZnCl₂ + Conc. HCl', B: 'Cu at 573 K', C: 'KMnO₄ + H₂SO₄', D: 'PCl₅' },
    correct: 'A',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Lucas reagent (anhydrous ZnCl₂ in conc. HCl) gives immediate turbidity with 3° alcohols, in 5 min with 2°, and none at room temperature for 1°.'
  },
  {
    id: 'c50_29',
    text: 'When phenol is treated with chloroform (CHCl₃) and aqueous NaOH followed by acidification, the major product is:',
    options: { A: 'Salicylic acid', B: 'Salicylaldehyde (Reimer-Tiemann reaction)', C: 'Benzoic acid', D: 'Picric acid' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Reimer-Tiemann reaction introduces a -CHO group ortho to the phenolic -OH, yielding salicylaldehyde.'
  },
  {
    id: 'c50_30',
    text: 'Williamson ether synthesis involves the reaction of an alkyl halide with:',
    options: { A: 'Sodium alkoxide (R-O⁻ Na⁺)', B: 'Carboxylic acid', C: 'Grignard reagent', D: 'Aldehyde' },
    correct: 'A',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'R-X + R\'-O⁻Na⁺ → R-O-R\' + NaX (proceeds via SN2 pathway with 1° alkyl halides).'
  },
  {
    id: 'c50_31',
    text: 'Which reagent distinguishes aldehydes from ketones by producing a lustrous silver mirror?',
    options: { A: 'Tollens\' reagent (ammoniacal AgNO₃)', B: 'Fehling\'s solution', C: 'Benedict\'s reagent', D: 'Schiff\'s reagent' },
    correct: 'A',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Aldehydes reduce Tollens\' reagent [Ag(NH₃)₂]⁺ to metallic silver which coats the test tube inner wall.'
  },
  {
    id: 'c50_32',
    text: 'Cannizzaro reaction is characteristic of aldehydes that have:',
    options: { A: 'At least one α-hydrogen', B: 'No α-hydrogen atoms (e.g. HCHO, Benzaldehyde)', C: 'A β-hydrogen', D: 'An adjacent double bond' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Aldehydes lacking α-hydrogen undergo self-redox (disproportionation) in concentrated alkali to alcohol and salt of acid.'
  },
  {
    id: 'c50_33',
    text: 'Wolff-Kishner reduction converts carbonyl compounds (>C=O) directly into methylene (>CH₂) using:',
    options: { A: 'Zn-Hg / Conc. HCl', B: 'NH₂NH₂ (Hydrazine) followed by KOH in ethylene glycol / Heat', C: 'LiAlH₄', D: 'NaBH₄' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Wolff-Kishner uses hydrazine followed by strong base KOH/glycol under reflux.'
  },
  {
    id: 'c50_34',
    text: 'The order of acidic strength among haloacetic acids is:',
    options: { A: 'FCH₂COOH > ClCH₂COOH > BrCH₂COOH > ICH₂COOH', B: 'ICH₂COOH > BrCH₂COOH > ClCH₂COOH > FCH₂COOH', C: 'ClCH₂COOH > FCH₂COOH', D: 'All have identical acidity' },
    correct: 'A',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'Higher electronegativity of Fluorine exerts stronger -I effect, stabilizing the carboxylate conjugate base.'
  },
  {
    id: 'c50_35',
    text: 'Hofmann bromamide degradation reaction converts an acid amide into an amine having:',
    options: { A: 'One more carbon atom', B: 'One fewer carbon atom (step-down)', C: 'Same number of carbons', D: 'Double the carbons' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section A',
    explanation: 'RCONH₂ + Br₂ + 4NaOH → RNH₂ + Na₂CO₃ + 2NaBr + 2H₂O. The product amine has one carbon less.'
  },
  // Section B
  {
    id: 'c50_36',
    text: 'Hinsberg\'s reagent used to distinguish 1°, 2°, and 3° amines chemically is:',
    options: { A: 'Benzenesulfonyl chloride (C₆H₅SO₂Cl)', B: 'Acetyl chloride', C: 'Thionyl chloride', D: 'Benzoyl chloride' },
    correct: 'A',
    subject: 'Chemistry',
    section: 'Section B',
    explanation: 'C₆H₅SO₂Cl reacts with 1° amines to give alkali-soluble sulfonamides; with 2° gives alkali-insoluble sulfonamide; doesn\'t react with 3°.'
  },
  {
    id: 'c50_37',
    text: 'Carbylamine reaction is given exclusively by which class of amines?',
    options: { A: 'Primary (1°) amines (both aliphatic and aromatic)', B: 'Secondary amines', C: 'Tertiary amines', D: 'Quaternary ammonium salts' },
    correct: 'A',
    subject: 'Chemistry',
    section: 'Section B',
    explanation: 'RNH₂ + CHCl₃ + 3KOH → RNC (isocyanide with foul odor) + 3KCl + 3H₂O.'
  },
  {
    id: 'c50_38',
    text: 'The linkage connecting two monosaccharide units in a disaccharide or polysaccharide is called a:',
    options: { A: 'Peptide linkage', B: 'Glycosidic linkage', C: 'Phosphodiester linkage', D: 'Ester linkage' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section B',
    explanation: 'Monosaccharides condense via glycosidic oxygen ether bonds (-C-O-C-).'
  },
  {
    id: 'c50_39',
    text: 'Which of the following is a non-reducing sugar because both anomeric carbons are engaged in glycosidic bond?',
    options: { A: 'Glucose', B: 'Fructose', C: 'Maltose', D: 'Sucrose' },
    correct: 'D',
    subject: 'Chemistry',
    section: 'Section B',
    explanation: 'In sucrose, C-1 of α-D-glucose and C-2 of β-D-fructose form the glycosidic bond, leaving no free hemiacetal/hemiketal.'
  },
  {
    id: 'c50_40',
    text: 'The helical secondary structure of proteins (α-helix and β-pleated sheet) is stabilized by:',
    options: { A: 'Disulfide bridges', B: 'Hydrogen bonds between >C=O and -NH- groups', C: 'Peptide bonds', D: 'Van der Waals forces' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section B',
    explanation: 'Intramolecular hydrogen bonding between backbone C=O and N-H maintains secondary protein architecture.'
  },
  {
    id: 'c50_41',
    text: 'Which nitrogenous base is present in RNA but absent in DNA?',
    options: { A: 'Thymine', B: 'Uracil', C: 'Cytosine', D: 'Guanine' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section B',
    explanation: 'DNA has A, T, G, C. In RNA, Uracil (U) replaces Thymine (T).'
  },
  {
    id: 'c50_42',
    text: 'Which polymer is formed by condensation polymerization of hexamethylenediamine and adipic acid?',
    options: { A: 'Nylon-6', B: 'Nylon-6,6', C: 'Dacron (Terylene)', D: 'Bakelite' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section B',
    explanation: 'Nylon-6,6 is synthesized by step-growth polyamidation with loss of H₂O molecules.'
  },
  {
    id: 'c50_43',
    text: 'Buna-S synthetic rubber is an addition copolymer of:',
    options: { A: '1,3-Butadiene and Styrene', B: '1,3-Butadiene and Acrylonitrile', C: 'Chloroprene', D: 'Isoprene' },
    correct: 'A',
    subject: 'Chemistry',
    section: 'Section B',
    explanation: 'Bu = 1,3-butadiene, Na = sodium catalyst, S = styrene.'
  },
  {
    id: 'c50_44',
    text: 'Aspirin is chemically known as:',
    options: { A: 'Methyl salicylate', B: 'Acetylsalicylic acid', C: 'Phenyl salicylate', D: 'Salicylic acid' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section B',
    explanation: 'Acetylation of salicylic acid with acetic anhydride produces acetylsalicylic acid (aspirin).'
  },
  {
    id: 'c50_45',
    text: 'Which artificial sweetener has the highest sweetness value relative to cane sugar (approx 2000 times sweeter)?',
    options: { A: 'Aspartame', B: 'Saccharin', C: 'Sucralose', D: 'Alitame' },
    correct: 'D',
    subject: 'Chemistry',
    section: 'Section B',
    explanation: 'Alitame is high potency (~2000 times sweeter than sucrose), making control of sweetness challenging.'
  },
  {
    id: 'c50_46',
    text: 'In the extraction of iron in a blast furnace, the chemical substance acting as slag is:',
    options: { A: 'CaSiO₃ (Calcium silicate)', B: 'FeSiO₃', C: 'CaCO₃', D: 'SiO₂' },
    correct: 'A',
    subject: 'Chemistry',
    section: 'Section B',
    explanation: 'Flux (CaO) reacts with gangue (SiO₂) to form molten slag CaSiO₃ floating on top of liquid iron.'
  },
  {
    id: 'c50_47',
    text: 'Which noble gas has the lowest boiling point of any known substance (4.2 K)?',
    options: { A: 'Helium (He)', B: 'Neon (Ne)', C: 'Argon (Ar)', D: 'Krypton (Kr)' },
    correct: 'A',
    subject: 'Chemistry',
    section: 'Section B',
    explanation: 'Helium has very weak London dispersion forces due to its tiny 2-electron shell.'
  },
  {
    id: 'c50_48',
    text: 'According to Crystal Field Theory, in an octahedral complex, the d-orbitals split into two sets:',
    options: { A: 'Lower t₂g (triply degenerate) and higher eg (doubly degenerate)', B: 'Lower eg and higher t₂g', C: 'Lower d_z² and higher other 4', D: 'All 5 orbitals remain degenerate' },
    correct: 'A',
    subject: 'Chemistry',
    section: 'Section B',
    explanation: 'Axial ligands repel dx²-y² and dz² more strongly, lifting them to eg while non-axial dxy, dyz, dxz stabilize to t₂g.'
  },
  {
    id: 'c50_49',
    text: 'Which metal is purified using the Mond process based on thermal decomposition of its volatile carbonyl complex?',
    options: { A: 'Nickel (Ni)', B: 'Zirconium (Zr)', C: 'Titanium (Ti)', D: 'Copper (Cu)' },
    correct: 'A',
    subject: 'Chemistry',
    section: 'Section B',
    explanation: 'Mond process: Ni + 4CO (330-350 K) → Ni(CO)₄ (volatile) → (450-470 K) Ni (pure) + 4CO.'
  },
  {
    id: 'c50_50',
    text: 'The conjugate base of bicarbonate ion (HCO₃⁻) is:',
    options: { A: 'H₂CO₃', B: 'CO₃²⁻', C: 'CO₂', D: 'OH⁻' },
    correct: 'B',
    subject: 'Chemistry',
    section: 'Section B',
    explanation: 'Loss of a proton (H⁺) from HCO₃⁻ leaves the carbonate ion CO₃²⁻.'
  }
];

export const BIOLOGY_50_QUESTIONS = [
  // ── BOTANY (Q1 to Q25) ───────────────────────────────────────────────────
  {
    id: 'b50_1',
    text: 'The five-kingdom classification system based on complexity of cell structure, body organization, and mode of nutrition was proposed by:',
    options: { A: 'Carl Woese', B: 'R.H. Whittaker (1969)', C: 'Carolus Linnaeus', D: 'Ernst Mayr' },
    correct: 'B',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'Whittaker classified life into Monera, Protista, Fungi, Plantae, and Animalia.'
  },
  {
    id: 'b50_2',
    text: 'The cell wall of fungi is predominantly composed of:',
    options: { A: 'Cellulose', B: 'Chitin and glucans', C: 'Peptidoglycan', D: 'Pectin' },
    correct: 'B',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'Fungal cell walls contain chitin (polymer of N-acetylglucosamine).'
  },
  {
    id: 'b50_3',
    text: 'Red tide in marine waters is caused by rapid multiplication of which dinoflagellate?',
    options: { A: 'Gonyaulax', B: 'Euglena', C: 'Amoeba', D: 'Paramecium' },
    correct: 'A',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'Gonyaulax blooms produce toxins (saxitoxin) causing red tides that kill fish.'
  },
  {
    id: 'b50_4',
    text: 'Which group of plant kingdom is referred to as the "Amphibians of the Plant Kingdom"?',
    options: { A: 'Algae', B: 'Bryophytes', C: 'Pteridophytes', D: 'Gymnosperms' },
    correct: 'B',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'Bryophytes live on soil but depend on water for flagellated antherozoids to fertilize eggs.'
  },
  {
    id: 'b50_5',
    text: 'Vascular bundles where xylem and phloem lie side-by-side along the same radius with an intervening cambium are:',
    options: { A: 'Conjoint, collateral, and open', B: 'Conjoint, collateral, and closed', C: 'Radial and open', D: 'Concentric' },
    correct: 'A',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'Dicot stems have conjoint, collateral, and open bundles capable of secondary growth.'
  },
  {
    id: 'b50_6',
    text: 'Casparian strips on the radial and tangential walls of root endodermal cells are impregnated with waterproof:',
    options: { A: 'Cellulose', B: 'Suberin', C: 'Cutin', D: 'Lignin' },
    correct: 'B',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'Suberin deposition prevents apoplastic water leakage into the vascular cylinder.'
  },
  {
    id: 'b50_7',
    text: 'The primary carbon dioxide acceptor in C4 plants (e.g. maize, sugarcane) is:',
    options: { A: 'RuBP in bundle sheath', B: 'Phosphoenolpyruvate (PEP) in mesophyll', C: 'PGA in mesophyll', D: 'Oxaloacetate' },
    correct: 'B',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'PEP carboxylase in mesophyll cells fixes atmospheric CO₂ into 4-carbon oxaloacetate.'
  },
  {
    id: 'b50_8',
    text: 'During non-cyclic photophosphorylation (Z-scheme), photolysis of water occurs at which site?',
    options: { A: 'PS I', B: 'Oxygen-evolving complex of PS II (lumen side)', C: 'Cytochrome b6f complex', D: 'Stroma' },
    correct: 'B',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'Water oxidation complex is associated with PS II on the inner lumen thylakoid side.'
  },
  {
    id: 'b50_9',
    text: 'In glycolysis, the enzyme that catalyzes the phosphorylation of glucose to glucose-6-phosphate utilizing one ATP is:',
    options: { A: 'Phosphofructokinase', B: 'Hexokinase', C: 'Aldolase', D: 'Pyruvate kinase' },
    correct: 'B',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'Hexokinase irreversibly traps glucose inside cytoplasm using ATP.'
  },
  {
    id: 'b50_10',
    text: 'The terminal electron acceptor in the mitochondrial electron transport system (ETS) of aerobic respiration is:',
    options: { A: 'Cytochrome c', B: 'Molecular Oxygen (O₂)', C: 'NAD⁺', D: 'Ubiquinone' },
    correct: 'B',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'O₂ accepts electrons from Cytochrome c oxidase (Complex IV) and protons to form water.'
  },
  {
    id: 'b50_11',
    text: 'Which phytohormone induces rapid stem/internode elongation in rosette plants (bolting)?',
    options: { A: 'Auxin', B: 'Gibberellin (GA₃)', C: 'Cytokinin', D: 'Ethylene' },
    correct: 'B',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'Gibberellins stimulate cell division and elongation, triggering bolting prior to flowering.'
  },
  {
    id: 'b50_12',
    text: 'The gaseous plant hormone responsible for commercial fruit ripening is:',
    options: { A: 'Auxin', B: 'Abscisic acid', C: 'Ethylene', D: 'Cytokinin' },
    correct: 'C',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'Ethylene gas promotes ripening by stimulating respiration (climacteric rise).'
  },
  {
    id: 'b50_13',
    text: 'The process of double fertilization in angiosperms involves:',
    options: { A: 'Two male gametes fusing with one egg', B: 'Syngamy (1 male gamete + egg) and Triple fusion (1 male gamete + 2 polar nuclei)', C: 'Fertilization without pollen tube', D: 'Fusion of vegetative cell with antipodals' },
    correct: 'B',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'Syngamy creates the 2n zygote; triple fusion produces the 3n primary endosperm nucleus.'
  },
  {
    id: 'b50_14',
    text: 'The hard outer layer of a pollen grain (exine) is made of the most resistant biological material known:',
    options: { A: 'Cellulose', B: 'Sporopollenin', C: 'Pectin', D: 'Chitin' },
    correct: 'B',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'Sporopollenin withstands high temperatures, strong acids, and alkali; no known enzyme degrades it.'
  },
  {
    id: 'b50_15',
    text: 'Apomixis in Asteraceae and grasses refers to seed production:',
    options: { A: 'Without fertilization', B: 'Through vegetative cuttings', C: 'With cross pollination', D: 'By parthenocarpy' },
    correct: 'A',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'Apomixis is asexual reproduction mimicking sexual seed formation without syngamy.'
  },
  {
    id: 'b50_16',
    text: 'In a dihybrid cross between heterozygous individuals (AaBb × AaBb), the phenotypic ratio is:',
    options: { A: '9:3:3:1', B: '1:2:1', C: '3:1', D: '9:7' },
    correct: 'A',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'Mendel\'s independent assortment yields 9 round-yellow : 3 round-green : 3 wrinkled-yellow : 1 wrinkled-green.'
  },
  {
    id: 'b50_17',
    text: 'The experimental proof of the semi-conservative nature of DNA replication in E. coli was provided by:',
    options: { A: 'Hershey and Chase', B: 'Meselson and Stahl (1958) using ¹⁵N', C: 'Watson and Crick', D: 'Griffith' },
    correct: 'B',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'Meselson and Stahl used heavy isotope ¹⁵NH₄Cl and CsCl density gradient centrifugation.'
  },
  {
    id: 'b50_18',
    text: 'The start codon in prokaryotes and eukaryotes is AUG, which codes for which amino acid?',
    options: { A: 'Valine', B: 'Methionine (Formyl-methionine in bacteria)', C: 'Glycine', D: 'Alanine' },
    correct: 'B',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'AUG initiates translation and specifies Methionine.'
  },
  {
    id: 'b50_19',
    text: 'In the Lac operon of E. coli, lactose acts as the:',
    options: { A: 'Repressor', B: 'Inducer', C: 'Corepressor', D: 'Promoter' },
    correct: 'B',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'Allolactose binds to the repressor protein, inactivating it to allow RNA polymerase transcription.'
  },
  {
    id: 'b50_20',
    text: 'Bt toxin protein produced by Bacillus thuringiensis is converted to its active toxic form in the insect gut due to:',
    options: { A: 'Acidic pH', B: 'Alkaline pH of the midgut', C: 'Enzymatic hydrolysis in mouth', D: 'High body temperature' },
    correct: 'B',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'Inactive protoxin crystals dissolve and activate in the insect\'s alkaline midgut, creating pores in epithelial cells.'
  },
  {
    id: 'b50_21',
    text: 'Golden rice is a genetically engineered crop designed to biosynthesize provitamin A (beta-carotene) to combat:',
    options: { A: 'Scurvy', B: 'Night blindness and Vitamin A deficiency', C: 'Rickets', D: 'Beriberi' },
    correct: 'B',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'Engineered with daffodil/bacterial genes to express β-carotene in endosperm.'
  },
  {
    id: 'b50_22',
    text: 'According to Lindeman\'s 10% law of energy transfer, how much energy is transferred from one trophic level to the next?',
    options: { A: '1%', B: '10%', C: '50%', D: '90%' },
    correct: 'B',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'Only approx 10% of energy is converted into biomass at the successive trophic level.'
  },
  {
    id: 'b50_23',
    text: 'The ecological pyramid that is ALWAYS upright in any terrestrial or aquatic ecosystem is the:',
    options: { A: 'Pyramid of biomass', B: 'Pyramid of energy', C: 'Pyramid of numbers', D: 'All pyramids can invert' },
    correct: 'B',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'Energy is dissipated as heat at every trophic transfer (2nd law of thermodynamics); it can never invert.'
  },
  {
    id: 'b50_24',
    text: 'The Amazon rainforest is often termed the "Lungs of the Planet" because it contributes an estimated:',
    options: { A: '5% of Earth\'s oxygen', B: '20% of the total oxygen in Earth\'s atmosphere', C: '50% of oxygen', D: '80% of oxygen' },
    correct: 'B',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'Produces an estimated 20% of global photosynthetic oxygen output.'
  },
  {
    id: 'b50_25',
    text: 'Which of the following is an example of in-situ biodiversity conservation?',
    options: { A: 'Zoological parks', B: 'National Parks and Biosphere Reserves', C: 'Botanical gardens', D: 'Seed banks' },
    correct: 'B',
    subject: 'Biology',
    section: 'Botany',
    explanation: 'In-situ preserves species within natural ecosystems; zoos and seed banks are ex-situ.'
  },

  // ── ZOOLOGY (Q26 to Q50) ─────────────────────────────────────────────────
  {
    id: 'b50_26',
    text: 'Radial symmetry and diploblastic body organization are characteristic of which animal phylum?',
    options: { A: 'Platyhelminthes', B: 'Cnidaria (Coelenterata)', C: 'Annelida', D: 'Arthropoda' },
    correct: 'B',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Cnidarians (hydra, jellyfish) possess two germ layers (ectoderm and endoderm) and radial symmetry.'
  },
  {
    id: 'b50_27',
    text: 'The largest phylum of Animalia, which encompasses over two-thirds of all named animal species on Earth, is:',
    options: { A: 'Mollusca', B: 'Arthropoda', C: 'Chordata', D: 'Echinodermata' },
    correct: 'B',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Arthropoda is the largest phylum, characterized by jointed appendages and chitinous exoskeleton.'
  },
  {
    id: 'b50_28',
    text: 'Which cell junction prevents leakage of substances across epithelial tissue layers?',
    options: { A: 'Tight junctions (zonula occludens)', B: 'Gap junctions', C: 'Adhering junctions (desmosomes)', D: 'Hemidesmosomes' },
    correct: 'A',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Tight junctions seal adjacent cell membranes together to prevent paracellular fluid leakage.'
  },
  {
    id: 'b50_29',
    text: 'The structural and functional filtration unit of the human kidney is the:',
    options: { A: 'Nephron', B: 'Glomerulus', C: 'Bowman\'s capsule', D: 'Renal pyramid' },
    correct: 'A',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Each human kidney contains ~1 million nephrons.'
  },
  {
    id: 'b50_30',
    text: 'In human digestion, pepsinogen is secreted by chief (peptic) cells and activated into pepsin by:',
    options: { A: 'Bile juice', B: 'Hydrochloric acid (HCl)', C: 'Enterokinase', D: 'Trypsin' },
    correct: 'B',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Parietal cells secrete HCl (pH 1.8), which autocatalytically cleaves pepsinogen to active pepsin.'
  },
  {
    id: 'b50_31',
    text: 'The volume of air inspired or expired during a normal respiration cycle (Tidal Volume, TV) is approximately:',
    options: { A: '500 mL', B: '1000 mL', C: '2500 mL', D: '1200 mL' },
    correct: 'A',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Resting tidal volume in a healthy human adult is ~500 mL (approx 6000–8000 mL/min).'
  },
  {
    id: 'b50_32',
    text: 'Oxygen-haemoglobin dissociation curve shifts to the right (Bohr effect) under which conditions?',
    options: { A: 'High pO₂ and low temperature', B: 'High pCO₂, high H⁺ concentration (low pH), and elevated temperature', C: 'Low pCO₂ and high pH', D: 'Zero CO₂' },
    correct: 'B',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'High CO₂, acidity, and temperature reduce Hb affinity for O₂, facilitating oxygen release in tissues.'
  },
  {
    id: 'b50_33',
    text: 'The pacemaker of the human heart that generates rhythmic action potentials at 70–75 times per minute is:',
    options: { A: 'AV Node', B: 'Sino-Atrial (SA) Node', C: 'Bundle of His', D: 'Purkinje fibres' },
    correct: 'B',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'SA node in right atrium initiates action potentials autonomously.'
  },
  {
    id: 'b50_34',
    text: 'Erythroblastosis fetalis occurs when an Rh-negative mother carries an:',
    options: { A: 'Rh-negative fetus', B: 'Rh-positive fetus during second or subsequent pregnancies', C: 'ABO incompatible fetus', D: 'O negative fetus' },
    correct: 'B',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Maternal anti-Rh antibodies cross placenta and hemolyze Rh⁺ fetal RBCs.'
  },
  {
    id: 'b50_35',
    text: 'Renin is released by juxtaglomerular (JG) cells in response to a fall in glomerular blood pressure to convert:',
    options: { A: 'Angiotensinogen to Angiotensin I', B: 'Angiotensin I to II', C: 'Aldosterone to Cortisol', D: 'ADH to Vasopressin' },
    correct: 'A',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Renin converts liver-derived plasma angiotensinogen to angiotensin I, initiating the RAAS pathway.'
  },
  {
    id: 'b50_36',
    text: 'The functional contractile unit of a myofibril between two successive Z-lines is the:',
    options: { A: 'Sarcomere', B: 'I-band', C: 'A-band', D: 'H-zone' },
    correct: 'A',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Sarcomere bounded by two Z-discs is the basic repeating contractile unit.'
  },
  {
    id: 'b50_37',
    text: 'According to the sliding filament theory of muscle contraction, which zone shortens and may disappear entirely?',
    options: { A: 'A-band', B: 'H-zone', C: 'Z-line width', D: 'Myosin filament length' },
    correct: 'B',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Actin slides over myosin into the central H-zone, shortening the sarcomere while A-band length remains unchanged.'
  },
  {
    id: 'b50_38',
    text: 'During nerve impulse transmission, depolarization of the axon membrane is caused by rapid influx of:',
    options: { A: 'K⁺ ions', B: 'Na⁺ ions', C: 'Ca²⁺ ions', D: 'Cl⁻ ions' },
    correct: 'B',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Opening of voltage-gated sodium channels allows Na⁺ to rush into the axoplasm (+30 mV).'
  },
  {
    id: 'b50_39',
    text: 'Which endocrine hormone decreases blood glucose level by stimulating cellular glucose uptake and glycogenesis?',
    options: { A: 'Glucagon', B: 'Insulin (secreted by β-cells of islets of Langerhans)', C: 'Cortisol', D: 'Adrenaline' },
    correct: 'B',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Insulin facilitates GLUT-4 translocation and promotes glycogen storage in liver and muscles.'
  },
  {
    id: 'b50_40',
    text: 'Sertoli cells located in seminiferous tubules provide nutrition to developing:',
    options: { A: 'Leydig cells', B: 'Spermatozoa (spermatids)', C: 'Intercellular stroma', D: 'Prostate gland' },
    correct: 'B',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Sertoli (nurse) cells anchor and nourish differentiating germ cells.'
  },
  {
    id: 'b50_41',
    text: 'Ovulation in the human female menstrual cycle is triggered by a sudden surge in which gonadotropin around day 14?',
    options: { A: 'FSH', B: 'Luteinizing Hormone (LH surge)', C: 'Progesterone', D: 'Prolactin' },
    correct: 'B',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Peak LH secretion ruptures the mature Graafian follicle to release the secondary oocyte.'
  },
  {
    id: 'b50_42',
    text: 'The hormone detected in maternal urine by home pregnancy diagnostic kits (e.g. Prega News) is:',
    options: { A: 'hCG (human Chorionic Gonadotropin)', B: 'Estrogen', C: 'Progesterone', D: 'Oxytocin' },
    correct: 'A',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Placental trophoblasts secrete hCG soon after blastocyst implantation.'
  },
  {
    id: 'b50_43',
    text: 'Surgical sterilization in human males where a small portion of the vas deferens is cut and tied off is called:',
    options: { A: 'Tubectomy', B: 'Vasectomy', C: 'Hysterectomy', D: 'Castration' },
    correct: 'B',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Vasectomy blocks sperm transport into ejaculatory duct.'
  },
  {
    id: 'b50_44',
    text: 'Down\'s syndrome is an autosomal genetic disorder caused by:',
    options: { A: 'Monosomy of chromosome 21', B: 'Trisomy of chromosome 21 (47, +21)', C: 'Klinefelter karyotype', D: 'Deletion of chromosome 5' },
    correct: 'B',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Caused by non-disjunction leading to three copies of chromosome 21 (Langdon Down, 1866).'
  },
  {
    id: 'b50_45',
    text: 'Hemophilia and Red-Green color blindness are inherited as:',
    options: { A: 'Autosomal dominant traits', B: 'X-linked recessive disorders', C: 'Y-linked traits', D: 'Mitochondrial disorders' },
    correct: 'B',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Carried on X chromosome; males (XY) expressing the single mutant allele are affected.'
  },
  {
    id: 'b50_46',
    text: 'Homologous organs (e.g. forelimbs of human, bat, cheetah, and whale) exhibit:',
    options: { A: 'Similar structure/origin with divergent evolution', B: 'Different origin with convergent evolution', C: 'No evolutionary significance', D: 'Analogous functions only' },
    correct: 'A',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Homology indicates common anatomical ancestry adapted to different ecological functions (divergent evolution).'
  },
  {
    id: 'b50_47',
    text: 'According to Hardy-Weinberg equilibrium, the gene frequency in a population remains constant generation after generation in absence of:',
    options: { A: 'Mutation, gene migration, genetic drift, genetic recombination, and natural selection', B: 'Random mating only', C: 'Large population size', D: 'Diploidy' },
    correct: 'A',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Hardy-Weinberg equilibrium (p² + 2pq + q² = 1) holds when evolutionary forces are absent.'
  },
  {
    id: 'b50_48',
    text: 'In recombinant DNA technology, the thermal-stable DNA polymerase enzyme (Taq polymerase) is isolated from:',
    options: { A: 'Escherichia coli', B: 'Thermus aquaticus (thermophilic bacterium)', C: 'Agrobacterium tumefaciens', D: 'Bacillus subtilis' },
    correct: 'B',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Taq polymerase survives the high denaturation temperatures (94–95°C) in PCR cycles.'
  },
  {
    id: 'b50_49',
    text: 'The first clinical human gene therapy trial was conducted in 1990 on a 4-year-old girl suffering from deficiency of:',
    options: { A: 'Adenosine Deaminase (ADA)', B: 'Insulin', C: 'Growth hormone', D: 'Hemoglobin' },
    correct: 'A',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Used retroviral vectors to introduce functional ADA cDNA into patient lymphocytes.'
  },
  {
    id: 'b50_50',
    text: 'Which antibody is synthesized in highest concentrations during an allergic reaction and binds to mast cell surfaces?',
    options: { A: 'IgG', B: 'IgA', C: 'IgE', D: 'IgM' },
    correct: 'C',
    subject: 'Biology',
    section: 'Zoology',
    explanation: 'Allergens cross-link IgE bound to mast cells and basophils, triggering histamine release.'
  }
];

export const BOTANY_50_QUESTIONS = [
  ...BIOLOGY_50_QUESTIONS.slice(0, 25).map((q, i) => ({
    ...q,
    id: `bot50_${i + 1}`,
    subject: 'Botany',
    section: i < 35 ? 'Section A' : 'Section B'
  })),
  {
    id: 'bot50_26',
    text: 'Kranz anatomy with large, agranal bundle sheath cells containing abundant Rubisco is characteristic of:',
    options: { A: 'C3 plants (Wheat, Rice)', B: 'C4 plants (Maize, Sugarcane)', C: 'CAM plants (Pineapple)', D: 'Gymnosperms' },
    correct: 'B',
    subject: 'Botany',
    section: 'Section A',
    explanation: 'Kranz anatomy in C4 plants isolates Rubisco in bundle sheath cells away from O₂ to prevent photorespiration.'
  },
  {
    id: 'bot50_27',
    text: 'When a plant cell is immersed in a hypertonic solution, water diffuses out causing the protoplast to shrink away from the cell wall. This phenomenon is:',
    options: { A: 'Imbibition', B: 'Plasmolysis', C: 'Endosmosis', D: 'Guttation' },
    correct: 'B',
    subject: 'Botany',
    section: 'Section A',
    explanation: 'Plasmolysis occurs when water leaves the cell via exosmosis into the concentrated external solution.'
  },
  {
    id: 'bot50_28',
    text: 'Which micronutrient element is essentially required for the photolysis of water during the light reaction of photosynthesis?',
    options: { A: 'Iron (Fe)', B: 'Manganese (Mn) and Chlorine (Cl)', C: 'Zinc (Zn)', D: 'Molybdenum (Mo)' },
    correct: 'B',
    subject: 'Botany',
    section: 'Section A',
    explanation: 'The oxygen-evolving complex of PS II requires Mn²⁺, Ca²⁺, and Cl⁻ to split H₂O into 2H⁺, 2e⁻, and ½O₂.'
  },
  {
    id: 'bot50_29',
    text: 'In the Calvin (C3) cycle, how many molecules of ATP and NADPH are consumed to fix one molecule of CO₂?',
    options: { A: '2 ATP and 2 NADPH', B: '3 ATP and 2 NADPH', C: '1 ATP and 1 NADPH', D: '3 ATP and 3 NADPH' },
    correct: 'B',
    subject: 'Botany',
    section: 'Section A',
    explanation: 'To fix 1 CO₂: 2 ATP in reduction + 1 ATP in RuBP regeneration = 3 ATP, along with 2 NADPH in reduction (total 18 ATP, 12 NADPH for 1 glucose).'
  },
  {
    id: 'bot50_30',
    text: 'Which gaseous phytohormone accelerates fruit ripening and promotes abscission and horizontal growth of seedlings?',
    options: { A: 'Auxin', B: 'Gibberellin', C: 'Ethylene', D: 'Abscisic Acid' },
    correct: 'C',
    subject: 'Botany',
    section: 'Section A',
    explanation: 'Ethylene (C₂H₄) is the only gaseous hormone; it triggers the respiratory climacteric during ripening.'
  },
  {
    id: 'bot50_31',
    text: 'The site of perception of light/dark stimulus for photoperiodic induction of flowering in plants is the:',
    options: { A: 'Stem apex', B: 'Leaves', C: 'Roots', D: 'Floral buds' },
    correct: 'B',
    subject: 'Botany',
    section: 'Section A',
    explanation: 'Leaves perceive the photoperiodic signal via phytochromes and synthesize florigen which migrates to shoot apex.'
  },
  {
    id: 'bot50_32',
    text: 'Flowers that never open and strictly undergo autogamy without requiring external pollinating agents are:',
    options: { A: 'Chasmogamous flowers', B: 'Cleistogamous flowers', C: 'Geitonogamous flowers', D: 'Xenogamous flowers' },
    correct: 'B',
    subject: 'Botany',
    section: 'Section A',
    explanation: 'Cleistogamous flowers (e.g. Viola, Oxalis, Commelina) remain closed, guaranteeing 100% seed set even in absence of pollinators.'
  },
  {
    id: 'bot50_33',
    text: 'The most common type of female gametophyte (embryo sac) in angiosperms is monosporic Polygonum type, which is:',
    options: { A: '7-celled, 8-nucleate', B: '8-celled, 7-nucleate', C: '7-celled, 7-nucleate', D: '8-celled, 8-nucleate' },
    correct: 'A',
    subject: 'Botany',
    section: 'Section A',
    explanation: 'Contains 3 antipodals, 2 synergids, 1 egg cell (all haploid) + 1 large central cell with 2 polar nuclei = 7 cells, 8 nuclei.'
  },
  {
    id: 'bot50_34',
    text: 'The primary endosperm nucleus (PEN) in angiosperms is formed by triple fusion of one male gamete (n) with two polar nuclei (n+n). Its ploidy is:',
    options: { A: 'Haploid (n)', B: 'Diploid (2n)', C: 'Triploid (3n)', D: 'Tetraploid (4n)' },
    correct: 'C',
    subject: 'Botany',
    section: 'Section A',
    explanation: 'Syngamy gives diploid zygote (2n), while triple fusion produces triploid endosperm (3n).'
  },
  {
    id: 'bot50_35',
    text: 'The respiratory quotient (RQ) value for the complete aerobic oxidation of tripalmitin (a triglyceride fat) is:',
    options: { A: '1.0', B: '0.7', C: '0.9', D: 'Infinity' },
    correct: 'B',
    subject: 'Botany',
    section: 'Section A',
    explanation: '2(C₅₁H₉₈O₆) + 145 O₂ → 102 CO₂ + 98 H₂O + Energy. RQ = 102 CO₂ / 145 O₂ ≈ 0.7.'
  },
  {
    id: 'bot50_36',
    text: 'During chemiosmotic ATP synthesis in chloroplast thylakoids, protons accumulate in high concentration inside the:',
    options: { A: 'Stroma', B: 'Thylakoid lumen', C: 'Intermembrane space', D: 'Outer membrane' },
    correct: 'B',
    subject: 'Botany',
    section: 'Section B',
    explanation: 'Water splitting and plastoquinone pump H⁺ into lumen, creating proton gradient across CF0-CF1 into stroma.'
  },
  {
    id: 'bot50_37',
    text: 'The loss of water in the form of liquid droplets through hydathodes at vein margins of herbaceous leaves under high root pressure is:',
    options: { A: 'Transpiration', B: 'Guttation', C: 'Bleeding', D: 'Osmosis' },
    correct: 'B',
    subject: 'Botany',
    section: 'Section B',
    explanation: 'Guttation occurs in early morning when root pressure is high and transpiration is very low.'
  },
  {
    id: 'bot50_38',
    text: 'The nitrogenase enzyme responsible for biological N₂ fixation in root nodules is extremely sensitive to molecular oxygen. It is protected by:',
    options: { A: 'Cytochrome c', B: 'Leghemoglobin (oxygen scavenger)', C: 'Ferredoxin', D: 'Phytochrome' },
    correct: 'B',
    subject: 'Botany',
    section: 'Section B',
    explanation: 'Pink leghemoglobin scavenges O₂ to maintain an anaerobic micro-environment inside the bacteroid.'
  },
  {
    id: 'bot50_39',
    text: 'Incomplete dominance in flower color of Antirrhinum majus (Snapdragon) shows an F2 phenotypic and genotypic ratio of:',
    options: { A: '3 : 1', B: '1 : 2 : 1 (Red : Pink : White)', C: '9 : 3 : 3 : 1', D: '2 : 1' },
    correct: 'B',
    subject: 'Botany',
    section: 'Section B',
    explanation: 'Neither allele is completely dominant; Rr heterozygotes produce intermediate pink flowers.'
  },
  {
    id: 'bot50_40',
    text: 'Apomixis, the development of seeds without fertilization observed in Asteraceae and grasses, is a form of:',
    options: { A: 'Sexual reproduction mimicking asexual', B: 'Asexual reproduction mimicking sexual reproduction', C: 'Amphimixis', D: 'Parthenocarpy' },
    correct: 'B',
    subject: 'Botany',
    section: 'Section B',
    explanation: 'Apomixis produces clonal seeds without syngamy or meiosis, preserving hybrid vigor.'
  },
  {
    id: 'bot50_41',
    text: 'Pioneer community in primary xerarch ecological succession on bare rock is:',
    options: { A: 'Mosses', B: 'Crustose and foliose lichens', C: 'Annual grasses', D: 'Shrubs' },
    correct: 'B',
    subject: 'Botany',
    section: 'Section B',
    explanation: 'Lichens secrete organic acids that erode rocks into fine soil particles, paving the way for bryophytes.'
  },
  {
    id: 'bot50_42',
    text: 'In an aquatic marine ecosystem, the pyramid of biomass is inverted because:',
    options: { A: 'Phytoplankton biomass is much smaller than zooplankton and fish biomass', B: 'Producers live longer', C: 'Fishes have lower energy', D: 'Solar radiation is low' },
    correct: 'A',
    subject: 'Botany',
    section: 'Section B',
    explanation: 'Phytoplankton have high turnover rate and short lifespans, supporting larger standing biomass of consumers.'
  },
  {
    id: 'bot50_43',
    text: 'Which of the following is an ex-situ biodiversity conservation technique?',
    options: { A: 'National Parks', B: 'Wildlife Sanctuaries', C: 'Botanical Gardens and Cryopreservation', D: 'Biosphere Reserves' },
    correct: 'C',
    subject: 'Botany',
    section: 'Section B',
    explanation: 'Botanical gardens, seed banks, and cryopreservation (-196°C in liquid N₂) conserve species outside their natural habitat.'
  },
  {
    id: 'bot50_44',
    text: 'The enzyme ribulose-1,5-bisphosphate carboxylase-oxygenase (Rubisco) constitutes what percentage of total soluble leaf protein?',
    options: { A: '~5%', B: '~16%', C: '~40%', D: '~80%' },
    correct: 'B',
    subject: 'Botany',
    section: 'Section B',
    explanation: 'Rubisco is the most abundant protein on Earth, making up 16% of chloroplast soluble protein.'
  },
  {
    id: 'bot50_45',
    text: 'Polygenic inheritance in human skin color and wheat kernel color is characterized by a bell-shaped distribution governed by:',
    options: { A: 'A single dominant gene', B: 'Three or more cumulative additive gene pairs', C: 'Epistatic repression', D: 'Multiple alleles of one gene' },
    correct: 'B',
    subject: 'Botany',
    section: 'Section B',
    explanation: 'Polygenic traits (AABBCC) exhibit continuous phenotypic variation based on additive allele dosages.'
  },
  {
    id: 'bot50_46',
    text: 'In the electron transport chain (ETS) of mitochondria, Complex IV is also designated as:',
    options: { A: 'NADH dehydrogenase', B: 'Succinate dehydrogenase', C: 'Cytochrome c oxidase', D: 'ATP synthase' },
    correct: 'C',
    subject: 'Botany',
    section: 'Section B',
    explanation: 'Complex IV contains cytochromes a and a3 plus two copper centers, transferring electrons to molecular oxygen.'
  },
  {
    id: 'bot50_47',
    text: 'The gaseous cycle among biogeochemical cycles is represented by:',
    options: { A: 'Phosphorus and Sulphur', B: 'Carbon and Nitrogen', C: 'Calcium and Phosphorus', D: 'Magnesium and Potassium' },
    correct: 'B',
    subject: 'Botany',
    section: 'Section B',
    explanation: 'Carbon and Nitrogen reservoirs reside in the atmosphere (gaseous), unlike sedimentary Phosphorus.'
  },
  {
    id: 'bot50_48',
    text: 'The term "Ecosystem" was officially coined by which ecologist in 1935?',
    options: { A: 'E.P. Odum', B: 'A.G. Tansley', C: 'Ramdeo Misra', D: 'Ernst Haeckel' },
    correct: 'B',
    subject: 'Botany',
    section: 'Section B',
    explanation: 'Arthur G. Tansley coined the term Ecosystem in 1935.'
  },
  {
    id: 'bot50_49',
    text: 'In terrestrial ecosystems, the largest reservoir of carbon is found in:',
    options: { A: 'Atmospheric CO₂', B: 'Fossil fuels and oceans', C: 'Living biomass', D: 'Soil humus' },
    correct: 'B',
    subject: 'Botany',
    section: 'Section B',
    explanation: 'Oceans hold 71% of global dissolved carbon, followed by fossil fuel reservoirs.'
  },
  {
    id: 'bot50_50',
    text: 'Species-Area relationship developed by Alexander von Humboldt is mathematically expressed as:',
    options: { A: 'log S = log C + Z log A', B: 'S = CAᶻ', C: 'Both A and B', D: 'log S = Z log C + log A' },
    correct: 'C',
    subject: 'Botany',
    section: 'Section B',
    explanation: 'Rectangular hyperbola equation S = CAᶻ transforms to linear log S = log C + Z log A (Z = slope of line).'
  }
];

export const ZOOLOGY_50_QUESTIONS = [
  ...BIOLOGY_50_QUESTIONS.slice(25, 50).map((q, i) => ({
    ...q,
    id: `zoo50_${i + 1}`,
    subject: 'Zoology',
    section: i < 35 ? 'Section A' : 'Section B'
  })),
  {
    id: 'zoo50_26',
    text: 'The water vascular system which functions in locomotion, food capture, and respiration is unique to Phylum:',
    options: { A: 'Mollusca', B: 'Arthropoda', C: 'Echinodermata', D: 'Annelida' },
    correct: 'C',
    subject: 'Zoology',
    section: 'Section A',
    explanation: 'Echinoderms possess a coelomic water vascular system with tube feet (podia).'
  },
  {
    id: 'zoo50_27',
    text: 'The volume of air inspired or expired during a normal respiration cycle in a healthy adult human is Tidal Volume (TV), which is approximately:',
    options: { A: '500 mL (~6000-8000 mL/min)', B: '1100 mL', C: '2500 mL', D: '150 mL' },
    correct: 'A',
    subject: 'Zoology',
    section: 'Section A',
    explanation: 'Normal resting tidal volume is ~500 mL per breath (6–8 L per minute).'
  },
  {
    id: 'zoo50_28',
    text: 'In human heart, the Sino-Atrial (SA) node acts as the primary pacemaker because it:',
    options: { A: 'Is located in left ventricle', B: 'Generates the maximum frequency of action potentials (~70-75/min)', C: 'Has direct connection to aorta', D: 'Prevents backflow of blood' },
    correct: 'B',
    subject: 'Zoology',
    section: 'Section A',
    explanation: 'The SA node self-excites at highest intrinsic rate (72 bpm), entraining cardiac rhythm.'
  },
  {
    id: 'zoo50_29',
    text: 'In a standard electrocardiogram (ECG), the QRS complex represents:',
    options: { A: 'Atrial depolarization', B: 'Ventricular depolarization', C: 'Ventricular repolarization', D: 'Atrial repolarization' },
    correct: 'B',
    subject: 'Zoology',
    section: 'Section A',
    explanation: 'QRS corresponds to the wave of ventricular electrical depolarization triggering ventricular systole.'
  },
  {
    id: 'zoo50_30',
    text: 'The functional unit of muscle contraction between two successive Z-lines is designated as:',
    options: { A: 'Myofibril', B: 'Sarcomere', C: 'Sarcolemma', D: 'Fascicle' },
    correct: 'B',
    subject: 'Zoology',
    section: 'Section A',
    explanation: 'A sarcomere contains a complete A-band flanked by two half I-bands between adjacent Z-discs.'
  },
  {
    id: 'zoo50_31',
    text: 'Juxtaglomerular cells in the afferent renal arteriole secrete the enzyme Renin when there is a:',
    options: { A: 'Rise in blood pressure', B: 'Fall in glomerular filtration rate (GFR) or arterial pressure', C: 'Excess blood volume', D: 'High Na⁺ concentration in filtrate' },
    correct: 'B',
    subject: 'Zoology',
    section: 'Section A',
    explanation: 'Drop in renal perfusion pressure causes JG cells to release renin, activating the RAAS cascade.'
  },
  {
    id: 'zoo50_32',
    text: 'The resting axonal membrane potential (-70 mV) is maintained actively against concentration gradients by:',
    options: { A: 'Passive diffusion of Na⁺', B: 'Sodium-Potassium ATPase pump (3 Na⁺ pumped out for 2 K⁺ pumped in)', C: 'Calcium channels', D: 'Chloride efflux' },
    correct: 'B',
    subject: 'Zoology',
    section: 'Section A',
    explanation: 'The Na⁺/K⁺ pump hydrolyzes 1 ATP to export 3 Na⁺ and import 2 K⁺, maintaining electronegativity.'
  },
  {
    id: 'zoo50_33',
    text: 'Which hormone triggers the rapid rupture of the mature Graafian follicle and releases the secondary oocyte (ovulation)?',
    options: { A: 'Progesterone surge', B: 'LH (Luteinizing Hormone) surge at mid-cycle', C: 'Estrogen drop', D: 'Prolactin' },
    correct: 'B',
    subject: 'Zoology',
    section: 'Section A',
    explanation: 'High LH surge around day 14 weakens follicular wall and induces ovulation.'
  },
  {
    id: 'zoo50_34',
    text: 'Copper-releasing Intrauterine Devices (e.g. CuT, Cu7, Multiload 375) prevent pregnancy primarily by:',
    options: { A: 'Inhibiting ovulation', B: 'Releasing Cu ions that suppress sperm motility and fertilizing capacity', C: 'Blocking fallopian tubes surgically', D: 'Destroying the blastocyst' },
    correct: 'B',
    subject: 'Zoology',
    section: 'Section A',
    explanation: 'Cu²⁺ ions impair sperm motility, viability, and induce mild endometrial phagocytosis of sperm.'
  },
  {
    id: 'zoo50_35',
    text: 'Turner\'s syndrome in human females is a chromosomal aneuploidy characterized by karyotype:',
    options: { A: '47, XXY', B: '45, XO', C: '47, +21', D: '46, XY' },
    correct: 'B',
    subject: 'Zoology',
    section: 'Section A',
    explanation: 'Monosomy of X chromosome results in sterile females with rudimentary ovaries, short stature, and webbed neck.'
  },
  {
    id: 'zoo50_36',
    text: 'In the lac operon of E. coli, the repressor protein synthesized constitutively by the i-gene binds to which site to block transcription?',
    options: { A: 'Promoter site (P)', B: 'Operator gene (O)', C: 'Structural gene z', D: 'Inducer molecule' },
    correct: 'B',
    subject: 'Zoology',
    section: 'Section B',
    explanation: 'Repressor binds operator, physically preventing RNA polymerase from transcribing the lacZYA genes.'
  },
  {
    id: 'zoo50_37',
    text: 'During DNA replication, the discontinuously synthesized Okazaki fragments on the lagging strand are joined together by:',
    options: { A: 'DNA Polymerase I', B: 'DNA Ligase (phosphodiester bonds)', C: 'Helicase', D: 'Topoisomerase' },
    correct: 'B',
    subject: 'Zoology',
    section: 'Section B',
    explanation: 'DNA ligase seals nicks between adjacent Okazaki fragments by forming covalent phosphodiester bonds.'
  },
  {
    id: 'zoo50_38',
    text: 'The industrial melanism phenomenon observed in England\'s Peppered Moth (Biston betularia) post-industrialization is a textbook example of:',
    options: { A: 'Directional Natural Selection', B: 'Stabilizing Selection', C: 'Disruptive Selection', D: 'Genetic Drift' },
    correct: 'A',
    subject: 'Zoology',
    section: 'Section B',
    explanation: 'Soot-covered trees favored melanic dark moths over white moths, shifting allele frequencies directionally.'
  },
  {
    id: 'zoo50_39',
    text: 'The infectious stage of Plasmodium falciparum transmitted from female Anopheles mosquito saliva into the human bloodstream is:',
    options: { A: 'Trophozoite', B: 'Sporozoite', C: 'Merozoite', D: 'Gametocyte' },
    correct: 'B',
    subject: 'Zoology',
    section: 'Section B',
    explanation: 'Infective sickle-shaped sporozoites travel to human liver hepatocytes to undergo schizogony.'
  },
  {
    id: 'zoo50_40',
    text: 'The diagnostic test standard universally employed for confirmation of Typhoid fever caused by Salmonella typhi is:',
    options: { A: 'Widal test', B: 'Mantoux test', C: 'ELISA', D: 'Western blot' },
    correct: 'A',
    subject: 'Zoology',
    section: 'Section B',
    explanation: 'Widal agglutination test detects O and H antibodies against Salmonella enterica serotype Typhi.'
  },
  {
    id: 'zoo50_41',
    text: 'Human immunodeficiency virus (HIV) selectively infects and depletes which critical population of immune cells?',
    options: { A: 'B-lymphocytes', B: 'CD4⁺ T-helper lymphocytes', C: 'Erythrocytes', D: 'Neutrophils' },
    correct: 'B',
    subject: 'Zoology',
    section: 'Section B',
    explanation: 'HIV gp120 binds CD4 receptors on T-helper cells, collapsing cell-mediated immunity.'
  },
  {
    id: 'zoo50_42',
    text: 'In gel electrophoresis, DNA fragments separate according to size toward the anode (+ pole) because DNA possesses a net:',
    options: { A: 'Positive charge due to purines', B: 'Negative charge due to phosphate backbone', C: 'Neutral charge', D: 'Variable charge' },
    correct: 'B',
    subject: 'Zoology',
    section: 'Section B',
    explanation: 'Negatively charged phosphate groups (PO₄³⁻) migrate toward positive anode; smaller fragments move faster.'
  },
  {
    id: 'zoo50_43',
    text: 'The first genetically engineered human hormone produced via recombinant DNA technology by Eli Lilly in 1983 was:',
    options: { A: 'Thyroxine', B: 'Humulin (Human Insulin)', C: 'Growth Hormone', D: 'Calcitonin' },
    correct: 'B',
    subject: 'Zoology',
    section: 'Section B',
    explanation: 'Chains A and B were produced separately in E. coli and combined with disulfide bonds to make active insulin.'
  },
  {
    id: 'zoo50_44',
    text: 'CryIAb endotoxin gene introduced into genetically modified maize provides resistance against:',
    options: { A: 'Cotton bollworm', B: 'Corn borer', C: 'Root-knot nematode', D: 'Aphids' },
    correct: 'B',
    subject: 'Zoology',
    section: 'Section B',
    explanation: 'CryIAb controls corn borer, while CryIAc and CryIIAb control cotton bollworms.'
  },
  {
    id: 'zoo50_45',
    text: 'The nematode Caenorhabditis elegans is commonly controlled in tobacco plant roots using biotechnology via:',
    options: { A: 'Bt toxin ingestion', B: 'RNA interference (RNAi) gene silencing', C: 'Antibiotic expression', D: 'Viral vectors' },
    correct: 'B',
    subject: 'Zoology',
    section: 'Section B',
    explanation: 'Transgenic tobacco plants produce dsRNA that triggers RISC complex to silence Meloidogyne incognita mRNA.'
  },
  {
    id: 'zoo50_46',
    text: 'The organ of Corti, the sensory receptor organ of human hearing, is situated on which membrane of the cochlea?',
    options: { A: 'Reissner\'s membrane', B: 'Basilar membrane', C: 'Tectorial membrane', D: 'Tympanic membrane' },
    correct: 'B',
    subject: 'Zoology',
    section: 'Section B',
    explanation: 'Hair cells lie on basilar membrane with stereocilia projecting toward the overlying tectorial membrane.'
  },
  {
    id: 'zoo50_47',
    text: 'Which hormone is secreted by the pineal gland to regulate the 24-hour diurnal (circadian) sleep-wake cycle?',
    options: { A: 'Melanin', B: 'Melatonin', C: 'Thyroxine', D: 'Dopamine' },
    correct: 'B',
    subject: 'Zoology',
    section: 'Section B',
    explanation: 'Melatonin secretion peaks in darkness to coordinate sleep-wake rhythms and body temperature.'
  },
  {
    id: 'zoo50_48',
    text: 'Sertoli cells in seminiferous tubules are stimulated by FSH and function to:',
    options: { A: 'Secrete testosterone', B: 'Provide nourishment and support to developing spermatogenic cells', C: 'Perform meiosis directly', D: 'Store mature sperm' },
    correct: 'B',
    subject: 'Zoology',
    section: 'Section B',
    explanation: 'Sertoli (nurse) cells nurture spermatids and secrete androgen-binding protein (ABP).'
  },
  {
    id: 'zoo50_49',
    text: 'Which assisted reproductive technology (ART) involves transferring an embryo up to 8 blastomeres into the fallopian tube?',
    options: { A: 'IUI', B: 'ZIFT (Zygote Intra-Fallopian Transfer)', C: 'IUT', D: 'GIFT' },
    correct: 'B',
    subject: 'Zoology',
    section: 'Section B',
    explanation: 'ZIFT transfers zygotes or early embryos (up to 8 blastomeres) into the fallopian tube; >8 goes to uterus (IUT).'
  },
  {
    id: 'zoo50_50',
    text: 'According to fossil records, the hominid ancestor possessing cranial capacity of approximately 900 cc who probably ate meat was:',
    options: { A: 'Australopithecus', B: 'Homo habilis (650-800 cc)', C: 'Homo erectus (900 cc)', D: 'Neanderthal man (1400 cc)' },
    correct: 'C',
    subject: 'Zoology',
    section: 'Section B',
    explanation: 'Homo erectus fossils (Java Man, 1891) had ~900 cc cranial capacity and demonstrated tool use and meat consumption.'
  }
];
