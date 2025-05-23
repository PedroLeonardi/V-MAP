'use client'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { get } from 'lodash';
import { FaTruckFront } from 'react-icons/fa6';

export default function responsavelCadastro() {

    const [nome, setNome] = useState('');
    const [cpf, setCPF] = useState('');
    const [senha, setSenha] = useState('');
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

    function validarNome(nome) {
        // aqui só permito letras e espaços
        return /^[A-Za-zÀ-ú\s]+$/.test(nome);
    }

    function validarSenha(senha) {
        return senha.length >= 6
    }


    async function handleSubmit(e) {

        e.preventDefault();
        setLoading(true);

        let formsErrors = false;

        if (!nome.trim() || !senha.trim() || !cpf.trim()) {
            formsErrors = true;
            toast.error("Preencha todos os campos.")
        }
        if (!validarNome(nome)) {
            toast.error('Nome inválido. Use apenas letras ou espaços');
        }

        if (!validarSenha(senha)) {
            toast.error('Senha conter pelo menos 6 caracteres');
        }


        if (formsErrors) return

        try {
            const response = await axios.post('http://localhost:3001/responsavel', {
                nome,
                cpf,
                senha,
            })

            toast.success('Responsavel cadastrado com sucesso!!!')
            console.log(response.data)
        } catch (err) {
            const message = get(err, 'response.data.message', '');

            if (message === 'CPF já cadastrado') {
                toast.error('CPF já existente');
            } else {
                toast.error('Erro ao cadastrar responsável')
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

    )
}