'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

import ChatBox from '../Components/Chatbot/ChatBotResponsa'
export default function DashAluno() {
  const [data, setAdm] = useState([])
  const [busca, setBusca] = useState('') // sistema de busca
  const [viewResponsavel, setViewResponsavel] = useState([])


  // Requisição para a API



  async function lerViewerResponsavel() {

    const cpf_User = await localStorage.getItem('cpf_User')

    try {


      axios.get(`http://localhost:3001/log/resposavelView/${cpf_User}`)
        .then(response => setViewResponsavel(response))
        .catch(err => console.log('Houve um erro: ', err))
    } catch (err) {
      console.error("Houve um erro acessa a rota")
    }
  }




  axios.get(`http://localhost:3001/aluno/:cpf${setViewResponsavel}`)
    .then((response) => {
      setAdm(response.data)
    })
    .catch((err) => {
      console.log('Erro ao buscar data: ', err)
    })







  // logica do filtro (ignora maiúsculas/minúsculas)

  return (
    <main
    className="min-h-screen bg-cover bg-center bg-no-repeat px-4 py-10 sm:px-6 md:px-10 flex flex-col items-center"
    style={{ backgroundImage: `url('/BG-log.jpg')` }}
  >
    <div className="text-white text-center sm:text-left w-full max-w-7xl">
      <h1 className="text-3xl sm:text-4xl md:text-6xl md:ml-40 lg:ml-0 font-bold leading-tight md:text-center">
        Bem-vindo aos logs do aluno
      </h1>
      <p className="mt-4 text-base sm:text-lg md:text-xl md:ml-10 lg:ml-0 md:text-center lg:px-0 md:px-10">
        Aqui você pode acompanhar o seu filho, saber se ele já subiu no ônibus e em que ponto ele está!
      </p>
    </div>

    <div className="w-full lg:w-full flex justify-center mt-12 px-2 md:w-170 lg:ml-0 md:ml-20">
      <div className="w-full max-w-6xl overflow-x-auto rounded-xl shadow-2xl border border-gray-700 bg-gradient-to-r from-[#00305E] via-[#01488D] to-[#0355A3] p-4 sm:p-6">
        <div className="mb-6 text-white">
          <h2 className="text-xl sm:text-2xl font-bold mb-1">Registro do Transporte do seu filho</h2>
          <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
        </div>

        <table className="min-w-full text-sm sm:text-base text-left text-white border border-gray-600">
          <thead className="bg-gray-800 text-gray-300 uppercase">
            <tr>
              <th className="px-4 py-2 border border-gray-800">ID</th>
              <th className="px-4 py-2 border border-gray-800">Nome</th>
              <th className="px-4 py-2 border border-gray-800">CPF</th>
            </tr>
          </thead>
          <tbody>
            {data.map((aluno) => (
              <tr key={aluno.id_data} className="hover:bg-gray-700">
                <td className="px-4 py-2 border border-gray-600">{aluno.id_data}</td>
                <td className="px-4 py-2 border border-gray-600">{aluno.nome}</td>
                <td className="px-4 py-2 border border-gray-600">{aluno.cpf}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <p className="text-center text-gray-300 mt-4">Nenhum dado encontrado.</p>
        )}
      </div>
    </div>

    <ChatBox />
  </main>
  )
}
