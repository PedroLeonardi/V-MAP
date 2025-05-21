import config from '../../config/knexfile.js';
import knexModule from 'knex'

const environment = process.env.NODE_ENV || 'development';
const knexInstance = knexModule(config[environment]);

const knex = knexInstance

const getAll = async () => {
    try {
        const dataGetAll = await knex("veiculos_onibus").select('*');
        return dataGetAll
    } catch (err){
        console.error("Houve um erro ao listar todos as rotas: ", err)
        return []
    } 
} 


const getById = async (id_rota_onibus) => {
    try{
        
        const dataGetById =  knex("veiculos_onibus").where({id_rota_onibus}).first();
        return dataGetById
    } catch (err) {
        console.error("Houve um erro ao listar uma rota pelo ID: ", err)
        return []
    }  
}

const create = async (data) => {
    try{
        const dataCreate = knex("veiculos_onibus").insert(data);
        return dataCreate
    } catch (err) {
        console.error ("Houve um erro ao criar uma rota: ", err)
        return []
    } 
}

const update = async (id_rota_onibus, data) => {
    try {
        const dataUpdate = knex("veiculos_onibus").where({ id_rota_onibus }).update(data);
        return dataUpdate 
    } catch (err) {
        console.error("Houve um erro ao realizar um Update na rota: ", err)
        return []
    } 
}


const deleteRecord = async (id_rota_onibus) => {
    try{
        const dataDeleteRecord = knex("veiculos_onibus").where({ id_rota_onibus }).delete();
        return dataDeleteRecord
    } catch (err) {
        console.error("Houve um erro ao deletar uma rota: ", err)
        return []
    } 
}

export default { getAll, getById, create, update, deleteRecord };
