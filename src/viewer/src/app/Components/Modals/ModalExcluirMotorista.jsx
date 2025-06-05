'use client'

import axios from "axios"
import { useState } from "react"
import { toast } from 'sonner'
import { IoClose } from "react-icons/io5";

export default function ModalExcluirMotorista({ isVisible, onClose, onSuccess }) {

    const [cpfBusca, setCpfBusca] = useState('');
    const [motorista, setMotorista] = useState(null);
    const [loading, setLoading] = useState(false);

    function formatarCPF(valor) {
        if (!valor) return '';
        valor = valor.replace(/\D/g, '');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return valor;
    }

    // apenas para buscar
    const handleCpfChange = (e) => {
        const valor = e.target.value;
        const cpfFormatado = formatarCPF(valor);
        setCpfBusca(cpfFormatado);
    }

    const buscarMotorista = async () => {

        try {
            setLoading(true);

            const response = await axios.get(`http://localhost:3001/motorista/cpf/${cpfBusca}`);

            if (!response.data) {
                throw new Error('Motorista não encontrado');
            }

            setMotorista(response.data);
            toast.success('Motorista encontrado!');

        } catch (err) {
            console.error(err);
            toast.error('Motorista não encontrado. Verifique o CPF.');
            setMotorista(null);
        } finally {
            setLoading(false);
        }
    }

    const excluirMotorista = async () => {
        if (!motorista?.id_motorista) {
            return toast.error('Nenhum motorista selecionado para exclusão.');
        }

        try {
            setLoading(true);

            const response = await axios.delete(`http://localhost:3001/motorista/${motorista.id_motorista}`);

            if (response.status === 200) {
                toast.success('Motorista excluído com sucesso!');
                setMotorista(null);
                setCpfBusca('');
            } else {
                throw new Error('Erro ao excluir responsável');
            }

        } catch (err) {
            console.error('Erro na exclusão:', err);

            let errorMessage = 'Erro ao excluir responsável';

            // enviando requisição ao controller para tratar erros
            // e aparecer no toast
            if (err.response) {
                if (err.response.status === 404) {
                    errorMessage = 'Motorista não encontrado no sistema';
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

                <h2 className="text-xl font-bold">Excluir Motorista</h2>

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
                            onClick={buscarMotorista}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded whitespace-nowrap"
                            disabled={loading}
                        >
                            {loading ? "Buscando..." : "Buscar"}
                        </button>
                    </div>
                </div>

                {motorista && (
                    <div className="mt-4 space-y-4 border-t border-gray-700 pt-4">
                        <div className="space-y-2">
                            <p><span>Nome:</span> {motorista.nome}</p>
                            <p><span>CPF:</span> {formatarCPF(motorista.cpf_motorista)}</p>
                        </div>

                        <button
                            onClick={excluirMotorista}
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
    