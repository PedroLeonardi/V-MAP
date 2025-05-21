import config from '../../config/knexfile.js';
import knexModule from 'knex'

const environment = process.env.NODE_ENV || 'development';
const knexInstance = knexModule(config[environment]);

const knex = knexInstance

const getAll = async () => {
    try {
        const dataGetAll = await knex("administrador").select('*');
        return dataGetAll
    } catch (err){
        console.error("Houve um erro ao listar todos os Administradores: ", err)
        return []
    } 

    
} 


const getById = async (id_admin) => {
    try{
        const dataGetById = await knex("administrador").where({id_admin}).first();
        return dataGetById
    } catch (err) {
        console.error("Houve um erro ao listar elemente pelo ID: ", err)
        return []
    }
}

const create = async (data) => {
    try{
        const dataCreate = knex("administrador").insert(data);
        return dataCreate
    } catch (err) {
        console.error ("Houve um erro ao criar um item: ", err)
        return []
    }
}

const update = async (id_admin, user) => {
    try {
        const dataUpdate = knex("administrador").where({ id_admin }).update(user);
        return dataUpdate 
    } catch (err) {
        console.error("Houve um erro ao realizar um Update nos itens: ", err)
        return []
    }
}


const deleteRecord = async (id_admin) => {
    try{
        const dataDeleteRecord = knex("administrador").where({ id_admin }).delete();
        return dataDeleteRecord
    } catch (err) {
        console.error("Houve um erro ao deletar um item: ", err)
        return []
    }
}

export default { getAll, getById, create, update, deleteRecord };
