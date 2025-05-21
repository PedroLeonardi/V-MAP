import userModel from "../models/motoristaModels.js";

const getMotoristaAll = async (req, res) => {
    try {
        const users = await userModel.getAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar todos os motoristas' });
        console.error("Erro ao buscar todos os motoristas ", err)
    }
}

const getMotorista = async (req, res) => {

    try {
        const id = parseInt(req.params.id);
        
        
        const user = await userModel.getById(id);
        if (!user) {
            return res.status(404).json({ message: 'Motorista não encontrado ' });
        }

        return res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar um Motorista' });
        console.error(err)
    }
}

const createMotorista = async (req, res) => {
    try {
        await userModel.create( req.body);
        return res.status(201).json({ message: 'Motorista criado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar Motorista' });
    }
}

const updateMotorista = async (req, res) => {
    try {
        const affected = await userModel.update( req.params.id, req.body);

        if (!affected) {
            return res.status(404).json({ message: 'Motorista não encontrado' });
        }

        return res.status(200).json({ message: 'Motorista atualizado com sucesso' });
    } catch (err) {
        // Corrigido typo no "json"
        res.status(500).json({ message: 'Erro ao atualizar Motorista' });
    }
}

const deleteMotorista = async (req, res) => {
    try {
        const affected = await userModel.deleteRecord( req.params.id);

        if (!affected) {
            return res.status(404).json({ message: 'Motorista não encontrado' });
        }

        return res.status(200).json({ message: 'Motorista deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar Motorista' });
    }
}

export default { getMotorista, getMotoristaAll, createMotorista, updateMotorista, deleteMotorista };
