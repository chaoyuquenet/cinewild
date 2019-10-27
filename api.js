// const { MongoClient, ObjectId } = require('mongodb');
const { Pool, Client } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const cors = require('cors');

const password = require('./password-file');

const { joinPropertyReducer, flattenById } = require('./dataUtils');

const availableLanguages = ['en', 'cn', 'fr'];

let pool;

try {
  pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cinewild',
    password,
    port: 5432
  });
} catch (err) {
  console.log('Error while connecting to Cinewild postgresql database : ');
  console.log(err);
}

const client = new Client();
client.connect();

const app = express();

// Fisher-Yates randomize array function
const shuffle = arr => {
  let j, x, i;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Get all movies in inserted order
app.get('/movies', async function(req, res) {
  const allMovies = await pool.query('SELECT * FROM movies');

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(allMovies.rows));
});

// Get properties from all movies
app.get('/movies/properties', async function(req, res) {
  const typesSelect = await pool.query('SELECT * FROM types');

  res.setHeader('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      types: typesSelect.rows.map(type => type.type_names),
      languages: availableLanguages
    })
  );
});

// Get all movies in random order
app.get('/movies/shuffle', async function(req, res) {
  const allMovies = await pool.query('SELECT * FROM movies');

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(shuffle(allMovies.rows).slice(0, 4)));
});

// Get one movie by its ID
app.get('/movies/:id', async function(req, res) {
  const idToGet = req.params.id;

  const movieResult = await pool.query(
    'SELECT id, movie_name, image FROM movies WHERE id=$1',
    [idToGet]
  );

  if (movieResult.rows.length === 0) {
    res.send(404);
  } else {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(movieResult.rows[0]));
  }
});

// Add a new movie
app.post('/movies', async function(req, res) {
  const { title, type, language, image } = req.body;

  const insertMoviesRes = await pool.query(
    'INSERT INTO movies (movie_name, image) VALUES ($1, $2) RETURNING id',
    [title, image]
  );

  const insertedId = insertMoviesRes.rows[0].id;

  await pool.query(
    'INSERT INTO movies_languages (movie_id, language) VALUES ($1, $2)',
    [insertedId, language]
  );

  const chooseFirstType = await pool.query(
    'SELECT id from types WHERE type_name=$1',
    [type]
  );

  let typeId;
  // If no result => Means the type doesn't exist yet, we insert it.
  if (chooseFirstType.rows.length === 0) {
    const insertTypeRes = await pool.query(
      'INSERT INTO types (type_name) VALUES ($1) RETURNING id',
      [type]
    );
    typeId = insertTypeRes.rows[0].id;
  } else {
    typeId = chooseFirstType.rows[0].id;
  }

  await pool.query(
    'INSERT INTO movies_types (movie_id, type_id) VALUES ($1, $2)',
    [insertedId, typeId]
  );

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Location', `http://127.0.0.1:5000/movies/${insertedId}`);

  res.status(201);
  res.send(JSON.stringify({ insertedId }));
});

// Delete movie by its ID
app.delete('/movies/:id', async function(req, res) {
  const idToDelete = req.params.id;

  await pool.query('DELETE FROM movies WHERE id=$1', [idToDelete]);
  await pool.query('DELETE FROM movies_types WHERE movie_id=$1', [idToDelete]);
  await pool.query('DELETE FROM movies_languages WHERE movie_id=$1', [
    idToDelete
  ]);
  res.send(200);
});

// Search Movies, returns name only, for autocomplete purpose
app.post('/movies/autocomplete', async function(req, res) {
  const { title } = req.body;

  const foundMovies = await pool.query(
    `SELECT
      movie_name
    FROM movies
    WHERE
      upper(movie_name) LIKE CONCAT('%', upper($1), '%')`,
    [title]
  );

  console.log(foundMovies);
  res.setHeader('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      result: foundMovies.rows
    })
  );
});

// Search Movie by title or type or language
app.post('/movies/search', async function(req, res) {
  const { title, type, language } = req.body;

  console.log(title);
  const { rows: rawMovies } = await pool.query(
    `
    SELECT
      DISTINCT movies.id,
      movies.movie_name,
      movies.image,
      movies_languages.language,
      types.type_name
    FROM
      movies
      INNER JOIN movies_languages ON movies.id = movies_languages.movie_id
      INNER JOIN movies_types ON movies.id = movies_types.movie_id
      INNER JOIN types ON movies_types.type_id = types.id
    WHERE UPPER(movies.movie_name) LIKE CONCAT('%', UPPER($1::varchar), '%')
      OR types.type_name = $2
      OR movies_languages.language = ANY($3::lang[]);
    `,
    [title, type, language]
  );

  const joinedLanguages = rawMovies.reduce(joinPropertyReducer('language'), {});
  const joinedTypes = rawMovies.reduce(joinPropertyReducer('type_name'), {});

  const aggregatedMovies = Object.values(rawMovies.reduce(flattenById, {}));

  const enrichedMovies = aggregatedMovies.map(movie => ({
    ...movie,
    languages: Object.keys(joinedLanguages[movie.movieId].languages),
    types: Object.keys(joinedTypes[movie.movieId].type_names)
  }));

  res.send(JSON.stringify(enrichedMovies));
});

app.listen(5000, function() {
  console.log('Example app listening on port 5000!');
});
