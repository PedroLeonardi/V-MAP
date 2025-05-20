import config from '../../config/knexfile.js';
import knexModule from 'knex'

const environment = process.env.NODE_ENV || 'development';
const knexInstance = knexModule(config[environment]);

const knex = knexInstance

const getAll = async () => {
    try {
        const dataGetAll = await knex("aluno").select('*');
        return dataGetAll
    } catch (err){
        console.error("Houve um erro ao listar todos os alunos: ", err)
        return []
    } finally {
        await knex.destroy()
    }
} 


const getById = async (id_aluno) => {
    try{
        
        const dataGetById =  knex("aluno").where({id_aluno}).first();
        return dataGetById
    } catch (err) {
        console.error("Houve um erro ao listar um aluno pelo ID: ", err)
        return []
    }  finally {
        await knex.destroy();
    }
}

const create = async (data) => {
    try{
        const dataCreate = knex("aluno").insert(data);
        return dataCreate
    } catch (err) {
        console.error ("Houve um erro ao criar um aluno: ", err)
        return []
    } finally {
        await knex.destroy()
    }
}

const update = async (id_aluno, data) => {
    try {
        const dataUpdate = knex("aluno").where({ id_aluno }).update(data);
        return dataUpdate 
    } catch (err) {
        console.error("Houve um erro ao realizar um Update no aluno: ", err)
        return []
    } finally {
        await knex.detroy()        
    }
}


const deleteRecord = async (id_aluno) => {
    try{
        const dataDeleteRecord = knex("aluno").where({ id_aluno }).delete();
        return dataDeleteRecord
    } catch (err) {
        console.error("Houve um erro ao deletar um aluno: ", err)
        return []
    } finally {
        await knex.destroy()
    }
}

export default { getAll, getById, create, update, deleteRecord };
