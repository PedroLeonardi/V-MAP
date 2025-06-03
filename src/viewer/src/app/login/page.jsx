'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function login() {
  const [doc, setDoc] = useState('');

  const router = useRouter();

  // Formatando cpf para front-end
  function formatarCPF(valor) {
    valor = valor.replace(/\D/g, '');
    if (valor.length <= 3) return valor;
    if (valor.length <= 6) return valor.replace(/(\d{3})(\d)/, '$1.$2');
    if (valor.length <= 9) return valor.replace(/(\d{3})(\d{3})(\d)/, '$1.$2.$3');
    return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  }

  // Função para envio do form
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let formErrors = false;

    if (!cpf.trim() || !senha.trim()) {
      formErrors = true;
      toast.error('Preencha todos os campos.');
      setLoading(false)
      return;
    }

    if (cpf.length !== 14) {
      formErrors = true;
      toast.error('CPF inválido');
      setLoading(false)
      return;
    }

    if (senha.length < 6) {
      formErrors = true;
      toast.error('Senha precisa conter pelo menos 6 caracteres');
      setLoading(false)
      return;
    } else if (senha.length > 255) {
      formErrors = true;
      toast.error('Senha maior que 255 caracteres');
      setLoading(false)
      return;
    }

    if (formErrors) return;


    try {
      const endPoints = [
        { url: 'http://localhost:3001/auth/admin/login', type: 'admin' },
        { url: 'http://localhost:3001/auth/responsavel/login', type: 'responsavel' },
        { url: 'http://localhost:3001/auth/aluno/login', type: 'aluno' }
      ];

      let response;
      let usuarioType = '';

      for (const { url, type } of endPoints) {
        try {
          response = await axios.post(url, { cpf, senha });
          if (response.data?.token) {
            usuarioType = type;
            break;
          };
        } catch (err) {
          console.error('Não foi possivel efetuar login');
        }
      }

      if (!response || !response.data?.token) {
        toast.error('Usuário ou senha incorretos');
        return;
      }

      toast.success('Login efetuado com sucesso!!!');

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuarioType', usuarioType);

      setTimeout(() => {
        if (usuarioType === 'admin') {
          router.push('/DashboardAdm');
        } else if (usuarioType === 'responsavel') {
          router.push('/dashboardResponsavel');
        } else if (usuarioType === 'aluno') {
          router.push('/dashboardAluno');
        }
      }, 300);

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
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-40"
      >
        <source src="/login/bg-login.mp4" type="video/mp4" />
        Seu navegador não suporta vídeo.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/70 to-blue-900/70 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
     <div className="absolute top-4 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0">
        <Link href="/"><img src="/login/logo-2.png" alt="Logo" className="w-60 h-40 md:w-90 md:h-55 sm:w-75 sm:h-50" /></Link>
    </div>

         <div className="bg-black/50 border border-gray-300 rounded-xl p-6 sm:p-8 w-full max-w-sm text-white shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">CPF/CNPJ</label>
              <input
                type="text"
                placeholder="000.000.000-00 ou 00.000.000/0000-00"
                value={doc}
                onChange={handleDocChange}
                maxLength={18}
                className="w-full px-4 py-2 rounded-md border border-gray-400 bg-transparent placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-[#5c83ff]"
              />
            </div>
          </div>


          <div className="bg-slate-800/70 backdrop-blur-md border border-slate-700 rounded-xl pt-20 pb-8 px-6 sm:px-10 w-full text-white shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-sky-400">Bem-vindo(a)!</h1>
              <p className="text-slate-300 mt-2">Acesse sua conta para continuar</p>
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
