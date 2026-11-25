import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Trophy, Zap, FlaskConical, Dna,
  CheckCircle2, X, RotateCcw, ChevronRight, Sparkles, RefreshCw, Layers
} from 'lucide-react';
import { SUBJECTS_CONFIG } from '../../data/neetCurriculumData';
import {
  PHYSICS_50_QUESTIONS,
  CHEMISTRY_50_QUESTIONS,
  BIOLOGY_50_QUESTIONS
} from '../../data/neet50QuestionBanks';
import { generateRandomQuizBatch } from '../../utils/quizRandomizer';
import { getQuestionExplanation } from '../../utils/assessmentExplanationEngine';
import { renderInlineFormatted } from '../../utils/mathUtils';

const SubjectIcon = ({ id, size = 18 }) => {
  if (id === 'physics')   return <Zap size={size} />;
  if (id === 'chemistry') return <FlaskConical size={size} />;
  return <Dna size={size} />;
};

const SUBJECT_COLORS = {
  physics:   { pill: 'bg-emerald-600 text-white', border: 'border-emerald-500/40', accent: 'text-emerald-400', bg: 'bg-emerald-500/10', active: 'bg-emerald-600 text-white border-emerald-500', shadow: 'shadow-emerald-600/20' },
  chemistry: { pill: 'bg-teal-600 text-white',    border: 'border-teal-500/40',    accent: 'text-teal-400',    bg: 'bg-teal-500/10',    active: 'bg-teal-600 text-white border-teal-500',    shadow: 'shadow-teal-600/20'    },
  biology:   { pill: 'bg-green-600 text-white',   border: 'border-green-500/40',   accent: 'text-green-400',   bg: 'bg-green-500/10',   active: 'bg-green-600 text-white border-green-500',   shadow: 'shadow-green-600/20'   },
};

const SUBJECT_POOLS = {
  physics: PHYSICS_50_QUESTIONS,
  chemistry: CHEMISTRY_50_QUESTIONS,
  biology: BIOLOGY_50_QUESTIONS
};

export default function NEETQuizPage() {
  const navigate = useNavigate();
  const [activeSubject, setActiveSubject] = useState('physics');
  const [questionCount, setQuestionCount] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const cfg = SUBJECTS_CONFIG[activeSubject];
  const colors = SUBJECT_COLORS[activeSubject];

  // Load a brand new random set of questions
  const loadRandomQuestions = (subject = activeSubject, count = questionCount) => {
    const pool = SUBJECT_POOLS[subject] || cfg.sampleQuiz;
    const batch = generateRandomQuizBatch(pool, count);
    setQuestions(batch);
    setQuizAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  useEffect(() => {
    loadRandomQuestions(activeSubject, questionCount);
  }, [activeSubject, questionCount]);

  const switchSubject = (key) => {
    setActiveSubject(key);
  };

  const submitQuiz = () => {
    let s = 0;
    questions.forEach((q, i) => {
      if (quizAnswers[i] === q.correctIndex) s++;
    });
    setScore(s);
    setSubmitted(true);
  };

  const resetSameQuiz = () => {
    setQuizAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const answeredCount = Object.keys(quizAnswers).length;
  const total = questions.length || questionCount;
  const scorePercent = total > 0 ? Math.round((score / total) * 100) : 0;
  const currentPoolSize = (SUBJECT_POOLS[activeSubject] || []).length;

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/courses')}
            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowLeft size={15} /> Courses
          </button>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Trophy size={18} className="text-amber-500" />
              <h1 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">Dynamic Practice MCQ Quiz</h1>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Randomized every attempt from {currentPoolSize}+ authentic NEET questions with instant solution explanations
            </p>
          </div>
        </div>

        {/* Generate New Question Set Button */}
        <button
          onClick={() => loadRandomQuestions(activeSubject, questionCount)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer shadow-sm self-start sm:self-auto"
          title="Shuffles and draws a completely different random set of questions"
        >
          <RefreshCw size={13} />
          <span>New Random Questions</span>
        </button>
      </div>

      {/* Controls: Subject Switcher & Question Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Subject Switcher */}
        <div className="flex gap-2 flex-wrap">
          {Object.entries(SUBJECTS_CONFIG).map(([key, s]) => (
            <button
              key={key}
              onClick={() => switchSubject(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                activeSubject === key
                  ? SUBJECT_COLORS[key].pill + ' shadow-lg'
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              }`}
            >
              <SubjectIcon id={key} size={15} />
              {s.shortTitle}
            </button>
          ))}
        </div>

        {/* Question Count Selector */}
        <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 self-start sm:self-auto text-xs font-bold text-zinc-500">
          <span className="text-[11px] px-2 text-zinc-400 flex items-center gap-1">
            <Layers size={12} /> Set Size:
          </span>
          {[5, 10, 20].map((count) => (
            <button
              key={count}
              onClick={() => setQuestionCount(count)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                questionCount === count
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-black'
                  : 'hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              {count} Qs
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar (before submit) */}
      {!submitted && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 flex items-center gap-4 shadow-sm">
          <div className="flex-1">
            <div className="flex justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5">
              <span>Quiz Progress (Live Shuffle Active)</span>
              <span>{answeredCount} / {total} answered</span>
            </div>
            <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${(answeredCount / total) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Score banner (after submit) */}
      {submitted && (
        <div className={`rounded-2xl border p-6 text-center shadow-lg ${score >= total * 0.8 ? 'border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/20' : score >= total * 0.5 ? 'border-amber-500/40 bg-amber-50 dark:bg-amber-950/20' : 'border-red-500/40 bg-red-50 dark:bg-red-950/20'}`}>
          <Trophy size={40} className={`mx-auto mb-2 ${score >= total * 0.8 ? 'text-amber-400' : score >= total * 0.5 ? 'text-amber-500' : 'text-zinc-400'}`} />
          <p className="text-4xl font-black text-zinc-900 dark:text-zinc-100 mb-1">{score}/{total}</p>
          <p className="text-lg font-bold text-zinc-700 dark:text-zinc-300 mb-1">{scorePercent}%</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            {score === total ? '🎉 Perfect Score! Outstanding mastery of this topic!' : score >= total * 0.6 ? '👍 Good performance! Check the detailed solutions below.' : '📚 Keep practicing! Tap "New Random Questions" below to test another batch.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <button
              onClick={() => loadRandomQuestions(activeSubject, questionCount)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-md"
            >
              <RefreshCw size={14} /> Generate New Random Questions
            </button>
            <button
              onClick={resetSameQuiz}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 transition-colors"
            >
              <RotateCcw size={14} /> Retry Same Set
            </button>
          </div>
        </div>
      )}

      {/* Questions list */}
      <div className="space-y-5">
        {questions.map((q, qi) => {
          const answered = quizAnswers[qi];
          const isCorrect = answered === q.correctIndex;

          return (
            <div
              key={q.id || qi}
              className={`bg-white dark:bg-zinc-900 rounded-2xl border shadow-sm overflow-hidden transition-all ${
                submitted
                  ? isCorrect ? 'border-emerald-400/60' : 'border-red-400/40'
                  : answered !== undefined ? 'border-emerald-200 dark:border-emerald-900/60' : 'border-zinc-200 dark:border-zinc-800'
              }`}
            >
              {/* Question Text */}
              <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-start gap-3">
                  <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${colors.bg} ${colors.accent}`}>
                    {qi + 1}
                  </span>
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-relaxed">
                    {renderInlineFormatted(q.text)}
                  </p>
                </div>
              </div>

              {/* Options */}
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, oi) => {
                  let optClass = 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20';

                  if (submitted) {
                    if (oi === q.correctIndex) {
                      optClass = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                    } else if (oi === answered && !isCorrect) {
                      optClass = 'bg-red-50 dark:bg-red-950/30 border-red-400 text-red-700 dark:text-red-300 line-through';
                    } else {
                      optClass = 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500';
                    }
                  } else if (answered === oi) {
                    optClass = `${colors.active} border font-bold ${colors.shadow}`;
                  }

                  return (
                    <button
                      key={oi}
                      disabled={submitted}
                      onClick={() => !submitted && setQuizAnswers(a => ({ ...a, [qi]: oi }))}
                      className={`w-full text-left flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-sm transition-all ${optClass} ${!submitted ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      {submitted ? (
                        oi === q.correctIndex
                          ? <CheckCircle2 size={14} className="flex-shrink-0 text-emerald-500" />
                          : oi === answered && !isCorrect
                          ? <X size={14} className="flex-shrink-0 text-red-500" />
                          : <span className="w-3.5 h-3.5 flex-shrink-0" />
                      ) : (
                        <span className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center text-[11px] font-black border ${answered === oi ? 'border-transparent bg-white/20 text-white' : 'border-zinc-300 dark:border-zinc-600 text-zinc-400'}`}>
                          {String.fromCharCode(65 + oi)}
                        </span>
                      )}
                      <span>{renderInlineFormatted(opt)}</span>
                    </button>
                  );
                })}
              </div>

              {/* Solution Explanation (after submit) */}
              {submitted && (() => {
                const selectedLetter = answered !== undefined ? String.fromCharCode(65 + answered) : null;
                const correctLetter = String.fromCharCode(65 + q.correctIndex);
                const exp = getQuestionExplanation(q, selectedLetter);
                return (
                  <div className={`px-5 py-4 border-t text-xs leading-relaxed space-y-3 ${
                    isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200'
                      : 'bg-zinc-50 dark:bg-zinc-950/40 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200'
                  }`}>
                    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                        <span>{isCorrect ? '✅' : '💡'}</span>
                        <span>Exhaustive Solution & Concept Breakdown:</span>
                      </div>
                      <span className="text-[10.5px] font-mono text-zinc-400">NMC/NTA NEET 2026</span>
                    </div>

                    {!isCorrect && answered !== undefined && exp.whyWrong && (
                      <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-500/30 rounded-xl p-3.5 text-red-900 dark:text-red-200">
                        <strong className="block text-red-700 dark:text-red-400 font-bold mb-1">
                          ❌ Why Your Answer (Option {selectedLetter}) is Wrong:
                        </strong>
                        <p className="whitespace-pre-line leading-relaxed">{exp.whyWrong}</p>
                      </div>
                    )}

                    <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 rounded-xl p-3.5 text-emerald-950 dark:text-emerald-200">
                      <strong className="block text-emerald-700 dark:text-emerald-400 font-bold mb-1">
                        ✅ Why Option {correctLetter} is Correct:
                      </strong>
                      <p className="whitespace-pre-line leading-relaxed">{exp.whyCorrect}</p>
                    </div>

                    {exp.derivationSteps && exp.derivationSteps.length > 0 && (
                      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 space-y-1.5">
                        <strong className="block text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                          Step-by-Step Derivation:
                        </strong>
                        {exp.derivationSteps.map((step, sIdx) => (
                          <div key={sIdx} className="text-zinc-600 dark:text-zinc-300 flex items-start gap-2 bg-zinc-50 dark:bg-zinc-950 p-2 rounded">
                            <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                              {sIdx + 1}
                            </span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {exp.neetTrapAlert && (
                      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/20 rounded-xl p-2.5 text-amber-900 dark:text-amber-300 text-[11.5px]">
                        ⚠️ {exp.neetTrapAlert}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                      {exp.keyTakeaway && (
                        <span className="text-[11px] text-zinc-600 dark:text-zinc-400">
                          📌 {exp.keyTakeaway}
                        </span>
                      )}
                      <button
                        onClick={() => {
                          navigate('/courses/ai-tutor', {
                            state: {
                              subject: activeSubject,
                              autoQuery: `Explain in depth with complete mathematical derivation and 3D schematic: "${q.text}"`
                            }
                          });
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[11px] shadow-sm cursor-pointer transition-all ml-auto"
                      >
                        <Sparkles size={12} />
                        <span>Ask AI Tutor for Deep Masterclass</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          );
        })}
      </div>

      {/* Submit footer button */}
      {!submitted && (
        <div className="flex gap-3 pb-6">
          <button
            onClick={() => loadRandomQuestions(activeSubject, questionCount)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Draws different questions from the 50-Q subject bank"
          >
            <RefreshCw size={14} /> Shuffle New Set
          </button>
          <button
            onClick={submitQuiz}
            disabled={answeredCount < total}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-lg ${
              answeredCount >= total
                ? `${activeSubject === 'biology' ? 'bg-green-600 hover:bg-green-500 shadow-green-600/20' : activeSubject === 'chemistry' ? 'bg-teal-600 hover:bg-teal-500 shadow-teal-600/20' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'} cursor-pointer`
                : 'bg-zinc-300 dark:bg-zinc-700 cursor-not-allowed opacity-60'
            }`}
          >
            Submit Quiz <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
