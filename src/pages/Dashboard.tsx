import { useEffect, useState } from "react";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";
import { financeiroService, ResumoFinanceiro } from "@/services/financeiroService";

const COLORS = ["#8B5CF6", "#F97316", "#D946EF", "#0EA5E9"];

export default function Dashboard() {
  const [dados, setDados] = useState<ResumoFinanceiro | null>(null);

  useEffect(() => {
    // Chamada corrigida: agora usamos financeiroService.getResumo()
    financeiroService.getResumo()
      .then(setDados)
      .catch((error) => console.error("Erro ao buscar dados do Java:", error));
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const dataPizza = [
    { name: "Moradia", value: 2200 },
    { name: "Alimentação", value: 680 },
    { name: "Lazer", value: 78 },
    { name: "Transporte", value: 45 },
  ];

  return (
    <div className="p-8 bg-[#0f1117] min-h-screen text-white font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Início</h1>
        <p className="text-slate-400 text-sm">Visão geral do seu mês</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="bg-gradient-to-br from-indigo-600 to-blue-700 border-none text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Saldo Total</CardTitle>
            <Wallet className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(dados?.saldoTotal ?? 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1c24] border-slate-800 text-white shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Receitas do Mês</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">
              {formatCurrency(dados?.receitasMes ?? 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1c24] border-slate-800 text-white shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Despesas do Mês</CardTitle>
            <TrendingDown className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-500">
              {formatCurrency(dados?.despesasMes ?? 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-[#1a1c24] border-slate-800 text-white p-4">
          <CardHeader>
            <CardTitle className="text-lg">Gasto por Categoria</CardTitle>
            <CardDescription className="text-slate-400 text-xs">Distribuição do mês atual</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataPizza}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataPizza.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1a1c24", border: "1px solid #334155" }}
                  itemStyle={{ color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1c24] border-slate-800 text-white p-4">
          <CardHeader>
            <CardTitle className="text-lg">Receitas vs Despesas</CardTitle>
            <CardDescription className="text-slate-400 text-xs">Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
             <div className="flex items-center justify-center h-full text-slate-500 italic text-sm">
               Pronto para receber o histórico da API...
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}