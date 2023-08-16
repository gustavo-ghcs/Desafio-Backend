const request = require('supertest');
const app = require('../server');

//---------------------------------------------------------------------//
//GET//
describe('Rota GET /filmes', () => {
  it('Deve retornar uma lista de filmes', async () => {
    const res = await request(app).get('/filmes')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  });
});

//---------------------------------------------------------------------//
//POST//
describe('Rota POST /filmes', () => {
  it('Deve adicionar um novo filme', async () => {
    const novoFilme = {
      id: '3',
      nome: 'Novo Filme',
      duracao: '110 min',
    };
    const response = await request(app)
      .post('/filmes')
      .send(novoFilme);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(novoFilme);
    const responseGet = await request(app).get('/filmes');
    expect(responseGet.body).toContainEqual(novoFilme);
  });
});

//---------------------------------------------------------------------//
//PUT//
describe('Rota PUT /filmes/:id', () => {
  it('Deve atualizar um filme existente e retornar os dados atualizados', async () => {
    const filme = {
      id: '1',
      nome: 'Filme Antigo',
      duracao: '120 minutos',
    };
    await request(app).post('/filmes').send(filme);
    const filmeAtualizado = {
      nome: 'Filme Novo',
      duracao: '150 minutos',
    };
    const response = await request(app)
      .put('/filmes/1')
      .send(filmeAtualizado);
    expect(response.status).toBe(200);
    expect(response.body.nome).toBe(filmeAtualizado.nome);
    expect(response.body.duracao).toBe(filmeAtualizado.duracao);
  });

  it('Deve retornar 404 se o filme não for encontrado para atualização', async () => {
    const filmeAtualizado = {
      nome: 'Filme Novo',
      duracao: '150 minutos',
    };

    const response = await request(app)
      .put('/filmes/999')
      .send(filmeAtualizado);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Filme não encontrado');
  });
});
//---------------------------------------------------------------------//
//PATCH//
describe('Rota PATCH /filmes/:id', () => {
  it('Deve atualizar parcialmente um filme existente e retornar os dados atualizados', async () => {
    const filme = {
      id: '1',
      nome: 'Filme Antigo',
      duracao: '120 minutos',
    };
    await request(app).post('/filmes').send(filme);
    const atualizacaoParcial = {
      nome: 'Filme Novo',
    };
    const response = await request(app)
      .patch('/filmes/1')
      .send(atualizacaoParcial);
    expect(response.status).toBe(200);
    expect(response.body.nome).toBe(atualizacaoParcial.nome);
  });

  it('Deve retornar 404 se o filme não for encontrado para atualização parcial', async () => {
    const atualizacaoParcial = {
      nome: 'Filme Novo',
    };
    const response = await request(app)
      .patch('/filmes/999')
      .send(atualizacaoParcial);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Filme não encontrado');
  });
});

//---------------------------------------------------------------------//
//DELETE//
describe('Rota DELETE /filmes/:id', () => {
  it('Deve retornar 204 se o filme for excluído com sucesso', async () => {
    const filme = {
      id: '1',
      nome: 'Filme de Teste',
      duracao: '120 minutos',
    };
    await request(app).post('/filmes').send(filme);
    const response = await request(app).delete('/filmes/1');
    expect(response.status).toBe(204);
  });
});
