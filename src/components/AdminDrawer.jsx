import React, { useState } from 'react';

/**
 * AdminDrawer — Panel lateral de administración para actualizar datos del tablero.
 * Cubre las 6 palancas Lead + 2 métricas Lag del brief de GLAM FAST.
 */
export default function AdminDrawer({ data, onSave, onClose }) {
  const [form, setForm] = useState({
    // MCI 1 — Logística Inversa
    mci1_lag_returns:         data.mci1_lag_returns,
    mci1_lead_scanner:        data.mci1_lead_scanner,
    mci1_lead_audits:         data.mci1_lead_audits,
    mci1_lead_reintegration:  data.mci1_lead_reintegration,
    // MCI 2 — Aceleración Lead Time
    mci2_lag_lead_time:       data.mci2_lag_lead_time,
    mci2_lead_stations:       data.mci2_lead_stations,
    mci2_lead_dispatch:       data.mci2_lead_dispatch,
    mci2_lead_maintenance:    data.mci2_lead_maintenance,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave({
      mci1_lag_returns:         parseFloat(form.mci1_lag_returns),
      mci1_lead_scanner:        parseFloat(form.mci1_lead_scanner),
      mci1_lead_audits:         parseFloat(form.mci1_lead_audits),
      mci1_lead_reintegration:  parseFloat(form.mci1_lead_reintegration),

      mci2_lag_lead_time:       parseFloat(form.mci2_lag_lead_time),
      mci2_lead_stations:       parseFloat(form.mci2_lead_stations),
      mci2_lead_dispatch:       parseFloat(form.mci2_lead_dispatch),
      mci2_lead_maintenance:    parseFloat(form.mci2_lead_maintenance),
    });
    onClose();
  };

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Drawer Panel */}
      <div
        className="relative h-full w-full max-w-lg bg-bg-card border-l border-border flex flex-col overflow-hidden"
        style={{ animation: 'slideInRight 0.35s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-border flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">⚙️</span>
              <h2 className="text-lg font-extrabold text-text-primary tracking-tight">
                Panel de Control
              </h2>
            </div>
            <p className="text-xs text-text-muted uppercase tracking-widest font-bold">
              GLAM FAST · Ingreso de Datos — Admin
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors text-2xl leading-none cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg hover:bg-bg-card-inner"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">

          {/* ── MCI 1 ── */}
          <FormSection title="📦 MCI 1 — Logística Inversa" color="text-accent-bright">
            <FormRow
              label="Tasa de Devoluciones (%) · Lag"
              hint="Meta: ≤5.5% · Inicio: 8%"
              name="mci1_lag_returns"
              value={form.mci1_lag_returns}
              onChange={handleChange}
              type="number"
              step="0.1"
              min="0"
              max="10"
            />
            <FormRow
              label="Prendas verificadas con escáner (%) · Palanca 1"
              hint="Meta: 100%"
              name="mci1_lead_scanner"
              value={form.mci1_lead_scanner}
              onChange={handleChange}
              type="number"
              min="0"
              max="100"
            />
            <FormRow
              label="Auditorías sorpresivas por turno (paquetes) · Palanca 2"
              hint="Meta: 15 paquetes/turno"
              name="mci1_lead_audits"
              value={form.mci1_lead_audits}
              onChange={handleChange}
              type="number"
              min="0"
              max="30"
            />
            <FormRow
              label="Devoluciones reintegradas en &lt;2h (%) · Palanca 3"
              hint="Meta: 100%"
              name="mci1_lead_reintegration"
              value={form.mci1_lead_reintegration}
              onChange={handleChange}
              type="number"
              min="0"
              max="100"
            />
          </FormSection>

          {/* ── MCI 2 ── */}
          <FormSection title="⚡ MCI 2 — Aceleración del Lead Time" color="text-accent-yellow">
            <FormRow
              label="Lead Time actual (horas) · Lag"
              hint="Meta: ≤3.2h · Inicio: 4.0h"
              name="mci2_lag_lead_time"
              value={form.mci2_lag_lead_time}
              onChange={handleChange}
              type="number"
              step="0.1"
              min="0"
              max="8"
            />
            <FormRow
              label="Estaciones listas 15 min antes del turno (%) · Palanca 4"
              hint="Meta: 100%"
              name="mci2_lead_stations"
              value={form.mci2_lead_stations}
              onChange={handleChange}
              type="number"
              min="0"
              max="100"
            />
            <FormRow
              label='Pedidos con despacho prioritario "Día Siguiente" (%) · Palanca 5'
              hint="Meta: ≥40%"
              name="mci2_lead_dispatch"
              value={form.mci2_lead_dispatch}
              onChange={handleChange}
              type="number"
              min="0"
              max="100"
            />
            <FormRow
              label="Turnos con mantenimiento preventivo 10 min (%) · Palanca 6"
              hint="Meta: ≥90%"
              name="mci2_lead_maintenance"
              value={form.mci2_lead_maintenance}
              onChange={handleChange}
              type="number"
              min="0"
              max="100"
            />
          </FormSection>
        </div>

        {/* Footer Buttons */}
        <div className="px-8 py-5 border-t border-border flex gap-4 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-border text-text-secondary font-bold
              hover:bg-bg-card-inner transition-all cursor-pointer text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-xl font-black text-white transition-all cursor-pointer
              animate-pulse-glow text-sm"
            style={{ background: 'linear-gradient(135deg, #e65100 0%, #ff6d00 60%, #ffd600 100%)' }}
          >
            💾 Guardar y Actualizar
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ── Helper Sub-Components ── */
function FormSection({ title, color, children }) {
  return (
    <div>
      <h3 className={`text-xs font-extrabold uppercase tracking-widest mb-5 ${color}`}>
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function FormRow({ label, hint, name, value, onChange, type = 'text', step, min, max }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-text-secondary leading-tight">
        {label}
      </label>
      {hint && (
        <p className="text-[10px] text-text-muted font-medium">{hint}</p>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        step={step}
        min={min}
        max={max}
        className="w-full px-4 py-3 rounded-xl bg-bg-card-inner border border-border
          text-text-primary font-bold text-base focus:outline-none focus:border-accent
          transition-colors"
      />
    </div>
  );
}
