import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function AssessmentHistoryChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-56 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-200 dark:border-slate-700/60 rounded-xl">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No assessment history recorded</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Take your diagnostic or topic quizzes to see score trends</p>
      </div>
    );
  }

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.4} />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit="%" />
          <Tooltip 
            formatter={(v) => [`${v}%`, 'Score']} 
            contentStyle={{ 
              borderRadius: '12px', 
              backgroundColor: '#1e293b', 
              borderColor: '#334155', 
              color: '#f8fafc',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' 
            }} 
            itemStyle={{ color: '#818cf8' }}
            labelStyle={{ color: '#94a3b8', fontWeight: 600 }}
          />
          <ReferenceLine y={75} stroke="#22c55e" strokeDasharray="4 4" strokeOpacity={0.7} label={{ value: 'Target 75%', fontSize: 10, fill: '#22c55e', position: 'top' }} />
          <Line 
            type="monotone" 
            dataKey="score" 
            stroke="#6366f1" 
            strokeWidth={3} 
            dot={{ fill: '#4f46e5', r: 5, strokeWidth: 2, stroke: '#ffffff' }} 
            activeDot={{ r: 7, fill: '#818cf8' }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
