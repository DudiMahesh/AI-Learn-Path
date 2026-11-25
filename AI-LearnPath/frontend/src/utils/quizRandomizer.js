/**
 * Quiz & Question Randomization Utility
 * Provides unbiased Fisher-Yates shuffling for questions and multiple-choice options.
 * Preserves answer key integrity and scoring consistency.
 */

/**
 * Pure Fisher-Yates array shuffle. Returns a new array without mutating the input.
 */
export function shuffleArray(arr) {
  if (!Array.isArray(arr)) return [];
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Samples `count` random non-repeating questions from a question pool.
 * If count >= pool.length, returns the full shuffled pool.
 */
export function sampleQuestions(pool, count = 5) {
  if (!Array.isArray(pool) || pool.length === 0) return [];
  const shuffled = shuffleArray(pool);
  return shuffled.slice(0, Math.min(count, pool.length));
}

/**
 * Shuffles multiple-choice options (A, B, C, D) for a question object
 * while dynamically updating the `correct` or `correct_option` key
 * so scoring remains 100% accurate.
 */
export function shuffleQuestionOptions(question) {
  if (!question || !question.options) return question;

  const optionEntries = Object.entries(question.options); // [['A', 'val1'], ['B', 'val2'], ...]
  const correctKey = question.correct || question.correct_option;
  const correctText = question.options[correctKey];

  // Shuffle the option text values
  const shuffledValues = shuffleArray(optionEntries.map(e => e[1]));
  const keys = ['A', 'B', 'C', 'D'];

  const newOptions = {};
  let newCorrectKey = correctKey;

  shuffledValues.forEach((val, idx) => {
    const key = keys[idx] || String.fromCharCode(65 + idx);
    newOptions[key] = val;
    if (val === correctText) {
      newCorrectKey = key;
    }
  });

  return {
    ...question,
    options: newOptions,
    correct: newCorrectKey,
    correct_option: newCorrectKey
  };
}

/**
 * Normalizes question objects from different bank formats (array vs map options)
 * into a standard format:
 * { id, text, options: [string], correctIndex: number, correctLetter: string, explanation: string }
 */
export function normalizeQuestion(q) {
  if (!q) return null;
  const text = q.text || q.question || '';
  let options = [];
  let correctIndex = 0;

  if (Array.isArray(q.options)) {
    options = [...q.options];
    if (typeof q.correct === 'number') {
      correctIndex = q.correct;
    } else if (typeof q.correct === 'string') {
      const idx = ['A', 'B', 'C', 'D'].indexOf(q.correct.trim().toUpperCase());
      correctIndex = idx !== -1 ? idx : 0;
    }
  } else if (typeof q.options === 'object' && q.options !== null) {
    const keys = ['A', 'B', 'C', 'D'];
    options = keys.map(k => q.options[k] || '');
    const corr = q.correct || q.correct_option;
    if (typeof corr === 'string') {
      const idx = keys.indexOf(corr.trim().toUpperCase());
      correctIndex = idx !== -1 ? idx : 0;
    } else if (typeof corr === 'number') {
      correctIndex = corr;
    }
  }

  return {
    id: q.id || Math.random().toString(36).substring(2, 9),
    text,
    options,
    correctIndex,
    correctLetter: ['A', 'B', 'C', 'D'][correctIndex] || 'A',
    explanation: q.explanation || 'Refer to standard NCERT textbook.',
    subject: q.subject || ''
  };
}

/**
 * Generates a freshly sampled and randomized question batch from a subject pool.
 */
export function generateRandomQuizBatch(pool, count = 5, shuffleOptions = true) {
  const normalizedPool = (pool || []).map(normalizeQuestion).filter(Boolean);
  const sampled = sampleQuestions(normalizedPool, count);
  return sampled;
}

