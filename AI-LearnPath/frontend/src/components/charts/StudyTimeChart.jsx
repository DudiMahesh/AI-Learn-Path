import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function StudyTimeChart({ data = [] }) {
  const hasHours = data.some(d => d.hours > 0);

  if (!data || data.length === 0 || !hasHours) {
    return (
      <div className="h-56 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-200 dark:border-slate-700/60 rounded-xl">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No study sessions logged this week</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Study lessons and complete quizzes to track daily hours</p>
      </div>
    );
  }

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.4} />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit="h" />
          <Tooltip 
            formatter={(v) => [`${v} hrs`, 'Study Time']} 
            contentStyle={{ 
              borderRadius: '12px', 
              backgroundColor: '#1e293b', 
              borderColor: '#334155', 
              color: '#f8fafc',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' 
            }} 
            itemStyle={{ color: '#60a5fa' }}
            labelStyle={{ color: '#94a3b8', fontWeight: 600 }}
          />
          <Bar dataKey="hours" fill="url(#barGrad)" radius={[6, 6, 0, 0]} maxBarSize={42} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
