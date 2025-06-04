import knex from '../../config/connection.js';
import bcrypt from 'bcryptjs';

const getAll = async () => {
    try {
        const dataGetAll = await knex('rotas_checkpoints').select('*');
        return dataGetAll;
    } catch (err) {
        console.error('Houve um erro ao listar todas as rotas: ', err);
        return [];
    }
};

const getById = async (rota_id) => {
    try {
        const dataGetById = await knex('rotas_checkpoints').where({ rota_id }).first();
        return dataGetById;
    } catch (err) {
        console.error('Houve um erro ao listar uma rota pelo ID: ', err);
        return null;
    }
};

export default {getAll, getById};