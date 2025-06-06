'use client';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { IoChatbubbleEllipsesSharp, IoClose, IoSend } from "react-icons/io5";

export default function ChatBox() {
  // perguntas frequentes
  const perguntas = [
    { 
      question: 'Como contratar o serviço?', 
      answer: 'Para contratar nossos serviços, entre em contato através da aba "Contatos" ou envie sua dúvida por este chat.' 
    },
    {
      question: 'Como cadastrar meu filho no sistema?',
      answer: 'O cadastro de alunos é feito pela equipe da coordenação. Envie uma mensagem aqui para iniciarmos o processo.',
    },
  ];

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' }); 
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showForm]);

  const addMessage = (text, sender) => {
    setMessages(prev => [...prev, { text, sender }]);
  };

  const handleFAQClick = (faq) => {
    addMessage(faq.question, 'user');
    setTimeout(() => addMessage(faq.answer, 'bot'), 500);
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    addMessage(text, 'user');
    setInput('');

    const isPerguntas = perguntas.some(faq => 
      faq.question.toLowerCase().includes(text.toLowerCase()) || 
      text.toLowerCase().includes(faq.question.toLowerCase())
    );

    if (!isPerguntas) {
      setTimeout(() => {
        addMessage('Não encontrei essa resposta. Por favor, preencha seus dados para enviarmos sua pergunta ao nosso time.', 'bot');
        setShowForm(true);
        setFormData(prev => ({ ...prev, mensagem: text }));
      }, 500);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/contato', formData);
      addMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'bot');
    } catch {
      addMessage('Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.', 'bot');
    }
    setShowForm(false);
    setFormData({ nome: '', email: '', mensagem: '' });
  };

  const fecharChat = () => {
    setIsOpen(false);
    setMessages([]);
    setShowForm(false);
    setFormData({ nome: '', email: '', mensagem: '' });
    setInput('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white px-4 py-3 rounded-full font-medium shadow-lg flex items-center gap-2 hover:bg-blue-600 transition-all"
        >
          <span>Precisa de ajuda?</span>
          <IoChatbubbleEllipsesSharp size={20} />
        </button>
      ) : (
        <div className="w-80 h-[500px] flex flex-col bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gray-900 text-white p-3 flex justify-between items-center border-b border-gray-700">
            <h3 className="font-semibold">Chat de Ajuda</h3>
            <button 
              onClick={fecharChat} 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <IoClose size={20} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-900 flex flex-col gap-3">
            {messages.length === 0 ? (
              <div className="flex flex-col gap-2">
                <p className="text-gray-400 mb-2">Olá! Como posso te ajudar?</p>
                {perguntas.map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => handleFAQClick(faq)}
                    className="w-full text-left bg-gray-800 text-white p-3 rounded hover:bg-gray-700 transition"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-blue-500 text-white ml-auto rounded-br-none' 
                      : 'bg-gray-700 text-white mr-auto rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              ))
            )}

            {showForm && (
              <form onSubmit={submitForm} className="mt-4 p-4 bg-gray-800 rounded-lg space-y-3">
                <div className="space-y-1">
                  <label htmlFor="nome" className="text-sm text-gray-300">Seu nome</label>
                  <input
                    id="nome"
                    type="text"
                    placeholder="Digite seu nome completo"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm text-gray-300">Seu e-mail</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Digite seu melhor e-mail"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="mensagem" className="text-sm text-gray-300">Sua mensagem</label>
                  <textarea
                    id="mensagem"
                    value={formData.mensagem}
                    readOnly
                    rows={3}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-sm text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition font-medium"
                >
                  Enviar mensagem
                </button>
              </form>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-3 bg-gray-800 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 p-2 bg-gray-900 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                <IoSend size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
