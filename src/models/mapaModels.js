import config from "../../config/knexfile.js"
import knexModule from "knex"

const environment = process.env.NODE_ENV || 'development'
const knexInstance = knexModule(config[environment]);

const knex = knexInstance;

const readCordinates = async () => {
    try {
        const dataCordinates = await knex('rotas_checkpoints_view').select('*')
        return dataCordinates
    } catch (err) {
        console.error("Houve um erro ao buscar os chechpoints: ", err)
        return []
    }
}

export default {readCordinates}