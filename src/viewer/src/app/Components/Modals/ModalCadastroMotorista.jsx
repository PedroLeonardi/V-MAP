'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export default function ModalCadastroMotorista({ isVisible, onClose, onSuccess }) {
    const [nome, setNome] = useState('');
    const [cpf_motorista, setCpfMotorista] = useState('');
    const [loading, setLoading] = useState(false);

    function formatarCPF(valor) {
        valor = valor.replace(/\D/g, '');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return valor;
    }
       // validar cpf real segundo a RF
       function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');

        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        const calcDV = (cpfSlice, factor) => {
            let total = 0;
            for (let i = 0; i < cpfSlice.length; i++) {
                total += parseInt(cpfSlice[i]) * (factor - i);
            }
            const resto = total % 11;
            return resto < 2 ? 0 : 11 - resto;
        };

        const dv1 = calcDV(cpf.slice(0, 9), 10);
        const dv2 = calcDV(cpf.slice(0, 10), 11);

        return dv1 === parseInt(cpf[9]) && dv2 === parseInt(cpf[10]);
    }

    function validarNome(nome) {
        return /^[A-Za-zÀ-ú\s]+$/.test(nome);
    }

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            setCpfMotorista('');
            setNome('');
            onClose();
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        let formsErrors = false;

        if (!nome.trim() || !cpf_motorista.trim()) {
            toast.error('Preencha todos os campos');
            formsErrors = true;
        }

        if (!validarNome(nome)) {
            toast.error('Nome inválido. Apenas letras e espaços são permitidos.');
            formsErrors = true;
        }

        if(!validarCPF(cpf_motorista)){
            toast.error('CPF inválido');
            formsErrors = true;
        }

        if (formsErrors) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/motorista', {
                nome,
                cpf_motorista,
            });

            if (onSuccess) onSuccess();
            toast.success('Motorista cadastrado com sucesso.');
            console.log('Dados enviados: ', response);
            setCpfMotorista('');
            setNome('');
            onClose();
        } catch (err) {
            console.error(err);

            if (err.response && err.response.status === 400) {
                toast.error('CPF já cadastrado.');
            } else {
                toast.error('Erro ao cadastrar motorista.');
            }
        } finally {
            setLoading(false);
        }
    }

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 bg-opacity-50 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300 p-4"
            onClick={handleClose}
        >
            <div className="w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700 relative transform transition-all duration-300 scale-100 hover:scale-[1.01] max-h-[90vh] overflow-y-auto">
                <button
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors duration-200 text-xl sm:text-2xl bg-gray-700 hover:bg-gray-600 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center"
                    onClick={onClose}
                >
                    &times;
                </button>

                <div className="mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Cadastro de Motorista</h2>
                    <div className="w-10 sm:w-12 h-1 bg-blue-500 rounded-full"></div>
                </div>

                <form className="flex flex-col gap-3 sm:gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="nome" className="text-xs sm:text-sm font-medium text-gray-300 mb-1">Nome Completo</label>
                        <input
                            id="nome"
                            type="text"
                            className="text-sm sm:text-base border border-gray-600 p-2 sm:p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            placeholder="Nome"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="cpf_motorista" className="text-xs sm:text-sm font-medium text-gray-300 mb-1">CPF</label>
                        <input
                            id="cpf_motorista"
                            type="text"
                            value={cpf_motorista}
                            maxLength={14}
                            onChange={e => setCpfMotorista(formatarCPF(e.target.value))}
                            className="text-sm sm:text-base border border-gray-600 p-2 sm:p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="000.000.000-00"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-1 sm:mt-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 sm:py-3 px-4 rounded-lg font-bold transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm sm:text-base ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-blue-900 hover:shadow-blue-900/30'}`}
                    >
                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}