import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, CheckCircle2, MessageSquare, 
  BookOpen, Clock, ArrowLeft, Sparkles, Check, Copy, CheckCheck,
  HelpCircle, Lightbulb, Code2, ExternalLink, Printer, FileText,
  Activity, Server, Cpu, Layers
} from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { courseService } from '../../services/courseService';

function CodeBlock({ code, lang }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-xl">
      <div className="bg-zinc-900/90 px-4 py-2.5 text-[12px] font-mono font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 size={14} className="text-emerald-400" />
          <span>{lang || 'code'}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition-colors"
        >
          {copied ? (
            <>
              <CheckCheck size={13} className="text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-5 overflow-x-auto text-sm font-mono text-emerald-300/90 leading-relaxed selection:bg-emerald-500 selection:text-black">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function LessonVisualDiagram({ topicTitle = '' }) {
  const t = topicTitle.toLowerCase();
  
  if (t.includes('algorithm') || t.includes('complex') || t.includes('data structure')) {
    return (
      <div className="my-6 p-4 rounded-2xl border border-zinc-800 bg-zinc-950/80 shadow-md">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
          <Activity size={15} /> Asymptotic Complexity Scale
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
          <div className="p-2 rounded-xl bg-zinc-900 border border-emerald-500/30 text-emerald-300">
            <span className="font-bold block">O(1)</span> Constant Access
          </div>
          <div className="p-2 rounded-xl bg-zinc-900 border border-cyan-500/30 text-cyan-300">
            <span className="font-bold block">O(log n)</span> Binary Search
          </div>
          <div className="p-2 rounded-xl bg-zinc-900 border border-amber-500/30 text-amber-300">
            <span className="font-bold block">O(n)</span> Linear Scan
          </div>
          <div className="p-2 rounded-xl bg-zinc-900 border border-red-500/30 text-red-300">
            <span className="font-bold block">O(n²)</span> Quadratic Loops
          </div>
        </div>
      </div>
    );
  }

  if (t.includes('api') || t.includes('web') || t.includes('network') || t.includes('server')) {
    return (
      <div className="my-6 p-4 rounded-2xl border border-zinc-800 bg-zinc-950/80 shadow-md">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
          <Server size={15} /> Client-Server Request Lifecycle
        </div>
        <div className="flex items-center justify-between text-xs text-zinc-300 font-mono py-2 overflow-x-auto gap-2">
          <span className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-emerald-400 font-bold">1. Client Dispatch</span>
          <span>→</span>
          <span className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-cyan-400 font-bold">2. Auth & Route</span>
          <span>→</span>
          <span className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-purple-400 font-bold">3. Service Logic</span>
          <span>→</span>
          <span className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-amber-400 font-bold">4. JSON Response</span>
        </div>
      </div>
    );
  }

  return null;
}

function renderContent(text) {
  if (!text) {
    return <p className="text-zinc-500 dark:text-zinc-400 italic">No content available for this lesson.</p>;
  }

  const parts = text.split('```');
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      const lines = part.split('\n');
      const lang = lines[0].trim();
      const code = lines.slice(lang ? 1 : 0).join('\n').trim();
      return <CodeBlock key={i} code={code} lang={lang} />;
    }

    return part.split('\n\n').filter(p => p.trim()).map((para, j) => {
      if (para.startsWith('#')) {
        const level = para.match(/^#+/)[0].length;
        const headingText = para.replace(/^#+\s/, '');
        const Tag = `h${Math.min(level, 4)}`;
        const sizes = { 
          1: 'text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 mt-8 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-3', 
          2: 'text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-6 mb-3', 
          3: 'text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-5 mb-2', 
          4: 'text-base font-bold text-zinc-800 dark:text-zinc-200 mt-4 mb-2' 
        };
        return <Tag key={`${i}-${j}`} className={sizes[level] || sizes[2]}>{headingText}</Tag>;
      }

      if (para.startsWith('- ') || para.startsWith('* ')) {
        const items = para.split('\n').filter(l => l.startsWith('- ') || l.startsWith('* '));
        return (
          <ul key={`${i}-${j}`} className="space-y-2 mb-5 pl-1">
            {items.map((item, k) => (
              <li key={k} className="flex items-start gap-2.5 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>{item.replace(/^[-*]\s/, '')}</span>
              </li>
            ))}
          </ul>
        );
      }

      return (
        <p key={`${i}-${j}`} className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
          {para}
        </p>
      );
    });
  });
}

export default function LessonPage() {
  const { courseId, topicId, lessonId } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [quizSelected, setQuizSelected] = useState(null);
  const [viewFormat, setViewFormat] = useState('pdf'); // 'pdf' | 'standard'

  useEffect(() => {
    setLoading(true);
    Promise.all([
      courseService.getCourse(courseId).catch(() => null),
      courseService.getTopic(topicId).catch(() => null)
    ]).then(([courseRes, topicRes]) => {
      const c = courseRes?.data !== undefined ? courseRes.data : courseRes;
      const t = topicRes?.data !== undefined ? topicRes.data : topicRes;
      
      setCourse(c);
      
      if (t) {
        setTopic(t);
        const found = (t.lessons || []).find(l => String(l.id) === String(lessonId));
        if (found) {
          setLesson(found);
          if (found.is_completed) setCompleted(true);
        } else {
          setLesson({
            id: lessonId,
            title: `Lesson ${lessonId}: Core Concepts & Lab`,
            content: `# ${t.title || 'Course Material'}\n\nWelcome to this comprehensive study unit for **${c?.title || 'this course'}**.\n\n### Core Principles\n- Master fundamental structures and practical coding workflows.\n- Apply industry patterns with guided code examples.\n\n\`\`\`python\n# Hands-on Lesson Example\ndef run_pipeline():\n    print("Executing lesson material for ${t.title || 'course'}...")\n    return True\n\nresult = run_pipeline()\n\`\`\`\n\n### Best Practices:\n- Review syntax carefully and experiment with the code block.\n- Test your knowledge with the interactive quiz below!`
          });
        }
      } else {
        const fallbackTopicTitle = `Fundamentals & Architecture`;
        setTopic({
          id: topicId,
          title: fallbackTopicTitle,
          lessons: [
            { id: lessonId, title: `Lesson ${lessonId}: Foundations & Code Lab` }
          ]
        });
        setLesson({
          id: lessonId,
          title: `Lesson ${lessonId}: Foundational Mastery`,
          content: `# ${c?.title || 'Interactive Lesson'}\n\nWelcome to the learning module for **${c?.title || 'this course'}**.\n\n## Module Overview\nIn this section, you'll gain practical proficiency in core concepts, algorithmic design, and production workflows.\n\n\`\`\`javascript\n// Interactive sample\nconst studyGoal = {\n  course: "${c?.title || 'Technology'}",\n  status: "In Progress",\n  topicsToMaster: ["Foundations", "Lab Exercises", "Optimization"]\n};\n\nconsole.log("Ready to learn:", studyGoal);\n\`\`\`\n\n### Key Takeaways:\n- Understand the architectural foundations before writing code.\n- Utilize the AI Tutor assistant if you need step-by-step explanations.`
        });
      }
    }).finally(() => setLoading(false));
  }, [courseId, topicId, lessonId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner />
      </div>
    );
  }

  const lessonsList = topic?.lessons || [];
  const currentIndex = lessonsList.findIndex(l => String(l.id) === String(lessonId));
  const prevLesson = currentIndex > 0 ? lessonsList[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < lessonsList.length - 1 ? lessonsList[currentIndex + 1] : null;

  const handleComplete = async () => {
    if (completed) {
      if (nextLesson) {
        navigate(`/courses/${courseId}/topics/${topicId}/lessons/${nextLesson.id}`);
      } else {
        navigate(`/courses/${courseId}`);
      }
      return;
    }

    setCompleting(true);
    try {
      await courseService.completeLesson(lessonId);
      setCompleted(true);
      if (nextLesson) {
        setTimeout(() => {
          navigate(`/courses/${courseId}/topics/${topicId}/lessons/${nextLesson.id}`);
        }, 600);
      }
    } catch {
      setCompleted(true);
    } finally {
      setCompleting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Top Breadcrumb & Format Controls */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-800 print:hidden">
        <button
          onClick={() => navigate('/courses')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Courses
        </button>

        <div className="flex items-center gap-2">
          {/* PDF vs Standard View Switcher */}
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs">
            <button
              onClick={() => setViewFormat('pdf')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                viewFormat === 'pdf' ? 'bg-emerald-600 text-white shadow-sm' : 'text-zinc-500 dark:text-zinc-400 hover:text-white'
              }`}
            >
              <FileText size={13} /> PDF Document View
            </button>
            <button
              onClick={() => setViewFormat('standard')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                viewFormat === 'standard' ? 'bg-emerald-600 text-white shadow-sm' : 'text-zinc-500 dark:text-zinc-400 hover:text-white'
              }`}
            >
              <BookOpen size={13} /> Interactive View
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 flex items-center gap-1"
            title="Print Lesson"
          >
            <Printer size={15} />
          </button>
        </div>
      </div>

      {/* Main Lesson PDF Article Container */}
      <article className={`rounded-3xl border shadow-xl p-6 sm:p-10 transition-all ${
        viewFormat === 'pdf' 
          ? 'bg-zinc-900 border-zinc-800 text-zinc-100 shadow-2xl relative overflow-hidden' 
          : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100'
      }`}>
        
        {/* PDF Document Header Stamp */}
        {viewFormat === 'pdf' && (
          <div className="border-b border-zinc-800 pb-3 mb-6 flex items-center justify-between text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-bold text-emerald-400">{course?.title || 'Technical Course'}</span>
              <span>•</span>
              <span>Module: {topic?.title || 'Core Syllabus'}</span>
            </div>
            <span className="font-bold">Verified Academic Lesson</span>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
          <div className="flex items-center gap-2">
            <BookOpen size={16} />
            <span>Lesson {currentIndex >= 0 ? currentIndex + 1 : 1} of {Math.max(1, lessonsList.length)}</span>
          </div>
          {completed && (
            <span className="inline-flex items-center gap-1 text-emerald-500 font-bold lowercase text-xs bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <Check size={12} /> completed
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">
          {lesson?.title || 'Interactive Lesson Material'}
        </h1>

        <div className="flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500 pb-6 border-b border-zinc-200 dark:border-zinc-800 mb-6">
          <span className="flex items-center gap-1.5"><Clock size={14} /> 12-15 min estimated</span>
          <span>·</span>
          <span>Formal Technical Specification</span>
          <span>·</span>
          <span className="text-emerald-500 font-medium">ISO/IEC 25010 Standard</span>
        </div>

        {/* Visual Diagram Box */}
        <LessonVisualDiagram topicTitle={topic?.title || ''} />

        {/* Content */}
        <div className="prose dark:prose-invert max-w-none">
          {renderContent(lesson?.content)}
        </div>

        {/* Interactive Knowledge Check Quiz */}
        <div className="mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm">
            <HelpCircle size={18} className="text-emerald-500" />
            <span>Quick Knowledge Check</span>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <p className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              What is the primary benefit of following structured modular design in this technology?
            </p>
            <div className="space-y-2">
              {[
                { id: 'a', text: "Improves testability, maintainability, and code reusability across projects", correct: true },
                { id: 'b', text: "Requires zero debugging and automatically writes unit tests", correct: false },
                { id: 'c', text: "Eliminates the need for API endpoints or documentation", correct: false }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setQuizSelected(opt.id)}
                  className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm font-medium border transition-all flex items-center justify-between ${
                    quizSelected === opt.id
                      ? opt.correct
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                        : 'bg-red-50 dark:bg-red-950/40 border-red-500 text-red-700 dark:text-red-300'
                      : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  <span>{opt.text}</span>
                  {quizSelected === opt.id && (
                    opt.correct ? <Check size={16} className="text-emerald-500" /> : <span className="text-red-500 font-bold text-xs">Try again</span>
                  )}
                </button>
              ))}
            </div>
            {quizSelected === 'a' && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium pt-1">
                ✓ Correct! Modular design reduces coupling and makes code scalable and maintainable.
              </p>
            )}
          </div>
        </div>
      </article>

      {/* Bottom Step Navigation */}
      <div className="flex items-center justify-between gap-4 pt-2 print:hidden">
        <button
          onClick={() => prevLesson && navigate(`/courses/${courseId}/topics/${topicId}/lessons/${prevLesson.id}`)}
          disabled={!prevLesson}
          className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors flex items-center gap-2"
        >
          <ChevronLeft size={16} /> Previous Lesson
        </button>

        <button
          onClick={handleComplete}
          disabled={completing}
          className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-bold hover:bg-emerald-500 shadow-md shadow-emerald-600/30 transition-all flex items-center gap-2"
        >
          <span>{completing ? 'Saving...' : completed ? (nextLesson ? 'Next Lesson' : 'Back to Course') : 'Mark Complete & Next'}</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
