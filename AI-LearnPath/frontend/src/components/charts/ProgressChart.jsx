import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

export default function ProgressChart({ progress = 0, size = 160 }) {
  const safeProgress = Math.max(0, Math.min(100, Number(progress) || 0));
  const data = [{ name: 'progress', value: safeProgress, fill: 'url(#progressGrad)' }];

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          cx="50%" 
          cy="50%" 
          innerRadius="70%" 
          outerRadius="100%" 
          data={data} 
          startAngle={90} 
          endAngle={-270}
        >
          <defs>
            <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
          </defs>
          <RadialBar 
            dataKey="value" 
            cornerRadius={8} 
            background={{ fill: '#e2e8f0', opacity: 0.3 }} 
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {Math.round(safeProgress)}%
        </span>
        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Complete</span>
      </div>
    </div>
  );
}
