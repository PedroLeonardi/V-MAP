import userModel from "../models/responsavelModels.js";

const getResponsavelAll = async (req, res) => {
    try {
        const users = await userModel.getAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar todos os Responsavels' });
        console.error("Erro ao buscar todos os Responsavels ", err)
    }
}

const getResponsavel = async (req, res) => {

    try {
        const id = parseInt(req.params.id);
        const user = await userModel.getById(id);
        if (!user) {
            return res.status(404).json({ message: 'Responsavel não encontrado ' });
        }

        return res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar um Responsavel' });
        console.error(err)
    }
}

const createResponsavel = async (req, res) => {
    try {
        await userModel.create( req.body);
        return res.status(201).json({ message: 'Responsavel criado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar Responsavel' });
        console.log(err)
    }
}

const updateResponsavel = async (req, res) => {
    try {
        const affected = await userModel.update( req.params.id, req.body);

        if (!affected) {
            return res.status(404).json({ message: 'Responsavel não encontrado' });
        }

        return res.status(200).json({ message: 'Responsavel atualizado com sucesso' });
    } catch (err) {
        // Corrigido typo no "json"
        res.status(500).json({ message: 'Erro ao atualizar Responsavel' });
    }
}

const deleteResponsavel = async (req, res) => {
    try {
        const affected = await userModel.deleteRecord( req.params.id);

        if (!affected) {
            return res.status(404).json({ message: 'Responsavel não encontrado' });
        }

        return res.status(200).json({ message: 'Responsavel deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar Responsavel' });
    }
}

export default { getResponsavel, getResponsavelAll, createResponsavel, updateResponsavel, deleteResponsavel };
