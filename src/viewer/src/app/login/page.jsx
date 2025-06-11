'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'sonner';
import get from 'lodash/get';

export default function Login() {
  const router = useRouter();

  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioType');
    localStorage.removeItem('cpf_User');
  }, []);

  // Formatando cpf para front-end
  function formatarCPF(valor) {
    valor = valor.replace(/\D/g, '');
    if (valor.length <= 3) return valor;
    if (valor.length <= 6) return valor.replace(/(\d{3})(\d)/, '$1.$2');
    if (valor.length <= 9) return valor.replace(/(\d{3})(\d{3})(\d)/, '$1.$2.$3');
    return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);



    if (!cpf.trim() || !senha.trim()) {
      toast.error('Preencha todos os campos.');
      setLoading(false);
      return;
    }

    if (cpf.length !== 14) {
      toast.error('CPF inválido');
      setLoading(false);
      return;
    }

    if (senha.length < 6) {
      toast.error('Senha precisa conter pelo menos 6 caracteres');
      setLoading(false);
      return;
    } else if (senha.length > 255) {
      toast.error('Senha maior que 255 caracteres');
      setLoading(false);
      return;
    }

    try {
      const endPoints = [
        { url: 'http://localhost:3001/auth/admin/login', type: 'admin' },
        { url: 'http://localhost:3001/auth/responsavel/login', type: 'responsavel' },
        { url: 'http://localhost:3001/auth/aluno/login', type: 'aluno' }
      ];

      let response;
      let usuarioType = '';
      let cpf_User = ''

      for (const { url, type } of endPoints) {
        try {
          response = await axios.post(url, { cpf, senha });
          if (response.data?.token) {
            usuarioType = type;
            cpf_User = cpf;
            break;
          }
        } catch (err) {
          console.log('Não foi possível efetuar login com:', url);
        }
      }

      if (!response || !response.data?.token) {
        toast.error('Usuário ou senha incorretos');
        return;
      }

      toast.success('Login efetuado com sucesso!');

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuarioType', usuarioType);
      localStorage.setItem('cpf_User', cpf_User);
      
        if (usuarioType === 'admin') {
          router.push('/DashboardAdm');
        } else if (usuarioType === 'responsavel') {
          router.push('/dashboardResponsavel');
        } else if (usuarioType === 'aluno') {
          router.push('/DashboardAluno');
        }
     
    } catch (err) {
      const message = get(err, 'response.data.message', '');

      if (message === 'Usuário não encontrado.') {
        toast.error('Usuário não encontrado!');
      } else if (message === 'Senha incorreta') {
        toast.error('Senha incorreta!');
      } else {
        toast.error('Erro ao fazer login.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-100 brightness-160"
      >
        <source src="/login/bg-login.mp4" type="video/mp4" />
        Seu navegador não suporta vídeo.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/70 to-blue-900/70 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="absolute top-[-20px] md:top-4 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0">
          <Link href="/">
            <img src="/Logo.png" alt="Logo" className="w-25 h-30 md:w-48 md:h-60 -mt-5 md:ml-10 sm:w-75 sm:h-50" />
          </Link>
        </div>

        <div className="bg-slate-800/70 backdrop-blur-md border border-slate-700 rounded-xl pt-10 pb-10 px-6 sm:px-10 w-full max-w-md text-white shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-sky-400 pb-10">Bem-vindo(a)!</h1>
            <p className="text-slate-300 -mt-6">Acesse sua conta para continuar</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="cpf" className="block text-sm font-medium text-slate-300 mb-2">CPF</label>
              <input
                id="cpf"
                name="cpf"
                type="text"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={e => setCpf(formatarCPF(e.target.value))}
                maxLength={14}
                className="w-full px-4 py-3 rounded-lg bg-slate-700/60 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-slate-300 mb-2">Senha</label>
              <input
                id="senha"
                name="senha"
                type="password"
                placeholder="Sua senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-700/60 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all
                bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700
                focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800
                disabled:opacity-60 disabled:cursor-not-allowed ${loading ? 'animate-pulse' : ''}`}
            >
              {loading ? 'Logando...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}