import userModel from '../models/alunoModels.js'

// get
const getAlunoAllController = async (req, res) => {
    try {
        const alunos = await userModel.getAll();
        return res.status(200).json(alunos);
    } catch (err) {
        console.error("Erro ao buscar todos os alunos", err);
        return res.status(500).json({ message: 'Erro ao buscar todos os alunos' });
    }
}

// get by id
const getAlunoController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const aluno = await userModel.getById(id);

        // se aluno nao existir 
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        return res.json(aluno);
    } catch (err) {
        console.error("Erro ao buscar um aluno", err);
        return res.status(500).json({ message: 'Erro ao buscar um aluno' });
    }
}

// create
const createAlunoController = async (req, res) => {
    try {
        await userModel.create(req.body);
        return res.status(201).json({ message: 'Aluno criado com sucesso' });
    } catch (err) {

        console.error("Erro ao criar aluno", err);
        return res.status(500).json({ message: 'Erro ao criar aluno' });
    }
}

// update
const updateAlunoController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const aluno = await userModel.update(id, req.body);

        // verificando se aluno existe
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        return res.status(200).json({ message: 'Aluno atualizado com sucesso' });
    } catch (err) {
        console.error("Erro ao atualizar aluno", err);
        return res.status(500).json({ message: 'Erro ao atualizar aluno' });
    }
}

// delete 
const deleteAlunoController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const aluno = await userModel.deleteRecord(id);

        // verificando se aluno existe
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        return res.status(200).json({ message: 'Aluno deletado com sucesso' });
    } catch (err) {
        console.error("Erro ao deletar aluno", err);
        return res.status(500).json({ message: 'Erro ao deletar aluno' });
    }
}

export default { getAlunoController, getAlunoAllController, createAlunoController, updateAlunoController, deleteAlunoController };
