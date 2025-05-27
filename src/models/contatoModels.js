import config from "../../config/knexfile.js"
import knexModule from "knex"

const environment = process.env.NODE_ENV || 'development'
const knexInstance = knexModule(config[environment]);

const knex = knexInstance;


const getAll = async () => {
    try {
        const dataGetAll = await knex("mensagens_suporte").select("*")
        return dataGetAll
    } catch (err) {
        console.error("Houve um erro ao ler as mensagens: ", err)
        return []
    }
}

const getAllByStatus = async (status_mensagem) => {
    try {
        const dataGetAllByStatus = await knex("mensagens_suporte").where({status_mensagem})
        return dataGetAllByStatus
    } catch (err) {
        console.error("Houve um erro ao ler as mensagem com status especifico: ", err)
        return
    }
}

const create = async (data) => {
    try {
        const newData = await knex('mensagens_suporte').insert(data);
        return newData;
    } catch (err) {
        console.error("Houve um erro ao salvar a mensagem n banco de dados: ", err)
        return []
    }
}

const update = async (id_mensagem_suporte, status) => {
    try {
        const updateData = await knex('mensagens_suporte').where({id_mensagem_suporte}).update({ status_mensagem: status })
        return updateData
    } catch (err) {
        console.error("Houve um erro ao atualizar a mensagem n banco de dados: ", err)
    }
}


export default {getAll, create, getAllByStatus, update}