import React from 'react';

export default function StatusBanner({ status }) {
  const isWin = status === 'WIN';

  return (
    <div className={`w-full mt-8 rounded-2xl px-8 py-6 flex items-center justify-center gap-5 text-3xl font-black transition-all duration-500 border-2
      ${isWin
        ? 'bg-success/10 border-success text-success shadow-[0_0_25px_rgba(0,230,118,0.3)]'
        : 'bg-danger/10 border-danger text-danger shadow-[0_0_25px_rgba(255,23,68,0.3)]'
      }`}
    >
      <span className="text-5xl">{isWin ? '😁' : '🚨'}</span>
      <span>
        {isWin 
          ? '¡GANANDO! Métricas predictivas cumplidas.' 
          : '¡PERDIENDO! Acciones correctivas necesarias.'}
      </span>
    </div>
  );
}
