'use client'

import axios from 'axios';
import MapWrapper from '../Components/MapaRota/MapWrapperBase';
import { use, useEffect, useState } from 'react';
import ChatBox from '../Components/Chatbot/Chatbot'

export default function RotaAluno() {
    const [acaoAluno, setAcaoAluno] = useState('')
    const [cpf_user, setCpf_user] = useState('')
    const [coordenada, setCoordenada] = useState('')
    const [girando, setGirando] = useState('0');

    useEffect(() => {

        setCpf_user(localStorage.getItem("cpf_User"))
        let local = JSON.parse(localStorage.getItem('currentLocation'));
        setCoordenada(local)

    }, [])

    useEffect(() => {
        const fetchAcaoAluno = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/log/alunoLast/${cpf_user}`);
                const acao = response.data.evento;
                if (acao === 'subir') {
                    setAcaoAluno('descer');
                } else if (acao === 'descer') {
                    setAcaoAluno('subir');
                }
            } catch (err) {
                console.log('Erro ao buscar ação do aluno:', err);
            }
        };

        fetchAcaoAluno();
    }, []);
    useEffect(() => {
        const fetchAcaoAluno = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/log/alunoLast/${cpf_user}`);
                const acao = response.data.evento;

                if (acao === 'subir') {
                    setAcaoAluno('descer');
                } else if (acao === 'descer') {
                    setAcaoAluno('subir');
                }
                if (!acao) {
                    setAcaoAluno('subir');
                }

            } catch (err) {
                console.log('Erro ao buscar ação do aluno:', err);
            }
        };

        fetchAcaoAluno();
    }, [cpf_user]); 

    if (!acaoAluno) { setAcaoAluno('subir') }
    const inverterAcao = () => {
        if (acaoAluno === 'subir') { setAcaoAluno('descer') } else if (acaoAluno === 'descer') { setAcaoAluno('subir') }


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
        <main className="bg-gradient-to-r from-gray-900 to-gray-500 h-screen">

            <main>
                <h1 className="text-4xl pt-15 pl-185">Rota do onibus</h1>
                <div className='h-100 mb-10 w-[50%] pl-115'>
                    <MapWrapper />
                </div>
                <div className="pl-200"><button onClick={() => setGirando(prev => !prev)} className={`text-white font-semibold px-6 py-3 rounded flex items-center gap-2 transition duration-200 hover:brightness-110 cursor-pointer`} style={{ background: 'linear-gradient(to right, #00305E, #0355A3)' }} onClick={() => { sendLog(), inverterAcao() }} >
                    {acaoAluno}
                    <svg onClick={() => setGirando(prev => !prev)} className={`w-5 h-5 cursor-pointer transition-transform duration-300 ease-in-out transform ${girando ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button> </div>
            </main>
            <ChatBox />
        </main >
    )
}