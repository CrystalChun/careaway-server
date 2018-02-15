var user = require('./users');
var security = require('./security');

function SystemAdmin (username, password, salt) {
    user.username = username;
    user.password = password;
    user.salt = salt;

    this.username = user.username || '';
    this.password = user.password || '';
    this.salt = user.salt || '';
}

SystemAdmin.prototype = Object.create(user.prototype);

module.exports = SystemAdmin;