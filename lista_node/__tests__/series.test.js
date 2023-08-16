const request = require('supertest');
const app = require('../server');

//---------------------------------------------------------------------//
//GET//
describe('Rota GET /series', () => {
    it('Deve retornar uma lista de series', async () => {
      const res = await request(app).get('/series')
      expect(res.status).toBe(200)
      expect(Array.isArray(res.body)).toBe(true)
    });
  });

//---------------------------------------------------------------------//
//POST//
describe('Rota POST /series', () => {
  it('Deve adicionar uma nova serie', async () => {
    const novaSerie = {
      id: "2",
      nome: "Nova",
      temporada: "S2",
      episodio: "E4",
      duracaoEpisodio: "100 min"
    };
    const response = await request(app)
      .post('/series')
      .send(novaSerie);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(novaSerie);
    const responseGet = await request(app).get('/series');
    expect(responseGet.body).toContainEqual(novaSerie);
  });
});

//---------------------------------------------------------------------//
//PUT//
describe('Rota PUT /series/:id', () => {
  it('Deve atualizar uma serie existente e retornar os dados atualizados', async () => {
    const serie = {
        id: "1",
        nome: "Serie Antiga",
        temporada: "S3",
        episodio: "E2",
        duracaoEpisodio: "120 min",
    };
    await request(app).post('/series').send(serie);
    const serieAtualizada = {
        nome: 'serie atualizada',
        temporada: "S4",
        episodio: "E5",
        duracaoEpisodio: '150 minutos',
    };
    const response = await request(app)
      .put('/series/1')
      .send(serieAtualizada);
    expect(response.status).toBe(200);
    expect(response.body.nome).toBe(serieAtualizada.nome);
    expect(response.body.duracaoEpisodio).toBe(serieAtualizada.duracaoEpisodio);
  });

  it('Deve retornar 404 se a serie não for encontrada para atualização', async () => {
    const serieAtualizada = {
        nome: 'serie atualizada',
        temporada: "S4",
        episodio: "E5",
        duracaoEpisodio: '150 minutos',
    };

    const response = await request(app)
      .put('/series/999')
      .send(serieAtualizada);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Série não encontrada");
  });
});

// //---------------------------------------------------------------------//
// //PATCH//
describe('Rota PATCH /series/:id', () => {
  it('Deve atualizar parcialmente uma serie existente e retornar os dados atualizados', async () => {
    const serie = {
        id: "1",
        nome: "Serie Antiga",
        temporada: "S3",
        episodio: "E2",
        duracaoEpisodio: "120 min"
    };
    await request(app).post('/series').send(serie);
    const atualizacaoParcial = {
      nome: 'Serie Nova',
    };
    const response = await request(app)
      .patch('/series/1')
      .send(atualizacaoParcial);
    expect(response.status).toBe(200);
    expect(response.body.nome).toBe(atualizacaoParcial.nome);
  });

  it('Deve retornar 404 se a serie não for encontrada para atualização parcial', async () => {
    const atualizacaoParcial = {
      nome: 'Serie Nova',
    };
    const response = await request(app)
      .patch('/series/999')
      .send(atualizacaoParcial);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Série não encontrada");
  });
});

// //---------------------------------------------------------------------//
// //DELETE//
describe('Rota DELETE /series/:id', () => {
  it('Deve retornar 204 se a serie for excluída com sucesso', async () => {
    const serie = {
        id: "1",
        nome: "Serie de Teste",
        temporada: "S5",
        episodio: "E2",
        duracaoEpisodio: "120 minutos"
    };
    await request(app).post('/series').send(serie);
    const response = await request(app).delete('/series/1');
    expect(response.status).toBe(204);
  });
});
