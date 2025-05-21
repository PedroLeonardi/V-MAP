import config from '../../config/knexfile.js';
import knexModule from 'knex'

const environment = process.env.NODE_ENV || 'development';
const knexInstance = knexModule(config[environment]);

const knex = knexInstance

const getAll = async () => {
    try {
        const dataGetAll = await knex("Alunos").select('*');
        return dataGetAll
    } catch (err){
        console.error("Houve um erro ao listar todos os alunos: ", err)
        return []
    } 
} 


const getById = async (id_aluno) => {
    try{
        
        const dataGetById =  knex("Alunos").where({id_aluno}).first();
        return dataGetById
    } catch (err) {
        console.error("Houve um erro ao listar um aluno pelo ID: ", err)
        return []
    }  
}

const create = async (data) => {
    try{
        const dataCreate = knex("Alunos").insert(data);
        return dataCreate
    } catch (err) {
        console.error ("Houve um erro ao criar um aluno: ", err)
        return []
    } 
}

const update = async (id_aluno, data) => {
    try {
        const dataUpdate = knex("Alunos").where({ id_aluno }).update(data);
        return dataUpdate 
    } catch (err) {
        console.error("Houve um erro ao realizar um Update no aluno: ", err)
        return []
    } 
}


const deleteRecord = async (id_aluno) => {
    try{
        const dataDeleteRecord = knex("Alunos").where({ id_aluno }).delete();
        return dataDeleteRecord
    } catch (err) {
        console.error("Houve um erro ao deletar um aluno: ", err)
        return []
    } 
}

export default { getAll, getById, create, update, deleteRecord };
