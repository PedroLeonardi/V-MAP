'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ModalHistoricoAdm({ isVisible, onClose }) {
 

    const [admin, setAdm] = useState([])
    const [busca, setBusca] = useState('') // sistema de busca
  

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
    // Requisição para a API
    useEffect(() => {
      if (isVisible) {
        axios.get('http://localhost:3001/log/admin')
          .then((response) => {
            setAdm(response.data)
          })
          .catch((err) => {
            console.log('Erro ao buscar admin: ', err)
          })
      }
    }, [isVisible])
  
    if (!isVisible) return null;
    console.log(admin)
    const handleClose = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
  
    // logica do filtro (ignora maiúsculas/minúsculas)
    const admsFiltrados = admin.filter((admin) =>
      admin.admin_cpf?.toLowerCase().includes(busca.toLowerCase())
    );
  
    return (
      <div
        className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300 p-4"
        onClick={handleClose}
      >
        <div className="w-full max-w-4xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700 relative transform transition-all duration-300 scale-100 hover:scale-[1.01] max-h-[90vh] overflow-y-auto">
          <button
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors duration-200 text-xl sm:text-2xl bg-gray-700 hover:bg-gray-600 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center"
            onClick={onClose}
          >
            &times;
          </button>
  
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">Historico de Ações</h2>
            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
          </div>
  
          {/* searchh */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar por nome..."
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
  
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-white border border-gray-600">
              <thead className="bg-gray-800 text-gray-300 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2 border border-gray-600">CPF AUTOR</th>
                  <th className="px-4 py-2 border border-gray-600">TABELA</th>
                  <th className="px-4 py-2 border border-gray-600">AÇÃO</th>
                  <th className="px-4 py-2 border border-gray-600">DATA HORA</th>
                </tr>
              </thead>
              <tbody>
                {/* eu passo a const admsFiltrados */}
                {admsFiltrados.map((admin) => (
                  <tr key={admin.id} className="hover:bg-gray-700">
                    {}
                    <td className="px-4 py-2 border border-gray-600">{admin.admin_cpf}</td>
                    <td className="px-4 py-2 border border-gray-600">{admin.tabela_nome}</td>
                    <td className="px-4 py-2 border border-gray-600">{admin.operacao_tipo}</td>
                    <td className="px-4 py-2 border border-gray-600">
                    {formatarDataHora(admin.data_hora)}
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {admsFiltrados.length === 0 && (
            <p className="text-center text-gray-400 mt-4">Nenhum admin encontrado.</p>
          )}
        </div>
      </div>
    );
}