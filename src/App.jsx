import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SectionTorbellino from './components/SectionTorbellino';
import SectionMCI1 from './components/SectionMCI1';
import SectionMCI2 from './components/SectionMCI2';
import SectionCadencia from './components/SectionCadencia';
import AdminDrawer from './components/AdminDrawer';

/**
 * App.jsx — GLAM FAST 4DX Dashboard
 * Single Source of Truth para todos los datos del tablero.
 * Los estados ficticios simulan datos reales del turno actual.
 */
function App() {
  const [adminOpen, setAdminOpen] = useState(false);

  // ── Estado Global — Datos Actuales del Tablero ──
  const [data, setData] = useState({
    // ── MCI 1: Logística Inversa ──
    // Lag: Tasa de devoluciones actual (meta: bajar del 8% al 5.5%)
    mci1_lag_returns: 6.8,

    // Lead 1: % de prendas verificadas con escáner (meta: 100%)
    mci1_lead_scanner: 87,

    // Lead 2: paquetes auditados sorpresivamente por turno (meta: 15)
    mci1_lead_audits: 11,

    // Lead 3: % de devoluciones reintegradas en <2h (meta: 100%)
    mci1_lead_reintegration: 72,

    // ── MCI 2: Aceleración de Empaque ──
    // Lag: Lead time actual en horas (meta: bajar de 4h a 3.2h)
    mci2_lag_lead_time: 3.6,

    // Lead 4: % estaciones listas 15 min antes del turno (meta: 100%)
    mci2_lead_stations: 78,

    // Lead 5: % pedidos con despacho prioritario "Entrega Día Siguiente" (meta: ≥40%)
    mci2_lead_dispatch: 34,

    // Lead 6: % de turnos con mantenimiento preventivo de 10 min (meta: ≥90%)
    mci2_lead_maintenance: 85,
  });

  return (
    <div className="flex min-h-screen bg-bg-primary">
      {/* Sidebar Lateral Fijo */}
      <Sidebar onAdminClick={() => setAdminOpen(true)} />

      {/* Main Scroll Container */}
      <main id="main-scroll" className="flex-1 overflow-y-auto h-screen">
        {/* Sección 1: El Torbellino — Contexto Operativo */}
        <SectionTorbellino />

        {/* Sección 2: MCI 1 — Reducción de Devoluciones */}
        <SectionMCI1 data={data} />

        {/* Sección 3: MCI 2 — Aceleración del Lead Time */}
        <SectionMCI2 data={data} />

        {/* Sección 4: Cadencia — Reuniones de Sincronización D4 */}
        <SectionCadencia />

        {/* Footer */}
        <footer className="py-8 px-10 border-t border-border">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm font-black text-text-secondary">
                <span className="shimmer-text">GLAM FAST</span>
              </p>
              <p className="text-xs text-text-muted font-semibold mt-0.5">
                Tablero 4DX — Área Logística: Transporte y Distribución
              </p>
            </div>
            <p className="text-xs text-text-muted font-semibold tracking-widest uppercase">
              Logística Integral · Universidad S-7 · 2026
            </p>
          </div>
        </footer>
      </main>

      {/* Admin Drawer (Panel de control lateral) */}
      {adminOpen && (
        <AdminDrawer
          data={data}
          onSave={(newData) => setData(newData)}
          onClose={() => setAdminOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
