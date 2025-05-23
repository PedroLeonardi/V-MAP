'use client'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { get } from 'lodash';

export default function MotoristaCadastro() {  

    const [nome, setNome] = useState('');
    const [cpf_motorista, setCPF] = useState('');
    const cpfLimpo = cpf_motorista.replace(/\D/g, '');
    const [loading, setLoading] = useState(false);

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
        return /^[A-Za-zÀ-ú\s]+$/.test(nome);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)

        let formsErrors = false;

        if (!nome.trim() || !cpf_motorista.trim()) {
            formsErrors = true;
            toast.error("Preencha todos os campos.")
        }

        if (validarNome(nome)) {
            toast.error('Nome inválido. Usuário deve conter apenas letras e espaços')
        }


        if (formsErrors) return

        try {
            const response = await axios.post('http://localhost:3001/motorista', {
                nome,
                cpf_motorista: cpfLimpo
            })

            toast.success('Motorista cadastrado com sucesso.')
            console.log(response.data)

        } catch (err) {
            const message = get(err, 'response.data.message', '');

            if (message === 'CPF já cadastrado') {
                toast.error('CPF já existente');
            } else {
                toast.error('Erro ao cadastrar motorista')
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
                        value={cpf_motorista}
                        maxLength={14}
                        onChange={e => setCPF(formatarCPF(e.target.value))}
                        placeholder="Digite seu CPF"
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
    )
}