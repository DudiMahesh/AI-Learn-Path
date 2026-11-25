import React, { useEffect, useState } from 'react';
import { BookOpen, Search, Plus, Trash2, X, Check, AlertCircle } from 'lucide-react';
import { courseService } from '../../services/courseService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const DIFF_STYLES = {
  beginner: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300',
  intermediate: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
  advanced: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
};

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'beginner',
    category: 'General',
    topicsText: ''
  });

  const loadCourses = () => {
    setLoading(true);
    courseService.getCourses()
      .then(data => {
        const list = Array.isArray(data) ? data : (data?.data || []);
        setCourses(list);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleOpenModal = () => {
    setFormData({
      title: '',
      description: '',
      difficulty: 'beginner',
      category: 'General',
      topicsText: 'Introduction & Core Concepts\nPractical Exercises\nFinal Project'
    });
    setIsModalOpen(true);
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    setSubmitting(true);
    try {
      const topicList = formData.topicsText
        .split('\n')
        .map(t => t.trim())
        .filter(Boolean)
        .map(title => ({ title }));

      await courseService.createCourse({
        title: formData.title,
        description: formData.description,
        difficulty: formData.difficulty,
        topics: topicList
      });

      setIsModalOpen(false);
      setNotification({ type: 'success', message: 'Course created successfully!' });
      setTimeout(() => setNotification(null), 4000);
      loadCourses();
    } catch (err) {
      setNotification({ type: 'error', message: err?.response?.data?.message || 'Failed to create course' });
      setTimeout(() => setNotification(null), 4000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await courseService.deleteCourse(id);
      setNotification({ type: 'success', message: 'Course deleted successfully!' });
      setTimeout(() => setNotification(null), 4000);
      loadCourses();
    } catch {
      setNotification({ type: 'error', message: 'Failed to delete course' });
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const filtered = courses.filter(c =>
    !search || 
    c.title?.toLowerCase().includes(search.toLowerCase()) || 
    c.category?.toLowerCase().includes(search.toLowerCase()) ||
    c.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {notification && (
        <div className={`p-4 rounded-xl flex items-center justify-between text-sm font-medium ${
          notification.type === 'success' 
            ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
            : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)}><X size={16} /></button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Courses Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Create, view, and organize syllabus modules and learning content across the platform.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-56 sm:w-64 transition-all" 
            />
          </div>

          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Plus size={16} /> Add Course
          </button>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm overflow-hidden transition-colors">
        {loading ? (
          <div className="flex justify-center py-16"><LoadingSpinner /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700">
                  {['#', 'Course Title', 'Category', 'Difficulty', 'Duration', 'Topics', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {filtered.map((c, i) => (
                  <tr key={c.id || i} className="hover:bg-slate-50/60 dark:hover:bg-slate-750 transition-colors">
                    <td className="px-5 py-4 text-xs text-slate-400 font-mono">#{c.id}</td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white text-sm">{c.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1 max-w-md">{c.description || 'No description'}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full font-medium">
                        {c.category || 'General'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${DIFF_STYLES[c.difficulty] || 'bg-slate-100 text-slate-600'}`}>
                        {c.difficulty || 'beginner'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {c.duration_hours ? `${c.duration_hours}h` : '4h'}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {c.topics_count !== undefined ? c.topics_count : (c.topics?.length ?? 0)}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleDelete(c.id, c.title)}
                        className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Delete Course"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-slate-400">
                <BookOpen size={40} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm">{search ? 'No courses match your search.' : 'No courses found.'}</p>
              </div>
            )}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="px-5 py-3.5 border-t border-slate-100 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 dark:text-slate-400">
            Showing {filtered.length} of {courses.length} total courses
          </div>
        )}
      </div>

      {/* Add Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add New Course</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Course Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Master Next.js & Server Components"
                  className="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide an engaging summary of skills and topics covered..."
                  className="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={e => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Category / Career
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Data Science & AI">Data Science & AI</option>
                    <option value="Full Stack Web Development">Full Stack Web Development</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Topics / Modules (one per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.topicsText}
                  onChange={e => setFormData({ ...formData, topicsText: e.target.value })}
                  placeholder="Module 1: Foundations & Architecture&#10;Module 2: Core Implementation & APIs&#10;Module 3: Production Deployment & Testing"
                  className="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                >
                  {submitting ? <LoadingSpinner size="sm" /> : <Check size={16} />}
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
