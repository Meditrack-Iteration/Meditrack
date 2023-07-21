const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const SALT_WORK_FACTOR = 10;


const doctorSchema = new mongoose.Schema({
    name: { type: String, require: true },
    hoursAvailable: { type: Array, require: true }
});

const Doctor = mongoose.model('doctor', doctorSchema);

const futureIntakeSchema = new mongoose.Schema({
    medication: { type: Schema.Types.ObjectId, ref: 'medication' },
    dates: { type: [Date], required: true },
});

const FutureIntake = mongoose.model('futureIntake', futureIntakeSchema);

const medicationLogSchema = new mongoose.Schema({
    medication: { type: Schema.Types.ObjectId, ref: 'medication' },
    date: { type: Date, required: true },
    notes: { type: String, required: false }
});

const MedicationLog = mongoose.model('medicationLog', medicationLogSchema);

const medicationSchema = new Schema({
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    directions: { type: String, required: true },
    sideEffects: { type: String, required: false }, // stretch feature: fetch side effects from api
});

const Medication = mongoose.model('medication', medicationSchema);

const patientSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    medications: [{ type: Schema.Types.ObjectId, ref: 'medication' }],
    medicationLog: [{ type: Schema.Types.ObjectId, ref: 'medicationLog' }],
    futureIntake: { type: Schema.Types.ObjectId, ref: 'futureIntake' }
});

const Patient = mongoose.model('patient', patientSchema);

const userSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },
    patients: [{ type: Schema.Types.ObjectId, ref: 'patient' }]
});

const User = mongoose.model('user', userSchema);

userSchema.pre('save', async function(next) {
    const user = this;
  
    if (!user.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
  
      return next();
    } catch (err) {
      return next(err);
    }
  })

userSchema.statics.comparePassword = async function(password, hashedPassword) {
  try{
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (err) {
    console.log(err);
  }
};


module.exports = {
    Medication,
    Patient,
    User,
    MedicationLog,
    FutureIntake,
    Doctor
}
