import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0f1117]">
        <Routes>
          {/* Redireciona a raiz (/) automaticamente para o Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Rota do Dashboard com Gráficos e Cards */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Rota da Listagem de Transações (com suporte a Soft Delete no futuro) */}
          <Route path="/transacoes" element={<Transactions />} />

          {/* Rota de fallback para evitar telas brancas em caminhos inexistentes */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;