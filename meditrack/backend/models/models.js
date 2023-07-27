const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const SALT_WORK_FACTOR = 10;

const appointmentSchema=new Schema({
  patientName:{
      type:String,
      required:true
  },
  appointmentTime:{
      type:Date,
      required:true
  }
});

const Appointment = mongoose.model('appointment', appointmentSchema);

const doctorSchema = new mongoose.Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    availability:{
        monday: {
            type: [
              {
                start: { type: String, default: '9:00 AM' },
                end: { type: String, default: '5:00 PM' },
              },
            ],
            default: () => [{ start: '9:00 AM', end: '5:00 PM' }],
          },
          tuesday: {
            type: [
              {
                start: { type: String, default: '9:00 AM' },
                end: { type: String, default: '5:00 PM' },
              },
            ],
            default: () => [{ start: '9:00 AM', end: '5:00 PM' }],
          },
          wednesday: {
            type: [
              {
                start: { type: String, default: '9:00 AM' },
                end: { type: String, default: '5:00 PM' },
              },
            ],
            default: () => [{ start: '9:00 AM', end: '5:00 PM' }],
          },
          thursdauy: {
            type: [
              {
                start: { type: String, default: '9:00 AM' },
                end: { type: String, default: '5:00 PM' },
              },
            ],
            default: () => [{ start: '9:00 AM', end: '5:00 PM' }],
          },
          friday: {
            type: [
              {
                start: { type: String, default: '9:00 AM' },
                end: { type: String, default: '5:00 PM' },
              },
            ],
            default: () => [{ start: '9:00 AM', end: '5:00 PM' }],
          },
        },
        appointments: [appointmentSchema],
      });


const Doctor = mongoose.model('doctor', doctorSchema);

const medScheduleSchema = new mongoose.Schema({
    medication: {type : String, require : false},
    dates : { type: [Date], required : true },
    //startDate: {type: Date, required: true}
   })
  
  const MedSchedule = mongoose.model('medSchedule', medScheduleSchema)


const medicationLogSchema = new mongoose.Schema({
    medication: {type : String, require : false},
    date: { type: Date, required : true },
    notes: {type: String, required : false}
   })

const MedicationLog = mongoose.model('medicationLog', medicationLogSchema)

const medicationSchema = new Schema({
    name: {type: String, required: true},
    dosage: {type: String, required: true},
    frequency: {type: String, required: true},
    directions: {type: String, required: true},
    sideEffects: {type: String, required: false}, // stretch feature: fetch side effects from api

})

const Medication = mongoose.model('medication', medicationSchema)

const patientSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true},
    weight: {type: Number, required: true},
    medications: {type: [medicationSchema], required: false},
    medicationLog : {type: [medicationLogSchema], required : false},
    medSchedule : {type: [medScheduleSchema], required: false} 
})

const Patient = mongoose.model('patient', patientSchema)

const userSchema = new Schema({
    // array of patients
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    // age: {type: Number, required: true},
    // weight: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    patients: {type: [patientSchema], required: false}
})

const User = mongoose.model('user', userSchema)



module.exports = {
    Medication,
    Patient,
    User,
    MedicationLog,
    Appointment,
    // FutureIntake,
    Doctor,
    MedSchedule
}
