const api = {};

const patientRepo = require('@dataAccess/patient_repository');
const medproRepo = require('@dataAccess/medical_professional_repository');
const adminRepo = require('@dataAccess/system_admin_repository');

const Patient = require('@models/patient');

api.registerPatient = (User, db) => (req, res) => {
    // POST
    // registration
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const diagnosis = req.body.diagnosis;
    const username = req.body.username;
    const password = req.body.password;
    const securityQ1 = req.body.securityQ1;
    const securityA1 = req.body.securityA1;
    const securityQ2 = req.body.securityQ2;
    const securityA2 = req.body.securityA2;
    const securityQ3 = req.body.securityQ3;
    const securityA3 = req.body.securityA3;
    
    var newPatient = new Patient(firstName, lastName, diagnosis, username, password, securityQ1, securityA1, securityQ2, securityA2, securityQ3, securityA3);
    db.then(database => {
        new patientRepo(database).Create(newPatient);
        res.json({success: true});
    });
}


module.exports = api;