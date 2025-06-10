import config from "../../config/knexfile.js"
import knexModule from "knex"

const environment = process.env.NODE_ENV || 'development'
const knexInstance = knexModule(config[environment]);

const knex = knexInstance;

const createLogOnibus = async (cordenadas) => {

    console.log('-----------------------------------------------', cordenadas)
    try {
        const sendLogOnibus = await knex('Log_onibus').insert({
            localizacao: knex.raw(`ST_GeomFromText('POINT(${cordenadas.localizacao[0]} ${cordenadas.localizacao[1]})', 4326)`),
            id_rota_onibus: cordenadas.id_rota_onibus
        })

        return sendLogOnibus
    } catch (err) {
        console.error("Houve um erro ao registrar o log_onibus: ", err)
        return []
    }
}

const createLogAluno = async (data) => {
    console.log("-----------------------------------------", data)
    try {

        const dataAtualizado = await knex('Log_Alunos').insert({
            cpf_aluno: data.cpf_user,
            id_rota_onibus: data.id_rota_onibus,
            evento: data.evento,
            coordenada_evento:  knex.raw(`ST_GeomFromText('POINT(${data.lat} ${data.lgt})', 4326)`),
            //  knex.raw(ST_GeomFromText('POINT(${data.lat} ${data.lgt})', 4326)),
        })

        return dataAtualizado
    } catch (err) {

        console.error("Houve um erro ao criar log alunos", err)

        return []
    }

}

const readLogAlunos = async () => {
    try {
        const dataLogAlunos = await knex('Log_Alunos').select('*')
        return dataLogAlunos
    } catch (err) {
        console.error("Houve um erro ao listar todos os log de alunos: ", err)
        return []
    }
}

const readLogAlunosByCpf = async (cpf_aluno) => {
    try {
        const dataLogAlunos = await knex('Log_Alunos').where({cpf_aluno})
        return dataLogAlunos
    } catch (err) {
        console.error("Houve um erro ao listar todos os log de alunos: ", err)
        return []
    }
}

const readLogAlunosLast = async (cpf_aluno) => {
    try {
        const dataLogAlunosLast = await knex('log_Alunos').where({cpf_aluno}).orderBy('dataehora', 'desc').limit(1).then(rows => rows[0]);
        return dataLogAlunosLast 
    } catch (err) {
        console.error("Houve um erro ao listar todos os log de alunos: ", err)
        return []
    }
}



// -------------------------

const readLogAdmim = async () => {
    try {
        const dataLog = await knex('Log_Alteracoes').select('*')
        return dataLog 
    } catch (err) {
        console.error("Houve um erro ao listar todos os log: ", err)
        return []
    }
}

const readViewResponsavel = async (CPF_Responsavel) => {
    try {
        const dataLog = await knex('painel_responsavel').where({CPF_Responsavel})
        return dataLog 
    } catch (err) {
        console.error("Houve um erro ao listar todos os log: ", err)
        return []
    }
}


// -------------------------
export default { createLogOnibus, createLogAluno, readLogAlunos, readLogAlunosLast , readLogAlunosByCpf , readLogAdmim, readViewResponsavel}
