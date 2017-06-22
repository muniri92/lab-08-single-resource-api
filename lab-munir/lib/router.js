'use strict';

const request_parse = require('./request_parse.js');

const routes = {
  GET: {},
  PUT: {},
  POST: {},
  DELETE: {},
};

const router = module.exports = {};

router.get = (pathname, callback) => {
  routes.GET[pathname] = callback;
};

router.put = (pathname, callback) => {
  routes.PUT[pathname] = callback;
};

router.post = (pathname, callback) => {
  routes.POST[pathname] = callback;
};

router.delete = (pathname, callback) => {
  routes.DELETE[pathname] = callback;
};

// Main router logic goes here
router.route = (req, res) => {

  // Parse the request
  request_parse(req, (err) => {
    if (err) {
      res.writeHead(400);
      res.end();
      return;
    }

    // Check if there is a callback
    let route = routes[req.method][req.url.pathname];
    // If there is a callback for the request; invoke it
    if (route) {
      route(req, res);
    } else {
      // If no routes were found: 404
      res.writeHead(404);
      res.end();
      return;
    }
  });
};
