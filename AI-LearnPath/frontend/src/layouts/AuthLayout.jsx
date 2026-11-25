import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0e14] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md bg-white dark:bg-[#0f1419] rounded-xl shadow-sm border border-gray-200 dark:border-[#1e2530] overflow-hidden">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
