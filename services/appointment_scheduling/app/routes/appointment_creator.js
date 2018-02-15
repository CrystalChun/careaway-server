const config = require('@appointmentConfig');
module.exports = (app) => {
    const api = app.appointment_scheduling.app.api.appointment_creator;
    app.route(config.routes.create).post(api.create());
}