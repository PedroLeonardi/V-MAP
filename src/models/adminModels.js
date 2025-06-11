// src/models/adminModel.js
import knex from '../../config/connection.js';
import bcrypt from 'bcryptjs';

const saltRounds = 10; // sequencia de caracteres aleatorios

const logAlteracao = async (tabela_nome, operacao_tipo, dados_antigos, dados_novos, admin_cpf) => {
  try {
    await knex("Log_Alteracoes").insert({
      tabela_nome,
      operacao_tipo,
      dados_antigos: dados_antigos ? JSON.stringify(dados_antigos) : null,
      dados_novos: dados_novos ? JSON.stringify(dados_novos) : null,
      admin_cpf
    });
  } catch (err) {
    console.error("Erro ao registrar log de alteração:", err);
  }
};


const getAll = async () => {
  try {
    const dataGetAll = await knex("administrador").select('*');
    return dataGetAll;
  } catch (err) {
    console.error("Houve um erro ao listar todos os admins: ", err);
    return []; // retorna array vazio
  }
};

// select by id
const getById = async (id) => {
  try {
    const dataGetById = await knex("administrador").where({ id_admin: id }).first();
    return dataGetById;
  } catch (err) {
    console.error('Houve um erro ao listar um adm por ID: ', err);
    return null;
  }
};

// create
const create = async (data) => {
  try {
    const cpfJaExiste = await cpfExisteEmQualquerTabela(data.cpf);

    if (cpfJaExiste) {
      const error = new Error('CPF já cadastrado em algum usuário do sistema.');
      error.status = 400;
      throw error;
    }


    // aplicando senha hash para senha no bd
    const senhaHashed = await bcrypt.hash(data.senha, saltRounds);

    const dataSimples = {
      cpf: data.cpf,
      senha: senhaHashed,
      nome: data.nome,
      cargo: data.cargo
    }

    const [id_admin] = await knex("administrador").insert(dataSimples);

    await logAlteracao("Administradores", "INSERT", null, dataSimples, data.admin_cpf);

    return id_admin;

  } catch (err) {
    throw err;
  }
};

// update
const update = async (id_admin, data) => {
  try {

    // aplicando hash ao atualizar
    if (data.senha) {
      data.senha = await bcrypt.hash(data.senha, saltRounds);
    }
    const admAntigo = await knex("administrador").where({ id_admin }).first();
    const dataSimples = {
      cpf: admAntigo.cpf,
      senha: data.senha,
      nome: data.nome,
      cargo: data.cargo
    }
    const dataUpdate = await knex("administrador").where({ id_admin }).update(dataSimples);

    await logAlteracao("Administradores", "UPDATE", data, dataSimples, data.admin_cpf);

    return dataUpdate
  } catch (err) {
    throw new Error("Erro ao atualizar administrador");
  }
};

// delete 
const deleteRecord = async (id_admin, admin_cpf) => {
  try {

    const admAntigo = await knex("administrador").where({ id_admin }).first();


    const Delte = await knex("administrador").where({ id_admin }).delete();

    await logAlteracao("Administradores", "DELETE", null, admAntigo, admin_cpf);

    return Delte
  } catch (err) {
    throw new Error("Erro ao deletar administrador");
  }
};

// puxar cpf do administrador
const getByCPF = async (cpf) => {
  try {
    const administrador = await knex('administrador').where({ cpf: cpf }).first();
    return administrador;
  } catch (err) {
    console.error('Erro ao buscar administrador por CPF: ', err);
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
