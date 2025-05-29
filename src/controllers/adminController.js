import userModel from "../models/adminModels.js";

// get
const getAdminAllController = async (req, res) => {
  try {
    const admins = await userModel.getAll();
    res.status(200).json(admins);
  } catch (err) {
    console.error("Erro ao buscar todos os usuários ", err);
    res.status(500).json({ message: 'Erro ao buscar todos usuários' });
  }
};

// get by id
const getAdminController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const admin = await userModel.getById(id);

    // se admin nao existe
    if (!admin) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    return res.json(admin);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar um usuário' });
  }
};

const createAdminController = async (req, res) => {
  try {

    await userModel.create(req.body);
    return res.status(201).json({ message: 'Usuário criado com sucesso' });

  } catch (err) {
    console.error(err);

    if (err.status === 400) {
      return res.status(400).json({ message: err.message });
    }


    return res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};

// update
const updateAdminController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const admin = await userModel.update(id, req.body);

    // se admin nao existir
    if (!admin) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
};

// deletar
const deleteAdminController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const admin = await userModel.deleteRecord(id);

    // se admin nao exisitir
    if (!admin) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    return res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar usuário' });
  }
};

const getAdmByCpfController = async (req, res) => {
  try {
    const cpf = req.params.cpf;
    const administrador = await userModel.getByCPF(cpf);

    if (!administrador) {
      return res.status(404).json({ message: 'Administrador não encontrado' });
    }

    return res.json(administrador);
  } catch (err) {
    console.error("Erro ao buscar administrador por CPF", err);
    return res.status(500).json({ message: 'Erro ao buscar administrador por CPF' });
  }
};

export default { getAdminController, getAdminAllController, createAdminController, updateAdminController, deleteAdminController , getAdmByCpfController};
