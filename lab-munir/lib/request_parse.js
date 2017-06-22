'use strict';

const url = require('url');
const querystring = require('querystring');

module.exports = (req, callback) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  // Check if it's a request method 'POST' (create) or 'PUT' (update)
  if (req.method === 'POST' || req.method === 'PUT') {

    // Get the entire message string and store in text
    let text = '';
    req.on('data', (buffer) => {
      text += buffer.toString();
    });

    // Set the given text to req.text
    req.on('end', (err) => {
      req.text = text;

      // This will make it so that we can only except JSON data
      try {
        req.body = JSON.parse(text);
        callback(null);
      } catch (e) {
        callback(err);
      }
    });

    req.on('error', (err) => {
      req.body = {};
      req.text = '';
      callback(err);
    });

  } else {
    // If we make it here then it was neither a 'PUT' or 'POST' request
    req.text = '';
    req.body = {};
    callback(null);
  }
};
