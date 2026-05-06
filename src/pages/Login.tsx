// src/pages/Login.tsx
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Mail, Lock, Loader2, Wallet } from "lucide-react";

interface LoginResponse {
  token: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Preencha e-mail e senha.");
      return;
    }

    setLoading(true);
    try {
      const { data, status } = await axios.post<LoginResponse>(
        "http://localhost:8080/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } },
      );

      if (status === 200 && data?.token) {
        localStorage.setItem("token", data.token);
        toast.success("Login realizado!");
        navigate("/dashboard");
      } else {
        toast.error("E-mail ou senha inválidos");
      }
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      const message =
        axiosErr.response?.data?.message ?? "E-mail ou senha inválidos";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20 border border-blue-500/30 mb-4">
            <Wallet className="h-7 w-7 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-50">
            Bem-vindo
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Acesse sua conta financeira
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-5"
          noValidate
        >
          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-200"
            >
              E-mail
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="voce@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full h-11 rounded-lg bg-slate-800 text-slate-50 placeholder:text-slate-500 border border-slate-700 pl-9 pr-3 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-60"
              />
            </div>
          </div>

          {/* Senha */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-200"
              >
                Senha
              </label>
              <button
                type="button"
                onClick={() =>
                  toast.info("Enviamos instruções de recuperação (demo).")
                }
                className="text-xs text-blue-400 hover:text-blue-300 hover:underline"
              >
                Esqueci minha senha
              </button>
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full h-11 rounded-lg bg-slate-800 text-slate-50 placeholder:text-slate-500 border border-slate-700 pl-9 pr-3 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-60"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </button>

          <p className="text-xs text-center text-slate-500">
            Ao continuar, você concorda com os Termos e Política de Privacidade.
          </p>
        </form>
      </div>
    </main>
  );
}
