const fs = require('fs');

const write = function write(filename, text) {
  fs.appendFileSync(filename, text, 'utf8', {flag: 'a+'});
};

module.exports = write;