import knex from '../../config/connection.js';
import bcrypt from 'bcryptjs';

const saltRounds = 10;



const getAll = async () => {
    try {
        const dataGetAll = await knex("Alunos").select('*');
        return dataGetAll;
    } catch (err) {
        console.error("Houve um erro ao listar todos os alunos: ", err);
        return [];
    }
};

const getById = async (id_aluno) => {
    try {
        const dataGetById = await knex("Alunos").where({ id_aluno }).first();
        return dataGetById;
    } catch (err) {
        console.error("Houve um erro ao listar um aluno pelo ID: ", err);
        return null;
    }
};

const create = async (data) => {
    try {
        const alunoExist = await knex('Alunos').where({ cpf_aluno: data.cpf_aluno }).first();

        if (alunoExist) {
            const error = new Error('Aluno já cadastrado');
            error.statusCode = 400;
            throw error;
        }

        const responsavel = await knex('responsaveis').where({ cpf_responsavel: data.cpf_responsavel }).first();
        if (!responsavel) {
            const error = new Error('Responsável não encontrado');
            error.statusCode = 404;
            throw error;
        }

        const senhaHashed = await bcrypt.hash(data.senha, saltRounds);

        const [id_aluno] = await knex("Alunos").insert({
            nome: data.nome,
            cpf_aluno: data.cpf_aluno,
            senha: senhaHashed,
            cpf_responsavel: data.cpf_responsavel,
            id_rota_onibus: data.id_rota_onibus
        });

        return id_aluno;

    } catch (err) {
        console.error("Houve um erro ao criar um aluno: ", err);
        throw err;
    }
};


const update = async (id_aluno, data) => {
    try {
        const dataUpdate = await knex("Alunos").where({ id_aluno }).update(data);
        return dataUpdate;
    } catch (err) {
        console.error("Houve um erro ao realizar um Update no aluno: ", err);
        return 0;
    }
};

const deleteRecord = async (id_aluno) => {
    try {
        const dataDeleteRecord = await knex("Alunos").where({ id_aluno }).delete();
        return dataDeleteRecord;
    } catch (err) {
        console.error("Houve um erro ao deletar um aluno: ", err);
        return 0;
    }
};

export default { getAll, getById, create, update, deleteRecord };
