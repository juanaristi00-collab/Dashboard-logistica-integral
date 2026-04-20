/**
 * Algoritmo de Evaluación MCI 1 (Devoluciones)
 * El sistema compara el turno actual (t) con el turno anterior (t-1).
 */
export function evaluateMCI1(currentData, previousData) {
  const isLead1Met = currentData.mci1_lead_scanned >= 100;
  const isLead2Met = currentData.mci1_lead_stations === true;
  
  // La métrica histórica debe mantenerse igual o disminuir (ser mejor o igual)
  const isLagMet = currentData.mci1_lag_returns <= previousData.mci1_lag_returns;

  if (isLead1Met && isLead2Met && isLagMet) {
    return 'WIN'; // Activa Carita Verde
  }
  return 'LOSE'; // Activa Carita Roja
}

/**
 * Algoritmo de Evaluación MCI 3 (Perfect Order)
 */
export function evaluateMCI3(currentData, previousData) {
  const isLead3Met = currentData.mci3_lead_weight_check >= 100;
  const isLead4Met = currentData.mci3_lead_dock_time >= 95;
  
  // La métrica histórica debe mantenerse igual o aumentar (Perfect Order: a mayor, mejor)
  const isLagMet = currentData.mci3_lag_perfect_order >= previousData.mci3_lag_perfect_order;

  if (isLead3Met && isLead4Met && isLagMet) {
    return 'WIN'; 
  }
  return 'LOSE'; 
}
