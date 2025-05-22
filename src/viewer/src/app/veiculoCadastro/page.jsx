'use client'

import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { get } from 'lodash'

export default function VeiculoCadastro() {
    const [n_rota, setRota] = useState('')
    const [coordenadasInicio, setCoordenadasInicio] = useState('')
    const [coordenadasParadas, setCoordenadasParadas] = useState('')
    const [coordenadasFim, setCoordenadasFim] = useState('')
    const [cpf, setCPF] = useState('')
    const [senha, setSenha] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await axios.post('http://localhost:3001/veiculo', {
                n_rota,
                coordenadas_inicio: coordenadasInicio,
                coordenadas_paradas: coordenadasParadas,
                coordenadas_fim: coordenadasFim,
                cpf,
                senha
            })

            toast.success('Veículo cadastrado com sucesso.')
            console.log(response.data)
        } catch (err) {
            const message = get(err, 'response.data.message', '')
            if (message === 'CPF já cadastrado') {
                toast.error('CPF já existente')
            } else {
                toast.error('Erro ao cadastrar usuário')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Cadastro de Veículo</h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 bg-gray-800 p-6 rounded-lg shadow-md w-80"
            >
                <input
                    className="border border-gray-300 rounded px-4 py-2"
                    type="text"
                    value={n_rota}
                    onChange={(e) => setRota(e.target.value)}
                    placeholder="Digite o número da rota"
                />
                <input
                    className="border border-gray-300 rounded px-4 py-2"
                    type="text"
                    value={coordenadasInicio}
                    onChange={(e) => setCoordenadasInicio(e.target.value)}
                    placeholder="Coordenadas de Início"
                />
                <input
                    className="border border-gray-300 rounded px-4 py-2"
                    type="text"
                    value={coordenadasParadas}
                    onChange={(e) => setCoordenadasParadas(e.target.value)}
                    placeholder="Coordenadas de Paradas"
                />
                <input
                    className="border border-gray-300 rounded px-4 py-2"
                    type="text"
                    value={coordenadasFim}
                    onChange={(e) => setCoordenadasFim(e.target.value)}
                    placeholder="Coordenadas Finais"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                >
                    Cadastrar
                </button>
            </form>
        </div>
    )
}
