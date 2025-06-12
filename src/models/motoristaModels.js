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

        const cpfJaExiste = await cpfExisteEmQualquerTabela(data.cpf_motorista);

    if (cpfJaExiste) {
      const error = new Error('CPF já cadastrado em algum usuário do sistema.');
      error.status = 400;
      throw error;
    }

    const [id_motorista] = await knex('funcionario_motorista').insert({
      nome: data.nome,
      cpf_motorista: data.cpf_motorista,
    });

    await logAlteracao("Motorista", "INSERT", null, {
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
    
    await logAlteracao("Motorista", "UPDATE", motoristaAntigo, {
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
        await logAlteracao("Motorista", "DELETE", motoristaAntigo, null , admin_cpf);
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
