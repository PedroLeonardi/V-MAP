import config from '../../config/knexfile.js';
import knexx from 'knex'

const environment = process.env.NODE_ENV || 'development';
const knexInstance = knexx(config[environment]);

const knex = knexInstance

const getAll = async () => {
    try {
        const dataGetAll = await knex("administrador").select('*');
        return dataGetAll
    } catch (err){
        console.error("Houve um erro ao listar todos os items: ", err)
        return []
    } finally {
        await knex.destroy()
    }
} 


const getById = async (id_admin) => {
    try{
        
        const dataGetById =  knex("administrador").where({id_admin}).first();
        return dataGetById
    } catch (err) {
        console.error("Houve um erro ao listar elemente pelo ID: ", err)
        return []
    }  finally {
        // await knex.destroy();
    }
}

const create = async (data) => {
    try{
        const dataCreate = knex("administrador").insert(data);
        return dataCreate
    } catch (err) {
        console.error ("Houve um erro ao criar um item: ", err)
        return []
    } finally {
        await knex.destroy()
    }
}

const update = async (id_admin, user) => {
    try {
        const dataUpdate = knex("administrador").where({ id_admin }).update(user);
        return dataUpdate 
    } catch (err) {
        console.error("Houve um erro ao realizar um Update nos itens: ", err)
        return []
    } finally {
        await knex.detroy()        
    }
}


const deleteRecord = async (id_admin) => {
    try{
        const dataDeleteRecord = knex("administrador").where({ id_admin }).delete();
        return dataDeleteRecord
    } catch (err) {
        console.error("Houve um erro ao deletar um item: ", err)
        return []
    } finally {
        await knex.destroy()
    }
}

export default { getAll, getById, create, update, deleteRecord };
