// NEET (UG) 2026 Chapter-wise Curriculum & Study Data
// Modeled to exact NCERT Class 11 & Class 12 Syllabus and study viewer specifications

export const STUDY_SUBJECTS = {
  physics: {
    id: 'physics',
    name: 'Physics',
    title: 'NEET Physics Chapter-wise Notes & Masterclass',
    badge: 'Physics · Class 11 & 12',
    color: 'emerald',
    accentText: 'text-emerald-500',
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-500/30',
    pdfUrl: '/materials/NEET_UG_2026_Physics_Expanded_Study_Guide.pdf',
    class11Count: 14,
    class12Count: 14,
    chapters: [
      // Class 11
      {
        id: 'phy-11-01',
        classLevel: 11,
        chapterNumber: 1,
        code: '01',
        title: 'Units and Measurement',
        sectionsCount: 8,
        exercisesCount: 37,
        mappedUnitId: 1,
        overview: `A measurement compares a physical quantity with a standard unit. The result is a number followed by a unit. Physical quantities are related to one another, so only a few base units are needed. Other units are derived by combining the base units.
The SI is the internationally accepted system. It has seven base units: metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol) and candela (cd). The radian and steradian are dimensionless units for plane and solid angles. SI uses decimal prefixes, so conversions are simple.`,
        sections: [
          { id: 1, title: 'Introduction to Physical Quantities & Measurement', duration: '12 min' },
          { id: 2, title: 'The International System of Units (SI)', duration: '18 min' },
          { id: 3, title: 'Measurement of Length, Mass and Time', duration: '15 min' },
          { id: 4, title: 'Accuracy, Precision of Instruments and Errors in Measurement', duration: '25 min' },
          { id: 5, title: 'Propagation of Errors (Addition, Subtraction, Multiplication & Powers)', duration: '22 min' },
          { id: 6, title: 'Significant Figures and Rounding Off Rules', duration: '15 min' },
          { id: 7, title: 'Dimensions of Physical Quantities & Dimensional Formulae', duration: '30 min' },
          { id: 8, title: 'Dimensional Analysis and Its Applications (Principle of Homogeneity)', duration: '28 min' }
        ],
        keyTakeaways: [
          "7 SI base units form the foundation; radian (rad) and steradian (sr) are dimensionless supplementary units.",
          "Principle of Homogeneity: Only physical quantities with identical dimensions can be added, subtracted, or equated.",
          "In percentage error propagation, fractional errors always add up with their power coefficients: %ΔZ = p(%ΔA) + q(%ΔB) + r(%ΔC).",
          "Least count of Vernier Callipers = 1 MSD - 1 VSD; Least count of Screw Gauge = Pitch / Total Circular Divisions."
        ]
      },
      {
        id: 'phy-11-02',
        classLevel: 11,
        chapterNumber: 2,
        code: '02',
        title: 'Motion in a Straight Line',
        sectionsCount: 8,
        exercisesCount: 18,
        mappedUnitId: 2,
        overview: `Kinematics describes the motion of objects without reference to the forces that cause the motion. Rectilinear motion involves objects moving along a straight line path.
Key concepts include position, displacement, speed, velocity, and acceleration. Under uniform acceleration, motion is governed by Galileo's kinematic equations, and the motion under gravity exhibits parabolic symmetry with Galileo's law of odd numbers.`,
        sections: [
          { id: 1, title: 'Position, Path Length and Displacement', duration: '15 min' },
          { id: 2, title: 'Average Velocity and Average Speed', duration: '16 min' },
          { id: 3, title: 'Instantaneous Velocity and Speed (Calculus Approach)', duration: '20 min' },
          { id: 4, title: 'Acceleration: Uniform vs Non-Uniform', duration: '18 min' },
          { id: 5, title: 'Kinematic Equations for Uniformly Accelerated Motion', duration: '25 min' },
          { id: 6, title: 'Motion Under Gravity and Galileo\'s Law of Odd Numbers', duration: '22 min' },
          { id: 7, title: 'Relative Velocity in One Dimension', duration: '18 min' },
          { id: 8, title: 'Graphical Analysis (x-t, v-t, and a-t graphs)', duration: '24 min' }
        ],
        keyTakeaways: [
          "Displacement is a vector and can be zero even if distance traveled is non-zero.",
          "Area under v-t graph represents displacement; slope of v-t graph represents instantaneous acceleration.",
          "Galileo's odd numbers ratio: Distance fallen from rest in successive equal time intervals is 1 : 3 : 5 : 7 : 9...",
          "Stopping distance is proportional to the square of initial speed: d ∝ u²."
        ]
      },
      {
        id: 'phy-11-03',
        classLevel: 11,
        chapterNumber: 3,
        code: '03',
        title: 'Motion in a Plane',
        sectionsCount: 13,
        exercisesCount: 22,
        mappedUnitId: 2,
        overview: `Two-dimensional motion involves vector quantities possessing both magnitude and direction. Vectors obey triangle and parallelogram laws of addition.
Projectile motion combines uniform horizontal velocity with uniformly accelerated vertical motion under gravity. Uniform circular motion entails constant speed with continuous centripetal acceleration directed toward the center.`,
        sections: [
          { id: 1, title: 'Scalars and Vectors & Position Vector Representation', duration: '15 min' },
          { id: 2, title: 'Vector Addition and Subtraction (Triangle & Parallelogram Laws)', duration: '20 min' },
          { id: 3, title: 'Resolution of Vectors into Orthogonal Components', duration: '18 min' },
          { id: 4, title: 'Vector Multiplication: Scalar (Dot) Product', duration: '22 min' },
          { id: 5, title: 'Vector Multiplication: Vector (Cross) Product', duration: '25 min' },
          { id: 6, title: 'Motion in Two Dimensions with Constant Acceleration', duration: '20 min' },
          { id: 7, title: 'Relative Velocity in Two Dimensions (Rain-Man & River-Boat)', duration: '28 min' },
          { id: 8, title: 'Projectile Motion: Trajectory Equation (Parabolic Path)', duration: '25 min' },
          { id: 9, title: 'Time of Flight, Maximum Height and Horizontal Range', duration: '24 min' },
          { id: 10, title: 'Complementary Angles of Projection (θ and 90°-θ)', duration: '15 min' },
          { id: 11, title: 'Uniform Circular Motion & Angular Kinematics', duration: '20 min' },
          { id: 12, title: 'Centripetal Acceleration Derivation (a_c = v²/R)', duration: '22 min' },
          { id: 13, title: 'Non-Uniform Circular Motion (Tangential vs Radial Acceleration)', duration: '18 min' }
        ],
        keyTakeaways: [
          "Horizontal range is identical for complementary launch angles θ and (90° - θ) at equal launch speeds.",
          "Maximum horizontal range R_max = u² / g occurs at projection angle θ = 45°.",
          "At the highest point of projectile trajectory, velocity is purely horizontal (u cos θ) and acceleration is g vertically downward.",
          "Centripetal acceleration is perpendicular to instantaneous velocity, doing zero work on the particle."
        ]
      },
      {
        id: 'phy-11-04',
        classLevel: 11,
        chapterNumber: 4,
        code: '04',
        title: 'Laws of Motion',
        sectionsCount: 14,
        exercisesCount: 23,
        mappedUnitId: 3,
        overview: `Newton's laws of motion form the bedrock of classical mechanics, defining inertia, momentum, force, and action-reaction pairs.
Friction acts parallel to contacting surfaces opposing relative motion. Free body diagrams (FBD) enable systematic resolution of tension, normal forces, and friction in connected bodies and banked curves.`,
        sections: [
          { id: 1, title: 'Aristotle\'s Fallacy and Galileo\'s Law of Inertia', duration: '14 min' },
          { id: 2, title: 'Newton\'s First Law of Motion and Frame of Reference', duration: '16 min' },
          { id: 3, title: 'Linear Momentum and Newton\'s Second Law of Motion', duration: '22 min' },
          { id: 4, title: 'Impulse of a Force and Impulse-Momentum Theorem', duration: '18 min' },
          { id: 5, title: 'Newton\'s Third Law of Motion and Action-Reaction Pairs', duration: '18 min' },
          { id: 6, title: 'Conservation of Linear Momentum and Recoil Velocity', duration: '22 min' },
          { id: 7, title: 'Equilibrium of Concurrent Forces & Lami\'s Theorem', duration: '20 min' },
          { id: 8, title: 'Common Forces in Mechanics (Gravity, Normal Reaction, Tension, Spring)', duration: '25 min' },
          { id: 9, title: 'Free Body Diagrams (FBD) Methodology', duration: '30 min' },
          { id: 10, title: 'Friction: Static Friction, Limiting Friction, and Kinetic Friction', duration: '26 min' },
          { id: 11, title: 'Angle of Friction, Angle of Repose, and Rolling Friction', duration: '20 min' },
          { id: 12, title: 'Motion of Connected Bodies (Pulley-Mass Systems)', duration: '28 min' },
          { id: 13, title: 'Dynamics of Uniform Circular Motion & Centripetal Force', duration: '22 min' },
          { id: 14, title: 'Motion of a Vehicle on a Level Road vs Banked Curve', duration: '26 min' }
        ],
        keyTakeaways: [
          "Action and reaction forces act on two entirely different bodies and never cancel each other.",
          "Static friction is a self-adjusting force: 0 ≤ f_s ≤ μ_s N; limiting friction is the maximum value.",
          "Maximum safe speed on a banked curve without friction: v = √(R g tan θ).",
          "Apparent weight in an accelerating elevator: W = m(g + a) upward, W = m(g - a) downward."
        ]
      },
      {
        id: 'phy-11-05',
        classLevel: 11,
        chapterNumber: 5,
        code: '05',
        title: 'Work, Energy and Power',
        sectionsCount: 11,
        exercisesCount: 28,
        mappedUnitId: 4,
        overview: `Work represents energy transferred by a force acting over a displacement. The Work-Energy Theorem bridges kinematics and dynamics by establishing that work done by all forces equals the change in kinetic energy.
Conservative forces admit potential energy functions, leading to the Law of Conservation of Mechanical Energy. Collisions conserve momentum, while kinetic energy conservation differentiates elastic from inelastic impacts.`,
        sections: [
          { id: 1, title: 'Notion of Work & Scalar Product Formulation (W = F · d)', duration: '16 min' },
          { id: 2, title: 'Work Done by Constant vs Variable Forces', duration: '20 min' },
          { id: 3, title: 'Kinetic Energy & Work-Energy Theorem for a Variable Force', duration: '24 min' },
          { id: 4, title: 'Concept of Potential Energy & Conservative Forces', duration: '22 min' },
          { id: 5, title: 'Conservation of Mechanical Energy', duration: '20 min' },
          { id: 6, title: 'Potential Energy of a Spring (Hooke\'s Law & U = ½kx²)', duration: '22 min' },
          { id: 7, title: 'Motion in a Vertical Circle and Minimum Speeds for Looping', duration: '26 min' },
          { id: 8, title: 'Concept of Power: Instantaneous and Average Power (P = F · v)', duration: '18 min' },
          { id: 9, title: 'Collisions in One Dimension: Elastic vs Perfectly Inelastic', duration: '25 min' },
          { id: 10, title: 'Coefficient of Restitution (e) and Energy Loss in Inelastic Impact', duration: '22 min' },
          { id: 11, title: 'Collisions in Two Dimensions', duration: '20 min' }
        ],
        keyTakeaways: [
          "Work done by a conservative force along any closed path is strictly zero: ∮ F · dr = 0.",
          "Critical speeds in a vertical circle of radius R: v_bottom ≥ √(5gR), v_top ≥ √(gR).",
          "In a 1D elastic collision between two equal masses, the velocities are completely interchanged.",
          "Loss of kinetic energy in perfectly inelastic collision (e = 0): ΔK = ½ [m₁m₂ / (m₁ + m₂)] (u₁ - u₂)²."
        ]
      },
      {
        id: 'phy-11-06',
        classLevel: 11,
        chapterNumber: 6,
        code: '06',
        title: 'System of Particles and Rotational Motion',
        sectionsCount: 12,
        exercisesCount: 25,
        mappedUnitId: 5,
        overview: `Rigid body mechanics examines rotational dynamics of extended mass distributions. The Center of Mass moves as if the entire system mass were concentrated at that single point under external forces.
Rotational analogues include moment of inertia, torque, and angular momentum. Rolling without slipping couples translational and rotational kinetic energy.`,
        sections: [
          { id: 1, title: 'Center of Mass of Two-Particle and Many-Particle Systems', duration: '20 min' },
          { id: 2, title: 'Center of Mass of Continuous Mass Distributions (Rods, Rings, Discs)', duration: '24 min' },
          { id: 3, title: 'Linear Momentum of a System of Particles & Conservation', duration: '18 min' },
          { id: 4, title: 'Angular Velocity and its Relation with Linear Velocity (v = ω × r)', duration: '16 min' },
          { id: 5, title: 'Torque and Angular Momentum for a Single Particle & System', duration: '25 min' },
          { id: 6, title: 'Conservation of Angular Momentum with Illustrative Examples', duration: '22 min' },
          { id: 7, title: 'Equilibrium of a Rigid Body & Principle of Moments', duration: '20 min' },
          { id: 8, title: 'Moment of Inertia and Radius of Gyration', duration: '25 min' },
          { id: 9, title: 'Parallel and Perpendicular Axes Theorems', duration: '24 min' },
          { id: 10, title: 'Kinematics and Dynamics of Rotational Motion about a Fixed Axis', duration: '22 min' },
          { id: 11, title: 'Rolling Motion without Slipping: Kinetic Energy Formulation', duration: '26 min' },
          { id: 12, title: 'Acceleration of a Rolling Body on an Inclined Plane', duration: '24 min' }
        ],
        keyTakeaways: [
          "Conservation of Angular Momentum: If external torque is zero (τ_ext = 0), then L = Iω = constant.",
          "Total kinetic energy in pure rolling: K_total = K_trans + K_rot = ½ M v_cm² (1 + k²/R²).",
          "Acceleration down an incline: a = (g sin θ) / (1 + k²/R²); solid sphere arrives faster than cylinder or ring.",
          "Perpendicular axis theorem is applicable exclusively to planar laminar bodies."
        ]
      },
      {
        id: 'phy-11-07',
        classLevel: 11,
        chapterNumber: 7,
        code: '07',
        title: 'Gravitation',
        sectionsCount: 10,
        exercisesCount: 24,
        mappedUnitId: 6,
        overview: `Newton's Law of Universal Gravitation governs attractive forces between all masses in the universe. Kepler's three empirical laws describe planetary orbital dynamics.
Gravitational potential energy, orbital velocity, and escape velocity characterize satellite motion and interplanetary trajectory mechanics.`,
        sections: [
          { id: 1, title: 'Kepler\'s Laws of Planetary Motion (Orbits, Areas, and Periods)', duration: '18 min' },
          { id: 2, title: 'Universal Law of Gravitation & Gravitational Constant G', duration: '18 min' },
          { id: 3, title: 'Acceleration Due to Gravity (g) of the Earth', duration: '16 min' },
          { id: 4, title: 'Variation of g with Altitude, Depth, and Latitude (Earth\'s Rotation)', duration: '24 min' },
          { id: 5, title: 'Gravitational Field and Gravitational Intensity', duration: '18 min' },
          { id: 6, title: 'Gravitational Potential and Potential Energy Formulation', duration: '22 min' },
          { id: 7, title: 'Escape Velocity from Earth and Other Celestial Bodies', duration: '20 min' },
          { id: 8, title: 'Earth Satellites: Orbital Velocity and Time Period', duration: '22 min' },
          { id: 9, title: 'Energy of an Orbiting Satellite (Binding Energy)', duration: '20 min' },
          { id: 10, title: 'Geostationary and Polar Satellites', duration: '16 min' }
        ],
        keyTakeaways: [
          "Kepler's second law (areal velocity is constant) is a direct consequence of Conservation of Angular Momentum.",
          "Variation with altitude: g_h = g (1 - 2h/R) for h << R; Variation with depth: g_d = g (1 - d/R).",
          "Escape velocity v_e = √(2gR) ≈ 11.2 km/s on Earth; independent of mass and angle of projection.",
          "Total energy of an orbiting satellite is negative: E = -K = ½ U."
        ]
      },
      {
        id: 'phy-11-08',
        classLevel: 11,
        chapterNumber: 8,
        code: '08',
        title: 'Mechanical Properties of Solids',
        sectionsCount: 6,
        exercisesCount: 19,
        mappedUnitId: 7,
        overview: `Deformable bodies experience internal restoring forces when subjected to external deforming stresses. Elasticity measures the ability of a material to regain its original configuration.
Hooke's law defines Young's modulus, shear modulus, and bulk modulus within the elastic limit. Elastic potential energy quantifies the strain energy stored in stretched materials.`,
        sections: [
          { id: 1, title: 'Elastic Behaviour of Solids and Intermolecular Forces', duration: '14 min' },
          { id: 2, title: 'Stress and Strain: Tensile, Compressive, Shearing and Hydraulic', duration: '18 min' },
          { id: 3, title: 'Hooke\'s Law and Stress-Strain Curve for a Metallic Wire', duration: '22 min' },
          { id: 4, title: 'Elastic Moduli: Young\'s Modulus, Shear Modulus, and Bulk Modulus', duration: '24 min' },
          { id: 5, title: 'Poisson\'s Ratio and Compressibility', duration: '15 min' },
          { id: 6, title: 'Elastic Potential Energy (Strain Energy Stored in Stretched Wire)', duration: '20 min' }
        ],
        keyTakeaways: [
          "Young's modulus is a material property; it is invariant to wire length or cross-sectional area.",
          "Strain energy per unit volume = ½ × Stress × Strain = ½ Y (Strain)².",
          "Steel is more elastic than rubber because steel requires a substantially larger restoring stress for the same strain.",
          "Theoretical limits for Poisson's ratio (σ): -1 < σ < 0.5; practical engineering values are 0 to 0.5."
        ]
      },
      {
        id: 'phy-11-09',
        classLevel: 11,
        chapterNumber: 9,
        code: '09',
        title: 'Mechanical Properties of Fluids',
        sectionsCount: 9,
        exercisesCount: 26,
        mappedUnitId: 7,
        overview: `Fluids (liquids and gases) deform continuously under shear stresses and cannot sustain static shearing force. Hydrostatics encompasses pressure, Pascal's law, and Archimedes' buoyancy principle.
Hydrodynamics addresses steady streamline flow governed by the equation of continuity and Bernoulli's conservation theorem, alongside viscous drag and surface tension phenomena.`,
        sections: [
          { id: 1, title: 'Fluid Pressure, Density and Variation of Pressure with Depth', duration: '16 min' },
          { id: 2, title: 'Pascal\'s Law and its Hydraulic Machinery Applications', duration: '18 min' },
          { id: 3, title: 'Atmospheric Pressure, Gauge Pressure and Manometers', duration: '16 min' },
          { id: 4, title: 'Archimedes\' Principle, Buoyancy and Law of Floatation', duration: '20 min' },
          { id: 5, title: 'Streamline Flow, Turbulent Flow and Equation of Continuity', duration: '18 min' },
          { id: 6, title: 'Bernoulli\'s Equation and its Dynamic Applications (Venturi Meter, Aerofoil)', duration: '26 min' },
          { id: 7, title: 'Viscosity, Newton\'s Law of Viscous Flow and Poiseuille\'s Formula', duration: '22 min' },
          { id: 8, title: 'Stokes\' Law, Terminal Velocity and Reynolds Number', duration: '22 min' },
          { id: 9, title: 'Surface Tension, Surface Energy, Angle of Contact and Capillary Rise', duration: '25 min' }
        ],
        keyTakeaways: [
          "Bernoulli's Theorem: P + ½ ρ v² + ρ g h = constant along any streamline of an ideal, incompressible, non-viscous fluid.",
          "Terminal velocity of spherical drop: v_t = (2/9) [r² (ρ - σ) g] / η (scales with the square of radius r²).",
          "Excess pressure inside soap bubble: ΔP = 4T / R (two surfaces); liquid drop: ΔP = 2T / R (one surface).",
          "Capillary rise height: h = (2 T cos θ) / (r ρ g)."
        ]
      },
      {
        id: 'phy-11-10',
        classLevel: 11,
        chapterNumber: 10,
        code: '10',
        title: 'Thermal Properties of Matter',
        sectionsCount: 11,
        exercisesCount: 22,
        mappedUnitId: 7,
        overview: `Temperature represents microscopic average kinetic energy, while heat denotes thermal energy transfer driven by temperature gradients.
Thermal expansion occurs across linear, superficial, and volumetric coefficients. Heat transfer mechanisms span conduction (Fourier's law), convection, and thermal radiation governed by Stefan-Boltzmann and Wien's displacement laws.`,
        sections: [
          { id: 1, title: 'Temperature and Heat: Thermometry and Temperature Scales', duration: '15 min' },
          { id: 2, title: 'Thermal Expansion of Solids: Linear (α), Superficial (β) and Cubical (γ)', duration: '20 min' },
          { id: 3, title: 'Anomalous Expansion of Water and Aquatic Survival', duration: '14 min' },
          { id: 4, title: 'Specific Heat Capacity and Molar Heat Capacity (C_p and C_v)', duration: '20 min' },
          { id: 5, title: 'Calorimetry and Principle of Method of Mixtures', duration: '22 min' },
          { id: 6, title: 'Change of State: Latent Heat of Fusion and Vaporization', duration: '18 min' },
          { id: 7, title: 'Heat Transfer by Conduction: Thermal Conductivity & Thermal Resistance', duration: '24 min' },
          { id: 8, title: 'Heat Transfer by Convection and Atmospheric Phenomena', duration: '14 min' },
          { id: 9, title: 'Thermal Radiation, Blackbody Radiation and Kirchhoff\'s Law', duration: '20 min' },
          { id: 10, title: 'Wien\'s Displacement Law and Stefan-Boltzmann Law', duration: '22 min' },
          { id: 11, title: 'Newton\'s Law of Cooling and its Limitations', duration: '18 min' }
        ],
        keyTakeaways: [
          "Relationship among thermal expansion coefficients: α : β : γ = 1 : 2 : 3.",
          "Wien's Displacement Law: λ_max · T = b = constant (2.898 × 10⁻³ m·K).",
          "Stefan-Boltzmann Law: Total radiated power E = e σ A (T⁴ - T₀⁴).",
          "In thermal conduction, rate of heat flow: H = dQ/dt = K A (T₁ - T₂) / L."
        ]
      },
      {
        id: 'phy-11-11',
        classLevel: 11,
        chapterNumber: 11,
        code: '11',
        title: 'Thermodynamics',
        sectionsCount: 10,
        exercisesCount: 20,
        mappedUnitId: 8,
        overview: `Thermodynamics studies macroscopic relationships between heat, work, and internal energy. The Zeroth Law establishes thermal equilibrium and defines temperature.
The First Law enforces conservation of energy (ΔQ = ΔU + ΔW), while the Second Law dictates process directionality through entropy and limits heat engine efficiency via Carnot's theorem.`,
        sections: [
          { id: 1, title: 'Thermodynamic Systems, Surroundings and State Variables', duration: '16 min' },
          { id: 2, title: 'Zeroth Law of Thermodynamics and Concept of Temperature', duration: '14 min' },
          { id: 3, title: 'First Law of Thermodynamics: Internal Energy, Heat, and Work Done', duration: '24 min' },
          { id: 4, title: 'Specific Heat Capacities of Gases: Mayer\'s Relation (C_p - C_v = R)', duration: '20 min' },
          { id: 5, title: 'Isothermal and Adiabatic Processes (Work Done and P-V Relations)', duration: '26 min' },
          { id: 6, title: 'Isobaric and Isochoric Thermodynamic Processes', duration: '18 min' },
          { id: 7, title: 'Cyclic Processes and Calculation of Work from P-V Diagrams', duration: '22 min' },
          { id: 8, title: 'Second Law of Thermodynamics (Kelvin-Planck & Clausius Statements)', duration: '20 min' },
          { id: 9, title: 'Carnot Reversible Cycle and Carnot Engine Efficiency (η = 1 - T₂/T₁)', duration: '25 min' },
          { id: 10, title: 'Refrigerators, Heat Pumps and Coefficient of Performance (β)', duration: '20 min' }
        ],
        keyTakeaways: [
          "Work done in an isothermal expansion: W = n R T ln(V₂ / V₁); internal energy change ΔU = 0.",
          "Work done in an adiabatic expansion: W = (P₁V₁ - P₂V₂) / (γ - 1); no heat exchange (ΔQ = 0).",
          "Mayer's Relation: C_p - C_v = R for 1 mole of an ideal gas.",
          "Maximum theoretical efficiency of a Carnot heat engine: η = 1 - (T_sink / T_source)."
        ]
      },
      {
        id: 'phy-11-12',
        classLevel: 11,
        chapterNumber: 12,
        code: '12',
        title: 'Kinetic Theory of Gases',
        sectionsCount: 8,
        exercisesCount: 18,
        mappedUnitId: 9,
        overview: `Kinetic theory provides a microscopic statistical model explaining macroscopic gas behavior through random molecular collisions.
Molecular kinetic energy directly measures absolute temperature. The law of equipartition assigns ½ k_B T of energy per degree of freedom, dictating gas specific heat ratios (γ = C_p / C_v).`,
        sections: [
          { id: 1, title: 'Molecular Nature of Matter & Ideal Gas Assumptions', duration: '15 min' },
          { id: 2, title: 'Ideal Gas Equation of State (PV = nRT) & Real Gas Departures', duration: '18 min' },
          { id: 3, title: 'Kinetic Interpretation of Pressure (P = ⅓ ρ v_rms²)', duration: '24 min' },
          { id: 4, title: 'Kinetic Interpretation of Temperature and Average Kinetic Energy', duration: '20 min' },
          { id: 5, title: 'Molecular Speeds: RMS Speed, Average Speed, and Most Probable Speed', duration: '22 min' },
          { id: 6, title: 'Law of Equipartition of Energy and Degrees of Freedom (f)', duration: '22 min' },
          { id: 7, title: 'Specific Heat Capacities of Monatomic, Diatomic, and Polyatomic Gases', duration: '24 min' },
          { id: 8, title: 'Mean Free Path Derivation (λ = 1 / [√2 π n d²])', duration: '18 min' }
        ],
        keyTakeaways: [
          "Average translational kinetic energy per molecule = (3/2) k_B T; depends exclusively on temperature.",
          "Speed hierarchy: v_rms > v_avg > v_mp with ratio √(3) : √(8/π) : √(2) ≈ 1.732 : 1.596 : 1.414.",
          "Degrees of freedom: Monatomic f = 3 (γ = 5/3); Diatomic rigid f = 5 (γ = 7/5); Diatomic vibrating f = 7 (γ = 9/7).",
          "Mean free path λ is inversely proportional to gas pressure at constant temperature."
        ]
      },
      {
        id: 'phy-11-13',
        classLevel: 11,
        chapterNumber: 13,
        code: '13',
        title: 'Oscillations',
        sectionsCount: 10,
        exercisesCount: 24,
        mappedUnitId: 10,
        overview: `Periodic motion repeats in equal time intervals; simple harmonic motion (SHM) occurs when restoring force is directly proportional to displacement and directed toward equilibrium.
Energy oscillates continuously between kinetic and potential forms. Angular frequency, phase, simple pendulums, and spring-mass systems model oscillatory behavior.`,
        sections: [
          { id: 1, title: 'Periodic and Oscillatory Motions: Period, Frequency and Phase', duration: '16 min' },
          { id: 2, title: 'Simple Harmonic Motion (SHM) and Reference Circle Projection', duration: '22 min' },
          { id: 3, title: 'Displacement, Velocity and Acceleration in SHM', duration: '20 min' },
          { id: 4, title: 'Energy in SHM: Kinetic Energy, Potential Energy and Total Energy', duration: '22 min' },
          { id: 5, title: 'Simple Pendulum Derivation and Second\'s Pendulum', duration: '20 min' },
          { id: 6, title: 'Oscillations of a Spring-Mass System (Horizontal and Vertical)', duration: '22 min' },
          { id: 7, title: 'Combination of Springs: Series and Parallel Equivalent Spring Constants', duration: '20 min' },
          { id: 8, title: 'Oscillations of Liquid Column in U-Tube and Floating Cylinder', duration: '18 min' },
          { id: 9, title: 'Damped Simple Harmonic Motion and Quality Factor', duration: '18 min' },
          { id: 10, title: 'Forced Oscillations and Mechanical Resonance', duration: '18 min' }
        ],
        keyTakeaways: [
          "Defining condition for linear SHM: a = -ω² x (acceleration opposes displacement).",
          "Total mechanical energy in SHM: E = ½ m ω² A² = constant (proportional to amplitude squared).",
          "Time period of simple pendulum: T = 2π √(L / g); independent of bob mass or material.",
          "Spring combination: Series 1/k_eq = 1/k₁ + 1/k₂; Parallel k_eq = k₁ + k₂."
        ]
      },
      {
        id: 'phy-11-14',
        classLevel: 11,
        chapterNumber: 14,
        code: '14',
        title: 'Waves',
        sectionsCount: 10,
        exercisesCount: 25,
        mappedUnitId: 10,
        overview: `Mechanical waves propagate energy and momentum through material media without net transport of matter. Transverse waves oscillate perpendicular to propagation, while longitudinal waves compress and rarefy along it.
Wave superposition explains standing waves in strings and organ pipes, beats in acoustic frequency discrepancies, and the Doppler effect for moving observers and sources.`,
        sections: [
          { id: 1, title: 'Transverse and Longitudinal Waves: Speed of Progressive Waves', duration: '18 min' },
          { id: 2, title: 'Displacement Relation for a Progressive Wave (y = A sin(kx - ωt))', duration: '20 min' },
          { id: 3, title: 'Speed of Longitudinal Waves (Newton\'s Formula & Laplace Correction)', duration: '20 min' },
          { id: 4, title: 'Principle of Superposition of Waves', duration: '16 min' },
          { id: 5, title: 'Reflection of Waves at Rigid and Free Boundaries', duration: '16 min' },
          { id: 6, title: 'Standing Waves and Normal Modes in a Stretched String', duration: '24 min' },
          { id: 7, title: 'Standing Waves in Organ Pipes: Open Pipe vs Closed Pipe', duration: '24 min' },
          { id: 8, title: 'End Correction in Resonance Tubes', duration: '16 min' },
          { id: 9, title: 'Beats Phenomenon and Beat Frequency Calculation', duration: '20 min' },
          { id: 10, title: 'Doppler Effect in Sound Waves', duration: '22 min' }
        ],
        keyTakeaways: [
          "Laplace corrected sound speed in air: v = √(γP / ρ) because acoustic propagation is adiabatic, not isothermal.",
          "Closed organ pipe produces only odd harmonics (f, 3f, 5f...); open organ pipe produces all harmonics (f, 2f, 3f...).",
          "Beat frequency: f_beat = |f₁ - f₂|.",
          "Phase shift on reflection: π (180°) phase reversal occurs at a denser/rigid boundary; 0 phase shift at a free boundary."
        ]
      },

      // Class 12
      {
        id: 'phy-12-01',
        classLevel: 12,
        chapterNumber: 15,
        code: '15',
        title: 'Electric Charges and Fields',
        sectionsCount: 15,
        exercisesCount: 34,
        mappedUnitId: 11,
        overview: `Electrostatics analyzes electric charges at rest, their interactions, and the electric fields they produce. Coulomb's inverse square law quantifies electrostatic forces between point charges.
Gauss's Law connects electric flux through any closed Gaussian surface directly to the net enclosed charge, streamlining field calculations for symmetric geometries.`,
        sections: [
          { id: 1, title: 'Electric Charge: Quantization, Conservation and Additivity', duration: '16 min' },
          { id: 2, title: 'Coulomb\'s Law in Vector Form and Permittivity of Medium', duration: '22 min' },
          { id: 3, title: 'Forces Between Multiple Charges (Principle of Superposition)', duration: '20 min' },
          { id: 4, title: 'Electric Field & Electric Field Lines Properties', duration: '20 min' },
          { id: 5, title: 'Electric Dipole and Dipole Moment Vector (p = q × 2a)', duration: '18 min' },
          { id: 6, title: 'Electric Field Due to Dipole: Axial and Equatorial Positions', duration: '25 min' },
          { id: 7, title: 'Torque on a Dipole in Uniform Electric Field (τ = p × E)', duration: '18 min' },
          { id: 8, title: 'Potential Energy of an Electric Dipole in Uniform Field', duration: '18 min' },
          { id: 9, title: 'Continuous Charge Distributions (Linear, Surface, and Volume)', duration: '18 min' },
          { id: 10, title: 'Electric Flux (Φ = ∫ E · dA)', duration: '16 min' },
          { id: 11, title: 'Gauss\'s Law Formulation and Proof', duration: '22 min' },
          { id: 12, title: 'Application of Gauss\'s Law: Infinitely Long Straight Wire', duration: '20 min' },
          { id: 13, title: 'Application of Gauss\'s Law: Uniformly Charged Infinite Plane Sheet', duration: '20 min' },
          { id: 14, title: 'Application of Gauss\'s Law: Uniformly Charged Thin Spherical Shell', duration: '24 min' },
          { id: 15, title: 'Conductors in Electrostatic Equilibrium', duration: '18 min' }
        ],
        keyTakeaways: [
          "Electric field of dipole: E_axial = 2kp / r³; E_equatorial = kp / r³ (falls off as 1/r³).",
          "Field inside a uniformly charged conducting spherical shell is identically zero (E_in = 0).",
          "Field near an infinite charged plane sheet: E = σ / (2ε₀); completely independent of distance.",
          "Electric field lines never intersect and always intersect conducting surfaces perpendicularly."
        ]
      },
      {
        id: 'phy-12-02',
        classLevel: 12,
        chapterNumber: 16,
        code: '16',
        title: 'Electrostatic Potential and Capacitance',
        sectionsCount: 16,
        exercisesCount: 36,
        mappedUnitId: 11,
        overview: `Electrostatic potential denotes work per unit positive charge against field forces. Equipotential surfaces represent surfaces with zero potential gradient.
Capacitance measures charge storage capability. Dielectrics polarize within fields, reducing effective internal field strength and increasing capacitive storage proportionally to dielectric constant K.`,
        sections: [
          { id: 1, title: 'Electrostatic Potential and Potential Difference', duration: '18 min' },
          { id: 2, title: 'Potential Due to a Point Charge and System of Charges', duration: '20 min' },
          { id: 3, title: 'Potential Due to an Electric Dipole (Axial vs Equatorial)', duration: '22 min' },
          { id: 4, title: 'Equipotential Surfaces and Field-Potential Gradient Relation (E = -dV/dr)', duration: '22 min' },
          { id: 5, title: 'Potential Energy of a System of Two and Three Charges', duration: '20 min' },
          { id: 6, title: 'Potential Energy in an External Field', duration: '18 min' },
          { id: 7, title: 'Electrostatics of Conductors & Electrostatic Shielding', duration: '20 min' },
          { id: 8, title: 'Dielectrics and Electric Polarization', duration: '22 min' },
          { id: 9, title: 'Capacitors and Capacitance: Parallel Plate Capacitor', duration: '22 min' },
          { id: 10, title: 'Effect of Dielectric Slab on Capacitance (C = K C₀)', duration: '24 min' },
          { id: 11, title: 'Capacitor with Partially Filled Dielectric and Conducting Slab', duration: '22 min' },
          { id: 12, title: 'Combination of Capacitors in Series and Parallel', duration: '22 min' },
          { id: 13, title: 'Energy Stored in a Charged Capacitor (U = ½CV² = Q²/2C)', duration: '20 min' },
          { id: 14, title: 'Energy Density of Electrostatic Field (u_E = ½ ε₀ E²)', duration: '18 min' },
          { id: 15, title: 'Redistribution of Charges and Common Potential Formulation', duration: '22 min' },
          { id: 16, title: 'Van de Graaff Generator Principle', duration: '16 min' }
        ],
        keyTakeaways: [
          "Electric field is always perpendicular to equipotential surfaces in direction of decreasing potential.",
          "Capacitance of parallel plate capacitor: C = ε₀ A / d; with dielectric: C = K ε₀ A / d.",
          "Energy loss during charge sharing between two capacitors: ΔU = ½ [C₁C₂ / (C₁ + C₂)] (V₁ - V₂)². Always dissipated as heat.",
          "When dielectric is inserted with battery disconnected, charge Q remains constant while V decreases and stored energy decreases."
        ]
      },
      {
        id: 'phy-12-03',
        classLevel: 12,
        chapterNumber: 17,
        code: '17',
        title: 'Current Electricity',
        sectionsCount: 14,
        exercisesCount: 32,
        mappedUnitId: 12,
        overview: `Electric current represents the directed flow of mobile charge carriers through conductive media. Ohm's law defines resistance, while microscopic drift velocity explains macroscopic transport.
Kirchhoff's current and voltage laws resolve complex multi-loop circuits. Bridge networks such as the Wheatstone bridge enable precision resistance measurements without drawing current at balance.`,
        sections: [
          { id: 1, title: 'Electric Current, Current Density and Carrier Concentration', duration: '16 min' },
          { id: 2, title: 'Drift Velocity of Electrons and Ohm\'s Law Derivation', duration: '24 min' },
          { id: 3, title: 'Electrical Resistivity, Conductivity, and Temperature Dependence', duration: '20 min' },
          { id: 4, title: 'Colour Coding of Carbon Resistors & Thermistors', duration: '14 min' },
          { id: 5, title: 'Combinations of Resistors in Series and Parallel', duration: '18 min' },
          { id: 6, title: 'Electromotive Force (EMF), Internal Resistance and Terminal Potential Difference', duration: '22 min' },
          { id: 7, title: 'Combination of Cells in Series, Parallel, and Mixed Grouping', duration: '24 min' },
          { id: 8, title: 'Electrical Energy and Power (Joule\'s Heating Law)', duration: '18 min' },
          { id: 9, title: 'Maximum Power Transfer Theorem', duration: '16 min' },
          { id: 10, title: 'Kirchhoff\'s Junction Law (KCL) and Loop Law (KVL)', duration: '26 min' },
          { id: 11, title: 'Wheatstone Bridge Principle and Null Balance Condition', duration: '22 min' },
          { id: 12, title: 'Meter Bridge (Slide Wire Bridge) for Unknown Resistance', duration: '20 min' },
          { id: 13, title: 'Potentiometer Principle and Comparing EMFs of Two Cells', duration: '24 min' },
          { id: 14, title: 'Potentiometer Determination of Internal Resistance of a Cell', duration: '22 min' }
        ],
        keyTakeaways: [
          "Relation between current and drift velocity: I = n e A v_d, where v_d = e E τ / m.",
          "Kirchhoff's First Law (Junction Rule) reflects conservation of charge; Second Law (Loop Rule) reflects conservation of energy.",
          "Wheatstone bridge balance condition: P/Q = R/S; galvanometer carries zero current and can be omitted.",
          "Potentiometer operates on null-deflection principle, drawing zero current from cell at balance point, yielding true EMF."
        ]
      },
      {
        id: 'phy-12-04',
        classLevel: 12,
        chapterNumber: 18,
        code: '18',
        title: 'Moving Charges and Magnetism',
        sectionsCount: 12,
        exercisesCount: 28,
        mappedUnitId: 13,
        overview: `Oersted's discovery proved that moving charges create magnetic fields. The Biot-Savart Law quantifies differential magnetic fields generated by current elements.
Ampere's Circuital Law simplifies field determinations for symmetric conduits. The Lorentz force governs trajectories of charged particles in combined fields, underpinning cyclotrons and galvanometers.`,
        sections: [
          { id: 1, title: 'Magnetic Field Concept and Oersted\'s Experiment', duration: '15 min' },
          { id: 2, title: 'Lorentz Force on a Moving Charge (F = q(E + v × B))', duration: '22 min' },
          { id: 3, title: 'Motion of Charged Particle in Uniform Magnetic Field (Helical Path)', duration: '22 min' },
          { id: 4, title: 'Cyclotron Principle, Working, Frequency, and Limitations', duration: '20 min' },
          { id: 5, title: 'Biot-Savart Law and Vector Formulation', duration: '22 min' },
          { id: 6, title: 'Magnetic Field on the Axis and Center of a Circular Current Loop', duration: '24 min' },
          { id: 7, title: 'Ampere\'s Circuital Law and Application to Solenoid and Toroid', duration: '24 min' },
          { id: 8, title: 'Force on a Current-Carrying Conductor in Magnetic Field (F = I L × B)', duration: '20 min' },
          { id: 9, title: 'Force Between Two Parallel Current-Carrying Conductors & Definition of Ampere', duration: '22 min' },
          { id: 10, title: 'Torque on a Current Loop in Uniform Magnetic Field (τ = M × B)', duration: '22 min' },
          { id: 11, title: 'Moving Coil Galvanometer (Current Sensitivity and Voltage Sensitivity)', duration: '24 min' },
          { id: 12, title: 'Conversion of Galvanometer into Ammeter and Voltmeter', duration: '22 min' }
        ],
        keyTakeaways: [
          "Magnetic force does zero work on a charged particle because F_m is always perpendicular to instantaneous velocity (W = 0, ΔK = 0).",
          "Parallel currents in same direction attract each other; anti-parallel currents repel.",
          "Conversion to Ammeter: Small resistance (Shunt S) connected in parallel: S = I_g G / (I - I_g).",
          "Conversion to Voltmeter: Large resistance R connected in series: R = (V / I_g) - G."
        ]
      }
    ]
  },

  chemistry: {
    id: 'chemistry',
    name: 'Chemistry',
    title: 'NEET Chemistry Chapter-wise Notes & Masterclass',
    badge: 'Chemistry · Class 11 & 12',
    color: 'teal',
    accentText: 'text-teal-400',
    accentBg: 'bg-teal-500/10',
    accentBorder: 'border-teal-500/30',
    pdfUrl: '/materials/NEET_UG_2026_Chemistry_Expanded_Study_Guide.pdf',
    class11Count: 9,
    class12Count: 11,
    chapters: [
      {
        id: 'chem-11-01',
        classLevel: 11,
        chapterNumber: 1,
        code: '01',
        title: 'Some Basic Concepts of Chemistry',
        sectionsCount: 8,
        exercisesCount: 30,
        mappedUnitId: 1,
        overview: `Chemistry explores the composition, properties, and interactions of matter. The atomic theory establishes the mole as the standard counting unit in chemistry.
Stoichiometry relates reacting quantities through balanced chemical equations, limiting reagents, and solution concentration metrics like molarity and molality.`,
        sections: [
          { id: 1, title: 'Nature of Matter and Laws of Chemical Combination', duration: '16 min' },
          { id: 2, title: 'Dalton\'s Atomic Theory and Modern Atomic Concepts', duration: '15 min' },
          { id: 3, title: 'Atomic and Molecular Masses & Average Atomic Mass', duration: '18 min' },
          { id: 4, title: 'Mole Concept and Molar Mass (Avogadro Number N_A)', duration: '25 min' },
          { id: 5, title: 'Percentage Composition, Empirical Formula and Molecular Formula', duration: '22 min' },
          { id: 6, title: 'Chemical Reactions and Stoichiometric Calculations', duration: '24 min' },
          { id: 7, title: 'Limiting Reagent Identification and Yield Calculations', duration: '25 min' },
          { id: 8, title: 'Expressing Concentration: Mass %, Mole Fraction, Molarity, Molality', duration: '26 min' }
        ],
        keyTakeaways: [
          "1 mole contains exactly 6.022 × 10²³ elementary entities (Avogadro constant).",
          "Molality (m) and Mole Fraction (X) are independent of temperature because they depend strictly on mass, not volume.",
          "Molarity (M) and Normality (N) vary with temperature because solution volume expands with heating.",
          "Limiting reagent is the reactant that yields the least stoichiometric product and is completely consumed first."
        ]
      },
      {
        id: 'chem-11-02',
        classLevel: 11,
        chapterNumber: 2,
        code: '02',
        title: 'Structure of Atom',
        sectionsCount: 10,
        exercisesCount: 32,
        mappedUnitId: 2,
        overview: `Atomic structure evolved from early plum pudding models to quantum mechanical orbital models. Bohr's model explained hydrogen line spectra with quantized angular momentum.
Quantum mechanics introduces wave-particle duality, Heisenberg's uncertainty principle, quantum numbers, and electron filling rules (Aufbau, Pauli, Hund).`,
        sections: [
          { id: 1, title: 'Subatomic Particles: Electron, Proton, Neutron Discoveries', duration: '15 min' },
          { id: 2, title: 'Rutherford\'s Nuclear Model of Atom & its Limitations', duration: '16 min' },
          { id: 3, title: 'Electromagnetic Radiation, Planck\'s Quantum Theory & Photoelectric Effect', duration: '22 min' },
          { id: 4, title: 'Bohr\'s Model of Hydrogen Atom and Postulates', duration: '24 min' },
          { id: 5, title: 'Hydrogen Line Emission Spectrum (Lyman, Balmer, Paschen, Brackett, Pfund)', duration: '22 min' },
          { id: 6, title: 'Dual Nature of Matter: de Broglie Equation (λ = h/mv)', duration: '20 min' },
          { id: 7, title: 'Heisenberg\'s Uncertainty Principle (Δx · Δp ≥ h/4π)', duration: '18 min' },
          { id: 8, title: 'Quantum Mechanical Model of Atom & Schrödinger Wave Equation', duration: '24 min' },
          { id: 9, title: 'Quantum Numbers (n, l, m_l, m_s) and Orbital Shapes (s, p, d, f)', duration: '25 min' },
          { id: 10, title: 'Aufbau Principle, Pauli\'s Exclusion Principle, and Hund\'s Rule', duration: '22 min' }
        ],
        keyTakeaways: [
          "Bohr radius: r_n = 0.529 (n² / Z) Å; Energy of electron: E_n = -13.6 (Z² / n²) eV.",
          "Balmer series falls in the visible spectrum; Lyman series lies in the ultraviolet region.",
          "Pauli's Exclusion Principle: No two electrons in an atom can have the exact same set of four quantum numbers.",
          "Cr (24) and Cu (29) show anomalous configurations ([Ar] 3d⁵ 4s¹ and [Ar] 3d¹⁰ 4s¹) due to symmetrical half-filled and fully filled subshell stability."
        ]
      }
    ]
  },

  biology: {
    id: 'biology',
    name: 'Biology',
    title: 'NEET Biology Chapter-wise Notes & Masterclass',
    badge: 'Biology · Class 11 & 12',
    color: 'emerald',
    accentText: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-500/30',
    pdfUrl: '/materials/NEET_UG_2026_Biology_Complete_Study_Guide.pdf',
    class11Count: 19,
    class12Count: 13,
    chapters: [
      {
        id: 'bio-11-01',
        classLevel: 11,
        chapterNumber: 1,
        code: '01',
        title: 'The Living World',
        sectionsCount: 4,
        exercisesCount: 15,
        mappedUnitId: 1,
        overview: `Biology is the science of life and living organisms. Defining characteristics of living beings include metabolism, cellular organization, and consciousness.
Taxonomic hierarchy organizes the immense diversity of life into standardized ranks using binomial nomenclature governed by international codes (ICBN, ICZN).`,
        sections: [
          { id: 1, title: 'What is Living? Defining vs Defining Characteristic Features', duration: '15 min' },
          { id: 2, title: 'Diversity in the Living World & Need for Classification', duration: '14 min' },
          { id: 3, title: 'Binomial Nomenclature Rules (Carolus Linnaeus)', duration: '18 min' },
          { id: 4, title: 'Taxonomic Categories and Hierarchy (Species to Kingdom)', duration: '20 min' }
        ],
        keyTakeaways: [
          "Metabolism, cellular organization, and consciousness are defining features of life (growth and reproduction have exceptions).",
          "Binomial nomenclature: Genus capitalized, specific epithet lowercase; italicized in print or underlined separately when handwritten.",
          "Taxonomic hierarchy sequence: Species → Genus → Family → Order → Class → Phylum/Division → Kingdom.",
          "As we move from species to kingdom, the number of common characteristics decreases."
        ]
      },
      {
        id: 'bio-11-02',
        classLevel: 11,
        chapterNumber: 2,
        code: '02',
        title: 'Biological Classification',
        sectionsCount: 6,
        exercisesCount: 22,
        mappedUnitId: 1,
        overview: `Classification organizes organismal diversity based on evolutionary relationships (phylogeny). R.H. Whittaker proposed the Five Kingdom system: Monera, Protista, Fungi, Plantae, and Animalia.
Acellular biological entities like viruses, viroids, prions, and lichens require specialized taxonomic treatment outside the cellular kingdom hierarchy.`,
        sections: [
          { id: 1, title: 'Historical Systems of Classification (Two Kingdom to Five Kingdom)', duration: '15 min' },
          { id: 2, title: 'Kingdom Monera: Archaebacteria, Eubacteria, Cyanobacteria, Mycoplasma', duration: '24 min' },
          { id: 3, title: 'Kingdom Protista: Chrysophytes, Dinoflagellates, Euglenoids, Slime Moulds, Protozoans', duration: '24 min' },
          { id: 4, title: 'Kingdom Fungi: Phycomycetes, Ascomycetes, Basidiomycetes, Deuteromycetes', duration: '26 min' },
          { id: 5, title: 'Kingdom Plantae and Animalia (Salient Overview)', duration: '16 min' },
          { id: 6, title: 'Acellular Entities: Viruses, Viroids, Prions, and Lichens', duration: '22 min' }
        ],
        keyTakeaways: [
          "Whittaker's 5 Kingdom classification criteria: Cell structure, body organisation, mode of nutrition, reproduction, and phylogenetic relationships.",
          "Mycoplasma lack a cell wall and are the smallest living cells capable of surviving without oxygen.",
          "Viroids (discovered by T.O. Diener) consist of free low molecular weight RNA lacking any protein coat.",
          "Lichens are symbiotic associations between an algae (phycobiont, autotrophic) and a fungus (mycobiont, heterotrophic); pollution indicators that do not grow in SO₂ polluted zones."
        ]
      }
    ]
  }
};

