import mongoose from 'mongoose';

// creating the schema for the users
const userSchema = mongoose.Schema({
    username: String,
    email: String,
    userPicture: String,
    
})