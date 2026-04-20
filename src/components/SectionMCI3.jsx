import React, { useRef, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import LeadCard from './LeadCard';
import StatusBanner from './StatusBanner';

ChartJS.register(ArcElement, Tooltip, Legend);

// Center text plugin for the doughnut
const centerTextPlugin = {
  id: 'centerText',
  afterDraw(chart) {
    const { ctx, width, height } = chart;
    const value = chart.data.datasets[0].data[0];
    ctx.save();
    ctx.font = '900 52px Montserrat';
    ctx.fillStyle = '#ff6e40';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${value}%`, width / 2, height / 2 - 8);
    ctx.font = '600 13px Montserrat';
    ctx.fillStyle = '#9e9e9e';
    ctx.fillText('Perfect Order', width / 2, height / 2 + 28);
    ctx.restore();
  }
};

export default function SectionMCI3({ data }) {
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

  const perfectOrder = data.mci3_lag_perfect_order;
  const weightMet = data.mci3_lead_weight_check >= 100;
  const dockMet = data.mci3_lead_dock_time >= 95;
  const lagMet = perfectOrder >= 98;
  const status = weightMet && dockMet && lagMet ? 'WIN' : 'LOSE';

  const donutData = {
    labels: ['Logrado', 'Faltante'],
    datasets: [{
      data: [perfectOrder, 100 - perfectOrder],
      backgroundColor: [perfectOrder >= 95 ? '#e64a19' : '#ff1744', '#1c1c1c'],
      borderWidth: 0,
      borderRadius: 6,
    }],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <section
      id="mci-3"
      ref={sectionRef}
      className={`min-h-screen py-16 px-10 border-t border-border transition-all duration-700 ${visible ? 'animate-fade-up' : 'opacity-0'}`}
    >
      {/* Header */}
      <div className="border-l-4 border-accent pl-6 mb-10">
        <p className="text-sm font-extrabold text-accent tracking-widest uppercase mb-1">MCI 3 — Perfección de Órdenes</p>
        <h2 className="text-4xl font-black text-text-primary leading-tight">Aumento del Perfect Order</h2>
        <p className="text-lg text-accent-bright font-bold mt-1">Del 89% al 98%</p>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-base leading-relaxed max-w-3xl mb-10">
        El índice de la orden perfecta significa tomar y cumplir el pedido sin fallas, asignando el inventario de inmediato, 
        entregando a tiempo y con la factura exacta. Una sola prenda faltante en un envío frustra la experiencia 
        del cliente y detona una reclamación.
      </p>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Doughnut Card (3 cols) */}
        <div className="lg:col-span-3 bg-bg-card rounded-2xl p-8 border border-border">
          <p className="text-sm font-extrabold text-text-muted uppercase tracking-widest mb-6">Métrica Lag — Índice Perfect Order</p>
          <div className="h-80 flex items-center justify-center">
            <div className="w-full max-w-xs h-full">
              <Doughnut data={donutData} options={donutOptions} plugins={[centerTextPlugin]} />
            </div>
          </div>
        </div>

        {/* Lead Measures (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <p className="text-sm font-extrabold text-text-muted uppercase tracking-widest mb-2">Métricas Predictivas (Lead)</p>
          <LeadCard icon="⚖️" label="Validación de Peso" value={data.mci3_lead_weight_check} unit="%" met={weightMet} />
          <LeadCard icon="🚚" label="Horario Traslado a Muelle" value={data.mci3_lead_dock_time} unit="%" met={dockMet} />
        </div>
      </div>

      <StatusBanner status={status} />
    </section>
  );
}
