const express = require('express');
// const dotenv = require('dotenv').config();
const { loginController } = require('./controllers/controller')
const port = 3000;
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://seandromine:z0JRqCLk6zWekT9n@medicluster.94paoel.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get('/dashboard/:email', loginController.getPatient, (req, res) => {
//     res.status(200).json({message: 'Here is your patient!'})
// })

app.post('/signup', loginController.createUser, (req, res) => {
    res.status(200).json({message: 'User created!'})
})

app.post('/login', loginController.getUser, (req, res) => {
  res.status(200).json({message: 'Logged In!'})
})

app.put('/dashboard/:email',  (req, res) => {
    res.status(200).json({message: 'User updated!'})
})

app.delete('/delete/:email', loginController.deleteUser, (req, res) => {
    res.status(200).json({message: 'User deleted!'})
})

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
