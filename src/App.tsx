import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import { Transactions } from "@/pages/Transactions";
import Login from "./pages/Login"; 
import { Toaster } from "@/components/ui/sonner"; 
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <Routes>
          {}
          <Route path="/" element={<Login />} />
          
          {}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/transactions" 
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            } 
          />
          
          {}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        <Toaster richColors position="top-right" />
      </div>
    </Router>
  );
}

export default App;