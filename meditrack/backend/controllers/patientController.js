/* eslint-disable no-unused-vars */
const { Medication, Patient, User } = require('../models/models');

// create post method to create a patient
// create put method to update  a patient in a user
const patientController = {

    async createPatient(req, res, next) {
        console.log(req.body);
        const { update, email } = req.body;
        console.log('entered create patient')  
        //add try -catch for error handling JB
        try{
          await User.findOneAndUpdate(
              {email: email },
               {patients: update} ,
              { new: true })
            return next();
        }
        catch(err){
          return next({err : `Error creating a new patient, ${err}`});
        }
           
          
      },

      async addPatient(req, res, next){

        // const id = req.cookies._id;

        //deconstruct body
        const {firstName, lastName, age, weight} = req.body;//remove _id once sessions are set up
        
        console.log("Attemping to add a patient")
        console.log(req.cookies)
        //alter user.patientArray to
        try{
          const _id = req.cookies._id;
          console.log("ID : ", _id)
          const user = await User.findOneAndUpdate(
          {'_id' : _id },
          {$push : {patients: {"firstName":firstName, "lastName":lastName, "age":age, "weight":weight}}}
          )
          console.log(user);
          // await user.patients.push({
          //   firstName,
          //   lastName,
          //   weight,
          //   age
          // })
          next();
        }catch(err){
            return next({'error':'error'})
        }
      }

    // async getPatient(req, res, next) {
    //     const { firstName } = req.params;
    //     Patient.findOne({ firstName: firstName }) //include lastName here also?
    //     .then((Patient) => {
    //       if  (!Patient)
    //         return res.status(400).json({ error: 'Error in PatientModel.getPatient: Could not find Patient'});
    //       console.log("Couldn't find patient!")
    //       res.locals.Patient = Patient
    //       next()    
    //     })
    //     .catch((err) => {
    //       return next({err : `Error getting patient, ${err}`})
    //     })
    // },

    // async deletePatient(req, res, next) {
    //   const { firstName } = req.params;
    //   const data = await Patient.deleteOne({ firstName: firstName}); // returns {deletedCount: 1}
    //   console.log(data)
    //   if (data.deletedCount === 0) return next(400);
    //   if (data) return next();
    // },
};

module.exports = { patientController }
