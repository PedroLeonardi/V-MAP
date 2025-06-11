import knex from '../../config/connection.js';

const PainelModel = {
  async getAll() {
    return await knex('painel_onibus_motoristas').select('*');
  },

  async getWithFilters(filters = {}) {
    const query = knex('painel_onibus_motoristas');
    
    // Aplica filtros dinâmicos
    if (filters.rota) {
      query.where('ROTA_ID', filters.rota);
    }
    if (filters.motorista) {
      query.where('ID_Motorista', filters.motorista);
    }
    
    return await query.orderBy('NOME_Motorista', 'asc');
  }
};

export default PainelModel;