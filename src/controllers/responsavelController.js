import userModel from "../models/responsavelModels.js";

const getResponsavelAll = async (req, res) => {
    try {
        const users = await userModel.getAll();
        return res.status(200).json(users);
    } catch (err) {
        console.error("Erro ao buscar todos os responsáveis", err);
        return res.status(500).json({ message: 'Erro ao buscar todos os responsáveis' });
    }
}

const getResponsavel = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await userModel.getById(id);
        if (!user) {
            return res.status(404).json({ message: 'Responsável não encontrado' });
        }
        return res.json(user);
    } catch (err) {
        console.error("Erro ao buscar um responsável", err);
        return res.status(500).json({ message: 'Erro ao buscar um responsável' });
    }
}

const createResponsavel = async (req, res) => {
    try {
        await userModel.create(req.body);
        return res.status(201).json({ message: 'Responsável criado com sucesso' });
    } catch (err) {
        console.error("Erro ao criar responsável", err);
        return res.status(500).json({ message: 'Erro ao criar responsável' });
    }
}

const updateResponsavel = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const affected = await userModel.update(id, req.body);
        if (!affected) {
            return res.status(404).json({ message: 'Responsável não encontrado' });
        }
        return res.status(200).json({ message: 'Responsável atualizado com sucesso' });
    } catch (err) {
        console.error("Erro ao atualizar responsável", err);
        return res.status(500).json({ message: 'Erro ao atualizar responsável' });
    }
}

const deleteResponsavel = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const affected = await userModel.deleteRecord(id);
        if (!affected) {
            return res.status(404).json({ message: 'Responsável não encontrado' });
        }
        return res.status(200).json({ message: 'Responsável deletado com sucesso' });
    } catch (err) {
        console.error("Erro ao deletar responsável", err);
        return res.status(500).json({ message: 'Erro ao deletar responsável' });
    }
}

export default { getResponsavel, getResponsavelAll, createResponsavel, updateResponsavel, deleteResponsavel };
