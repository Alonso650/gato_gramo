import express from 'express';
import cors from 'cors';
//import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import sql from 'postgres';

const pool = require("./db");

//import pool from './db.js';

 
const app = express();
dotenv.config();

// Using this sends images and they can be large also
// or a limit size of 30mb
app.use(express.json({ limit: "30mb", extended: true}));
app.use(express.urlencoded({ limit: "30mb", extended: true}));

// middleware
app.use(cors());

app.listen(5000, () =>{
    console.log("server has started on port 5000");
});

// Setting up the database connection to mongodb
/*
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    // returns a promise
    .then(() => app.listen(PORT, () => console.log(`Server started, running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
*/

// setting up the database connection using PostgreSQL


