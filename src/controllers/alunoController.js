import userModel from "../models/alunoModels.js";

const getAlunoAll = async (req, res) => {
    try {
        const users = await userModel.getAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar todos os alunos', });
        console.error("Erro ao buscar todos os alunos ", err)
    }
}

const getAluno = async (req, res) => {

    try {
        const id = parseInt(req.params.id);
        
        
        const user = await userModel.getById(id);
        if (!user) {
            return res.status(404).json({ message: 'Aluno não encontrado ' });
        }

        return res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar um aluno' });
        console.error(err)
    }
}

const createAluno = async (req, res) => {
    try {
        await userModel.create( req.body);
        return res.status(201).json({ message: 'aluno criado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar aluno' });
    }
}

const updateAluno = async (req, res) => {
    try {
        const affected = await userModel.update( req.params.id, req.body);

        if (!affected) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }

        return res.status(200).json({ message: 'Aluno atualizado com sucesso' });
    } catch (err) {
        // Corrigido typo no "json"
        res.status(500).json({ message: 'Erro ao atualizar Aluno' });
    }
}

const deleteAluno = async (req, res) => {
    try {
        const affected = await userModel.deleteRecord( req.params.id);

        if (!affected) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }

        return res.status(200).json({ message: 'Aluno deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar Aluno' });
    }
}

export default { getAluno, getAlunoAll, createAluno, updateAluno, deleteAluno };
