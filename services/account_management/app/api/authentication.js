const api = {};

const patientRepo = require('@dataAccess/patient_repository');
const medproRepo = require('@dataAccess/medical_professional_repository');
const adminRepo = require('@dataAccess/system_admin_repository');

const Patient = require('@models/patient');

api.login = (User, db) => (req, res) => {
    // POST
    // auth user credentials
    // for now it only works with patient
    // TODO also do medical professional
    const username = req.body.username;
    const password = req.body.password;

    db.then(database => {
        new patientRepo(database).GetOne(req.body.username).then(result => {
            console.log(result);
            if (result.length == 0) {
                res.json({error: 'User not found.'});
            } else {
                const userPass = result[0].password;
                if (password === userPass) {
                    res.json({success: true});
                } else {
                    res.json({error: 'Wrong password.'})
                }
            }
        });
    });
}

// might need validation for security questions

api.resetCreds = (User, db) => (req, res) => {
    // PUT
    // update credentials   
}

api.getPatients = (User, db) => (req, res) => {
    db.then(database => {
        new patientRepo(database).GetAll().then(result => {
            console.log(result);
            res.json({success: true, result: result});
        });
    });
}


module.exports = api;