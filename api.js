const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

const connexionString = 'mongodb://chao.quenet:cinewild42@ds145412.mlab.com:45412/cinewild';
const connexionString = null;

const dbName = 'cinewild';

let dbHandler;

if (connexionString === null) {
  throw 'Please update connexionString parameter'
}
MongoClient.connect(connexionString, function (err, client) {

  dbHandler = client.db(dbName);
  console.log('Connecté à mongodb...');
});

const app = express();

// Fisher-Yates randomize array function
const shuffle = (arr) => {
  let j, x, i;
  for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = arr[i];
      arr[i] = arr[j];
      arr[j] = x;
  }
  return arr;
}


app.use(bodyParser.urlencoded({ extended: false})); 
app.use(bodyParser.json());

// Get all movies in inserted order
app.get('/movies', async function (req, res) {
  const allMovies = await dbHandler.collection('movies').find({}).toArray();

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(allMovies));
});

// Get all movies in random order
app.get('/movies/shuffle', async function (req, res) {
  const allMovies = await dbHandler.collection('movies').find({}).toArray();

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(shuffle(allMovies)));
});

// Get one movie by its ID
app.get('/movies/:id', async function (req, res) {
  const idToGet = req.params.id;
  const oneMovie = await dbHandler.collection('movies').findOne({_id: ObjectId(idToGet)});

  res.send(oneMovie);
});

// Add a new movie
app.post('/movies', async function (req, res) {
  const { title, type, language } = req.body;

  const resultInsert = await dbHandler.collection('movies').insertOne({ title, type, language });
  res.send({ok: resultInsert.ok});
});

// Delete movie by its ID
app.delete('/movies/:id', async function (req, res) {
  const idToDelete = req.params.id;

  const resultDelete = await dbHandler.collection('movies').deleteOne({_id: ObjectId(idToDelete)});
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ok: resultDelete.ok}));

});

// Search Movie by title or type or language
app.post('/movies/search', async function (req, res) {
  const { title, type, language } = req.body;

  const resultSearch = await dbHandler.collection('movies').find({ title: new RegExp(title, 'i'), language, type }).toArray();
  res.send(resultSearch);
});

// Search Movies, returns name only, for autocomplete purpose
app.post('/movies/autocomplete', async function (req, res) {
  const { title } = req.body;

  console.log(title);
  const resultSearch = await dbHandler.collection('movies').find({ title: new RegExp(title, 'i') }).toArray();
  res.send(resultSearch.map(obj => obj.title));
});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
});
