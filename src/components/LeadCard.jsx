import React from 'react';

export default function LeadCard({ icon, label, value, unit, met }) {
  return (
    <div className={`rounded-xl p-5 border transition-all duration-300
      ${met
        ? 'bg-success/5 border-success/30'
        : 'bg-danger/5 border-danger/30'
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <p className="text-sm font-bold text-text-secondary uppercase tracking-wide">{label}</p>
      </div>
      <p className={`text-4xl font-black ${met ? 'text-success' : 'text-danger'}`}> 
        {value}{unit}
      </p>
      <p className={`text-xs mt-2 font-semibold uppercase tracking-wider ${met ? 'text-success/70' : 'text-danger/70'}`}>
        {met ? '✓ Cumplido' : '✗ No cumplido'}
      </p>
    </div>
  );
}
