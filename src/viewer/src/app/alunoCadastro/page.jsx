'use client'

import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { get } from 'lodash'

export default function alunoCadastro() {

  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCPF] = useState('');
  const [cpf_responsavel, setCPF_RESPONSAVEL] = useState('');
  const [loading, setLoading] = useState(false)

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

  function validarSenha(senha){
    return senha.length >= 6;
  }

  async function handleSubmit(e) {

    e.preventDefault();
    setLoading(true);

    let formsErrors = false;

    if(!nome.trim() || !cpf.trim() || !senha.trim() || !cpf_responsavel.trim()){
      toast.error('Preencha todos os campos');
    }

    if(!validarNome(nome)){
      toast.error('Nome Inválido. Usuario deve conter letras e espaços');
    }

    if(!validarSenha(senha)){
      toast.error('Senha deve conter pelo menos 6 caracteres');
    }

    if (formsErrors) return

    try {

      const response = await axios.post('http://localhost:3001/aluno', {
        nome: nome,
        cpf_aluno: cpf,
        senha: senha,
        cpf_responsavel: cpf_responsavel
      })

      console.log(response.data)
      toast.success('Aluno cadastrado com sucesso.')
    } catch (err) {
      console.error(err)
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
          <input
            className="border border-gray-300 rounded px-4 py-2"
            type="text"
            value={cpf_responsavel}
            maxLength={14}
            onChange={e => setCPF_RESPONSAVEL(formatarCPF(e.target.value))}
            placeholder="Digite seu CPF"
          />


          <input
            className="border border-gray-300 rounded px-4 py-2"
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            placeholder="Digite sua senha"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Cadastrar
          </button>
        </form>
      </div>

    </>
  );


}