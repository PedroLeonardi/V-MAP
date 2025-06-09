import request from 'supertest';
import app from '../app.js';
import knex from '../../config/connection.js';

// cria a tabela alunos caso não exista
beforeAll(async () => {
  if (!(await knex.schema.hasTable('Alunos'))) {
    await knex.schema.createTable('Alunos', (table) => {
      table.increments('id');
      table.string('nome');
    });
  }
});

// fecha a conexão após os testes
afterAll(async () => {
  await knex.destroy();
});

describe('Alunos API', () => {
  it('deve retornar 200 e lista de alunos', async () => {
    const res = await request(app).get('/aluno');  // rota conforme seu app

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
