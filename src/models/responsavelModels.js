import knex from '../../config/connection.js';
import bcrypt from 'bcryptjs';

const saltRounds = 10; // gerando caracteres aleatorios

// select * from responsaveis
const getAll = async () => {
  try {
    const responsaveis = await knex('responsaveis').select('*');
    return responsaveis;
  } catch (err) {
    console.error('Houve um erro ao listar todos os responsáveis: ', err);
    return [];
  }
};

// select by id
const getById = async (id_responsavel) => {
  try {
    const responsavel = await knex('responsaveis').where({ id_responsavel }).first();
    return responsavel;
  } catch (err) {
    console.error('Houve um erro ao listar um responsável pelo ID: ', err);
    return null;
  }
};

// verifica se CPF existe em qualquer tabela 
const cpfExisteEmQualquerTabela = async (cpf) => {
  try {
    const admin = await knex('administrador').where({ cpf }).first();
    if (admin) return true;

    const aluno = await knex('alunos').where({ cpf_aluno: cpf }).first();
    if (aluno) return true;

    const responsavel = await knex('responsaveis').where({ cpf_responsavel: cpf }).first();
    if (responsavel) return true;

    return false;
  } catch (err) {
    console.error('Erro ao verificar CPF nas tabelas:', err);
    throw err;
  }
};

// create
const create = async (data) => {
  try {

    // checkando se cpf ja existe no bd
    const cpfJaExiste = await cpfExisteEmQualquerTabela(data.cpf_responsavel);
    if (cpfJaExiste) {
      const error = new Error('CPF já cadastrado em algum usuário do sistema.');
      error.status = 400;
      throw error;
    }

    const senhaHashed = await bcrypt.hash(data.senha, saltRounds);

    const [id_responsavel] = await knex('responsaveis').insert({
      nome: data.nome,
      cpf_responsavel: data.cpf_responsavel,
      senha: senhaHashed
    });

    return id_responsavel;
  } catch (err) {
    console.error('Houve um erro ao criar um responsável: ', err);
    throw err;
  }
};

const update = async (id_responsavel, data) => {
  try {
    const dataUpdate = { ...data };

    if (data.senha) {
      dataUpdate.senha = await bcrypt.hash(data.senha, saltRounds);
    }

    if (data.cpf) {
      dataUpdate.cpf_responsavel = data.cpf;
      delete dataUpdate.cpf;
    }

    const updatedRows = await knex('responsaveis').where({ id_responsavel }).update(dataUpdate);
    return updatedRows;
  } catch (err) {
    console.error('Houve um erro ao realizar um update no responsável: ', err);
    return 0;
  }
};

// delete
const deleteRecord = async (id_responsavel) => {
  try {
    const deletedRows = await knex('responsaveis').where({ id_responsavel }).delete();
    return deletedRows;
  } catch (err) {
    console.error('Houve um erro ao deletar um responsável: ', err);
    return 0;
  }
};

// get by CPF
const getByCPF = async (cpf) => {
  try {
    const responsavel = await knex('responsaveis').where({ cpf_responsavel: cpf }).first();
    return responsavel;
  } catch (err) {
    console.error('Erro ao buscar responsável por CPF: ', err);
    return null;
  }
};

export default { getAll, getById, create, update, deleteRecord, getByCPF, cpfExisteEmQualquerTabela };
