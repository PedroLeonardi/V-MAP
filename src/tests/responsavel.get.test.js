// TESTE GET DE RESOPONSAVEISSSS 
// FUNCIONANDO :)))))
import request from 'supertest';
import app from '../app.js'
import knex from '../../config/connection.js';

// cria uma tabela caso nao existir essa (porem ele esta checkando meu bd tb!!!)
beforeAll(async () => {
  if (!(await knex.schema.hasTable('responsaveis'))) {
    await knex.schema.createTable('responsaveis', (table) => {
      table.increments('id');
      table.string('nome');
    });
  }
});

// fecha a conexão pós teste
afterAll(async () => {
  await knex.destroy();
});


// aqui é o que eu espero do teste
describe('Responsáveis GET API', () => {
  // basicamente quero um status (200) se a response de GET for ok.
  it('deve retornar 200 e lista de responsáveis', async () => {
    const res = await request(app).get('/responsavel');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
