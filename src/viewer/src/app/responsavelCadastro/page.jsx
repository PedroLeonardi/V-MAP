'use client'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'sonner';
import { useRouter } from 'next/navigation';
import { get } from 'lodash';

export default function responsavelCadastro() {

    const [nome, setNome] = useState('');
    const [cpf, setCPF] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {

        e.preventDefault();
        setLoading(true);

        let formsErrors = false;

        if (!nome.trim() || !senha.trim() || !cpf.trim()) {
            formsErrors = true;
            toast.error("Preencha todos os campos.")
        }

        if(formsErrors) return

        try {
            const response = await axios.post ('http://localhost:3001/responsavel', {
                nome,
                cpf,
                senha,
            })

            toast.success('Cadastro concluido com sucesso!!')
            console.log(response.data)
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
                        type="number"
                        value={cpf}
                        onChange={e => setCPF(e.target.value)}
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