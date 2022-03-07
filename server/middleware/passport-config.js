const LocalStrategy = require('passport-local').Strategy
const bcrypt = require("bcryptjs");

//function initialize(passport, getUserByUsername, getUserById){
initializePassport = (passport, getUserByUsername, getUserById) =>{
    const authenticateUser = async (username, password, done) => {
        const user = getUserByUsername(username);
        if(user == null){
            return done(null, false, { message: "no user with that email "});
        }

        try {
            if(await bcrypt.compare(password, user.password)){
                return done(null, user);
            } else{
                return done(null, false, { message: "password incorrect" })
            }
        } catch (error) {
            return done(error)
        }
    }



passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
}); 

}

//function checkAuthenticated(req, res, next){
checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/login');
}

//function checkNotAuthenticated(req, res, next){
checkNotAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return res.redirect('/indexPage');
    }
    next();
}


const passportConfig = {
    initializePassport : initializePassport,
    checkAuthenticated : checkAuthenticated,
    checkNotAuthenticated: checkNotAuthenticated,
}
module.exports = passportConfig;