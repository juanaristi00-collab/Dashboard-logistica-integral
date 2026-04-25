import React, { useRef, useEffect, useState } from 'react';

/**
 * SectionTorbellino — Sección 1: Contexto Operativo
 * El "Torbellino" logístico: los 4 grandes retos del sector de moda.
 */

const RETOS = [
  {
    id: 1,
    icon: '💥',
    title: 'Explosión de Referencias',
    subtitle: 'Picking de alta presión',
    description:
      'Cientos de SKUs por colección exigen agilidad extrema en el centro de distribución. Un error de picking dispara el efecto cascada de devoluciones.',
    color: '#ff6d00',
    glowColor: 'rgba(255,109,0,0.2)',
    delay: 'animate-fade-up-delay-1',
  },
  {
    id: 2,
    icon: '📦',
    title: 'Altas Tasas de Devolución',
    subtitle: 'Logística Inversa',
    description:
      'El e-commerce de moda registra hasta un 30% de devoluciones. Cada retorno no gestionado cuesta tiempo, inventario y satisfacción del cliente.',
    color: '#ff1744',
    glowColor: 'rgba(255,23,68,0.2)',
    delay: 'animate-fade-up-delay-2',
  },
  {
    id: 3,
    icon: '📈',
    title: 'Picos de Demanda Estacionales',
    subtitle: 'Black Friday · Navidad',
    description:
      'El volumen de pedidos puede multiplicarse x5 en temporadas clave. Sin procesos estandarizados, el torbellino colapsa la operación.',
    color: '#ffd600',
    glowColor: 'rgba(255,214,0,0.2)',
    delay: 'animate-fade-up-delay-3',
  },
  {
    id: 4,
    icon: '⚡',
    title: 'Exigencia en Inmediatez',
    subtitle: 'Última Milla · 24h – 48h',
    description:
      'El consumidor actual exige entrega el mismo día o al día siguiente. El lead time de empaque es el cuello de botella más crítico de GLAM FAST.',
    color: '#00e676',
    glowColor: 'rgba(0,230,118,0.2)',
    delay: 'animate-fade-up-delay-4',
  },
];

export default function SectionTorbellino() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="torbellino"
      ref={sectionRef}
      className="min-h-screen py-20 px-10 relative overflow-hidden"
    >
      {/* Fondo decorativo con gradiente radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(230,81,0,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <div className={`mb-14 transition-all duration-700 ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
        {/* Chip de área */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/40 bg-accent/10 mb-6">
          <span className="w-2 h-2 rounded-full bg-accent-bright animate-pulse" />
          <span className="text-xs font-extrabold text-accent-bright uppercase tracking-widest">
            Área Logística — Transporte y Distribución
          </span>
        </div>

        {/* Título principal */}
        <h2 className="text-5xl font-black text-text-primary leading-tight mb-3">
          El{' '}
          <span className="shimmer-text">Torbellino</span>
          {' '}Logístico
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl leading-relaxed font-medium">
          Antes de medir resultados, hay que entender el caos diario que amenaza la operación.
          Estos son los 4 grandes retos que combatimos en GLAM FAST con disciplina y datos.
        </p>
      </div>

      {/* Grilla de retos */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {RETOS.map((reto) => (
          <div
            key={reto.id}
            className={`group relative rounded-2xl p-7 border transition-all duration-500 cursor-default
              ${visible ? reto.delay : 'opacity-0'}`}
            style={{
              background: `linear-gradient(135deg, ${reto.glowColor} 0%, rgba(22,22,22,0.9) 100%)`,
              borderColor: `${reto.color}30`,
            }}
          >
            {/* Número decorativo */}
            <span
              className="absolute top-4 right-5 text-6xl font-black opacity-5 select-none"
              style={{ color: reto.color }}
            >
              {reto.id}
            </span>

            {/* Ícono */}
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300"
              style={{ backgroundColor: `${reto.color}15`, border: `1px solid ${reto.color}30` }}
            >
              {reto.icon}
            </div>

            {/* Texto */}
            <h3
              className="text-lg font-extrabold mb-1 leading-tight"
              style={{ color: reto.color }}
            >
              {reto.title}
            </h3>
            <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3">
              {reto.subtitle}
            </p>
            <p className="text-sm text-text-secondary leading-relaxed font-medium">
              {reto.description}
            </p>

            {/* Línea inferior decorativa */}
            <div
              className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: reto.color }}
            />
          </div>
        ))}
      </div>

      {/* Indicador de scroll */}
      <div className={`flex flex-col items-center mt-16 gap-2 ${visible ? 'animate-fade-up-delay-4' : 'opacity-0'}`}>
        <p className="text-xs text-text-muted uppercase tracking-widest font-bold">
          Scroll para ver los MCIs
        </p>
        <div className="w-5 h-8 rounded-full border border-border flex items-start justify-center pt-1.5 animate-bounce">
          <div className="w-1 h-2 bg-accent-bright rounded-full" />
        </div>
      </div>
    </section>
  );
}
