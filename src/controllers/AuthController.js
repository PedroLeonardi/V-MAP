import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/jwt.js';
import knex from '../../config/connection.js';
import bcrypt from 'bcryptjs';
import logger from '../logs/logger.js';

const gerarToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const loginAdminController = async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    const admin = await knex('administrador').where({ cpf }).first();

    if (!admin) {
      return res.status(404).json({ message: 'Admin não encontrado.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, admin.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    const token = gerarToken({ id: admin.id_admin, cpf: admin.cpf });
    logger.info(`[LOGIN] Admin autenticado com sucesso (CPF: ${cpf}, ID: ${admin.id_admin})`);
    return res.status(200).json({ message: 'Login de ADM efetuado com sucesso.', token });
  } catch (err) {
    console.error("Erro ao efetuar login", err);
    return res.status(500).json({ message: 'Erro ao efetuar login.' });
  }
};

export const loginAlunoController = async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    const aluno = await knex('Alunos').where({ cpf_aluno: cpf }).first();

    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, aluno.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    const token = gerarToken({ id: aluno.id_aluno, cpf: aluno.cpf_aluno });
     logger.info(`[LOGIN] Aluno autenticado com sucesso (CPF: ${cpf}, ID: ${aluno.id_aluno})`);
    return res.status(200).json({ message: 'Login de aluno efetuado com sucesso.', token });
  } catch (err) {
    console.error("Erro ao efetuar login do aluno", err);
    return res.status(500).json({ message: 'Erro ao efetuar login do aluno.' });
  }
};

export const loginResponsavelController = async (req, res) => {
  const { cpf, senha } = req.body;

  try {

    const responsavel = await knex('responsaveis').where({ cpf_responsavel: cpf }).first();

    if (!responsavel) {
      return res.status(404).json({ message: 'Responsável não encontrado.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, responsavel.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    const token = gerarToken({ id: responsavel.id_responsavel, cpf_responsavel: responsavel.cpf_responsavel });
 logger.info(`[LOGIN] Responsável autenticado com sucesso (CPF: ${cpf}, ID: ${responsavel.id_responsavel})`);
    return res.status(200).json({ message: 'Login do responsável efetuado com sucesso.', token });
  } catch (err) {
    console.error("Erro ao efetuar login do responsável.", err);
    return res.status(500).json({ message: 'Erro ao efetuar login do responsável.' });
  }
};
