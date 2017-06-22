'use strict';

const http = require('http');

const router = require('./lib/router.js');

module.exports = http.createServer((req, res) => {
  console.log(req, res);
});
// router.route(req, res);
