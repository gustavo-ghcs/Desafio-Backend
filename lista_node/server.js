const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
app.use(bodyParser.json());

//---------------------------------------------------------------------//
//Agora para os filmes//

let filmes = [];

app.get('/filmes', (req, res) => {
  res.json(filmes);
});

app.get('/filmes/:id', (req, res) => {
  const filmeId = req.params.id;
  const filme = filmes.find(filme => filme.id === filmeId);
  if (!filme) {
    res.status(404).json({ error: 'Filme não encontrado' });
  } else {
    res.json(filme);
  }
});

app.post('/filmes', (req, res) => {
  const novoFilme = {
    id: req.body.id,
    nome: req.body.nome,
    duracao: req.body.duracao
  };
  filmes.push(novoFilme);
  res.status(201).json(novoFilme);
});

app.put('/filmes/:id', (req, res) => {
  const filmeId = req.params.id;
  const filmeIndex = filmes.findIndex(filme => filme.id === filmeId);
  if (filmeIndex === -1) {
    res.status(404).json({ error: 'Filme não encontrado' });
  } else {
    filmes[filmeIndex] = {
      id: filmeId,
      nome: req.body.nome,
      duracao: req.body.duracao
    };
    res.json(filmes[filmeIndex]);
  }
});


app.patch('/filmes/:id', (req, res) => {
  const filmeId = req.params.id;
  const filmeIndex = filmes.findIndex(filme => filme.id === filmeId);
  if (filmeIndex === -1) {
    res.status(404).json({ error: 'Filme não encontrado' });
  } else {
    filmes[filmeIndex] = { ...filmes[filmeIndex], ...req.body };
    res.json(filmes[filmeIndex]);
  }
});

app.delete('/filmes/:id', (req, res) => {
  const filmeId = req.params.id;
  filmes = filmes.filter(filme => filme.id !== filmeId);
  res.status(204).end();
});

//---------------------------------------------------------------------//
//Séries//
let series = [];

app.get('/series', (req, res) => {
  res.json(series);
});

app.get('/series/:id', (req, res) => {
  const serieId = req.params.id;
  const serie = series.find(serie => serie.id === serieId);
  if (!serie) {
    res.status(404).json({ error: 'Série não encontrada' });
  } else {
    res.json(serie);
  }
});

app.post('/series', (req, res) => {
  const novaSerie = {
    id: req.body.id,
    nome: req.body.nome,
    temporada: req.body.temporada,
    episodio: req.body.episodio,
    duracaoEpisodio: req.body.duracaoEpisodio
  };
  series.push(novaSerie);
  res.status(201).json(novaSerie);
});

app.put('/series/:id', (req, res) => {
  const serieId = req.params.id;
  const serieIndex = series.findIndex(serie => serie.id === serieId);
  if (serieIndex === -1
    ) {
    res.status(404).json({ error: 'Série não encontrada' });
  } else {
    series[serieIndex] = {
      id: serieId,
      nome: req.body.nome,
      temporada: req.body.temporada,
      episodio: req.body.episodio,
      duracaoEpisodio: req.body.duracaoEpisodio
    };
    res.json(series[serieIndex]);
  }
});

app.patch('/series/:id', (req, res) => {
  const serieId = req.params.id;
  const serieIndex = series.findIndex(serie => serie.id === serieId);
  if (serieIndex === -1) {
    res.status(404).json({ error: 'Série não encontrada' });
  } else {
    series[serieIndex] = { ...series[serieIndex], ...req.body };
    res.json(series[serieIndex]);
  }
});

app.delete('/series/:id', (req, res) => {
  const serieId = req.params.id;
  series = series.filter(serie => serie.id !== serieId);
  res.status(204).end();
});

module.exports = app;

//---------------------------------------------------------------------//

// app.listen(PORT, () => {
//   console.log(`Servidor está rodando na porta - ${PORT}`);
// });