import { useEffect, useState } from "react";
import { financeiroService, Transaction } from "@/services/financeiroService";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from "@/components/ui/dialog";
import { Trash2, Edit, Plus, ArrowUpCircle, ArrowDownCircle, Save } from "lucide-react";
import { toast } from "sonner";

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estado do formulário sincronizado com sua Entity Java
  const [formData, setFormData] = useState({
    descricao: "",
    valor: "",
    data: new Date().toISOString().split('T')[0],
    tipo: "DESPESA",
    categoria: "LAZER",
    observacao: ""
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await financeiroService.listarTodas();
      setTransactions(data);
    } catch (error) {
      toast.error("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await financeiroService.salvar({
        ...formData,
        valor: Number(formData.valor)
      } as any);
      toast.success("Transação salva no MySQL!");
      setIsModalOpen(false);
      loadData(); // Recarrega a tabela automaticamente
    } catch (error) {
      toast.error("Erro ao salvar transação.");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Deseja realmente excluir?")) {
      try {
        await financeiroService.excluir(id);
        toast.success("Excluído (Soft Delete aplicado)!");
        setTransactions(prev => prev.filter(t => t.id !== id));
      } catch (error) {
        toast.error("Erro ao excluir.");
      }
    }
  };

  return (
    <div className="p-8 space-y-6 bg-slate-950 min-h-screen text-slate-50 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transações</h1>
          <p className="text-slate-400 text-sm">Gerencie seu fluxo de caixa em Eunápolis</p>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20">
              <Plus className="mr-2 h-4 w-4" /> Nova Transação
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Cadastrar Movimentação</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Descrição</label>
                <Input 
                  className="bg-slate-800 border-slate-700" 
                  placeholder="Ex: Aluguel, Salário..." 
                  required 
                  onChange={e => setFormData({...formData, descricao: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Valor (R$)</label>
                  <Input 
                    type="number" 
                    step="0.01"
                    className="bg-slate-800 border-slate-700" 
                    required 
                    onChange={e => setFormData({...formData, valor: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Tipo</label>
                  <select 
                    className="w-full h-10 px-3 bg-slate-800 border border-slate-700 rounded-md text-sm"
                    onChange={e => setFormData({...formData, tipo: e.target.value})}
                  >
                    <option value="DESPESA">Despesa</option>
                    <option value="RECEITA">Receita</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Observação (Campo Opcional)</label>
                <Input 
                  className="bg-slate-800 border-slate-700" 
                  placeholder="Detalhes adicionais..." 
                  onChange={e => setFormData({...formData, observacao: e.target.value})}
                />
              </div>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 mt-4">
                <Save className="mr-2 h-4 w-4" /> Salvar no MySQL
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-900/80">
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className="w-[120px]">Data</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Observação</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center py-10 text-slate-500">Carregando...</TableCell></TableRow>
            ) : transactions.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-10 text-slate-500">Nenhuma transação no banco.</TableCell></TableRow>
            ) : (
              transactions.map((t) => (
                <TableRow key={t.id} className="border-slate-800 hover:bg-slate-800/30 transition-colors">
                  <TableCell className="text-slate-400">{new Date(t.data).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell className="font-medium flex items-center gap-2">
                    {t.tipo === 'RECEITA' ? <ArrowUpCircle className="h-4 w-4 text-emerald-400" /> : <ArrowDownCircle className="h-4 w-4 text-rose-400" />}
                    {t.descricao}
                  </TableCell>
                  <TableCell><span className="px-2 py-1 rounded-full bg-slate-800 text-[10px] uppercase font-bold">{t.categoria}</span></TableCell>
                  <TableCell className="text-slate-500 italic truncate max-w-[150px]">{t.observacao || "-"}</TableCell>
                  <TableCell className={`text-right font-bold ${t.tipo === 'RECEITA' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.valor)}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-1">
                      <Button variant="ghost" size="icon" className="hover:text-rose-500" onClick={() => t.id && handleDelete(t.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}