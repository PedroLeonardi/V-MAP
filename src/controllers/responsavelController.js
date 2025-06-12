import userModel from '../models/responsavelModels.js';

// get
const getResponsavelAllContoller = async (req, res) => {
  try {
    const responsavel = await userModel.getAll();
    return res.status(200).json(responsavel);
  } catch (err) {
    console.error("Erro ao buscar todos os responsáveis", err);
    return res.status(500).json({ message: 'Erro ao buscar todos os responsáveis' });
  }
};

// get by id
const getResponsavelController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const responsaveis = await userModel.getById(id);
    if (!responsaveis) {
      return res.status(404).json({ message: 'Responsável não encontrado' });
    }
    return res.json(responsaveis);
  } catch (err) {
    console.error("Erro ao buscar um responsável", err);
    return res.status(500).json({ message: 'Erro ao buscar um responsável' });
  }
};

// create
const createResponsavelController = async (req, res) => {
  try {
    await userModel.create(req.body);
    return res.status(201).json({ message: 'Responsável criado com sucesso' });
  } catch (err) {

      // se o usuario cadastrar cpf ja existente
      // vai cair nesse erro (requisição ja pronta do model)
      if (err.status === 400) {
      return res.status(400).json({ message: err.message });
    }

    console.error("Erro ao criar responsável", err);
    return res.status(500).json({ message: 'Erro ao criar responsável' });
  }
};

// update
const updateResponsavelController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const responsaveis = await userModel.update(id, req.body);
    if (!responsaveis) {
      return res.status(404).json({ message: 'Responsável não encontrado' });
    }
    return res.status(200).json({ message: 'Responsável atualizado com sucesso' });
  } catch (err) {
    console.error("Erro ao atualizar responsável", err);
    return res.status(500).json({ message: 'Erro ao atualizar responsável' });
  }
};

// deletando responsavel
const deleteResponsavelController = async (req, res) => {
  try {
    const admin_cpf = req.body.admin_cpf
    const id = parseInt(req.params.id, admin_cpf);

    const responsaveis = await userModel.deleteRecord(id, admin_cpf);
    if (!responsaveis) {
      return res.status(404).json({ message: 'Responsável não encontrado' });
    }
    return res.status(200).json({ message: 'Responsável deletado com sucesso' });
  } catch (err) {
    console.error("Erro ao deletar responsável", err);
    return res.status(500).json({ message: 'Erro ao deletar responsável' });
  }
};

// pescando cpf do responsavel
const getResponsavelByCpfController = async (req, res) => {
    try {
        const cpf = req.params.cpf;
        const user = await userModel.getByCPF(cpf);

        if (!user) {
            return res.status(404).json({ message: 'Responsável não encontrado' });
        }

        return res.json(user);
    } catch (err) {
        console.error("Erro ao buscar responsável por CPF", err);
        return res.status(500).json({ message: 'Erro ao buscar responsável por CPF' });
    }
};

export default { getResponsavelController, getResponsavelAllContoller, createResponsavelController, updateResponsavelController, deleteResponsavelController, getResponsavelByCpfController};
