'use client';

import axios from 'axios';
import MapWrapper from '../Components/MapaRota/MapWrapperResp';
import { useEffect, useState } from 'react';
import ChatBox from '../Components/Chatbot/ChatBotResponsa';
import { toast, Toaster } from "sonner";

export default function RotaAluno() {
    const [acaoAluno, setAcaoAluno] = useState('');
    const [cpf_user, setCpf_user] = useState('');
    const [coordenada, setCoordenada] = useState('');
    const [girando, setGirando] = useState(false);
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [viewResponsavel, setViewResponsavel] = useState([])

// ---------------------
    useEffect(() => {
        async function lerViewerResponsavel() {
          const cpf_User = await localStorage.getItem('cpf_User')
    
          try {
            const response = await axios.get(`http://localhost:3001/log/resposavelView/${cpf_User}`)
            setViewResponsavel(response.data)
          } catch (err) {
            console.error("Erro ao acessar dados do responsável:", err)
            toast.error("Voce Não tem um filho Associado")
          }
        }
    
        lerViewerResponsavel()

    }, [])
    
      // 2ª Requisição: Buscar dados do aluno assim que receber o CPF do aluno do responsável
      useEffect(() => {
        const rotaOnibus = viewResponsavel[0]?.Rota_Onibus
        if (!rotaOnibus) return
        console.log('----------------',rotaOnibus)
        
      }, [])

//----------------------------------

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



  

    

    return (
        <>
            {loading && (
                <div className={`fixed inset-0 bg-black/90 backdrop-blur-3xl flex items-center justify-center z-50 transition-opacity duration-1500 ease-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
                    <img src="/Logo.png" alt="Logo" className="w-40 animate-pulse" />
                </div>
            )}
            <main className="bg-gradient-to-r from-gray-900 to-gray-500 min-h-screen p-4 md:p-8">
                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    <h1 className="text-2xl md:text-4xl font-bold text-white text-center">Rota do ônibus</h1>
                    <h1 className="text-md md:text-xl font-bold text-white mb-6 text-center">Acompanhe em tempo real a localização do seu filho</h1>
                    <div className="w-full max-w-6xl h-[300px] sm:h-[400px] md:h-[500px] mb-4">
                        <MapWrapper />
                    </div>
                    <div
                        className="w-full max-w-4xl flex justify-between px-6 py-4 rounded-md mt-4"
                      
                    >
                    </div>
   
                    <ChatBox />
                </div>
            </main>
        </>
    )
    }
