const mongoose = require('mongoose')
const Schema = mongoose.Schema;


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
    medications: {type: [medicationSchema], required: false}
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
    User
}
