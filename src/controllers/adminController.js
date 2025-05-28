import userModel from "../Models/adminModels.js";

const getAdminAll = async (req, res) => {
  try {
    const users = await userModel.getAll();
    res.status(200).json(users);
  } catch (err) {
    console.error("Erro ao buscar todos os usuários ", err);
    res.status(500).json({ message: 'Erro ao buscar todos usuários' });
  }
};

const getAdmin = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await userModel.getById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    return res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar um usuário' });
  }
};

const createAdmin = async (req, res) => {
  try {
    await userModel.create(req.body);
    return res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (err) {
    console.error(err);
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message || 'Erro ao criar usuário' });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const affected = await userModel.update(id, req.body);

    if (!affected) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const affected = await userModel.deleteRecord(id);
    if (!affected) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    return res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar usuário' });
  }
};

const getAdmByCPF = async (req, res) => {
  try {
    const cpf = req.params.cpf;
    const user = await userModel.getByCPF(cpf);
    if (!user) {
      return res.status(404).json({ message: 'Administrador não encontrado' });
    }
    return res.json(user);
  } catch (err) {
    console.error("Erro ao buscar Administrador por CPF", err);
    return res.status(500).json({ message: 'Erro ao buscar administrador por CPF' });
  }
};

export default { getAdmin, getAdminAll, createAdmin, updateAdmin, deleteAdmin, getAdmByCPF };
