const { ROLES } = require("../models");
const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Checking if there is a duplicate username
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

        // Checking if there is a duplicate email
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

checkRolesExisted = (req, res, next) => {
    if(req.body.roles){
        for(let i = 0; i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
};


const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;