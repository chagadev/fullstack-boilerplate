const fs = require('fs');
const path = require('path');

module.exports.hello = fs.readFileSync(path.join(__dirname, 'hello.gql'), 'utf8');
module.exports.user = fs.readFileSync(path.join(__dirname, 'user.gql'), 'utf8');
module.exports.users = fs.readFileSync(path.join(__dirname, 'users.gql'), 'utf8');
