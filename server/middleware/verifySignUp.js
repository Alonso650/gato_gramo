const db = require("../models");
const User = db.users;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    //Username
    User.findOne({
        where:{
            username: req.body.username
        }
    }).then(user => {
        if(user){
            res.status(400).send({
                message: "Failed Username is taken!"
            });
            return;
        }

        // Email
        User.findOne({
            where:{
                email: req.body.email
            }
        }).then(user => {
            if(user){
                res.status(400).send({
                    message: "Failed Email already used!"
                });
                return;
            }

            next();
        });
    });
}; 


const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;