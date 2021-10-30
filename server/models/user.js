import mongoose from 'mongoose';

// creating the schema for the users
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    userPicture: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,

});

const createUser = mongoose.model('createUser', userSchema);

export default createUser;