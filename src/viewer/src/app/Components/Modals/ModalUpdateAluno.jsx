'use client'

import { useState } from "react";
import axios from "axios";
import { toast } from 'sonner';
import { IoClose } from "react-icons/io5";

export default function ModalUpdateAluno({ isVisible, onClose}) {
    const [cpfBusca, setCpfBusca] = useState('');
    const [aluno, setAluno] = useState(null);

    const [nome, setNome] = useState('');
    const [cpf_aluno, setCpfAluno] = useState('');
    // const [cpf_responsavel, setCpfResponsavel] = useState('');
    const [loading, setLoading] = useState(false);

    // função para formatar CPF (
    function formatarCPF(valor) {
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

    const buscarAluno = async () => {

        // enviando cpf limpo para o db/back-end
        if (!cpfBusca) return toast.warning('Informe o CPF para buscar.');

        try {
            setLoading(true);

            // verificando se esse cpf existe
            const response = await axios.get(`http://localhost:3001/aluno/cpf/${cpfBusca}`);
            const alunoEncontrado = response.data;

            // atribuindo ele...
            setAluno(alunoEncontrado);
            setCpfAluno(formatarCPF(alunoEncontrado.cpf_aluno));
            setNome(alunoEncontrado.nome);
            // setCpfResponsavel(formatarCPF(alunoEncontrado.cpf_responsavel));
            toast.success('Aluno encontrado!');

        } catch (err) {
            console.error(err);
            toast.error('Aluno não encontrado ou erro na busca.');
        } finally {
            setLoading(false);
        }
    }

    const atualizarAluno = async () => {
        if (!aluno) return toast.error('Busque um aluno antes de atualizar.');

        // Validações (mesmas do ModalCadastro)
        let formsErrors = false;

        if (!nome.trim() || !cpf_aluno.trim() /*|| || !cpf_responsavel.trim()*/) {
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

            await axios.put(`http://localhost:3001/aluno/${aluno.id_aluno}`, {
                cpf_aluno,
                nome,
                // cpf_responsavel
            });
            
            toast.success('Aluno atualizado com sucesso!');
            setAluno(null);
            setCpfBusca('');
            onClose();
        } catch (err) {
            console.error(err);
        
            // tratamentros de erros
            // nele envio as msg do controller atraves de uma requisicao ao back-end
            // toast personalizado :)
            if (err.response && err.response.status === 404) {
                toast.error('Responsável não encontrado.');
            } else if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error('Erro ao atualizar aluno.');
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

                <h2 className="text-xl font-bold text-white mb-4">Atualizar Cadastro de Aluno</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">Buscar por CPF</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Digite o CPF do aluno"
                                className="w-full text-sm sm:text-base border border-gray-600 p-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={cpfBusca}
                                onChange={(e) => setCpfBusca(formatarCPF(e.target.value))}
                                maxLength={14}
                            />
                            <button
                                onClick={buscarAluno}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded whitespace-nowrap text-sm sm:text-base"
                                disabled={loading}
                            >
                                {loading ? "Buscando..." : "Buscar"}
                            </button>
                        </div>
                    </div>

                    {aluno && (
                        <div className="space-y-4 mt-4 border-t border-gray-700 pt-4">
                            <h3 className="font-medium text-white">Dados do Aluno</h3>
                            
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">Nome Completo</label>
                                    <input
                                        type="text"
                                        className="w-full text-sm sm:text-base border border-gray-600 p-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">CPF do Aluno</label>
                                    <input
                                        type="text"
                                        className="w-full text-sm sm:text-base border border-gray-600 p-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={cpf_aluno}
                                        onChange={(e) => setCpfAluno(formatarCPF(e.target.value))}
                                        maxLength={14}
                                    />
                                </div>

                                {/* <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">CPF do Responsável</label>
                                    <input
                                        type="text"
                                        className="w-full text-sm sm:text-base border border-gray-600 p-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={cpf_responsavel}
                                        onChange={(e) => setCpfResponsavel(formatarCPF(e.target.value))}
                                        maxLength={14}
                                    />
                                </div> */}
                            </div>

                            <button
                                onClick={atualizarAluno}
                                className={`w-full mt-4 bg-gradient-to-r from-green-600 to-green-800 text-white py-2 px-4 rounded-lg font-bold transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm sm:text-base ${
                                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-green-700 hover:to-green-900 hover:shadow-green-900/30'
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