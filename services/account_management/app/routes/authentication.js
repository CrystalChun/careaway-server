const config = require('@accountConfig');
module.exports = (app) => {
    const api = app.account_management.app.api.authentication;

    app.route(config.routes.login).post(api.login());
}