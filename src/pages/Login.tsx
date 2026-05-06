import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, senha });
            localStorage.setItem('token', response.data);
            alert("Bem-vindo ao Controle Financeiro!");
            navigate('/dashboard');
        } catch (error) {
            alert("Erro ao logar: verifique e-mail e senha.");
        }
    };

   return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <form onSubmit={handleLogin} className="w-full max-w-md p-8 space-y-6 bg-slate-900 rounded-xl border border-slate-800 shadow-2xl">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-50">Bem-vindo</h2>
                <p className="text-slate-400 mt-2">Acesse sua conta financeira</p>
            </div>
            
            <div className="space-y-4">
                <input 
                    className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    type="email" 
                    placeholder="E-mail" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <input 
                    className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    type="password" 
                    placeholder="Senha" 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required 
                />
            </div>

            <button type="submit" className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200">
                Entrar
            </button>
        </form>
    </div>
);
};

export default Login;