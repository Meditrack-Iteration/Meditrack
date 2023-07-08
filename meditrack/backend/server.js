const express = require('express');
const dotenv = require('dotenv').config();
const port = 3000;

const app = express();

app.get('/api', (req, res) => {
    res.status(200).json({message: 'Connection made!'})
})

app.post('/api', (req, res) => {
    res.status(200).json({message: 'User created!'})
})

app.put('/api', (req, res) => {
    res.status(200).json({message: 'User updated!'})
})

app.delete('/api', (req, res) => {
    res.status(200).json({message: 'User deleted!'})
})



app.listen(port, () => console.log(`Server running on ${port}`));