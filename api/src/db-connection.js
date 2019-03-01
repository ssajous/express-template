'use strict';

const mongoose = require('mongoose');

connect(mongoose);

const db = mongoose.connection;
wireConnectionEvents(db);

function wireConnectionEvents(connection) {
  connection.on('error', () => {
    console.error.bind(console, 'mongo connection error');
  });
  
  connection.once('open', () => {
    console.log('Mongo connection open!');
  });

  connection.on('disconnected', () => {
    console.log('Disconnected from mongo');
  });
} 

function connect(database) {
  database.connect(`mongodb://${process.env.MONGO_URL}/${process.env.DATABASE_NAME}?user=${process.env.MONGO_USER}&pass=${process.env.MONGO_PASS}`);
  console.log('Connecting to MONGO');
}

module.exports = db;