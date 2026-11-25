import React from 'react';
import { useGreeting } from '../../hooks/useGreeting';

const DynamicGreeting = ({ userName }) => {
  const { greeting, timeString, message } = useGreeting();
  
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        {greeting}, {userName}!
      </h1>
      <p className="text-slate-500 dark:text-slate-200 mt-1.5 font-medium text-sm sm:text-base">
        <span className="text-blue-600 dark:text-blue-400 font-semibold">{timeString}</span> · {message}
      </p>
    </div>
  );
};

export default DynamicGreeting;
