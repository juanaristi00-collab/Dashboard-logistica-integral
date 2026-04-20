import React, { useState } from 'react';

export default function AdminDrawer({ data, onSave, onClose }) {
  const [form, setForm] = useState({
    // MCI 1
    mci1_lag_returns: data.mci1_lag_returns,
    mci1_lead_scanned: data.mci1_lead_scanned,
    mci1_lead_stations: data.mci1_lead_stations ? 'SI' : 'NO',
    // MCI 2
    mci2_lag_lead_time: data.mci2_lag_lead_time,
    mci2_lead_priority_dispatch: data.mci2_lead_priority_dispatch,
    mci2_lead_maintenance: data.mci2_lead_maintenance ? 'SI' : 'NO',
    // MCI 3
    mci3_lag_perfect_order: data.mci3_lag_perfect_order,
    mci3_lead_weight_check: data.mci3_lead_weight_check,
    mci3_lead_dock_time: data.mci3_lead_dock_time,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave({
      mci1_lag_returns: parseFloat(form.mci1_lag_returns),
      mci1_lead_scanned: parseFloat(form.mci1_lead_scanned),
      mci1_lead_stations: form.mci1_lead_stations === 'SI',

      mci2_lag_lead_time: parseFloat(form.mci2_lag_lead_time),
      mci2_lead_priority_dispatch: parseFloat(form.mci2_lead_priority_dispatch),
      mci2_lead_maintenance: form.mci2_lead_maintenance === 'SI',

      mci3_lag_perfect_order: parseFloat(form.mci3_lag_perfect_order),
      mci3_lead_weight_check: parseFloat(form.mci3_lead_weight_check),
      mci3_lead_dock_time: parseFloat(form.mci3_lead_dock_time),
    });
    onClose();
  };

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Drawer Panel */}
      <div className="relative h-full w-full max-w-lg bg-bg-card border-l border-border flex flex-col overflow-hidden"
        style={{ animation: 'slideInRight 0.35s cubic-bezier(0.16,1,0.3,1) both' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-border flex-shrink-0">
          <div>
            <h2 className="text-xl font-extrabold text-text-primary tracking-tight">Panel de Control</h2>
            <p className="text-xs text-text-muted uppercase tracking-widest mt-1">Ingreso de Datos — Admin</p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors text-2xl leading-none cursor-pointer"
          >✕</button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">

          {/* MCI 1 */}
          <FormSection title="📦 MCI 1 — Devoluciones" color="text-accent-bright">
            <FormRow label="Tasa de Devoluciones (%) [Lag]" name="mci1_lag_returns" value={form.mci1_lag_returns} onChange={handleChange} type="number" step="0.1" />
            <FormRow label="Pedidos Escaneados (%) [Lead 1]" name="mci1_lead_scanned" value={form.mci1_lead_scanned} onChange={handleChange} type="number" />
            <FormSelect label="Estaciones Abastecidas [Lead 2]" name="mci1_lead_stations" value={form.mci1_lead_stations} onChange={handleChange} />
          </FormSection>

          {/* MCI 2 */}
          <FormSection title="⚡ MCI 2 — Lead Time" color="text-accent-bright">
            <FormRow label="Lead Time Actual (horas) [Lag]" name="mci2_lag_lead_time" value={form.mci2_lag_lead_time} onChange={handleChange} type="number" step="0.1" />
            <FormRow label="Despachos Prioritarios (%) [Lead 3]" name="mci2_lead_priority_dispatch" value={form.mci2_lead_priority_dispatch} onChange={handleChange} type="number" />
            <FormSelect label="Mantenimiento Preventivo [Lead 4]" name="mci2_lead_maintenance" value={form.mci2_lead_maintenance} onChange={handleChange} />
          </FormSection>

          {/* MCI 3 */}
          <FormSection title="🎯 MCI 3 — Perfect Order" color="text-accent-bright">
            <FormRow label="Índice Perfect Order (%) [Lag]" name="mci3_lag_perfect_order" value={form.mci3_lag_perfect_order} onChange={handleChange} type="number" step="0.1" />
            <FormRow label="Validación de Peso (%) [Lead 5]" name="mci3_lead_weight_check" value={form.mci3_lead_weight_check} onChange={handleChange} type="number" />
            <FormRow label="Traslado a Muelle (%) [Lead 6]" name="mci3_lead_dock_time" value={form.mci3_lead_dock_time} onChange={handleChange} type="number" />
          </FormSection>
        </div>

        {/* Footer Buttons */}
        <div className="px-8 py-5 border-t border-border flex gap-4 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-border text-text-secondary font-bold hover:bg-bg-card-inner transition-all cursor-pointer"
          >Cancelar</button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-xl font-black text-white transition-all cursor-pointer animate-pulse-glow"
            style={{ background: 'linear-gradient(135deg, #e64a19, #ff6e40)' }}
          >💾 Guardar y Actualizar</button>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* Helper Sub-Components */
function FormSection({ title, color, children }) {
  return (
    <div>
      <h3 className={`text-sm font-extrabold uppercase tracking-widest mb-4 ${color}`}>{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function FormRow({ label, name, value, onChange, type = 'text', step }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        step={step}
        className="w-full px-4 py-3 rounded-xl bg-bg-card-inner border border-border text-text-primary font-bold text-base focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}

function FormSelect({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl bg-bg-card-inner border border-border text-text-primary font-bold text-base focus:outline-none focus:border-accent transition-colors"
      >
        <option value="SI">✓ Sí — Cumplido</option>
        <option value="NO">✗ No — Fallo</option>
      </select>
    </div>
  );
}
