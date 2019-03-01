'use strict';

const express = require('express');
require('./db-connection');
const todoRoute = require('./routes/todo');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.json());

app.use('/todos', todoRoute);

// general error handler
app.use(function(error, req, res) {
  console.log(error);
  res.status(500).send('An error has occurred');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);