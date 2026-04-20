import React, { useRef, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip,
} from 'chart.js';
import LeadCard from './LeadCard';
import StatusBanner from './StatusBanner';

ChartJS.register(ArcElement, Tooltip);

// Custom center text plugin for the gauge
const gaugeNeedlePlugin = {
  id: 'gaugeCenter',
  afterDraw(chart) {
    const { ctx, width, height } = chart;
    const meta = chart.getDatasetMeta(0);
    if (!meta || !meta.data || !meta.data[0]) return;
    const value = chart.data.datasets[0].data[0];
    ctx.save();
    ctx.font = '900 42px Montserrat';
    ctx.fillStyle = '#ff6e40';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${value}h`, width / 2, height * 0.6);
    ctx.font = '600 14px Montserrat';
    ctx.fillStyle = '#9e9e9e';
    ctx.fillText('Lead Time', width / 2, height * 0.6 + 30);
    ctx.restore();
  }
};

export default function SectionMCI2({ data }) {
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

  const currentLT = data.mci2_lag_lead_time;
  const targetLT = 1;
  const maxLT = 5;
  const priorityMet = data.mci2_lead_priority_dispatch >= 90;
  const maintenanceMet = data.mci2_lead_maintenance === true;
  const lagMet = currentLT <= targetLT;
  const status = priorityMet && maintenanceMet && lagMet ? 'WIN' : 'LOSE';

  // Semicircle gauge
  const gaugeData = {
    labels: ['Actual', 'Restante'],
    datasets: [{
      data: [currentLT, maxLT - currentLT],
      backgroundColor: [currentLT <= 2 ? '#00e676' : currentLT <= 3 ? '#ff9100' : '#ff1744', '#1c1c1c'],
      borderWidth: 0,
      circumference: 180,
      rotation: -90,
      borderRadius: 6,
    }],
  };

  const gaugeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '78%',
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  };

  return (
    <section
      id="mci-2"
      ref={sectionRef}
      className={`min-h-screen py-16 px-10 border-t border-border transition-all duration-700 ${visible ? 'animate-fade-up' : 'opacity-0'}`}
    >
      {/* Header */}
      <div className="border-l-4 border-accent pl-6 mb-10">
        <p className="text-sm font-extrabold text-accent tracking-widest uppercase mb-1">MCI 2 — Agilidad en Última Milla</p>
        <h2 className="text-4xl font-black text-text-primary leading-tight">Disminución del Lead Time</h2>
        <p className="text-lg text-accent-bright font-bold mt-1">De 4 horas a 1 hora</p>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-base leading-relaxed max-w-3xl mb-10">
        El tiempo de ciclo (Lead Time) es el indicador que mide el tiempo exacto transcurrido desde que se prepara 
        el pedido hasta que sale a ruta. Acortar este ciclo es el único camino para garantizar entregas en 24 horas 
        y satisfacer la exigencia de inmediatez del consumidor actual.
      </p>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Gauge Card (3 cols) */}
        <div className="lg:col-span-3 bg-bg-card rounded-2xl p-8 border border-border">
          <p className="text-sm font-extrabold text-text-muted uppercase tracking-widest mb-6">Métrica Lag — Velocímetro de Lead Time</p>
          <div className="h-72 flex items-end justify-center">
            <div className="w-full max-w-md h-full">
              <Doughnut data={gaugeData} options={gaugeOptions} plugins={[gaugeNeedlePlugin]} />
            </div>
          </div>
          {/* Scale */}
          <div className="flex justify-between mt-4 px-8 text-xs font-bold text-text-muted">
            <span>0h</span>
            <span className="text-success">1h (Meta)</span>
            <span className="text-accent-bright">3h</span>
            <span className="text-danger">5h</span>
          </div>
        </div>

        {/* Lead Measures (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <p className="text-sm font-extrabold text-text-muted uppercase tracking-widest mb-2">Métricas Predictivas (Lead)</p>
          <LeadCard icon="🚀" label="Despachos Prioritarios (2h)" value={data.mci2_lead_priority_dispatch} unit="%" met={priorityMet} />
          <LeadCard icon="🔧" label="Mantenimiento Preventivo" value={data.mci2_lead_maintenance ? '100' : '0'} unit="%" met={maintenanceMet} />
        </div>
      </div>

      <StatusBanner status={status} />
    </section>
  );
}
