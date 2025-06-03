'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ModalRelatorioRotas({ isVisible, onClose }) {
  const [rotas, setRotas] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    if (isVisible) {
      axios.get('http://localhost:3001/rota')
        .then(response => setRotas(response.data))
        .catch(err => console.error('Erro ao buscar rotas: ', err));
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const rotasFiltradas = rotas.filter(rota =>
    rota.nome_rua?.toLowerCase().includes(busca.toLowerCase()) ||
    rota.horario?.toLowerCase().includes(busca.toLowerCase()) ||
    rota.rota_id?.toString().includes(busca)
  );

  return (
    <div
      className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex justify-center items-center z-50 p-2 sm:p-4"
      onClick={handleClose}
    >
      <div
        className="
          w-full max-w-full sm:max-w-5xl
          bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700
          p-4 sm:p-6 rounded-xl shadow-2xl border border-gray-700
          relative
          flex flex-col
          h-[90vh] max-h-[600px] sm:h-[85vh]
        "
      >
        <button
          className="
            absolute top-2 right-2 sm:top-4 sm:right-4
            text-gray-400 hover:text-white
            bg-gray-700 hover:bg-gray-600
            rounded-full w-8 h-8 flex items-center justify-center
            text-xl
            transition-colors duration-200
            z-10
          "
          onClick={onClose}
          aria-label="Fechar modal"
        >
          &times;
        </button>

        <div className="flex flex-col h-full">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
              Checkpoints de Rotas
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm">
              {rotasFiltradas.length} {rotasFiltradas.length === 1 ? 'registro' : 'registros'} encontrados
            </p>
          </div>

          <div className="mb-4 sm:mb-6">
            <input
              type="text"
              placeholder="Buscar (rua, horário ou ID)..."
              className="
                w-full px-3 py-2 sm:px-4 sm:py-3 rounded-md bg-gray-800 text-white
                border border-gray-600
                focus:outline-none focus:ring-2 focus:ring-blue-500
                text-sm sm:text-base
              "
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          {/* Container da tabela com scroll vertical apenas em mobile */}
          <div className="flex-1 overflow-auto">
            <div className="min-w-full">
              {/* Layout para mobile - cards */}
              <div className="sm:hidden space-y-2">
                {rotasFiltradas.length > 0 ? (
                  rotasFiltradas.map((rota) => (
                    <div key={rota.checkpoint_id} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-400">ID:</p>
                          <p>{rota.checkpoint_id}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Rota ID:</p>
                          <p>{rota.rota_id}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-400">Rua:</p>
                          <p className="truncate">{rota.nome_rua || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Coordenadas:</p>
                          <p className="truncate">
                            {rota.coordenadas && typeof rota.coordenadas === 'object'
                              ? `${rota.coordenadas.x}, ${rota.coordenadas.y}`
                              : rota.coordenadas || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">Horário:</p>
                          <p>{rota.horario || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    Nenhum checkpoint encontrado
                  </div>
                )}
              </div>

              {/* Layout para desktop - tabela */}
              <table className="hidden sm:table w-full text-left text-white border-collapse">
                <thead className="bg-gray-800 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">ID</th>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">Rota ID</th>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">Coordenadas</th>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">Rua</th>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">Horário</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {rotasFiltradas.map((rota) => (
                    <tr key={rota.checkpoint_id} className="hover:bg-gray-700/50">
                      <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm">{rota.checkpoint_id}</td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm">{rota.rota_id}</td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm">
                        {rota.coordenadas && typeof rota.coordenadas === 'object'
                          ? `${rota.coordenadas.x}, ${rota.coordenadas.y}`
                          : rota.coordenadas || 'N/A'}
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">{rota.nome_rua || 'N/A'}</td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm">{rota.horario || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}