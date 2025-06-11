import userModel from "../models/motoristaModels.js";

const getMotoristaAll = async (req, res) => {
    try {
        const users = await userModel.getAll();
        return res.status(200).json(users);
    } catch (err) {
        console.error("Erro ao buscar todos os motoristas", err);
        return res.status(500).json({ message: 'Erro ao buscar todos os motoristas' });
    }
}

const getMotorista = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await userModel.getById(id);
        if (!user) {
            return res.status(404).json({ message: 'Motorista não encontrado' });
        }
        return res.json(user);
    } catch (err) {
        console.error("Erro ao buscar um motorista", err);
        return res.status(500).json({ message: 'Erro ao buscar um motorista' });
    }
}

const createMotorista = async (req, res) => {
    try {
        await userModel.create(req.body);
        return res.status(201).json({ message: 'Motorista criado com sucesso' });
    } catch (err) {
        console.error("Erro ao criar motorista", err);
        return res.status(500).json({ message: 'Erro ao criar motorista' });
    }
}

const updateMotorista = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const affected = await userModel.update(id, req.body);
        if (!affected) {
            return res.status(404).json({ message: 'Motorista não encontrado' });
        }
        return res.status(200).json({ message: 'Motorista atualizado com sucesso' });
    } catch (err) {
        console.error("Erro ao atualizar motorista", err);
        return res.status(500).json({ message: 'Erro ao atualizar motorista' });
    }
}

const deleteMotorista = async (req, res) => {
    try {
        const admin_cpf = req.body.admin_cpf
        const id = parseInt(req.params.id);
        const affected = await userModel.deleteRecord(id, admin_cpf);
        if (!affected) {
            return res.status(404).json({ message: 'Motorista não encontrado' });
        }
        return res.status(200).json({ message: 'Motorista deletado com sucesso' });
    } catch (err) {
        console.error("Erro ao deletar motorista", err);
        return res.status(500).json({ message: 'Erro ao deletar motorista' });
    }
}

const getMotoristaByCpfController = async (req, res) => {
    try {
      const cpf = req.params.cpf;
      const motorista = await userModel.getByCPF(cpf);
  
      if (!motorista) {
        return res.status(404).json({ message: 'Administrador não encontrado' });
      }
  
      return res.json(motorista);
    } catch (err) {
      console.error("Erro ao buscar motorista por CPF", err);
      return res.status(500).json({ message: 'Erro ao buscar motorista por CPF' });
    }
  };

export default { getMotorista, getMotoristaAll, createMotorista, updateMotorista, deleteMotorista, getMotoristaByCpfController };
