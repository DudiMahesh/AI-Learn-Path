import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import { ChevronRight, Menu } from 'lucide-react';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Pinned state: if false (default), sidebar reveals on mouse over and hides on mouse out
  const [isPinned, setIsPinned] = useState(() => {
    return localStorage.getItem('sidebar_pinned') === 'true';
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const togglePin = () => {
    const next = !isPinned;
    setIsPinned(next);
    localStorage.setItem('sidebar_pinned', String(next));
  };

  const isVisibleOnDesktop = isPinned || isHovered;

  return (
    <div className="flex h-screen bg-[#f8f9fb] dark:bg-[#0a0e14] text-gray-900 dark:text-gray-200 overflow-hidden transition-colors duration-150 relative">
      
      {/* ── Left Mouse-Over Hover Trigger Zone (Desktop) ── */}
      {!isPinned && (
        <div
          onMouseEnter={() => setIsHovered(true)}
          className="hidden md:flex fixed inset-y-0 left-0 w-3.5 hover:w-6 z-40 cursor-pointer group transition-all duration-150 items-center justify-start"
          title="Hover here to show sidebar navigation"
        >
          {/* Subtle Glow & Indicator Tab */}
          <div className="h-28 w-1.5 group-hover:w-2 rounded-r-full bg-emerald-500/50 group-hover:bg-emerald-500 shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center">
            <ChevronRight className="w-3 h-3 text-white opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-0.5" />
          </div>
        </div>
      )}

      {/* ── Desktop Sidebar Container (Hover Reveal or Pinned) ── */}
      {isPinned ? (
        // Pinned: Standard static flow
        <div className="hidden md:flex flex-shrink-0 z-30 transition-all duration-300">
          <Sidebar isPinned={isPinned} onTogglePin={togglePin} />
        </div>
      ) : (
        // Unpinned: Slide in on hover, slide out on mouse leave
        <>
          {/* Subtle backdrop overlay when hovered */}
          {isHovered && (
            <div
              className="hidden md:block fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40 transition-opacity duration-200"
              onClick={() => setIsHovered(false)}
            />
          )}

          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`hidden md:flex fixed inset-y-0 left-0 z-50 flex-shrink-0 transition-transform duration-300 ease-in-out shadow-2xl ${
              isVisibleOnDesktop ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <Sidebar isPinned={isPinned} onTogglePin={togglePin} />
          </div>
        </>
      )}

      {/* ── Mobile Sidebar Drawer ── */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-[#0f1419] z-50">
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* ── Main Content Area ── */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Navbar onMenuClick={toggleSidebar} />
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default MainLayout;
