    'use client'

    import axios from "axios"
    import { useState } from "react"
    import { toast } from 'sonner'
    import { IoClose } from "react-icons/io5";

    export default function ModalExcluirAluno({ isVisible, onClose, onSuccess }) {

        const [cpfBusca, setCpfBusca] = useState('');
        const [aluno, setAluno] = useState(null);
        const [loading, setLoading] = useState(false);

        // formatando o cpf
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
            const cpfFormatado = formatarCPF(valor);
            setCpfBusca(cpfFormatado);
        }

        const buscarAluno = async () => {

            try {
                setLoading(true);

                // verificando se cpf existe
                const response = await axios.get(`http://localhost:3001/aluno/cpf/${cpfBusca}`);

                if (!response.data) {
                    throw new Error('Aluno não encontrado');
                }

                setAluno(response.data);
                toast.success('Aluno encontrado!');

                // tratando erros
            } catch (err) {
                console.log(err);
                toast.error('Aluno não encontrado. Verifique o CPF.');
                setAluno(null);
            } finally {
                setLoading(false);
            }
        }

        const excluirAluno = async () => {

            // se aluno nao existir
            if (!aluno?.id_aluno) {
                return toast.error('Nenhum aluno selecionado para exclusão.');
            }

            try {
                setLoading(true);
                const admin_cpf = await localStorage.getItem('cpf_User')
                // aplicando logica para deletar
                const response = await axios.delete(`http://localhost:3001/aluno/${aluno.id_aluno}`, {
                    data: {
                        admin_cpf
                    }
                });

                if (response.status === 200) {
                    toast.success('Aluno excluído com sucesso!');
                    if (onSuccess) onSuccess(); // <-- AQUI: só chama se for passado
                    setAluno(null);
                    setCpfBusca('');
                } else {
                    throw new Error('Erro ao excluir aluno');
                }
            } catch (err) {
                console.log('Erro na exclusão:', err);

                // mais tratamentos de erros
                let errorMessage = 'Erro ao excluir aluno';
                if (err.response) {

                    // essas mensagens de erros acabam fazendo uma requisição ao back-end
                    // ele acaba mandando a resposta do controller...
                    if (err.response.status === 404) {
                        errorMessage = 'Aluno não encontrado no sistema';
                    } else if (err.response.data?.message) {
                        errorMessage = err.response.data.message;
                    }
                }

                toast.error(errorMessage); // aq recebe a msg do back-end
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
                                <p><span className="font-bold">Nome:</span> {aluno.nome}</p>
                                <p><span className="font-bold">CPF:</span> {formatarCPF(aluno.cpf_aluno)}</p>
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