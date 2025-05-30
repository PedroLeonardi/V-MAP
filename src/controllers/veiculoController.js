import userModel from "../models/veiculoModels.js";

const getVeiculoAll = async (req, res) => {
    try {
        const users = await userModel.getAll();
        return res.status(200).json(users);
    } catch (err) {
        console.error("Erro ao buscar todos os veículos", err);
        return res.status(500).json({ message: 'Erro ao buscar todos os veículos' });
    }
}

const getVeiculo = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await userModel.getById(id);
        if (!user) {
            return res.status(404).json({ message: 'Veículo não encontrado' });
        }
        return res.json(user);
    } catch (err) {
        console.error("Erro ao buscar um veículo", err);
        return res.status(500).json({ message: 'Erro ao buscar um veículo' });
    }
}

const createVeiculo = async (req, res) => {
    try {
        await userModel.create(req.body);
        return res.status(201).json({ message: 'Veículo criado com sucesso' });
    } catch (err) {
        console.error("Erro ao criar veículo", err);
        return res.status(500).json({ message: 'Erro ao criar veículo' });
    }
}

const updateVeiculo = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const affected = await userModel.update(id, req.body);
        if (!affected) {
            return res.status(404).json({ message: 'Veículo não encontrado' });
        }
        return res.status(200).json({ message: 'Veículo atualizado com sucesso' });
    } catch (err) {
        console.error("Erro ao atualizar veículo", err);
        return res.status(500).json({ message: 'Erro ao atualizar veículo' });
    }
}

const deleteVeiculo = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const affected = await userModel.deleteRecord(id);
        if (!affected) {
            return res.status(404).json({ message: 'Veículo não encontrado' });
        }
        return res.status(200).json({ message: 'Veículo deletado com sucesso' });
    } catch (err) {
        console.error("Erro ao deletar veículo", err);
        return res.status(500).json({ message: 'Erro ao deletar veículo' });
    }
}

export default { getVeiculo, getVeiculoAll, createVeiculo, updateVeiculo, deleteVeiculo };
