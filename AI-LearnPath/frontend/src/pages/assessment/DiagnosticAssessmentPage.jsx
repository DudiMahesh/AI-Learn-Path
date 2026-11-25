import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight, AlertCircle, CheckCircle, Briefcase, Sparkles, Check } from 'lucide-react';
import { assessmentService } from '../../services/assessmentService';
import { learningPathService } from '../../services/learningPathService';
import api from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/common/Modal';
import { shuffleArray } from '../../utils/quizRandomizer';
import { getQuestionExplanation } from '../../utils/assessmentExplanationEngine';

const CAREERS = [
  'NEET (UG) Medical Aspirant',
  'MBBS / BDS Candidate',
  'Pre-Medical Science Student',
];

const FALLBACK_QUESTIONS = [
  {
    id: 1,
    question_text: "What is the dimensional formula of Universal Gravitational Constant (G)?",
    options: {
      A: "[M⁻¹ L³ T⁻²]",
      B: "[M¹ L² T⁻¹]",
      C: "[M⁰ L² T⁻²]",
      D: "[M⁻² L² T⁻¹]"
    },
    correct_option: "A"
  },
  {
    id: 2,
    question_text: "For a projectile launched at an angle θ with speed u, what angle yields maximum horizontal range?",
    options: {
      A: "30°",
      B: "45°",
      C: "60°",
      D: "90°"
    },
    correct_option: "B"
  },
  {
    id: 3,
    question_text: "According to First Law of Thermodynamics, dQ = dU + dW. For an isothermal process of an ideal gas, what is dU?",
    options: {
      A: "Positive",
      B: "Negative",
      C: "0",
      D: "Depends on volume"
    },
    correct_option: "C"
  },
  {
    id: 4,
    question_text: "What is the hybridisation of xenon in XeF4 and its molecular geometry?",
    options: {
      A: "sp³d, T-shaped",
      B: "sp³d², Square Planar",
      C: "sp³d², Octahedral",
      D: "sp³, Tetrahedral"
    },
    correct_option: "B"
  },
  {
    id: 5,
    question_text: "Which of the following elements has the highest negative electron gain enthalpy?",
    options: {
      A: "Fluorine (F)",
      B: "Chlorine (Cl)",
      C: "Bromine (Br)",
      D: "Iodine (I)"
    },
    correct_option: "B"
  },
  {
    id: 6,
    question_text: "In an SN1 nucleophilic substitution reaction of alkyl halides, what intermediate is formed?",
    options: {
      A: "Carbanion",
      B: "Planar Carbocation",
      C: "Free Radical",
      D: "Carbene"
    },
    correct_option: "B"
  },
  {
    id: 7,
    question_text: "What is the relation between de Broglie wavelength λ and kinetic energy E for a particle of mass m?",
    options: {
      A: "λ = h / (2mE)",
      B: "λ = h / √(2mE)",
      C: "λ = √(2mE) / h",
      D: "λ = h / (mE)"
    },
    correct_option: "B"
  },
  {
    id: 8,
    question_text: "Which gas law states that at equal temperature and pressure, equal volumes of gases contain equal numbers of molecules?",
    options: {
      A: "Avogadro's Law",
      B: "Boyle's Law",
      C: "Charles's Law",
      D: "Graham's Law"
    },
    correct_option: "A"
  },
  {
    id: 9,
    question_text: "What is the oxidation state of Chromium in Potassium Dichromate (K2Cr2O7)?",
    options: {
      A: "+3",
      B: "+4",
      C: "+6",
      D: "+7"
    },
    correct_option: "C"
  },
  {
    id: 10,
    question_text: "What is the SI unit of Magnetic Flux?",
    options: {
      A: "Tesla (T)",
      B: "Weber (Wb)",
      C: "Henry (H)",
      D: "Gauss (G)"
    },
    correct_option: "B"
  }
];

export default function DiagnosticAssessmentPage() {
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [attemptId, setAttemptId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [needsCareer, setNeedsCareer] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState('');
  const [savingCareer, setSavingCareer] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    loadAssessment();
    return () => clearInterval(timerRef.current);
  }, []);

  const loadAssessment = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await assessmentService.getDiagnosticAssessment();
      const data = res?.data?.data || res?.data || res;
      setAssessment({
        ...data,
        title: data?.title || "NEET (UG) 2026 Diagnostic Assessment",
        description: data?.description || "Benchmark your foundational Physics and Chemistry concepts to calibrate your high-yield NEET preparation path."
      });

      const qList = (data.questions && data.questions.length > 0)
        ? data.questions 
        : FALLBACK_QUESTIONS;
      setQuestions(shuffleArray(qList));
      setTimeLeft((data.time_limit_minutes || 20) * 60);

      try {
        const startRes = await assessmentService.startDiagnostic();
        const startData = startRes?.data?.data || startRes?.data || startRes;
        setAttemptId(startData.attempt_id || 1);
      } catch {
        setAttemptId(1);
      }
      startTimer();
    } catch (e) {
      const msg = e.response?.data?.message || '';
      if (msg.toLowerCase().includes('career') || msg.toLowerCase().includes('no career')) {
        setNeedsCareer(true);
      } else {
        // Use fallback questions with dynamic shuffle so questions change every time
        setQuestions(shuffleArray(FALLBACK_QUESTIONS));
        setAssessment({ 
          title: "NEET (UG) 2026 Diagnostic Assessment",
          description: "Benchmark your foundational Physics and Chemistry concepts to calibrate your high-yield NEET preparation path."
        });
        setAttemptId(1);
        startTimer();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCareer = async () => {
    if (!selectedCareer) return;
    setSavingCareer(true);
    try {
      await api.put('/api/profile', { career: selectedCareer });
      setNeedsCareer(false);
      await loadAssessment();
    } catch {
      setNeedsCareer(false);
      setQuestions(FALLBACK_QUESTIONS);
      startTimer();
    } finally {
      setSavingCareer(false);
    }
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { 
          clearInterval(timerRef.current); 
          handleSubmit(true); 
          return 0; 
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const getOptions = (q) => {
    if (q.options && typeof q.options === 'object') return q.options;
    return {
      A: q.option_a || q.optionA || '',
      B: q.option_b || q.optionB || '',
      C: q.option_c || q.optionC || '',
      D: q.option_d || q.optionD || '',
    };
  };

  const getQuestionText = (q) => q.text || q.question_text || q.question || '';

  const handleSelect = (option) => {
    setAnswers(prev => ({ ...prev, [questions[currentIndex].id]: option }));
  };

  const handleSubmit = async (auto = false) => {
    setShowConfirm(false);
    setSubmitting(true);
    clearInterval(timerRef.current);
    try {
      const formattedAnswers = Object.entries(answers).map(([qid, opt]) => ({
        question_id: parseInt(qid), selected_option: opt
      }));
      const res = await assessmentService.submitDiagnostic({ attempt_id: attemptId || 1, answers: formattedAnswers });
      const result = res?.data?.data || res?.data || res;
      try { await learningPathService.generatePath(); } catch {}
      navigate('/assessments/results', { state: { result: result || { score: 80, level: 'intermediate' } } });
    } catch (e) {
      // Fallback local results
      const total = questions.length;
      let correctCount = 0;
      let attemptedCount = 0;
      const reviewQuestions = questions.map((q, idx) => {
        const selected = answers[q.id];
        const isAttempted = selected !== undefined && selected !== null && String(selected).trim() !== "";
        const correctOpt = q.correct_option || q.correct || "A";
        const isCorrect = isAttempted && String(selected).trim().toUpperCase() === String(correctOpt).trim().toUpperCase();
        if (isAttempted) attemptedCount++;
        if (isCorrect) correctCount++;
        const exp = getQuestionExplanation(q, isAttempted ? selected : null);
        return {
          id: q.id || idx + 1,
          question_id: q.id || idx + 1,
          question_text: getQuestionText(q),
          options: getOptions(q),
          selected_option: isAttempted ? selected : null,
          correct_option: correctOpt,
          is_correct: isCorrect,
          status: isCorrect ? 'correct' : (isAttempted ? 'incorrect' : 'unanswered'),
          explanation: exp.whyCorrect,
          why_correct: exp.whyCorrect,
          why_wrong: exp.whyWrong
        };
      });

      const score = total > 0 ? Math.round((correctCount / total) * 100) : 0;
      const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
      const level = score >= 75 ? 'advanced' : (score >= 50 ? 'intermediate' : 'beginner');

      navigate('/assessments/results', { 
        state: { 
          result: { 
            score, 
            total_questions: total,
            attempted_count: attemptedCount,
            correct_answers: correctCount,
            incorrect_answers: attemptedCount - correctCount,
            unanswered_count: total - attemptedCount,
            accuracy,
            level,
            skill_scores: { "Core Foundations": score, "Applied Concepts": Math.max(score - 5, 0), "Problem Solving": Math.min(score + 5, 100) },
            profile: { label: score >= 75 ? "Advanced Specialist" : (score >= 50 ? "Skill Builder" : "Foundations Learner"), description: "Your customized learning path has been updated to focus on targeted skill masteries and practice modules." },
            review_questions: reviewQuestions
          } 
        } 
      });
    } finally {
      setSubmitting(false);
    }
  };


  // ── Career picker screen ──────────────────────────────────────────────────
  if (needsCareer) return (
    <div className="max-w-lg mx-auto mt-16 px-4">
      <div className="bg-zinc-900 rounded-3xl shadow-xl border border-zinc-800 p-8 text-center text-white">
        <div className="w-16 h-16 bg-emerald-950/60 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Briefcase size={32} className="text-emerald-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Select Your Target Career</h2>
        <p className="text-zinc-400 text-sm mb-6">
          Choose your career goal to tailor your diagnostic assessment questions.
        </p>
        <div className="grid grid-cols-1 gap-3 mb-6 text-left">
          {CAREERS.map(c => (
            <button 
              key={c} 
              onClick={() => setSelectedCareer(c)}
              className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                selectedCareer === c
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                  : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <button 
          onClick={handleSaveCareer} 
          disabled={!selectedCareer || savingCareer}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 disabled:opacity-50 transition-all"
        >
          {savingCareer ? 'Saving...' : 'Start Assessment →'}
        </button>
      </div>
    </div>
  );

  if (loading) return <div className="flex items-center justify-center h-screen bg-zinc-950"><LoadingSpinner /></div>;

  const q = questions[currentIndex] || FALLBACK_QUESTIONS[0];
  const opts = getOptions(q);
  const answered = Object.keys(answers).length;
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const timerUrgent = timeLeft < 300;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                Diagnostic Assessment
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white mt-1">
              {assessment?.title || 'Skill Profile Diagnostic'}
            </h1>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-base sm:text-lg border ${
            timerUrgent ? 'bg-red-950/50 border-red-500/40 text-red-400 animate-pulse' : 'bg-zinc-950 border-zinc-800 text-zinc-200'
          }`}>
            <Clock size={18} className={timerUrgent ? "text-red-400" : "text-emerald-400"} />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl space-y-2">
          <div className="flex justify-between text-xs text-zinc-400 font-medium">
            <span>Answered: <strong className="text-white">{answered}</strong> of {questions.length}</span>
            <span>Question {currentIndex + 1} of {questions.length}</span>
          </div>
          <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-zinc-800">
            <div 
              className="h-2 rounded-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
              Question {currentIndex + 1}
            </span>
            {answers[q.id] && (
              <span className="text-emerald-400 text-xs flex items-center gap-1 font-semibold">
                <CheckCircle size={14} /> Answered
              </span>
            )}
          </div>

          <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            {getQuestionText(q)}
          </h2>

          <div className="space-y-3">
            {Object.entries(opts).map(([key, text]) => {
              if (!text) return null;
              const selected = answers[q.id] === key;
              return (
                <button 
                  key={key} 
                  onClick={() => handleSelect(key)}
                  className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all ${
                    selected 
                      ? 'border-emerald-500 bg-emerald-950/40 text-white shadow-sm' 
                      : 'border-zinc-800 bg-zinc-950/80 hover:border-zinc-700 text-zinc-300'
                  }`}
                >
                  <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
                    selected ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {key}
                  </span>
                  <span className="text-xs sm:text-sm leading-relaxed pt-0.5">{text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between gap-4">
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
              <span>Next</span> <ChevronRight size={16} />
            </button>
          ) : (
            <button 
              onClick={() => setShowConfirm(true)} 
              disabled={submitting}
              className="flex items-center gap-2 px-7 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/30 disabled:opacity-60 transition-all"
            >
              {submitting ? 'Submitting...' : 'Submit Assessment'}
            </button>
          )}
        </div>

        {/* Question dots */}
        <div className="flex flex-wrap gap-2 justify-center pt-4">
          {questions.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentIndex(i)}
              className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all ${
                i === currentIndex ? 'bg-emerald-600 text-white shadow-md' :
                answers[questions[i]?.id] ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40' :
                'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:bg-zinc-800'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Confirm Modal */}
      <Modal 
        isOpen={showConfirm} 
        onClose={() => setShowConfirm(false)} 
        title="Submit Assessment?"
        footer={
          <div className="flex gap-3">
            <button onClick={() => setShowConfirm(false)} className="flex-1 py-2.5 border border-zinc-700 bg-zinc-800 rounded-xl text-xs font-semibold text-zinc-300 hover:bg-zinc-700">Cancel</button>
            <button onClick={() => handleSubmit(false)} className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md">Submit Assessment</button>
          </div>
        }
      >
        <div className="text-center py-2 space-y-3">
          <div className="w-14 h-14 bg-emerald-950/60 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle size={28} />
          </div>
          <p className="text-zinc-200 text-sm">
            You've answered <strong className="text-emerald-400">{answered}</strong> of <strong className="text-emerald-400">{questions.length}</strong> questions.
          </p>
          {answered < questions.length && (
            <p className="text-xs text-amber-400 bg-amber-950/40 border border-amber-500/30 rounded-xl p-3">
              {questions.length - answered} questions are unanswered and will be scored accordingly.
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
}
