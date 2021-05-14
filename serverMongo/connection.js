const { MongoClient } = require('mongodb');

// Nombre de bd
const dbName = 'testdb';
// Conexión URL (estas corriendo en local :D)
const url = 'mongodb://35.229.87.37:27017';

const client = new MongoClient(url, {
  useUnifiedTopology: true
});

module.exports = async () => {
  // Conectamos al servidor
  await client.connect();

  return client.db(dbName); // retornamos la conexión con el nombre de la bd a usar
};