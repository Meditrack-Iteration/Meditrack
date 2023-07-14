const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const futureIntakeSchema = new mongoose.Schema({
    medication: {type : String, require : false},//{ type: mongoose.Schema.Types.ObjectId, ref: 'Medication' },
    dates : { type: [Date], required : true },
    startDate: {type: Date, required: true},
    //get number of doses from user and perform logic on frontend
    //number of doses
    //frequency (ex how many hours between doses)
   })

const FutureIntake = mongoose.model('futureIntake', futureIntakeSchema)



const medicationLogSchema = new mongoose.Schema({
    // userId: { type: String, ref: 'User' },
    medication: {type : String, require : false},//{ type: mongoose.Schema.Types.ObjectId, ref: 'Medication' },
    date: { type: Date, required : true },
    notes: {type: String, required : false}
    // intakeTime: String,
    // taken: { type: Boolean, default: false }
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
    FutureIntake
}
