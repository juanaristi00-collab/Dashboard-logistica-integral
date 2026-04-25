import React, { useRef, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip,
} from 'chart.js';
import LeadProgressBar from './LeadProgressBar';
import StatusBanner from './StatusBanner';

ChartJS.register(ArcElement, Tooltip);

/**
 * Plugin personalizado: dibuja el valor central en el gauge (donut semicircular)
 */
const gaugeCenterPlugin = {
  id: 'gaugeCenterMCI2',
  afterDraw(chart) {
    const { ctx, width, height } = chart;
    const currentLT = chart.config._currentLT ?? 0;
    const targetLT  = chart.config._targetLT  ?? 0;
    const isMet     = currentLT <= targetLT;

    ctx.save();

    // Valor numérico grande
    ctx.font = '900 44px Montserrat, sans-serif';
    ctx.fillStyle = isMet ? '#00e676' : currentLT <= 3.6 ? '#ff9100' : '#ff1744';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${currentLT}h`, width / 2, height * 0.62);

    // Etiqueta
    ctx.font = '700 12px Montserrat, sans-serif';
    ctx.fillStyle = '#757575';
    ctx.fillText('Lead Time Actual', width / 2, height * 0.62 + 32);

    ctx.restore();
  },
};

/**
 * SectionMCI2 — Disciplinas 1 y 2: MCI 2 — Aceleración del Lead Time
 * Lag: Disminuir el tiempo de empaque de 4h a 3.2h para el 31/Dic/2026.
 * Lead: 3 palancas de predicción.
 */
export default function SectionMCI2({ data }) {
  const sectionRef = useRef(null);
  const [visible, setVisible]   = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Métricas Lag ──
  const lagStart   = 4.0;                       // Punto de inicio (horas)
  const lagCurrent = data.mci2_lag_lead_time;   // Valor actual
  const lagTarget  = 3.2;                       // Meta (horas)
  const lagMet     = lagCurrent <= lagTarget;

  // ── Métricas Lead (3 palancas) ──
  const stationsMet    = data.mci2_lead_stations >= 100;
  const dispatchMet    = data.mci2_lead_dispatch >= 40;
  const maintenanceMet = data.mci2_lead_maintenance >= 90;

  // ── Estado global ──
  const status = stationsMet && dispatchMet && maintenanceMet ? 'WIN' : 'LOSE';

  // ── Gauge (donut semicircular) ──
  const maxLT   = 4.5;  // máximo visual de la escala
  const gaugeVal = Math.min(lagCurrent, maxLT);
  const gaugeColor = lagMet
    ? '#00e676'
    : lagCurrent <= 3.6
    ? '#ff9100'
    : '#ff1744';

  const gaugeData = {
    datasets: [
      {
        data: [gaugeVal, maxLT - gaugeVal],
        backgroundColor: [gaugeColor, '#1e1e1e'],
        borderWidth: 0,
        circumference: 180,
        rotation: -90,
        borderRadius: 8,
      },
    ],
  };

  const gaugeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '76%',
    plugins: {
      legend:  { display: false },
      tooltip: { enabled: false },
    },
  };

  // Pasamos los valores al plugin via config
  const chartRef = React.useRef(null);
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.config._currentLT = lagCurrent;
      chartRef.current.config._targetLT  = lagTarget;
      chartRef.current.update();
    }
  }, [lagCurrent, lagTarget]);

  return (
    <section
      id="mci-2"
      ref={sectionRef}
      className={`min-h-screen py-20 px-10 border-t border-border relative overflow-hidden
        transition-all duration-700 ${visible ? 'animate-fade-up' : 'opacity-0'}`}
    >
      {/* Gradiente fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 20% 80%, rgba(255,214,0,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <div className="border-l-4 pl-6 mb-12" style={{ borderColor: '#ffd600' }}>
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3"
          style={{ backgroundColor: 'rgba(255,214,0,0.1)', borderColor: 'rgba(255,214,0,0.3)' }}
        >
          <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#ffd600' }}>
            Disciplinas 1 y 2 — MCI 2
          </span>
        </div>
        <h2 className="text-4xl font-black text-text-primary leading-tight">
          Aceleración del Lead Time
        </h2>
        <p className="text-base font-bold mt-1" style={{ color: '#ffd600' }}>
          Aceleración de Empaque · Meta: 31 de Diciembre 2026
        </p>

        {/* Pills de progreso */}
        <div className="flex items-center gap-3 mt-4 flex-wrap">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-bg-card border border-border">
            <span className="text-sm text-text-muted font-semibold">Inicio:</span>
            <span className="text-sm font-black text-danger">4.0h</span>
          </div>
          <span className="text-text-muted text-lg font-black">→</span>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-bg-card border border-border">
            <span className="text-sm text-text-muted font-semibold">Actual:</span>
            <span className="text-sm font-black" style={{ color: gaugeColor }}>{lagCurrent}h</span>
          </div>
          <span className="text-text-muted text-lg font-black">→</span>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full border"
            style={{ borderColor: 'rgba(0,230,118,0.4)', background: 'rgba(0,230,118,0.08)' }}
          >
            <span className="text-sm text-text-muted font-semibold">Meta:</span>
            <span className="text-sm font-black text-success">3.2h</span>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <p className="text-text-secondary text-base leading-relaxed max-w-3xl mb-10 font-medium">
        El Lead Time de empaque y preparación es el cuello de botella más crítico en la
        promesa de entrega de GLAM FAST. Reducirlo de{' '}
        <strong className="text-text-primary">4 horas a 3.2 horas</strong> libera capacidad
        operativa y habilita el despacho en ventana de entrega día siguiente.
      </p>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">

        {/* Gauge Card (3 cols) */}
        <div className="lg:col-span-3 bg-bg-card rounded-2xl p-8 border border-border">
          <p className="text-xs font-extrabold text-text-muted uppercase tracking-widest mb-1">
            Métrica Lag — Velocímetro de Lead Time
          </p>
          <p className="text-xs text-text-muted mb-4">
            Tiempo de empaque y preparación de pedidos (horas)
          </p>

          {/* Gauge */}
          <div className="h-64 flex items-end justify-center">
            <div className="w-full max-w-sm h-full">
              <Doughnut
                ref={chartRef}
                data={gaugeData}
                options={gaugeOptions}
                plugins={[gaugeCenterPlugin]}
              />
            </div>
          </div>

          {/* Escala */}
          <div className="flex justify-between mt-2 px-6 text-xs font-bold text-text-muted">
            <span>0h</span>
            <span className="text-success">3.2h ✓ Meta</span>
            <span style={{ color: '#ff9100' }}>3.6h</span>
            <span className="text-danger">4.5h</span>
          </div>

          {/* Barra de progreso hacia la meta */}
          <div className="mt-6 p-4 rounded-xl bg-bg-card-inner border border-border">
            <div className="flex justify-between text-xs font-bold text-text-muted mb-2">
              <span>Progreso hacia la meta</span>
              <span style={{ color: gaugeColor }}>
                {Math.round(((lagStart - lagCurrent) / (lagStart - lagTarget)) * 100)}% completado
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-bg-primary overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${Math.min(100, Math.round(((lagStart - lagCurrent) / (lagStart - lagTarget)) * 100))}%`,
                  backgroundColor: gaugeColor,
                  boxShadow: `0 0 8px ${gaugeColor}60`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Lead Measures (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <p className="text-xs font-extrabold text-text-muted uppercase tracking-widest">
            Métricas Predictivas (Lead) — Las 3 Palancas
          </p>

          <LeadProgressBar
            icon="📦"
            label="Abastecimiento preventivo de estaciones de empaque"
            current={data.mci2_lead_stations}
            target={100}
            unit="%"
            description="Meta: 100% de estaciones listas 15 min antes de iniciar el turno."
          />

          <LeadProgressBar
            icon="🚀"
            label="Despacho prioritario en ventana de 2 horas"
            current={data.mci2_lead_dispatch}
            target={40}
            unit="%"
            description='Meta: ≥40% de pedidos etiquetados como "Entrega Día Siguiente".'
          />

          <LeadProgressBar
            icon="🔧"
            label="Mantenimiento preventivo fin de turno a equipos clave"
            current={data.mci2_lead_maintenance}
            target={90}
            unit="%"
            description="Meta: ≥90% de turnos con mantenimiento de 10 min al cierre."
          />
        </div>
      </div>

      <StatusBanner status={status} />
    </section>
  );
}
