import React, { useEffect, useRef, useState } from 'react';

/**
 * LeadProgressBar — Componente de palanca Lead con barra de progreso animada.
 * Props:
 *   icon       — emoji o string de ícono
 *   label      — descripción de la palanca
 *   current    — valor actual (número)
 *   target     — valor meta (número)
 *   unit       — unidad de medida (ej. "%", "paq/turno")
 *   metCondition — boolean que indica si la meta se cumplió (opcional, si no se calcula automáticamente)
 *   description — texto breve opcional de la meta
 */
export default function LeadProgressBar({
  icon,
  label,
  current,
  target,
  unit = '%',
  metCondition,
  description,
}) {
  const barRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  // Determinar si la meta está cumplida
  const isMet = metCondition !== undefined ? metCondition : current >= target;

  // Calcular porcentaje para la barra visual (0–100%)
  const pct = Math.min(100, Math.round((current / target) * 100));

  // Color dinámico: verde ≥100%, naranja ≥75%, rojo <75%
  const barColor = isMet
    ? '#00e676'                    // Verde brillante — Ganando
    : pct >= 75
    ? '#ff9100'                    // Naranja — Cerca
    : '#ff1744';                   // Rojo — En riesgo

  const borderColor = isMet
    ? 'border-success/30'
    : pct >= 75
    ? 'border-warning/30'
    : 'border-danger/30';

  const bgColor = isMet
    ? 'bg-success/5'
    : pct >= 75
    ? 'bg-warning/5'
    : 'bg-danger/5';

  // Activar animación con IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={barRef}
      className={`rounded-xl p-5 border transition-all duration-300 ${bgColor} ${borderColor}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <span className="text-xl flex-shrink-0">{icon}</span>
          <p className="text-xs font-bold text-text-secondary uppercase tracking-wide leading-tight">
            {label}
          </p>
        </div>
        {/* Badge estado */}
        <span
          className="text-xs font-black px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: `${barColor}20`, color: barColor }}
        >
          {isMet ? '✓ META' : `${pct}%`}
        </span>
      </div>

      {/* Valor numérico */}
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-3xl font-black" style={{ color: barColor }}>
          {current}
        </span>
        <span className="text-sm font-semibold text-text-muted">{unit}</span>
        <span className="text-xs text-text-muted font-medium ml-auto">
          Meta: <span className="font-bold text-text-secondary">{target} {unit}</span>
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="w-full h-2.5 rounded-full bg-bg-card-inner overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: animated ? `${pct}%` : '0%',
            backgroundColor: barColor,
            boxShadow: `0 0 8px ${barColor}60`,
          }}
        />
      </div>

      {/* Descripción opcional */}
      {description && (
        <p className="text-[10px] text-text-muted mt-2 font-medium leading-tight">
          {description}
        </p>
      )}
    </div>
  );
}
