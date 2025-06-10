import knex from '../../config/connection.js';

const getAll = async () => {
  try {
    const motoristas = await knex('funcionario_motorista').select('*');
    return motoristas;
  } catch (err) {
    console.error('Houve um erro ao listar todos os motoristas: ', err);
    return [];
  }
};

const getById = async (id_motorista) => {
  try {
    const motorista = await knex('funcionario_motorista').where({ id_motorista }).first();
    return motorista;
  } catch (err) {
    console.error('Houve um erro ao listar um motorista pelo ID: ', err);
    return null;
  }
};

const create = async (data) => {
  try {

    const cpfJaExiste = await cpfExisteEmQualquerTabela(data.cpf_motorista);

    if (cpfJaExiste) {
      const error = new Error('CPF já cadastrado em algum usuário do sistema.');
      error.status = 400;
      throw error;
    }


    const [id_motorista] = await knex('funcionario_motorista').insert(data);
    return id_motorista;
  } catch (err) {
    console.error('Houve um erro ao criar um motorista: ', err);
    throw err;
  }
};


const update = async (id_motorista, data) => {
  try {
    const updatedRows = await knex('funcionario_motorista').where({ id_motorista }).update(data);
    return updatedRows;
  } catch (err) {
    console.error('Houve um erro ao realizar um update no motorista: ', err);
    return 0;
  }
};

const deleteRecord = async (id_motorista) => {
  try {
    const deletedRows = await knex('funcionario_motorista').where({ id_motorista }).delete();
    return deletedRows;
  } catch (err) {
    console.error('Houve um erro ao deletar um motorista: ', err);
    return 0;
  }
};

const getByCPF = async (cpf) => {
  try {
    const motorista = await knex('funcionario_motorista').where({ cpf_motorista: cpf }).first();
    return motorista;
  } catch (err) {
    console.error('Erro ao buscar motorista por CPF: ', err);
    return null;
  }
};

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
