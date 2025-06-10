// app/RotaAluno/page.jsx (ou onde quer que esteja sua página RotaAluno)
'use client'

import axios from 'axios';
import MapWrapper from '../Components/MapaRota/MapWrapperBase'; // Ajuste o caminho se necessário
import { useEffect, useState, useRef } from 'react'; // Adicione useRef
import ChatBox from '../Components/Chatbot/Chatbot'

export default function RotaAluno() {
    const [acaoAluno, setAcaoAluno] = useState('')
    const [cpf_user, setCpf_user] = useState('')
    const [coordenada, setCoordenada] = useState('')
    const [girando, setGirando] = useState('0'); // Isso não é um booleano, deveria ser boolean
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    // Estado para controlar o índice do mapa e referência para o log
    const [selectedIndex, setSelectedIndex] = useState(0); // Inicialize com 0 ou outro valor padrão
    const logEnabledRef = useRef(false);

    // Funções de navegação do mapa (agora na página RotaAluno)
    const handleNext = () => {
        logEnabledRef.current = true;
        setSelectedIndex(prev => prev + 1);
    };

    const handlePrevious = () => {
        logEnabledRef.current = true;
        setSelectedIndex(prev => Math.max(prev - 1, 0));
    };
    
    // Efeito para o loading inicial
    useEffect(() => {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }, 2000);
  
      return () => clearTimeout(timer);
    }, []);

    // Efeito para carregar CPF e coordenadas
    useEffect(() => {
        setCpf_user(localStorage.getItem("cpf_User"))
        let local = JSON.parse(localStorage.getItem('currentLocation'));
        setCoordenada(local)
    }, [])

    // Efeito para buscar a ação do aluno (ajustei para usar cpf_user como dependência)
    useEffect(() => {
        const fetchAcaoAluno = async () => {
            if (!cpf_user) return; // Não faz a chamada se o CPF não estiver disponível ainda
            try {
                const response = await axios.get(`http://localhost:3001/log/alunoLast/${cpf_user}`);
                const acao = response.data.evento;
                if (acao === 'subir') {
                    setAcaoAluno('descer');
                } else if (acao === 'descer') {
                    setAcaoAluno('subir');
                } else { // Se não houver ação anterior, define como 'subir'
                    setAcaoAluno('subir');
                }
            } catch (err) {
                console.log('Erro ao buscar ação do aluno:', err);
                setAcaoAluno('subir'); // Define como 'subir' em caso de erro
            }
        };

        fetchAcaoAluno();
    }, [cpf_user]); // Adicione cpf_user como dependência para re-executar quando ele for definido

    // Removi a linha `if (!acaoAluno) { setAcaoAluno('subir') }` pois o useEffect já cobre isso.
    const inverterAcao = () => {
        setAcaoAluno(prevAcao => (prevAcao === 'subir' ? 'descer' : 'subir'));
    }

    const sendLog = async () => {
        const idRota = localStorage.getItem('rotaAtual');

        if (idRota && idRota.trim() !== '') {
            axios.post('http://localhost:3001/log/aluno', {
                cpf_user: cpf_user,
                id_rota_onibus: idRota,
                evento: acaoAluno,
                lat: coordenada[0],
                lgt: coordenada[1]
            })
                .catch(err => console.log('Houve um erro ao enviar o Log (Front)', err));
        } else {
            console.warn('idRota não está disponível no localStorage');
        }
    }

    return (
        <>
            {loading && (
                <div
                    className={`fixed inset-0 bg-black/90 backdrop-blur-3xl flex items-center justify-center z-50
                    transition-opacity duration-1500 ease-out
                    ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
                >
                    <img src="/Logo.png" alt="Logo" className="w-70 animate-pulse" />
                </div>
            )}
            <main className="bg-gradient-to-r from-gray-900 to-gray-500 min-h-screen p-4 md:p-8">
                <div className="max-w-7xl mx-auto flex flex-col items-center"> {/* Container principal da página */}
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-10 text-center md:ml-10">Rota do ônibus</h1>
                    
                    {/* Container do Mapa - para controlar a largura e centralização */}
                    <div className="w-full max-w-5xl md:max-w-xl md:ml-20 lg:max-w-3xl h-[300px] md:h-[400px] mb-6"> {/* Adicione altura responsiva */}
                        <MapWrapper
                            selectedIndex={selectedIndex}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                            logEnabledRef={logEnabledRef}
                        />
                    </div>
                    
                    {/* Container dos Botões de Navegação do Mapa (Anterior/Próximo) */}
                    <div className="flex justify-between w-full max-w-5xl md:max-w-lg md:ml-20 lg:max-w-3xl mb-6">
                        <button
                            className="w-35 h-15 rounded cursor-pointer hover:invert text-white  font-semibold px-4 py-2 text-sm md:px-6 md:py-3 md:text-base"
                            style={{ background: 'linear-gradient(to right, #00305E, #0355A3)' }}
                            onClick={handlePrevious}
                        >
                            Anterior
                        </button>
                        <button
                            className="w-35 h-15 rounded cursor-pointer hover:invert text-white font-semibold px-4 py-2 text-sm md:px-6 md:py-3 md:text-base"
                            style={{ background: 'linear-gradient(to right, #00305E, #0355A3)' }}
                            onClick={handleNext}
                        >
                            Próximo
                        </button>
                    </div>

                    {/* Botão de Ação do Aluno (Subir/Descer) */}
                    <div className="flex justify-center mb-10 md:ml-20"> {/* Centraliza este botão */}
                        <button 
                            onClick={() => { sendLog(); inverterAcao(); setGirando(prev => !prev) }} 
                            className={`text-white font-semibold px-6 py-3 rounded flex items-center gap-2 transition duration-200 hover:brightness-110 cursor-pointer`} 
                            style={{ background: 'linear-gradient(to right, #00305E, #0355A3)' }}
                        >
                            {acaoAluno}
                            <svg 
                                className={`w-5 h-5 cursor-pointer transition-transform duration-300 ease-in-out transform ${girando ? 'rotate-180' : 'rotate-0'}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                    
                    <ChatBox />
                </div>
            </main>
        </>
    )
}