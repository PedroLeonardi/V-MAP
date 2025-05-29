import knex from '../../config/connection.js';

const getAll = async () => {
  try {
    const motoristas = await knex('funcionario_motorista').select('*');
    return motoristas;
  } catch (err) {
    console.error('Houve um erro ao listar todos os motoristas: ', err);
    return [];
  }
};

const getById = async (id_motorista) => {
  try {
    const motorista = await knex('funcionario_motorista').where({ id_motorista }).first();
    return motorista;
  } catch (err) {
    console.error('Houve um erro ao listar um motorista pelo ID: ', err);
    return null;
  }
};

const create = async (data) => {
  try {
    
    const motoristaExistente = await knex('funcionario_motorista')
      .where({ cpf_motorista: data.cpf_motorista })
      .first();

    if (motoristaExistente) {
      const error = new Error('Motorista com este CPF já está cadastrado');
      error.statusCode = 400;
      throw error;  
    }

    const [id_motorista] = await knex('funcionario_motorista').insert(data);
    return id_motorista;
  } catch (err) {
    console.error('Houve um erro ao criar um motorista: ', err);
    throw err; 
  }
};


const update = async (id_motorista, data) => {
  try {
    const updatedRows = await knex('funcionario_motorista').where({ id_motorista }).update(data);
    return updatedRows;
  } catch (err) {
    console.error('Houve um erro ao realizar um update no motorista: ', err);
    return 0;
  }
};

const deleteRecord = async (id_motorista) => {
  try {
    const deletedRows = await knex('funcionario_motorista').where({ id_motorista }).delete();
    return deletedRows;
  } catch (err) {
    console.error('Houve um erro ao deletar um motorista: ', err);
    return 0;
  }
};

const getByCPF = async (cpf) => {
  try {
      const motorista = await knex('funcionario_motorista').where({ cpf_motorista: cpf }).first();
      return motorista;
  } catch (err) {
      console.error('Erro ao buscar motorista por CPF: ', err);
      return null;
  }
};

export default { getAll, getById, create, update, getByCPF };
