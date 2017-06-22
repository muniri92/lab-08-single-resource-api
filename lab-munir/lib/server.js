'use strict';

const http = require('http');
const uuid = require('uuid');

const router = require('./router.js');
const model = require('./model.js');

// router.get('/api/notes', (req, res) => {
//   if (!req.url.query.id) {
//     res.writeHead(400);
//     res.end();
//     return;
//   }
//
//   if (!model[req.url.query.id]) {
//     res.writeHead(404);
//     res.end();
//     return;
//   }
//
//   res.writeHead(200, {
//     'Content-Type': 'application/json',
//   });
//
//   res.write(JSON.stringify(model[req.url.query.id]));
//   res.end();
// });

// register routes with router
router.post('/api/notes', (req, res) => {
  console.log('hit /api/notes');

  // logic for POST
  if (!req.body.content) {
    res.writeHead(400);
    res.end();
    return;
  }
  // uuid will generate a randome sting that will not conflict with a future random string
  let note = {
    id: uuid.v1(),
    content: req.body.content,
  };
  model[note.id] = note;
  console.log('STORAGE: ', model);
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(note));
  res.end;
  return;
});

module.exports = http.createServer(router.route);
// router.route(req, res);
