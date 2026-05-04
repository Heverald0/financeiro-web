import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import api from "@/services/api";
import { AxiosResponse } from "axios";

interface Transaction {
  id: number;
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
  tipo: "RECEITA" | "DESPESA";
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get<Transaction[]>("/transacoes")
      .then((response: AxiosResponse<Transaction[]>) => setTransactions(response.data))
      .catch(console.error);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
  };

  return (
    <div className="p-8 bg-[#0f1117] min-h-screen text-white">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transações</h1>
          <p className="text-slate-400 text-sm">Gerencie suas entradas e saídas</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <PlusCircle className="mr-2 h-4 w-4" /> Nova Transação
        </Button>
      </header>

      <Card className="bg-[#1a1c24] border-slate-800 text-white">
        <CardContent className="pt-6">
          <Table>
            <TableHeader className="border-slate-800">
              <TableRow className="hover:bg-transparent border-slate-800">
                <TableHead className="text-slate-400">Descrição</TableHead>
                <TableHead className="text-slate-400">Categoria</TableHead>
                <TableHead className="text-slate-400">Data</TableHead>
                <TableHead className="text-right text-slate-400">Valor</TableHead>
                <TableHead className="text-right text-slate-400">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((t) => (
                <TableRow key={t.id} className="border-slate-800 hover:bg-slate-800/50">
                  <TableCell className="font-medium text-white">{t.descricao}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full bg-slate-700 text-[10px]">
                      {t.categoria}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-300">{new Date(t.data).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell className={`text-right font-bold ${t.tipo === 'RECEITA' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {t.tipo === 'RECEITA' ? '+ ' : '- '}{formatCurrency(t.valor)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-indigo-400">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-rose-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}