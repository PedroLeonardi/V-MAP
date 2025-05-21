import userModel from "../models/veiculoModels.js";

const getVeiculoAll = async (req, res) => {
    try {
        const users = await userModel.getAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar todos os Veiculos' });
        console.error("Erro ao buscar todos os Veiculos ", err)
    }
}

const getVeiculo = async (req, res) => {

    try {
        const id = parseInt(req.params.id);
        
        
        const user = await userModel.getById(id);
        if (!user) {
            return res.status(404).json({ message: 'Veiculo não encontrado ' });
        }

        return res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar um Veiculo' });
        console.error(err)
    }
}

const createVeiculo = async (req, res) => {
    try {
        await userModel.create( req.body);
        return res.status(201).json({ message: 'Veiculo criado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar Veiculo' });
    }
}

const updateVeiculo = async (req, res) => {
    try {
        const affected = await userModel.update( req.params.id, req.body);

        if (!affected) {
            return res.status(404).json({ message: 'Veiculo não encontrado' });
        }

        return res.status(200).json({ message: 'Veiculo atualizado com sucesso' });
    } catch (err) {
        // Corrigido typo no "json"
        res.status(500).json({ message: 'Erro ao atualizar Veiculo' });
    }
}

const deleteVeiculo = async (req, res) => {
    try {
        const affected = await userModel.deleteRecord( req.params.id);

        if (!affected) {
            return res.status(404).json({ message: 'Veiculo não encontrado' });
        }

        return res.status(200).json({ message: 'Veiculo deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar Veiculo' });
    }
}

export default { getVeiculo, getVeiculoAll, createVeiculo, updateVeiculo, deleteVeiculo };
