import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Navigation guards
import { ProtectedRoute } from './components/navigation/ProtectedRoute';
import { AdminRoute } from './components/navigation/AdminRoute';

// Loading fallback
import LoadingSpinner from './components/common/LoadingSpinner';

// --- Auth Pages ---
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// --- Public ---
import LandingPage from './pages/public/LandingPage';

// --- Onboarding ---
import OnboardingFlow from './pages/onboarding/OnboardingFlow';

// --- Student Pages (lazy loaded for performance) ---
import DashboardPage from './pages/student/DashboardPage';

const LearningPathPage = lazy(() => import('./pages/student/LearningPathPage'));
const CoursesPage = lazy(() => import('./pages/student/CoursesPage'));
const CoursePDFViewerPage = lazy(() => import('./pages/student/CoursePDFViewerPage'));
const NEETFormulasPage = lazy(() => import('./pages/student/NEETFormulasPage'));
const NEETQuizPage = lazy(() => import('./pages/student/NEETQuizPage'));
const NEETAITutorPage = lazy(() => import('./pages/student/NEETAITutorPage'));
const StudyChapterPage = lazy(() => import('./pages/student/StudyChapterPage'));
const LessonPage = lazy(() => import('./pages/student/LessonPage'));
const AssessmentsPage = lazy(() => import('./pages/student/AssessmentsPage'));
const AssessmentHistoryPage = lazy(() => import('./pages/student/AssessmentHistoryPage'));
const AIRecommendationsPage = lazy(() => import('./pages/student/AIRecommendationsPage'));
const AILearningAssistantPage = lazy(() => import('./pages/student/AILearningAssistantPage'));
const AIInsightsPage = lazy(() => import('./pages/student/AIInsightsPage'));
const CareerReadinessPage = lazy(() => import('./pages/student/CareerReadinessPage'));
const ProgressAnalyticsPage = lazy(() => import('./pages/student/ProgressAnalyticsPage'));
const ResourcesPage = lazy(() => import('./pages/student/ResourcesPage'));
const WhatIfLearningPage = lazy(() => import('./pages/student/WhatIfLearningPage'));
const CalendarPage = lazy(() => import('./pages/student/CalendarPage'));
const ProfilePage = lazy(() => import('./pages/student/ProfilePage'));
const SettingsPage = lazy(() => import('./pages/student/SettingsPage'));

// --- Assessment Pages ---
const DiagnosticAssessmentPage = lazy(() => import('./pages/assessment/DiagnosticAssessmentPage'));
const AssessmentResultsPage = lazy(() => import('./pages/assessment/AssessmentResultsPage'));
const NEETSubjectAssessmentPage = lazy(() => import('./pages/student/NEETSubjectAssessmentPage'));
const NEETPYQPapersPage = lazy(() => import('./pages/student/NEETPYQPapersPage'));

// --- Admin Pages ---
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminKnowledgeBasePage = lazy(() => import('./pages/admin/AdminKnowledgeBasePage'));
const AdminCoursesPage = lazy(() => import('./pages/admin/AdminCoursesPage'));
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage'));

// Suspend wrapper
const Suspended = ({ children }) => (
  <Suspense fallback={<div className="flex items-center justify-center h-screen"><LoadingSpinner /></div>}>
    {children}
  </Suspense>
);

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <Router>
          <Routes>
            {/* ── Public ── */}
            <Route path="/" element={<LandingPage />} />

            {/* ── Auth ── */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* ── Dedicated Admin & Super Admin Auth Portals (/adm directly serves Admin Login) ── */}
            <Route path="/adm" element={<Suspended><AdminLoginPage /></Suspended>} />
            <Route path="/adm/*" element={<Suspended><AdminLoginPage /></Suspended>} />
            <Route path="/admin/login" element={<Suspended><AdminLoginPage /></Suspended>} />
            <Route path="/superadmin" element={<Suspended><AdminLoginPage /></Suspended>} />
            <Route path="/super-admin" element={<Suspended><AdminLoginPage /></Suspended>} />

            {/* ── Public Assessment Routes ── */}
            <Route path="/assessments/diagnostic" element={
              <Navigate to="/dashboard" replace />
            } />
            <Route path="/assessments/results" element={
              <Suspended><AssessmentResultsPage /></Suspended>
            } />

            {/* ── Protected Student Routes ── */}
            <Route element={<ProtectedRoute />}>
              {/* Onboarding (no main layout) */}
              <Route path="/onboarding" element={
                <Suspended><OnboardingFlow /></Suspended>
              } />

              {/* Full-Window PDF Study Suite (One-window standalone view) */}
              <Route path="/courses/pdf-viewer" element={
                <Suspended><CoursePDFViewerPage /></Suspended>
              } />
              <Route path="/courses/material-pdf" element={
                <Suspended><CoursePDFViewerPage /></Suspended>
              } />

              {/* NEET Subject Assessment Test Environment */}
              <Route path="/assessments/test" element={
                <Suspended><NEETSubjectAssessmentPage /></Suspended>
              } />

              {/* AI Assistant (special full-height layout) */}
              <Route element={<MainLayout />}>
                <Route path="/ai-assistant" element={
                  <Suspended><NEETAITutorPage /></Suspended>
                } />
              </Route>

              {/* Main App with Sidebar */}
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/learning-path" element={<Suspended><LearningPathPage /></Suspended>} />

                {/* Courses & NEET Study Suite */}
                <Route path="/study" element={<Suspended><StudyChapterPage /></Suspended>} />
                <Route path="/study/:subject" element={<Suspended><StudyChapterPage /></Suspended>} />
                <Route path="/study/:subject/:chapterId" element={<Suspended><StudyChapterPage /></Suspended>} />
                <Route path="/courses" element={<Suspended><CoursesPage /></Suspended>} />
                <Route path="/courses/formulas" element={<Suspended><NEETFormulasPage /></Suspended>} />
                <Route path="/courses/quiz" element={<Suspended><NEETQuizPage /></Suspended>} />
                <Route path="/courses/ai-tutor" element={<Suspended><NEETAITutorPage /></Suspended>} />
                <Route path="/courses/:courseId/topics/:topicId/lessons/:lessonId" element={<Suspended><LessonPage /></Suspended>} />

                {/* Assessments & PYQ Question Papers */}
                <Route path="/assessments" element={<Suspended><AssessmentsPage /></Suspended>} />
                <Route path="/pyq-papers" element={<Suspended><NEETPYQPapersPage /></Suspended>} />
                <Route path="/courses/pyq" element={<Suspended><NEETPYQPapersPage /></Suspended>} />
                <Route path="/assessments/history" element={<Suspended><AssessmentHistoryPage /></Suspended>} />
                <Route path="/assessment-history" element={<Suspended><AssessmentHistoryPage /></Suspended>} />

                {/* AI & Recommendations */}
                <Route path="/recommendations" element={<Suspended><AIRecommendationsPage /></Suspended>} />
                <Route path="/ai-recommendations" element={<Suspended><AIRecommendationsPage /></Suspended>} />
                <Route path="/ai-insights" element={<Suspended><AIInsightsPage /></Suspended>} />

                {/* Progress & Career */}
                <Route path="/career-readiness" element={<Suspended><CareerReadinessPage /></Suspended>} />
                <Route path="/progress" element={<Suspended><ProgressAnalyticsPage /></Suspended>} />
                <Route path="/analytics" element={<Suspended><ProgressAnalyticsPage /></Suspended>} />

                {/* Extras */}
                <Route path="/resources" element={<Navigate to="/courses" replace />} />
                <Route path="/what-if" element={<Suspended><WhatIfLearningPage /></Suspended>} />
                <Route path="/calendar" element={<Suspended><CalendarPage /></Suspended>} />

                {/* Profile & Settings */}
                <Route path="/profile" element={<Suspended><ProfilePage /></Suspended>} />
                <Route path="/settings" element={<Suspended><SettingsPage /></Suspended>} />
              </Route>
            </Route>

            {/* ── Admin Routes ── */}
            <Route element={<AdminRoute />}>
              <Route element={<Suspended><AdminLayout /></Suspended>}>
                <Route path="/admin" element={<Suspended><AdminDashboardPage /></Suspended>} />
                <Route path="/admin/knowledge-base" element={<Suspended><AdminKnowledgeBasePage /></Suspended>} />
                <Route path="/admin/courses" element={<Suspended><AdminCoursesPage /></Suspended>} />
                <Route path="/admin/users" element={<Suspended><AdminUsersPage /></Suspended>} />
              </Route>
            </Route>

            {/* ── Catch-All ── */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  </ThemeProvider>
  );
}

export default App;
