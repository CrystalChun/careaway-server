function User (username,password, salt) {
    this.username = username || '';
    this.password = password || '';
    this.salt = salt || '';
}

User.prototype.ResetPassword = function (newpassword) {
    this.password = newpassword;
}

module.exports = User;