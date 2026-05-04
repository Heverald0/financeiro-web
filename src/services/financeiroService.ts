import api from './api';

export interface ResumoFinanceiro {
  saldoTotal: number;
  receitasMes: number;
  despesasMes: number;
}

export const getResumo = async (): Promise<ResumoFinanceiro> => {
  const response = await api.get<ResumoFinanceiro>('/financeiro/resumo');
  return response.data;
};