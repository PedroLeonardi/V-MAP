import userModel from "../models/CrudModel.js";

const getUsers = async (req, res) => {
    try {
        const users = await userModel.getAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.getById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
}

const createUser = async (req, res) => {
    try {
        await userModel.create(req.body);
        return res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar usuário' });
    }
}

const updateUser = async (req, res) => {
    try {
        const affected = await userModel.update(req.params.id, req.body);

        if (!affected) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    } catch (err) {
        // Corrigido typo no "json"
        res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
}

const deleteUser = async (req, res) => {
    try {
        const affected = await userModel.deleteRecord(req.params.id);

        if (!affected) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
}

export default { getUser, getUsers, createUser, updateUser, deleteUser };
