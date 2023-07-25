/* eslint-disable no-unused-vars */
const { Medication, Patient, User } = require('../models/models');

const medicationController = {
    // Create a new medication in the database
    async createMedication(req, res, next) {
        const { name, dosage, frequency, directions, sideEffects } = req.body;
        if (!name || !dosage || !frequency || !directions)
            return res.status(400).json({ error: 'Did not receive all the information'});

        Medication.findOne({ name: name })
        .then((Medication)=>{
            if (Medication) {
            res.status(400)
            // throw new Error('Medication already exists')
            return next('Medication already exists');
            } else {
                const newMedication = new Medication({
                    name,
                    dosage,
                    frequency,
                    directions,
                    });

                newMedication.save()
                .then(() => {
                    res.status(200).json(newMedication);
                })
                .catch((err) => {
                    return res.status(400).json({error: 'failed to create new Medication   ' + err});
                });
            }
        })
    },
    async addMedication(req,res,next){
        //deconstruct body
        const {patientId, name, dosage, frequency, directions} = req.body;
        const _id = req.cookies._id;
        try{

          const doc = await User.findOne({"_id" : _id});
          //iterate through moatients until we find the right one
          for(let i = 0; i < doc.patients.length; i++){
            if(patientId === doc.patients[i]._id.toString()){
                // console.log("foundPatient")
                doc.patients[i].medications.push({
                  "name" : name,
                  "dosage" : dosage,
                  "frequency" : frequency,
                  "directions" : directions
                });
            }
          }

          
          await doc.save();
          return next();
        }catch(err){
          return next({err : `Error creating a new medication, ${err}`});
        }

    },
    async addMedicationLog(req,res,next){
        //deconstruct body
        const {patientId,medication, date, notes} = req.body;
        const _id = req.cookies._id;
        try{
          const doc = await User.findOne({"_id" : _id});
          //iterate through moatients until we find the right one
          for(let i = 0; i < doc.patients.length; i++){
            if(patientId === doc.patients[i]._id.toString()){
                // console.log("foundPatient")
                doc.patients[i].medicationLog.push({
                  "medication" : medication,
                  "date" : date,
                  "notes" : notes
                });
            }
          }

          
          await doc.save();
          return next();
        }catch(err){
          return next({err : `Error creating a new medication, ${err}`});
        }

    },
    async addMedicationSchedule(req, res, next){
      console.log("In med controller")
        const{patientId, medication, dosage, frequency, numDoses, startDate} = req.body;
        const startDateFormatted = Date.parse(startDate);
        console.log(startDateFormatted)
        console.log(patientId, medication, dosage, frequency, numDoses, startDate)
        //function to generate a list of dates
        function  generateDateArray(startDate, numDoses, frequency){
            // input : 
                  // startDate - when first date is to be taken
                  // numDoses - the total number of doses
                  // frequency - how often to take medicine in hours
            //output
                  //an array containing date objects for future
              const datesArr = [];
              const year = startDate.getUTCFullYear();
              const month = startDate.getUTCMonth();
              const day = startDate.getUTCDay();
              const hours = startDate.getUTCHours();
              const minutes = startDate.getUTCMinutes();
              const seconds = startDate.getUTCMilliseconds();
              const ms = startDate.getUTCMinutes();
              let inc = 0;//add frequency to this before the end of each loop
              for(let i = 0; i <  numDoses; i++){
                datesArr.push(new Date(year, month,day, inc, minutes, seconds, ms))
                inc += frequency;
              }
              
              return datesArr;
            }

        
        try{
            //push on to patient array
            //Access this array by futureIntake Schema
            //User -> Patient -> medSchedule
              //{
                // medication: {type : String, require : false},
                // dates : { type: [Date], required : true },
              // }

            //Get _id from cookie
            //invoke generateDateArray and save
            //create an object witht he following format
            /*
              ex
                {
                  medication : 'Motrin',
                  dates : [
                    date1,
                    date2,
                    date3
                  ]
                }
            */
              const arr = generateDateArray(startDateFormatted, numDoses, frequency);
              console.log(arr)
              res.locals.obj = {
                medication: medication,
                dates : arr
              }
            return next();
        }catch(err){
            return next({err : `Error creating a new medication, ${err}`});
        }
    }
};

module.exports = { medicationController }
