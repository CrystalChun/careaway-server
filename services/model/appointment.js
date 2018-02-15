var patient = require('./patient');
var mp = require('./medicalprofessional');

function Appointment(patient, medicalprofessional, date, initiator, status) {
    patient.username = patient;
    medicalprofessional.username = medicalprofessional

    this.patient = patient.username;
    this.medicalprofessional = medicalprofessional.username;
    this.date = date;
    // the initiator will be the individual who requested the appointment
    this.initiator = initiator;
    // status of the appointment (pending, accepting, declined)
    this.status = status;
}

module.exports = Appointment;