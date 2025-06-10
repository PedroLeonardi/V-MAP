'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

import ChatBox from '../Components/Chatbot/Chatbot'
export default function DashAluno() {
      const [data, setAdm] = useState([])
      const [busca, setBusca] = useState('') // sistema de busca
      const [viewResponsavel, setViewResponsavel] = useState([])
      
    
      // Requisição para a API

      

      async function lerViewerResponsavel () {

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
        <main className="h-screen bg-gradient-to-r from-gray-300 to-gray-400">
            <div className="text-black">
                <h1 className="pt-20 pl-20 text-7xl"> Bem vindo aos logs do aluno</h1>
                <p className="pt-10 pl-20 text-xl">aqui você pode acompanhar se ele subiu no onibus e em que ponto ele está!</p>
            </div>

            <div className='w-full flex justify-center mt-50'>
      <div className="w-[85%] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700 relative transform transition-all duration-300 scale-100 overflow-y-auto">
 
      

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">Registro do Transporte do seu filho</h2>
          <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
        </div>

        {/* searchh */}
        

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-white border border-gray-600">
            <thead className="bg-gray-800 text-gray-300 uppercase text-xs">
              <tr>
                <th className="px-4 py-2 border border-gray-600">ID</th>
                <th className="px-4 py-2 border border-gray-600">Nome</th>
                <th className="px-4 py-2 border border-gray-600">CPF</th>
              </tr>
            </thead>
            <tbody>
              {/* eu passo a const admsFiltrados */}
              {data.map((data) => (
                <tr key={data.id_data} className="hover:bg-gray-700">
                  <td className="px-4 py-2 border border-gray-600">{data.id_data}</td>
                  <td className="px-4 py-2 border border-gray-600">{data.nome}</td>
                  <td className="px-4 py-2 border border-gray-600">{data.cpf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.length === 0 && (
          <p className="text-center text-gray-400 mt-4">Nenhum data encontrado.</p>
        )}
      </div>
    </div>

             <ChatBox />
        </main>
    )
}
