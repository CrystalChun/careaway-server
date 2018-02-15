module.exports = {
    database: {
        host: 'mongodb',
        port: 27017,
        dbName: 'users'
    },
    routes: {
        login: '/account/api/authentication',
        register: '/account/api/registration'
    },
    server: {
        port: 4100
    }
}