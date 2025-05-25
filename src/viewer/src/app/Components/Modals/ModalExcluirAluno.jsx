'use client'

import axios from "axios"
import { useState } from "react"
import { toast } from 'sonner'
import { IoClose } from "react-icons/io5";

export default function ModalExcluirAluno({ isVisible, onClose, onSuccess }) {

    const [cpfBusca, setCpfBusca] = useState('');
    const [aluno, setAluno] = useState(null);
    const [loading, setLoading] = useState(false);

    function formatarCPF(valor) {
        if (!valor) return '';
        valor = valor.replace(/\D/g, '');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return valor;
    }

    const handleCpfChange = (e) => {
        const valor = e.target.value;
        // Permite apenas números e formata automaticamente
        const cpfFormatado = formatarCPF(valor);
        setCpfBusca(cpfFormatado);
    }

    const buscarAluno = async () => {
        const cpfLimpo = cpfBusca.replace(/\D/g, '');
        if (!cpfLimpo || cpfLimpo.length !== 11) {
            return toast.warning('Informe um CPF válido com 11 dígitos.');
        }

        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3001/aluno/cpf/${cpfLimpo}`);
            
            if (!response.data) {
                throw new Error('Aluno não encontrado');
            }

            setAluno(response.data);
            toast.success('Aluno encontrado!');
        } catch (err) {
            console.error(err);
            toast.error('Aluno não encontrado. Verifique o CPF.');
            setAluno(null);
        } finally {
            setLoading(false);
        }
    }

    const excluirAluno = async () => {
        if (!aluno?.id_aluno) {
            return toast.error('Nenhum aluno selecionado para exclusão.');
        }

        try {
            setLoading(true);
            const response = await axios.delete(`http://localhost:3001/aluno/${aluno.id_aluno}`);
            
            if (response.status === 200) {
                toast.success('Aluno excluído com sucesso!');
                setAluno(null);
                setCpfBusca('');
                if (onSuccess) onSuccess(); // Notifica o componente pai
                if (onClose) onClose(); // Fecha o modal
            } else {
                throw new Error('Erro ao excluir aluno');
            }
        } catch (err) {
            console.error('Erro na exclusão:', err);
            
            let errorMessage = 'Erro ao excluir aluno';
            if (err.response) {
                if (err.response.status === 404) {
                    errorMessage = 'Aluno não encontrado no sistema';
                } else if (err.response.data?.message) {
                    errorMessage = err.response.data.message;
                }
            }
            
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="p-6 max-w-md w-full bg-gray-800 rounded-xl shadow-lg space-y-4 text-white relative">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <IoClose size={24} />
                </button>

                <h2 className="text-xl font-bold">Excluir Aluno</h2>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Buscar por CPF</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="000.000.000-00"
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                            value={cpfBusca}
                            onChange={handleCpfChange}
                            maxLength={14}
                            disabled={loading}
                        />
                        <button
                            onClick={buscarAluno}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded whitespace-nowrap"
                            disabled={loading}
                        >
                            {loading ? "Buscando..." : "Buscar"}
                        </button>
                    </div>
                </div>

                {aluno && (
                    <div className="mt-4 space-y-4 border-t border-gray-700 pt-4">
                        <div className="space-y-2">
                            <p><strong>Nome:</strong> {aluno.nome}</p>
                            <p><strong>CPF:</strong> {formatarCPF(aluno.cpf_aluno)}</p>
                        </div>

                        <button
                            onClick={excluirAluno}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full"
                            disabled={loading}
                        >
                            {loading ? "Excluindo..." : "Confirmar Exclusão"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}