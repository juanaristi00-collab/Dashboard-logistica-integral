import React, { useState, useEffect } from 'react';

const navItems = [
  { id: 'mci-1', label: 'MCI 1', subtitle: 'Devoluciones', icon: '📦' },
  { id: 'mci-2', label: 'MCI 2', subtitle: 'Lead Time',    icon: '⚡' },
  { id: 'mci-3', label: 'MCI 3', subtitle: 'Perfect Order', icon: '🎯' },
];

export default function Sidebar({ onAdminClick }) {
  const [activeSection, setActiveSection] = useState('mci-1');

  useEffect(() => {
    const handleScroll = () => {
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 200) {
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
      {/* Logo / Branding */}
      <div className="px-6 py-8 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-white text-xl font-black">4D</span>
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-text-primary tracking-tight leading-none">4DX</h1>
            <p className="text-xs text-text-muted font-semibold tracking-widest uppercase">Scoreboard</p>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`group w-full text-left px-4 py-4 rounded-xl transition-all duration-300 cursor-pointer border
              ${activeSection === item.id
                ? 'bg-accent/15 border-accent text-accent-bright shadow-lg shadow-accent-glow'
                : 'bg-transparent border-transparent text-text-secondary hover:bg-bg-card-inner hover:text-text-primary hover:border-border'
              }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className={`text-sm font-extrabold tracking-wide ${activeSection === item.id ? 'text-accent-bright' : ''}`}>{item.label}</p>
                <p className="text-xs font-medium opacity-70">{item.subtitle}</p>
              </div>
            </div>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-5 border-t border-border flex flex-col gap-3">
        {/* Admin Button */}
        <button
          onClick={onAdminClick}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-accent/40 text-accent-bright bg-accent/10 hover:bg-accent/20 hover:border-accent transition-all duration-300 font-bold cursor-pointer"
        >
          <span className="text-xl">⚙️</span>
          <div className="text-left">
            <p className="text-sm font-extrabold leading-none">Ingresar Datos</p>
            <p className="text-[10px] font-medium opacity-60 mt-0.5">Panel de Admin</p>
          </div>
        </button>

        <p className="text-[10px] text-text-muted uppercase tracking-widest text-center">Logística Integral</p>
        <p className="text-[10px] text-text-muted uppercase tracking-widest text-center">Universidad S-7</p>
      </div>
    </aside>
  );
}
