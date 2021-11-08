import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js';
import gramRoutes from './routes/grams.js';

 
const app = express();
dotenv.config();

// Using this sends images and they can be large also
// or a limit size of 30mb
app.use(express.json({ limit: "30mb", extended: true}));
app.use(express.urlencoded({ limit: "30mb", extended: true}));

// middleware
app.use(cors());

app.use('/users', userRoutes);
app.use('/grams', gramRoutes);

app.listen(5000, () =>{
    console.log("server has started on port 5000");
});



