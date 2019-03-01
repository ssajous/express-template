'use strict';

const express = require('express');
const wrap = require('../wrap');
const mongoose = require('mongoose');
const todoSchema = require('../models/todo');

const Todo = mongoose.model('Todo', todoSchema);
const router = express.Router();

router.get('/', wrap(async (req, res) => {
  const todos = await Todo.find({});

  res.send(todos);
}));

router.post('/', wrap(async (req, res) => {
  if (!req.body.name) {
    res.sendStatus(400);
    return;
  }

  res.status(201).send(await new Todo({ name: req.body.name }).save());
}));

router.get('/:id', wrap(async (req, res) => {
  const result = await Todo.findOne({ _id: req.params.id });

  if (result) {
    res.send(result);
  } else {
    res.sendStatus(404);
  }
}));

router.put('/:id', wrap(async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id });
  
  if (!todo) {
    res.send(404);
    return;
  }

  todo.name = req.body.name || todo.name;
  todo.isComplete = req.body.isComplete || todo.isComplete;
  todo.dateUpdated = Date.now();
  
  res.send(await todo.save());
}));

router.delete('/:id', wrap(async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id });
  res.sendStatus(200);
}));

module.exports = router;