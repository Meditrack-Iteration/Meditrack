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
      async addPatient(req,res,next){
        const {firstName, lastName, age, weight} = req.body;
        const _id = req.cookies._id;
        try{

          const doc = await User.findOne({"_id" : _id});
          doc.patients.push({
                  "firstName" : firstName, 
                  "lastName" : lastName,
                  "age" : age,
                   "weight" : weight
                });
          await doc.save();
          return next();
        }catch(err){
          return next({err : `Error creating a new patient, ${err}`});
        }


      },
      async removePatient(req,res,next){
        const {patientId} = req.body;
        const _id = req.cookies._id;
        try{
          //get user into doc
          const doc = await User.findOne({"_id" : _id});
          //remove patient from doc
          doc.patients.pull({"_id": patientId});
          await doc.save();
          return next();
        }catch(err){
          return next({err : `Error creating a new patient, ${err}`});
        }
      }
};

module.exports = { patientController }
