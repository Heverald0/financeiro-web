import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard  from "@/pages/Dashboard";
import { Transactions } from "@/pages/Transactions";
import { Toaster } from "@/components/ui/sonner"; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <Routes>
          {}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {}
          <Route path="/transactions" element={<Transactions />} />
          
          {}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
        
        {}
        <Toaster richColors position="top-right" />
      </div>
    </Router>
  );
}

export default App;