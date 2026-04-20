import React, { useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
} from 'chart.js';

// Setup ChartJS defaults
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip);
ChartJS.defaults.color = '#ffffff';

export default function AdminPanel({ dataPayload, setDataPayload }) {
  // Local state for the form, initialized with the global payload
  const [formData, setFormData] = useState({
    devLag: dataPayload.currentData.mci1_lag_returns,
    scanLead: dataPayload.currentData.mci1_lead_scanned,
    estLead: dataPayload.currentData.mci1_lead_stations ? 'SI' : 'NO',
    perfLag: dataPayload.currentData.mci3_lag_perfect_order,
    pesoLead: dataPayload.currentData.mci3_lead_weight_check,
    muelleLead: dataPayload.currentData.mci3_lead_dock_time,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = () => {
    // Inject the new values into the global TV payload
    setDataPayload(prev => ({
      ...prev,
      currentData: {
        ...prev.currentData,
        mci1_lag_returns: parseFloat(formData.devLag),
        mci1_lead_scanned: parseFloat(formData.scanLead),
        mci1_lead_stations: formData.estLead === 'SI',
        
        mci3_lag_perfect_order: parseFloat(formData.perfLag),
        mci3_lead_weight_check: parseFloat(formData.pesoLead),
        mci3_lead_dock_time: parseFloat(formData.muelleLead),
      }
    }));
    alert("Datos Guardados Exitosamente. El Smart TV ha sido actualizado.");
  };

  // Evaluate Winning Criteria
  const devolucionesValor = parseFloat(formData.devLag);
  const perfectoValor = parseFloat(formData.perfLag);
  const escaneadoValor = parseFloat(formData.scanLead);
  const pesoValor = parseFloat(formData.pesoLead);
  const muelleValor = parseFloat(formData.muelleLead);

  const ganando = (devolucionesValor <= 5) 
                  && (escaneadoValor >= 100) 
                  && (formData.estLead === 'SI') 
                  && (perfectoValor >= 90) 
                  && (pesoValor >= 100) 
                  && (muelleValor >= 95);

  // Charts Config
  const devDataConfig = {
    labels: ['Anterior', 'Actual'],
    datasets: [{
      data: [dataPayload.previousData.mci1_lag_returns, devolucionesValor],
      backgroundColor: ['#555555', devolucionesValor <= 4 ? '#00e676' : '#ff1744'],
      borderWidth: 0
    }]
  };

  const perfDataConfig = {
    labels: ['Logrado', 'Faltante'],
    datasets: [{
      data: [perfectoValor, 100 - perfectoValor],
      backgroundColor: ['#ff9100', '#333333'],
      borderWidth: 0
    }]
  };

  return (
    <div className="admin-container screen-fade">
      
      {/* Vista de Tablero Local de Control */}
      <div className="admin-grid">
        <div className="admin-card" style={{ borderTop: '0.4vh solid var(--accent-blue)' }}>
          <h2 style={{ color: 'var(--accent-blue)' }}>MCI 1: Bajar Devoluciones</h2>
          <div className="chart-wrapper">
             <Bar 
               data={devDataConfig} 
               options={{ responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 10 } } }} 
             />
          </div>
          <div style={{ marginTop: '2vh', display: 'flex', flexDirection: 'column', gap: '1vh' }}>
             <p>L1 Escaneados: <strong style={{ color: escaneadoValor >= 100 ? 'var(--accent-neon-green)' : 'var(--accent-neon-red)' }}>{escaneadoValor}%</strong></p>
             <p>L2 Estaciones: <strong style={{ color: formData.estLead === 'SI' ? 'var(--accent-neon-green)' : 'var(--accent-neon-red)' }}>{formData.estLead}</strong></p>
          </div>
        </div>

        <div className="admin-card" style={{ borderTop: '0.4vh solid var(--accent-orange)' }}>
          <h2 style={{ color: 'var(--accent-orange)' }}>MCI 3: Perfect Order</h2>
          <div className="chart-wrapper">
             <Doughnut 
               data={perfDataConfig} 
               options={{ responsive: true, maintainAspectRatio: false, cutout: '75%' }} 
             />
          </div>
          <div style={{ marginTop: '2vh', display: 'flex', flexDirection: 'column', gap: '1vh' }}>
             <p>L3 Validación Peso: <strong style={{ color: pesoValor >= 100 ? 'var(--accent-neon-green)' : 'var(--accent-neon-red)' }}>{pesoValor}%</strong></p>
             <p>L4 Envíos Muelle: <strong style={{ color: muelleValor >= 95 ? 'var(--accent-neon-green)' : 'var(--accent-neon-red)' }}>{muelleValor}%</strong></p>
          </div>
        </div>
      </div>

      <div className={`status-banner ${ganando ? 'bg-status-win' : 'bg-status-lose'}`}>
        <span>{ganando ? '😁' : '🚨'}</span>
        <span>{ganando ? '¡GANANDO! Mantenemos el ritmo esperado.' : '¡PERDIENDO! Alarma: Acciones no cumplidas en turno.'}</span>
      </div>

      {/* Formulario de Entrada */}
      <div className="admin-card" style={{ maxWidth: '80vw', margin: '0 auto', display: 'block' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--accent-neon-green)' }}>INGRESAR DATOS (Admin)</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>📉 Tasa de Devoluciones (%) [Lag]</label>
            <input type="number" name="devLag" value={formData.devLag} onChange={handleChange} step="0.1" />
          </div>
          <div className="form-group">
            <label>📦 Pedidos Escaneados (%) [Lead 1]</label>
            <input type="number" name="scanLead" value={formData.scanLead} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>✅ Estaciones Abastecidas [Lead 2]</label>
            <select name="estLead" value={formData.estLead} onChange={handleChange}>
              <option value="SI">Sí (Cumplido)</option>
              <option value="NO">No (Fallo)</option>
            </select>
          </div>
          <div /> {/* Espacio Vacío */}

          <div className="form-group">
            <label>⭐ Índice Perfect Order (%) [Lag]</label>
            <input type="number" name="perfLag" value={formData.perfLag} onChange={handleChange} step="0.1" />
          </div>
          <div className="form-group">
            <label>⚖️ Validación de Peso (%) [Lead 3]</label>
            <input type="number" name="pesoLead" value={formData.pesoLead} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>🚚 Envíos a Muelle (%) [Lead 4]</label>
            <input type="number" name="muelleLead" value={formData.muelleLead} onChange={handleChange} />
          </div>
          
          <button className="btn-submit" onClick={handleGuardar}>💾 GUARDAR Y ACTUALIZAR TV</button>
        </div>
      </div>

    </div>
  );
}
