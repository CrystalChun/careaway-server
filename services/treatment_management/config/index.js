module.exports = {
  database: {
    host: 'mongodb',
    port: 27017,
    dbName: 'users'
  },
  routes: {
    create: '/treatment_plan/api/create',
    update: '/treatment_plan/api/edit',
    returnCode: '/treatment_plan/api/returnCode',
    getDiagnoses: '/treatment_plan/api/getDiagnoses',
    getTreatmentmeter: '/treatment_plan/api/getTreatmentmeter',
    getTreatmentchecklist: '/treatment_plan/api/getTreatmentchecklist'
    breach: '/breach',
  },
  server: {
    port: 4400
  }
}