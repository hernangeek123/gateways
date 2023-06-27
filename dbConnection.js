const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';
let db;

module.exports = {
  connectToDB: async () => {
    try {
      const client = await MongoClient.connect(url);
      db = client.db(dbName);
      console.log('Successfully connected to MongoDB');
    } catch (err) {
      console.log('Failed to connect to MongoDB:', err);
    }
  },
  getDB: () => db
};