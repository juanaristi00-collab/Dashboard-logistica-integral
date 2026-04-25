import React, { useRef, useEffect, useState } from 'react';

/**
 * SectionCadencia — Disciplina 4: Cadencia de Rendición de Cuentas
 * Muestra las reuniones semanales de sincronización del equipo GLAM FAST.
 */

const AGENDA_ITEMS = [
  {
    icon: '📊',
    role: 'Jefe de Logística',
    task: 'Revisión del Tablero',
    description: 'Análisis del estado actual del scorecard 4DX y avance de los MCIs.',
    color: '#ff6d00',
  },
  {
    icon: '🔬',
    role: 'Responsables de cada Palanca',
    task: 'Análisis de las 6 Palancas',
    description: 'Reporte individual del cumplimiento de cada medida de predicción.',
    color: '#ffd600',
  },
  {
    icon: '🤝',
    role: 'Todo el Equipo',
    task: 'Ajustes y Compromisos',
    description: 'Definición de acciones correctivas y compromisos concretos para la semana.',
    color: '#00e676',
  },
];

export default function SectionCadencia() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cadencia"
      ref={sectionRef}
      className="min-h-screen py-20 px-10 border-t border-border relative overflow-hidden"
    >
      {/* Gradiente de fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,230,118,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <div className={`mb-14 transition-all duration-700 ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-success/30 bg-success/10 mb-6">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-extrabold text-success uppercase tracking-widest">
            Disciplina 4 — Rendición de Cuentas
          </span>
        </div>

        <h2 className="text-5xl font-black text-text-primary leading-tight mb-3">
          Cadencia de{' '}
          <span style={{ color: '#00e676' }}>Sincronización</span>
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl leading-relaxed font-medium">
          La disciplina más importante del 4DX. Sin reuniones frecuentes y estructuradas,
          los compromisos se evaporan en el torbellino.
        </p>
      </div>

      {/* Layout principal */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

        {/* Tarjeta de Reunión — Estilo Calendario (3 cols) */}
        <div
          className={`lg:col-span-3 rounded-2xl overflow-hidden border border-success/20 transition-all duration-700
            ${visible ? 'animate-fade-up-delay-1' : 'opacity-0'}`}
          style={{ boxShadow: '0 0 40px rgba(0,230,118,0.08)' }}
        >
          {/* Banner superior del calendario */}
          <div
            className="px-8 py-5 flex items-center justify-between"
            style={{
              background: 'linear-gradient(135deg, #00c853 0%, #00e676 50%, #69f0ae 100%)',
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-float">📅</span>
              <div>
                <p className="text-xs font-extrabold text-green-900/80 uppercase tracking-widest">
                  Reunión Semanal Fija
                </p>
                <p className="text-xl font-black text-green-900">
                  Cadencia 4DX — GLAM FAST
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
                <p className="text-xs font-bold text-green-900/80 uppercase">Duración</p>
                <p className="text-2xl font-black text-green-900">45 min</p>
              </div>
            </div>
          </div>

          {/* Cuerpo de la tarjeta */}
          <div className="bg-bg-card p-8">
            {/* Datos clave en grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {/* Frecuencia */}
              <div className="bg-bg-card-inner rounded-xl p-5 border border-border text-center">
                <span className="text-3xl block mb-2">🔄</span>
                <p className="text-xs text-text-muted uppercase tracking-widest font-bold mb-1">
                  Frecuencia
                </p>
                <p className="text-lg font-black text-text-primary">Semanal</p>
              </div>
              {/* Día y Hora */}
              <div
                className="bg-bg-card-inner rounded-xl p-5 border text-center"
                style={{ borderColor: 'rgba(0,230,118,0.3)' }}
              >
                <span className="text-3xl block mb-2">🕗</span>
                <p className="text-xs text-text-muted uppercase tracking-widest font-bold mb-1">
                  Día y Hora
                </p>
                <p className="text-base font-black" style={{ color: '#00e676' }}>
                  Lunes
                </p>
                <p className="text-sm font-bold text-text-secondary">
                  8:00 – 8:45 AM
                </p>
              </div>
              {/* Lugar */}
              <div className="bg-bg-card-inner rounded-xl p-5 border border-border text-center">
                <span className="text-3xl block mb-2">🏭</span>
                <p className="text-xs text-text-muted uppercase tracking-widest font-bold mb-1">
                  Lugar
                </p>
                <p className="text-sm font-black text-text-primary leading-tight">
                  Sala de Operaciones
                </p>
              </div>
            </div>

            {/* Regla visual */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs font-extrabold text-text-muted uppercase tracking-widest">
                Agenda de la Reunión
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Pasos de agenda */}
            <div className="space-y-4">
              {AGENDA_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 rounded-xl p-4 border border-border bg-bg-card-inner"
                >
                  {/* Número de paso */}
                  <div
                    className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-black"
                    style={{ backgroundColor: `${item.color}20`, color: item.color }}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-base">{item.icon}</span>
                      <p className="text-sm font-extrabold text-text-primary">{item.task}</p>
                    </div>
                    <p
                      className="text-xs font-bold uppercase tracking-wide mb-1"
                      style={{ color: item.color }}
                    >
                      {item.role}
                    </p>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel lateral: Reglas de la Cadencia (2 cols) */}
        <div
          className={`lg:col-span-2 flex flex-col gap-5 transition-all duration-700
            ${visible ? 'animate-fade-up-delay-2' : 'opacity-0'}`}
        >
          {/* Título */}
          <div className="rounded-xl p-5 border border-border bg-bg-card">
            <p className="text-sm font-extrabold text-text-muted uppercase tracking-widest mb-3">
              Las 4 Preguntas de la Reunión
            </p>
            {[
              { q: '¿Cuál fue el resultado de los compromisos de la semana pasada?' },
              { q: '¿Cuáles son las métricas actuales del marcador?' },
              { q: '¿Qué aprendimos? ¿Qué funcionó y qué no?' },
              { q: '¿Cuáles son los compromisos para esta semana?' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-border last:border-0">
                <span
                  className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black mt-0.5"
                  style={{ backgroundColor: 'rgba(0,230,118,0.15)', color: '#00e676' }}
                >
                  {i + 1}
                </span>
                <p className="text-sm text-text-secondary font-medium leading-snug">{item.q}</p>
              </div>
            ))}
          </div>

          {/* Reglas de conducta */}
          <div
            className="rounded-xl p-5 border animate-pulse-success"
            style={{
              borderColor: 'rgba(0,230,118,0.3)',
              background: 'rgba(0,230,118,0.04)',
            }}
          >
            <p className="text-sm font-extrabold uppercase tracking-widest mb-4" style={{ color: '#00e676' }}>
              🎯 Reglas de Conducta
            </p>
            {[
              '⏱️ Máximo 45 minutos. Sin excepción.',
              '📵 Sin celulares ni distractores.',
              '✅ Solo compromisos medibles y con fecha.',
              '🚫 No se discute el torbellino del día.',
            ].map((rule, i) => (
              <p key={i} className="text-xs text-text-secondary font-medium py-2 border-b border-border/50 last:border-0">
                {rule}
              </p>
            ))}
          </div>

          {/* Equipo responsable */}
          <div className="rounded-xl p-5 border border-border bg-bg-card">
            <p className="text-sm font-extrabold text-text-muted uppercase tracking-widest mb-4">
              👥 Equipo Responsable
            </p>
            {[
              { rol: 'Jefe de Logística', color: '#ff6d00' },
              { rol: 'Líderes de Turno', color: '#ffd600' },
              { rol: 'Operarios de Empaque', color: '#00e676' },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                <p className="text-sm text-text-secondary font-semibold">{p.rol}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
