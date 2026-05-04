import api from './api';

export interface Transaction {
  id?: number;
  descricao: string;
  valor: number;
  data: string;
  tipo: 'RECEITA' | 'DESPESA';
  categoria: string;
  observacao?: string;
}

export interface ResumoFinanceiro {
  saldoTotal: number;
  receitasMes: number;
  despesasMes: number;
}

export const financeiroService = {
  listarTodas: async (): Promise<Transaction[]> => {
    const response = await api.get<Transaction[]>('/api/transacoes');
    return response.data;
  },

  excluir: async (id: number): Promise<void> => {
    await api.delete(`/api/transacoes/${id}`);
  },

  salvar: async (transaction: Transaction): Promise<Transaction> => {
    const response = await api.post<Transaction>('/api/transacoes', transaction);
    return response.data;
  },

  getResumo: async (): Promise<ResumoFinanceiro> => {
    const response = await api.get<ResumoFinanceiro>('/api/transacoes/resumo');
    return response.data;
  }
};