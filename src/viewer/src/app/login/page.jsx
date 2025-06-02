'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import { get } from 'lodash'

export default function Login() {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  // formantando cpf para front-end
  function formatarCPF(valor) {
    valor = valor.replace(/\D/g, '');
    if (valor.length <= 3) return valor;
    if (valor.length <= 6) return valor.replace(/(\d{3})(\d)/, '$1.$2');
    if (valor.length <= 9) return valor.replace(/(\d{3})(\d{3})(\d)/, '$1.$2.$3');
    return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  }

  // function para envio do form
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let formErrors = false; // armazenando erros na variavel

    // precisa preencher campo de cpf e senha
    if (!cpf.trim() || !senha.trim()) {
      formErrors = true;
      toast.error('Preencha todos os campos.');
    }

    // cpf n pode ser diferente de 14
    if (cpf.length !== 14) {
      formErrors = true;
      toast.error('CPF inválido');
    }

    // valid de senhas
    if (senha.length < 6) {
      formErrors = true;
      toast.error('Senha precisa conter pelo menos 6 caracteres');
    } else if (senha.length > 255) {
      formErrors = true;
      toast.error('Senha maior que 255');
    }

    if (formErrors) return; // para aq se houver erros

    // caso passar vamos para ca
    try {

      // cadastrando meus possiveis end points
      const endPoints = [
        // end point                                      tipo de user
        { url: 'http://localhost:3001/auth/admin/login', type: 'admin' },
        { url: 'http://localhost:3001/auth/responsavel/login', type: 'responsavel' },
        { url: 'http://localhost:3001/auth/aluno/login', type: 'aluno' }
      ];

      let response;
      let usuarioType = ''; // esse type vai armezenar qual é o tipo de usuario

      // vou percorrer meu array dessa forma
      // recebo minha ulr e tipo
      for (const { url, type } of endPoints) {
        try {
          // e envio uma requisição ao back-end com as informações
          response = await axios.post(url, { cpf, senha });
          // passando token...
          if (response.data?.token) {
            usuarioType = type;
            break;
          };
        } catch (err) {
          console.error('Não foi possivel efetuar login');
        }
      }

      // se response não for real
      if (!response || !response.data?.token) {
        toast.error('Usuário ou senha incorretos');
        return;
      }

      // armazenando meu localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuarioType', usuarioType);

      // envio com sucesso
      toast.success('Login efetuado com sucesso!!!');
      console.log(response.data);


      // traçando as rotas para cada user
      if (usuarioType === 'admin') {
        setTimeout(() => {
          router.push('/DashboardAdm');
        }, 500)
      } else if (usuarioType === 'responsavel') {
        setTimeout(() => {
          router.push('/dashboardResponsavel');
        }, 500)
      } else if (usuarioType === 'aluno') {
        setTimeout(() => {
          router.push('/dashboardAluno');
        }, 500)
      }

      // tratamento de erros
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
      {/* Vídeo de fundo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/login/bg-login.mp4" type="video/mp4" />
        Seu navegador não suporta vídeo.
      </video>

      {/* Camada de sobreposição com degradê */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/70 to-blue-900/70 z-0" />

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0">
          <img src="/login/logo-2.png" alt="Logo" className="w-60 h-40 sm:w-75 sm:h-50" />
        </div>

        <div className="bg-black/50 border border-gray-300 rounded-xl p-6 sm:p-8 w-full max-w-sm text-white shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

          <form className="space-y-4"
            onSubmit={handleSubmit}>

            <div>
              <label className="block text-sm font-semibold mb-1">CPF</label>
              <input
                type="text"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={e => setCpf(formatarCPF(e.target.value))}
                maxLength={14}
                className="w-full px-4 py-2 rounded-md border border-gray-400 bg-transparent placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-[#5c83ff]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Senha</label>
              <input
                type="password"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-400 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5c83ff]"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-2 rounded-md bg-[#3a5dbf] hover:bg-[#2d50a0] transition text-white font-bold border border-gray-300"
            >
              {/* mudar estado do envio, apenas front-end nada demais */}
              {loading ? 'Logando...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
