'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';
import MapWrapper from '../Components/MapaRota/MapWrapperBase';
import ChatBox from '../Components/Chatbot/ChatBotAluno';

export default function RotaAluno() {
    const [acaoAluno, setAcaoAluno] = useState('');
    const [cpf_user, setCpf_user] = useState('');
    const [coordenada, setCoordenada] = useState('');
    const [girando, setGirando] = useState(false);
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => setLoading(false), 800);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        setCpf_user(localStorage.getItem("cpf_User"));
        const local = JSON.parse(localStorage.getItem('currentLocation'));
        setCoordenada(local);
    }, []);

    useEffect(() => {
        const fetchAcaoAluno = async () => {
            if (!cpf_user) return;
            try {
                const response = await axios.get(`http://localhost:3001/log/alunoLast/${cpf_user}`);
                const acao = response.data.evento;
                setAcaoAluno(acao === 'subir' ? 'descer' : 'subir');
            } catch (err) {
                console.log('Erro ao buscar ação do aluno:', err);
                setAcaoAluno('subir');
            }
        };
        fetchAcaoAluno();
    }, [cpf_user]);

    const inverterAcao = () => {
        const novaAcao = acaoAluno === 'subiu' ? 'desceu' : 'subiu';
        setAcaoAluno(novaAcao);
        toast.success(`Você ${novaAcao}`, {
            duration: 2500,
        });
    };

    const sendLog = async () => {
        const idRota = localStorage.getItem('rotaAtual');
        if (idRota?.trim()) {
            axios.post('http://localhost:3001/log/aluno', {
                cpf_user,
                id_rota_onibus: idRota,
                evento: acaoAluno,
                lat: coordenada[0],
                lgt: coordenada[1]
            }).catch(err => console.log('Houve um erro ao enviar o Log (Front)', err));
        } else {
            console.warn('idRota não está disponível no localStorage');
        }
    };

    return (
        <>
            {loading && (
                <div className={`fixed inset-0 bg-black/90 backdrop-blur-3xl flex items-center justify-center z-50 transition-opacity duration-1500 ease-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
                    <img src="/Logo.png" alt="Logo" className="w-40 animate-pulse" />
                </div>
            )}
         <main className="bg-gradient-to-r from-gray-900 to-gray-500 min-h-screen p-4 flex flex-col items-center justify-center">
  <div className="max-w-7xl w-full flex flex-col items-center">
    <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 text-center">Rota do ônibus</h1>
    <div className="w-full max-w-4xl h-[300px] sm:h-[400px] md:h-[500px] mb-4">
      <MapWrapper />
    </div>

    <div className="flex justify-center mt-6">
      <button
        onClick={() => {
          sendLog();
          inverterAcao();
          setGirando(prev => !prev);
        }}
        className="text-white font-semibold px-6 py-3 rounded flex items-center gap-2 transition duration-200 hover:brightness-110 cursor-pointer"
        style={{ background: 'linear-gradient(to right, #00305E, #0355A3)' }}
      >
        {acaoAluno}
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${girando ? 'rotate-180' : 'rotate-0'}`}
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
    );
}
