import userModel from "../models/adminModels.js";

const getAdminAll = async (req, res) => {
    try {
        const users = await userModel.getAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar todos usuários', });
        console.error("Erro ao buscar todos os usuários ", err)
    }
}

const getAdmin = async (req, res) => {

    try {
        const id = parseInt(req.params.id);      
        const user = await userModel.getById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado ' });
        }

        return res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar um usuário' });
        console.error(err)
    }
}

const createAdmin = async (req, res) => {
    try {
        await userModel.create( req.body);
        return res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar usuário' });
        console.error(err)
    }
}

const updateAdmin = async (req, res) => {
    try {
        const affected = await userModel.update( req.params.id, req.body);

        if (!affected) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    } catch (err) {
        // Corrigido typo no "json"
        res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
}

const deleteAdmin = async (req, res) => {
    try {
        const affected = await userModel.deleteRecord( req.params.id);
        console.log(affected)
        if (!affected) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
}

export default { getAdmin, getAdminAll, createAdmin, updateAdmin, deleteAdmin };
