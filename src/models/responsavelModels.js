import knex from '../../config/connection.js';
import bcrypt from 'bcryptjs';

const saltRounds = 10;

const getAll = async () => {
  try {
    const responsaveis = await knex('responsaveis').select('*');
    return responsaveis;
  } catch (err) {
    console.error('Houve um erro ao listar todos os responsáveis: ', err);
    return [];
  }
};

const getById = async (id_responsavel) => {
  try {
    const responsavel = await knex('responsaveis').where({ id_responsavel }).first();
    return responsavel;
  } catch (err) {
    console.error('Houve um erro ao listar um responsável pelo ID: ', err);
    return null;
  }
};

const create = async (data) => {
  try {

    const cpfLimpo = data.cpf.replace(/\D/g, '');

    const responsavelExistente = await knex('responsaveis')
      .where({ cpf_responsavel: cpfLimpo })
      .first();

    if (responsavelExistente) {
      const error = new Error('Responsável com este CPF já está cadastrado');
      error.statusCode = 400;
      throw error;
    }

    const senhaHashed = await bcrypt.hash(data.senha, saltRounds);

    const [id_responsavel] = await knex('responsaveis').insert({
      nome: data.nome,
      cpf_responsavel: cpfLimpo,
      senha: senhaHashed
    });

    return id_responsavel;
  } catch (err) {
    console.error('Houve um erro ao criar um responsável: ', err);
    throw err;
  }
};



const update = async (id_responsavel, data) => {
  try {

    const updatedRows = await knex('responsaveis').where({ id_responsavel }).update(data);
    return updatedRows;
  } catch (err) {
    console.error('Houve um erro ao realizar um update no responsável: ', err);
    return 0;
  }
};

const deleteRecord = async (id_responsavel) => {
  try {
    const deletedRows = await knex('responsaveis').where({ id_responsavel }).delete();
    return deletedRows;
  } catch (err) {
    console.error('Houve um erro ao deletar um responsável: ', err);
    return 0;
  }
};

export default { getAll, getById, create, update, deleteRecord };
