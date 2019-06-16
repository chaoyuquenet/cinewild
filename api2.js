const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();



app.get('/', (request, result) => {
  console.log(request.query.nom);
  result.send(`Hello ${request.query.nom}!`);
});

app.post('/', (request, result) => {

});

app.delete('/', (request, result) => {

});

app.put('/', (request, result) => {

});

app.listen(4000, () => {
  console.log('Ok !');
});