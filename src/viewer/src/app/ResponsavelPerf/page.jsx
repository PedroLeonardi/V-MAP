'use client';

import { useState, useRef, useEffect } from "react";
import axios from 'axios';
import ChatBox from '../Components/Chatbot/ChatBotResponsa';
import ModalForm from '../Components/Modals/ModalForm';

export default function alunoPerf() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        cpf: '',
        mensagem: '',
    });

    const modalRef = useRef(null);

    // Fecha o modal se clicar fora dele
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsModalOpen(false);
            }
        }
        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/contato', formData);
            alert('Mensagem enviada com sucesso!');
        } catch {
            alert('Erro ao enviar. Tente novamente.');
        }
        setIsModalOpen(false);
        setFormData({ nome: '', email: '', cpf: '', mensagem: '' });
    };

    return (
        <main className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-500 flex items-center justify-center p-4">
        <div
          className="bg-opacity-20 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 w-full max-w-3xl shadow-xl md:w-150 md:h-125 md:ml-20 lg:w-[800px] lg:h-150"
          style={{ background: 'linear-gradient(to right, #1E1E1E, #595959, #848484)' }}
        >
      
          {/* TÍTULO MOBILE */}
          <h1 className="text-white text-xl font-bold mb-6 text-center md:hidden">
            Minhas informações
          </h1>
      
      
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            
            {/* FOTO MOBILE */}
            <img
              src="/Perfil.png"
              alt="Perfil"
              className="rounded-full object-cover w-20 h-20 sm:w-24 sm:h-24 md:hidden"
            />
      
            {/* FOTO DESKTOP */}
            <img
              src="/Perfil.png"
              alt="Perfil"
              className="hidden lg:block rounded-full object-cover w-40 h-40"
            />
      
            {/* FORMULÁRIO MOBILE */}
            <form className="w-full md:hidden -mt-10" >
              <div className="mb-3">
                <label htmlFor="nome" className="block text-white text-sm font-semibold mb-1">
                  Nome do aluno
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Ex: João Silva"
                  defaultValue="João Silva"
                  readOnly
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                />
              </div>
      
              <div className="mb-3">
                <label htmlFor="descricaoAluno" className="block text-white text-sm font-semibold mb-1">
                  Descrição do aluno
                </label>
                <textarea
                  id="descricaoAluno"
                  name="descricaoAluno"
                  placeholder="Ex: Aluno dedicado e participativo"
                  defaultValue="Aluno dedicado, participativo, gosta de matemática e robótica."
                  readOnly
                  rows={3}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-sm"
                />
              </div>
      
              <div className="mb-3">
                <label htmlFor="descricaoEscola" className="block text-white text-sm font-semibold mb-1">
                  Descrição da escola
                </label>
                <textarea
                  id="descricaoEscola"
                  name="descricaoEscola"
                  placeholder="Ex: Escola Municipal do Saber"
                  defaultValue="Escola Municipal do Saber, localizada em São Paulo, com foco em inovação e inclusão."
                  readOnly
                  rows={3}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-sm"
                />
              </div>
      
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="mt-3 bg-gradient-to-r from-gray-600 to-gray-800 hover:invert text-white px-3 py-2 rounded text-sm transition cursor-pointer"
                >
                  Mudar dados?
                </button>
              </div>
            </form>
      
            {/* FORMULÁRIO TABLET */}
            <form className="hidden md:block lg:hidden w-full max-w-130">
              <div className="mb-4">
                <label htmlFor="nome" className="block text-white text-base font-semibold mb-1">
                  Nome do aluno
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Ex: João Silva"
                  defaultValue="João Silva"
                  readOnly
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
      
              <div className="mb-4">
                <label htmlFor="descricaoAluno" className="block text-white text-base font-semibold mb-1">
                  Descrição do aluno
                </label>
                <textarea
                  id="descricaoAluno"
                  name="descricaoAluno"
                  placeholder="Ex: Aluno dedicado e participativo"
                  defaultValue="Aluno dedicado, participativo, gosta de matemática e robótica."
                  readOnly
                  rows={3}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
              </div>
      
              <div className="mb-4">
                <label htmlFor="descricaoEscola" className="block text-white text-base font-semibold mb-1">
                  Descrição da escola
                </label>
                <textarea
                  id="descricaoEscola"
                  name="descricaoEscola"
                  placeholder="Ex: Escola Municipal do Saber"
                  defaultValue="Escola Municipal do Saber, localizada em São Paulo, com foco em inovação e inclusão."
                  readOnly
                  rows={3}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
              </div>
      
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 bg-gradient-to-r from-gray-600 to-gray-800 hover:invert text-white px-4 py-2 rounded text-base transition cursor-pointer"
                >
                  Mudar dados?
                </button>
              </div>
            </form>
      
            {/* FORMULÁRIO DESKTOP */}
            <form className="hidden lg:block w-full max-w-190">
              <div className="mb-5">
                <label htmlFor="nome" className="block text-white text-lg font-semibold mb-2">
                  Nome do aluno
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Ex: João Silva"
                  defaultValue="João Silva"
                  readOnly
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
      
              <div className="mb-5">
                <label htmlFor="descricaoAluno" className="block text-white text-lg font-semibold mb-2">
                  Descrição do aluno
                </label>
                <textarea
                  id="descricaoAluno"
                  name="descricaoAluno"
                  placeholder="Ex: Aluno dedicado e participativo"
                  defaultValue="Aluno dedicado, participativo, gosta de matemática e robótica."
                  readOnly
                  rows={4}
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
              </div>
      
              <div className="mb-5">
                <label htmlFor="descricaoEscola" className="block text-white text-lg font-semibold mb-2">
                  Descrição da escola
                </label>
                <textarea
                  id="descricaoEscola"
                  name="descricaoEscola"
                  placeholder="Ex: Escola Municipal do Saber"
                  defaultValue="Escola Municipal do Saber, localizada em São Paulo, com foco em inovação e inclusão."
                  readOnly
                  rows={4}
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
              </div>
      
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="mt-5 bg-gradient-to-r from-gray-600 to-gray-800 hover:invert text-white px-5 py-3 rounded text-lg transition cursor-pointer"
                >
                  Mudar dados?
                </button>
              </div>
            </form>
      
          </div>
        </div>
      
        {isModalOpen && (
          <ModalForm
            modalRef={modalRef}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleFormSubmit}
            formData={formData}
            setFormData={setFormData}
          />
        )}      
        <ChatBox />
      </main>
          );
        }