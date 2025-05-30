'use client';
import { useState } from "react";
import axios from "axios";
import { toast } from 'sonner';
import { IoClose } from "react-icons/io5";

export default function ModalUpdateMotorista({ isVisible, onClose, onSuccess }) {
    const [cpfBusca, setCpfBusca] = useState('');
    const [motorista, setMotorista] = useState(null);
    const [nome, setNome] = useState('');
    const [cpf_motorista, setCpf] = useState('');
    const [loading, setLoading] = useState(false);

    // função para formatar CPF
    function formatarCPF(valor) {
        if (!valor) return '';
        valor = valor.replace(/\D/g, '');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return valor;
    }

    // função para validar nome 
    function validarNome(nome) {
        return /^[A-Za-zÀ-ú\s]+$/.test(nome);
    }
   
    const buscarAdmin = async () => {
       
        if (!cpfBusca) return toast.warning('Informe o CPF para buscar.');

        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3001/motorista/cpf/${cpfBusca}`);
            const motoristaEncontrado = response.data;

            console.log('Motorista encontrado:', motoristaEncontrado);

            setMotorista(motoristaEncontrado);
            setCpf(formatarCPF(motoristaEncontrado.cpf_motorista));
            setNome(motoristaEncontrado.nome);
            toast.success('Motorista encontrado!');
        } catch (err) {
            console.error(err);
            toast.error('Motorista não encontrado ou erro na busca.');
        } finally {
            setLoading(false);
        }
    }

    const atualizarAdmin = async () => {
        if (!motorista) return toast.error('Busque um Motorista antes de atualizar.');

        let formsErrors = false;

        if (!nome.trim() || !cpf_motorista.trim()) {
            toast.error('Preencha todos os campos');
            formsErrors = true;
        }

        if (!validarNome(nome)) {
            toast.error('Nome Inválido. O nome deve conter apenas letras e espaços.');
            formsErrors = true;
        }

        if (formsErrors) return;

        try {
            setLoading(true);

            await axios.put(`http://localhost:3001/motorista/${motorista.id_motorista}`, {
                cpf_motorista,
                nome,
            });

            toast.success('Motorista atualizado com sucesso!');
            setMotorista(null);
            setCpfBusca('');
            setCpf('');
            setNome('');
        } catch (err) {
            console.error(err);

            if (err.response && err.response.status === 404) {
                toast.error('Motorista não encontrado.');
            } else if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error('Erro ao atualizar Motorista.');
            }
        } finally {
            setLoading(false);
        }
    }

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="p-6 max-w-md w-full mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-xl shadow-2xl border border-gray-700 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors duration-200 text-xl bg-gray-700 hover:bg-gray-600 rounded-full w-7 h-7 flex items-center justify-center"
                >
                    <IoClose size={20} />
                </button>

                <h2 className="text-xl font-bold text-white mb-4">Atualizar Cadastro de Motorista</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">Buscar por CPF</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Digite o CPF do Motorista"
                                className="w-full text-sm sm:text-base border border-gray-600 p-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={cpfBusca}
                                onChange={(e) => setCpfBusca(formatarCPF(e.target.value))}
                                maxLength={14}
                            />
                            <button
                                onClick={buscarAdmin}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded whitespace-nowrap text-sm sm:text-base"
                                disabled={loading}
                            >
                                {loading ? "Buscando..." : "Buscar"}
                            </button>
                        </div>
                    </div>

                    {motorista && (
                        <div className="space-y-4 mt-4 border-t border-gray-700 pt-4">
                            <h3 className="font-medium text-white">Dados do Motorista</h3>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">Nome</label>
                                    <input
                                        type="text"
                                        className="w-full text-sm sm:text-base border border-gray-600 p-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">CPF</label>
                                    <input
                                        type="text"
                                        className="w-full text-sm sm:text-base border border-gray-600 p-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={cpf_motorista}
                                        onChange={(e) => setCpf(formatarCPF(e.target.value))}
                                        maxLength={14}
                                    />
                                </div>           
                             
                            </div>

                            <button
                                onClick={atualizarAdmin}
                                className={`w-full mt-4 bg-gradient-to-r from-green-600 to-green-800 text-white py-2 px-4 rounded-lg font-bold transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm sm:text-base ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-green-700 hover:to-green-900 hover:shadow-green-900/30'
                                    }`}
                                disabled={loading}
                            >
                                {loading ? "Atualizando..." : "Confirmar Atualização"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}