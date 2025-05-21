import config from "../../config/knexfile.js"
import knexModule from "knex"

const environment = process.env.NODE_ENV || 'development'
const knexInstance = knexModule(config[environment]);

const knex = knexInstance;


const getAll = async () => {
    try {
        const dataGetAll = await knex("TABELA").select("*")
        return dataGetAll
    } catch (err) {
        console.error("Houve um erro ao ler as mensagens: ", err)
        return []
    }
}

const create = async (data) => {
    try {
        const newData = await knex('TABELA').insert(data);
        return newData;
    } catch (err) {
        console.error("Houve um erro ao salvar a mensagem n banco de dados: ", err)
        return []
    }
}


export default {getAll, create}