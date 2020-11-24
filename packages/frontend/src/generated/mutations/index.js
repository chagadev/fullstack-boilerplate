const fs = require('fs');
const path = require('path');

module.exports.deleteOneUser = fs.readFileSync(path.join(__dirname, 'deleteOneUser.gql'), 'utf8');
module.exports.login = fs.readFileSync(path.join(__dirname, 'login.gql'), 'utf8');
module.exports.ping = fs.readFileSync(path.join(__dirname, 'ping.gql'), 'utf8');
module.exports.signup = fs.readFileSync(path.join(__dirname, 'signup.gql'), 'utf8');
