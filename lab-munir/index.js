'use strict';

const server = require('./lib/server.js');

// module.exports = () => {
// };
server.listen(3000, () => {
  console.log('server up on port 3000');
});
