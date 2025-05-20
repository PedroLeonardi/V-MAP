import config from '../../config/knexfile.js';

const environment = process.env.NODE_ENV || 'development';
const knexInstance = knex(config[environment]);

const knex = knexInstance

const getAll = async (table) => {
    try {
        const dataGetAll = await knex(table).select('*');
        return dataGetAll
    } catch (err){
        console.error("Houve um erro ao listar todos os items: ", err)
        return []
    } finally {
        await knex.destroy()
    }
} 


const getById = async (table, id) => {
    try{
        const dataGetById =  knex(table).where({ id }).first();
        return dataGetById
    } catch (err) {
        console.error("Houve um erro ao listar elemente pelo ID: ", err)
        return []
    }  finally {
        await knex.destroy();
    }
}

const create = async (table, user) => {
    try{
        const dataCreate = knex(table).insert(user);
        return dataCreate
    } catch (err) {
        console.error ("Houve um erro ao criar um item: ", err)
        return []
    } finally {
        await knex.destroy()
    }
}

const update = async (table, id, user) => {
    try {
        const dataUpdate = knex(table).where({ id }).update(user);
        return dataUpdate 
    } catch (err) {
        console.error("Houve um erro ao realizar um Update nos itens: ", err)
        return []
    } finally {
        await knex.detroy()        
    }
}


const deleteRecord = async (table, id) => {
    try{
        const dataDeleteRecord = knex(table).where({ id }).delete();
        return dataDeleteRecord
    } catch (err) {
        console.error("Houve um erro ao deletar um item: ", err)
        return []
    } finally {
        await knex.destroy()
    }
}

export default { getAll, getById, create, update, deleteRecord };
