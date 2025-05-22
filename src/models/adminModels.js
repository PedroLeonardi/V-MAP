// src/models/adminModel.js
import knex from '../../config/connection.js';
import bcrypt from 'bcryptjs';

const saltRounds = 10; 

const getAll = async () => {
  try {
    return await knex("administrador").select("*");
  } catch (err) {
    throw new Error("Erro ao listar administradores");
  }
};

const getById = async (id_admin) => {
  try {
    return await knex("administrador").where({ id_admin }).first();
  } catch (err) {
    throw new Error("Erro ao buscar administrador por ID");
  }
};

const create = async (data) => {
  try {
    const adminExist = await knex("administrador").where({ cpf: data.cpf }).first();

    // verificando se esse adm já existe
    if (adminExist) {
      const error = new Error("CPF já cadastrado");
      error.statusCode = 400;
      throw error;
    }

    // senha hash
    const senhaHashed = await bcrypt.hash(data.senha, saltRounds);

    // inserindo dados
    const [id_admin] = await knex("administrador").insert({
      cpf: data.cpf,
      senha: senhaHashed,
      nome: data.nome,
      cargo: data.cargo
    });

    return id_admin; // recebendo 

  } catch (err) {
    throw new Error("Erro ao criar administrador: " , err.message);
  }
};

const update = async (id_admin, user) => {
  try {
    return await knex("administrador").where({ id_admin }).update(user);
  } catch (err) {
    throw new Error("Erro ao atualizar administrador");
  }
};

const deleteRecord = async (id_admin) => {
  try {
    return await knex("administrador").where({ id_admin }).delete();
  } catch (err) {
    throw new Error("Erro ao deletar administrador");
  }
};

// data para atualizar um registro inteiro
// user para parciais

export default { getAll, getById, create, update, deleteRecord };
