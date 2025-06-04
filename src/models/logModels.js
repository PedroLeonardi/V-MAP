import config from "../../config/knexfile.js"
import knexModule from "knex"

const environment = process.env.NODE_ENV || 'development'
const knexInstance = knexModule(config[environment]);

const knex = knexInstance;

const createLogOnibus = async (cordenadas) => {
    try {
        const sendLogOnibus = knex('Log_onibus').insert({
            localizacao: knex.raw(`ST_GeomFromText('POINT(${cordenadas.localizacao[0]} ${cordenadas.localizacao[1]})', 4326)` ),
            id_rota_onibus: cordenadas.id_rota_onibus
        })

        return sendLogOnibus
    } catch (err) {
        console.error("Houve um erro ao registrar o log_onibus: ", err)
        return []
    }
}

// -------------------------
        export default {createLogOnibus}