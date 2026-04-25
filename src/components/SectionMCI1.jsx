import React, { useRef, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, LineElement, PointElement,
} from 'chart.js';
import LeadProgressBar from './LeadProgressBar';
import StatusBanner from './StatusBanner';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, LineElement, PointElement);

/**
 * SectionMCI1 — Disciplinas 1 y 2: MCI 1 — Logística Inversa
 * Lag: Reducir tasa de devoluciones del 8% al 5.5% para el 30/Nov/2026.
 * Lead: 3 palancas de predicción.
 */
export default function SectionMCI1({ data }) {
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

  // ── Métricas Lag ──
  const lagStart   = 8;          // Punto de inicio (%)
  const lagCurrent = data.mci1_lag_returns;  // Valor actual (%)
  const lagTarget  = 5.5;        // Meta (%)
  const lagMet     = lagCurrent <= lagTarget;

  // ── Métricas Lead (3 palancas) ──
  const scannerMet     = data.mci1_lead_scanner >= 100;
  const auditsMet      = data.mci1_lead_audits >= 15;
  const reintegMet     = data.mci1_lead_reintegration >= 100;

  // ── Estado global: ¿Ganando? ──
  // Para ganar, las 3 palancas deben estar cumplidas (lag es rezago, refleja el futuro)
  const status = scannerMet && auditsMet && reintegMet ? 'WIN' : 'LOSE';

  // ── Gráfico de barras — Tendencia descendente ──
  const chartData = {
    labels: ['Inicio\n(Ago 2026)', 'Actual\n(Abr 2026)', 'Meta\n(Nov 2026)'],
    datasets: [
      {
        label: 'Tasa de Devoluciones (%)',
        data: [lagStart, lagCurrent, lagTarget],
        backgroundColor: [
          'rgba(117, 117, 117, 0.7)',                                     // Gris — Inicio
          lagCurrent <= lagTarget ? 'rgba(0,230,118,0.8)' : 'rgba(255,109,0,0.85)', // Verde o Naranja — Actual
          'rgba(0,200,83,0.9)',                                           // Verde — Meta
        ],
        borderRadius: 10,
        borderSkipped: false,
        barThickness: 56,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.y}% de devoluciones`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          color: '#757575',
          font: { family: 'Montserrat', weight: '700', size: 11 },
          callback: (v) => `${v}%`,
        },
        grid: { color: '#222' },
      },
      x: {
        ticks: {
          color: '#bdbdbd',
          font: { family: 'Montserrat', weight: '700', size: 11 },
        },
        grid: { display: false },
      },
    },
  };

  return (
    <section
      id="mci-1"
      ref={sectionRef}
      className={`min-h-screen py-20 px-10 border-t border-border relative overflow-hidden
        transition-all duration-700 ${visible ? 'animate-fade-up' : 'opacity-0'}`}
    >
      {/* Gradiente de fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 80% 20%, rgba(255,109,0,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <div className="border-l-4 border-accent-bright pl-6 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 mb-3">
          <span className="text-xs font-extrabold text-accent-bright uppercase tracking-widest">
            Disciplinas 1 y 2 — MCI 1
          </span>
        </div>
        <h2 className="text-4xl font-black text-text-primary leading-tight">
          Reducción de Devoluciones
        </h2>
        <p className="text-base font-bold mt-1" style={{ color: '#ff6d00' }}>
          Logística Inversa · Meta: 30 de Noviembre 2026
        </p>

        {/* Pill de meta Lag */}
        <div className="flex items-center gap-3 mt-4 flex-wrap">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-bg-card border border-border">
            <span className="text-sm text-text-muted font-semibold">Inicio:</span>
            <span className="text-sm font-black text-danger">8.0%</span>
          </div>
          <span className="text-text-muted text-lg font-black">→</span>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-bg-card border border-border">
            <span className="text-sm text-text-muted font-semibold">Actual:</span>
            <span
              className="text-sm font-black"
              style={{ color: lagMet ? '#00e676' : '#ff6d00' }}
            >
              {lagCurrent}%
            </span>
          </div>
          <span className="text-text-muted text-lg font-black">→</span>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full border"
            style={{ borderColor: 'rgba(0,230,118,0.4)', background: 'rgba(0,230,118,0.08)' }}
          >
            <span className="text-sm text-text-muted font-semibold">Meta:</span>
            <span className="text-sm font-black text-success">5.5%</span>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <p className="text-text-secondary text-base leading-relaxed max-w-3xl mb-10 font-medium">
        En la distribución de moda rápida, cada prenda devuelta por error de picking o talla
        representa un costo directo de reversa logística. Reducir la tasa de devoluciones del{' '}
        <strong className="text-text-primary">8% al 5.5%</strong> protege el margen operativo
        y aumenta el NPS de GLAM FAST.
      </p>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
        {/* Gráfico Lag (3 cols) */}
        <div className="lg:col-span-3 bg-bg-card rounded-2xl p-8 border border-border">
          <p className="text-xs font-extrabold text-text-muted uppercase tracking-widest mb-1">
            Métrica Lag — Tasa de Devoluciones (%)
          </p>
          <p className="text-xs text-text-muted mb-6">
            Tendencia objetivo descendente hacia la meta del 5.5%
          </p>
          <div className="h-72">
            <Bar data={chartData} options={chartOptions} />
          </div>

          {/* Flecha de tendencia */}
          <div className="flex items-center justify-center gap-2 mt-4 px-4 py-2 rounded-xl bg-bg-card-inner border border-border">
            <span className="text-success text-lg">↓</span>
            <p className="text-xs text-text-secondary font-semibold">
              Objetivo: reducir <strong className="text-text-primary">2.5 puntos porcentuales</strong> antes del 30/Nov/2026
            </p>
          </div>
        </div>

        {/* Lead Measures (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <p className="text-xs font-extrabold text-text-muted uppercase tracking-widest">
            Métricas Predictivas (Lead) — Las 3 Palancas
          </p>

          <LeadProgressBar
            icon="📷"
            label="Verificación cruzada con escáner por prenda"
            current={data.mci1_lead_scanner}
            target={100}
            unit="%"
            description="Meta: 100% de prendas verificadas con escáner antes del empaque."
          />

          <LeadProgressBar
            icon="🕵️"
            label="Auditoría sorpresiva de paquetes cerrados"
            current={data.mci1_lead_audits}
            target={15}
            unit="paq/turno"
            description="Meta: 15 paquetes auditados por turno de forma aleatoria."
          />

          <LeadProgressBar
            icon="♻️"
            label="Reintegración rápida de devoluciones a inventario"
            current={data.mci1_lead_reintegration}
            target={100}
            unit="%"
            description="Meta: 100% de devoluciones reintegradas en menos de 2 horas."
          />
        </div>
      </div>

      <StatusBanner status={status} />
    </section>
  );
}
