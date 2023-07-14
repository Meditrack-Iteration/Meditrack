const express = require('express');
// const dotenv = require('dotenv').config();
const { userController } = require('./controllers/userController')
const { dashboardController } = require('./controllers/dashboardController')
const { medicationController } = require('./controllers/medicationController')
const port = 3000;
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://seandromine:z0JRqCLk6zWekT9n@medicluster.94paoel.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/dashboard/:email', userController.getPatients, (req, res) => {
    res.status(200).json(res.locals.user);
})

app.post('/api/signup', userController.createUser, (req, res) => {
  console.log('attempted to create user');
    res.status(200).json(res.locals.newUser);
})

app.post('/api/login', userController.getUser, (req, res) => {
  res.status(200).json(res.locals.user);
})

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
