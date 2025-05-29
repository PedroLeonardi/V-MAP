// src/models/adminModel.js
import knex from '../../config/connection.js';
import bcrypt from 'bcryptjs';

const saltRounds = 10; // sequencia de caracteres aleatorios

// select * from
const getAll = async () => {
  try {
    return await knex("administrador").select("*");
  } catch (err) {
    throw new Error("Erro ao listar administradores");
  }
};

// select by id
const getById = async (id_admin) => {
  try {
    return await knex("administrador").where({ id_admin }).first();
  } catch (err) {
    throw new Error("Erro ao buscar administrador por ID");
  }
};

// create
const create = async (data) => {
  try {
    const adminExist = await knex("administrador").where({ cpf: data.cpf }).first();

   
        // aqui eu faço com que se o adm existir
        // eu mando ele pro meu controller 
        if (adminExist) {
            const error = new Error('Administrador já cadastrado.');
            error.status = 400;
            throw error
        }

    // aplicando senha hash para senha no bd
    const senhaHashed = await bcrypt.hash(data.senha, saltRounds);

    const [id_admin] = await knex("administrador").insert({
      cpf: data.cpf,
      senha: senhaHashed,
      nome: data.nome,
      cargo: data.cargo
    });

    return id_admin;

  } catch (err) {
    throw err;
  }
};

// update
const update = async (id_admin, user) => {
  try {
    
    // aplicando hash ao atualizar
    if (user.senha) {
      user.senha = await bcrypt.hash(user.senha, saltRounds);
    }

    return await knex("administrador").where({ id_admin }).update(user);
  } catch (err) {
    throw new Error("Erro ao atualizar administrador");
  }
};

// delete 
const deleteRecord = async (id_admin) => {
  try {
    return await knex("administrador").where({ id_admin }).delete();
  } catch (err) {
    throw new Error("Erro ao deletar administrador");
  }
};

// puxar cpf do administrador
const getByCPF = async (cpf) => {
    try {
        const administrador = await knex('administrador').where({ cpf: cpf }).first();
        return administrador;
    } catch (err) {
        console.error('Erro ao buscar administrador por CPF: ', err);
        return null;
    }
};

export default { getAll, getById, create, update, deleteRecord, getByCPF};
