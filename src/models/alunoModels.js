import knex from '../../config/connection.js';
import bcrypt from 'bcryptjs';

const saltRounds = 10; // sequencia de caracteres aleatorio

const logAlteracao = async (tabela_nome, operacao_tipo, dados_antigos, dados_novos, admin_cpf) => {
    await knex("Log_Alteracoes").insert({
        tabela_nome,
        operacao_tipo,
        dados_antigos: dados_antigos ? JSON.stringify(dados_antigos) : null,
        dados_novos: dados_novos ? JSON.stringify(dados_novos) : null,
        admin_cpf
    });
};

// model select all
const getAll = async () => {
    try {
        const dataGetAll = await knex("Alunos").select('*');
        return dataGetAll;
    } catch (err) {
        console.error("Houve um erro ao listar todos os alunos: ", err);
        return []; // retorna array vazio
    }
};

// select by id
const getById = async (id_aluno) => {
    try {
        const dataGetById = await knex("Alunos").where({ id_aluno }).first();
        return dataGetById;
    } catch (err) {
        console.error("Houve um erro ao listar um aluno pelo ID: ", err);
        return null; // retorna nulo
    }
};

// create
const create = async (data) => {
    try {

        // checkando se cpf ja existe no bd
        const cpfJaExiste = await cpfExisteEmQualquerTabela(data.cpf_aluno);

        if (cpfJaExiste) {
            const error = new Error('CPF já cadastrado em algum usuário do sistema.');
            error.status = 400;
            throw error;
        }

        // verificando se existe responsavel para criar um aluno
        const responsavel = await knex('responsaveis').where({ cpf_responsavel: data.cpf_responsavel }).first();
        if (!responsavel) {
            return res.status(404).json({ message: 'Responsável inexistente.' })
        }

        // cadastrando meu user com senha hasheada
        const senhaHashed = await bcrypt.hash(data.senha, saltRounds);

        // atribuindo senha hash para user
        const [id_aluno] = await knex("Alunos").insert({
            nome: data.nome,
            cpf_aluno: data.cpf_aluno,
            senha: senhaHashed,
            cpf_responsavel: data.cpf_responsavel,
            id_rota_onibus: data.id_rota_onibus
        });

        const dataSimples = {
            nome: data.nome,
            cpf_aluno: data.cpf_aluno,
            senha: senhaHashed,
            cpf_responsavel: data.cpf_responsavel,
            id_rota_onibus: data.id_rota_onibus
        }

        await logAlteracao("Alunos", "INSERT", null, dataSimples, data.admin_cpf);
        return id_aluno;

    } catch (err) {
        console.error("Houve um erro ao criar um aluno: ", err);
        throw err;
    }
};

// atualizar
const update = async (id_aluno, data) => {
    try {
        if (data.senha) {
            data.senha = await bcrypt.hash(data.senha, saltRounds);
        }

        const alunoAntigo = await knex("Alunos").where({ id_aluno }).first();

        const dataSimples = {
            nome: data.nome,
            cpf_aluno: alunoAntigo.cpf_aluno,
            senha: data.senha,
            cpf_responsavel: alunoAntigo.cpf_responsavel,
            id_rota_onibus: alunoAntigo.id_rota_onibus
        }
        const dataUpdate = await knex("Alunos").where({ id_aluno }).update(dataSimples);

        await logAlteracao("Alunos", "UPDATE", alunoAntigo, dataSimples, data.admin_cpf);

        return dataUpdate;
    } catch (err) {
        console.error("Erro ao atualizar aluno: ", err);
        return 0;
    }
};

// delete
const deleteRecord = async (id_aluno, cpf_admin) => {
    try {
        const alunoAntigo = await knex("Alunos").where({ id_aluno }).first();
        const dataDeleteRecord = await knex("Alunos").where({ id_aluno }).delete();

        await logAlteracao("Alunos", "DELETE", alunoAntigo, null, cpf_admin);

        return dataDeleteRecord;
    } catch (err) {
        console.error("Erro ao deletar aluno: ", err);
        return 0;
    }
};

// puxar cpf do aluno
const getByCPF = async (cpf) => {
    try {
        const aluno = await knex('Alunos').where({ cpf_aluno: cpf }).first();
        return aluno;
    } catch (err) {
        console.error('Erro ao buscar aluno por CPF: ', err);
        return null;
    }
};


// funtion para verificar se cpf ja existe no bd
const cpfExisteEmQualquerTabela = async (cpf) => {
    try {
        const admin = await knex('administrador').where({ cpf }).first();
        if (admin) return true;

        const aluno = await knex('alunos').where({ cpf_aluno: cpf }).first();
        if (aluno) return true;

        const responsavel = await knex('responsaveis').where({ cpf_responsavel: cpf }).first();
        if (responsavel) return true;

        const motorista = await knex('funcionario_motorista').where({ cpf_motorista: cpf }).first();
        if (motorista) return true;

        return false;
    } catch (err) {
        console.error('Erro ao verificar CPF nas tabelas:', err);
        throw err;
    }
};


export default { getAll, getById, create, update, deleteRecord, getByCPF, cpfExisteEmQualquerTabela };
