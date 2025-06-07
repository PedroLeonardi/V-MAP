// TESTE GET DE RESOPONSAVEISSSS 
// FUNCIONANDO :)))))
import request from 'supertest';
import app from '../app.js'

describe('Responsáveis API', () => {
  it('deve retornar 200 e lista de responsáveis', async () => {
    const res = await request(app).get('/responsavel');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
