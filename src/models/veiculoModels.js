import knex from '../../config/connection.js';


const getAll = async () => {
  try {
    const dataGetAll = await knex('veiculos_onibus').select('*');
    return dataGetAll;
  } catch (err) {
    console.error('Houve um erro ao listar todas as rotas: ', err);
    return [];
  }
};

const getById = async (id_rota_onibus) => {
  try {
    const dataGetById = await knex('veiculos_onibus').where({ id_rota_onibus }).first();
    return dataGetById;
  } catch (err) {
    console.error('Houve um erro ao listar uma rota pelo ID: ', err);
    return null;
  }
};

const create = async (data) => {
  try {
    const [id] = await knex('veiculos_onibus').insert(data);
    return id;
  } catch (err) {
    console.error('Houve um erro ao criar uma rota: ', err);
    return null;
  }
};

const update = async (id_rota_onibus, data) => {
  try {
    const affectedRows = await knex('veiculos_onibus').where({ id_rota_onibus }).update(data);
    return affectedRows;
  } catch (err) {
    console.error('Houve um erro ao realizar um update na rota: ', err);
    return 0;
  }
};

const deleteRecord = async (id_rota_onibus) => {
  try {
    const affectedRows = await knex('veiculos_onibus').where({ id_rota_onibus }).delete();
    return affectedRows;
  } catch (err) {
    console.error('Houve um erro ao deletar uma rota: ', err);
    return 0;
  }
};

export default { getAll, getById, create, update, deleteRecord };
