import React, { useState, useEffect } from 'react';

/**
 * Sidebar — Panel de navegación lateral fijo de GLAM FAST 4DX Dashboard.
 * Links de anclaje con scroll suave hacia cada sección principal.
 */

const navItems = [
  {
    id: 'torbellino',
    label: 'El Torbellino',
    subtitle: 'Contexto Operativo',
    icon: '🌪️',
  },
  {
    id: 'mci-1',
    label: 'MCI 1',
    subtitle: 'Devoluciones',
    icon: '📦',
  },
  {
    id: 'mci-2',
    label: 'MCI 2',
    subtitle: 'Lead Time',
    icon: '⚡',
  },
  {
    id: 'cadencia',
    label: 'Cadencia',
    subtitle: 'Reunión Semanal',
    icon: '📅',
  },
];

export default function Sidebar({ onAdminClick }) {
  const [activeSection, setActiveSection] = useState('torbellino');

  // Detectar sección activa al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom > 250) {
            setActiveSection(item.id);
          }
        }
      }
    };

    const container = document.getElementById('main-scroll');
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <aside className="sticky top-0 left-0 h-screen w-64 flex-shrink-0 bg-bg-card border-r border-border flex flex-col z-50">

      {/* ── Logo / Branding GLAM FAST ── */}
      <div className="px-6 py-7 border-b border-border">
        <div className="flex items-center gap-3">
          {/* Logo ícono */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse-glow"
            style={{
              background: 'linear-gradient(135deg, #e65100 0%, #ff6d00 50%, #ffd600 100%)',
            }}
          >
            <span className="text-xl">✂️</span>
          </div>
          <div>
            <h1
              className="text-lg font-black leading-none tracking-tight shimmer-text"
            >
              GLAM FAST
            </h1>
            <p className="text-[10px] text-text-muted font-bold tracking-widest uppercase mt-0.5">
              4DX · Logística
            </p>
          </div>
        </div>

        {/* Subtítulo */}
        <div className="mt-4 px-3 py-2 rounded-lg bg-bg-card-inner border border-border">
          <p className="text-[10px] font-extrabold text-text-muted uppercase tracking-widest leading-tight">
            Tablero de Resultados
          </p>
          <p className="text-xs font-bold text-text-secondary mt-0.5">
            Transporte y Distribución
          </p>
        </div>
      </div>

      {/* ── Navegación ── */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
        <p className="text-[9px] font-extrabold text-text-muted uppercase tracking-widest px-2 mb-2">
          Secciones
        </p>

        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`group w-full text-left px-4 py-4 rounded-xl transition-all duration-300 cursor-pointer border
                ${isActive
                  ? 'border-accent bg-accent/10 shadow-lg shadow-accent-glow'
                  : 'border-transparent bg-transparent text-text-secondary hover:bg-bg-card-inner hover:border-border'
                }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div className="min-w-0">
                  <p
                    className={`text-sm font-extrabold tracking-wide leading-none
                      ${isActive ? 'text-accent-bright' : 'text-text-primary'}`}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`text-[11px] font-medium mt-0.5 truncate
                      ${isActive ? 'text-accent-bright/70' : 'text-text-muted'}`}
                  >
                    {item.subtitle}
                  </p>
                </div>
                {/* Indicador activo */}
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-bright flex-shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* ── Footer ── */}
      <div className="px-4 py-5 border-t border-border flex flex-col gap-3">
        {/* Botón Admin */}
        <button
          onClick={onAdminClick}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-accent/30
            text-accent-bright bg-accent/8 hover:bg-accent/15 hover:border-accent
            transition-all duration-300 font-bold cursor-pointer"
        >
          <span className="text-xl">⚙️</span>
          <div className="text-left">
            <p className="text-sm font-extrabold leading-none">Ingresar Datos</p>
            <p className="text-[10px] font-medium opacity-60 mt-0.5">Panel de Admin</p>
          </div>
        </button>

        {/* Marca universidad */}
        <div className="text-center">
          <p className="text-[9px] text-text-muted uppercase tracking-widest font-bold">
            Logística Integral
          </p>
          <p className="text-[9px] text-text-muted uppercase tracking-widest font-bold">
            Universidad S-7 · 2026
          </p>
        </div>
      </div>
    </aside>
  );
}
