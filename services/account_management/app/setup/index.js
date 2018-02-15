const userModel = require('@models/users');
const dbConnection = require('@dataAccess/db_connection');

const models = {
	db: new dbConnection().Connect(),
    User: userModel()
}

module.exports = models;
