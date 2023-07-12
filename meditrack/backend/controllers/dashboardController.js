const { Medication, Patient, User } = require('../models/models');

// create post method to create a patient
// create put method to update  a patient in a user
const dashboardController = {

    async createPatient(req, res, next) {
        const { firstName, lastName, age, weight } = req.body;
        if (!firstName || !lastName || !age || !weight)
          return res.status(400).json({ error: 'Please input all information required'});

        const newPatient = new Patient({
          firstName,
          lastName,
          age,
          weight,
        });

        Patient.findOne({ firstName: firstName })
        .then((Patient) => {
          if (Patient) {
            res.status(400)
            // throw new Error('Patient already exists')
            return next('Patient already exists');
          }
            // console.log("Result :", Patient);
        })

        newPatient.save()
          .then(() => {
            res.status(200).json(newPatient);
          })
          .catch((err) => {
            return res.status(400).json({error: 'failed to create new Patient   ' + err});
          });
      },

    async getPatient(req, res, next) {
        const { firstName } = req.params;
        Patient.findOne({ firstName: firstName }) //include lastName her also?
        .then((Patient) => {
          if  (!Patient)
            return res.status(400).json({ error: 'Error in PatientModel.getPatient: Could not find Patient'});
          console.log("Couldn't find patient!")
          res.send(Patient)
        })
        .catch((err) => {
          return next(err)
        })
    },

    async deletePatient(req, res, next) {
      const { firstName } = req.params;
      const data = await Patient.deleteOne({ firstName: firstName}); // returns {deletedCount: 1}
      console.log(data)
      if (data.deletedCount === 0) return next(400);
      if (data) return next();
    },
};

module.exports = { dashboardController }
