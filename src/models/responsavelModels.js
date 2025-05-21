import config from '../../config/knexfile.js';
import knexModule from 'knex'

const environment = process.env.NODE_ENV || 'development';
const knexInstance = knexModule(config[environment]);

const knex = knexInstance

const getAll = async () => {
    try {
        const dataGetAll = await knex("responsaveis").select('*');
        return dataGetAll
    } catch (err){
        console.error("Houve um erro ao listar todos os responsaveis: ", err)
        return []
    } 
} 


const getById = async (id_responsavel) => {
    try{
        
        const dataGetById =  knex("responsaveis").where({id_responsavel}).first();
        return dataGetById
    } catch (err) {
        console.error("Houve um erro ao listar um responsavel pelo ID: ", err)
        return []
    }  
}

const create = async (data) => {
    try{
        const dataCreate = knex("responsaveis").insert(data);
        return dataCreate
    } catch (err) {
        console.error ("Houve um erro ao criar um responsavel: ", err)
        return []
    } 
}

const update = async (id_responsavel, data) => {
    try {
        const dataUpdate = knex("responsaveis").where({ id_responsavel }).update(data);
        return dataUpdate 
    } catch (err) {
        console.error("Houve um erro ao realizar um Update no responsavel: ", err)
        return []
    } 
}


const deleteRecord = async (id_responsavel) => {
    try{
        const dataDeleteRecord = knex("responsaveis").where({ id_responsavel }).delete();
        return dataDeleteRecord
    } catch (err) {
        console.error("Houve um erro ao deletar um responsavel: ", err)
        return []
    } 
}

export default { getAll, getById, create, update, deleteRecord };
