'use client';

import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'

export default function ModalCadastroResponsavel({ isVisible, onClose, onSuccess }) {

    // abrigando minhas const para criar meu responsavel
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf_responsavel, setCPF] = useState('');
    const [loading, setLoading] = useState(false)

    // formatando o front do cpf
    function formatarCPF(valor) {
        valor = valor.replace(/\D/g, '');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return valor
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

    // nao pode numero e caracter especial
    function validarNome(nome) {
        return /^[A-Za-zÀ-ú\s]+$/.test(nome);
    }

    // maior que 6 e menor que 255
    function validarSenha(senha) {
        return senha.length >= 6 && senha.length <= 255;
    }

    // modal
    if (!isVisible) return null;

    // modal close
    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            setCPF('');
            setNome('');
            setSenha('');
            onClose();
        }
    };

    // envio do form
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        let formsErrors = false;

        // nao permitir envio sem preencher todo form
        if (!nome.trim() || !cpf_responsavel.trim() || !senha.trim()) {
            toast.error('Preencha todos os campos');
            formsErrors = true;
        }

        // validação
        if (!validarNome(nome)) {
            toast.error('Nome inválido. Apenas letras e espaços são permitidos.');
            formsErrors = true;
        }

        // valid
        // if (!validarCPF(cpf_responsavel)) {
        //     toast.error('CPF inválido');
        //     formsErrors = true;
        // }

        // validação 
        if (!validarSenha(senha)) {
            toast.error('Senha deve conter entre 6 e 255 caracteres.');
            formsErrors = true;
        }

        // se form conter erros, nao envie
        if (formsErrors) {
            setLoading(false);
            return;
        }

        // caso aprovado...
        try {

            const response = await axios.post('http://localhost:3001/responsavel', {
                nome,
                cpf_responsavel,
                senha,
            });
            if (onSuccess) onSuccess(); // <-- AQUI: só chama se for passado
            toast.success('Responsável cadastrado com sucesso.');
            console.log('Dados enviados: ', response)

            setCPF('');
            setNome('');
            setSenha('');
            onClose();

        } catch (err) {
            console.error(err);

            // aqui eu envio uma requisição ao meu controller
            // que conversa com meu model, por isso consigo tratar o toast
            // da forma que eu quero
            if (err.response && err.response.status === 400) {
                toast.error('CPF já cadastrado.');
            } else {
                toast.error('Erro ao cadastrar responsável.');
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
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Cadastro de Responsável</h2>
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
                        <label htmlFor="cpf" className="text-xs sm:text-sm font-medium text-gray-300 mb-1">CPF</label>
                        <input
                            id="cpf"
                            type="text"
                            value={cpf_responsavel}
                            maxLength={14}
                            onChange={e => setCPF(formatarCPF(e.target.value))}
                            className="text-sm sm:text-base border border-gray-600 p-2 sm:p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="000.000.000-00"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="senha" className="text-xs sm:text-sm font-medium text-gray-300 mb-1">Senha</label>
                        <input
                            id="senha"
                            type="password"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            className="text-sm sm:text-base border border-gray-600 p-2 sm:p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Crie uma senha segura"
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
