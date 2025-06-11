'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import ChatBox from '../Components/Chatbot/Chatbot'

export default function DashAluno() {
  const [data, setAdm] = useState([])                     // Dados do aluno
  const [busca, setBusca] = useState('')                  // Filtro de busca (se for usar futuramente)
  const [viewResponsavel, setViewResponsavel] = useState([]) // Informações do responsável


  const formatarDataHora = (isoDate) => {
    const data = new Date(isoDate);
    const opcoes = {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return new Intl.DateTimeFormat('pt-BR', opcoes).format(data);
  };

  // 1ª Requisição: Buscar dados do responsável com base no CPF salvo no localStorage
  useEffect(() => {
    async function lerViewerResponsavel() {
      const cpf_User = await localStorage.getItem('cpf_User')

      try {
        const response = await axios.get(`http://localhost:3001/log/resposavelView/${cpf_User}`)
        setViewResponsavel(response.data)
      } catch (err) {
        console.error("Erro ao acessar dados do responsável:", err)
      }
    }

    lerViewerResponsavel()
  }, [])

  // 2ª Requisição: Buscar dados do aluno assim que receber o CPF do aluno do responsável
  useEffect(() => {
    const cpfAluno = viewResponsavel[0]?.CPF_Aluno
    if (!cpfAluno) return

    axios.get(`http://localhost:3001/log/aluno/${cpfAluno}`)
      .then((response) => {
        console.log('Resposta do aluno:', response.data)

const dados = Array.isArray(response.data) ? response.data : [response.data]
setAdm(dados)

      })
      .catch((err) => {
        console.log('Erro ao buscar dados do aluno: ', err)
      })
  }, [viewResponsavel])

  return (
    <main className="h-screen bg-gradient-to-r from-gray-300 to-gray-400">
      <div className="text-black">
        <h1 className="pt-20 pl-20 text-7xl">Bem-vindo aos logs do aluno</h1>
        <p className="pt-10 pl-20 text-xl">
          Aqui você pode acompanhar se ele subiu no ônibus e em que ponto ele está!
        </p>
      </div>

      <div className="w-full flex justify-center mt-50">
        <div className="w-[85%] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700 relative transform transition-all duration-300 scale-100 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">Registro do Transporte do seu filho</h2>
            <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-white border border-gray-600">
              <thead className="bg-gray-800 text-gray-300 uppercase text-xs">
                <tr>

                  <th className="px-4 py-2 border border-gray-600">ID ONIBUS</th>
                  <th className="px-4 py-2 border border-gray-600">AÇÃO</th>
                  <th className="px-4 py-2 border border-gray-600">DATA E HORA</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.n_LogAluno} className="hover:bg-gray-700">
                    <td className="px-4 py-2 border border-gray-600">{item.id_rota_onibus}</td>
                    <td className="px-4 py-2 border border-gray-600">{item.evento}</td>
                    <td className="px-4 py-2 border border-gray-600">{formatarDataHora(item.dataehora)}</td>
                    

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data.length === 0 && (
            <p className="text-center text-gray-400 mt-4">Nenhum dado encontrado.</p>
          )}
        </div>
      </div>

      <ChatBox />
    </main>
  )
}
