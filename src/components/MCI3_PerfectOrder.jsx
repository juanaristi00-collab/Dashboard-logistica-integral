import React from 'react';
import { evaluateMCI3 } from '../utils/evaluators';

export default function MCI3_PerfectOrder({ currentData, previousData }) {
  const status = evaluateMCI3(currentData, previousData);

  return (
    <div className="dashboard-body screen-fade">
      {/* Panel Principal */}
      <div className="panel">
        <div className="metric-group">
          <div className="metric-label">Métrica de Rezago (Lag) - Índice Perfect Order</div>
          <div className="metric-value">
            {currentData.mci3_lag_perfect_order}%
            <span style={{ fontSize: '3vh', color: '#888', marginLeft: '1vw' }}>
              (Anterior: {previousData.mci3_lag_perfect_order}%)
            </span>
          </div>
        </div>

        <div className="metric-group">
          <div className="metric-label">Lead 3: % Validación de Peso</div>
          <div className="metric-value" style={{ color: currentData.mci3_lead_weight_check >= 100 ? 'var(--accent-neon-green)' : 'var(--accent-yellow)' }}>
            {currentData.mci3_lead_weight_check}%
          </div>
        </div>

        <div className="metric-group">
          <div className="metric-label">Lead 4: % Pedidos a tiempo en muelle</div>
          <div className="metric-value" style={{ color: currentData.mci3_lead_dock_time >= 95 ? 'var(--accent-neon-green)' : 'var(--accent-yellow)' }}>
            {currentData.mci3_lead_dock_time}% 
            <span style={{ fontSize: '2vh', marginLeft: '1vw', color: '#888' }}>(Meta: 95%)</span>
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
            <p style={{ color: '#aaa', marginTop: '2vh' }}>Meta cumplida o superada</p>
          </>
        ) : (
          <>
            <div className="face-indicator status-lose">☹️</div>
            <h1 className="status-lose">PERDIENDO</h1>
            <p style={{ color: '#aaa', marginTop: '2vh' }}>Brecha detectada en métricas</p>
          </>
        )}
      </div>
    </div>
  );
}
