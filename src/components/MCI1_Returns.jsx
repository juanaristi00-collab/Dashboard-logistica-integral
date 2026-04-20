import React from 'react';
import { evaluateMCI1 } from '../utils/evaluators';

export default function MCI1_Returns({ currentData, previousData }) {
  const status = evaluateMCI1(currentData, previousData);

  return (
    <div className="dashboard-body screen-fade">
      {/* Panel Principal */}
      <div className="panel">
        <div className="metric-group">
          <div className="metric-label">Métrica de Rezago (Lag) - Devoluciones Actuales</div>
          <div className="metric-value">
            {currentData.mci1_lag_returns}%
            <span style={{ fontSize: '3vh', color: '#888', marginLeft: '1vw' }}>
              (Anterior: {previousData.mci1_lag_returns}%)
            </span>
          </div>
        </div>

        <div className="metric-group">
          <div className="metric-label">Lead 1: Pedidos Escaneados</div>
          <div className="metric-value" style={{ color: currentData.mci1_lead_scanned >= 100 ? 'var(--accent-neon-green)' : 'var(--accent-yellow)' }}>
            {currentData.mci1_lead_scanned}%
          </div>
        </div>

        <div className="metric-group">
          <div className="metric-label">Lead 2: Estaciones Abastecidas</div>
          <div className="metric-value" style={{ color: currentData.mci1_lead_stations ? 'var(--accent-neon-green)' : 'var(--accent-yellow)' }}>
            {currentData.mci1_lead_stations ? 'SI (100%)' : 'NO (Falla)'}
          </div>
        </div>
      </div>

      {/* Zona Inferior (Evaluación / Carita) */}
      <div className="panel evaluation-panel">
        <h2 className="metric-label" style={{ marginBottom: '4vh' }}>¿ESTAMOS GANANDO?</h2>
        
        {status === 'WIN' ? (
          <>
            <div className="face-indicator status-win">😊</div>
            <h1 className="status-win">GANANDO</h1>
            <p style={{ color: '#aaa', marginTop: '2vh' }}>Meta cumplida</p>
          </>
        ) : (
          <>
            <div className="face-indicator status-lose">☹️</div>
            <h1 className="status-lose">PERDIENDO</h1>
            <p style={{ color: '#aaa', marginTop: '2vh' }}>Brecha detectada en métricas Lead o Lag</p>
          </>
        )}
      </div>
    </div>
  );
}
