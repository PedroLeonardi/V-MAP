'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ModalRelatorioRotas({ isVisible, onClose }) {
  const [dadosPainel, setDadosPainel] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isVisible) {
      fetchDadosPainel();
    }
  }, [isVisible]);

  const fetchDadosPainel = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3001/painel');
      setDadosPainel(response.data);
    } catch (err) {
      console.error('Erro ao buscar dados do painel:', err);
      setError('Erro ao carregar dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const dadosFiltrados = dadosPainel.filter(item =>
    item.NOME_Motorista?.toLowerCase().includes(busca.toLowerCase()) ||
    item.Placa_Veiculo?.toLowerCase().includes(busca.toLowerCase()) ||
    item.ROTA_ID?.toString().includes(busca)
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
              Painel de Motoristas e Veículos
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm">
              {loading ? 'Carregando...' : (
                `${dadosFiltrados.length} ${dadosFiltrados.length === 1 ? 'registro' : 'registros'} encontrados`
              )}
              {error && <span className="text-red-400 ml-2">{error}</span>}
            </p>
          </div>

          <div className="mb-4 sm:mb-6">
            <input
              type="text"
              placeholder="Buscar (motorista, placa ou rota)..."
              className="
                w-full px-3 py-2 sm:px-4 sm:py-3 rounded-md bg-gray-800 text-white
                border border-gray-600
                focus:outline-none focus:ring-2 focus:ring-blue-500
                text-sm sm:text-base
              "
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Container da tabela com scroll vertical */}
          <div className="flex-1 overflow-auto">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-400">
                {error}
              </div>
            ) : (
              <div className="min-w-full">
                {/* Layout para mobile - cards */}
                <div className="sm:hidden space-y-2">
                  {dadosFiltrados.length > 0 ? (
                    dadosFiltrados.map((item) => (
                      <div key={`${item.ID_Motorista}-${item.ROTA_ID}`} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-400">Motorista:</p>
                            <p>{item.NOME_Motorista || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">CPF:</p>
                            <p>{item.CPF_Motorista || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Rota ID:</p>
                            <p>{item.ROTA_ID || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Placa:</p>
                            <p>{item.Placa_Veiculo || 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      Nenhum dado encontrado
                    </div>
                  )}
                </div>

                {/* Layout para desktop - tabela */}
                <table className="hidden sm:table w-full text-left text-white border-collapse">
                  <thead className="bg-gray-800 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">Motorista</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">CPF</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">Rota ID</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">Placa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {dadosFiltrados.map((item) => (
                      <tr key={`${item.ID_Motorista}-${item.ROTA_ID}`} className="hover:bg-gray-700/50">
                        <td className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">{item.NOME_Motorista || 'N/A'}</td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">{item.CPF_Motorista || 'N/A'}</td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">{item.ROTA_ID || 'N/A'}</td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">{item.Placa_Veiculo || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}