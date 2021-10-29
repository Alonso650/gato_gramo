import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

 
const app = express();
dotenv.config();

// Using this sends images and they can be large also
// or a limit size of 30mb
app.use(express.json({ limit: "30mb", extended: true}));
app.use(express.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

// Setting up the database connection to mongodb
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server started, running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));


