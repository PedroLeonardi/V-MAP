'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { get } from 'lodash';
import { toast } from "sonner";

export default function CadastroAdmin() {

  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCPF] = useState('');
  const [cargo, setCargo] = useState('');
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  // add cargos
  const cargosDisponiveis = [
    'Coordenador Pedagógico',
    'Gerente de Transporte',
    'Diretor',
    'Coordenador',
    'Gerente de TI'
  ]


  function formatarCPF(valor) {
    // Remove tudo que não for número
    valor = valor.replace(/\D/g, '');

    // Aplica a máscara
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return valor
  }

  // validação input nome
  function validarNome(nome) {
    // aqui só permito letras e espaços
    return /^[A-Za-zÀ-ú\s]+$/.test(nome);

  }

  // senha precisa ser maior q 6 digitos
  function validarSenha(senha) {
    return senha.lenght >= 6;
  }

  // removendo meu token de logado ao voltar para cadastro
  // só teste
  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  async function handleSubmit(e) {

    e.preventDefault(); // evita o envio do formulário
    setLoading(true);

    let formsErrors = false;

    if (!nome.trim() || !senha.trim() || !cpf.trim() || !cargo.trim()) {
      formsErrors = true;
      toast.error("Preencha todos os campos.")
    }

    if (!validarNome(nome)) {
      toast.error('Nome Inválido. Use apenas letras e espaços.')
      setLoading(false);
      return;
    }

    if(!validarSenha(senha)){
      toast.error('Senha deve conter pelo menos 6 caracteres')
      setLoading(false);
      return;
    }


    if (formsErrors) return

    try {

      const response = await axios.post('http://localhost:3001/admin', {
        nome,
        senha,
        cpf: cpf.replace(/\D/g, ''), // enviando cpf limpo
        cargo
      });

      toast.success("Cadastro de ADM concluido com sucesso!!");
      console.log(response.data);

      // setTimeout(() => {
      //   router.push('/login')
      // }, 2000)


    } catch (err) {
      const message = get(err, 'response.data.message', '');

      if (message === 'CPF já cadastrado') {
        toast.error('CPF já existente');
      } else {
        toast.error('erro ao cadastrar usuário')
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <>

      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Crie sua conta</h1>

        <form
          onSubmit={handleSubmit}

          className="flex flex-col gap-4 bg-gray-800 p-6 rounded-lg shadow-md w-80"
        >
          <input
            className="border border-gray-300 rounded px-4 py-2"
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Digite seu nome"
          />
          <input
            className="border border-gray-300 rounded px-4 py-2"
            type="text"
            value={cpf}
            maxLength={14}
            onChange={e => setCPF(formatarCPF(e.target.value))}
            placeholder="Digite seu CPF"

          />
          <select
            className="border border-gray-300 rounded px-4 py-2 text-black"
            value={cargo}
            onChange={e => setCargo(e.target.value)}
          >
            <option value="">Selecione um cargo</option>
            {cargosDisponiveis.map((cargoOp) => (
              <option key={cargoOp} value={cargoOp}>
                {cargoOp}
              </option>
            ))}
          </select>

          <input
            className="border border-gray-300 rounded px-4 py-2"
            type="password"
            value={senha}
            maxLength={255}
            onChange={e => setSenha(e.target.value)}
            placeholder="Digite sua senha"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >

            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </div>

    </>
  );
}
