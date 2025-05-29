'use client';

import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'

export default function ModalCadastroMotorista({ isVisible, onClose, onSuccess }) {

    // abrigando minhas const para criar meu responsavel
    const [nome, setNome] = useState('');
    const [cpf_motorista, setCpfMotorista] = useState('');
    const [loading, setLoading] = useState(false)

    // formatando o front do _motorista
    function formatarCPF(valor) {
        valor = valor.replace(/\D/g, '');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return valor
    }

    // nao pode numero e caracter especial
    function validarNome(nome) {
        return /^[A-Za-zÀ-ú\s]+$/.test(nome);
    }


    // modal
    if (!isVisible) return null;

    // modal close
    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // envio do form
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        let formsErrors = false;

        // nao permitir envio sem preencher todo form
        if (!nome.trim() || !cpf_motorista.trim() || !senha.trim()) {
            toast.error('Preencha todos os campos');
            formsErrors = true;
        }

        // validação
        if (!validarNome(nome)) {
            toast.error('Nome inválido. Apenas letras e espaços são permitidos.');
            formsErrors = true;
        }

        // validação 
        if (!validarSenha(senha)) {
            toast.error('Senha deve conter pelo menos 6 caracteres');
            formsErrors = true;
        }

        // se form conter erros, nao envie
        if (formsErrors) {
            setLoading(false);
            return;
        }

        // caso aprovado...
        try {

            const response = await axios.post('http://localhost:3001/motorista', {
                nome,
                cpf_motorista,
            });

            toast.success('Admininstrador cadastrado com sucesso.');
            console.log('Dados enviados: ', response)

        } catch (err) {
            console.error(err);

            // aqui eu envio uma requisição ao meu controller
            // que conversa com meu model, por isso consigo tratar o toast
            // da forma que eu quero
            if (err.response && err.response.status === 400) {
                toast.error('CPF já cadastrado.');
            } else {
                toast.error('Erro ao cadastrar administrador.');
            }

        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300 p-4"
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
                        <label htmlFor="nome" className="text-xs sm:text-sm font-medium text-gray-300 mb-1">Nome</label>
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
                        <label htmlFor="_motorista" className="text-xs sm:text-sm font-medium text-gray-300 mb-1">CPF</label>
                        <input
                            id="_motorista"
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
                        className={`mt-1 sm:mt-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 sm:py-3 px-4 rounded-lg font-bold transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm sm:text-base ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-blue-900 hover:shadow-blue-900/30'
                            }`}
                    >
                        {/* mudar estado do envio, apenas front-end nada demais */}
                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>
            </div>
        </div>
    );

}
