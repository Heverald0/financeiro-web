import { useEffect, useState } from "react";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend 
} from "recharts";
import { financeiroService, ResumoFinanceiro, CategoriaResumo } from "@/services/financeiroService";

const COLORS = ["#8B5CF6", "#F97316", "#D946EF", "#0EA5E9", "#10B981"];

export default function Dashboard() {
  const [dados, setDados] = useState<ResumoFinanceiro | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca os dados consolidados do back-end Java
    financeiroService.getResumo()
      .then((res) => {
        setDados(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do Java:", error);
        setLoading(false);
      });
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  if (loading) {
    return (
      <div className="p-8 bg-[#0f1117] min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="animate-pulse text-slate-400">Sincronizando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#0f1117] min-h-screen text-white font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
          Início
        </h1>
        <p className="text-slate-400 text-sm">Visão geral do seu desempenho financeiro</p>
      </header>

      {/* Cards de Resumo Superior */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="bg-gradient-to-br from-indigo-600 to-blue-700 border-none text-white shadow-xl">
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
            <CardTitle className="text-sm font-medium text-slate-400">Receitas Totais</CardTitle>
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
            <CardTitle className="text-sm font-medium text-slate-400">Despesas Totais</CardTitle>
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
        {/* Gráfico de Gastos por Categoria */}
        <Card className="bg-[#1a1c24] border-slate-800 text-white p-4">
          <CardHeader>
            <CardTitle className="text-lg">Gasto por Categoria</CardTitle>
            <CardDescription className="text-slate-400 text-xs">Distribuição real dos lançamentos</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {dados?.gastosPorCategoria && dados.gastosPorCategoria.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dados.gastosPorCategoria}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dados.gastosPorCategoria.map((_item: CategoriaResumo, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#1a1c24", border: "1px solid #334155", borderRadius: "8px" }}
                    itemStyle={{ color: "#fff" }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500 italic text-sm">
                Nenhuma despesa registrada para exibir.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Card de Previsão do 13º (Requisito do TCC) */}
        <Card className="bg-[#1a1c24] border-slate-800 text-white p-4">
          <CardHeader>
            <CardTitle className="text-lg">Previsão Financeira (TCC)</CardTitle>
            <CardDescription className="text-slate-400 text-xs">Estimativa proporcional de 13º salário</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex flex-col items-center justify-center space-y-4">
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-1">Média de Receita Projetada</p>
              <div className="text-3xl font-bold text-indigo-400">
                {/* Lógica: Média das receitas acumuladas dividida pelos meses do ano decorridos */}
                {formatCurrency((dados?.receitasMes ?? 0) / (new Date().getMonth() + 1))} 
              </div>
            </div>
            <div className="w-full bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
               <p className="text-[10px] text-slate-400 leading-relaxed text-center">
                Este cálculo utiliza a média aritmética das entradas para projetar o valor bruto do décimo terceiro salário proporcional ao tempo de registro.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}