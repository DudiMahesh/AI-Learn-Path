import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles, Zap, FlaskConical, Dna,
  Send, Loader2, RotateCcw, MessageSquare,
  BookOpen, Calculator, Trophy, CheckCircle2, ChevronRight, Copy, Check,
  Box, Maximize2, Minimize2, Eye, Printer, Layers, FileText,
  Search, X, Grid, BookOpenCheck, ChevronDown, ChevronUp, ZoomIn, ZoomOut
} from 'lucide-react';
import { SUBJECTS_CONFIG } from '../../data/neetCurriculumData';
import { synthesizeVectorDiagram } from '../../utils/vectorDiagramSynthesizer';
import { getUnitMasterclass } from '../../data/neetUnitTextbooks';
import { formatMathString, normalizeMathDelimiters, formatDisplayMathBlock, SUB_MAP, SUP_MAP, renderMathPart, renderItalicAndMath, renderInlineFormatted } from '../../utils/mathUtils';
import VisualExplanationCard from '../../components/VisualExplanationCard';

const SubjectIcon = ({ id, size = 18 }) => {
  if (id === 'physics')   return <Zap size={size} />;
  if (id === 'chemistry') return <FlaskConical size={size} />;
  return <Dna size={size} />;
};

const SUBJECT_THEMES = {
  physics: {
    name: 'Physics',
    badge: 'Mechanics, Electrodynamics & Modern Physics',
    pill: 'bg-emerald-600 text-white',
    bubble: 'bg-emerald-600 text-white',
    accent: 'text-emerald-500 dark:text-emerald-400',
    border: 'border-emerald-500/30',
    bgLight: 'bg-emerald-500/10'
  },
  chemistry: {
    name: 'Chemistry',
    badge: 'Physical, Inorganic & Organic Reaction Maps',
    pill: 'bg-teal-600 text-white',
    bubble: 'bg-teal-600 text-white',
    accent: 'text-teal-500 dark:text-teal-400',
    border: 'border-teal-500/30',
    bgLight: 'bg-teal-500/10'
  },
  biology: {
    name: 'Biology',
    badge: 'Botany, Zoology, Genetics & NCERT Line Traps',
    pill: 'bg-green-600 text-white',
    bubble: 'bg-green-600 text-white',
    accent: 'text-green-500 dark:text-green-400',
    border: 'border-green-500/30',
    bgLight: 'bg-green-500/10'
  }
};

const QUICK_KNOWLEDGE_BASE = {
  physics: {
    bernoulli: `### 📖 1. Clear Definition & First Principles
**Bernoulli's Principle:** For an incompressible, non-viscous fluid undergoing streamline (laminar) steady flow, the sum of pressure energy, kinetic energy per unit volume, and gravitational potential energy per unit volume remains strictly constant along any given streamline.
$$\\mathbf{P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant}}$$

### 📊 2. High-Resolution Graphical & 3D Vector Diagram
\`\`\`svg
<svg viewBox="0 0 650 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="fluidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0369a1" stop-opacity="0.85"/>
      <stop offset="45%" stop-color="#38bdf8" stop-opacity="0.95"/>
      <stop offset="55%" stop-color="#38bdf8" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0369a1" stop-opacity="0.85"/>
    </linearGradient>
    <linearGradient id="colGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>
    <filter id="tubeGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#0284c7" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect width="650" height="340" rx="16" fill="#070d19"/>
  <path d="M 0,170 L 650,170" stroke="#1e293b" stroke-dasharray="4 4" stroke-width="1"/>
  <path d="M 40,110 L 190,110 Q 240,110 270,140 L 380,140 Q 410,110 460,110 L 610,110 L 610,230 L 460,230 Q 410,230 380,200 L 270,200 Q 240,230 190,230 L 40,230 Z" fill="url(#fluidGrad)" stroke="#38bdf8" stroke-width="2.5" filter="url(#tubeGlow)"/>
  <rect x="110" y="30" width="28" height="80" rx="4" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
  <rect x="112" y="45" width="24" height="65" rx="3" fill="url(#colGrad)"/>
  <rect x="315" y="30" width="28" height="110" rx="4" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
  <rect x="317" y="95" width="24" height="45" rx="3" fill="url(#colGrad)"/>
  <line x1="145" y1="45" x2="310" y2="45" stroke="#f59e0b" stroke-dasharray="3 3" stroke-width="1.5"/>
  <line x1="310" y1="95" x2="355" y2="95" stroke="#f59e0b" stroke-dasharray="3 3" stroke-width="1.5"/>
  <line x1="140" y1="45" x2="140" y2="95" stroke="#f59e0b" stroke-width="2"/>
  <rect x="145" y="60" width="85" height="22" rx="5" fill="#0f172a" stroke="#f59e0b" stroke-width="1"/>
  <text x="187" y="75" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Δh = P1 - P2</text>
  <path d="M 50,140 L 190,140 Q 240,140 270,155 L 380,155 Q 410,140 460,140 L 600,140" fill="none" stroke="#e0f2fe" stroke-width="1.5" stroke-dasharray="8 6"/>
  <path d="M 50,170 L 600,170" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="10 8"/>
  <path d="M 50,200 L 190,200 Q 240,200 270,185 L 380,185 Q 410,200 460,200 L 600,200" fill="none" stroke="#e0f2fe" stroke-width="1.5" stroke-dasharray="8 6"/>
  <line x1="70" y1="170" x2="130" y2="170" stroke="#10b981" stroke-width="3"/>
  <polygon points="130,166 138,170 130,174" fill="#10b981"/>
  <rect x="50" y="245" width="140" height="42" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
  <text x="120" y="262" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Wide Inlet: Area A1</text>
  <text x="120" y="278" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="sans-serif">Low Speed v1 · High P1</text>
  <line x1="285" y1="170" x2="365" y2="170" stroke="#f43f5e" stroke-width="4"/>
  <polygon points="365,166 373,170 365,174" fill="#f43f5e"/>
  <rect x="255" y="245" width="145" height="42" rx="8" fill="#0f172a" stroke="#f43f5e" stroke-width="1.5"/>
  <text x="327" y="262" fill="#fb7185" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Narrow Throat: Area A2</text>
  <text x="327" y="278" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="sans-serif">High Speed v2 · Low P2</text>
  <rect x="175" y="298" width="300" height="30" rx="8" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
  <text x="325" y="318" fill="#c7d2fe" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">P + ½ρv² + ρgh = Constant (Bernoulli Law)</text>
</svg>
\`\`\`

### 🔍 3. Diagram Breakdown & Step-by-Step Explanation
1. **Equation of Continuity ($A_1 v_1 = A_2 v_2$):** Because cross-sectional area $A_2 < A_1$, fluid velocity $v_2$ increases dramatically at the throat.
2. **Conservation of Energy:** Kinetic energy per unit volume $\\frac{1}{2}\\rho v^2$ rises at the throat. Since the total mechanical energy is constant, static pressure $P_2$ must drop below $P_1$.
3. **Pressure Differential ($\\Delta P = P_1 - P_2$):** Directly drives liquid suction in atomizers and carburetors.

### 💡 4. Multiple Worked Examples & Real-World Applications
#### 💡 Example 1 (Clinical / Biological Application: Arteriosclerosis & Vascular Flutter)
When cholesterol plaques narrow an artery ($A_2 < A_1$), blood velocity surges. By Bernoulli's law, internal pressure collapses, causing the artery to flutter or momentarily occlude, leading to vascular murmurs detected via stethoscope.

#### 💡 Example 2 (Real-World Aerodynamics: Aerofoil Dynamic Lift)
An aeroplane wing is cambered (curved on top, flat below). Air traverses the upper surface faster ($v_{\\text{top}} > v_{\\text{bottom}}$), generating lower pressure above. The upward net pressure force gives dynamic lift: $F_L = (P_{\\text{bottom}} - P_{\\text{top}}) \\times A$.

#### 💡 Example 3 (NEET Solved Numerical: Venturimeter Flow Rate)
*Problem:* Water ($\rho = 1000\\text{ kg/m}^3$) flows through a horizontal pipe where $A_1 = 4.0 \\times 10^{-2}\\text{ m}^2$ and throat $A_2 = 2.0 \\times 10^{-2}\\text{ m}^2$. Pressure difference $\\Delta P = 4500\\text{ Pa}$. Find speed $v_1$.
*Step-by-step Solution:*
1. By Bernoulli: $\\Delta P = \\frac{1}{2}\\rho (v_2^2 - v_1^2)$
2. By Continuity: $v_2 = v_1(A_1 / A_2) = 2 v_1 \\implies v_2^2 = 4 v_1^2$
3. Substitute: $4500 = \\frac{1}{2}(1000)(3 v_1^2) = 1500 v_1^2$
4. $v_1^2 = 3 \\implies v_1 = \\sqrt{3} \\approx \\mathbf{1.73\\text{ m/s}}$.

### ⚠️ 5. NEET High-Yield Traps & NCERT Line Pointers
1. **Incompressible & Non-Viscous Constraint:** Bernoulli's equation strictly fails for turbulent or viscous fluids where mechanical energy dissipates as heat.
2. **Horizontal Pipe Assumption:** When pipes tilt, always include the $\\rho g h$ term; ignoring elevation head is a classic NTA trap.

### 🎯 6. Suggested Practice MCQs (NEET Pattern)
**Q1. In a horizontal streamline flow of an ideal fluid, the point where velocity is highest has:**
(A) Highest pressure and highest potential energy
(B) Lowest pressure and lowest kinetic energy
(C) Lowest pressure and highest kinetic energy
(D) Constant pressure throughout

**Q2. Two ping-pong balls are suspended side-by-side with a small gap. When air is blown strongly into the gap between them, the balls:**
(A) Move away from each other due to air thrust
(B) Collide into each other due to reduced pressure between them
(C) Remain stationary due to inertia
(D) Oscillate randomly without touching

**Answer Key & Explanation:**
- **Q1: (C)** — By Bernoulli's equation $P + \\frac{1}{2}\\rho v^2 = \\text{const}$, as kinetic energy peaks, static pressure drops to its minimum.
- **Q2: (B)** — Fast-moving air in the gap creates a localized low-pressure zone; higher atmospheric pressure on the outer sides pushes the balls inward.`,

    rotational: `### 📖 1. Clear Definition & First Principles
**Rotational Dynamics:** When an extended rigid body undergoes pure rolling motion without slipping on a surface, every point on the body exhibits both translational center-of-mass motion ($v_{\\text{cm}}$) and rotation about the center of mass with angular velocity $\\omega = v_{\\text{cm}} / R$.

### 📊 2. High-Resolution Graphical & 3D Vector Diagram
\`\`\`svg
<svg viewBox="0 0 650 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="45%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#082f49"/>
    </radialGradient>
    <linearGradient id="rampGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <filter id="sphereGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#0284c7" flood-opacity="0.4"/>
    </filter>
  </defs>
  <rect width="650" height="340" rx="16" fill="#070c18"/>

  <polygon points="50,290 600,290 50,70" fill="url(#rampGrad)" stroke="#64748b" stroke-width="2"/>
  <path d="M 500,290 A 60,60 0 0,0 455,270" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <text x="475" y="285" fill="#fbbf24" font-size="12" font-weight="bold" font-family="sans-serif">θ</text>

  <g transform="translate(230, 160)" filter="url(#sphereGlow)">
    <circle cx="0" cy="0" r="50" fill="url(#sphereGrad)" stroke="#7dd3fc" stroke-width="2.5"/>
    <circle cx="-15" cy="-15" r="12" fill="#ffffff" opacity="0.35"/>
    <circle cx="0" cy="0" r="4" fill="#ffffff"/>
    <line x1="0" y1="0" x2="60" y2="25" stroke="#10b981" stroke-width="3"/>
    <polygon points="60,21 68,28 58,31" fill="#10b981"/>
    <text x="75" y="30" fill="#34d399" font-size="11" font-weight="bold" font-family="sans-serif">v_cm</text>
    <path d="M -25,25 A 35,35 0 1,1 25,25" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="4 2"/>
    <polygon points="25,21 32,27 23,31" fill="#f59e0b"/>
    <text x="0" y="-30" fill="#fde047" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">ω = v_cm / R</text>
    <circle cx="0" cy="-50" r="3" fill="#f43f5e"/>
    <line x1="0" y1="-50" x2="80" y2="-15" stroke="#f43f5e" stroke-width="3"/>
    <polygon points="80,-19 88,-12 78,-9" fill="#f43f5e"/>
    <text x="95" y="-12" fill="#fb7185" font-size="10.5" font-weight="bold" font-family="sans-serif">v_top = 2·v_cm</text>
    <circle cx="0" cy="50" r="4" fill="#a855f7"/>
    <rect x="-80" y="58" width="160" height="22" rx="4" fill="#1e1035" stroke="#a855f7" stroke-width="1"/>
    <text x="0" y="73" fill="#e9d5ff" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">P: Instantaneous v = 0</text>
  </g>

  <rect x="280" y="30" width="330" height="48" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="445" y="50" fill="#e0f2fe" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Total K = ½Mv²(1 + k²/R²)</text>
  <text x="445" y="68" fill="#38bdf8" font-size="11" text-anchor="middle" font-family="sans-serif">Solid Sphere (0.4) > Cylinder (0.5) > Ring (1.0)</text>
</svg>
\`\`\`

### 🔍 3. Diagram Breakdown & Step-by-Step Explanation
1. **Instantaneous Center of Rotation (Point P):** The contact point instantaneously has velocity $v_P = v_{\\text{cm}} - R\\omega = 0$.
2. **Topmost Point:** Center of mass velocity and tangential velocity reinforce each other: $v_{\\text{top}} = v_{\\text{cm}} + R\\omega = 2 v_{\\text{cm}}$.
3. **Total Kinetic Energy:** Sum of translational and rotational components:
$$K_{\\text{total}} = \\frac{1}{2}M v_{\\text{cm}}^2 \\left(1 + \\frac{k^2}{R^2}\\right)$$

### 💡 4. Multiple Worked Examples & Real-World Applications
#### 💡 Example 1 (Conceptual Incline Race: Sphere vs Cylinder vs Ring)
When rolling down an incline of angle $\\theta$, linear acceleration is:
$$a = \\frac{g \\sin \\theta}{1 + k^2/R^2}$$
- Solid Sphere: $k^2/R^2 = 2/5 = 0.40$ (Smallest value $\\implies$ maximum acceleration $\\implies$ reaches bottom FIRST!)
- Disc / Solid Cylinder: $k^2/R^2 = 1/2 = 0.50$ (Reaches second)
- Spherical Shell: $k^2/R^2 = 2/3 = 0.67$ (Reaches third)
- Ring / Thin Hoop: $k^2/R^2 = 1.0$ (Largest value $\\implies$ minimum acceleration $\\implies$ reaches LAST!)

#### 💡 Example 2 (NEET Worked Numerical: Incline Velocity)
*Problem:* A uniform solid sphere of mass $M$ and radius $R$ rolls down an incline of height $h = 7\\text{ m}$ from rest. Calculate its speed at the bottom.
*Solution:*
1. Conservation of Energy: $Mgh = \\frac{1}{2}M v^2(1 + k^2/R^2)$
2. For Solid Sphere: $k^2/R^2 = 2/5 \\implies 1 + 2/5 = 7/5$
3. $gh = \\frac{1}{2} v^2 \\left(\\frac{7}{5}\\right) = \\frac{7}{10} v^2$
4. $v = \\sqrt{\\frac{10}{7} gh} = \\sqrt{\\frac{10}{7} \\times 9.8 \\times 7} = \\sqrt{98} \\approx \\mathbf{9.9\\text{ m/s}}$.

### ⚠️ 5. NEET High-Yield Traps & NCERT Line Pointers
1. **Work Done by Static Friction:** In pure rolling, static friction does **ZERO net work** because the point of contact does not slip ($v=0$).
2. **Radius Independence:** Speed at the bottom depends strictly on $k^2/R^2$ and height $h$; neither mass $M$ nor radius $R$ affects who reaches first!

### 🎯 6. Suggested Practice MCQs (NEET Pattern)
**Q1. A solid cylinder, a solid sphere, and a thin ring of equal masses and radii roll down an incline without slipping from the same height. Which one arrives last?**
(A) Solid cylinder
(B) Solid sphere
(C) Thin ring
(D) All arrive simultaneously

**Answer Key & Explanation:**
- **(C) Thin ring** — Ring has the largest $k^2/R^2 = 1$, giving the lowest acceleration $a = \\frac{g\\sin\\theta}{2}$, so it takes the longest time.`
  },
  chemistry: {
    sn1_sn2: `### 📖 1. Clear Definition & First Principles
**Nucleophilic Substitution Reactions ($S_N1$ vs $S_N2$):**
- **$S_N1$ (Substitution Nucleophilic Unimolecular):** A two-step reaction wherein the rate-determining step involves only the alkyl halide substrate forming a planar carbocation intermediate.
- **$S_N2$ (Substitution Nucleophilic Bimolecular):** A single concerted step mechanism wherein the nucleophile attacks from the backside simultaneously as the leaving group departs via a pentacoordinate transition state.

### 📊 2. High-Resolution Graphical & 3D Vector Diagram
\`\`\`svg
<svg viewBox="0 0 650 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <radialGradient id="cGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </radialGradient>
    <radialGradient id="brGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#f87171"/>
      <stop offset="100%" stop-color="#991b1b"/>
    </radialGradient>
    <radialGradient id="nuGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#22d3ee"/>
      <stop offset="100%" stop-color="#0e7490"/>
    </radialGradient>
    <radialGradient id="hGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#94a3b8"/>
    </radialGradient>
  </defs>
  <rect width="650" height="340" rx="16" fill="#090d16"/>

  <text x="170" y="32" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">SN2: Concerted Backside Attack (Walden Inversion)</text>

  <circle cx="50" cy="115" r="16" fill="url(#nuGrad)" stroke="#67e8f9" stroke-width="1.5"/>
  <text x="50" y="119" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">Nu⁻</text>
  <path d="M 72,115 Q 100,115 115,115" fill="none" stroke="#22d3ee" stroke-width="2.5"/>
  <polygon points="115,111 123,115 115,119" fill="#22d3ee"/>

  <circle cx="150" cy="115" r="18" fill="url(#cGrad)" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="150" y="119" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">C</text>
  <line x1="168" y1="115" x2="200" y2="115" stroke="#ef4444" stroke-width="2"/>
  <circle cx="218" cy="115" r="18" fill="url(#brGrad)" stroke="#fca5a5" stroke-width="1.5"/>
  <text x="218" y="119" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Br</text>

  <g transform="translate(260, 65)">
    <rect x="0" y="0" width="130" height="100" rx="8" fill="#131b2e" stroke="#818cf8" stroke-width="1" stroke-dasharray="4 3"/>
    <text x="65" y="20" fill="#a5b4fc" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">[Transition State]‡</text>
    <line x1="25" y1="50" x2="65" y2="50" stroke="#22d3ee" stroke-width="2" stroke-dasharray="3 2"/>
    <circle cx="65" cy="50" r="14" fill="url(#cGrad)"/>
    <line x1="65" y1="50" x2="105" y2="50" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
    <circle cx="20" cy="50" r="10" fill="url(#nuGrad)"/>
    <circle cx="110" cy="50" r="10" fill="url(#brGrad)"/>
    <text x="65" y="85" fill="#facc15" font-size="9.5" text-anchor="middle" font-family="sans-serif">Pentacoordinate Carbon</text>
  </g>

  <g transform="translate(430, 85)">
    <path d="M 0,30 L 25,30" fill="none" stroke="#10b981" stroke-width="2"/>
    <polygon points="25,27 32,30 25,33" fill="#10b981"/>
    <circle cx="55" cy="30" r="14" fill="url(#nuGrad)"/>
    <line x1="69" y1="30" x2="95" y2="30" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="109" cy="30" r="16" fill="url(#cGrad)"/>
    <circle cx="170" cy="30" r="14" fill="url(#brGrad)"/>
    <text x="170" y="34" fill="#ffffff" font-size="9" text-anchor="middle" font-family="sans-serif">Br⁻</text>
    <rect x="35" y="65" width="150" height="22" rx="4" fill="#022c22" stroke="#10b981" stroke-width="1"/>
    <text x="110" y="80" fill="#6ee7b7" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">100% Inverted Configuration</text>
  </g>

  <rect x="40" y="210" width="570" height="110" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <text x="325" y="235" fill="#e2e8f0" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">NEET Key Distinction: SN1 vs SN2</text>
  <line x1="60" y1="245" x2="590" y2="245" stroke="#334155" stroke-width="1"/>
  <text x="175" y="268" fill="#38bdf8" font-size="11" font-weight="bold" font-family="sans-serif">SN1: 3° > 2° > 1° (Carbocation)</text>
  <text x="175" y="288" fill="#94a3b8" font-size="10.5" font-family="sans-serif">Solvent: Polar Protic (H2O, EtOH) · Racemisation</text>
  <text x="430" y="268" fill="#f43f5e" font-size="11" font-weight="bold" font-family="sans-serif">SN2: CH3X > 1° > 2° > 3° (Steric)</text>
  <text x="430" y="288" fill="#94a3b8" font-size="10.5" font-family="sans-serif">Solvent: Polar Aprotic (Acetone, DMF) · Walden Inv.</text>
</svg>
\`\`\`

### 🔍 3. Diagram Breakdown & Step-by-Step Explanation
1. **$S_N1$ Carbocation Intermediate:** Carbocation is planar ($sp^2$). Attack by the nucleophile from the top or bottom face is equally probable, resulting in **racemisation**.
2. **$S_N2$ Transition State:** Nucleophile and leaving group are at $180^\\circ$. Backside attack causes umbrella-like flipping of substituent bonds (**Walden Inversion**).

### 💡 4. Multiple Worked Examples & Real-World Applications
#### 💡 Example 1 (Substrate Reactivity Trends)
- **$S_N1$ Order:** $3^\\circ > 2^\\circ > 1^\\circ > \\text{CH}_3\\text{X}$ (Governed strictly by carbocation stability).
- **$S_N2$ Order:** $\\text{CH}_3\\text{X} > 1^\\circ > 2^\\circ > 3^\\circ$ (Governed strictly by steric hindrance).

#### 💡 Example 2 (Stereochemical Case Study)
When optically active $(+)\\text{-2-bromooctane}$ reacts with aqueous $\\text{OH}^-$ under $S_N2$ conditions in acetone, it yields $100\\%$ pure $(-) \\text{-octan-2-ol}$ with complete optical inversion.

### ⚠️ 5. NEET High-Yield Traps & NCERT Line Pointers
1. **Benzylic & Allylic Halides:** Undergo both $S_N1$ (resonance-stabilized carbocation) and $S_N2$ (resonance-stabilized transition state) at exceptionally high rates.
2. **Solvent Role:** Polar Protic ($H_2O, ROH$) favors $S_N1$ by solvating ions; Polar Aprotic (Acetone, DMSO, DMF) favors $S_N2$ by leaving nucleophiles unencumbered.

### 🎯 6. Suggested Practice MCQs (NEET Pattern)
**Q1. Which of the following alkyl halides undergoes $S_N1$ hydrolysis most rapidly?**
(A) $\\text{CH}_3\\text{CH}_2\\text{Cl}$
(B) $(\\text{CH}_3)_2\\text{CH-Cl}$
(C) $(\\text{CH}_3)_3\\text{C-Cl}$
(D) $\\text{CH}_3\\text{Cl}$

**Answer Key & Explanation:**
- **(C) Tert-butyl chloride** — Forms a $3^\\circ$ carbocation stabilized by 9 hyperconjugative $\\alpha\\text{-hydrogens}$ and inductive effect.`
  },
  biology: {
    cell: `### 📖 1. Clear Definition & First Principles
**Cell:** The cell is the fundamental structural, functional, and biological unit of all living organisms. Any entity with less than a complete cell structure cannot lead an independent life (Robert Hooke first observed cells in cork; Antonie van Leeuwenhoek first saw living cells).

**Cell Theory (Schleiden, Schwann & Virchow):**
1. All living organisms are composed of cells and products of cells.
2. The cell is the basic structural and functional unit of life.
3. *Omnis cellula-e cellula* — All cells arise from pre-existing cells through cell division (Rudolf Virchow, 1855).

### 📊 2. High-Resolution Graphical & 3D Vector Diagram
\`\`\`svg
<svg viewBox="0 0 650 360" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <radialGradient id="cellBg" cx="45%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#064e3b"/>
      <stop offset="60%" stop-color="#022c22"/>
      <stop offset="100%" stop-color="#011713"/>
    </radialGradient>
    <radialGradient id="nucGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#c084fc"/>
      <stop offset="50%" stop-color="#7e22ce"/>
      <stop offset="100%" stop-color="#3b0764"/>
    </radialGradient>
    <radialGradient id="nucleolusGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#f472b6"/>
      <stop offset="70%" stop-color="#db2777"/>
      <stop offset="100%" stop-color="#831843"/>
    </radialGradient>
    <linearGradient id="mitoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fb923c"/>
      <stop offset="50%" stop-color="#ea580c"/>
      <stop offset="100%" stop-color="#9a3412"/>
    </linearGradient>
    <linearGradient id="erGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <linearGradient id="golgiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="100%" stop-color="#be123c"/>
    </linearGradient>
    <filter id="cellShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <rect width="650" height="360" rx="16" fill="#050811"/>

  <ellipse cx="320" cy="180" rx="275" ry="145" fill="url(#cellBg)" stroke="#10b981" stroke-width="4" filter="url(#cellShadow)"/>
  <ellipse cx="320" cy="180" rx="270" ry="140" fill="none" stroke="#34d399" stroke-width="1.5" stroke-dasharray="6 3" opacity="0.6"/>

  <path d="M 120,160 Q 200,100 320,120 T 520,160" fill="none" stroke="#047857" stroke-width="1" stroke-dasharray="3 4" opacity="0.4"/>
  <path d="M 140,220 Q 280,260 480,210" fill="none" stroke="#047857" stroke-width="1" stroke-dasharray="3 4" opacity="0.4"/>

  <circle cx="210" cy="175" r="75" fill="url(#nucGrad)" stroke="#a855f7" stroke-width="3" filter="url(#cellShadow)"/>
  <circle cx="210" cy="175" r="71" fill="none" stroke="#c084fc" stroke-width="1" stroke-dasharray="8 4"/>
  <circle cx="140" cy="155" r="3" fill="#e9d5ff"/>
  <circle cx="160" cy="115" r="3" fill="#e9d5ff"/>
  <circle cx="210" cy="102" r="3" fill="#e9d5ff"/>
  <circle cx="265" cy="125" r="3" fill="#e9d5ff"/>
  <circle cx="280" cy="190" r="3" fill="#e9d5ff"/>
  <circle cx="240" cy="240" r="3" fill="#e9d5ff"/>
  <circle cx="170" cy="235" r="3" fill="#e9d5ff"/>

  <circle cx="205" cy="165" r="28" fill="url(#nucleolusGrad)" stroke="#f472b6" stroke-width="2"/>
  <text x="205" y="169" fill="#fdf2f8" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">Nucleolus</text>

  <path d="M 275,140 Q 315,130 330,150 Q 300,170 335,190" fill="none" stroke="url(#erGrad)" stroke-width="6" stroke-linecap="round"/>
  <path d="M 285,165 Q 330,165 345,180" fill="none" stroke="url(#erGrad)" stroke-width="5" stroke-linecap="round"/>
  <circle cx="295" cy="134" r="2.5" fill="#38bdf8"/>
  <circle cx="315" cy="134" r="2.5" fill="#38bdf8"/>
  <circle cx="328" cy="148" r="2.5" fill="#38bdf8"/>
  <circle cx="308" cy="165" r="2.5" fill="#38bdf8"/>
  <circle cx="328" cy="178" r="2.5" fill="#38bdf8"/>
  <circle cx="340" cy="186" r="2.5" fill="#38bdf8"/>

  <g transform="translate(420, 110) rotate(-15)">
    <rect x="-45" y="-22" width="90" height="44" rx="22" fill="url(#mitoGrad)" stroke="#fdba74" stroke-width="2"/>
    <path d="M -30,-8 L -20,-8 L -20,8 M -10,-12 L 0,-12 L 0,12 M 10,-12 L 20,-12 L 20,10 M 30,-6 L 35,-6" fill="none" stroke="#fef08a" stroke-width="2.5" stroke-linecap="round"/>
  </g>

  <g transform="translate(130, 260) rotate(25)">
    <rect x="-35" y="-18" width="70" height="36" rx="18" fill="url(#mitoGrad)" stroke="#fdba74" stroke-width="1.8"/>
    <path d="M -22,-6 L -14,-6 L -14,6 M -5,-8 L 2,-8 L 2,8 M 12,-6 L 18,-6" fill="none" stroke="#fef08a" stroke-width="2" stroke-linecap="round"/>
  </g>

  <g transform="translate(430, 225)">
    <path d="M -45,-15 Q -10,-5 35,-15" fill="none" stroke="url(#golgiGrad)" stroke-width="6" stroke-linecap="round"/>
    <path d="M -40,-3 Q -10,7 30,-3" fill="none" stroke="url(#golgiGrad)" stroke-width="6" stroke-linecap="round"/>
    <path d="M -35,9 Q -10,19 25,9" fill="none" stroke="url(#golgiGrad)" stroke-width="6" stroke-linecap="round"/>
    <circle cx="45" cy="-18" r="5" fill="#fb7185"/>
    <circle cx="42" cy="0" r="4" fill="#fb7185"/>
    <circle cx="36" cy="18" r="5" fill="#fb7185"/>
  </g>

  <circle cx="340" cy="95" r="14" fill="#ef4444" stroke="#fca5a5" stroke-width="1.5"/>
  <circle cx="337" cy="92" r="4" fill="#ffffff" opacity="0.6"/>
  <circle cx="490" cy="180" r="12" fill="#ef4444" stroke="#fca5a5" stroke-width="1.5"/>
  <circle cx="488" cy="178" r="3.5" fill="#ffffff" opacity="0.6"/>

  <rect x="155" y="90" width="14" height="6" rx="2" fill="#eab308" stroke="#fef08a" stroke-width="1"/>
  <rect x="160" y="85" width="6" height="14" rx="2" fill="#eab308" stroke="#fef08a" stroke-width="1"/>

  <line x1="210" y1="102" x2="160" y2="40" stroke="#c084fc" stroke-width="1.5"/>
  <rect x="80" y="22" width="165" height="26" rx="6" fill="#1e1035" stroke="#a855f7" stroke-width="1.5"/>
  <text x="162" y="39" fill="#e9d5ff" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Nucleus (Genetic Mastermind)</text>

  <line x1="440" y1="90" x2="480" y2="35" stroke="#fb923c" stroke-width="1.5"/>
  <rect x="410" y="18" width="190" height="26" rx="6" fill="#2c1203" stroke="#f97316" stroke-width="1.5"/>
  <text x="505" y="35" fill="#fed7aa" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Mitochondria (ATP Synth · 70S)</text>

  <line x1="450" y1="245" x2="490" y2="305" stroke="#f43f5e" stroke-width="1.5"/>
  <rect x="420" y="295" width="180" height="26" rx="6" fill="#2e0515" stroke="#f43f5e" stroke-width="1.5"/>
  <text x="510" y="312" fill="#fecdd3" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Golgi Complex (Secretory)</text>

  <line x1="100" y1="180" x2="40" y2="295" stroke="#10b981" stroke-width="1.5"/>
  <rect x="10" y="295" width="170" height="26" rx="6" fill="#022119" stroke="#10b981" stroke-width="1.5"/>
  <text x="95" y="312" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Plasma Membrane (Lipid Bilayer)</text>

  <line x1="330" y1="140" x2="350" y2="55" stroke="#38bdf8" stroke-width="1.5"/>
  <rect x="270" y="42" width="130" height="24" rx="6" fill="#07223b" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="335" y="58" fill="#bae6fd" font-size="10.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">Rough ER + 80S Ribosomes</text>
</svg>
\`\`\`

### 🔍 3. Diagram Breakdown & Step-by-Step Explanation
1. **Endomembrane System:** Consists of Endoplasmic Reticulum (ER), Golgi Complex, Lysosomes, and Vacuoles acting in functional coordination. (Peroxisomes, Mitochondria, and Chloroplasts are NOT part of this system).
2. **Endoplasmic Reticulum:** Rough ER synthesizes proteins; Smooth ER synthesizes lipids and steroidal hormones.
3. **Golgi Apparatus:** Modifies proteins into glycoproteins and lipids into glycolipids from Cis (entry) to Trans (exit) face.
4. **Mitochondria & Chloroplasts:** Semi-autonomous organelles possessing their own circular dsDNA and bacterial 70S ribosomes.

### 💡 4. Multiple Worked Examples & Real-World Applications
#### 💡 Example 1 (Specialized Cell Morphology & Functional Adaptation)
- **Human RBCs (Erythrocytes):** Biconcave disc-shape, devoid of nucleus and mitochondria at maturity, maximizing surface-to-volume ratio for $O_2$ transport.
- **Tracheids:** Elongated tubular cells with lignified walls for conducting water under high mechanical stress.

#### 💡 Example 2 (Clinical Relevance: Lysosomal Storage Disorders)
Tay-Sachs and Gaucher's diseases result from genetic absence of specific lysosomal acid hydrolases, causing toxic accumulation of undigested lipids in brain and liver cells.

#### 💡 Example 3 (Cell Fractionation & Centrifugation Order)
When a tissue homogenate is centrifuged at increasing speeds, organelles sediment according to density and mass:
*Nuclei (First) $\\rightarrow$ Chloroplasts/Mitochondria (Second) $\\rightarrow$ Microsomes / ER fragments (Third) $\\rightarrow$ Ribosomes (Last).*

### ⚠️ 5. NEET High-Yield Traps & NCERT Line Pointers
1. **Membrane-less Organelles:** Ribosomes, centrosomes/centrioles, and nucleoli are **non-membrane-bound**. Ribosomes are present in BOTH prokaryotes and eukaryotes.
2. **Prokaryotic Ribosome vs Eukaryotic Organellar:** Both are **70S** (composed of 50S and 30S subunits), proving endosymbiotic evolution!
3. **Viruses:** Exceptions to Cell Theory because they lack cellular machinery outside a living host.

### 🎯 6. Suggested Practice MCQs (NEET Pattern)
**Q1. Which of the following cellular components is NOT part of the endomembrane system?**
(A) Endoplasmic reticulum
(B) Golgi apparatus
(C) Peroxisome
(D) Lysosome

**Q2. Who modified the original cell theory of Schleiden and Schwann to add the principle 'Omnis cellula-e cellula'?**
(A) Robert Hooke
(B) Rudolf Virchow
(C) Antonie van Leeuwenhoek
(D) George Palade

**Answer Key & Explanation:**
- **Q1: (C) Peroxisome** — Functions of peroxisomes, mitochondria, and chloroplasts are not coordinated with the ER-Golgi pathway.
- **Q2: (B) Rudolf Virchow (1855)** — Virchow finalized cell theory by demonstrating that new cells originate from divisions of pre-existing cells.`,

    c3_c4: `### 📖 1. Clear Definition & First Principles
**Photosynthetic Carbon Fixation ($C_3$ vs $C_4$):**
- **$C_3$ Pathway (Calvin Cycle):** Primary $CO_2$ fixation occurs via enzyme RuBisCO in mesophyll cells, forming 3-phosphoglyceric acid (3-PGA, 3-carbon). At elevated temperatures and $O_2$ levels, RuBisCO acts as oxygenase, initiating wasteful **photorespiration** ($C_2$ cycle).
- **$C_4$ Pathway (Hatch-Slack Pathway):** Primary $CO_2$ fixation occurs via PEP carboxylase (PEPcase) in mesophyll cells to produce oxaloacetic acid (OAA, 4-carbon). Possesses **Kranz anatomy** to completely avoid photorespiration.

### 📊 2. High-Resolution Graphical & 3D Vector Diagram
\`\`\`svg
<svg viewBox="0 0 650 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="mesoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#047857"/>
      <stop offset="100%" stop-color="#064e3b"/>
    </linearGradient>
    <linearGradient id="bundleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#075985"/>
    </linearGradient>
    <radialGradient id="veinGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </radialGradient>
  </defs>
  <rect width="650" height="340" rx="16" fill="#080f1a"/>

  <g transform="translate(40, 40)">
    <rect width="250" height="230" rx="14" fill="url(#mesoGrad)" stroke="#10b981" stroke-width="2.5"/>
    <rect x="15" y="12" width="220" height="26" rx="6" fill="#022c22" stroke="#34d399" stroke-width="1.5"/>
    <text x="125" y="29" fill="#a7f3d0" font-size="11.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">Mesophyll Cell (Initial Fixation)</text>

    <rect x="25" y="60" width="200" height="42" rx="6" fill="#065f46"/>
    <text x="125" y="78" fill="#ecfdf5" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Atmospheric CO2 + PEP (3C)</text>
    <text x="125" y="94" fill="#6ee7b7" font-size="10" text-anchor="middle" font-family="sans-serif">Enzyme: PEPcase (Zero Oxygenase!)</text>

    <path d="M 125,105 L 125,130" stroke="#fef08a" stroke-width="2.5"/>
    <polygon points="121,130 125,138 129,130" fill="#fef08a"/>

    <rect x="25" y="145" width="200" height="36" rx="6" fill="#047857" stroke="#34d399" stroke-width="1"/>
    <text x="125" y="162" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">OAA (4C: First Stable Product)</text>
    <text x="125" y="174" fill="#a7f3d0" font-size="9.5" text-anchor="middle" font-family="sans-serif">Converted to Malic Acid (4C)</text>
  </g>

  <line x1="290" y1="180" x2="360" y2="180" stroke="#f59e0b" stroke-width="4" stroke-dasharray="6 3"/>
  <polygon points="358,175 368,180 358,185" fill="#f59e0b"/>
  <rect x="285" y="130" width="80" height="22" rx="4" fill="#1e1b4b" stroke="#818cf8" stroke-width="1"/>
  <text x="325" y="145" fill="#c7d2fe" font-size="9" font-weight="bold" text-anchor="middle" font-family="sans-serif">Plasmodesmata</text>

  <g transform="translate(360, 40)">
    <rect width="250" height="230" rx="14" fill="url(#bundleGrad)" stroke="#38bdf8" stroke-width="2.5"/>
    <rect x="15" y="12" width="220" height="26" rx="6" fill="#082f49" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="125" y="29" fill="#bae6fd" font-size="11.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">Bundle Sheath (Thick Walls)</text>

    <rect x="25" y="60" width="200" height="40" rx="6" fill="#0369a1"/>
    <text x="125" y="78" fill="#f0f9ff" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Malic Acid Decarboxylation</text>
    <text x="125" y="93" fill="#7dd3fc" font-size="10" text-anchor="middle" font-family="sans-serif">Releases 100% Rich CO2</text>

    <path d="M 125,105 L 125,130" stroke="#fef08a" stroke-width="2.5"/>
    <polygon points="121,130 125,138 129,130" fill="#fef08a"/>

    <rect x="25" y="145" width="200" height="48" rx="6" fill="#0c4a6e" stroke="#38bdf8" stroke-width="1"/>
    <text x="125" y="163" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">RuBisCO Calvin C3 Cycle</text>
    <text x="125" y="177" fill="#fde047" font-size="9.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">Zero Photorespiration! High Yield</text>
  </g>

  <rect x="80" y="290" width="490" height="32" rx="8" fill="#111827" stroke="#374151" stroke-width="1.5"/>
  <text x="325" y="311" fill="#f3f4f6" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">NCERT Rule: RuBisCO is strictly absent in mesophyll cells of C4 plants!</text>
</svg>
\`\`\`

### 🔍 3. Diagram Breakdown & Step-by-Step Explanation
1. **Spatial Separation:** Mesophyll cells perform initial carboxylation using PEPcase; Bundle Sheath cells perform Calvin cycle with RuBisCO.
2. **Kranz Anatomy:** Bundle sheath cells have multiple concentric layers, thick impervious walls, and **agranal chloroplasts** (no PS-II, no $O_2$ evolution).
3. **Decarboxylation Pump:** Releases $CO_2$ inside bundle sheath, maintaining high $CO_2:O_2$ ratio at the RuBisCO active site.

### 💡 4. Multiple Worked Examples & Real-World Applications
#### 💡 Example 1 (Agronomic Crop Distribution)
- **$C_4$ Plants:** Maize, Sugarcane, Sorghum, Amaranthus. Exhibit higher photosynthetic yields, higher temperature optima ($30\\text{-}45^\\circ\\text{C}$), and greater water use efficiency.
- **$C_3$ Plants:** Rice, Wheat, Barley, Tomato. Saturate at lower light and lower temperatures ($20\\text{-}25^\\circ\\text{C}$).

#### 💡 Example 2 (Energetics Calculation for Glucose Synthesis)
- To produce 1 molecule of Glucose ($C_6H_{12}O_6$):
  * **$C_3$ Plant:** Needs **18 ATP** + **12 NADPH**
  * **$C_4$ Plant:** Needs **30 ATP** + **12 NADPH** (Additional 12 ATP required to regenerate PEP from pyruvate).

### ⚠️ 5. NEET High-Yield Traps & NCERT Line Pointers
1. **RuBisCO Location in $C_4$:** RuBisCO is **absent** in mesophyll cells of $C_4$ plants; it is located exclusively in the bundle sheath cells!
2. **PEPcase Specificity:** PEPcase has **zero oxygenase activity**, so $C_4$ plants completely eliminate photorespiration.

### 🎯 6. Suggested Practice MCQs (NEET Pattern)
**Q1. In $C_4$ plants, the bundle sheath cells are characterized by:**
(A) Thin walls, large intercellular spaces, and granal chloroplasts
(B) Thick walls, no intercellular spaces, and large number of chloroplasts
(C) Absence of chloroplasts and presence of stomata
(D) Presence of PEPcase and absence of RuBisCO

**Answer Key & Explanation:**
- **(B)** — NCERT line: Bundle sheath cells form multiple concentric layers with thick walls impervious to gas exchange, no intercellular spaces, and abundant chloroplasts.`
  }
};

function generateFallbackReply(msg, subject, activeTopic = "") {
  const lower = msg.toLowerCase();
  const subKey = (subject || 'physics').toLowerCase();
  const subConfig = SUBJECTS_CONFIG[subKey] || SUBJECTS_CONFIG.physics;

  const isMoreInfo = lower.includes('more info') || lower.includes('more information') ||
    lower.includes('elaborate') || lower.includes('explain more') ||
    lower.includes('deep dive') || lower.includes('further') ||
    lower.includes('detailed') || lower.trim() === 'more' ||
    lower.includes('more explanation') || lower.includes('more explination') ||
    lower.includes('more diagram') || lower.includes('more diagrams') ||
    lower.includes('more daigram') || lower.includes('more daigrams') ||
    lower.includes('more, more') || lower.includes('more and more') ||
    lower.includes('extra info') || lower.includes('extra information');

  // 1. If asking for more information on the current active topic
  if (isMoreInfo) {
    const topicTitle = activeTopic || (subKey === 'physics' ? 'Physics and Measurement & Vector Kinematics' : subKey === 'chemistry' ? 'Chemical Kinetics & Reaction Mechanisms' : 'Cell Structure & Plant Physiology');
    
    return `### 📚 Exhaustive Deep-Dive & Advanced Multi-Diagram Masterclass: ${topicTitle}
Here is the advanced, high-yield comprehensive extension with **multiple 3D vector diagrams, deep first-principles explanations, and exhaustive NEET UG 2026 formulations**:

---

### 📖 1. Microscopic Mechanism & Advanced First Principles
- **First-Principles Foundation:** Natural systems operate under universal conservation laws (momentum, mass-energy, and charge). In mechanical and physical processes, every observed macroscopic phenomenon is the statistical consequence of billions of microscopic particle interactions governed by fundamental differential equations.
- **Intuitive Physical Analogy:** Think of physical variables as coupled streams in a hydraulic network: increasing resistance in one channel instantly re-distributes potential heads and kinetic currents across all interconnected conduits without violating continuity.
- **NCERT Deep Margin Insight:** In high-difficulty NTA papers, multi-statement questions test whether variables remain constant under changing boundary constraints (e.g., isothermal vs adiabatic, elastic vs inelastic, ideal vs non-ideal conditions).
- **Mathematical Invariance:** Notice that the fundamental governing relationships hold true across all reference frames when proper coordinate transformations are applied.

---

### 📊 2. High-Resolution 3D Vector Schematic 1: Structural & Apparatus Architecture
\`\`\`svg
<svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="deepGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669"/>
      <stop offset="50%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
    <linearGradient id="cardGradA" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <filter id="boxShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="#000000" flood-opacity="0.7"/>
    </filter>
  </defs>

  <rect width="680" height="340" rx="16" fill="#030712"/>

  <!-- Header Banner -->
  <rect x="25" y="25" width="630" height="65" rx="12" fill="url(#deepGrad1)" filter="url(#boxShadow)"/>
  <text x="340" y="55" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">NEET (UG) 2026 Core Conceptual &amp; Physical Framework</text>
  <text x="340" y="75" fill="#d1fae5" font-size="11.5" text-anchor="middle" font-family="sans-serif">Rigorous Dimensional Homogeneity · Vector Equilibrium · Microscopic Invariance</text>

  <!-- 3 Dimensional Analytical Blocks -->
  <g transform="translate(35, 115)">
    <rect width="190" height="195" rx="12" fill="url(#cardGradA)" stroke="#10b981" stroke-width="2" filter="url(#boxShadow)"/>
    <rect x="15" y="15" width="160" height="28" rx="6" fill="#064e3b"/>
    <text x="95" y="34" fill="#a7f3d0" font-size="11.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">1. Governing Laws</text>
    <text x="18" y="70" fill="#94a3b8" font-size="10.5" font-family="sans-serif">• Conservation of Energy</text>
    <text x="18" y="95" fill="#94a3b8" font-size="10.5" font-family="sans-serif">• Momentum Invariance</text>
    <text x="18" y="120" fill="#94a3b8" font-size="10.5" font-family="sans-serif">• Dimensional Symmetry</text>
    <rect x="15" y="145" width="160" height="35" rx="6" fill="#022c22" stroke="#059669" stroke-width="1"/>
    <text x="95" y="167" fill="#34d399" font-size="10.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">[LHS] = [RHS] Always</text>
  </g>

  <g transform="translate(245, 115)">
    <rect width="190" height="195" rx="12" fill="url(#cardGradA)" stroke="#38bdf8" stroke-width="2" filter="url(#boxShadow)"/>
    <rect x="15" y="15" width="160" height="28" rx="6" fill="#0c4a6e"/>
    <text x="95" y="34" fill="#bae6fd" font-size="11.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">2. Error Propagation</text>
    <text x="18" y="70" fill="#94a3b8" font-size="10.5" font-family="sans-serif">• Worst-Case Summation</text>
    <text x="18" y="95" fill="#94a3b8" font-size="10.5" font-family="sans-serif">• Denominator Signs (+)</text>
    <text x="18" y="120" fill="#94a3b8" font-size="10.5" font-family="sans-serif">• Powers as Multipliers</text>
    <rect x="15" y="145" width="160" height="35" rx="6" fill="#082f49" stroke="#0284c7" stroke-width="1"/>
    <text x="95" y="167" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">%ΔZ = a(%ΔA) + b(%ΔB)</text>
  </g>

  <g transform="translate(455, 115)">
    <rect width="190" height="195" rx="12" fill="url(#cardGradA)" stroke="#a855f7" stroke-width="2" filter="url(#boxShadow)"/>
    <rect x="15" y="15" width="160" height="28" rx="6" fill="#3b0764"/>
    <text x="95" y="34" fill="#e9d5ff" font-size="11.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">3. High-Yield Traps</text>
    <text x="18" y="70" fill="#94a3b8" font-size="10.5" font-family="sans-serif">• Constants have 0 error</text>
    <text x="18" y="95" fill="#94a3b8" font-size="10.5" font-family="sans-serif">• Arguments Dimensionless</text>
    <text x="18" y="120" fill="#94a3b8" font-size="10.5" font-family="sans-serif">• Significant Fig Rules</text>
    <rect x="15" y="145" width="160" height="35" rx="6" fill="#2e1065" stroke="#7c3aed" stroke-width="1"/>
    <text x="95" y="167" fill="#c084fc" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">Never Subtract Errors!</text>
  </g>
</svg>
\`\`\`

---

### 📐 3. Advanced Mathematical Derivations & Edge Cases
1. **General Governing Differential Form:**
   $$\\frac{d^2 x}{dt^2} + \\gamma \\frac{dx}{dt} + \\omega_0^2 x = 0$$
2. **First-Order Small Angle & Non-Ideal Approximations:**
   When higher-order terms cannot be neglected, correction factors apply:
   $$F_{\\text{effective}} = F_0 \\left(1 + \\alpha \\Delta T\\right) \\quad \\text{or} \\quad \\left(P + \\frac{a n^2}{V^2}\\right)(V - nb) = nRT$$
3. **Limit Analysis:**
   - As $t \\to \\infty$, systems converge toward steady-state kinetic equilibrium.
   - At boundary thresholds, phase transitions and critical points dictate behavior.

---

### 📊 4. High-Resolution 3D Vector Schematic 2: Kinetic Profile & Coordinate Dynamics
\`\`\`svg
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <radialGradient id="peakGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fb7185" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#e11d48" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="680" height="320" rx="16" fill="#050811"/>

  <!-- Coordinate Axes -->
  <line x1="80" y1="260" x2="620" y2="260" stroke="#475569" stroke-width="2"/>
  <polygon points="620,256 630,260 620,264" fill="#475569"/>
  <text x="610" y="285" fill="#94a3b8" font-size="11" font-family="sans-serif">Reaction Coordinate / Displacement (x)</text>

  <line x1="80" y1="260" x2="80" y2="40" stroke="#475569" stroke-width="2"/>
  <polygon points="76,40 80,30 84,40" fill="#475569"/>
  <text x="25" y="35" fill="#94a3b8" font-size="11" font-family="sans-serif">Energy (E) / Velocity (v)</text>

  <!-- Dynamic Curve -->
  <path d="M 80,220 C 180,220 220,70 340,70 C 460,70 500,240 600,240" fill="none" stroke="url(#curveGrad)" stroke-width="4"/>
  <path d="M 80,220 C 180,220 220,70 340,70 C 460,70 500,240 600,240 L 600,260 L 80,260 Z" fill="url(#curveGrad)" opacity="0.12"/>

  <!-- Peak Indicator -->
  <circle cx="340" cy="70" r="22" fill="url(#peakGlow)"/>
  <circle cx="340" cy="70" r="7" fill="#f43f5e" stroke="#ffffff" stroke-width="2"/>
  <line x1="340" y1="70" x2="340" y2="260" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="4 3"/>

  <!-- Annotations -->
  <rect x="250" y="20" width="180" height="30" rx="6" fill="#1e1035" stroke="#a855f7" stroke-width="1.5"/>
  <text x="340" y="40" fill="#e9d5ff" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Peak State (Transition / H_max)</text>

  <rect x="100" y="160" width="130" height="26" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1"/>
  <text x="165" y="177" fill="#7dd3fc" font-size="10.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">Initial Reactants (u)</text>

  <rect x="470" y="190" width="130" height="26" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1"/>
  <text x="535" y="207" fill="#6ee7b7" font-size="10.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">Final Products (v)</text>
</svg>
\`\`\`

---

### 💡 5. Multiple Solved Advanced NEET Numericals
#### 💡 Problem 1: Multi-Variable Error Propagation
*Problem:* Calculate the maximum estimated percentage uncertainty in a physical quantity $Y = \\frac{A \\cdot B^2}{C^3}$ when contributing variables $A, B, C$ are measured with percentage errors of $2\\%$, $1.5\\%$, and $3\\%$ respectively.

*Step-by-Step Rigorous Solution:*
1. **Governing Error Formula:**
   $$\\% \\Delta Y = \\% \\Delta A + 2(\\% \\Delta B) + 3(\\% \\Delta C)$$
2. **Key Rule:** Fractional errors in physical measurement always add up in worst-case analysis; they **never subtract**, even if powers are in the denominator!
3. **Step-by-Step Substitution:**
   $$\\% \\Delta Y = 2\\% + 2(1.5\\%) + 3(3\\%) = 2\\% + 3\\% + 9\\% = \\mathbf{14\\%}$$
4. **Final Result:** The maximum estimated uncertainty is **$14\\%$**.

#### 💡 Problem 2: Fractional Exponent Error Analysis
*Problem:* In an experiment, quantity $P = \\frac{a^3 b^2}{\\sqrt{c} \\cdot d}$. The percentage errors in $a, b, c, d$ are $1\\%$, $3\\%$, $4\\%$, and $2\\%$ respectively. Find the percentage error in $P$.

*Solution:*
1. **Formula:**
   $$\\% \\Delta P = 3(\\% \\Delta a) + 2(\\% \\Delta b) + \\frac{1}{2}(\\% \\Delta c) + \\% \\Delta d$$
2. **Substitution:**
   $$\\% \\Delta P = 3(1\\%) + 2(3\\%) + \\frac{1}{2}(4\\%) + 2\\% = 3\\% + 6\\% + 2\\% + 2\\% = \\mathbf{13\\%}$$

---

### ⚠️ 6. High-Yield NCERT Traps & Tricky Distractors
- **Common Exam Trap 1:** Many students subtract negative percentage errors. Remember: Maximum possible percentage error always sums all absolute contributing terms!
- **Common Exam Trap 2:** Pure numerical constants (like $\\pi$, $\\frac{1}{2}$, $e$) have **zero uncertainty** and are omitted from error summation formulas.
- **Common Exam Trap 3:** In dimensional analysis, trigonometric, exponential, and logarithmic functions must strictly have **dimensionless arguments** ($[M^0 L^0 T^0]$).

---

### 🎯 7. Advanced Practice Question Bank (with Complete Step-by-Step Explanations)

**Q1. In an experiment, physical quantities $A, B, C$ are measured with percentage errors $1\\%$, $2\\%$, and $4\\%$ respectively. If quantity $X = \\frac{A^2 B^{1/2}}{C^{1/3}}$, the percentage error in $X$ is:**
(A) $2.33\\%$
(B) $4.33\\%$
(C) $6.00\\%$
(D) $7.50\\%$

*Answer:* **(B) — 4.33%**
- **🎯 Step-by-Step Correct Solution:**
  1. The percentage error in $X = \\frac{A^2 B^{1/2}}{C^{1/3}}$ is given by:
     $$\\% \\Delta X = 2(\\% \\Delta A) + \\frac{1}{2}(\\% \\Delta B) + \\frac{1}{3}(\\% \\Delta C)$$
  2. Substitute the given values:
     $$\\% \\Delta X = 2(1\\%) + \\frac{1}{2}(2\\%) + \\frac{1}{3}(4\\%) = 2\\% + 1\\% + \\frac{4}{3}\\% = 3\\% + 1.33\\% = \\mathbf{4.33\\%}$$
- **❌ Why Other Options are Incorrect (Distractor Breakdown):**
  - **(A) 2.33%:** Incorrect. Result of subtracting the $C$ term instead of adding: $3\\% - 1.33\\% = 1.67\\%$, or dropping exponent weights.
  - **(C) 6.00%:** Incorrect. Mistakenly ignored fractional exponents $\\frac{1}{2}$ and $\\frac{1}{3}$, treating them as linear integers.
  - **(D) 7.50%:** Incorrect. Calculation error from wrong exponent multiplication.
- **⚠️ NCERT Exam Tip:** Exponents always serve as scalar multipliers in percentage error propagation formulas, regardless of whether they appear in the numerator or denominator!`;
  }

  // 2. Check if user clicked or queried any specific curriculum unit
  for (const u of (subConfig.units || [])) {
    const uNum = `unit ${u.number}`;
    const uTitle = u.title.toLowerCase();
    if (lower.includes(uNum) || lower.includes(uTitle)) {
      return getUnitMasterclass(subKey, u.number, u.title);
    }
    if (u.topics) {
      const parts = u.topics.toLowerCase().split(',');
      for (const p of parts) {
        const cleaned = p.trim();
        if (cleaned.length >= 4 && lower.includes(cleaned)) {
          return getUnitMasterclass(subKey, u.number, u.title);
        }
      }
    }
  }

  // 3. Match known concepts
  if (lower.includes('bernoulli')) return QUICK_KNOWLEDGE_BASE.physics.bernoulli;
  if (lower.includes('rotat') || lower.includes('inertia') || lower.includes('rolling')) return QUICK_KNOWLEDGE_BASE.physics.rotational;
  if (lower.includes('sn1') || lower.includes('sn2') || lower.includes('substitution')) return QUICK_KNOWLEDGE_BASE.chemistry.sn1_sn2;
  if (lower.includes('cell') || lower.includes('organelle') || lower.includes('membrane')) return QUICK_KNOWLEDGE_BASE.biology.cell;
  if (lower.includes('c3') || lower.includes('c4') || lower.includes('photosynthesis')) return QUICK_KNOWLEDGE_BASE.biology.c3_c4;

  // 4. Fallback to active unit masterclass or first unit
  const fallbackUnitNum = subConfig.units?.[0]?.number || 1;
  const fallbackTitle = activeTopic || subConfig.units?.[0]?.title || `NEET ${subject} Core Mastery`;
  return getUnitMasterclass(subKey, fallbackUnitNum, fallbackTitle);
}

function Graphical3DDiagram({ svgString, title = '3D Graphical & Vector Schematic' }) {
  const [is3D, setIs3D] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  let cleanedSvg = (svgString || '').trim();
  const svgStart = cleanedSvg.indexOf('<svg');
  const svgEnd = cleanedSvg.lastIndexOf('</svg>');
  if (svgStart !== -1 && svgEnd !== -1) {
    cleanedSvg = cleanedSvg.slice(svgStart, svgEnd + 6);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanedSvg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`my-4 rounded-2xl overflow-hidden border border-slate-700/80 bg-gradient-to-b from-slate-900 via-slate-950 to-black shadow-xl transition-all ${
      isExpanded ? 'fixed inset-4 z-50 overflow-y-auto max-h-[95vh] bg-slate-950/98 backdrop-blur-2xl border-emerald-500/60 p-4 shadow-2xl flex flex-col justify-between' : ''
    }`}>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-emerald-400 flex items-center gap-1.5">
            <Box size={14} className="text-emerald-400" />
            <span>{title}</span>
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
            {is3D ? '3D Depth Perspective' : 'Flat 2D'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIs3D(prev => !prev)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
              is3D
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/40'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="Toggle 3D View Angle"
          >
            <Box size={12} />
            <span>3D View</span>
          </button>

          <button
            onClick={() => setIsExpanded(prev => !prev)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            title={isExpanded ? 'Minimize' : 'Expand full screen'}
          >
            {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            title="Copy SVG Vector Code"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          </button>
        </div>
      </div>

      {/* SVG Canvas Area with 3D Depth Shading */}
      <div className="p-4 sm:p-6 flex items-center justify-center overflow-x-auto relative flex-1">
        <div
          className="w-full max-w-2xl mx-auto transition-all duration-500 ease-out"
          style={is3D ? {
            perspective: '1200px',
            transform: 'rotateX(8deg) rotateY(-2deg)',
            filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 15px rgba(16, 185, 129, 0.2))'
          } : {}}
          dangerouslySetInnerHTML={{ __html: cleanedSvg }}
        />
      </div>

      {/* Footer caption */}
      <div className="px-4 py-1.5 bg-slate-900/60 border-t border-slate-800/60 flex items-center justify-between text-[10.5px] text-slate-400 font-mono flex-shrink-0">
        <span>Interactive Medical Vector Illustration</span>
        <span>High-DPI · Scalable Vector Graphics</span>
      </div>
    </div>
  );
}

function renderTableCellContent(rawText, isUser, theme) {
  if (!rawText) return null;
  // If cell contains <br> or multiple bullets, format each bullet nicely
  const normalized = rawText.replace(/<br\s*\/?>/gi, '\n');
  const items = normalized.split('\n').map(s => s.trim()).filter(Boolean);

  if (items.length > 1) {
    return (
      <div className="space-y-2 py-1">
        {items.map((item, idx) => {
          const isBullet = item.startsWith('•') || item.startsWith('-') || item.startsWith('*');
          const cleanItem = item.replace(/^[•\-\*]\s*/, '').trim();
          return (
            <div key={idx} className="flex items-start gap-2 text-xs sm:text-[13.5px] leading-relaxed">
              {isBullet && <span className="text-emerald-500 font-bold mt-0.5 flex-shrink-0">•</span>}
              <div className="flex-1">{renderInlineFormatted(cleanItem, isUser, theme)}</div>
            </div>
          );
        })}
      </div>
    );
  }
  return renderInlineFormatted(rawText, isUser, theme);
}

function parseMarkdownBlocks(lines) {
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Table detection: starts and ends with | and has separator line next
    if (trimmed.startsWith('|') && trimmed.endsWith('|') && i + 1 < lines.length && /^\s*\|[\s\-:|]+\|\s*$/.test(lines[i+1].trim())) {
      const headerLine = trimmed;
      const headers = headerLine.split('|').map(c => c.trim()).filter(Boolean);
      i += 2; // skip header and separator
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        const rowCells = lines[i].trim().split('|').slice(1, -1).map(c => c.trim());
        rows.push(rowCells);
        i++;
      }
      blocks.push({ type: 'table', headers, rows });
      continue;
    }

    // Unfenced ASCII Diagram Detection (e.g. lines with '|  Nucleus', '/\/\/\', or crude box borders)
    if ((trimmed.startsWith('|') && !trimmed.endsWith('|')) || trimmed.includes('/\\/\\') || (trimmed.startsWith('|') && (trimmed.toLowerCase().includes('nucleus') || trimmed.toLowerCase().includes('mitochondri')))) {
      const asciiLines = [line];
      i++;
      while (i < lines.length && (lines[i].includes('|') || lines[i].includes('/') || lines[i].includes('\\') || !lines[i].trim() || lines[i].includes('+--'))) {
        asciiLines.push(lines[i]);
        i++;
      }
      const synthesizedSvg = synthesizeVectorDiagram(asciiLines.join('\n'));
      blocks.push({ type: 'svg', content: synthesizedSvg });
      continue;
    }

    // SVG Block Detection (in case model outputs raw SVG without triple backticks)
    if (trimmed.includes('<svg') && !trimmed.includes('</svg>')) {
      const svgLines = [line];
      i++;
      while (i < lines.length && !lines[i].includes('</svg>')) {
        svgLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) {
        svgLines.push(lines[i]);
        i++;
      }
      const rawSvg = svgLines.join('\n');
      blocks.push({ type: 'svg', content: synthesizeVectorDiagram(rawSvg) });
      continue;
    } else if (trimmed.includes('<svg') && trimmed.includes('</svg>')) {
      blocks.push({ type: 'svg', content: synthesizeVectorDiagram(line) });
      i++;
      continue;
    }

    if (!trimmed) {
      blocks.push({ type: 'spacer' });
      i++;
      continue;
    }

    if (line.startsWith('### ') || line.startsWith('## ')) {
      blocks.push({ type: 'heading', level: line.startsWith('### ') ? 3 : 2, text: line.replace(/^#{2,3}\s*/, '') });
      i++;
      continue;
    }

    if (line.startsWith('#### ')) {
      blocks.push({ type: 'subheading', text: line.replace(/^#{4}\s*/, '') });
      i++;
      continue;
    }

    // Single-line Display Math $$ ... $$ or \[ ... \]
    const isSingleDollarDisplay = trimmed.startsWith('$$') && trimmed.endsWith('$$') && trimmed.length > 2;
    const isSingleBracketDisplay = (trimmed.startsWith('\\[') || trimmed.startsWith('$$\\[')) && (trimmed.endsWith('\\]') || trimmed.endsWith('\\]$$')) && trimmed.length > 4;
    if (isSingleDollarDisplay || isSingleBracketDisplay) {
      const rawMath = trimmed.replace(/^(\$\$|\\\[)/, '').replace(/(\$\$|\\\])$/, '');
      blocks.push({ type: 'display_math', content: rawMath });
      i++;
      continue;
    }

    // Multi-line Display Math opening detection (e.g. \[ or $$ or \begin{aligned})
    const isMultiMathStart = trimmed === '\\[' || trimmed === '$$' || trimmed === '\\begin{aligned}' || trimmed === '\\begin{align*}' ||
      (trimmed.startsWith('\\[') && !trimmed.endsWith('\\]')) ||
      (trimmed.startsWith('$$') && trimmed.length > 2 && !trimmed.slice(2).includes('$$'));
    if (isMultiMathStart) {
      const mathLines = [line.replace(/^(\\\[|\$\$)/, '')];
      i++;
      while (i < lines.length) {
        const nextTrim = lines[i].trim();
        if (nextTrim === '\\]' || nextTrim === '$$' || nextTrim === '\\end{aligned}' || nextTrim.endsWith('\\]') || nextTrim.endsWith('$$')) {
          mathLines.push(lines[i].replace(/(\\\]|\$\$)$/, ''));
          i++;
          break;
        }
        mathLines.push(lines[i]);
        i++;
      }
      blocks.push({ type: 'display_math', content: mathLines.join('\n') });
      continue;
    }

    // Answer header detection
    const lowerTrim = trimmed.toLowerCase();
    if (lowerTrim.startsWith('*answer:*') || lowerTrim.startsWith('**answer:**') || lowerTrim.startsWith('answer:') || lowerTrim.startsWith('*answer key:*')) {
      const answerContent = trimmed.replace(/^[\*\_]*answer[\s\:\*\_]*/i, '').trim();
      blocks.push({ type: 'answer_header', text: answerContent });
      i++;
      continue;
    }

    // NEET MCQ Question Headline (e.g. Q1. or **Q1. ...**)
    if (/^\*{0,2}Q[0-9]+[\.\:]/i.test(trimmed)) {
      blocks.push({ type: 'question', text: trimmed });
      i++;
      continue;
    }

    if (/^\s*(\([A-D]\)|[A-D]\))\s+/i.test(trimmed)) {
      const optLetter = trimmed.match(/^(\([A-D]\)|[A-D]\))/i)[0].replace(/[\(\)]/g, '').toUpperCase();
      const optText = trimmed.replace(/^(\([A-D]\)|[A-D]\))\s*/i, '');
      blocks.push({ type: 'mcq_option', letter: optLetter, text: optText });
      i++;
      continue;
    }

    if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      blocks.push({ type: 'bullet', text: trimmed.replace(/^[\•\-\*]\s*/, '') });
      i++;
      continue;
    }

    blocks.push({ type: 'paragraph', text: line });
    i++;
  }
  return blocks;
}

export function FormattedMessageContent({ text, isUser, theme, textSize = 'base' }) {
  const [copiedIdx, setCopiedIdx] = useState(null);

  if (!text) return null;

  const fontConfig = {
    sm: {
      wrapper: "space-y-2 text-xs sm:text-[13px] leading-relaxed",
      heading: "font-extrabold text-[14px] text-slate-900 dark:text-white mt-3 mb-1.5 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-700/60 pb-1",
      subheading: "my-2 px-3 py-1 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center gap-2",
      tableHeader: "px-3 py-2 font-bold text-[11px] text-emerald-700 dark:text-emerald-400",
      tableCell: "px-3 py-1.5 leading-relaxed text-xs",
      mcq: "my-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700/70 font-medium text-slate-800 dark:text-zinc-200 text-xs flex items-center gap-2 hover:border-emerald-500/50 transition-colors",
      bullet: "pl-2 text-slate-700 dark:text-zinc-200 flex items-start gap-1.5 text-xs sm:text-[13px]",
      para: "leading-relaxed text-xs sm:text-[13px]"
    },
    base: {
      wrapper: "space-y-3 text-[14.5px] sm:text-[15.5px] leading-relaxed",
      heading: "font-extrabold text-[16.5px] sm:text-[18px] text-slate-900 dark:text-white mt-4 mb-2 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-1.5",
      subheading: "my-2.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-bold text-[13.5px] flex items-center gap-2",
      tableHeader: "px-4 py-2.5 font-bold text-[13px] text-emerald-700 dark:text-emerald-400",
      tableCell: "px-4 py-2.5 leading-relaxed text-[13.5px]",
      mcq: "my-2 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700/70 font-medium text-slate-800 dark:text-zinc-200 text-[13.5px] flex items-center gap-2.5 hover:border-emerald-500/50 transition-colors",
      bullet: "pl-2.5 text-slate-700 dark:text-zinc-200 flex items-start gap-2 text-[14.5px] sm:text-[15.5px]",
      para: "leading-relaxed text-[14.5px] sm:text-[15.5px]"
    },
    lg: {
      wrapper: "space-y-4 text-[16.5px] sm:text-[18px] leading-loose",
      heading: "font-extrabold text-[19px] sm:text-[21px] text-slate-900 dark:text-white mt-5 mb-3 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-2",
      subheading: "my-3 px-4 py-2 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-bold text-[15.5px] flex items-center gap-2",
      tableHeader: "px-4.5 py-3 font-bold text-[14.5px] text-emerald-700 dark:text-emerald-400",
      tableCell: "px-4.5 py-3 leading-relaxed text-[15px]",
      mcq: "my-2.5 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700/70 font-medium text-slate-800 dark:text-zinc-200 text-[15px] flex items-center gap-3 hover:border-emerald-500/50 transition-colors",
      bullet: "pl-3 text-slate-700 dark:text-zinc-200 flex items-start gap-2 text-[16.5px] sm:text-[18px]",
      para: "leading-loose text-[16.5px] sm:text-[18px]"
    }
  };

  const currentStyles = fontConfig[textSize] || fontConfig.base;

  const segments = text.split('```');

  const handleCopy = (code, idx) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className={currentStyles.wrapper}>
      {segments.map((segment, sIdx) => {
        // Odd segments are inside ``` ... ``` code/diagram blocks
        if (sIdx % 2 === 1) {
          const lines = segment.split('\n');
          const firstLine = lines[0].trim();
          // Check if first line is a valid language identifier (single word like 'svg', 'python', 'text')
          const isLangTag = /^[a-zA-Z0-9_-]{1,15}$/.test(firstLine);
          const header = isLangTag ? firstLine.toLowerCase() : '';
          const codeBody = isLangTag ? lines.slice(1).join('\n').trim() : segment.trim();

          const shortTopic = (text || '').split('\n').find(l => l.trim().length > 2)?.slice(0, 100) || '';

          // 1. Check if it's already an SVG block (intercept crude SVGs with synthesizer)
          if (header === 'svg' || (codeBody.includes('<svg') && codeBody.includes('</svg>'))) {
            const finalSvg = synthesizeVectorDiagram(codeBody, shortTopic, theme?.name || 'NEET Concept');
            return (
              <Graphical3DDiagram
                key={sIdx}
                svgString={finalSvg}
                title="3D Graphical & Vector Schematic"
              />
            );
          }

          // 2. Detect ASCII diagrams, schematics, or flowcharts
          const lowerCode = codeBody.toLowerCase();
          const isDiagram = !header || header === 'text' || header === 'ascii' || header === 'diagram' ||
            codeBody.includes('-->') || codeBody.includes('|') || codeBody.includes('+--') ||
            codeBody.includes('/\\') || codeBody.includes('\\/') ||
            lowerCode.includes('nucleus') || lowerCode.includes('mitochondri') ||
            lowerCode.includes('lysosome') || lowerCode.includes('cristae') || lowerCode.includes('bernoulli');

          // If it is a diagram or schematic, synthesize a high-resolution 3D Vector SVG
          if (isDiagram) {
            const synthesizedSvg = synthesizeVectorDiagram(codeBody, shortTopic, theme?.name || 'NEET Concept');
            return (
              <Graphical3DDiagram
                key={sIdx}
                svgString={synthesizedSvg}
                title="3D Graphical & Vector Schematic"
              />
            );
          }

          // Real programming / formula code block
          return (
            <div key={sIdx} className="my-3 rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-md">
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span>{header || 'Code / Formula'}</span>
                </span>
                <button
                  onClick={() => handleCopy(codeBody, sIdx)}
                  className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[10.5px]"
                  title="Copy diagram text"
                >
                  {copiedIdx === sIdx ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedIdx === sIdx ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 text-[12px] sm:text-[13px] font-mono leading-relaxed text-emerald-300 dark:text-emerald-400 overflow-x-auto whitespace-pre custom-scrollbar">
                {codeBody}
              </pre>
            </div>
          );
        }

        // Even segments are regular text with markdown
        const rawLines = segment.split('\n');
        const blocks = parseMarkdownBlocks(rawLines);

        return (
          <div key={sIdx} className="space-y-1.5">
            {blocks.map((b, bIdx) => {
              if (b.type === 'spacer') {
                return <div key={bIdx} className="h-1.5" />;
              }

              if (b.type === 'svg') {
                return (
                  <Graphical3DDiagram
                    key={bIdx}
                    svgString={b.content}
                    title="3D Graphical & Vector Schematic"
                  />
                );
              }

              if (b.type === 'heading') {
                return (
                  <h3
                    key={bIdx}
                    className={currentStyles.heading}
                  >
                    <span>{renderInlineFormatted(b.text, isUser, theme)}</span>
                  </h3>
                );
              }

              if (b.type === 'subheading') {
                return (
                  <div
                    key={bIdx}
                    className={currentStyles.subheading}
                  >
                    <span>{renderInlineFormatted(b.text, isUser, theme)}</span>
                  </div>
                );
              }

              if (b.type === 'question') {
                return (
                  <div
                    key={bIdx}
                    className="mt-4 mb-2 p-3 sm:p-3.5 rounded-xl bg-slate-900/90 dark:bg-slate-800/80 border border-emerald-500/30 text-emerald-400 font-bold text-sm sm:text-[15.5px] leading-relaxed shadow-sm"
                  >
                    {renderInlineFormatted(b.text, isUser, theme)}
                  </div>
                );
              }

              if (b.type === 'table') {
                // If it's a 2-column key-value or definition table, render as modern Claude/ChatGPT-style concept cards!
                const isTwoColumnDef = b.headers.length === 2 && b.rows.every(r => r.length <= 2);
                if (isTwoColumnDef) {
                  return (
                    <div key={bIdx} className="my-4 space-y-3">
                      {b.rows.map((row, ri) => (
                        <div
                          key={ri}
                          className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/90 hover:border-emerald-500/40 shadow-sm transition-all flex flex-col md:flex-row md:items-start gap-4"
                        >
                          <div className="md:w-1/3 flex-shrink-0">
                            <span className="inline-block px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-500/25 font-bold text-xs sm:text-[13px] tracking-tight">
                              {renderInlineFormatted(row[0], isUser, theme)}
                            </span>
                          </div>
                          <div className="md:w-2/3 flex-1 text-slate-800 dark:text-slate-200 text-xs sm:text-[14px] leading-relaxed">
                            {renderTableCellContent(row[1], isUser, theme)}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }

                // Standard Multi-Column Comparative Table
                return (
                  <div key={bIdx} className="my-3 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900/60 custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-zinc-200 font-bold border-b border-slate-200 dark:border-slate-700">
                        <tr>
                          {b.headers.map((h, hi) => (
                            <th key={hi} className={currentStyles.tableHeader}>
                              {renderInlineFormatted(h, isUser, theme)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-zinc-300">
                        {b.rows.map((row, ri) => (
                          <tr key={ri} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                            {row.map((cell, ci) => (
                              <td key={ci} className={currentStyles.tableCell}>
                                {renderTableCellContent(cell, isUser, theme)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }

              if (b.type === 'answer_header') {
                return (
                  <div
                    key={bIdx}
                    className="my-3 p-3.5 sm:p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/40 text-slate-800 dark:text-zinc-100 shadow-sm flex items-start gap-2.5"
                  >
                    <div className="p-1 rounded-lg bg-emerald-500 text-white flex-shrink-0 mt-0.5 shadow-xs">
                      <CheckCircle2 size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono mb-1">
                        NEET Answer Key & Complete NCERT Explanation
                      </div>
                      <div className="text-[13.5px] sm:text-[14.5px] font-bold text-slate-900 dark:text-white leading-relaxed">
                        {renderInlineFormatted(b.text, isUser, theme)}
                      </div>
                    </div>
                  </div>
                );
              }

              if (b.type === 'display_math') {
                const steps = formatDisplayMathBlock(b.content);
                const isMultiStep = steps.length > 1 || steps.some(s => s.left);
                if (isMultiStep) {
                  return (
                    <div
                      key={bIdx}
                      className="my-3.5 p-4 sm:p-5 rounded-2xl bg-slate-900/90 dark:bg-slate-950 border border-emerald-500/30 shadow-md"
                    >
                      <div className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                        <Calculator size={14} className="text-emerald-400" />
                        <span>Mathematical Formulation &amp; Step-by-Step Derivation</span>
                      </div>
                      <div className="space-y-1.5 font-mono text-[13px] sm:text-[14.5px] text-emerald-300 dark:text-emerald-400 overflow-x-auto custom-scrollbar">
                        {steps.map((st, sidx) => (
                          <div key={sidx} className="flex items-baseline gap-2 py-0.5">
                            {st.left ? (
                              <span className="font-semibold text-white text-right min-w-[60px] sm:min-w-[110px] flex-shrink-0">
                                {st.left}
                              </span>
                            ) : (
                              <span className="min-w-[60px] sm:min-w-[110px] flex-shrink-0 text-right text-emerald-500/70">
                                =
                              </span>
                            )}
                            <span className="text-emerald-300 dark:text-emerald-400 flex-1">
                              {st.right}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={bIdx}
                    className="my-3 p-3.5 rounded-2xl bg-slate-900/90 dark:bg-slate-950 border border-slate-700/80 text-center font-mono text-emerald-400 text-sm sm:text-base font-semibold shadow-inner overflow-x-auto custom-scrollbar"
                  >
                    {formatMathString(b.content)}
                  </div>
                );
              }

              if (b.type === 'mcq_option') {
                return (
                  <div
                    key={bIdx}
                    className={currentStyles.mcq}
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-[10.5px] flex-shrink-0">
                      {b.letter}
                    </span>
                    <span>{renderInlineFormatted(b.text, isUser, theme)}</span>
                  </div>
                );
              }

              if (b.type === 'bullet') {
                return (
                  <p key={bIdx} className={currentStyles.bullet}>
                    <span className="text-emerald-500 mt-0.5 flex-shrink-0 font-bold">•</span>
                    <span>{renderInlineFormatted(b.text, isUser, theme)}</span>
                  </p>
                );
              }

              return (
                <p key={bIdx} className={currentStyles.para}>
                  {renderInlineFormatted(b.text, isUser, theme)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default function NEETAITutorPage() {
  const navigate = useNavigate();
  const [activeSubject, setActiveSubject] = useState('physics');
  const [chatInput, setChatInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [studyDepth, setStudyDepth] = useState('comprehensive'); // 'quick' | 'comprehensive' (4-5 pgs) | 'exhaustive' (8-10 pgs)
  const [showAllUnitsModal, setShowAllUnitsModal] = useState(false);
  const [unitSearchQuery, setUnitSearchQuery] = useState('');
  const [showUnitsCarousel, setShowUnitsCarousel] = useState(false);
  const [showQuickPrompts, setShowQuickPrompts] = useState(false);
  const [readerModalMessage, setReaderModalMessage] = useState(null);
  const [textSize, setTextSize] = useState('base'); // 'sm' | 'base' | 'lg'
  const chatEndRef = useRef(null);

  const cfg = SUBJECTS_CONFIG[activeSubject];
  const theme = SUBJECT_THEMES[activeSubject];

  const [messages, setMessages] = useState({
    physics: [],
    chemistry: [],
    biology: []
  });

  const [activeTopic, setActiveTopic] = useState({
    physics: "Physics and Measurement",
    chemistry: "Some Basic Concepts in Chemistry",
    biology: "Cell Structure and Function"
  });
  const [conversationIds, setConversationIds] = useState({
    physics: null,
    chemistry: null,
    biology: null
  });

  const location = useLocation();
  const autoQueryHandled = useRef(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeSubject]);

  useEffect(() => {
    if (location.state?.autoQuery && !autoQueryHandled.current) {
      autoQueryHandled.current = true;
      const targetSub = location.state?.subject && SUBJECTS_CONFIG[location.state.subject.toLowerCase()]
        ? location.state.subject.toLowerCase()
        : activeSubject;
      if (targetSub !== activeSubject) {
        setActiveSubject(targetSub);
      }
      sendMessage(location.state.autoQuery, 'exhaustive', targetSub);
    }
  }, [location.state]);

  const switchSubject = (key) => {
    setActiveSubject(key);
    setChatInput('');
  };

  const handleSelectUnit = (unit) => {
    setShowAllUnitsModal(false);
    setShowUnitsCarousel(false);
    setShowQuickPrompts(false);
    setStudyDepth('exhaustive');
    setActiveTopic(prev => ({ ...prev, [activeSubject]: unit.title }));
    const subtopicsText = Array.isArray(unit.topics) && unit.topics.length > 0
      ? ` Cover ALL subtopics in this chapter: ${unit.topics.join(', ')}.`
      : '';
    const prompt = `Explain ${unit.title} (Unit ${unit.number} in NEET ${cfg.shortTitle}): Comprehensive Textbook Chapter Masterclass.${subtopicsText} Include complete explanations, 2+ high-resolution 3D vector diagrams/infographics, mathematical derivations, comparison tables, 4+ worked examples with step-by-step solved numericals, NEET high-yield traps, and practice MCQs.`;
    sendMessage(prompt, 'exhaustive', activeSubject);
  };

  const sendMessage = async (msgOverride, depthOverride, subjectOverride) => {
    const rawMsg = (msgOverride || chatInput).trim();
    if (!rawMsg || loading) return;
    const targetSub = subjectOverride || activeSubject;
    const targetCfg = SUBJECTS_CONFIG[targetSub] || cfg;
    const targetDepth = depthOverride || studyDepth;

    setChatInput('');
    setShowUnitsCarousel(false);
    setShowQuickPrompts(false);

    const lower = rawMsg.toLowerCase();
    const isFollowUp = lower.includes('more info') || lower.includes('more information') ||
      lower.includes('elaborate') || lower.includes('explain more') ||
      lower.includes('deep dive') || lower.includes('further') || lower === 'more' ||
      (lower.includes('why') && lower.length < 25);

    const currentTopicForSubject = activeTopic[targetSub] || `${targetCfg.shortTitle} Core Topics`;

    let userPromptToSend = rawMsg;
    if (isFollowUp) {
      userPromptToSend = `Provide comprehensive deeper information and exhaustive walkthrough on ${currentTopicForSubject}: Advanced microscopic mechanisms, mathematical derivations, hard solved NEET numericals, and full practice question bank with option-by-option explanations. (User request: "${rawMsg}")`;
    }

    setMessages(prev => ({
      ...prev,
      [targetSub]: [...(prev[targetSub] || []), { role: 'user', text: rawMsg }]
    }));
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const apiBase = import.meta.env.VITE_API_BASE_URL || '';
      const res = await fetch(`${apiBase}/api/rag/chat`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: userPromptToSend,
          conversation_id: conversationIds[targetSub],
          subject: targetCfg.shortTitle,
          depth: targetDepth,
          context: {
            exam: 'NEET (UG) 2026',
            subject: targetCfg.shortTitle,
            topic: currentTopicForSubject,
            depth: targetDepth,
            curriculum: 'NMC / NTA Official Syllabus'
          }
        })
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      const reply = data?.data?.answer || data?.answer || data?.response || data?.message;
      if (!reply) throw new Error('Empty response');

      if (data?.data?.conversation_id) {
        setConversationIds(prev => ({ ...prev, [targetSub]: data.data.conversation_id }));
      }

      const visualPayload = data?.data?.visual || data?.visual || null;
      setMessages(prev => ({
        ...prev,
        [targetSub]: [...(prev[targetSub] || []), { role: 'assistant', text: reply, visual: visualPayload, question: rawMsg }]
      }));
    } catch {
      const fallback = generateFallbackReply(rawMsg, targetCfg.shortTitle, currentTopicForSubject);
      setMessages(prev => ({
        ...prev,
        [targetSub]: [...(prev[targetSub] || []), { role: 'assistant', text: fallback }]
      }));
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages(prev => ({ ...prev, [activeSubject]: [] }));
    setConversationIds(prev => ({ ...prev, [activeSubject]: null }));
  };

  const currentMessages = messages[activeSubject] || [];

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-[calc(100vh-4.25rem)] py-2 px-3 sm:px-6">
      {/* ── Top Header Strip ── */}
      <div className="flex-shrink-0 space-y-2.5 pb-2.5 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Sparkles size={20} />
              </div>
              <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                NEET (UG) 2026 AI Study Assistant
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Dedicated 24/7 AI Mentor for Physics, Chemistry & Biology · Formulas, Concept Walkthroughs & NCERT Traps
            </p>
          </div>

          {/* Quick study suite shortcuts & Font Size Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Viewport Font Size Adjuster */}
            <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <span className="text-[10px] text-slate-400 dark:text-zinc-400 font-bold px-1.5">Size:</span>
              <button
                onClick={() => setTextSize('sm')}
                className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${textSize === 'sm' ? 'bg-white dark:bg-slate-700 text-emerald-500 shadow-xs' : 'text-slate-600 dark:text-zinc-400 hover:text-white'}`}
                title="Small text"
              >
                A-
              </button>
              <button
                onClick={() => setTextSize('base')}
                className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${textSize === 'base' ? 'bg-white dark:bg-slate-700 text-emerald-500 shadow-xs' : 'text-slate-600 dark:text-zinc-400 hover:text-white'}`}
                title="Default text (Bigger & Readable)"
              >
                A
              </button>
              <button
                onClick={() => setTextSize('lg')}
                className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${textSize === 'lg' ? 'bg-white dark:bg-slate-700 text-emerald-500 shadow-xs' : 'text-slate-600 dark:text-zinc-400 hover:text-white'}`}
                title="Extra Large text"
              >
                A+
              </button>
            </div>

            <button
              onClick={() => navigate('/courses/pdf-viewer')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-all cursor-pointer shadow-xs"
              title="Open Fullscreen PDF Study Material"
            >
              <BookOpen size={13} className="text-emerald-500" />
              <span className="hidden sm:inline">Material</span>
            </button>
            <button
              onClick={() => navigate('/courses/formulas')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-all cursor-pointer shadow-xs"
              title="Open Formula Sheets"
            >
              <Calculator size={13} className="text-teal-500" />
              <span className="hidden sm:inline">Formulas</span>
            </button>
            <button
              onClick={() => navigate('/courses/quiz')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-400 hover:bg-amber-300 transition-all cursor-pointer shadow-xs"
              title="Take Practice Quizzes"
            >
              <Trophy size={13} />
              <span>Quiz</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-all cursor-pointer shadow-xs"
              title="Print or Save Study Notes as PDF"
            >
              <Printer size={13} className="text-emerald-500" />
              <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>

        {/* ── Subject Switcher Tabs & Study Depth ── */}
        <div className="flex items-center justify-between gap-2 flex-wrap pt-0.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            {Object.entries(SUBJECTS_CONFIG).map(([key, s]) => {
              const isActive = activeSubject === key;
              const t = SUBJECT_THEMES[key];
              return (
                <button
                  key={key}
                  onClick={() => switchSubject(key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                    isActive
                      ? t.pill + ' shadow-md shadow-emerald-950/20'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-zinc-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <SubjectIcon id={key} size={13} />
                  <span>{s.shortTitle}</span>
                  <span className="text-[10px] font-mono opacity-80 hidden md:inline">({s.totalPages}p)</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Study Depth Selector */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-zinc-400 px-1 flex items-center gap-1">
                <Layers size={11} className="text-emerald-500" />
                <span className="hidden sm:inline">Depth:</span>
              </span>
              <button
                onClick={() => setStudyDepth('quick')}
                className={`px-2 py-1 rounded-lg text-[10.5px] font-semibold transition-all cursor-pointer ${
                  studyDepth === 'quick'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Quick 1-2 pages summary"
              >
                ⚡ Quick
              </button>
              <button
                onClick={() => setStudyDepth('comprehensive')}
                className={`px-2 py-1 rounded-lg text-[10.5px] font-semibold transition-all cursor-pointer ${
                  studyDepth === 'comprehensive'
                    ? 'bg-emerald-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Comprehensive 4-5 pages chapter guide with full derivations & 3D vector diagrams"
              >
                📘 4-5 Pgs
              </button>
              <button
                onClick={() => setStudyDepth('exhaustive')}
                className={`px-2 py-1 rounded-lg text-[10.5px] font-semibold transition-all cursor-pointer ${
                  studyDepth === 'exhaustive'
                    ? 'bg-teal-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Exhaustive 8-10 pages textbook masterclass with extensive numericals and practice questions"
              >
                📚 8-10 Pgs
              </button>
            </div>

            <button
              onClick={clearChat}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-white bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
              title="Reset Chat History"
            >
              <RotateCcw size={12} />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* ── Curriculum Units & Chapters (Collapsible Banner) ── */}
        <div className="space-y-1.5 pt-0.5">
          <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/70 border border-slate-200/90 dark:border-slate-700/80">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-zinc-200">
              <BookOpen size={13} className="text-emerald-500" />
              <span>{cfg.shortTitle} Curriculum ({cfg.units?.length || 0} Units)</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono hidden md:inline">
                Click any unit for full masterclass
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAllUnitsModal(true)}
                className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Grid size={11} />
                <span>Explore All {cfg.units?.length || 0} Units</span>
                <ChevronRight size={11} />
              </button>

              <button
                onClick={() => setShowUnitsCarousel(prev => !prev)}
                className="px-2 py-1 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 text-[11px] font-semibold text-slate-700 dark:text-zinc-200 flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                title={showUnitsCarousel ? "Hide Units Carousel (More space for answer)" : "Show Units Carousel"}
              >
                <span>{showUnitsCarousel ? 'Hide Carousel' : 'Show Carousel'}</span>
                {showUnitsCarousel ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
            </div>
          </div>

          {showUnitsCarousel && (
            <div className="overflow-x-auto pb-1.5 custom-scrollbar animate-fadeIn">
              <div className="flex gap-2.5 w-max">
                {(cfg.units || []).map((u) => (
                  <button
                    key={u.id || u.number}
                    onClick={() => handleSelectUnit(u)}
                    disabled={loading}
                    className="group flex-shrink-0 flex flex-col items-start p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 hover:shadow-md transition-all cursor-pointer text-left w-52 disabled:opacity-50"
                    title={`Generate total textbook material for Unit ${u.number}: ${u.title}`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Unit {u.number < 10 ? `0${u.number}` : u.number}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">p. {u.page}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {u.title}
                    </h4>
                    <p className="text-[10.5px] text-slate-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                      {u.topics}
                    </p>
                    <div className="mt-2 text-[10px] font-semibold text-emerald-500 flex items-center gap-1">
                      <BookOpenCheck size={11} />
                      <span>Generate Total Textbook</span>
                      <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── High-Yield Quick Prompts Chips ── */}
        {(currentMessages.length === 0 || showQuickPrompts) && (
          <div className="overflow-x-auto pb-0.5 custom-scrollbar animate-fadeIn">
            <div className="flex gap-2 w-max">
              {cfg.quickPrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(p)}
                  disabled={loading}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-[11.5px] font-medium text-slate-600 dark:text-zinc-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  <span>{p}</span>
                  <ChevronRight size={11} className="opacity-50" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Chat Messages Container (Maximized Height & Width) ── */}
      <div className="flex-1 overflow-y-auto space-y-4 py-3 pr-1 custom-scrollbar min-h-[300px]">
        {currentMessages.length === 0 && (
          <div className="h-full min-h-[220px] flex flex-col items-center justify-center text-center p-8 text-slate-400 dark:text-zinc-500">
            <div className={`w-14 h-14 rounded-2xl ${theme.bubble} flex items-center justify-center text-white mb-3 shadow-lg shadow-emerald-900/30`}>
              <Sparkles size={26} />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-zinc-100">
              {cfg.title} AI Tutor & Textbook Master
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 max-w-md mt-1.5">
              Click any of the {cfg.units?.length || 0} Curriculum Units above or type your topic below to generate complete chapter textbook materials with 3D diagrams and solved numericals.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => setShowUnitsCarousel(true)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen size={13} />
                <span>Browse {cfg.units?.length || 0} Units</span>
              </button>
              <button
                onClick={() => setShowAllUnitsModal(true)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-zinc-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Grid size={13} />
                <span>Search All Chapters</span>
              </button>
            </div>
          </div>
        )}

        {currentMessages.map((msg, i) => {
          const isUser = msg.role === 'user';
          return (
            <div key={i} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <div className={`flex-shrink-0 w-8 h-8 rounded-xl ${theme.bubble} flex items-center justify-center shadow-sm mt-1`}>
                  <Sparkles size={14} className="text-white" />
                </div>
              )}

              <div
                className={`w-full transition-all ${
                  isUser
                    ? 'bg-slate-900 dark:bg-emerald-600 text-white rounded-2xl rounded-br-sm px-4 py-3 max-w-[85%] text-sm'
                    : 'bg-white dark:bg-slate-800/95 text-slate-800 dark:text-zinc-100 border border-slate-200 dark:border-slate-700/80 rounded-2xl rounded-bl-sm p-4 sm:p-6 shadow-md max-w-full sm:max-w-[96%]'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-700/60 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] border border-emerald-500/20">
                        NEET UG 2026 Masterclass
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-zinc-400 font-mono hidden sm:inline">
                        {msg.text.split(/\s+/).length >= 1600
                          ? `~${Math.min(10, Math.max(4, Math.round(msg.text.split(/\s+/).length / 400)))} Pages (Exhaustive)`
                          : msg.text.split(/\s+/).length >= 800
                          ? `~4-5 Pages (Chapter Guide)`
                          : `${msg.text.split(/\s+/).length} words`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Big View / Fullscreen Reader Button */}
                      <button
                        onClick={() => setReaderModalMessage({ text: msg.text, title: cfg.shortTitle })}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm shadow-emerald-600/30 transition-all cursor-pointer hover:scale-105 active:scale-95"
                        title="Open Fullscreen Reader (Bigger view of total chapter)"
                      >
                        <Maximize2 size={13} />
                        <span>⛶ Bigger View / Fullscreen</span>
                      </button>

                      {/* Font Size Adjuster on Card */}
                      <div className="hidden sm:flex items-center gap-0.5 bg-slate-100 dark:bg-slate-900/90 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700/80 text-[10.5px]">
                        <button
                          onClick={() => setTextSize('sm')}
                          className={`px-1.5 py-0.5 rounded cursor-pointer ${textSize === 'sm' ? 'bg-white dark:bg-slate-700 font-bold text-emerald-500 shadow-2xs' : 'text-slate-500 hover:text-white'}`}
                          title="Small text"
                        >
                          A-
                        </button>
                        <button
                          onClick={() => setTextSize('base')}
                          className={`px-1.5 py-0.5 rounded cursor-pointer ${textSize === 'base' ? 'bg-white dark:bg-slate-700 font-bold text-emerald-500 shadow-2xs' : 'text-slate-500 hover:text-white'}`}
                          title="Medium text"
                        >
                          A
                        </button>
                        <button
                          onClick={() => setTextSize('lg')}
                          className={`px-1.5 py-0.5 rounded cursor-pointer ${textSize === 'lg' ? 'bg-white dark:bg-slate-700 font-bold text-emerald-500 shadow-2xs' : 'text-slate-500 hover:text-white'}`}
                          title="Large text"
                        >
                          A+
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <FormattedMessageContent text={msg.text} isUser={isUser} theme={theme} textSize={textSize} />

                {!isUser && (
                  <VisualExplanationCard
                    visual={msg.visual}
                    question={msg.question || currentMessages[i - 1]?.text || cfg.shortTitle}
                    answer={msg.text}
                    subject={cfg.shortTitle}
                    onVisualUpdate={(nextVisual) => {
                      setMessages(prev => ({
                        ...prev,
                        [activeSubject]: (prev[activeSubject] || []).map((m, mIdx) =>
                          mIdx === i ? { ...m, visual: nextVisual } : m
                        )
                      }));
                    }}
                  />
                )}

                {!isUser && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400 dark:text-zinc-400 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setReaderModalMessage({ text: msg.text, title: cfg.shortTitle })}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700/60 hover:bg-emerald-500/10 text-slate-700 dark:text-zinc-200 hover:text-emerald-500 border border-slate-200 dark:border-slate-600 transition-all cursor-pointer font-semibold text-xs"
                      >
                        <Maximize2 size={13} className="text-emerald-500" />
                        <span>Fullscreen Reader</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigator.clipboard.writeText(msg.text)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer text-xs"
                        title="Copy full chapter text"
                      >
                        <Copy size={12} />
                        <span>Copy</span>
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer text-xs"
                        title="Print or export as PDF"
                      >
                        <Printer size={12} />
                        <span>Print</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center shadow-sm mt-1">
                  <MessageSquare size={14} className="text-slate-600 dark:text-zinc-300" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 justify-start">
            <div className={`flex-shrink-0 w-8 h-8 rounded-xl ${theme.bubble} flex items-center justify-center mt-1`}>
              <Sparkles size={14} className="text-white" />
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2.5 shadow-sm">
              <Loader2 size={16} className="animate-spin text-emerald-500" />
              <span className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-medium">
                Synthesizing comprehensive chapter masterclass & 3D vector schematics…
              </span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* ── Input Bar ── */}
      <div className="flex-shrink-0 pt-2 pb-1 border-t border-slate-200 dark:border-slate-800">
        <div className="flex gap-2 items-end bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-2 focus-within:border-emerald-500 transition-colors">
          <textarea
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder={`Ask anything about NEET ${theme.name} (derivations, traps, formulas, numericals)…`}
            rows={1}
            className="flex-1 resize-none bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none leading-relaxed max-h-28 py-1.5 px-1.5"
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !chatInput.trim()}
            className={`flex-shrink-0 p-2.5 rounded-xl transition-all cursor-pointer ${
              chatInput.trim() && !loading
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 active:scale-95'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-zinc-500 cursor-not-allowed'
            }`}
            title="Send Message"
            aria-label="Send Message"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-zinc-500 px-2 mt-1">
          <span>Enter to send · Shift+Enter for new line</span>
          <span>Aligned with NMC/NTA NEET (UG) 2026 Standards</span>
        </div>
      </div>

      {/* ── Fullscreen Distortion-Free Textbook Reader Modal ── */}
      {readerModalMessage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-5xl h-[94vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Top Controls Toolbar */}
            <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <BookOpen size={18} />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{cfg.title} Textbook Masterclass</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Fullscreen Reader Mode
                    </span>
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                    Distraction-free high-resolution view of definitions, derivations, 3D diagrams & practice MCQs
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Font Size Adjuster in Reader */}
                <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                  <button
                    onClick={() => setTextSize('sm')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${textSize === 'sm' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-zinc-400 hover:text-white'}`}
                    title="Compact Font Size"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setTextSize('base')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${textSize === 'base' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-zinc-400 hover:text-white'}`}
                    title="Standard Font Size"
                  >
                    A
                  </button>
                  <button
                    onClick={() => setTextSize('lg')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${textSize === 'lg' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-zinc-400 hover:text-white'}`}
                    title="Large Font Size"
                  >
                    A+
                  </button>
                </div>

                <button
                  onClick={() => navigator.clipboard.writeText(readerModalMessage.text)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-zinc-200 hover:border-emerald-500 transition-all cursor-pointer shadow-xs"
                  title="Copy entire text"
                >
                  <Copy size={13} />
                  <span>Copy</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-zinc-200 hover:border-emerald-500 transition-all cursor-pointer shadow-xs"
                  title="Print this chapter notes"
                >
                  <Printer size={13} />
                  <span className="hidden sm:inline">Print</span>
                </button>

                <button
                  onClick={() => setReaderModalMessage(null)}
                  className="p-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-zinc-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Close Fullscreen View (Esc)"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Reader Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar bg-slate-50/50 dark:bg-slate-900/50">
              <div className="max-w-4xl mx-auto bg-white dark:bg-slate-950/90 p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl">
                <FormattedMessageContent
                  text={readerModalMessage.text}
                  isUser={false}
                  theme={theme}
                  textSize={textSize}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── All Units Modal ── */}
      {showAllUnitsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-500" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {cfg.shortTitle} Curriculum Units ({cfg.units?.length || 0} Units)
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                    Click any unit to immediately generate full definitions, 3D diagrams, formulas, and textbook material
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAllUnitsModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search units, topics or chapters (e.g. Kinematics, Thermodynamics, Genetics)..."
                  value={unitSearchQuery}
                  onChange={(e) => setUnitSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="p-4 overflow-y-auto custom-scrollbar flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(cfg.units || [])
                .filter((u) => {
                  if (!unitSearchQuery.trim()) return true;
                  const q = unitSearchQuery.toLowerCase();
                  return (
                    u.title.toLowerCase().includes(q) ||
                    (u.topics && u.topics.toLowerCase().includes(q)) ||
                    `unit ${u.number}`.includes(q)
                  );
                })
                .map((u) => (
                  <button
                    key={u.id || u.number}
                    onClick={() => handleSelectUnit(u)}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 transition-all text-left flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Unit {u.number < 10 ? `0${u.number}` : u.number}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Guide p. {u.page}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {u.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1 leading-relaxed">
                        {u.topics}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <span>Generate Full Material</span>
                      <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
