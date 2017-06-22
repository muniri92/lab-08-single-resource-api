'use strict';

const http = require('http');
const uuid = require('uuid');

const router = require('./router.js');
const model = require('./model.js');

//// Register routes with router
// GET REQUEST
router.get('/api/notes', (req, res) => {
  if (!req.url.query.id) {
    res.writeHead(400);
    res.end();
    return;
  }

  if (!model[req.url.query.id]) {
    res.writeHead(404);
    res.end();
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.write(JSON.stringify(model[req.url.query.id]));
  res.end();
});

// POST REQUEST
router.post('/api/notes', (req, res) => {
  // logic for POST
  if (!req.body.name) {
    res.writeHead(400);
    res.end();
    return;
  }
  // uuid will generate a randome sting that will not conflict with a future random string
  let note = {
    id: uuid.v1(),
    name: req.body.name,
    date: new Date().toDateString(),
  };
  model[note.id] = note;

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(note));
  res.end();
  return;
});

// DELETE REQUEST
router.delete('/api/notes', (req, res) => {
  if (!req.url.query.id) {
    res.writeHead(400);
    res.end();
    return;
  }
  if (!model[req.url.query.id]) {
    res.writeHead(404);
    res.end();
    return;
  }
  // delete from memory storage
  delete model[req.url.query.id];

  res.writeHead(204);
  res.end();
  return;
});

// PUT REQUEST
router.put('/api/notes', (req, res) => {
  if (!req.url.query.id) {
    res.writeHead(400);
    res.end();
    return;
  }
  if (!model[req.url.query.id]) {
    res.writeHead(404);
    res.end();
    return;
  }

  let note = {
    id: req.url.query.id,
    name: req.body.name,
    date: new Date().toDateString(),
  };

  model[req.url.query.id] = note;

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.write(JSON.stringify(note));
  res.end();
  return;
});

//
router.get('/api/simple-resource-name', (req, res) => {
  if (Object.keys(model).length === 0) {
    res.writeHead(404);
    res.end();
    return;
  }

  res.writeHead(200);
  res.write(Object.keys(model).toString());
  res.end();
  return;
});

module.exports = http.createServer(router.route);
