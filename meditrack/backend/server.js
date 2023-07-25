const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const dotenv = require('dotenv').config();
const { userController } = require('./controllers/userController')
const { dashboardController } = require('./controllers/dashboardController')
const { medicationController } = require('./controllers/medicationController')
const port = 3000;
const mongoose = require('mongoose');
const { cookieController } = require('./controllers/cookieController');
const { doctorController } = require('./controllers/doctorController');
const client = require('twilio')('AC08ded748a1d1c45ddbc34311218ad235', '35646b7d7c1f32510417fefe5e00412b');

mongoose.connect('mongodb+srv://johnnyb7184:johnnyb7184@medicluster.l6nzmgv.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/api/dashboard', userController.getPatients, (req, res) => {
    res.status(200).json(res.locals.user);
})

app.post('/api/signup', userController.createUser, cookieController.setCookie,  (req, res) => {
  console.log('new user created and saved', res.locals.newUser);
    res.status(200).json(res.locals.newUser);
})
app.post('/api/login/doctor',doctorController.login, cookieController.setDoctorCookie,(req,res)=>{

  res.status(200).json(res.locals.doctor);
})
app.post('/api/signup/doctor',doctorController.signup,cookieController.setDoctorCookie,(req,res)=>{
  console.log('I AM IN SERVER',res.locals.doctor);
  res.status(200).json(res.locals.doctor);
})
app.post('/api/login', userController.getUser, cookieController.setCookie, (req, res) => {
  res.status(200).json(res.locals.user);
})

//login and signup routes for doctor
// app.post('/api/login/doctor',doctorController.login,cookieController.setDoctorCookie,(req,res)=>{
//   res.status(200).json(res.locals.doctor);
// })
// app.post('/api/signup/doctor',doctorController.signup,cookieController.setDoctorCookie,(req,res)=>{
//   res.status(200).json(res.locals.doctor);
// })

//update user
app.put('/api/dashboard/:email', userController.updateUser, (req, res) => {
    res.status(200).json({message: 'User updated!'})
})

app.delete('/api/delete/:email', userController.deleteUser, (req, res) => {
    res.status(200).json({message: 'User deleted!'})
})

//Routes for patient

app.post('/api/dashboard/patient', dashboardController.createPatient, (req, res) => {
  res.status(200).json({message: 'Patient created!'})
})

app.get('/api/dashboard/:firstName', dashboardController.getPatient, (req, res) => {
  res.status(200).json({message: 'Patient created!'})
})

app.delete('/api/dashboard/delete/:firstName', dashboardController.deletePatient, (req, res) => {
  res.status(200).json({message: 'Patient deleted!'})
})


//Vicky:this is the request to get doctorlist
app.get('/api/doctor', doctorController.getAllDoctors, (req, res) => {
  res.status(200).json(res.locals.doclist);
});

// app.post('/api/doctor', userController.createDoctor, (req, res) => {
//   res.status(200).json({message: 'Doctor created!'});
// });

// function sendTextMessage() {
//   client.message.create({
//     body: 'Hello from Node',
//     to: '',
//     from: '+18337581251'
//   }).then(message => console.log(message));
// }


//Routes for medication
// app.post('/api/dashboard/medication', medicationController.createPatient, (req, res) => {
//   res.status(200).json({message: 'Medication created!'})
// })

// app.get('/api/dashboard/:firstName', medicationController.getPatient, (req, res) => {
//   res.status(200).json({message: 'Medication Retrieved!'})
// })

// app.delete('/api/dashboard/delete/:firstName', medicationController.deletePatient, (req, res) => {
//   res.status(200).json({message: 'Medication deleted!'})
// })


app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => console.log(`Server running on ${port}`));


//test git push