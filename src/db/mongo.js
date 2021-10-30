const {MongoMemoryServer} = require('mongodb-memory-server');
const {MongoClient} = require('mongodb');

let database = null;
var db = "mongodb://localhost:27017/fitness";
async function startDatabase() {
  const mongo = new MongoMemoryServer();
//   const mongoDBURL = await mongo.getConnectionString();
  const connection = await MongoClient.connect(db, {useNewUrlParser: true});
  database = connection.db();
}

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = {
  getDatabase,
  startDatabase,
};