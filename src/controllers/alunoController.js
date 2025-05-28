import userModel from '../Models/alunoModels.js'
const getAlunoAll = async (req, res) => {
    try {
        const users = await userModel.getAll();
        return res.status(200).json(users);
    } catch (err) { 
        console.error("Erro ao buscar todos os alunos", err);
        return res.status(500).json({ message: 'Erro ao buscar todos os alunos' });
    }
}

const getAluno = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await userModel.getById(id);
        if (!user) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        return res.json(user);
    } catch (err) {
        console.error("Erro ao buscar um aluno", err);
        return res.status(500).json({ message: 'Erro ao buscar um aluno' });
    }
}

const createAluno = async (req, res) => {
    try {
        await userModel.create(req.body);
        return res.status(201).json({ message: 'Aluno criado com sucesso' });
    } catch (err) {

       if (err.statusCode === 400) {
            return res.status(400).json({ message: 'CPF do aluno já existente.' }); 
        }

        console.error("Erro ao criar aluno", err);
        return res.status(500).json({ message: 'Erro ao criar aluno' });
    }
}

const updateAluno = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const affected = await userModel.update(id, req.body);
        if (!affected) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        return res.status(200).json({ message: 'Aluno atualizado com sucesso' });
    } catch (err) {
        console.error("Erro ao atualizar aluno", err);
        return res.status(500).json({ message: 'Erro ao atualizar aluno' });
    }
}

const deleteAluno = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const affected = await userModel.deleteRecord(id);
        if (!affected) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        return res.status(200).json({ message: 'Aluno deletado com sucesso' });
    } catch (err) {
        console.error("Erro ao deletar aluno", err);
        return res.status(500).json({ message: 'Erro ao deletar aluno' });
    }
}

const getTotalAlunos = async (req, res) => {
  try {
    const total = await userModel.getTotalAlunos();
    return res.status(200).json({ total });
  } catch (err) {
    console.error("Erro ao obter total de alunos", err);
    return res.status(500).json({ message: 'Erro ao obter total de alunos' });
  }
};


const getAlunoByCPF = async (req, res) => {
    try {
        const cpf = req.params.cpf;
        const user = await userModel.getByCPF(cpf);

        if (!user) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }

        return res.json(user);
    } catch (err) {
        console.error("Erro ao buscar aluno por CPF", err);
        return res.status(500).json({ message: 'Erro ao buscar aluno por CPF' });
    }
};


export default { getAluno, getAlunoAll, createAluno, updateAluno, deleteAluno, getTotalAlunos , getAlunoByCPF};
