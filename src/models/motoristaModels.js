import knex from '../../config/connection.js';

const logAlteracao = async (tabela_nome, operacao_tipo, dados_antigos, dados_novos, admin_cpf) => {
  await knex("Log_Alteracoes").insert({
    tabela_nome,
    operacao_tipo,
    dados_antigos: dados_antigos ? JSON.stringify(dados_antigos) : null,
    dados_novos: dados_novos ? JSON.stringify(dados_novos) : null,
    admin_cpf
  });
};

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

    const motoristaExistente = await knex('funcionario_motorista')
      .where({ cpf_motorista: data.cpf_motorista })
      .first();

    if (motoristaExistente) {
      const error = new Error('Motorista com este CPF já está cadastrado');
      error.statusCode = 400;
      throw error;
    }

    const [id_motorista] = await knex('funcionario_motorista').insert({
      nome: data.nome,
      cpf_motorista: data.cpf_motorista,
    });

    await logAlteracao("funcionario_motorista", "INSERT", null, {
      nome: data.nome,
      cpf_motorista: data.cpf_motorista,
    }, data.admin_cpf);

    return id_motorista;
  } catch (err) {
    console.error('Houve um erro ao criar um motorista: ', err);
    throw err;
  }
};


const update = async (id_motorista, data) => {
  try {

    const motoristaAntigo = await knex("funcionario_motorista").where({ id_motorista }).first();

    const updatedRows = await knex('funcionario_motorista').where({ id_motorista }).update(
      {
        nome: data.nome
      }
    );
    
    await logAlteracao("Alunos", "UPDATE", motoristaAntigo, {
      nome: data.nome,
      cpf_motorista: motoristaAntigo.cpf_motorista
    }, data.admin_cpf);
    
    return updatedRows;
  } catch (err) {
    console.error('Houve um erro ao realizar um update no motorista: ', err);
    return 0;
  }
};

const deleteRecord = async (id_motorista, admin_cpf) => {
  try {
    const motoristaAntigo = await knex("funcionario_motorista").where({ id_motorista }).first();
    const deletedRows = await knex('funcionario_motorista').where({ id_motorista }).delete();
        await logAlteracao("Alunos", "DELETE", motoristaAntigo, null , admin_cpf);
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

export default { getAll, getById, create, update, deleteRecord, getByCPF };
