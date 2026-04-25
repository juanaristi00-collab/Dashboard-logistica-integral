import React from 'react';

/**
 * StatusBanner — Recuadro visual "¿ESTAMOS GANANDO?"
 * Verde/feliz si todas las palancas Lead están cumplidas,
 * Rojo/triste si alguna palanca falla.
 */
export default function StatusBanner({ status }) {
  const isWin = status === 'WIN';

  return (
    <div
      className={`w-full mt-8 rounded-2xl px-8 py-6 flex items-center justify-center gap-5
        transition-all duration-500 border-2
        ${isWin
          ? 'bg-success/8 border-success/50 animate-pulse-success'
          : 'bg-danger/8 border-danger/40'
        }`}
    >
      <span className="text-5xl">{isWin ? '😁' : '🚨'}</span>
      <div>
        <p className={`text-xs font-extrabold uppercase tracking-widest mb-1
          ${isWin ? 'text-success/70' : 'text-danger/70'}`}>
          ¿Estamos Ganando?
        </p>
        <p className={`text-2xl font-black
          ${isWin ? 'text-success' : 'text-danger'}`}>
          {isWin
            ? '¡GANANDO! Todas las palancas en meta.'
            : '¡PERDIENDO! Acciones correctivas necesarias.'}
        </p>
        <p className={`text-xs font-medium mt-1
          ${isWin ? 'text-success/60' : 'text-danger/60'}`}>
          {isWin
            ? 'El equipo mantiene el ritmo esperado. ¡Excelente trabajo!'
            : 'Revisar palancas en rojo y establecer compromisos en la próxima cadencia.'}
        </p>
      </div>
    </div>
  );
}
