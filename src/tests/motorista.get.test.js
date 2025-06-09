// TESTE GET DE RESOPONSAVEISSSS 
// FUNCIONANDO :)))))
import request from 'supertest';
import app from '../app.js'
import knex from '../../config/connection.js';

// cria uma tabela caso nao existir essa (porem ele esta checkando meu bd tb!!!)
beforeAll(async () => {
  if (!(await knex.schema.hasTable('funcionario_motorista'))) {
    await knex.schema.createTable('funcionario_motorista', (table) => {
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
describe('Motoristas GET API', () => {
  // basicamente quero um status (200) se a response de GET for ok.
  it('deve retornar 200 e lista de motoristas', async () => {
    const res = await request(app).get('/motorista');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
