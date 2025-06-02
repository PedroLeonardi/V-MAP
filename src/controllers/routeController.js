import userModel from "../models/routeModels.js";

//get 
const getRotaController = async (req, res) => {
    try {
        const rotas = await userModel.getAll();
        return res.status(200).json(rotas);
    } catch (err) {
        console.error("Erro ao buscar todas as rotas", err);
        res.status(500).json({ message: 'Erro ao buscar todas as rotas' });
    }
};

// get by id
const getRotaByIdController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const rota = await userModel.getById(id);

        // se rota nao existe
        if (!rota) {
            return res.status(404).json({ message: 'Rota não encontrada' });
        }
        return res.json(rota);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar uma rota' });
    }
};



export default {getRotaByIdController, getRotaController}
