module.exports = {
    database: {
        host: 'mongodb',
        port: 27017,
        dbName: 'users'
    },
    routes: {
        registerPatient: '/account/api/registration/patient',
        login: '/account/api/authentication',
        resetCreds: '/account/api/reset-creds',
        updateDiagnosis: '/account/api/update-diagnosis'
    },
    server: {
        port: 4100
    }
}