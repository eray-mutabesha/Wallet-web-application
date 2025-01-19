const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const pathe = require('path');
// const port = 3000
const router = require('./routes/Index');



// CORS options
var corsOption = {
    origin: 'https://walletwebapplication.nguvutech.com',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
 };


// Middlewares
app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

//front end folder alread build
const path = __dirname + "/dist/";
app.use(express.static(path));




// base route 
app.use('/api', router);
app.get('/', (req, res) => {
    res.send('Hello World!');
});



// redirect routes to index.html
app.get('*', (req, res) => {
    if (!req.originalUrl.includes('/api')) {
        res.sendFile(pathe.join(__dirname, 'dist', 'index.html'));
    }
});

// runing the server
app.listen(() => {
    console.log(`Exemple app listening in production mode on online server`);
});
