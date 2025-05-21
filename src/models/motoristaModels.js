import config from '../../config/knexfile.js';
import knexModule from 'knex'

const environment = process.env.NODE_ENV || 'development';
const knexInstance = knexModule(config[environment]);

const knex = knexInstance

const getAll = async () => {
    try {
        const dataGetAll = await knex("funcionario_motorista").select('*');
        return dataGetAll
    } catch (err){
        console.error("Houve um erro ao listar todos os motoristas: ", err)
        return []
    } 
} 


const getById = async (id_motorista) => {
    try{
        
        const dataGetById =  knex("funcionario_motorista").where({id_motorista}).first();
        return dataGetById
    } catch (err) {
        console.error("Houve um erro ao listar um motorista pelo ID: ", err)
        return []
    }  
}

const create = async (data) => {
    try{
        const dataCreate = knex("funcionario_motorista").insert(data);
        return dataCreate
    } catch (err) {
        console.error ("Houve um erro ao criar um motorista: ", err)
        return []
    } 
}

const update = async (id_motorista, data) => {
    try {
        const dataUpdate = knex("funcionario_motorista").where({ id_motorista }).update(data);
        return dataUpdate 
    } catch (err) {
        console.error("Houve um erro ao realizar um Update no motorista: ", err)
        return []
    } 
}


const deleteRecord = async (id_motorista) => {
    try{
        const dataDeleteRecord = knex("funcionario_motorista").where({ id_motorista }).delete();
        return dataDeleteRecord
    } catch (err) {
        console.error("Houve um erro ao deletar um motorista: ", err)
        return []
    } 
}

export default { getAll, getById, create, update, deleteRecord };
