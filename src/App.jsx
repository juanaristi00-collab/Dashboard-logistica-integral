import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SectionMCI1 from './components/SectionMCI1';
import SectionMCI2 from './components/SectionMCI2';
import SectionMCI3 from './components/SectionMCI3';
import AdminDrawer from './components/AdminDrawer';

function App() {
  const [adminOpen, setAdminOpen] = useState(false);

  // Global data state — Single Source of Truth
  const [data, setData] = useState({
    // MCI 1: Logística Inversa
    mci1_lag_returns: 3.5,
    mci1_lead_scanned: 100,
    mci1_lead_stations: true,

    // MCI 2: Lead Time
    mci2_lag_lead_time: 1.8,
    mci2_lead_priority_dispatch: 92,
    mci2_lead_maintenance: true,

    // MCI 3: Perfect Order
    mci3_lag_perfect_order: 94,
    mci3_lead_weight_check: 100,
    mci3_lead_dock_time: 96,
  });

  return (
    <div className="flex min-h-screen bg-bg-primary">
      {/* Sidebar Lateral Fijo */}
      <Sidebar onAdminClick={() => setAdminOpen(true)} />

      {/* Main Scroll Container */}
      <main id="main-scroll" className="flex-1 overflow-y-auto h-screen">
        <SectionMCI1 data={data} />
        <SectionMCI2 data={data} />
        <SectionMCI3 data={data} />

        {/* Footer */}
        <footer className="py-8 px-10 border-t border-border text-center">
          <p className="text-text-muted text-xs font-semibold tracking-widest uppercase">
            Tablero 4DX — Logística Integral — Universidad S-7 — 2026
          </p>
        </footer>
      </main>

      {/* Admin Drawer (Modal) */}
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
