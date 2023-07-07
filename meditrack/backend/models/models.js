const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // array of patients
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true},
    weight: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
})

const patientSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true},
    weight: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
})


module.exports = mongoose.model('User', userSchema)
