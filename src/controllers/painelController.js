import PainelModel from '../models/PainelModel.js';

const PainelController = {
    async getAll(req, res) {
      try {
        const dados = await PainelModel.getAll(); // Usando o model corretamente
        res.status(200).json(dados);
      } catch (error) {
        res.status(500).json({ 
          error: 'Erro ao buscar dados do painel',
          details: error.message 
        });
      }
    },
    
    async getWithFilters(req, res) {
      try {
        const filters = req.query;
        const dados = await PainelModel.getWithFilters(filters);
        res.status(200).json(dados);
      } catch (error) {
        res.status(500).json({
          error: 'Erro ao buscar dados filtrados',
          details: error.message
        });
      }
    }
};
  
export default PainelController;