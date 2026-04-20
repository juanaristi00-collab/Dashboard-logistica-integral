import React, { useRef, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip,
} from 'chart.js';
import LeadCard from './LeadCard';
import StatusBanner from './StatusBanner';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function SectionMCI1({ data }) {
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

  const lagCurrent = data.mci1_lag_returns;
  const lagTarget = 2;
  const lagStart = 8;
  const scanMet = data.mci1_lead_scanned >= 100;
  const stationsMet = data.mci1_lead_stations === true;
  const lagMet = lagCurrent <= lagTarget;
  const status = scanMet && stationsMet && lagMet ? 'WIN' : 'LOSE';

  const chartData = {
    labels: ['Inicio (8%)', 'Actual', 'Meta (2%)'],
    datasets: [{
      data: [lagStart, lagCurrent, lagTarget],
      backgroundColor: ['#616161', lagCurrent <= 5 ? '#00e676' : '#ff1744', '#e64a19'],
      borderRadius: 8,
      borderSkipped: false,
      barThickness: 48,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    scales: {
      y: { beginAtZero: true, max: 10, ticks: { color: '#9e9e9e', font: { family: 'Montserrat', weight: '700' } }, grid: { color: '#2a2a2a' } },
      x: { ticks: { color: '#9e9e9e', font: { family: 'Montserrat', weight: '600' } }, grid: { display: false } },
    },
  };

  return (
    <section
      id="mci-1"
      ref={sectionRef}
      className={`min-h-screen py-16 px-10 transition-all duration-700 ${visible ? 'animate-fade-up' : 'opacity-0'}`}
    >
      {/* Header */}
      <div className="border-l-4 border-accent pl-6 mb-10">
        <p className="text-sm font-extrabold text-accent tracking-widest uppercase mb-1">MCI 1 — Logística Inversa</p>
        <h2 className="text-4xl font-black text-text-primary leading-tight">Reducción de Devoluciones</h2>
        <p className="text-lg text-accent-bright font-bold mt-1">Del 8% al 2%</p>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-base leading-relaxed max-w-3xl mb-10">
        En la distribución de moda, evitar los retornos por errores de talla o color protege directamente el margen operativo 
        y aumenta la lealtad del cliente. Enfocarnos en la precisión del empaque es vital para sobrevivir al torbellino 
        del comercio electrónico <sup className="text-accent">[1]</sup>.
      </p>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Chart Card (3 cols) */}
        <div className="lg:col-span-3 bg-bg-card rounded-2xl p-8 border border-border">
          <p className="text-sm font-extrabold text-text-muted uppercase tracking-widest mb-6">Métrica Lag — Historial de Devoluciones (%)</p>
          <div className="h-72">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Lead Measures (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <p className="text-sm font-extrabold text-text-muted uppercase tracking-widest mb-2">Métricas Predictivas (Lead)</p>
          <LeadCard icon="📦" label="Pedidos Escaneados" value={data.mci1_lead_scanned} unit="%" met={scanMet} />
          <LeadCard icon="🏭" label="Estaciones Abastecidas" value={data.mci1_lead_stations ? '100' : '0'} unit="%" met={stationsMet} />
        </div>
      </div>

      <StatusBanner status={status} />
    </section>
  );
}
