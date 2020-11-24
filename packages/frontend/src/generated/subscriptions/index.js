const fs = require('fs');
const path = require('path');

module.exports.ping = fs.readFileSync(path.join(__dirname, 'ping.gql'), 'utf8');
