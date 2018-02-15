const config = require('@treatmentConfig');
module.exports = (app) => {
    const api = app.treatment_management.app.api.treatment_creator;
    app.route(config.routes.create).post(api.create());
}