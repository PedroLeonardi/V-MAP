import request from 'supertest';
import app from '../app.js';
import knex from '../../config/connection.js';

// cria a tabela administrador caso não exista
beforeAll(async () => {
  if (!(await knex.schema.hasTable('administrador'))) {
    await knex.schema.createTable('administrador', (table) => {
      table.increments('id');
      table.string('nome');
      // adicione aqui outras colunas necessárias, ex:
      // table.string('cpf');
      // table.date('data_nascimento');
    });
  }
});

// fecha a conexão após os testes
afterAll(async () => {
  await knex.destroy();
});

describe('Administrador GET API', () => {
  it('deve retornar 200 e lista de administrador', async () => {
    const res = await request(app).get('/admin');  // rota conforme seu app

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
