/**
 * Viva Demonstration Preset Profiles
 * Realistic student personas for MCA final year viva presentation.
 * Demonstrates how ML classification (Random Forest) and K-Means persona clustering
 * dynamically adapt the learning path DAG and recommendations.
 */

export const VIVA_DEMO_PROFILES = {
  foundations: {
    id: 'demo_foundations',
    name: 'Aarav Sharma (Foundations Learner)',
    badge: 'Struggling Aspirant',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    description: 'Demonstrates low scores, weak topic detection, automated prerequisite locking, and remedial revision injection.',
    diagnostic_completed: true,
    overall_progress: 18.0,
    completed_topics: 2,
    total_topics: 11,
    skill_score: 39.5, // %
    study_hours_this_week: 1.8,
    daily_study_time_avg: 1.8,
    current_streak: 1,
    career_name: 'NEET (UG) 2026 Aspirant',
    career: 'NEET (UG) 2026 Aspirant',
    raw_scores: {
      physics: 55, // out of 180
      chemistry: 60, // out of 180
      biology: 170, // out of 360
      total_neet_score: 285 // out of 720
    },
    ml_prediction: {
      tier: 'Foundations Learner',
      cluster_id: 0,
      archetype_name: 'Foundations Learner',
      confidence: 0.94,
      cluster_description: 'Requires foundational reinforcement in core physics mechanics and chemical bonding before advancing to complex multi-concept numerical problems.'
    },
    predicted_rank: {
      percentile: 62.4,
      air_min: 310000,
      air_max: 360000,
      college_tier: 'Qualifying Foundation Tier',
      college_advice: 'Focus on NCERT direct biology questions and basic physics formulas to cross the 500+ mark cutoff.'
    },
    weak_areas: [
      { subject: 'Physics', topic: 'Rotational Motion & Inertia', score: '28%', status: 'Critical Deficit' },
      { subject: 'Chemistry', topic: 'Thermodynamics & Equilibrium', score: '32%', status: 'Needs Review' },
      { subject: 'Biology', topic: 'Molecular Basis of Inheritance', score: '44%', status: 'Remediation Injected' }
    ],
    learning_path_items: [
      { id: 'item_1', title: 'Units, Dimensions & Errors', subject: 'Physics', status: 'completed', score: 80 },
      { id: 'item_2', title: 'Cell: The Unit of Life', subject: 'Biology', status: 'completed', score: 75 },
      { id: 'item_3', title: 'Remedial: Basic Vectors & Trigonometry', subject: 'Physics', status: 'in_progress', isRemedial: true },
      { id: 'item_4', title: 'Kinematics: 1D & 2D Motion', subject: 'Physics', status: 'pending', locked: true, reason: 'Pending prerequisite remediation' },
      { id: 'item_5', title: 'Chemical Bonding & Hybridization', subject: 'Chemistry', status: 'pending', locked: true, reason: 'Pending prerequisite remediation' }
    ]
  },

  advanced: {
    id: 'demo_advanced',
    name: 'Priya Patel (Advanced Specialist)',
    badge: 'Top Tier Aspirant',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    description: 'Demonstrates high scores, fast-track unlocks, top All India Rank (AIR) prediction, and AIIMS cutoff eligibility.',
    diagnostic_completed: true,
    overall_progress: 76.0,
    completed_topics: 18,
    total_topics: 24,
    skill_score: 91.0, // %
    study_hours_this_week: 5.6,
    daily_study_time_avg: 5.6,
    current_streak: 14,
    career_name: 'NEET (UG) 2026 Aspirant',
    career: 'NEET (UG) 2026 Aspirant',
    raw_scores: {
      physics: 165, // out of 180
      chemistry: 160, // out of 180
      biology: 330, // out of 360
      total_neet_score: 655 // out of 720
    },
    ml_prediction: {
      tier: 'Advanced Specialist',
      cluster_id: 2,
      archetype_name: 'Advanced Specialist',
      confidence: 0.98,
      cluster_description: 'Exhibits high conceptual velocity and strong problem-solving precision. Cleared for advanced mock simulation exams.'
    },
    predicted_rank: {
      percentile: 99.42,
      air_min: 4200,
      air_max: 6500,
      college_tier: 'Premier Government Medical Colleges (GMC / Central Institutes)',
      college_advice: 'Eligible for Top State GMCs (KGMU, Seth GS, Madras Medical College) and strong contender for peripheral AIIMS.'
    },
    weak_areas: [
      { subject: 'Physics', topic: 'Semiconductors & Logic Gates', score: '82%', status: 'Minor Polish' }
    ],
    learning_path_items: [
      { id: 'item_1', title: 'Mechanics Mastery & Collision Dynamics', subject: 'Physics', status: 'completed', score: 95 },
      { id: 'item_2', title: 'Organic Reaction Mechanisms (SN1/SN2)', subject: 'Chemistry', status: 'completed', score: 92 },
      { id: 'item_3', title: 'Genetics, Evolution & Biotechnology', subject: 'Biology', status: 'completed', score: 96 },
      { id: 'item_4', title: 'Electrodynamics & Magnetism', subject: 'Physics', status: 'in_progress', score: 88 },
      { id: 'item_5', title: 'Full Syllabus Grand Mock Exam #1', subject: 'All', status: 'pending', locked: false }
    ]
  }
};

