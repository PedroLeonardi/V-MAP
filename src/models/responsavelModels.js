import knex from '../../config/connection.js';
import bcrypt from 'bcryptjs';

const saltRounds = 10; // gerando caracteres aleatorios

// select *from
const getAll = async () => {
  try {
    const responsaveis = await knex('responsaveis').select('*');
    return responsaveis;
  } catch (err) {
    console.error('Houve um erro ao listar todos os responsáveis: ', err);
    return [];
  }
};

// select by id
const getById = async (id_responsavel) => {
  try {
    const responsavel = await knex('responsaveis').where({ id_responsavel }).first();
    return responsavel;
  } catch (err) {
    console.error('Houve um erro ao listar um responsável pelo ID: ', err);
    return null;
  }
};

// create
const create = async (data) => {
  try {

    // checkando se responsavel ja existe
    const responsavelExistente = await knex('responsaveis').where({ cpf_responsavel: data.cpf_responsavel })  .first();

    // aqui eu faço com que se o responsavel existir
    // eu mando ele pro meu controller 
    if (responsavelExistente) {
      const error = new Error('Responsável já cadastrado');
      error.status = 400;
      throw error
    }

    // atribuindo senha hash
    const senhaHashed = await bcrypt.hash(data.senha, saltRounds);

    const [id_responsavel] = await knex('responsaveis').insert({
      nome: data.nome,
      cpf_responsavel: data.cpf_responsavel,
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
    const dataUpdate = { ...data };

    // se tiver senha faz o hash antes
    if (data.senha) {
      dataUpdate.senha = await bcrypt.hash(data.senha, saltRounds);
    }

    if (data.cpf) {
      dataUpdate.cpf_responsavel = data.cpf.replace(/\D/g, '');
      delete dataUpdate.cpf;
    }

    const updatedRows = await knex('responsaveis').where({ id_responsavel }).update(dataUpdate);
    return updatedRows;
  } catch (err) {
    console.error('Houve um erro ao realizar um update no responsável: ', err);
    return 0;
  }
};

// delete
const deleteRecord = async (id_responsavel) => {
  try {
    const deletedRows = await knex('responsaveis').where({ id_responsavel }).delete();
    return deletedRows;
  } catch (err) {
    console.error('Houve um erro ao deletar um responsável: ', err);
    return 0;
  }
};

// pescando o cpf do responsavel
const getByCPF = async (cpf) => {
  try {

    // capturando o cpf do meu responsavel
    const responsavel = await knex('responsaveis').where({ cpf_responsavel: cpf }).first();
    return responsavel;
  } catch (err) {
    console.error('Erro ao buscar responsável por CPF: ', err);
    return null;
  }
};

export default { getAll, getById, create, update, deleteRecord, getByCPF };
